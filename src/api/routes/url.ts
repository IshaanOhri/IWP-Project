import { Router } from 'express';
import { getUrls } from '../controllers/url';

const urlRouter: Router = Router();

urlRouter.get('/urls', getUrls);

export default urlRouter;
