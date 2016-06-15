'use strict';

var _child_process = require('child_process');

var _child_process2 = _interopRequireDefault(_child_process);

var _ava = require('ava');

var _ava2 = _interopRequireDefault(_ava);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_ava2.default.cb(function (t) {
  //after transpiling it will be in folder tests\ so we have to specify our core file as ../file insted of ./file
  var cp = _child_process2.default.spawn('node', ['../dist/cli.js'], { stdio: 'inherit' });
  cp.on('error', t.ifError);

  cp.on('close', function (code) {
    t.is(code, 0);
    t.end();
  });
});