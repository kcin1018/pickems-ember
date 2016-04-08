import Ember from 'ember';

const { inject: { service } } = Ember;

export default Ember.Component.extend({
  flashMessages: service(),
  classNames: ['flash-messages']
});
