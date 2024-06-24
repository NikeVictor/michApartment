import 'reflect-metadata';
import { container } from 'tsyringe';
import { IUserRepo, UserRepo } from './repositories/users.repo';
import { User } from './models/users.model';

container.register("UserModel", { useValue: User });

container.register<IUserRepo>("IUserRepo", { useClass: UserRepo });

export { container as AppContainer };
