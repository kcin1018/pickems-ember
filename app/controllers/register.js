import Ember from 'ember';

const { inject : { service } } = Ember;

export default Ember.Controller.extend({
  session: service(),
  flashMessages: service(),
  submitText: 'Create an Account',
  submitDisabled: false,
  didValidate: false,

  actions: {
    createAccount() {
      this.set('submitDisabled', true);
      this.set('submitText', 'Creating an Account...');

      let model = this.get('model');
      model.validate().then((data) => {
        if (data.validations.get('isValid')) {
          model.save().then(() => {
            this.get('session').authenticate('authenticator:oauth2', model.get('email'), model.get('passwordConfirm')).then(() => {
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
      });
    }
  }
});
