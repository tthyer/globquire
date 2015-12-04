'use strict';
const globquire = require('../');
const test = require('tape');

test('requiring files', function(t) {
  let required = globquire(__dirname + '/fixtures/**/*.js');
  t.ok(required.bar && required.foo && required.bar.module && required.foo.module, 'has expected modules');
  t.notOk(required.bar.result && required.foo.result, 'not executed, so no results');
  t.end();
});

test('requiring files and executing one', function(t) {
  let str = 'test';
  let required = globquire(__dirname + '/fixtures/**/*.js', { args: { bar: [str] } });
  t.ok(required.bar && required.foo && required.bar.module && required.foo.module, 'has expected modules');
  t.equal(required.bar.result, str, 'has expected bar result');
  t.end();
});

test('requiring files and executing all with common args', function(t) {
  let str = 'test';
  let required = globquire(__dirname + '/fixtures/**/*.js', { args: { '*': [str] } });
  t.ok(required.bar && required.foo && required.bar.module && required.foo.module, 'has expected modules');
  t.equal(required.bar.result, str, 'has expected bar result');
  t.equal(required.foo.result, str, 'has expected foo result');
  t.end(); 
});
