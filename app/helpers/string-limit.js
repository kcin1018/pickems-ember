import Ember from 'ember';

const { isEmpty } = Ember;
export function stringLimit(params/*, hash*/) {
  let [string, length] = params;

  // return an empty string
  if (isEmpty(string) || length < 1) {
    return '';
  }

  // return the string if the length is greater or equal
  if (string.length <= length) {
    return string;
  }

  // limit the string and append ...
  return `${string.substring(0, length)}...`;
}

export default Ember.Helper.helper(stringLimit);
