
var when = require('when')
var lift = require('when/node/function').lift
var keys = require('when/keys')

var less = require('less')
var fs = require('fs')
var glob = lift(require('glob'))
var It = require('it.js')
var jsyaml = require('js-yaml')
var parseCSS = require('css-parse')
var stringifyCSS = require('css-stringify')
var readFile = lift(fs.readFile)

var multiply = require('./multiply')
var selectorDefinition = require('./selector_definition')

// exports
module.exports = compile

// -> final css
function compile() {
  return process().then(postProcess)
}

// -> { css, selectors }
function process() {
  return keys.all({
    css: readSource().then(compileLess),
    selectors: readSelectors()
  })
}

// -> (promise) main less code
function readSource() {
  return readFile('src/dark-facebook.less', 'utf-8')
}

// less source -> (promise) css code
function compileLess(source) {
  return when.promise(function(resolve, reject) {
    var parser = new(less.Parser)({
      paths: ['src'],
      filename: 'dark-facebook.less'
    })
    parser.parse(source, function (err, tree) {
      if (err) return reject(err)
      resolve(tree)
    })
  })
  .then(function(tree) {
    return tree.toCSS()
  })
}

// -> (promise) arrays of selectors
function readSelectors() {
  return when.reduce(when.map(glob('src/**/*.yml'), function(fileName) {
    return readFile(fileName, 'utf-8').then(jsyaml.safeLoad)
  }), function(a, b) { return a.concat([b]) }, [ ])
}

// -> mapping -> tree -> (preprocessed tree)
function postProcessSelectors(mapping) {
  var multiplier = multiply(mapping)
  return function recurse(tree) {
    if (tree.selectors) {
      tree.selectors = product(tree.selectors)
    }
    if (tree.type == 'declaration') {
      makeImportant(tree)
    }
    if (tree.rules && tree.rules.forEach) {
      tree.rules.forEach(recurse)
    }
    if (tree.declarations && tree.declarations.forEach) {
      tree.declarations.forEach(recurse)
    }
    if (tree.stylesheet) {
      recurse(tree.stylesheet)
    }
  }
  function makeImportant(decl) {
    decl.value = decl.value.replace(/(?:\s*!important)?$/, ' !important')
  }
  function product(selectors) {
    var output = []
    selectors.forEach(function(selector) {
      multiplier(selector).forEach(function(result) {
        output.push(result)
      })
    })
    return output
  }
}

// { css, selectors } -> final css
function postProcess(object) {
  var om = parseCSS(object.css)
  var mapping = createMapping(object.selectors)
  postProcessSelectors(mapping)(om)
  return stringifyCSS(om)
}

// [ components ] -> { name: [ selector text ] }
function createMapping(yamls) {
  var components =
        yamls.map(function(yaml) { return selectorDefinition.load(yaml) })
             .reduce(function(a, b) { return a.concat(b) }, [ ])
  return selectorDefinition.createMap(components)
}


