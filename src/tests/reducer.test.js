import reducers from '../reducer';
import mocks from './mocks';


describe('authorization reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducers(undefined, {})
    ).toEqual({"authorization": {"loggedIn": false}, "form": {}, "userProfile": {}});
  });

  it('should handle LOGIN', () => {
    expect(
      reducers({ }, {
        type: 'LOGIN'
      })
    ).toEqual({"authorization": {"loggedIn": true}, "form": {}, "userProfile": {}});
  });

  it('should handle GET_INSTAGRAM_DATA', () => {
    expect(
      reducers({ }, {
        type: 'GET_INSTAGRAM_DATA',
        username: 'frank'
      })
    ).toEqual({"authorization": {"loggedIn": false}, "form": {}, "userProfile": {username: 'frank'}});
  });

  it('should compose the correct state', () => {
    expect(
      reducers({"authorization": {"loggedIn": true}, "form": {}, "userProfile": {}}, {
        type: 'GET_INSTAGRAM_DATA',
        username: 'frank'
      })
    ).toEqual({"authorization": {"loggedIn": true}, "form": {}, "userProfile": { username: 'frank'} });
  });

});
