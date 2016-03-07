import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    this.set('slug', params.team);
    return this.store.findAll('team');
  },
  setupController(controller, model) {
    this._super(...arguments);

    controller.set('teams', model);
    controller.set('team', model.filter((teams) => {
      return teams.get('slug') === this.get('slug');
    }).get('firstObject'));
  }
});
