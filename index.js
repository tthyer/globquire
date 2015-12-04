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
  options = options || {};
  let args = options.args || [];
  let requirements = glob.sync(pattern, options.ignore).map(function(file) {
    let requirement = {};
    requirement.path = file;
    let name = path.basename(file).replace(path.extname(file), '');
    requirement.module = require(path.resolve(file));
    let moduleArgs = args[name] ? args[name] : 
                                  args['*'] ? args['*'] : null;
    if(typeof requirement.module === 'function' && moduleArgs) {
      if(!(moduleArgs instanceof Array)) {
        moduleArgs = [moduleArgs];
      }
      requirement.result = requirement.module.apply(null, moduleArgs);
    }
    requirement.name = name;
    return requirement;
  });
  return internals.indexBy(requirements, 'name');
};
