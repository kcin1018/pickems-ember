import DS from 'ember-data';
import { validator, buildValidations } from 'ember-cp-validations';

const { attr } = DS;
const Validations = buildValidations({
  first_name: {
    debounce: 500,
    validators: [
      validator('presence', true),
      validator('length', {
        max: 25
      })
    ]
  },
  last_name: {
    debounce: 500,
    validators: [
      validator('presence', true),
      validator('length', {
        max: 25
      })
    ]
  },
  email: {
    debounce: 500,
    validators: [
      validator('presence', true),
      validator('format', {
        type: 'email'
      })
    ]
  },
  password: {
    description: 'Password',
    debounce: 500,
    validators: [
      validator('presence', true)
    ]
  },
  passwordConfirm: validator('confirmation', {
    on: 'password',
    message: 'Password addresses do not match',
    debounce: 500
  })
});

export default DS.Model.extend(Validations, {
  username: attr('string'),
  first_name: attr('string'),
  last_name: attr('string'),
  email: attr('string'),
  password: attr('string')
});
