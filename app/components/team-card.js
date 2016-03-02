import Ember from 'ember';

const { service } = Ember.inject;

export default Ember.Component.extend({
  flashMessages: service(),
  session: service(),
  actions: {
    markPaid() {
      if (this.get('session.data.authenticated.admin')) {
        this.sendAction('markPaid', this.get('team'));
      } else {
        this.get('flashMessages').danger('You are not allowed to mark teams as paid');
      }
    }
  }
});
