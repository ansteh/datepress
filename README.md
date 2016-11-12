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
let end = moment(start).add(5, 'days').toDate();
let delimiter = 'days';
console.log(datepress.range(start, end, delimiter));
```

## License

MIT © [Andre Stehle](https://github.com/ansteh)
