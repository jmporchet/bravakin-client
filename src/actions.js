import * as Types from './config/types';

export const login = (username, password) => ({
  type: Types.LOGIN,
  url: '/dashboard',
  username,
  password
});

export const loginWithInstagram = (userInfo) => ({
  type: Types.GET_INSTAGRAM_DATA,
  url: '/dashboard',
  userInfo
})
