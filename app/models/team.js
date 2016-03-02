import DS from 'ember-data';
import { validator, buildValidations } from 'ember-cp-validations';

const { attr, belongsTo } = DS;

const Validations = buildValidations({
  first_name: {
    debounce: 500,
    validators: [
      validator('presence', true),
      validator('length', {
        max: 25
      })
    ]
  }
});

export default DS.Model.extend(Validations, {
  name: attr('string'),
  paid: attr('boolean'),

  user: belongsTo('user')
});
