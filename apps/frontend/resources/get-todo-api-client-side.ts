import { getTokenFromCookie } from './get-token-from-cookie';
import { TodoApi } from './todo-api';

export const getTodoApiClientSide = () => {
  return new TodoApi(() => Promise.resolve(getTokenFromCookie()));
};
