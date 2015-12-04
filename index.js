'use strict';

const glob = require('glob');
const path = require('path');

const internals = {};

internals.indexBy = function(arr, index) {
  let result = {};
  arr.forEach(function(member) {
    result[member[index]] = member;
  });
  return result;
};

module.exports = function(pattern, options) {
  let requirements = glob.sync(pattern).map(function(file) {
    let requirement = {};
    requirement.path = file;
    let name = path.basename(file).replace(path.extname(file), '');
    requirement.module = require(path.resolve(file));
    let args = !options ? null : 
                          options[name] ? options[name] : 
                                          options['*'] ? options['*'] : null;
    if(args) {
      if(!(args instanceof Array)) {
        args = [args];
      }
      requirement.result = requirement.module.apply(null, args);
    }
    requirement.name = name;
    return requirement;
  });
  return internals.indexBy(requirements, 'name');
};
