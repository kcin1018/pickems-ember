import Ember from 'ember';
import Config from 'pickems/config/environment';

const { inject: { service } } = Ember;

export default Ember.Route.extend({
  session: service(),
  beforeModel() {
    if (this.get('session.isAuthenticated')) {
      this.transitionTo('storyline');
    }
  },
  model() {
    return $.getJSON(`${Config.api.host}/${Config.api.namespace}/home-stats`);
  }
});
