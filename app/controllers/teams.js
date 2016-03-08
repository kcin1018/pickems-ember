import Ember from 'ember';
import { stringSlugify } from 'pickems/helpers/string-slugify';

const { computed, inject, isEmpty } = Ember;

export default Ember.Controller.extend({
  flashMessages: inject.service(),
  sessionUser: inject.service('session-user'),
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
      if (!this.get('sessionUser.user.is_staff')) {
        this.store.findRecord('user', this.get('sessionUser.user.id')).then((user) => {
          newTeam.user = user;
          this.send('doCreateTeam', newTeam);
        });
      } else {
        this.send('doCreateTeam', newTeam);
      }
    },
    doCreateTeam(newTeam) {
      this.get('flashMessages').clearMessages();

      if (isEmpty(newTeam.name) || isEmpty(newTeam.user)) {
        this.get('flashMessages').danger('You must enter a team name and select an owner');
        return;
      }

      // generate the slug
      newTeam.slug = stringSlugify([newTeam.name]);

      let team = this.store.createRecord('team', newTeam);
      team.save().then(() => {
        this.get('flashMessages').clearMessages();
        this.get('flashMessages').success(`Team '${team.get('name')}' created`);
        this.send('toggleCreateTeam');
      }, (reason) => {
        if (reason.errors.slug[0]) {
          this.get('flashMessages').danger(`There is already a team named '${team.get('name')}'`);
        } else {
          this.get('flashMessages').danger('Could not create team');
        }
        team.destroyRecord();
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
    },
    updateTeam(team) {
      this.get('flashMessages').clearMessages();

      // re-generate the slug
      team.set('slug', stringSlugify([team.get('name')]));

      team.save().then(() => {
        this.get('flashMessages').success('Team information saved');
        this.set('isEditing', false);
      });

    }
  }
});
