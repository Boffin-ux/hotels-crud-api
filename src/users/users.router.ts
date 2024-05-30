import { Router } from 'express';
import { USERS_ENDPOINT } from '../common/constants';
import { UsersController } from './users.controller';

const usersRouter = Router();
const usersController = new UsersController();

usersRouter.get(`${USERS_ENDPOINT}`, (_req, res) => usersController.getAll(res));
usersRouter.get(`${USERS_ENDPOINT}/:userId`, (req, res, next) =>
  usersController.getById(res, req, next),
);
usersRouter.post(`${USERS_ENDPOINT}`, (req, res, next) => usersController.post(res, req, next));
usersRouter.put(`${USERS_ENDPOINT}/:userId`, (req, res, next) =>
  usersController.put(res, req, next),
);
usersRouter.delete(`${USERS_ENDPOINT}/:userId`, (req, res, next) =>
  usersController.delete(res, req, next),
);

export default usersRouter;
