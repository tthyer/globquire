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
    requirement.name = path.basename(file).replace(path.extname(file), '');
    requirement.module = require(path.resolve(file));
    if(options && options[requirement.name] && options[requirement.name] instanceof Array) {
      requirement.result = requirement.module.apply(options[requirement.name]);
    }
    return requirement;
  });
  return internals.indexBy(requirements, 'name');
};
