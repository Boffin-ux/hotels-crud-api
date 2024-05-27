const USER_SCHEMA = `
  id TEXT PRIMARY KEY NOT NULL,
  username TEXT NOT NULL,
  age INTEGER NOT NULL,
  hobbies TEXT DEFAULT "[]" NOT NULL
`;

const TABLE_NAME = 'users';

export { USER_SCHEMA, TABLE_NAME };
