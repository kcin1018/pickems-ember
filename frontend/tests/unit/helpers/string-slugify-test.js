import { stringSlugify } from 'pickems/helpers/string-slugify';
import { module, test } from 'qunit';

module('Unit | Helper | string slugify');

// Replace this with your real tests.
test('it works', function(assert) {
  assert.equal(stringSlugify([42]), 42, 'it displays what its given');
  assert.equal(stringSlugify(['what\'s the what\'s']), 'whats-the-whats', 'it displays handles single quotes correctly');
  assert.equal(stringSlugify(['what"s the what"s']), 'whats-the-whats', 'it displays handles double quotes correctly');
  assert.equal(stringSlugify(['what the what?']), 'what-the-what', 'it displays minus special chars and spaces');
  assert.equal(stringSlugify(['multiple  spaces  are handled']), 'multiple-spaces-are-handled', 'it dispays handling multiple spaces');
});
