/**
 * @public
 * Copyright 2016, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';

const {
  computed,
  defineProperty
} = Ember;

export default Ember.Component.extend({
  classNames: ['validated-input', 'form-group'],
  classNameBindings: ['showErrorClass:has-danger', 'isValid:has-success'],
  model: null,
  value: null,
  type: 'text',
  valuePath: '',
  placeholder: '',
  validation: null,
  isTyping: false,

  init() {
    this._super(...arguments);
    let valuePath = this.get('valuePath');
    defineProperty(this, 'validation', computed.oneWay(`model.validations.attrs.${valuePath}`));
    defineProperty(this, 'value', computed.alias(`model.${valuePath}`));
  },

  notValidating: computed.not('validation.isValidating'),
  didValidate: computed.oneWay('targetObject.didValidate'),
  hasContent: computed.notEmpty('value'),
  isValid: computed.and('hasContent', 'validation.isValid', 'notValidating'),
  isInvalid: computed.oneWay('validation.isInvalid'),
  validClass: computed('isValid', {
    get() {
      return this.get('isValid') ? 'form-control form-control-success' : 'form-control form-control-danger';
    }
  }),
  showErrorClass: computed.and('notValidating', 'showMessage', 'hasContent', 'validation'),
  showMessage: computed('validation.isDirty', 'isInvalid', 'didValidate', function() {
    return (this.get('validation.isDirty') || this.get('didValidate')) && this.get('isInvalid');
  })
});
