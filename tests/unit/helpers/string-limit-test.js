import { stringLimit } from 'pickems/helpers/string-limit';
import { module, test } from 'qunit';

module('Unit | Helper | string limit');

// Replace this with your real tests.
test('it works', function(assert) {
  assert.equal('testing', stringLimit(['testing', 50]), 'it does not limit anything');
  assert.equal('testing o...', stringLimit(['testing one two three', 9]), 'it limits the string to 9 characters and appends ...');
  assert.equal('', stringLimit(['', 12]), 'it doesnt display anything');
  assert.equal('', stringLimit(['asdfsadf gbqbi ugbqw ', 0]), 'it doesnt display anything');
});
