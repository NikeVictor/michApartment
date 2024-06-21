import 'reflect-metadata';
import { container } from 'tsyringe';
import { UserRepo } from './repositories/users.repo';

container.register("IUserRepo", { useValue: UserRepo });


export { container as AppContainer };
