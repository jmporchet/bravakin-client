import reducers from '../reducer';
import mocks from './mocks';


describe('authorization reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducers(undefined, {})
    ).toEqual({'authorization': {'loggedIn': false, 'access_token': null}, 'form': {}, 'userProfile': {}});
  });

  it('should handle LOGIN', () => {
    expect(
      reducers({ }, {
        type: 'LOGIN'
      })
    ).toEqual({'authorization': {'loggedIn': true, 'access_token': null}, 'form': {}, 'userProfile': {}});
  });

  it('should handle SAVE_INSTAGRAM_TOKEN', () => {
    expect(
      reducers({ }, {
        type: 'SAVE_INSTAGRAM_TOKEN',
        access_token: '5885499160.38553e7.ccfd98b2185a4fed833163bf17e86b04'
      })
    ).toEqual({'authorization': {'loggedIn': false, 'access_token': '5885499160.38553e7.ccfd98b2185a4fed833163bf17e86b04'}, 'form': {}, 'userProfile': {}});
  });

  it('should compose the correct state', () => {
    expect(
      reducers({'authorization': {'loggedIn': true}, 'form': {}, 'userProfile': {}}, {
        type: 'SAVE_INSTAGRAM_TOKEN',
        access_token: '5885499160.38553e7.ccfd98b2185a4fed833163bf17e86b04'
      })
    ).toEqual({'authorization': {'loggedIn': true, 'access_token': '5885499160.38553e7.ccfd98b2185a4fed833163bf17e86b04'}, 'form': {}, 'userProfile': {} });
  });

});
