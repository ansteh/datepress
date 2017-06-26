'use strict';
const _       = require('lodash');
const moment  = require('moment');

const DP = {};

DP.toDate = function(date, delimiter) {
  if(delimiter === "month") {
    return new Date(date.format("YYYY-MM-DD"));
  }

  return date.toDate();
};

DP.range = function(start, end, delimiter, func) {
  let step = moment(_.clone(start));
  let limit = moment(_.clone(end));
  let pool = [];
  let index = 0;

  while(step.isSameOrBefore(limit)) {
    let value = DP.toDate(step, delimiter);
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

DP.increment = function(dateable, delimiter) {
  let date = _.clone(dateable);
  let isMoment = moment.isMoment(dateable);
  if(isMoment == false) {
    date = moment(date);
  }
  date.endOf(delimiter).add(1, delimiter).startOf(delimiter);
  return isMoment ? date : DP.toDate(date, delimiter);
};

DP.delimit = function(start, end, delimiter, func) {
  let step = moment(_.clone(start));
  let limit = moment(_.clone(end));
  let pool = [];
  let index = 0;

  while(step.isSameOrBefore(limit)) {
    let value = DP.toDate(step, delimiter);
    if(func) {
      value = func(value, index);
    }
    pool.push(value);
    step = DP.increment(step, delimiter);
    index += 1;
  }

  return pool;
};

DP.groupBy = function(collection, delimiter, access) {
  return _.groupBy(collection, function(item) {
    let date = item;
    if(_.isFunction(access)) {
      date = access(item);
    } else if(_.isString(access)) {
      date =_.get(item, access);
    }
    return moment(date).get(delimiter);
  });
};

DP.batch = function(collection, delimiter, access) {
  let replication = _.cloneDeep(collection);
  if(_.isUndefined(access)) {
    access = function(x) { return x };
  }

  let start = access(_.first(replication));
  let end = access(_.last(replication));
  let limits = DP.delimit(start, end, delimiter);
  limits.shift();

  return _.reduce(limits, function(pool, limit) {
    let index = _.findIndex(replication, function(item) {
      return moment(limit).get(delimiter) === moment(access(item)).get(delimiter);
    });
    pool.push(_.take(replication, index+1));
    replication = _.slice(replication, index+1);
    return pool;
  }, []);
};

DP.findIndex = function(collection, date, access) {
  if(_.isUndefined(access)) {
    access = function(x) { return x };
  }
  let mark = moment(_.clone(date));
  return _.findIndex(collection, function(item) {
    return moment(access(item)).isSameOrAfter(mark);
  });
};

DP.slice = function(collection, start, end, access) {
  let startIndex = DP.findIndex(collection, start, access);
  if(startIndex === -1) {
    return [];
  }
  let endIndex = DP.findIndex(collection, end, access);
  if(endIndex === -1) endIndex = collection.length;
  // console.log(collection, start, end, _.slice(collection, startIndex, endIndex));
  return _.slice(collection, startIndex, endIndex);
};

module.exports = DP;
