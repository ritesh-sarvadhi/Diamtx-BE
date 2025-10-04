import nodemailer, { Transporter } from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import path from 'path';

import { environment } from '../config';
import { logger } from '../logger/Logger';
import appError from '../utils/errorHelper';
import { ErrorType } from '../utils/errorTypes';

export interface MailAttachment {
  name?: string;
  data?: Buffer | string;
  mimetype?: string;
  path?: string;
  cid?: string;
}

export interface MailPayload {
  mailType?: string;
  subject?: string;
  html?: string;
  text?: string;
  to: string | string[];
  cc?: string | string[];
  bcc?: string | string[];
  replyTo?: string | string[];
  attachments?: MailAttachment | MailAttachment[];
  excludeAdmin?: boolean;
}

let cachedTransporter: Transporter | null = null;

const buildTransporterConfig = (): SMTPTransport.Options => {
  const useAws = environment?.is_aws_mail_service_used === 'true';

  if (useAws) {
    if (!environment?.aws_smtp_host || !environment?.aws_smtp_user || !environment?.aws_smtp_password) {
      throw new appError('AWS mail configuration is incomplete', ErrorType.invalid_request);
    }

    const port = Number(environment.aws_smtp_port) || 587;
    const secure = environment.aws_smtp_secure === 'true' || port === 465;

    return {
      host: environment.aws_smtp_host,
      port,
      secure,
      auth: {
        user: environment.aws_smtp_user,
        pass: environment.aws_smtp_password
      }
    };
  }

  if (!environment?.smtp_email || !environment?.smtp_email_password) {
    throw new appError('SMTP credentials are required to send emails', ErrorType.invalid_request);
  }

  if (environment?.smtp_service) {
    return {
      service: environment.smtp_service,
      auth: {
        user: environment.smtp_email,
        pass: environment.smtp_email_password
      }
    } as SMTPTransport.Options;
  }

  if (!environment?.smtp_host) {
    throw new appError('SMTP host is not configured', ErrorType.invalid_request);
  }

  const port = Number(environment.smtp_port) || 587;
  const secure = environment.smtp_secure === 'true' || port === 465;

  return {
    host: environment.smtp_host,
    port,
    secure,
    auth: {
      user: environment.smtp_email,
      pass: environment.smtp_email_password
    }
  };
};

const getTransporter = (): Transporter => {
  if (!cachedTransporter) {
    const config = buildTransporterConfig();
    cachedTransporter = nodemailer.createTransport(config);
  }

  return cachedTransporter;
};

const normalizeEmails = (input?: string | string[]): string[] => {
  if (!input) return [];
  if (Array.isArray(input)) {
    return input
      .map(email => (typeof email === 'string' ? email.trim() : ''))
      .filter(Boolean);
  }

  return input
    .split(',')
    .map(email => email.trim())
    .filter(Boolean);
};

const deduplicateEmails = (to: string[], cc: string[], bcc: string[]): { to: string[]; cc?: string[]; bcc?: string[] } => {
  const seen = new Set<string>();

  const dedupe = (list: string[]) =>
    list.filter(email => {
      const lower = email.toLowerCase();
      if (seen.has(lower)) return false;
      seen.add(lower);
      return true;
    });

  const uniqueTo = dedupe(to);
  const uniqueCc = dedupe(cc);
  const uniqueBcc = dedupe(bcc);

  return {
    to: uniqueTo,
    cc: uniqueCc.length ? uniqueCc : undefined,
    bcc: uniqueBcc.length ? uniqueBcc : undefined
  };
};

const buildAttachments = (attachments?: MailAttachment | MailAttachment[]) => {
  if (!attachments) return [];

  const list = Array.isArray(attachments) ? attachments : [attachments];

  return list.map((file, index) => {
    if (file.path) {
      return {
        filename: file.name || path.basename(file.path),
        path: file.path,
        cid: file.cid
      };
    }

    let content = file.data;
    if (typeof content === 'string' && /^[A-Za-z0-9+/=]+$/.test(content)) {
      try {
        content = Buffer.from(content, 'base64');
      } catch (error) {
        logger.warn('Failed to convert attachment from base64, falling back to raw string');
      }
    }

    return {
      filename: file.name || `attachment-${index + 1}`,
      content,
      contentType: file.mimetype,
      cid: file.cid
    };
  });
};

const formatField = (value?: string | string[]) => {
  if (!value) return 'None';
  return Array.isArray(value) ? value.join(', ') : value;
};

export const sendMail = async (payload: MailPayload): Promise<boolean> => {
  try {
    const transporter = getTransporter();

    const {
      mailType,
      subject,
      html,
      text,
      to,
      cc,
      bcc,
      replyTo,
      attachments,
      excludeAdmin = false
    } = payload;

    const adminEmails = excludeAdmin ? [] : normalizeEmails(environment?.admin_email);
    const toList = normalizeEmails(to);
    const ccList = normalizeEmails(cc);
    const bccList = normalizeEmails(bcc);

    const { to: cleanedTo, cc: cleanedCc, bcc: cleanedBcc } = deduplicateEmails(toList, ccList, [...bccList, ...adminEmails]);

    if (!cleanedTo.length) {
      throw new appError('At least one valid "to" email address is required', ErrorType.invalid_request);
    }

    const fromAddress = environment?.is_aws_mail_service_used === 'true'
      ? environment?.aws_from_mail || environment?.smtp_email
      : environment?.smtp_email;

    const mailOptions: nodemailer.SendMailOptions = {
      from: fromAddress,
      to: cleanedTo,
      cc: cleanedCc,
      bcc: cleanedBcc,
      replyTo: replyTo || cleanedTo,
      subject: subject || mailType || 'Notification',
      text: text || '',
      html: html || text || '',
      attachments: buildAttachments(attachments)
    };

    const shouldSendEmail = environment?.is_send_email !== 'false';

    if (!shouldSendEmail) {
      const localRecipients = normalizeEmails(environment?.local_test_mail);

      if (localRecipients.length) {
        await transporter.sendMail({
          ...mailOptions,
          to: localRecipients,
          cc: undefined,
          bcc: undefined,
          replyTo: mailOptions.to
        });

        logger.warn(`Emails disabled. Routed message to local recipients: ${formatField(localRecipients)}`);
      } else {
        logger.warn('Emails disabled. No local test recipients configured. Email skipped.');
      }

      logger.info(
        `Email suppressed (mailType: ${mailType || 'N/A'}). Intended recipients -> To: ${formatField(mailOptions.to)}, CC: ${formatField(mailOptions.cc)}, BCC: ${formatField(mailOptions.bcc)}`
      );

      return true;
    }

    await transporter.sendMail(mailOptions);

    logger.info(
      `Email sent successfully (mailType: ${mailType || 'N/A'}).\n  To: ${formatField(mailOptions.to)}\n  CC: ${formatField(mailOptions.cc)}\n  BCC: ${formatField(mailOptions.bcc)}`
    );

    return true;
  } catch (error) {
    const err = error as Error;
    logger.error('Failed to send email', { message: err.message, stack: err.stack });
    throw new appError(`Error sending email: ${err.message}`, ErrorType.invalid_request);
  }
};

export default sendMail;
