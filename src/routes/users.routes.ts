import { Router } from 'express';

import UserController from '../controllers/users.controller';

const router = Router();

const usersController = new UserController();

router.post('/', usersController.register);

export default router;
