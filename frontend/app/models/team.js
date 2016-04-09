import DS from 'ember-data';

const { attr, belongsTo } = DS;

export default DS.Model.extend({
  name: attr('string'),
  slug: attr('string'),
  paid: attr('boolean'),
  reg_points: attr('number'),
  reg_ranking: attr('string'),
  post_points: attr('number'),
  post_ranking: attr('string'),

  user: belongsTo('user')
});
