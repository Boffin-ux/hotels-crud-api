import { User } from '../models/user.model';
import { CreateUserDto } from '../dto/create-user.dto';

export interface IUsersService {
  getUsers: () => Promise<User[]>;

  getUser: (id: string) => Promise<User | null>;

  createUser: (fields: CreateUserDto) => Promise<User>;

  updateUser: (id: string, fields: CreateUserDto) => Promise<User | boolean>;

  deleteUser: (id: string) => Promise<boolean>;
}
