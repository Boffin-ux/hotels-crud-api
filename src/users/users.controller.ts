import { validate as isIdValid } from 'uuid';
import { UsersService } from './users.service';
import { User } from './models/user.model';
import { validateUserData } from './validations/user-fields.validate.ts';
import { IUsersController } from './interfaces/users-controller.interface';
import { HttpStatus, ResponseMessages } from '../common/constants';
import { CustomError } from '../common/errors/custom.error';
import { Response, Request, NextFunction } from 'express';

export class UsersController implements IUsersController {
  readonly userService: UsersService;

  constructor() {
    this.userService = new UsersService();
  }

  async getAll(res: Response) {
    const users = await this.userService.getUsers();
    res.status(HttpStatus.OK).send(users);
  }

  async getById(res: Response, req: Request, next: NextFunction) {
    const id = req.params.userId;

    if (!isIdValid(id)) {
      return next(new CustomError(ResponseMessages.INVALID_ID, HttpStatus.BAD_REQUEST));
    }

    const user = await this.userService.getUser(id);

    if (!user) {
      return next(new CustomError(ResponseMessages.NOT_FOUND, HttpStatus.NOT_FOUND));
    }

    res.status(HttpStatus.OK).send(user);
  }

  async post(res: Response, req: Request, next: NextFunction) {
    const data: User = req.body;

    if (!data) {
      return next(new CustomError(ResponseMessages.BAD_REQUEST, HttpStatus.BAD_REQUEST));
    }

    if (!validateUserData(data)) {
      return next(new CustomError(ResponseMessages.INVALID_PARAMS, HttpStatus.BAD_REQUEST));
    }

    const newUser = await this.userService.createUser(data);

    if (!newUser) {
      return next(new CustomError());
    }

    res.status(HttpStatus.CREATED).send(newUser);
  }

  async delete(res: Response, req: Request, next: NextFunction) {
    const id = req.params.userId;

    if (!isIdValid(id)) {
      return next(new CustomError(ResponseMessages.INVALID_ID, HttpStatus.BAD_REQUEST));
    }

    const user = await this.userService.deleteUser(id);

    if (!user) {
      return next(new CustomError(ResponseMessages.NOT_FOUND, HttpStatus.NOT_FOUND));
    }

    res.status(HttpStatus.NO_CONTENT).send();
  }

  async put(res: Response, req: Request, next: NextFunction) {
    const id = req.params.userId;
    const data: User = req.body;

    if (!data) {
      return next(new CustomError(ResponseMessages.BAD_REQUEST, HttpStatus.BAD_REQUEST));
    }

    if (!isIdValid(id)) {
      return next(new CustomError(ResponseMessages.INVALID_ID, HttpStatus.BAD_REQUEST));
    }

    if (!validateUserData(data)) {
      return next(new CustomError(ResponseMessages.INVALID_PARAMS, HttpStatus.BAD_REQUEST));
    }

    const user = await this.userService.updateUser(id, data);

    if (!user) {
      return next(new CustomError(ResponseMessages.NOT_FOUND, HttpStatus.NOT_FOUND));
    }

    res.status(HttpStatus.OK).send(user);
  }
}
