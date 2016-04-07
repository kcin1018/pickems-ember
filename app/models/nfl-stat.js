import Ember from 'ember';
import DS from 'ember-data';

const { computed } = Ember;
const { attr, belongsTo } = DS;

export default DS.Model.extend({
  week: attr('number'),
  td: attr('number'),
  fg: attr('number'),
  xp: attr('number'),
  two: attr('number'),
  diff: attr('number'),

  player: belongsTo('nfl-player', { async: true }),
  team: belongsTo('nfl-team', { async: true }),

  display: computed('player', 'team', {
    get() {
      return (this.get('team')) ? this.get('team.display') : this.get('player.display');
    }

  })
});
