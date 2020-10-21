import { Router } from 'express';
import { login, signUp } from '../controllers/auth';

const authRouter: Router = Router();

authRouter.post('/signUp', signUp);

authRouter.post('/login', login);

export default authRouter;
