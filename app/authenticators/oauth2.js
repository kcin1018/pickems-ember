import OAuth2PasswordGrantAuthenticator from 'ember-simple-auth/authenticators/oauth2-password-grant';
import Config from 'pickems/config/environment';

export default OAuth2PasswordGrantAuthenticator.extend({
  serverTokenEndpoint: `${Config.api.host}/${Config.api.namespace}/${Config.api.authEndpoint}`,
  serverTokenRevocationEndpoint: `${Config.api.host}/${Config.api.namespace}/${Config.api.authEndpoint}`
});
