
chrome.runtime.onConnect.addListener(function(port) {
  var socket = null
  port.onMessage.addListener(function(msg) {
    if (msg == 'activate') {
      if (socket == null) {
        socket = new WebSocket('ws://localhost:7777')
        socket.onmessage = function(e) {
          var css = e.data
          port.postMessage({ css: css, connected: true })
        }
        socket.onclose = function(e) {
          socket = null
          port.postMessage({ css: '/* disconnected */', connected: false })
        }
      }
    }
  })
  port.onDisconnect.addListener(function() {
    if (socket) {
      socket.close()
      socket = null
    }
  })
})


