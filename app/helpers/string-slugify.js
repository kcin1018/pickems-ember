import Ember from 'ember';

export function stringSlugify(params) {
  let [string] = params;

  // make sure string is an actual string
  string = `${string}`;

  // regex to match all encoded uri components
  let regex = new RegExp(/%[0-9]+/g);

  // replace all encoded characters to -, remove duplicate -, and convert to lowercase
  return encodeURI(string.replace(regex, '-')
    // remove quotes
    .replace(/\'|\"/g, '')
    // convert all non-alpha-numeric to -
    .replace(/[^A-Za-z0-9]+/g, '-')
    // make sure dupliceate - are removed
    .replace(/[-]+/g, '-')
    // remove the last character if it is -
    .replace(/-$/g, '')
    // set the string to lowercase
    .toLowerCase());
}

export default Ember.Helper.helper(stringSlugify);
