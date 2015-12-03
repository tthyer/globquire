'use strict';
const requireGlob = require('../');
const test = require('tape');

test('requiring files as modules', function(t) {
  let required = requireGlob(__dirname + '/fixtures/**/*.js');
  t.ok(required.bar && required.foo && required.bar.module && required.foo.module, 'has expected modules');
  t.notOk(required.bar.results && required.foo.results, 'not executed, so no results');
  t.end();
});

test('requiring files as modules and executing', function(t) {
  let required = requireGlob(__dirname + '/fixtures/**/*.js', { bar: ['test'] } );
  t.ok(required.bar && required.foo && required.bar.module && required.foo.module, 'has expected modules');
  t.equal(required.bar.results, 'bar', 'has bar result');
  t.end();
});
