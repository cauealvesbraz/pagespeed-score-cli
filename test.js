
import childProcess from 'child_process';
import test from 'ava';

test.cb(t => {
  //after transpiling it will be in folder tests\ so we have to specify our core file as ../file insted of ./file
  const cp = childProcess.spawn('node',['../dist/cli.js'],{stdio: 'inherit'});
  cp.on('error', t.ifError);

  cp.on('close', code => {
    t.is(code, 0);
    t.end();
  });
});
