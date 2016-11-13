'use strict';
const _       = require('lodash');
const moment  = require('moment');

const range = (start, end, delimiter, func) => {
  let step = moment(_.clone(start));
  let limit = moment(_.clone(end));
  let pool = [];
  let index = 0;

  while(step.isSameOrBefore(limit)) {
    let value = _.clone(step.toDate());
    if(func) {
      value = func(value, index);
    }
    pool.push(value);

    if(_.isString(delimiter)) {
      step.add(1, delimiter)
    } else {
      step.add(delimiter)
    }
    index += 1;
  }

  return pool;
};

const groupBy = (collection, delimiter, access) => {
  return _.groupBy(collection, (item) => {
    let date = item;
    if(_.isFunction(access)) {
      date = access(item);
    } else if(_.isString(access)) {
      date =_.get(item, access);
    }
    return moment(date).get(delimiter);
  });
};

module.exports = {
  range: range,
  groupBy: groupBy
};
