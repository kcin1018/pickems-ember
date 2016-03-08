import Ember from 'ember';
import DS from 'ember-data';

const { computed } = Ember;
const { attr } = DS;

export default DS.Model.extend({
  first_name: attr('string'),
  last_name: attr('string'),
  email: attr('string'),
  password: attr('string'),
  is_staff: attr('boolean'),

  fullname: computed('first_name', 'last_name', {
    get() {
      return `${this.get('first_name')} ${this.get('last_name')}`;
    }
  })
});
