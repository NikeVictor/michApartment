import { User, UserAttributes } from "@src/models/users.model";
import  AlreadyExists, { NotFoundError } from "../utils/error";
import { inject, injectable } from "tsyringe";
import jwt from 'jsonwebtoken';
import { decryptPassword, encryptPassword } from "@src/models/mixins";
import { PageData, Paginated } from "@src/types/pagination";
import { paginate } from "@src/utils/model";


export interface LogInData {
  email: string;
  password: string
}

export interface IUserRepo {
    add(data: UserAttributes): Promise<User>;
    findById(id: string): Promise<User>;
    logIn(data: LogInData): Promise<User>;
    fetchAllUsers(pageData: PageData): Promise<Paginated<User>>;
}

@injectable()
export class UserRepo implements IUserRepo {
  constructor(
    @inject("UserModel") private model: typeof User) {}

  async add(data: UserAttributes): Promise<User> {
    const fetchEmail = await this.model.findOne({where: {email: data.email}});
    if(fetchEmail){
      throw new AlreadyExists("Email already exist")
    }
    if (data.password) {
      data.password = await encryptPassword(data.password);
      data.confirmPassword = await encryptPassword(data.confirmPassword);
    }
    const user = await this.model.create(data);
    const accessToken = jwt.sign({
      userId: user.id, 
      accountType: user.accountType}, 
      process.env.JWT_SECRET as string, 
      {
      expiresIn: "1h"
      }
    )
   user.token = accessToken;
    await user.save();

    return user;
  }

  async logIn(data: LogInData): Promise<User> {
    try {
      const user = await this.model.findOne({
        where: {
            email: data.email
        },
      });
      if (!user) {
        throw new Error('User not found');
      }
      const validPassword = await decryptPassword(data.password, user.password);
      if(!validPassword){
        throw new Error("Password incorrect")
      }
      const accessToken = jwt.sign({
        userId: user!.id,
        accountType: user!.accountType,
      }, process.env.JWT_SECRET as string, {
        expiresIn: '1h',
      });
  
      user!.token = accessToken;
      await user!.save();
  
      return user!;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  async findById(id: string): Promise<User> {
    const user = await this.model.findByPk(id);
    if (!user) {
      throw new NotFoundError(`User with id ${id} not found`);
  }
    return user
  }

  async fetchAllUsers(pageData: PageData): Promise<Paginated<User>>{
    const users = await paginate<User>(
      this.model,
      {
          where: {},
      },
      pageData
  );
    return users
  }
}
