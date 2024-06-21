import { User, UserAttributes } from "@src/models/users.model";
import { inject, injectable } from "tsyringe";

export interface IUserRepo {
    add(data: UserAttributes): Promise<User>;
}

@injectable()
export class UserRepo implements IUserRepo {
  constructor(
    @inject("UserModel") private model: typeof User) {}

  async add(data: UserAttributes): Promise<User> {
    const user = await this.model.create(data);
    return user;
  }
}
