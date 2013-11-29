
var unique = require('../lib/unique')
var expect = require('chai').expect

describe('unique', function() {
  it('should return the array with duplicates removed', function() {
    
    expect(unique([1,2,3])).to.deep.equal([1,2,3])
    expect(unique([1,2,3,2,1])).to.deep.equal([1,2,3])
    expect(unique([2,3,2,1])).to.deep.equal([2,3,1])
    expect(unique(['piece', 'of', 'my', 'life',
                   'i', 'still', 'to', 'still',
                   'wall', 'is', 'in', 'my', 'heart']))
      .to.deep.equal(['piece', 'of', 'my', 'life',
                      'i', 'still', 'to',
                      'wall', 'is', 'in', 'heart'])
  })
})