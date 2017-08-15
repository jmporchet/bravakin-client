import * as Types from './config/types';

export const login = (username, password) => ({
  type: Types.LOGIN,
  url: '/dashoard',
  username,
  password,
});
