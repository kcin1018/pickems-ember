import Ember from 'ember';
import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';

const { inject: { service }, computed } = Ember;

export default Ember.Route.extend(UnauthenticatedRouteMixin, {
  flashMessages: service(),
  session: service(),

  setupController(controller) {
    controller.set('remember', true);
    controller.set('submitBtnText', 'SIGN IN');
    controller.set('submitDisabled', computed('submitBtnText', {
      get() {
        return (this.get('submitBtnText') === 'SIGN IN') ? false : true;
      }
    }));
  },

  resetController(controller, isExiting) {
    if (isExiting) {
      this.get('flashMessages').clearMessages();
    }
  },

  actions: {
    authenticate: function() {
      let credentials = this.controller.getProperties('identification', 'password');

      this.get('session').authenticate('authenticator:jwt', credentials).then(() => {
        this.transitionTo('index');
      }, () => {
        this.get('flashMessages').danger('Invalid email and/or password');
      });
    }
  }
});
