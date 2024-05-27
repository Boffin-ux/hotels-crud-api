import path from 'path';
import { User } from './models/user.model';
import { IUsersService } from './interfaces/users-service.interface';
import { SqliteConnect } from '../db/sqlite.connect';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { TABLE_NAME, USER_SCHEMA } from '../db/constants';

interface IUserRes extends Omit<User, 'hobbies'> {
  hobbies: string;
}

export class UsersService implements IUsersService {
  private usersDb: SqliteConnect;
  private init: Promise<unknown>;

  constructor() {
    this.usersDb = new SqliteConnect(path.join(__dirname, '..', 'db', 'users.db'));
    this.init = this.createTable();
  }

  async createTable() {
    const query = `CREATE TABLE IF NOT EXISTS ${TABLE_NAME} (${USER_SCHEMA})`;

    return await this.usersDb.run(query);
  }

  async getUsers() {
    const query = `SELECT * FROM ${TABLE_NAME}`;
    const users = (await this.usersDb.getAll(query)) as IUserRes[];

    return users.map((user) => (user = { ...user, hobbies: JSON.parse(user.hobbies) })) as User[];
  }

  async getUser(userId: string) {
    const query = `SELECT * FROM ${TABLE_NAME} WHERE id = ?`;
    const params = [userId];
    const user = (await this.usersDb.getById(query, params)) as IUserRes;
    if (!user) {
      return null;
    }

    return { ...user, hobbies: JSON.parse(user.hobbies) } as User;
  }

  async createUser(fields: CreateUserDto) {
    const { id, username, age, hobbies } = new User(fields);
    const query = `INSERT INTO ${TABLE_NAME} (id, username, age, hobbies) VALUES (?, ?, ?, ?)`;
    const params = [id, username, age, JSON.stringify(hobbies)];
    const changes = (await this.usersDb.run(query, params)) as number;

    return changes >= 0 ? await this.getUser(id) : null;
  }

  async updateUser(userId: string, userData: CreateUserDto) {
    const user = { ...userData, hobbies: JSON.stringify(userData.hobbies) };
    const params = [...Object.values(user), userId];

    const query = `UPDATE ${TABLE_NAME} SET username = ?, age = ?, hobbies = ? WHERE id = ?`;
    const changes = await this.usersDb.run(query, params);

    return changes === 0 ? null : await this.getUser(userId);
  }

  async deleteUser(userId: string) {
    const query = `DELETE FROM ${TABLE_NAME} WHERE id = ?`;
    const params = [userId];
    const changes = await this.usersDb.run(query, params);

    return changes === 0 ? false : true;
  }
}
