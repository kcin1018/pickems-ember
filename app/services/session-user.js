import Ember from 'ember';

const { inject: { service }, RSVP } = Ember;

export default Ember.Service.extend({
  session: service('session'),
  store: service(),
  loadCurrentUser() {
    return new RSVP.Promise((resolve) => {
      let userId = this.get('session.data.authenticated.user_id');
      if (!Ember.isEmpty(userId)) {
        return this.get('store').find('user', userId).then((user) => {
          this.set('user', user);
          resolve();
        }, () => {
          this.get('session').invalidate();
        });
      } else {
        resolve();
      }
    });
  }
});
