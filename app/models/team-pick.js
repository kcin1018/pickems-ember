import DS from 'ember-data';

const { attr, belongsTo } = DS;

export default DS.Model.extend({
  week: attr('number'),
  number: attr('number'),
  valid: attr('boolean'),
  reason: attr('string'),
  picked_at: attr('string'),

  pick: belongsTo('nfl-stat', { async: true }),
  team: belongsTo('team', { async: true })
});
