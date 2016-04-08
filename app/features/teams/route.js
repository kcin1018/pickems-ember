import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import {stringSlugify} from 'pickems/helpers/string-slugify';

const { RSVP, inject: { service }, isEmpty, computed } = Ember;

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  currentUser: service(),
  model() {
    return RSVP.hash({
      teams: this.store.findAll('team'),
      users: this.store.findAll('user')
    });
  },
  setupController(controller) {
    this._super(...arguments);

    controller.set('currentUser', service('current-user'));
    controller.set('filter', null);
    controller.set('isAdmin', this.get('currentUser.user.is_admin'));
    controller.set('users', computed.sort('model.users', (a, b) => a.get('name') > b.get('name') ? 1 : -1));
    controller.set('teams', computed('model.teams', 'filter', {
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
    }));
  },
  actions: {
    clearFilter() {
      this.controller.set('filter', null);
    },
    toggleCreateTeam() {
      this.controller.set('newTeam', {});
      this.controller.toggleProperty('showCreateTeam');
    },
    createTeam() {
      let newTeam = this.controller.get('newTeam');
      if (!this.get('currentUser.user.is_admin')) {
        newTeam.user = this.get('currentUser.user');
      }

      this.get('flashMessages').clearMessages();
      if (isEmpty(newTeam.name) || isEmpty(newTeam.user)) {
        this.get('flashMessages').danger('You must enter a team name and select an owner');
        return;
      }

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
  }
});
