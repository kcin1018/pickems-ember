import Ember from 'ember';

const { isEmpty, computed, inject : { service } } = Ember;

export default Ember.Controller.extend({
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
      if (isEmpty(this.get('identification')) || isEmpty(this.get('password'))) {
        this.get('flashMessages').danger('Please enter an email and password to sign in');
        return;
      }

      this.set('submitText', 'SIGNIN IN...');

      // make the authentication attempt
      let { identification, password } = this.getProperties('identification', 'password');
      this.get('session').authenticate('authenticator:oauth2', identification.toLowerCase(), password).catch(() => {
        this.set('password', null);
        this.set('submitText', 'SIGN IN');

        this.get('flashMessages').danger('Invalid email and/or password');
      });
    }
  }
});
