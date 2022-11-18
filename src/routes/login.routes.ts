import { Router } from 'express';

import LoginNewController from '../controllers/login.controller';

const router = Router();

const loginController = new LoginNewController();

router.post('/', loginController.login);

export default router;
