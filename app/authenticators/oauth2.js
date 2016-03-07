import OAuth2PasswordGrantAuthenticator from 'ember-simple-auth/authenticators/oauth2-password-grant';
import Config from 'pickems/config/environment';

const { RSVP, isEmpty } = Ember;

export default OAuth2PasswordGrantAuthenticator.extend({
  serverTokenEndpoint: `${Config.api.host}/${Config.api.namespace}/${Config.api.authEndpoint}`,
  serverTokenRevocationEndpoint: `${Config.api.host}/${Config.api.namespace}/${Config.api.authEndpoint}`,

  restore(data) {
    return new RSVP.Promise((resolve, reject) => {
      let now = (new Date()).getTime();
      let refreshAccessTokens = this.get('refreshAccessTokens');

      // check for valid access token
      if (isEmpty(data.data.access_token)) {
        reject();
      } else {
        resolve(data);
      }
    });
  }
});
