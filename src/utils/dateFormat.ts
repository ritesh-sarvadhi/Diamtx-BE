import moment from 'moment';
import { logger } from '../logger/Logger';

export const FILENAME = 'logs/%DATE%-results.log';

export enum DATE_FORMATE {
    TIMESTAMP = 'YYYY-MM-DD HH:mm:ss',
    DATE_PATTERN = 'YYYY-MM-DD'
};

export const formateDate = (date, returnFormate = 'YYYY-MM-DD HH:mm:ssZ') => {
  try {
    if(date) {
      return moment.utc(date, [
        'DD-MM-YYYY', // <-- put this first
        'DD/MM/YYYY',
        'MM-DD-YYYY',
        'MM/DD/YYYY',
        'YYYY-MM-DD',
        'YYYY/MM/DD',
        'YYYY-MM-DDTHH:mm:ssZ',
        'YYYY/MM/DD HH:MM:SS',
        moment.ISO_8601,
        'DD-MMM-YYYY',
        'MM/DD/YY',
        'M/D/YY'
      ], true).format(returnFormate);
    }
    else return;
  } catch (error) {
    logger.log('🚀 ~ formateDate ~ error:', error);
  }
};