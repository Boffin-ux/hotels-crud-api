/* eslint-disable @typescript-eslint/no-unused-vars */
import express from 'express';
import dotenv from 'dotenv';
import { DEFAULT_ENDPOINT, DEFAULT_PORT, HttpStatus, ResponseMessages } from './common/constants';
import usersRouter from './users/users.router';
import { CustomError } from './common/errors/custom.error';
import { IError } from './common/interfaces/app.interface';
import { Response, Request, NextFunction } from 'express';

// Server
dotenv.config();
const PORT = Number(process.env.PORT) || DEFAULT_PORT;
const app = express();

// Middlewares
app.use(express.json());

// Routes
app.use(`${DEFAULT_ENDPOINT}`, usersRouter);

app.use((_req: Request, _res: Response) => {
  throw new CustomError(ResponseMessages.INVALID_ENDPOINT, HttpStatus.NOT_FOUND);
});

app.use((err: IError, _req: Request, res: Response, _next: NextFunction) => {
  const code = err instanceof CustomError ? err.code : HttpStatus.INTERNAL_SERVER_ERROR;
  const message = err instanceof CustomError ? err.message : ResponseMessages.INTERNAL_SERVER_ERROR;

  res.status(code).send({ code, message });
});

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));

process.on('unhandledRejection', (err) => {
  console.log(`Unhandled Rejection ${err}`);
});

process.on('uncaughtException', (err) => {
  console.log(`Uncaught Exception ${err.name} ${err.message}`);
  process.exit(1);
});
