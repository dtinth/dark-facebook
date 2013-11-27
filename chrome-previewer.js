
if (!editors[0].setValue) {
    alert('Make sure you are running this code in a stylish editor window.')
}

var socket = new WebSocket('ws://localhost:7777')

socket.onmessage = function(e) {
    var css = e.data
    editors[0].setValue(css)
    document.getElementById('save-button').click()
}

socket.onclose = function(e) {
    editors[0].setValue('/* Server closed connection!\n' +
        'Please run the server and script again if you want to continue developing. */')
    document.getElementById('save-button').click()
}
