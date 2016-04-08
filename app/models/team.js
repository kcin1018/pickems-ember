import DS from 'ember-data';

const { attr, belongsTo, hasMany } = DS;

export default DS.Model.extend({
  name: attr('string'),
  paid: attr('boolean'),
  slug: attr('string'),

  user: belongsTo('user', { async: true }),

  picks: hasMany('team-pick', { async: true })
});
