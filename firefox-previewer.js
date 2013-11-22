function enumToArray(enumerator) {
    var out = []
    while (enumerator.hasMoreElements()) {
        var win = enumerator.getNext()
        out.push(win)
    }
    return out
}

function getWindows() {
    var windowMediator = Components.classes["@mozilla.org/appshell/window-mediator;1"]
                         .getService(Components.interfaces.nsIWindowMediator);
    return enumerator = windowMediator.getEnumerator(null)
}

function compose() {
    var functions = [].slice.call(arguments)
    return function() {
        return functions.slice(1).reduce(function(a, b) {
            return b(a)
        }, functions[0].apply(this, arguments))
    }
}

function its(x) {
    return new Function('it', 'return it' + x)
}

function get(x) {
    return function(o) {
        return o[x]
    }
}

function getWindow() {
    var windows = enumToArray(getWindows()).filter(its('.location.href == "chrome://stylish/content/edit.xul"'))
    return windows[0]
}

if (!getWindow()) {
    alert('Make sure you have a stylish editor window.')
}

var socket = new WebSocket('ws://localhost:7777')

socket.onmessage = function(e) {
    var stylish = getWindow()
    var css = e.data
    css = '@namespace url(http://www.w3.org/1999/xhtml);\n' +
            '@-moz-document domain("facebook.com") {\n\n' + css + '\n}\n';
    stylish.codeElementWrapper.value = css
    stylish.preview()
}

socket.onclose = function(e) {
    var stylish = getWindow()
    stylish.codeElementWrapper.value = '/* Server closed connection!\n' +
        'Please run the server and script again if you want to continue developing. */'
    stylish.preview()
}