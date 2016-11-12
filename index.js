'use strict';
const _       = require('lodash');
const moment  = require('moment');

const range = (start, end, delimiter, iteratee) => {
  let step = moment(_.clone(start));
  let limit = moment(_.clone(end));
  let pool = [];
  let index = 0;

  while(step.isSameOrBefore(limit)) {
    let value = _.clone(step.toDate());
    if(iteratee) {
      value = iteratee(value, index);
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

module.exports = {
  range: range
};
