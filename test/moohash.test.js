var expect = require('chai').expect;

describe('MooTools Hash library', function() {
  var moohash;

  beforeEach(function() {
    moohash = require('../lib/moohash');
  });

  describe('toQueryString function', function() {
    it('does not get set in global Object', function() {
      expect(Object.toQueryString).to.not.be.ok;
    });

    it('serializes simple object', function() {
      var encodedString = moohash.toQueryString({ 'foo': 1, 'bar': 2 });
      expect(encodedString).to.equal('foo=1&bar=2');
    });

    it('serializes 2-D array', function() {
      var encodedString = moohash.toQueryString({ 'foo': [[3, 4]] });
      expect(encodedString).to.equal('foo[0][0]=3&foo[0][1]=4');
    });

    it('serializes nested object', function() {
      var encodedString = moohash.toQueryString({ 'foo': { bar: 1, baz: "two" } });
      expect(encodedString).to.equal('foo[bar]=1&foo[baz]=two');
    });

    it('serializes object containing array', function() {
      var encodedString = moohash.toQueryString({ 'foo': [{ bar: 1, baz: "two" }, "three"] });
      expect(encodedString).to.equal('foo[0][bar]=1&foo[0][baz]=two&foo[1]=three');
    });

    it('encodes special characters in values but not in keys', function() {
      var encodedString = moohash.toQueryString({ 'f%oo': [{ 'key': 'o%ne', 'b%ar': 2 }] });
      expect(encodedString).to.equal('f%oo[0][key]=o%25ne&f%oo[0][b%ar]=2');
    });
  });

});
