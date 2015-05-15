'use strict';

var _ = require('lodash');

function typeOf(item) {
  if (item === null || item === undefined) return 'null';
  if (item.$family) return item.$family();

  if (item.nodeName) {
    if (item.nodeType == 1) return 'element';
    if (item.nodeType == 3) return (/\S/).test(item.nodeValue) ? 'textnode' : 'whitespace';
  } else if (typeof item.length == 'number') {
    if (item.callee) return 'arguments';
    if (item.item) return 'collection';
  }

  return typeof item;
}

function toQueryString(object, base) {
  var queryString = [];

  _.each(object, function(value, key) {
    if (base) key = base + '[' + key + ']';
    var result;
    switch (typeOf(value)) {
    case 'object':
      result = toQueryString(value, key);
      break;
    case 'array':
      var qs = {};
      _.each(value, function(val, i) {
	qs[i] = val;
      });
      result = toQueryString(qs, key);
      break;
    default:
      result = key + '=' + encodeURIComponent(value);
    }
    if (value !== null && value !== undefined) queryString.push(result);
  });

  return queryString.join('&');
}

exports.toQueryString = toQueryString;
