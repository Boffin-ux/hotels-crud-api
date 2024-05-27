import { exit } from 'process';
import sqlite3 from 'sqlite3';

export class SqliteConnect {
  private db: sqlite3.Database;

  constructor(dbFilePath: string) {
    this.db = new sqlite3.Database(dbFilePath, (err) => {
      if (err) {
        console.error(err.message);
        exit(1);
      }

      console.log(`DB Connected successfully!`);
    });
  }

  async run(query: string, params: any[] = []) {
    return await new Promise((resolve, reject) => {
      this.db.run(query, params, function (err) {
        if (err) {
          console.log(err.message);
          reject(err.message);
        } else {
          resolve(this.changes);
        }
      });
    });
  }

  async getAll(query: string, params: any[] = []) {
    return await new Promise((resolve, reject) => {
      this.db.all(query, params, (err, rows: any[]) => {
        if (err) {
          reject(err.message);
        } else {
          resolve(rows);
        }
      });
    });
  }

  async getById(query: string, params: any[] = []) {
    return await new Promise((resolve, reject) => {
      this.db.get(query, params, (err, row) => {
        if (err) {
          reject(err.message);
        }
        resolve(row);
      });
    });
  }
}
