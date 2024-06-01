import { User } from './user.entity';
import { IUsersService } from './interfaces/users-service.interface';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AppDataSource } from '../data-source';
import { Repository } from 'typeorm';

export class UsersService implements IUsersService {
  private usersRepository: Repository<User>;

  constructor() {
    this.usersRepository = AppDataSource.getRepository(User);
  }

  async getUsers() {
    return await this.usersRepository.find();
  }

  async getUser(userId: string) {
    return await this.usersRepository.findOneBy({ id: userId });
  }

  async createUser(fields: CreateUserDto) {
    const newUser = this.usersRepository.create(fields);
    await this.usersRepository.insert(newUser);

    return newUser;
  }

  async updateUser(userId: string, userData: CreateUserDto) {
    const user = await this.usersRepository.findOneBy({ id: userId });

    if (!user) {
      return null;
    }

    return await this.usersRepository.save({ ...user, ...userData });
  }

  async deleteUser(userId: string) {
    const result = await this.usersRepository.delete(userId);
    return (result.affected ?? 0) > 0;
  }
}
