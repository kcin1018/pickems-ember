import Ember from 'ember';

const { service } = Ember.inject;

export default Ember.Controller.extend({
  session: service(),
  system: service(),
  actions: {
    selectWeek(week) {
      this.set('system.selectedWeek', week);
    }
  }
});
