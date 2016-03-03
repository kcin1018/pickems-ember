import Ember from 'ember';

const { service } = Ember.inject;

export default Ember.Component.extend({
  flashMessages: service(),
  session: service(),
  isEditing: false,
  actions: {
    markPaid() {
      if (this.get('session.data.authenticated.admin')) {
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
    saveEdit() {
      this.get('team').save().then(() => {
        this.get('flashMessages').success('Team information saved');
        this.set('isEditing', false);
      });
    }
  }
});
