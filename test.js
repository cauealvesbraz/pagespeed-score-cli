import test from 'ava';
import execa from 'execa';
import {version} from './package.json';

test('should have an error with an invalid URL', t => {
  t.throws(execa('./cli.js', ['cauealves.com']), /The given URL was not valid./);
});

test('should show the version when pass a parameter --version', async t => {
  t.is(await execa.stdout('./cli.js', ['--version']), version);
});
