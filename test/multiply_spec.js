
var multiply = require('../lib/multiply')
var expect = require('chai').expect

describe('multiply', function() {
  
  it('should expand css', function() {

    var multiplier = multiply({
      'hello': ['world', 'css'],
      'testing': ['.durp', '.herp:hover'],
      'ah': [':::hello:hover']
    })

    expect(multiplier(':::hello')).to.deep.equal(['world', 'css'])

    expect(multiplier(':::hello :::testing')).to.deep.equal(
      ['world .durp', 'world .herp:hover',
       'css .durp', 'css .herp:hover']
    )
    
    expect(multiplier('y :::hello>:::hello+x')).to.deep.equal(
      ['y world>world+x', 'y world>css+x', 'y css>world+x', 'y css>css+x']
    )

    expect(multiplier(':::ah:active')).to.deep.equal(
      ['world:hover:active', 'css:hover:active']
    )

  })

})
