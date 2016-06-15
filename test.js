import test from 'ava';
import execa from 'execa';
import {version} from './package.json';

test('should have an error with an invalid URL', t => {
  t.throws(execa('./cli.js', ['cauealves.com']), /The given URL was not valid./);
});

test('should show the version when pass a parameter --version', async t => {
  t.is(await execa.stdout('./cli.js', ['--version']), version);
});

test('should have an error with an invalid public domain', async t => {
  let errorMessage = await execa.stdout('./cli.js', ['http://cauealves.cmo']);
  t.is(errorMessage, '\n\u001b[?25lCould not resolve the URL: http://cauealves.cmo \nPlease, check the spelling or make sure is accessible.\n\n\u001b[?25h');
});
