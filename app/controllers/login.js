import Ember from 'ember';
import {
  validator, buildValidations
}
from 'ember-cp-validations';

const { computed, inject : { service } } = Ember;
const Validations = buildValidations({
  identification: [
    validator('presence', true),
    validator('format', {
      type: 'email'
    })
  ],
  password: validator('presence', true)
});

export default Ember.Controller.extend(Validations, {
  session: service(),
  flashMessages: service(),

  identification: null,
  password: null,
  remember: true,
  submitText: 'SIGN IN',
  submitDisabled: computed('submitText', {
    get() {
      return (this.get('submitText') === 'SIGN IN') ? false : true;
    }
  }),

  actions: {
    authenticate() {
      // clear any current messages
      this.get('flashMessages').clearMessages();

      // do validation before making authentication attempt
      let { validations } = this.validateSync();
      if (!validations.get('isValid')) {
        this.get('flashMessages').danger('Please enter an email and password to sign in');
        return;
      }

      this.set('submitText', 'SIGNIN IN...');

      // make the authentication attempt
      let { identification, password } = this.getProperties('identification', 'password');
      this.get('session').authenticate('authenticator:oauth2', identification, password).catch((reason) => {
        this.set('password', null);
        this.set('submitText', 'SIGN IN');

        this.get('flashMessages').danger(reason.error || reason);
      });
    }
  }
});
