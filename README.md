# globquire

[![Build Status](https://travis-ci.org/tthyer/globquire.svg?branch=master)](https://travis-ci.org/tthyer/globquire)

[![Coverage Status](https://coveralls.io/repos/tthyer/globquire/badge.svg?branch=master&service=github)](https://coveralls.io/github/tthyer/globquire?branch=master)

Allows requiring a group of files using a [glob](https://github.com/isaacs/node-glob) pattern, optionally execute it, and returns reference objects containing name, path, module, and results.

## use
`const requirements = globquire('/my/javascript/files/**/*.js');`

The result returned by `globquire` will look like this:
```
{
  foo: {
    name: 'foo',
    path: '/path/to/foo.js',
    module: [Function]
  }
}
```

You can specify that the module should also be executed by passing in an argument array in options, like so:

`const requirements = globquire('/my/javascript/files/**/*.js', { foo: ['bar'] } );`

and the results will be returned:
```
{
  foo: {
    name: 'foo',
    path: '/path/to/foo.js',
    module: [Function],
    result: 'some output'
  }
}
```
