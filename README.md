# Moohash

For more information about mootools in general, visit http://mootools.net

In short it is a library for web development, with support for OOP.

This package is a port of https://github.com/vsviridov/mootools-node which implements only `toQueryString`.

# Usage

```js
var request = require('superagent');
var moohash = require('moohash');

var items = { item: [ ] };
items.item.push({
  col1: [ "foo" ],
  col2: [ "bar" ]
});

request
  .get('/some/url')
  .query(moohash.toQueryString(items));
```

This causes a URL like this to be generated:

```
/some/url?item[0][col1][0]=foo&item[0][col2][0]=bar
```

# Changes from upstream

- dangerous Object modifications removed
- `_.each` instead of their custom `Object.each`
- typeOf changed to not throw error when "item" is a string
- expand `!= null` to `!== null && !== undefined`
