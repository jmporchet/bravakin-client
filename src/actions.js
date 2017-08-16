import * as Types from './config/types';

export const saveInstagramToken = (access_token) => ({
  type: Types.SAVE_INSTAGRAM_TOKEN,
  access_token
});

export const hashtag = () => ({
  type: Types.HASHTAG,
  url: '/preferences',
});
