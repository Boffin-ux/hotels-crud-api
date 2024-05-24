import { CreateUserDto } from '../users/dto/create-user.dto';
import { User } from './models/user.model';
import { IUsersService } from './interfaces/users-service.interface';

export class UsersService implements IUsersService {
  private users: User[];

  constructor() {
    this.users = [];
  }

  async getUsers() {
    return this.users;
  }

  async getUser(userId: string) {
    return this.users.find((user) => user.id === userId) || null;
  }

  async createUser(fields: CreateUserDto) {
    const user = new User(fields);
    this.users.push(user);

    return user;
  }

  async updateUser(userId: string, userData: Partial<CreateUserDto>) {
    const userIndex = this.users.findIndex((user) => user.id === userId);

    if (userIndex === -1) {
      return false;
    }

    this.users[userIndex] = { ...this.users[userIndex], ...userData };
    return this.users[userIndex];
  }

  async deleteUser(userId: string) {
    const userIndex = this.users.findIndex((user) => user.id === userId);

    if (userIndex === -1) {
      return false;
    }

    this.users.splice(userIndex, 1);
    return true;
  }
}
