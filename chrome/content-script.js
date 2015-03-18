
var port = chrome.runtime.connect({ name: 'dfb2' })

var activated = false

var link = document.createElement('link')
link.rel = 'stylesheet'

var head = document.getElementsByTagName('head')[0]
head.insertBefore(link, head.firstChild)

port.onMessage.addListener(function(state) {
  if (activated) {
    link.href = 'data:text/css,' + encodeURIComponent(state.css +
      '\n/*# sourceURL=dark-facebook.css */')
    if (!state.connected) {
      activated = false
      waitActivate()
    }
  }
})

waitActivate()

function waitActivate() {
  waitButton(function() {
    activated = true
    port.postMessage('activate')
  })
}

function waitButton(callback) {
  var element = document.createElement('button')
  element.innerHTML = 'Develop dark-facebook'
  element.setAttribute('style', 'position: fixed; bottom: 4px; right: 4px; z-index: 999999;')
  document.body.appendChild(element)
  element.addEventListener('click', function() {
    try {
      callback()
    } finally {
      document.body.removeChild(element)
    }
  })
}

