import Ember from 'ember';

const { computed, inject } = Ember;

export default Ember.Controller.extend({
  flashMessages: inject.service(),
  sortProperties: ['name'],
  sortedTeams: computed.sort('model.teams', 'sortProperties'),
  users: computed.alias('model.users'),
  teams: computed('sortedTeams', 'filter', {
    get() {
      let filter = this.get('filter');

      // handle the filter if entered
      if (filter) {
        let teams = this.get('sortedTeams');

        // filter all teams based on the them name and owner
        return teams.filter((team) => {
          filter = filter.toLowerCase();
          return team.get('name').search(new RegExp(filter, 'i')) !== -1 || team.get('user.fullname').search(new RegExp(filter, 'i')) !== -1;
        });
      }

      // return all teams if no filter
      return this.get('sortedTeams');
    }
  }),
  filter: null,
  showCreateTeam: false,
  actions: {
    clearFilter() {
      this.set('filter', null);
    },
    toggleCreateTeam() {
      this.set('newTeam', {});
      this.toggleProperty('showCreateTeam');
    },
    markPaid(team) {
      team.paid = true;
      team.save().then(() => {
        this.get('flashMessages').success(`Team '${team.get('name')}' marked as paid`);
      });
    },
    createTeam() {
      let newTeam = this.get('newTeam');
      let team = this.store.createRecord('team', newTeam);
      team.save().then(() => {
        this.get('flashMessages').success(`Team '${team.get('name')}' created`);
        this.send('toggleCreateTeam');
      });
    }
  }
});
