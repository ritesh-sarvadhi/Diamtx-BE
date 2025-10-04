import { Router } from 'express';

import { loginSchema } from '../../validation/user.validation';
import { END_POINT } from '../../constant/endpoint';
import { AuthController } from '../../controller/auth/auth.controller';

const router = Router();
const auth = new AuthController();

router.get('/', (req, res) => res.status(200).send({ message: 'Api Server is running!' }));

router.post(END_POINT.LOGIN, loginSchema, auth.login.bind(auth));

export default router;
