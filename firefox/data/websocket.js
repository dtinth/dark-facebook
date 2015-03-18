
var socket = new WebSocket('ws://localhost:7777')
socket.onmessage = function(e) {
  var css = e.data
  self.port.emit('message', css)
}
socket.onclose = function(e) {
  self.port.emit('close')
}
