
var jsyaml = require('js-yaml')
var fs     = require('fs')
var seldef = require('../lib/selector_definition')
var expect = require('chai').expect

function read(file) {
  var content = fs.readFileSync(__dirname + '/selector_fixtures/' + file, 'utf-8')
  return jsyaml.safeLoad(content)
}

describe('selector_definition.load', function() {
  it('should return the flattened yaml', function() {
    expect(seldef.load(read('1-in.yml'))).to.deep.equal(read('1-out.yml'))
  })
})

describe('selector_definition.createMap', function() {
  it('should turn the result into selector map', function() {
    expect(seldef.createMap(read('1-out.yml'))).to.deep.equal(read('1-map.yml'))
  })
})