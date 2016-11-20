# datepress
date helpers to range, group, aggregate collections

## Installation

Using npm:

```js
npm install datepress
```
In Node.js:

```js
const DP = require('datepress');
```

## Range example
```js
const moment = require('moment');

let start = new Date();
let end = moment(start).add(10, 'days').toDate();
let delimiter = 'days';
let dates = DP.range(start, end, delimiter);
console.log(dates);
```

## groupBy example
```js
console.log(DP.groupBy(dates, 'days'));
```

## findIndex example
```js
DP.findIndex(collection, date, access);
```

access is function used to get the date from a item of the collection. If not provided it defaults to identity function.

## slice example
DP.slice(collection, start, end, access);

## batch example
DP.batch(collection, delimiter, access);   

Returns batches from collection by provided delimiter. A delimiter parameter can be input known from moment.js like 'days', 'minutes',...
## License

MIT © [Andre Stehle](https://github.com/ansteh)
