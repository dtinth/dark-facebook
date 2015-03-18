
const { EventTarget } = require('sdk/event/target')
let { emit } = require('sdk/event/core')

var pageMod = require('sdk/page-mod')
var pageWorker = require("sdk/page-worker")
var data = require('sdk/self').data

var server = (function() {
  var target = EventTarget()
  var state  = { css: '/* uninitialized */', connected: false }
  var worker = null
  var setState = function(newState) {
    state = newState
    emit(target, 'state', state)
  }
  target.activate = function() {
    if (worker != null) {
      return
    } else {
      worker = pageWorker.Page({
        contentURL: data.url('websocket.html'),
        contentScriptFile: data.url('websocket.js'),
      })
      worker.port.on('message', function(css) {
        setState({ css: css, connected: true })
      })
      worker.port.on('close', function() {
        worker.destroy()
        worker = null
        setState({ css: '/* disconnected! */', connected: false })
      })
    }
  }
  target.getState = function() {
    return state
  }
  return target
})()

pageMod.PageMod({
  include: ['*.facebook.com'],
  contentScriptFile: data.url('content-script.js'),
  onAttach: function(worker) {
    var listener = function(state) {
      worker.port.emit('state', state)
    }
    server.on('state', listener)
    worker.on('detach', function() {
      server.removeListener('state', listener)
    })
    worker.port.on('activate', function() {
      server.activate()
      worker.port.emit('state', server.getState())
    })
  },
})

