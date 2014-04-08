
var fs = require('fs')
var when = require('when')
var lift = require('when/node/function').lift
var exec = lift(require('child_process').exec)

var body = fs.readFileSync('theme-info.txt', 'utf-8')
exec("git log --format=format:'%ad (<code>%h</code>) %s' --date=short --grep='\\[' -n 20").spread(function(out, err) {
  console.log(body.replace('$CHANGELOG$', out))
})
