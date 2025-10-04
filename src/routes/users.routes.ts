import { createAccountSchema, loginSchema } from '../validation/user.validation';
import { verifyJWT_MW } from '../config/middlewares';
import { END_POINT } from '../constant/endpoint';
import { UsersController, RegistrationController, SessionController, AuthController } from '../controllers/users';

export function initRoutes(app, router) {

  const apiRoute = router;
  const users = new UsersController();
  const registration = new RegistrationController();
  const session = new SessionController();
  const auth = new AuthController();

  apiRoute.get('/', (req, res) => res.status(200).send({ message: 'Api Server is running!' }));

  // Auth routes (no JWT middleware required)
  apiRoute.post(END_POINT.LOGIN, loginSchema, auth.login.bind(auth));
  apiRoute.post(END_POINT.SIGNUP, createAccountSchema, registration.signup);

  // Protected routes (JWT middleware required)
  apiRoute.route('*').all(verifyJWT_MW);

  apiRoute.get(END_POINT.GET_USER, users.list);

  return apiRoute;
}