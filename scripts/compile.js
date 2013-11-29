
var compile = require('../lib/compiler')
var when = require('when')
var lift = require('when/node/function').lift
var exec = lift(require('child_process').exec)

function annotate(css) {
  if (!process.env.ANNOTATE_CSS) return css
  return exec("git log --format=format:'%h %ai' -n 1 src/").then(function(result) {
    var stdout = result[0]
    var stderr = result[1]
    var data = stdout.trim().split(/\s+/)
    return css.replace('$DATE$', data[1]).replace('$REVISION$', data[0])
  })
}

compile().then(annotate).done(console.log)
