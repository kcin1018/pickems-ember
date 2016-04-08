import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model(params) {
    this.set('slug', params.team);
    return this.store.findAll('team');
  },
  setupController(controller, model) {
    this._super(...arguments);

    controller.set('teams', model);
    let team = model.filter((teams) => {
      return teams.get('slug') === this.get('slug');
    }).get('firstObject');
    controller.set('team', team);

    // get the picks for th eselected week
    controller.fetchPicks();
    controller.fetchNflGames();
  }
});
