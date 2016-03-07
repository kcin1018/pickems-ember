import Ember from 'ember';

const { computed, inject, isEmpty } = Ember;

export default Ember.Controller.extend({
  flashMessages: inject.service(),
  session: inject.service(),
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
        this.get('flashMessages').clearMessages();
        this.get('flashMessages').success(`Team '${team.get('name')}' marked as paid`);
      });
    },
    createTeam() {
      let newTeam = this.get('newTeam');
      if (!this.get('session.data.authenticated.admin')) {
        this.store.findRecord('user', this.get('session.data.authenticated.user_id')).then((user) => {
          newTeam.user = user;
          this.send('doCreateTeam', newTeam);
        });
      } else {
        this.send('doCreateTeam', newTeam);
      }
    },
    doCreateTeam(newTeam) {
      if (isEmpty(newTeam.name) || isEmpty(newTeam.user)) {
        this.get('flashMessages').clearMessages();
        this.get('flashMessages').danger('You must enter a team name and select an owner');
        return;
      }

      let team = this.store.createRecord('team', newTeam);
      team.save().then(() => {
        this.get('flashMessages').clearMessages();
        this.get('flashMessages').success(`Team '${team.get('name')}' created`);
        this.send('toggleCreateTeam');
      });
    },
    removeTeam(team) {
      if (confirm('Are you sure you want to delete this team?')) {
        let teamName = team.get('name');
        team.destroyRecord().then(() => {
          this.get('flashMessages').clearMessages();
          this.get('flashMessages').success(`Team '${teamName}' deleted`);
        });
      }
    }
  }
});
