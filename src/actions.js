import * as Types from './config/types';

export const saveInstagramToken = (access_token) => ({
  type: Types.SAVE_INSTAGRAM_TOKEN,
  access_token
});

export const addHashtag = (hashtag) => ({
  type: Types.ADD_HASHTAG,
  hashtag
});
