
var watchr = require('watchr')
var compile = require('./lib/compiler')
var server = new (require('ws').Server)({ port: 7777 })

var result

function doCompile() {
  compile().then(function(data) {
    console.log(new Date() + ' - recompiled >> active connection: ' + connections.length)
    result = '/* compiled: ' + new Date() + ' */\n' + data
    connections.forEach(function(connection) {
      connection.send(result)
    })
  })
  .otherwise(console.error)
}

watchr.watch({
  path: 'src',
  preferredMethods: ['watchFile','watch'],
  listener: function() {
    doCompile()
  }
})

doCompile()

var connections = [ ]

server.on('connection', function(connection) {
  connections.push(connection)
  connection.send(result)
  console.log('connected >> active connections: ' + connections.length)
  connection.on('close', function() {
    connections.splice(connections.indexOf(connection), 1)
    console.log('disconnected >> active connections: ' + connections.length)
  })
})

