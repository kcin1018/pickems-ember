import Ember from 'ember';
import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';

const { inject: { service }, computed, isEmpty } = Ember;

export default Ember.Route.extend(UnauthenticatedRouteMixin, {
  flashMessages: service(),

  setupController(controller) {
    controller.set('errors', {});
    controller.set('registrantData', {});
    controller.set('submitBtnText', 'Create an Account');
    controller.set('submitDisabled', computed('submitBtnText', {
      get() {
        return (this.get('submitBtnText') === 'Create an Account') ? false : true;
      }
    }));
  },

  actions: {
    createAccount() {
      this.get('flashMessages').clearMessages();
      this.controller.set('submitBtnText', 'Creating an Account...');
      this.controller.set('errors', {});

      // check the passwords
      if (this.controller.get('registrantData.password') !== this.controller.get('registrantData.passwordConfirm')) {
        this.controller.setProperties({
          'errors.password': 'Passwords do not match',
          'errors.passwordConfirm': 'Passwords do not match'
        });
      }

      // check to see if there are errors
      if (Object.keys(this.controller.get('errors')).length === 0) {
        let user = this.store.createRecord('user', this.controller.get('registrantData'));
        user.save().then((user) => {
          let credentials = {
            identification: user.get('email'),
            password: this.controller.get('registrantData.password')
          };

          this.get('session').authenticate('authenticator:jwt', credentials).then(() => {
            this.get('flashMessages').success('User account created and auto logged in.');
            this.transitionTo('index');
          }, () => {
            this.get('flashMessages').danger('Could not log you in automatically');
            this.transitionTo('index');
          });
        }, (reason) => {
          this.get('flashMessages').danger(reason.errors[0].title);
          this.controller.set('submitBtnText', 'Create an Account');
        });
      }

      this.controller.set('submitBtnText', 'Create an Account');
    }
  }
});
