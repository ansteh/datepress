'use strict';
const datepress = require('./index.js');
const moment = require('moment');

let start = new Date();
let end = moment(start).add(5, 'days').toDate();
console.log(datepress.range(start, end, 'days'));
