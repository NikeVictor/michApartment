import 'reflect-metadata';
import { Router } from 'express';
import UserController from '@src/controllers/users.controller';
import { UserValidator } from '@src/schemas/user.schema';
import { AppContainer } from '@src/tsyringe.container';

const router = Router();
const userController = AppContainer.resolve(UserController);

router.post('/signup', UserValidator, (req, res) => userController.addUser(req, res));

export default router;
