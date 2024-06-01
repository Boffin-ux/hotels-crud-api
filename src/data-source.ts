import { DataSource } from 'typeorm';
import path from 'path';
import { User } from './users/user.entity';

const dbPath = path.join(__dirname, '.', 'db', 'users.db');

export const AppDataSource = new DataSource({
  type: 'sqlite',
  synchronize: true,
  database: dbPath,
  entities: [User],
});

export const InitDataSource = async () => {
  try {
    await AppDataSource.initialize();

    console.log('DB Connected successfully!');
  } catch (e) {
    console.log('DB Connection error: ', e);
  }
};
