'use strict';
const datepress = require('./index.js');
const moment = require('moment');

let start = new Date();
let end = moment(start).add(10, 'days').toDate();
let delimiter = 'days';
let dates = datepress.range(start, end, delimiter);
console.log(dates);

console.log(datepress.groupBy(dates, 'days'));
