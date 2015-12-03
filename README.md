# require-glob
An elaboration of a stack overflow comment on requiring groups of files. This allows you to require a directory of files using a [glob](https://github.com/isaacs/node-glob) pattern, optionally execute it, and returns reference objects containing name, path, module, and results.

## use
`const requirements = requireGlob('/my/javascript/files/**/*.js');`

The result returned by `require-glob` will look like this:
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

``const requirements = requireGlob('/my/javascript/files/**/*.js', { foo: ['bar'] } );`

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
