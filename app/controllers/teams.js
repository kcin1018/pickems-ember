import Ember from 'ember';

const { computed } = Ember;

export default Ember.Controller.extend({
  sortProperties: ['name'],
  sortedTeams: computed.sort('model', 'sortProperties'),
  teams: computed('sortedTeams', {
    get() {
      let teams = this.get('sortedTeams');
      return teams.filter((team) => {
        let filter = this.get('filter');
        if (filter) {
          return team.get('name').toLowerCase().includes(filter.toLowerCase());
        }

        return true;
      });
    }
  }),
  filter: null,
  showCreateTeam: false,
  actions: {
    filterTeams(filter) {
      this.set('model', this.store.query('team', { filter: filter }));
    },
    clearFilter() {
      this.set('filter', null);
      this.send('filterTeams', null);
    },
    toggleCreateTeam() {
      this.toggleProperty('showCreateTeam');
    }
  }
});
