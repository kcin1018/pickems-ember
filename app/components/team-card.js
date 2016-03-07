import Ember from 'ember';
import { stringSlugify } from 'pickems/helpers/string-slugify';

const { service } = Ember.inject;

export default Ember.Component.extend({
  flashMessages: service(),
  sessionUser: service('session-user'),
  system: service(),
  isEditing: false,
  actions: {
    markPaid() {
      if (this.get('sessionUser.user.admin')) {
        this.sendAction('markPaid', this.get('team'));
      } else {
        this.get('flashMessages').danger('You are not allowed to mark teams as paid');
      }
    },
    removeTeam(team) {
      this.sendAction('removeTeam', team);
    },
    toggleEdit() {
      this.toggleProperty('isEditing');
    },
    cancelEdit() {
      this.get('team').rollbackAttributes();
      this.set('isEditing', false);
    },
    updateTeam() {
      this.sendAction('updateTeam', this.get('team'));
      this.set('isEditing', false);
    }
  }
});
