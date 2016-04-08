import Ember from 'ember';
import DS from 'ember-data';

const { computed } = Ember;
const { attr, belongsTo } = DS;

export default DS.Model.extend({
  abbr: attr('string'),
  conference: attr('string'),
  city: attr('string'),
  name: attr('string'),

  user: belongsTo('user', { async: true }),

  display: computed('abbr', 'conference', 'city', 'name', {
    get() {
      return `${this.get('city')} ${this.get('name')}-${this.get('abbr')}-${this.get('conference')}`;
    }
  })
});
