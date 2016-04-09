import Ember from 'ember';

const { inject: { service } } = Ember;

export default Ember.Component.extend({
  classNames: ['footer', 'container-fluid'],
  system: service()
});
