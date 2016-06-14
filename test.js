import test from 'ava';
import execa from 'execa';

test('should have an error with an invalid URL', t => {
  t.throws(execa('./cli.js', ['cauealves.com']), /The given URL was not valid./);
});
