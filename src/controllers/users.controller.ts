import { Request, Response } from 'express';
import { UserAttributes } from "@src/models/users.model";
import { IUserRepo } from "@src/repositories/users.repo";
import { inject, injectable } from "tsyringe";

@injectable()
export default class UserController {
  constructor(
    @inject("IUserRepo") private repo: IUserRepo
  ) {}

  async addUser(req: Request, res: Response): Promise<Response> {
    try {
      const userData = req.body as UserAttributes;
      const newUser = await this.repo.add(userData);
      return res.status(200).json(newUser);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to add user' });
    }
  }
}
