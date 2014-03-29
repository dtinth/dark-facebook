
var unique = require('./unique')

function arrayify(value) {
  return value ? (value.forEach ? value : [value]) : []
}

exports.load = function(yaml) {
  
  var out = [ ]
  
  ;(function recurse(components, parent) {
    
    Object.keys(components).forEach(function(key) {
      
      var name = key.replace(/\(.+$/, '')
      var spec = components[key]

      var object = {
        name: (parent ? parent.name + '--' : '') + name,
        id:   (parent ? parent.id   + '--' : '') + key
      }
      
      if (spec.info) object.info = spec.info
      if (spec.found) object.found = spec.found
      object.appearances = arrayify(spec.appearance)

      if (spec.selector) {
        
        var selectors = spec.selector.forEach ? spec.selector : [spec.selector]
        var parentSelectors = parent && parent.selectors ? parent.selectors : ['']
        
        object.selectors = []
        
        selectors.forEach(function(selector) {
          parentSelectors.forEach(function(parentSelector) {
            var currentSelector = selector.replace(/&/g, parentSelector)
            object.selectors.push(currentSelector)
          })
        })
        
        object.selectors = unique(object.selectors)
        
      } else {
        object.selectors = parent && parent.selectors
      }
      
      out.push(object)
      
      if (spec.children) {
        recurse(spec.children, object)
      }
      
    })
    
  })(yaml, null)
  
  return out
  
}

exports.createMap = function createMap(info) {

  var map = { }

  function add(name, selector) {
    ;(map[name] || (map[name] = [])).push(selector)
  }
  
  info.forEach(function(component) {
    var name = component.name
    component.selectors && component.selectors.forEach(function(selector) {
      add(name, selector)
      component.appearances.forEach(function(appearance) {
        add(appearance, selector)
      })
    })
  })
  
  return map
  
}


