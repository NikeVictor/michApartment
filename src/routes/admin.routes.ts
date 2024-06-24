import 'reflect-metadata';
import { Router } from 'express';
import UserController from '@src/controllers/users.controller';
import { UserValidator } from '@src/schemas/user.schema';
import { AppContainer } from '@src/tsyringe.container';
import adminAuthorized from '@src/middleWare/auth';

const router = Router();
const userController = AppContainer.resolve(UserController);

router.post('/signup', UserValidator, (req, res) => userController.addUser(req, res));
router.post('/login', (req, res) => userController.logIn(req, res));
router.get("/:id", adminAuthorized, (req, res) => userController.findUserById(req, res))
export {router as adminRoutes};
