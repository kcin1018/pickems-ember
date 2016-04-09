import Ember from 'ember';
import Config from 'pickems/config/environment';

export default Ember.Service.extend({
  year: 2016,
  config: Config,
  weeks: {
    reg: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
    post: [18, 19, 20, 21],
  },
  week: 1,
  selectedWeek: 1,
  paypal: 'rimlerm@gmail.com'
});
