import Ember from 'ember';
import Config from 'pickems/config/environment';

const { service } = Ember.inject;

export default Ember.Service.extend({
  store: service(),
  config: Config,
  weeks: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
  currentWeek: 1,
  selectedWeek: 1
});
