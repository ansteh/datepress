'use strict';
const DP = require('./index.js');
const moment = require('moment');
const _      = require('lodash');

let start = new Date();
let end = moment(start).add(10, 'days').toDate();
let delimiter = 'days';
let dates = DP.range(start, end, delimiter);
// console.log(dates);
// console.log(DP.groupBy(dates, 'days'));

//sliced

let collection = [{
  date: moment().startOf('month').subtract(5, 'day').toDate(),
  value: 3
},{
  date: moment().startOf('month').subtract(3, 'day').toDate(),
  value: 2
},{
  date: new Date(),
  value: 10
}];

let getCashflow = (date, delimiter = 'month') => {
    let start = moment(_.clone(date)).startOf(delimiter);
    let end = moment(_.clone(date)).endOf(delimiter);

    // console.log('collection', collection);
    // console.log('start', start);
    // console.log('end', end);

    let sliced = DP.slice(collection, start, end, info => info.date);

    // console.log('sliced', sliced);

    return _
      .chain(sliced)
      .map('value')
      .sum()
      .value();
  };

let todayValue = getCashflow(new Date());
console.log('result:', todayValue);
console.log('first month:', 10 === todayValue);

let lastMonth = moment().startOf('month').subtract(10, 'day').toDate();
console.log('last month value:', getCashflow(lastMonth), 5 === getCashflow(lastMonth));
