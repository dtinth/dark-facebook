
var casper = require('casper').create()
var fs = require('fs')
var system = require('system')

var config = JSON.parse(fs.read(system.env.HOME + '/.dfb2.conf.json'))
var id = config.userstyles.id

phantom.addCookie({
  name: 'login',
  value: config.userstyles.cookie,
  domain: 'userstyles.org'
})

casper.start('http://userstyles.org/styles/' + id + '/edit')

casper.then(function() {

  var themeInfo = fs.read('dist/theme-description.txt')

  var css =
        '@namespace url(http://www.w3.org/1999/xhtml);\n' +
        '@-moz-document domain("facebook.com") {\n' +
        fs.read('dist/dark-facebook.min.css') +
        '\n}'

  console.log('Filling forms...')

  this.fillSelectors('form[action="/styles/update"]', {
    '#style_additional_info': themeInfo,
    '#css':                   css
  }, false)

  this.click('form[action="/styles/update"] input[type="submit"]')

})

casper.waitForSelector('#long-description', function() {
  console.log('Form submitted successfully!')
}, function() {
  console.log('Cannot submit form!')
  casper.capture('/tmp/dfb2-form.png')
}, 1000 * 20)

casper.then(function() {
  console.log(this.getCurrentUrl())
})

casper.run()

