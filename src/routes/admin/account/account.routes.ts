import { Router } from 'express';

const accountRouter = Router();

accountRouter.get('/', (req, res) =>
  res.status(200).json({ message: 'Account routes ready for implementation.' })
);

export default accountRouter;
