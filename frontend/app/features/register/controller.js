import Ember from 'ember';

const { computed } = Ember;

export default Ember.Controller.extend({
  errors: {},
  registrantData: {},
  submitBtnText: 'Create an Account',
  submitDisabled: computed('submitBtnText', {
    get() {
      return (this.get('submitBtnText') === 'Create an Account') ? false : true;
    }
  })
});
