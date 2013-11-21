
module.exports = function multiply(mapping) {
  return function multiplier(selector) {

    var pattern = /:::([\w\-]+)/g
    var match
    var stuff = []
    var index = 0

    while ((match = pattern.exec(selector))) {
      stuff.push([selector.substring(index, match.index)])
      index = match.index + match[0].length
      stuff.push(mapping[match[1]] || ['.dark-fb--' + match[0].substr(3)])
    }

    stuff.push([selector.substring(index)])
    
    var output = []

    function recurse(now, current) {
      if (now >= stuff.length) {
        output.push(current)
      } else {
        stuff[now].forEach(function(item) {
          recurse(now + 1, current + item)
        })
      }
    }

    recurse(0, '')

    return output.length <= 1 && output[0] === selector
      ? output
      : output.map(multiplier).reduce(function(a, b) { return a.concat(b) })

  }
}
