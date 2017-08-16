import * as Types from './config/types';

export const saveInstagramToken = (access_token) => ({
  type: Types.SAVE_INSTAGRAM_TOKEN,
  access_token
});

export const addHashtag = (hashtag) => ({
  type: Types.ADD_HASHTAG,
  hashtag
});

export const addPeople = (people) => ({
  type: Types.ADD_PEOPLE,
  people
});

// export function fetchUserData {
//      fetch('https://private-cb530a-bravakin.apiary-mock.com/user')
//       .then(response => response.json())
//       .then(json => json)
// }
