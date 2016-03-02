import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model() {
    return Ember.RSVP.hash({
      teams: this.store.findAll('team'),
      users: this.store.findAll('user')
    });
  }
});
