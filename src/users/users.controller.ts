import { IncomingMessage, ServerResponse } from 'http';
import { validate as isIdValid } from 'uuid';
import { UsersService } from './users.service';
import { User } from './models/user.model';
import { validateUserData } from './validations/user-fields.validate.ts';
import { IUsersController } from './interfaces/users-controller.interface';
import { createRes } from '../utils';
import { HttpStatus, ResponseMessages } from '../common/constants';
import { BaseController } from '../common/base.controller';
import { CustomError } from '../common/errors/custom.error';

export class UsersController extends BaseController implements IUsersController {
  readonly userService: UsersService;

  constructor() {
    super();
    this.userService = new UsersService();
  }

  async getAll(res: ServerResponse) {
    const users = await this.userService.getUsers();
    return createRes({ res, code: HttpStatus.OK, data: users });
  }

  async getById(res: ServerResponse, req: IncomingMessage) {
    const id = this.getUrlParam(req);

    if (!id) {
      throw new CustomError(ResponseMessages.BAD_REQUEST, HttpStatus.BAD_REQUEST);
    }

    if (!isIdValid(id)) {
      throw new CustomError(ResponseMessages.INVALID_ID, HttpStatus.BAD_REQUEST);
    }

    const user = await this.userService.getUser(id);

    if (!user) {
      throw new CustomError(ResponseMessages.NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    return createRes({ res, code: HttpStatus.OK, data: user });
  }

  async post(res: ServerResponse, req: IncomingMessage) {
    const data: User = await this.parseReqData(req);

    if (!data) {
      throw new CustomError(ResponseMessages.BAD_REQUEST, HttpStatus.BAD_REQUEST);
    }

    if (!validateUserData(data)) {
      throw new CustomError(ResponseMessages.INVALID_PARAMS, HttpStatus.BAD_REQUEST);
    }

    const newUser = await this.userService.createUser(data);

    if (!newUser) {
      throw new CustomError();
    }

    return createRes({
      res,
      code: HttpStatus.CREATED,
      data: newUser,
    });
  }

  async delete(res: ServerResponse, req: IncomingMessage) {
    const id = this.getUrlParam(req);

    if (!id) {
      throw new CustomError(ResponseMessages.BAD_REQUEST, HttpStatus.BAD_REQUEST);
    }

    if (!isIdValid(id)) {
      throw new CustomError(ResponseMessages.INVALID_ID, HttpStatus.BAD_REQUEST);
    }

    const user = await this.userService.deleteUser(id);

    if (!user) {
      throw new CustomError(ResponseMessages.NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    return createRes({
      res,
      code: HttpStatus.NO_CONTENT,
    });
  }

  async put(res: ServerResponse, req: IncomingMessage) {
    const id = this.getUrlParam(req);
    const data: User = await this.parseReqData(req);

    if (!id || !data) {
      throw new CustomError(ResponseMessages.BAD_REQUEST, HttpStatus.BAD_REQUEST);
    }

    if (!isIdValid(id)) {
      throw new CustomError(ResponseMessages.INVALID_ID, HttpStatus.BAD_REQUEST);
    }

    if (!validateUserData(data)) {
      throw new CustomError(ResponseMessages.INVALID_PARAMS, HttpStatus.BAD_REQUEST);
    }

    const user = await this.userService.updateUser(id, data);

    if (!user) {
      throw new CustomError(ResponseMessages.NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    return createRes({
      res,
      code: HttpStatus.OK,
      data: user,
    });
  }
}
