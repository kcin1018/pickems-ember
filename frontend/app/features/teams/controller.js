import Ember from 'ember';

const { computed, inject: { service } } = Ember;

export default Ember.Controller.extend({
  currentUser: service(),
  filter: null,
  isAdmin: computed.alias('currentUser.user.is_admin'),
  users: computed.sort('model.users', (a, b) => a.get('name') > b.get('name') ? 1 : -1),
  teams: computed('model.teams', 'filter', {
    get() {
      let filter = this.get('filter');
      if (filter) {
        filter = filter.toLowerCase();
        return this.get('model.teams').filter((team) => {
          return team.get('name').toLowerCase().indexOf(filter) > -1 || team.get('user.name').toLowerCase().indexOf(filter) > -1;
        });
      }

      return this.get('model.teams');
    }
  })
});
