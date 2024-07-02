import { Response } from 'express';
import { UserAttributes } from "@src/models/users.model";
import { IUserRepo, LogInData } from "@src/repositories/users.repo";
import { inject, injectable } from "tsyringe";
import { AuthRequest, getPageInfo } from '@src/types/authRequest';

@injectable()
export default class UserController {
  constructor(
    @inject("IUserRepo") private repo: IUserRepo
  ) {}

  async addUser(req: AuthRequest, res: Response): Promise<Response> {
      const userData = req.body as UserAttributes;
      const user = await this.repo.add(userData);
      return res.status(200).json(user);
  }

  async logIn(req: AuthRequest, res: Response): Promise<Response> {
    const logInData = req.body as LogInData;
    const user = await this.repo.logIn(logInData);
    return res.status(200).json(user);
  }
  
  async findUserById(req: AuthRequest, res: Response): Promise<Response>{
    const id = req.params.id;
    const user = await this.repo.findById(id)
    return res.status(200).json(user);
  }

  async fetchAllUser(req: AuthRequest, res: Response): Promise<Response>{
    const pageData = getPageInfo(req);
    const users = await this.repo.fetchAllUsers(pageData)
    return res.status(200).json(users)
  }
}
