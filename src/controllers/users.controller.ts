import { Request, Response } from 'express';
import { UserAttributes } from "@src/models/users.model";
import { IUserRepo, LogInData } from "@src/repositories/users.repo";
import { inject, injectable } from "tsyringe";

@injectable()
export default class UserController {
  constructor(
    @inject("IUserRepo") private repo: IUserRepo
  ) {}

  async addUser(req: Request, res: Response): Promise<Response> {
      const userData = req.body as UserAttributes;
      const user = await this.repo.add(userData);
      return res.status(200).json(user);
  }

  async logIn(req: Request, res: Response): Promise<Response> {
    const logInData = req.body as LogInData;
    const user = await this.repo.logIn(logInData);
    return res.status(200).json(user);
  }
  
  async findUserById(req: Request, res: Response): Promise<Response>{
    const id = req.params.id;
    const user = await this.repo.findById(id)
    return res.status(200).json(user);
  }
}
