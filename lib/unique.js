

module.exports = function unique(a) {
  var b = []
  a.forEach(function(c) { if (b.indexOf(c) < 0) b.push(c) })
  return b
}