import * as Types from './config/types';

export const login = (username, password) => ({
  type: Types.LOGIN,
  url: '/dashboard',
  username,
  password
});

export const saveInstagramToken = (access_token) => ({
  type: Types.SAVE_INSTAGRAM_TOKEN,
  url: '/dashboard',
  access_token
});
