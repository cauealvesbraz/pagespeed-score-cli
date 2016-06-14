import test from 'ava';
import execa from 'execa';

test('should have an error with an invalid URL', t => {
  t.throws(execa('./cli.js', ['cauealves.com']), /The given URL was not valid./);
});

test('should have an error without network connect', async t => {
  await execa('ifconfig', ['eth0', 'down']).then(() => {
    t.throws(execa('./cli.js', ['http://cauealves.com']), /Please check you internet connection./);
  });
});
