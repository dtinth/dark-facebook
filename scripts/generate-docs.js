
var when = require('when')
var lift = require('when/node/function').lift
var fs = require('fs')

var glob = lift(require('glob'))
var It = require('it.js')
var jsyaml = require('js-yaml')
var selectorDefinition = require('../lib/selector_definition')
var readFile = lift(fs.readFile)
var writeFile = lift(fs.writeFile)

loadImageMap().then(function(imageMap) {
  return when.map(glob('src/selectors/**/*.yml'), process(imageMap))
  .tap(function() {
    console.log('Unused images:')
    console.log(imageMap.unused())
  })
  .then(function(filenames) {
    var readme = 'An automatically generated documentation of selectors used in dark-facebook 2:\n\n'
    filenames.sort()
    filenames.forEach(function(filename) {
      readme += ' * [' + filename + '](' + filename + ')\n'
    })
    return writeFile('docs/selectors/README.md', readme, 'utf-8')
  })
}).done()

function loadImageMap() {
  return glob('docs/images/components/*.png').then(function(images) {
    var map = { }
    images.forEach(function(image) {
      map[image] = image
    })
    return {
      fetch: function(id) {
        
        var base = 'docs/images/components/' + id.replace(/\(/g, '_').replace(/\)/g, '')
        var out = []
        
        var file = base + '.png'
        if (file in map) use(file, out)
        
        for (var i = 2; (file = base + '[' + i + '].png') in map; i ++) {
          use(file, out)
        }
        return out
      },
      unused: function() {
        return Object.keys(map)
      }
    }
    function use(file, out) {
      out.push(file)
      delete map[file]
    }
  })
}

function process(imageMap) {
  return function(fileName) {
    var outBasename = fileName
          .substr("src/selectors/".length)
          .replace(/\//g, '_')
          .replace(/\.yml$/, '.md')
    var outFilename = 'docs/selectors/' + outBasename
    return readFile(fileName, 'utf-8')
      .then(jsyaml.safeLoad)
      .then(selectorDefinition.load)
      .then(function(info) {
        var sections = ['# ' + fileName.substr(14) + '\n\n']
        info.forEach(function(component) {
          var section = ['## ' + component.id + '\n\n']
          var images = imageMap.fetch(component.id)
          images.forEach(function(image) {
            section.push('![' + image + '](../' + image.substr(5) + ')\n\n')
          })
          if (component.info) section.push(component.info + '\n\n')
          if (component.found) section.push('__Found:__ ' + component.found + '\n\n')
          if (component.selectors) {
            section.push('__Selectors:__\n\n')
            component.selectors.forEach(function(selector) {
              section.push(' * ' + selector + '\n')
            })
            section.push('\n')
          }
          sections.push(section.join(''))
        })
        return sections.join('\n\n')
      })
      .then(function(output) {
        return writeFile(outFilename, output, 'utf-8')
      })
      .then(function() {
        console.log('Written ' + outFilename)
        return outBasename
      })
  }
}
