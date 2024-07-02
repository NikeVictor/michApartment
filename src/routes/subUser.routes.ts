import 'reflect-metadata';
import { Router } from 'express';
import UserController from '@src/controllers/users.controller';
import { UserValidator } from '@src/schemas/user.schema';
import { AppContainer } from '@src/tsyringe.container';
import { subUserAuthorized } from '@src/middleWare/auth';
import { AuthRequest } from '@src/types/authRequest';

const router = Router();
const userController = AppContainer.resolve(UserController);

router.post('/signup', UserValidator, (req, res) => userController.addUser(req as AuthRequest, res));
router.post('/login', (req, res) => userController.logIn(req as AuthRequest, res));
router.get("/subUser/:id", subUserAuthorized, (req, res) => userController.findUserById(req as AuthRequest, res))
export {router as subUserRoutes};
