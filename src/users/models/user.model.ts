import { v4 as uuidv4 } from 'uuid';
import { CreateUserDto } from '../dto/create-user.dto';

export class User {
  id: string;

  username: string;

  age: number;

  hobbies: string[];

  constructor({ username, age, hobbies }: CreateUserDto) {
    this.id = uuidv4();

    this.username = username;

    this.age = age;

    this.hobbies = hobbies;
  }
}
