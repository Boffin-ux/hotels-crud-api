import { UsersController } from './users.controller';
import { ApiRoute } from '../common/types/api-route.type';
import { USERS_ENDPOINT } from '../common/constants';

const userRoutes = () => {
  const userController = new UsersController();

  return {
    [`${USERS_ENDPOINT}:get`]: (res) => userController.getAll(res),

    [`${USERS_ENDPOINT}:post`]: (res, req) => userController.post(res, req),

    [`${USERS_ENDPOINT}/{id}:delete`]: (res, req) => userController.delete(res, req),

    [`${USERS_ENDPOINT}/{id}:get`]: (res, req) => userController.getById(res, req),

    [`${USERS_ENDPOINT}/{id}:put`]: (res, req) => userController.put(res, req),
  } as ApiRoute;
};

export { userRoutes };
