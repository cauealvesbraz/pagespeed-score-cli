import test from 'ava';
import execa from 'execa';

test('with a invalid URL should be an exception', t => {
  t.throws(execa('./cli.js', ['cauealves.com']), /The given URL was not valid./);
});