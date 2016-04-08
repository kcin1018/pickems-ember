import Ember from 'ember';
import DS from 'ember-data';

const { computed } = Ember;
const { attr, belongsTo } = DS;

export default DS.Model.extend({
  gsis_id: attr('string'),
  name: attr('string'),
  position: attr('string'),
  active: attr('boolean'),

  team: belongsTo('nfl-team', { async: true }),

  display: computed('name', 'position', 'team', {
    get() {
      return `${this.get('name')}-${this.get('team.abbr')}-${this.get('position')}`;
    }
  })
});
