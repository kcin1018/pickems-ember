import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.createRecord('user', {
      email: 'nick.felicelli@gmail.com',
      first_name: 'Nick',
      last_name: 'Felicelli',
      password: '10amonte',
      passwordConfirm: '10amonte'
    });
  }
});
