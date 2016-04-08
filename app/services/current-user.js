import Ember from 'ember';

const { inject: { service }, RSVP, isEmpty } = Ember;

export default Ember.Service.extend({
  session: service(),
  store: service(),
  user: null,
  loadCurrentUser() {
    return new RSVP.Promise((resolve) => {
      let userId = this.get('session.data.authenticated.user_id');

      if (!isEmpty(userId)) {
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
