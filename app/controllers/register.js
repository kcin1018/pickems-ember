import Ember from 'ember';

const { isEmpty, inject: { service } } = Ember;

export default Ember.Controller.extend({
  session: service(),
  flashMessages: service(),
  submitText: 'Create an Account',
  submitDisabled: false,
  didValidate: false,
  registrantData: {},
  errors: {},
  messages: {
    first_name: 'Enter a first name',
    last_name: 'Enter a last name',
    email: 'Enter a valid email address',
    password: 'Enter a password',
    passwordConfirm: 'Enter a password confirmation'
  },
  actions: {
    createAccount() {
      this.set('submitDisabled', true);
      this.set('submitText', 'Creating an Account...');
      this.set('errors', {});

      // email regex
      let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      // validate the input
      ['first_name', 'last_name', 'password', 'email', 'passwordConfirm'].forEach((element) => {
        if (isEmpty(this.get(`registrantData.${element}`))) {
          this.set(`errors.${element}`, this.get(`messages.${element}`));
        } else if (element === 'email' && !re.test(this.get(`registrantData.${element}`))) {
          this.set(`errors.${element}`, this.get(`messages.${element}`));
        }
      });

      // check the passwords
      if (this.get('registrantData.password') !== this.get('registrantData.passwordConfirm')) {
        this.setProperties({
          'errors.password': 'Passwords do not match',
          'errors.passwordConfirm': 'Passwords do not match'
        });
      }

      // check to see if there are errors
      if (Object.keys(this.get('errors')).length === 0) {
        let user = this.store.createRecord('user', this.get('registrantData'));
        user.save().then((user) => {
          this.get('session').authenticate('authenticator:oauth2', user.get('email'), this.get('registrantData.password')).then(() => {
            this.get('flashMessages').success('User account created and auto logged in.');
            this.transitionToRoute('index');
          }, () => {
            this.get('flashMessages').danger('Could not log you in.');
          });
        }, (reason) => {
          this.get('flashMessages').danger(reason.errors[0]);
        });
      }

      this.set('submitDisabled', false);
      this.set('submitText', 'Create an Account');
    }
  }
});
