import { User } from '../user.entity';
import { CreateUserDto } from '../dto/create-user.dto';

export interface IUsersService {
  getUsers: () => Promise<User[]>;

  getUser: (id: string) => Promise<User | null>;

  createUser: (fields: CreateUserDto) => Promise<User | null>;

  updateUser: (id: string, fields: CreateUserDto) => Promise<User | null>;

  deleteUser: (id: string) => Promise<boolean>;
}
