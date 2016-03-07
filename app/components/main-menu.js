import Ember from 'ember';

const { inject: { service } } = Ember;
export default Ember.Component.extend({
  session: service(),
  sessionUser: service('session-user'),
  classNames: ['main-menu'],

  actions: {
    logout() {
      this.get('session').invalidate();
    }
  }
});
