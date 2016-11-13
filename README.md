# datepress
date helpers to range, group, aggregate collections

## Installation

Using npm:

```js
npm install datepress
```
In Node.js:

```js
const datepress = require('datepress');
```

## Range example
```js
const moment = require('moment');

let start = new Date();
let end = moment(start).add(10, 'days').toDate();
let delimiter = 'days';
let dates = datepress.range(start, end, delimiter);
console.log(dates);
```

## groupBy example
```js
console.log(datepress.groupBy(dates, 'days'));
```

## License

MIT © [Andre Stehle](https://github.com/ansteh)
