(function () {/* Zepto v1.1.3 - zepto event ajax form ie detect fx fx_methods data touch - zeptojs.com/license */

/* 01/04/2014 SMD: Patched for https://github.com/madrobby/zepto/issues/932 */

var Zepto = (function() {
  var undefined, key, $, classList, emptyArray = [], slice = emptyArray.slice, filter = emptyArray.filter,
    document = window.document,
    elementDisplay = {}, classCache = {},
    cssNumber = { 'column-count': 1, 'columns': 1, 'font-weight': 1, 'line-height': 1,'opacity': 1, 'z-index': 1, 'zoom': 1 },
    fragmentRE = /^\s*<(\w+|!)[^>]*>/,
    singleTagRE = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
    tagExpanderRE = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,
    rootNodeRE = /^(?:body|html)$/i,
    capitalRE = /([A-Z])/g,

    // special attributes that should be get/set via method calls
    methodAttributes = ['val', 'css', 'html', 'text', 'data', 'width', 'height', 'offset'],

    adjacencyOperators = [ 'after', 'prepend', 'before', 'append' ],
    table = document.createElement('table'),
    tableRow = document.createElement('tr'),
    containers = {
      'tr': document.createElement('tbody'),
      'tbody': table, 'thead': table, 'tfoot': table,
      'td': tableRow, 'th': tableRow,
      '*': document.createElement('div')
    },
    readyRE = /complete|loaded|interactive/,
    simpleSelectorRE = /^[\w-]*$/,
    class2type = {},
    toString = class2type.toString,
    zepto = {},
    camelize, uniq,
    tempParent = document.createElement('div'),
    propMap = {
      'tabindex': 'tabIndex',
      'readonly': 'readOnly',
      'for': 'htmlFor',
      'class': 'className',
      'maxlength': 'maxLength',
      'cellspacing': 'cellSpacing',
      'cellpadding': 'cellPadding',
      'rowspan': 'rowSpan',
      'colspan': 'colSpan',
      'usemap': 'useMap',
      'frameborder': 'frameBorder',
      'contenteditable': 'contentEditable'
    },
    isArray = Array.isArray ||
      function(object){ return object instanceof Array }

  zepto.matches = function(element, selector) {
    if (!selector || !element || element.nodeType !== 1) return false
    var matchesSelector = element.webkitMatchesSelector || element.mozMatchesSelector ||
                          element.oMatchesSelector || element.matchesSelector
    if (matchesSelector) return matchesSelector.call(element, selector)
    // fall back to performing a selector:
    var match, parent = element.parentNode, temp = !parent
    if (temp) (parent = tempParent).appendChild(element)
    match = ~zepto.qsa(parent, selector).indexOf(element)
    temp && tempParent.removeChild(element)
    return match
  }

  function type(obj) {
    return obj == null ? String(obj) :
      class2type[toString.call(obj)] || "object"
  }

  function isFunction(value) { return type(value) == "function" }
  function isWindow(obj)     { return obj != null && obj == obj.window }
  function isDocument(obj)   { return obj != null && obj.nodeType == obj.DOCUMENT_NODE }
  function isObject(obj)     { return type(obj) == "object" }
  function isPlainObject(obj) {
    return isObject(obj) && !isWindow(obj) && Object.getPrototypeOf(obj) == Object.prototype
  }
  function likeArray(obj) { return typeof obj.length == 'number' }

  function compact(array) { return filter.call(array, function(item){ return item != null }) }
  function flatten(array) { return array.length > 0 ? $.fn.concat.apply([], array) : array }
  camelize = function(str){ return str.replace(/-+(.)?/g, function(match, chr){ return chr ? chr.toUpperCase() : '' }) }
  function dasherize(str) {
    return str.replace(/::/g, '/')
           .replace(/([A-Z]+)([A-Z][a-z])/g, '$1_$2')
           .replace(/([a-z\d])([A-Z])/g, '$1_$2')
           .replace(/_/g, '-')
           .toLowerCase()
  }
  uniq = function(array){ return filter.call(array, function(item, idx){ return array.indexOf(item) == idx }) }

  function classRE(name) {
    return name in classCache ?
      classCache[name] : (classCache[name] = new RegExp('(^|\\s)' + name + '(\\s|$)'))
  }

  function maybeAddPx(name, value) {
    return (typeof value == "number" && !cssNumber[dasherize(name)]) ? value + "px" : value
  }

  function defaultDisplay(nodeName) {
    var element, display
    if (!elementDisplay[nodeName]) {
      element = document.createElement(nodeName)
      document.body.appendChild(element)
      display = getComputedStyle(element, '').getPropertyValue("display")
      element.parentNode.removeChild(element)
      display == "none" && (display = "block")
      elementDisplay[nodeName] = display
    }
    return elementDisplay[nodeName]
  }

  function children(element) {
    return 'children' in element ?
      slice.call(element.children) :
      $.map(element.childNodes, function(node){ if (node.nodeType == 1) return node })
  }

  // `$.zepto.fragment` takes a html string and an optional tag name
  // to generate DOM nodes nodes from the given html string.
  // The generated DOM nodes are returned as an array.
  // This function can be overriden in plugins for example to make
  // it compatible with browsers that don't support the DOM fully.
  zepto.fragment = function(html, name, properties) {
    var dom, nodes, container

    // A special case optimization for a single tag
    if (singleTagRE.test(html)) dom = $(document.createElement(RegExp.$1))

    if (!dom) {
      if (html.replace) html = html.replace(tagExpanderRE, "<$1></$2>")
      if (name === undefined) name = fragmentRE.test(html) && RegExp.$1
      if (!(name in containers)) name = '*'

      container = containers[name]
      container.innerHTML = '' + html
      dom = $.each(slice.call(container.childNodes), function(){
        container.removeChild(this)
      })
    }

    if (isPlainObject(properties)) {
      nodes = $(dom)
      $.each(properties, function(key, value) {
        if (methodAttributes.indexOf(key) > -1) nodes[key](value)
        else nodes.attr(key, value)
      })
    }

    return dom
  }

  // `$.zepto.Z` swaps out the prototype of the given `dom` array
  // of nodes with `$.fn` and thus supplying all the Zepto functions
  // to the array. Note that `__proto__` is not supported on Internet
  // Explorer. This method can be overriden in plugins.
  zepto.Z = function(dom, selector) {
    dom = dom || []
    dom.__proto__ = $.fn
    dom.selector = selector || ''
    return dom
  }

  // `$.zepto.isZ` should return `true` if the given object is a Zepto
  // collection. This method can be overriden in plugins.
  zepto.isZ = function(object) {
    return object instanceof zepto.Z
  }

  // `$.zepto.init` is Zepto's counterpart to jQuery's `$.fn.init` and
  // takes a CSS selector and an optional context (and handles various
  // special cases).
  // This method can be overriden in plugins.
  zepto.init = function(selector, context) {
    var dom
    // If nothing given, return an empty Zepto collection
    if (!selector) return zepto.Z()
    // Optimize for string selectors
    else if (typeof selector == 'string') {
      selector = selector.trim()
      // If it's a html fragment, create nodes from it
      // Note: In both Chrome 21 and Firefox 15, DOM error 12
      // is thrown if the fragment doesn't begin with <
      if (selector[0] == '<' && fragmentRE.test(selector))
        dom = zepto.fragment(selector, RegExp.$1, context), selector = null
      // If there's a context, create a collection on that context first, and select
      // nodes from there
      else if (context !== undefined) return $(context).find(selector)
      // If it's a CSS selector, use it to select nodes.
      else dom = zepto.qsa(document, selector)
    }
    // If a function is given, call it when the DOM is ready
    else if (isFunction(selector)) return $(document).ready(selector)
    // If a Zepto collection is given, just return it
    else if (zepto.isZ(selector)) return selector
    else {
      // normalize array if an array of nodes is given
      if (isArray(selector)) dom = compact(selector)
      // Wrap DOM nodes.
      else if (isObject(selector))
        dom = [selector], selector = null
      // If it's a html fragment, create nodes from it
      else if (fragmentRE.test(selector))
        dom = zepto.fragment(selector.trim(), RegExp.$1, context), selector = null
      // If there's a context, create a collection on that context first, and select
      // nodes from there
      else if (context !== undefined) return $(context).find(selector)
      // And last but no least, if it's a CSS selector, use it to select nodes.
      else dom = zepto.qsa(document, selector)
    }
    // create a new Zepto collection from the nodes found
    return zepto.Z(dom, selector)
  }

  // `$` will be the base `Zepto` object. When calling this
  // function just call `$.zepto.init, which makes the implementation
  // details of selecting nodes and creating Zepto collections
  // patchable in plugins.
  $ = function(selector, context){
    return zepto.init(selector, context)
  }

  function extend(target, source, deep) {
    for (key in source)
      if (deep && (isPlainObject(source[key]) || isArray(source[key]))) {
        if (isPlainObject(source[key]) && !isPlainObject(target[key]))
          target[key] = {}
        if (isArray(source[key]) && !isArray(target[key]))
          target[key] = []
        extend(target[key], source[key], deep)
      }
      else if (source[key] !== undefined) target[key] = source[key]
  }

  // Copy all but undefined properties from one or more
  // objects to the `target` object.
  $.extend = function(target){
    var deep, args = slice.call(arguments, 1)
    if (typeof target == 'boolean') {
      deep = target
      target = args.shift()
    }
    args.forEach(function(arg){ extend(target, arg, deep) })
    return target
  }

  // `$.zepto.qsa` is Zepto's CSS selector implementation which
  // uses `document.querySelectorAll` and optimizes for some special cases, like `#id`.
  // This method can be overriden in plugins.
  zepto.qsa = function(element, selector){
    var found,
        maybeID = selector[0] == '#',
        maybeClass = !maybeID && selector[0] == '.',
        nameOnly = maybeID || maybeClass ? selector.slice(1) : selector, // Ensure that a 1 char tag name still gets checked
        isSimple = simpleSelectorRE.test(nameOnly)
    return (isDocument(element) && isSimple && maybeID) ?
      ( (found = element.getElementById(nameOnly)) ? [found] : [] ) :
      (element.nodeType !== 1 && element.nodeType !== 9) ? [] :
      slice.call(
        isSimple && !maybeID ?
          maybeClass ? element.getElementsByClassName(nameOnly) : // If it's simple, it could be a class
          element.getElementsByTagName(selector) : // Or a tag
          element.querySelectorAll(selector) // Or it's not simple, and we need to query all
      )
  }

  function filtered(nodes, selector) {
    return selector == null ? $(nodes) : $(nodes).filter(selector)
  }

  $.contains = function(parent, node) {
    return parent !== node && parent.contains(node)
  }

  function funcArg(context, arg, idx, payload) {
    return isFunction(arg) ? arg.call(context, idx, payload) : arg
  }

  function setAttribute(node, name, value) {
    value == null ? node.removeAttribute(name) : node.setAttribute(name, value)
  }

  // access className property while respecting SVGAnimatedString
  function className(node, value){
    var klass = node.className,
        svg   = klass && klass.baseVal !== undefined

    if (value === undefined) return svg ? klass.baseVal : klass
    svg ? (klass.baseVal = value) : (node.className = value)
  }

  // "true"  => true
  // "false" => false
  // "null"  => null
  // "42"    => 42
  // "42.5"  => 42.5
  // "08"    => "08"
  // JSON    => parse if valid
  // String  => self
  function deserializeValue(value) {
    var num
    try {
      return value ?
        value == "true" ||
        ( value == "false" ? false :
          value == "null" ? null :
          !/^0/.test(value) && !isNaN(num = Number(value)) ? num :
          /^[\[\{]/.test(value) ? $.parseJSON(value) :
          value )
        : value
    } catch(e) {
      return value
    }
  }

  $.type = type
  $.isFunction = isFunction
  $.isWindow = isWindow
  $.isArray = isArray
  $.isPlainObject = isPlainObject

  $.isEmptyObject = function(obj) {
    var name
    for (name in obj) return false
    return true
  }

  $.inArray = function(elem, array, i){
    return emptyArray.indexOf.call(array, elem, i)
  }

  $.camelCase = camelize
  $.trim = function(str) {
    return str == null ? "" : String.prototype.trim.call(str)
  }

  // plugin compatibility
  $.uuid = 0
  $.support = { }
  $.expr = { }

  $.map = function(elements, callback){
    var value, values = [], i, key
    if (likeArray(elements))
      for (i = 0; i < elements.length; i++) {
        value = callback(elements[i], i)
        if (value != null) values.push(value)
      }
    else
      for (key in elements) {
        value = callback(elements[key], key)
        if (value != null) values.push(value)
      }
    return flatten(values)
  }

  $.each = function(elements, callback){
    var i, key
    if (likeArray(elements)) {
      for (i = 0; i < elements.length; i++)
        if (callback.call(elements[i], i, elements[i]) === false) return elements
    } else {
      for (key in elements)
        if (callback.call(elements[key], key, elements[key]) === false) return elements
    }

    return elements
  }

  $.grep = function(elements, callback){
    return filter.call(elements, callback)
  }

  if (window.JSON) $.parseJSON = JSON.parse

  // Populate the class2type map
  $.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
    class2type[ "[object " + name + "]" ] = name.toLowerCase()
  })

  // Define methods that will be available on all
  // Zepto collections
  $.fn = {
    // Because a collection acts like an array
    // copy over these useful array functions.
    forEach: emptyArray.forEach,
    reduce: emptyArray.reduce,
    push: emptyArray.push,
    sort: emptyArray.sort,
    indexOf: emptyArray.indexOf,
    concat: emptyArray.concat,

    // `map` and `slice` in the jQuery API work differently
    // from their array counterparts
    map: function(fn){
      return $($.map(this, function(el, i){ return fn.call(el, i, el) }))
    },
    slice: function(){
      return $(slice.apply(this, arguments))
    },

    ready: function(callback){
      // need to check if document.body exists for IE as that browser reports
      // document ready when it hasn't yet created the body element
      if (readyRE.test(document.readyState) && document.body) callback($)
      else document.addEventListener('DOMContentLoaded', function(){ callback($) }, false)
      return this
    },
    get: function(idx){
      return idx === undefined ? slice.call(this) : this[idx >= 0 ? idx : idx + this.length]
    },
    toArray: function(){ return this.get() },
    size: function(){
      return this.length
    },
    remove: function(){
      return this.each(function(){
        if (this.parentNode != null)
          this.parentNode.removeChild(this)
      })
    },
    each: function(callback){
      emptyArray.every.call(this, function(el, idx){
        return callback.call(el, idx, el) !== false
      })
      return this
    },
    filter: function(selector){
      if (isFunction(selector)) return this.not(this.not(selector))
      return $(filter.call(this, function(element){
        return zepto.matches(element, selector)
      }))
    },
    add: function(selector,context){
      return $(uniq(this.concat($(selector,context))))
    },
    is: function(selector){
      return this.length > 0 && zepto.matches(this[0], selector)
    },
    not: function(selector){
      var nodes=[]
      if (isFunction(selector) && selector.call !== undefined)
        this.each(function(idx){
          if (!selector.call(this,idx)) nodes.push(this)
        })
      else {
        var excludes = typeof selector == 'string' ? this.filter(selector) :
          (likeArray(selector) && isFunction(selector.item)) ? slice.call(selector) : $(selector)
        this.forEach(function(el){
          if (excludes.indexOf(el) < 0) nodes.push(el)
        })
      }
      return $(nodes)
    },
    has: function(selector){
      return this.filter(function(){
        return isObject(selector) ?
          $.contains(this, selector) :
          $(this).find(selector).size()
      })
    },
    eq: function(idx){
      return idx === -1 ? this.slice(idx) : this.slice(idx, + idx + 1)
    },
    first: function(){
      var el = this[0]
      return el && !isObject(el) ? el : $(el)
    },
    last: function(){
      var el = this[this.length - 1]
      return el && !isObject(el) ? el : $(el)
    },
    find: function(selector){
      var result, $this = this
      if (typeof selector == 'object')
        result = $(selector).filter(function(){
          var node = this
          return emptyArray.some.call($this, function(parent){
            return $.contains(parent, node)
          })
        })
      else if (this.length == 1) result = $(zepto.qsa(this[0], selector))
      else result = this.map(function(){ return zepto.qsa(this, selector) })
      return result
    },
    closest: function(selector, context){
      var node = this[0], collection = false
      if (typeof selector == 'object') collection = $(selector)
      while (node && !(collection ? collection.indexOf(node) >= 0 : zepto.matches(node, selector)))
        node = node !== context && !isDocument(node) && node.parentNode
      return $(node)
    },
    parents: function(selector){
      var ancestors = [], nodes = this
      while (nodes.length > 0)
        nodes = $.map(nodes, function(node){
          if ((node = node.parentNode) && !isDocument(node) && ancestors.indexOf(node) < 0) {
            ancestors.push(node)
            return node
          }
        })
      return filtered(ancestors, selector)
    },
    parent: function(selector){
      return filtered(uniq(this.pluck('parentNode')), selector)
    },
    children: function(selector){
      return filtered(this.map(function(){ return children(this) }), selector)
    },
    contents: function() {
      return this.map(function() { return slice.call(this.childNodes) })
    },
    siblings: function(selector){
      return filtered(this.map(function(i, el){
        return filter.call(children(el.parentNode), function(child){ return child!==el })
      }), selector)
    },
    empty: function(){
      return this.each(function(){ this.innerHTML = '' })
    },
    // `pluck` is borrowed from Prototype.js
    pluck: function(property){
      return $.map(this, function(el){ return el[property] })
    },
    show: function(){
      return this.each(function(){
        this.style.display == "none" && (this.style.display = '')
        if (getComputedStyle(this, '').getPropertyValue("display") == "none")
          this.style.display = defaultDisplay(this.nodeName)
      })
    },
    replaceWith: function(newContent){
      return this.before(newContent).remove()
    },
    wrap: function(structure){
      var func = isFunction(structure)
      if (this[0] && !func)
        var dom   = $(structure).get(0),
            clone = dom.parentNode || this.length > 1

      return this.each(function(index){
        $(this).wrapAll(
          func ? structure.call(this, index) :
            clone ? dom.cloneNode(true) : dom
        )
      })
    },
    wrapAll: function(structure){
      if (this[0]) {
        $(this[0]).before(structure = $(structure))
        var children
        // drill down to the inmost element
        while ((children = structure.children()).length) structure = children.first()
        $(structure).append(this)
      }
      return this
    },
    wrapInner: function(structure){
      var func = isFunction(structure)
      return this.each(function(index){
        var self = $(this), contents = self.contents(),
            dom  = func ? structure.call(this, index) : structure
        contents.length ? contents.wrapAll(dom) : self.append(dom)
      })
    },
    unwrap: function(){
      this.parent().each(function(){
        $(this).replaceWith($(this).children())
      })
      return this
    },
    clone: function(){
      return this.map(function(){ return this.cloneNode(true) })
    },
    hide: function(){
      return this.css("display", "none")
    },
    toggle: function(setting){
      return this.each(function(){
        var el = $(this)
        ;(setting === undefined ? el.css("display") == "none" : setting) ? el.show() : el.hide()
      })
    },
    prev: function(selector){ return $(this.pluck('previousElementSibling')).filter(selector || '*') },
    next: function(selector){ return $(this.pluck('nextElementSibling')).filter(selector || '*') },
    html: function(html){
      return arguments.length === 0 ?
        (this.length > 0 ? this[0].innerHTML : null) :
        this.each(function(idx){
          var originHtml = this.innerHTML
          $(this).empty().append( funcArg(this, html, idx, originHtml) )
        })
    },
    text: function(text){
      return arguments.length === 0 ?
        (this.length > 0 ? this[0].textContent : null) :
        this.each(function(){ this.textContent = (text === undefined) ? '' : ''+text })
    },
    attr: function(name, value){
      var result
      return (typeof name == 'string' && value === undefined) ?
        (this.length == 0 || this[0].nodeType !== 1 ? undefined :
          (name == 'value' && this[0].nodeName == 'INPUT') ? this.val() :
          (!(result = this[0].getAttribute(name)) && name in this[0]) ? this[0][name] : result
        ) :
        this.each(function(idx){
          if (this.nodeType !== 1) return
          if (isObject(name)) for (key in name) setAttribute(this, key, name[key])
          else setAttribute(this, name, funcArg(this, value, idx, this.getAttribute(name)))
        })
    },
    removeAttr: function(name){
      return this.each(function(){ this.nodeType === 1 && setAttribute(this, name) })
    },
    prop: function(name, value){
      name = propMap[name] || name
      return (value === undefined) ?
        (this[0] && this[0][name]) :
        this.each(function(idx){
          this[name] = funcArg(this, value, idx, this[name])
        })
    },
    data: function(name, value){
      var data = this.attr('data-' + name.replace(capitalRE, '-$1').toLowerCase(), value)
      return data !== null ? deserializeValue(data) : undefined
    },
    val: function(value){
      return arguments.length === 0 ?
        (this[0] && (this[0].multiple ?
           $(this[0]).find('option').filter(function(){ return this.selected }).pluck('value') :
           this[0].value)
        ) :
        this.each(function(idx){
          this.value = funcArg(this, value, idx, this.value)
        })
    },
    offset: function(coordinates){
      if (coordinates) return this.each(function(index){
        var $this = $(this),
            coords = funcArg(this, coordinates, index, $this.offset()),
            parentOffset = $this.offsetParent().offset(),
            props = {
              top:  coords.top  - parentOffset.top,
              left: coords.left - parentOffset.left
            }

        if ($this.css('position') == 'static') props['position'] = 'relative'
        $this.css(props)
      })
      if (this.length==0) return null
      var obj = this[0].getBoundingClientRect()
      return {
        left: obj.left + window.pageXOffset,
        top: obj.top + window.pageYOffset,
        width: Math.round(obj.width),
        height: Math.round(obj.height)
      }
    },
    css: function(property, value){
      if (arguments.length < 2) {
        var element = this[0], computedStyle = getComputedStyle(element, '')
        if(!element) return
        if (typeof property == 'string')
          return element.style[camelize(property)] || computedStyle.getPropertyValue(property)
        else if (isArray(property)) {
          var props = {}
          $.each(isArray(property) ? property: [property], function(_, prop){
            props[prop] = (element.style[camelize(prop)] || computedStyle.getPropertyValue(prop))
          })
          return props
        }
      }

      var css = ''
      if (type(property) == 'string') {
        if (!value && value !== 0)
          this.each(function(){ this.style.removeProperty(dasherize(property)) })
        else
          css = dasherize(property) + ":" + maybeAddPx(property, value)
      } else {
        for (key in property)
          if (!property[key] && property[key] !== 0)
            this.each(function(){ this.style.removeProperty(dasherize(key)) })
          else
            css += dasherize(key) + ':' + maybeAddPx(key, property[key]) + ';'
      }

      return this.each(function(){ this.style.cssText += ';' + css })
    },
    index: function(element){
      return element ? this.indexOf($(element)[0]) : this.parent().children().indexOf(this[0])
    },
    hasClass: function(name){
      if (!name) return false
      return emptyArray.some.call(this, function(el){
        return this.test(className(el))
      }, classRE(name))
    },
    addClass: function(name){
      if (!name) return this
      return this.each(function(idx){
        classList = []
        var cls = className(this), newName = funcArg(this, name, idx, cls)
        newName.split(/\s+/g).forEach(function(klass){
          if (!$(this).hasClass(klass)) classList.push(klass)
        }, this)
        classList.length && className(this, cls + (cls ? " " : "") + classList.join(" "))
      })
    },
    removeClass: function(name){
      return this.each(function(idx){
        if (name === undefined) return className(this, '')
        classList = className(this)
        funcArg(this, name, idx, classList).split(/\s+/g).forEach(function(klass){
          classList = classList.replace(classRE(klass), " ")
        })
        className(this, classList.trim())
      })
    },
    toggleClass: function(name, when){
      if (!name) return this
      return this.each(function(idx){
        var $this = $(this), names = funcArg(this, name, idx, className(this))
        names.split(/\s+/g).forEach(function(klass){
          (when === undefined ? !$this.hasClass(klass) : when) ?
            $this.addClass(klass) : $this.removeClass(klass)
        })
      })
    },
    scrollTop: function(value){
      if (!this.length) return
      var hasScrollTop = 'scrollTop' in this[0]
      if (value === undefined) return hasScrollTop ? this[0].scrollTop : this[0].pageYOffset
      return this.each(hasScrollTop ?
        function(){ this.scrollTop = value } :
        function(){ this.scrollTo(this.scrollX, value) })
    },
    scrollLeft: function(value){
      if (!this.length) return
      var hasScrollLeft = 'scrollLeft' in this[0]
      if (value === undefined) return hasScrollLeft ? this[0].scrollLeft : this[0].pageXOffset
      return this.each(hasScrollLeft ?
        function(){ this.scrollLeft = value } :
        function(){ this.scrollTo(value, this.scrollY) })
    },
    position: function() {
      if (!this.length) return

      var elem = this[0],
        // Get *real* offsetParent
        offsetParent = this.offsetParent(),
        // Get correct offsets
        offset       = this.offset(),
        parentOffset = rootNodeRE.test(offsetParent[0].nodeName) ? { top: 0, left: 0 } : offsetParent.offset()

      // Subtract element margins
      // note: when an element has margin: auto the offsetLeft and marginLeft
      // are the same in Safari causing offset.left to incorrectly be 0
      offset.top  -= parseFloat( $(elem).css('margin-top') ) || 0
      offset.left -= parseFloat( $(elem).css('margin-left') ) || 0

      // Add offsetParent borders
      parentOffset.top  += parseFloat( $(offsetParent[0]).css('border-top-width') ) || 0
      parentOffset.left += parseFloat( $(offsetParent[0]).css('border-left-width') ) || 0

      // Subtract the two offsets
      return {
        top:  offset.top  - parentOffset.top,
        left: offset.left - parentOffset.left
      }
    },
    offsetParent: function() {
      return this.map(function(){
        var parent = this.offsetParent || document.body
        while (parent && !rootNodeRE.test(parent.nodeName) && $(parent).css("position") == "static")
          parent = parent.offsetParent
        return parent
      })
    }
  }

  // for now
  $.fn.detach = $.fn.remove

  // Generate the `width` and `height` functions
  ;['width', 'height'].forEach(function(dimension){
    var dimensionProperty =
      dimension.replace(/./, function(m){ return m[0].toUpperCase() })

    $.fn[dimension] = function(value){
      var offset, el = this[0]
      if (value === undefined) return isWindow(el) ? el['inner' + dimensionProperty] :
        isDocument(el) ? el.documentElement['scroll' + dimensionProperty] :
        (offset = this.offset()) && offset[dimension]
      else return this.each(function(idx){
        el = $(this)
        el.css(dimension, funcArg(this, value, idx, el[dimension]()))
      })
    }
  })

  function traverseNode(node, fun) {
    fun(node)
    for (var key in node.childNodes) traverseNode(node.childNodes[key], fun)
  }

  // Generate the `after`, `prepend`, `before`, `append`,
  // `insertAfter`, `insertBefore`, `appendTo`, and `prependTo` methods.
  adjacencyOperators.forEach(function(operator, operatorIndex) {
    var inside = operatorIndex % 2 //=> prepend, append

    $.fn[operator] = function(){
      // arguments can be nodes, arrays of nodes, Zepto objects and HTML strings
      var argType, nodes = $.map(arguments, function(arg) {
            argType = type(arg)
            return argType == "object" || argType == "array" || arg == null ?
              arg : zepto.fragment(arg)
          }),
          parent, copyByClone = this.length > 1
      if (nodes.length < 1) return this

      return this.each(function(_, target){
        parent = inside ? target : target.parentNode

        // convert all methods to a "before" operation
        target = operatorIndex == 0 ? target.nextSibling :
                 operatorIndex == 1 ? target.firstChild :
                 operatorIndex == 2 ? target :
                 null

        nodes.forEach(function(node){
          if (copyByClone) node = node.cloneNode(true)
          else if (!parent) return $(node).remove()

          traverseNode(parent.insertBefore(node, target), function(el){
            if (el.nodeName != null && el.nodeName.toUpperCase() === 'SCRIPT' &&
               (!el.type || el.type === 'text/javascript') && !el.src)
              window['eval'].call(window, el.innerHTML)
          })
        })
      })
    }

    // after    => insertAfter
    // prepend  => prependTo
    // before   => insertBefore
    // append   => appendTo
    $.fn[inside ? operator+'To' : 'insert'+(operatorIndex ? 'Before' : 'After')] = function(html){
      $(html)[operator](this)
      return this
    }
  })

  zepto.Z.prototype = $.fn

  // Export internal API functions in the `$.zepto` namespace
  zepto.uniq = uniq
  zepto.deserializeValue = deserializeValue
  $.zepto = zepto

  return $
})()

window.Zepto = Zepto
window.$ === undefined && (window.$ = Zepto)

;(function($){
  var _zid = 1, undefined,
      slice = Array.prototype.slice,
      isFunction = $.isFunction,
      isString = function(obj){ return typeof obj == 'string' },
      handlers = {},
      specialEvents={},
      focusinSupported = 'onfocusin' in window,
      focus = { focus: 'focusin', blur: 'focusout' },
      hover = { mouseenter: 'mouseover', mouseleave: 'mouseout' }

  specialEvents.click = specialEvents.mousedown = specialEvents.mouseup = specialEvents.mousemove = 'MouseEvents'

  function zid(element) {
    return element._zid || (element._zid = _zid++)
  }
  function findHandlers(element, event, fn, selector) {
    event = parse(event)
    if (event.ns) var matcher = matcherFor(event.ns)
    return (handlers[zid(element)] || []).filter(function(handler) {
      return handler
        && (!event.e  || handler.e == event.e)
        && (!event.ns || matcher.test(handler.ns))
        && (!fn       || zid(handler.fn) === zid(fn))
        && (!selector || handler.sel == selector)
    })
  }
  function parse(event) {
    var parts = ('' + event).split('.')
    return {e: parts[0], ns: parts.slice(1).sort().join(' ')}
  }
  function matcherFor(ns) {
    return new RegExp('(?:^| )' + ns.replace(' ', ' .* ?') + '(?: |$)')
  }

  function eventCapture(handler, captureSetting) {
    return handler.del &&
      (!focusinSupported && (handler.e in focus)) ||
      !!captureSetting
  }

  function realEvent(type) {
    return hover[type] || (focusinSupported && focus[type]) || type
  }

  function add(element, events, fn, data, selector, delegator, capture){
    var id = zid(element), set = (handlers[id] || (handlers[id] = []))
    events.split(/\s/).forEach(function(event){
      if (event == 'ready') return $(document).ready(fn)
      var handler   = parse(event)
      handler.fn    = fn
      handler.sel   = selector
      // emulate mouseenter, mouseleave
      if (handler.e in hover) fn = function(e){
        var related = e.relatedTarget
        if (!related || (related !== this && !$.contains(this, related)))
          return handler.fn.apply(this, arguments)
      }
      handler.del   = delegator
      var callback  = delegator || fn
      handler.proxy = function(e){
        e = compatible(e)
        if (e.isImmediatePropagationStopped()) return
        e.data = data
        var result = callback.apply(element, e._args == undefined ? [e] : [e].concat(e._args))
        if (result === false) e.preventDefault(), e.stopPropagation()
        return result
      }
      handler.i = set.length
      set.push(handler)
      if ('addEventListener' in element)
        element.addEventListener(realEvent(handler.e), handler.proxy, eventCapture(handler, capture))
    })
  }
  function remove(element, events, fn, selector, capture){
    var id = zid(element)
    ;(events || '').split(/\s/).forEach(function(event){
      findHandlers(element, event, fn, selector).forEach(function(handler){
        delete handlers[id][handler.i]
      if ('removeEventListener' in element)
        element.removeEventListener(realEvent(handler.e), handler.proxy, eventCapture(handler, capture))
      })
    })
  }

  $.event = { add: add, remove: remove }

  $.proxy = function(fn, context) {
    if (isFunction(fn)) {
      var proxyFn = function(){ return fn.apply(context, arguments) }
      proxyFn._zid = zid(fn)
      return proxyFn
    } else if (isString(context)) {
      return $.proxy(fn[context], fn)
    } else {
      throw new TypeError("expected function")
    }
  }

  $.fn.bind = function(event, data, callback){
    return this.on(event, data, callback)
  }
  $.fn.unbind = function(event, callback){
    return this.off(event, callback)
  }
  $.fn.one = function(event, selector, data, callback){
    return this.on(event, selector, data, callback, 1)
  }

  var returnTrue = function(){return true},
      returnFalse = function(){return false},
      ignoreProperties = /^([A-Z]|returnValue$|layer[XY]$)/,
      eventMethods = {
        preventDefault: 'isDefaultPrevented',
        stopImmediatePropagation: 'isImmediatePropagationStopped',
        stopPropagation: 'isPropagationStopped'
      }

  function compatible(event, source) {
    if (source || !event.isDefaultPrevented) {
      source || (source = event)

      $.each(eventMethods, function(name, predicate) {
        var sourceMethod = source[name]
        event[name] = function(){
          this[predicate] = returnTrue
          return sourceMethod && sourceMethod.apply(source, arguments)
        }
        event[predicate] = returnFalse
      })

      if (source.defaultPrevented !== undefined ? source.defaultPrevented :
          'returnValue' in source ? source.returnValue === false :
          source.getPreventDefault && source.getPreventDefault())
        event.isDefaultPrevented = returnTrue
    }
    return event
  }

  function createProxy(event) {
    var key, proxy = { originalEvent: event }
    for (key in event)
      if (!ignoreProperties.test(key) && event[key] !== undefined) proxy[key] = event[key]

    return compatible(proxy, event)
  }

  $.fn.delegate = function(selector, event, callback){
    return this.on(event, selector, callback)
  }
  $.fn.undelegate = function(selector, event, callback){
    return this.off(event, selector, callback)
  }

  $.fn.live = function(event, callback){
    $(document.body).delegate(this.selector, event, callback)
    return this
  }
  $.fn.die = function(event, callback){
    $(document.body).undelegate(this.selector, event, callback)
    return this
  }

  $.fn.on = function(event, selector, data, callback, one){
    var autoRemove, delegator, $this = this
    if (event && !isString(event)) {
      $.each(event, function(type, fn){
        $this.on(type, selector, data, fn, one)
      })
      return $this
    }

    if (!isString(selector) && !isFunction(callback) && callback !== false)
      callback = data, data = selector, selector = undefined
    if (isFunction(data) || data === false)
      callback = data, data = undefined

    if (callback === false) callback = returnFalse

    return $this.each(function(_, element){
      if (one) autoRemove = function(e){
        remove(element, e.type, callback)
        return callback.apply(this, arguments)
      }

      if (selector) delegator = function(e){
        var evt, match = $(e.target).closest(selector, element).get(0)
        if (match && match !== element) {
          evt = $.extend(createProxy(e), {currentTarget: match, liveFired: element})
          return (autoRemove || callback).apply(match, [evt].concat(slice.call(arguments, 1)))
        }
      }

      add(element, event, callback, data, selector, delegator || autoRemove)
    })
  }
  $.fn.off = function(event, selector, callback){
    var $this = this
    if (event && !isString(event)) {
      $.each(event, function(type, fn){
        $this.off(type, selector, fn)
      })
      return $this
    }

    if (!isString(selector) && !isFunction(callback) && callback !== false)
      callback = selector, selector = undefined

    if (callback === false) callback = returnFalse

    return $this.each(function(){
      remove(this, event, callback, selector)
    })
  }

  $.fn.trigger = function(event, args){
    event = (isString(event) || $.isPlainObject(event)) ? $.Event(event) : compatible(event)
    event._args = args
    return this.each(function(){
      // items in the collection might not be DOM elements
      if('dispatchEvent' in this) this.dispatchEvent(event)
      else $(this).triggerHandler(event, args)
    })
  }

  // triggers event handlers on current element just as if an event occurred,
  // doesn't trigger an actual event, doesn't bubble
  $.fn.triggerHandler = function(event, args){
    var e, result
    this.each(function(i, element){
      e = createProxy(isString(event) ? $.Event(event) : event)
      e._args = args
      e.target = element
      $.each(findHandlers(element, event.type || event), function(i, handler){
        result = handler.proxy(e)
        if (e.isImmediatePropagationStopped()) return false
      })
    })
    return result
  }

  // shortcut methods for `.bind(event, fn)` for each event type
  ;('focusin focusout load resize scroll unload click dblclick '+
  'mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave '+
  'change select keydown keypress keyup error').split(' ').forEach(function(event) {
    $.fn[event] = function(callback) {
      return callback ?
        this.bind(event, callback) :
        this.trigger(event)
    }
  })

  ;['focus', 'blur'].forEach(function(name) {
    $.fn[name] = function(callback) {
      if (callback) this.bind(name, callback)
      else this.each(function(){
        try { this[name]() }
        catch(e) {}
      })
      return this
    }
  })

  $.Event = function(type, props) {
    if (!isString(type)) props = type, type = props.type
    var event = document.createEvent(specialEvents[type] || 'Events'), bubbles = true
    if (props) for (var name in props) (name == 'bubbles') ? (bubbles = !!props[name]) : (event[name] = props[name])
    event.initEvent(type, bubbles, true)
    return compatible(event)
  }

})(Zepto)

;(function($){
  var jsonpID = 0,
      document = window.document,
      key,
      name,
      rscript = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
      scriptTypeRE = /^(?:text|application)\/javascript/i,
      xmlTypeRE = /^(?:text|application)\/xml/i,
      jsonType = 'application/json',
      htmlType = 'text/html',
      blankRE = /^\s*$/

  // trigger a custom event and return false if it was cancelled
  function triggerAndReturn(context, eventName, data) {
    var event = $.Event(eventName)
    $(context).trigger(event, data)
    return !event.isDefaultPrevented()
  }

  // trigger an Ajax "global" event
  function triggerGlobal(settings, context, eventName, data) {
    if (settings.global) return triggerAndReturn(context || document, eventName, data)
  }

  // Number of active Ajax requests
  $.active = 0

  function ajaxStart(settings) {
    if (settings.global && $.active++ === 0) triggerGlobal(settings, null, 'ajaxStart')
  }
  function ajaxStop(settings) {
    if (settings.global && !(--$.active)) triggerGlobal(settings, null, 'ajaxStop')
  }

  // triggers an extra global event "ajaxBeforeSend" that's like "ajaxSend" but cancelable
  function ajaxBeforeSend(xhr, settings) {
    var context = settings.context
    if (settings.beforeSend.call(context, xhr, settings) === false ||
        triggerGlobal(settings, context, 'ajaxBeforeSend', [xhr, settings]) === false)
      return false

    triggerGlobal(settings, context, 'ajaxSend', [xhr, settings])
  }
  function ajaxSuccess(data, xhr, settings, deferred) {
    var context = settings.context, status = 'success'
    settings.success.call(context, data, status, xhr)
    if (deferred) deferred.resolveWith(context, [data, status, xhr])
    triggerGlobal(settings, context, 'ajaxSuccess', [xhr, settings, data])
    ajaxComplete(status, xhr, settings)
  }
  // type: "timeout", "error", "abort", "parsererror"
  function ajaxError(error, type, xhr, settings, deferred) {
    var context = settings.context
    settings.error.call(context, xhr, type, error)
    if (deferred) deferred.rejectWith(context, [xhr, type, error])
    triggerGlobal(settings, context, 'ajaxError', [xhr, settings, error || type])
    ajaxComplete(type, xhr, settings)
  }
  // status: "success", "notmodified", "error", "timeout", "abort", "parsererror"
  function ajaxComplete(status, xhr, settings) {
    var context = settings.context
    settings.complete.call(context, xhr, status)
    triggerGlobal(settings, context, 'ajaxComplete', [xhr, settings])
    ajaxStop(settings)
  }

  // Empty function, used as default callback
  function empty() {}

  $.ajaxJSONP = function(options, deferred){
    if (!('type' in options)) return $.ajax(options)

    var _callbackName = options.jsonpCallback,
      callbackName = ($.isFunction(_callbackName) ?
        _callbackName() : _callbackName) || ('jsonp' + (++jsonpID)),
      script = document.createElement('script'),
      originalCallback = window[callbackName],
      responseData,
      abort = function(errorType) {
        $(script).triggerHandler('error', errorType || 'abort')
      },
      xhr = { abort: abort }, abortTimeout

    if (deferred) deferred.promise(xhr)

    $(script).on('load error', function(e, errorType){
      clearTimeout(abortTimeout)
      $(script).off().remove()

      if (e.type == 'error' || !responseData) {
        ajaxError(null, errorType || 'error', xhr, options, deferred)
      } else {
        ajaxSuccess(responseData[0], xhr, options, deferred)
      }

      window[callbackName] = originalCallback
      if (responseData && $.isFunction(originalCallback))
        originalCallback(responseData[0])

      originalCallback = responseData = undefined
    })

    if (ajaxBeforeSend(xhr, options) === false) {
      abort('abort')
      return xhr
    }

    window[callbackName] = function(){
      responseData = arguments
    }

    script.src = options.url.replace(/\?(.+)=\?/, '?$1=' + callbackName)
    document.head.appendChild(script)

    if (options.timeout > 0) abortTimeout = setTimeout(function(){
      abort('timeout')
    }, options.timeout)

    return xhr
  }

  $.ajaxSettings = {
    // Default type of request
    type: 'GET',
    // Callback that is executed before request
    beforeSend: empty,
    // Callback that is executed if the request succeeds
    success: empty,
    // Callback that is executed the the server drops error
    error: empty,
    // Callback that is executed on request complete (both: error and success)
    complete: empty,
    // The context for the callbacks
    context: null,
    // Whether to trigger "global" Ajax events
    global: true,
    // Transport
    xhr: function () {
      return new window.XMLHttpRequest()
    },
    // MIME types mapping
    // IIS returns Javascript as "application/x-javascript"
    accepts: {
      script: 'text/javascript, application/javascript, application/x-javascript',
      json:   jsonType,
      xml:    'application/xml, text/xml',
      html:   htmlType,
      text:   'text/plain'
    },
    // Whether the request is to another domain
    crossDomain: false,
    // Default timeout
    timeout: 0,
    // Whether data should be serialized to string
    processData: true,
    // Whether the browser should be allowed to cache GET responses
    cache: true
  }

  function mimeToDataType(mime) {
    if (mime) mime = mime.split(';', 2)[0]
    return mime && ( mime == htmlType ? 'html' :
      mime == jsonType ? 'json' :
      scriptTypeRE.test(mime) ? 'script' :
      xmlTypeRE.test(mime) && 'xml' ) || 'text'
  }

  function appendQuery(url, query) {
    if (query == '') return url
    return (url + '&' + query).replace(/[&?]{1,2}/, '?')
  }

  // serialize payload and append it to the URL for GET requests
  function serializeData(options) {
    if (options.processData && options.data && $.type(options.data) != "string")
      options.data = $.param(options.data, options.traditional)
    if (options.data && (!options.type || options.type.toUpperCase() == 'GET'))
      options.url = appendQuery(options.url, options.data), options.data = undefined
  }

  $.ajax = function(options){
    var settings = $.extend({}, options || {}),
        deferred = $.Deferred && $.Deferred()
    for (key in $.ajaxSettings) if (settings[key] === undefined) settings[key] = $.ajaxSettings[key]

    ajaxStart(settings)

    if (!settings.crossDomain) settings.crossDomain = /^([\w-]+:)?\/\/([^\/]+)/.test(settings.url) &&
      RegExp.$2 != window.location.host

    if (!settings.url) settings.url = window.location.toString()
    serializeData(settings)
    if (settings.cache === false) settings.url = appendQuery(settings.url, '_=' + Date.now())

    var dataType = settings.dataType, hasPlaceholder = /\?.+=\?/.test(settings.url)
    if (dataType == 'jsonp' || hasPlaceholder) {
      if (!hasPlaceholder)
        settings.url = appendQuery(settings.url,
          settings.jsonp ? (settings.jsonp + '=?') : settings.jsonp === false ? '' : 'callback=?')
      return $.ajaxJSONP(settings, deferred)
    }

    var mime = settings.accepts[dataType],
        headers = { },
        setHeader = function(name, value) { headers[name.toLowerCase()] = [name, value] },
        protocol = /^([\w-]+:)\/\//.test(settings.url) ? RegExp.$1 : window.location.protocol,
        xhr = settings.xhr(),
        nativeSetHeader = xhr.setRequestHeader,
        abortTimeout

    if (deferred) deferred.promise(xhr)

    if (!settings.crossDomain) setHeader('X-Requested-With', 'XMLHttpRequest')
    setHeader('Accept', mime || '*/*')
    if (mime = settings.mimeType || mime) {
      if (mime.indexOf(',') > -1) mime = mime.split(',', 2)[0]
      xhr.overrideMimeType && xhr.overrideMimeType(mime)
    }
    if (settings.contentType || (settings.contentType !== false && settings.data && settings.type.toUpperCase() != 'GET'))
      setHeader('Content-Type', settings.contentType || 'application/x-www-form-urlencoded')

    if (settings.headers) for (name in settings.headers) setHeader(name, settings.headers[name])
    xhr.setRequestHeader = setHeader

    xhr.onreadystatechange = function(){
      if (xhr.readyState == 4) {
        xhr.onreadystatechange = empty
        clearTimeout(abortTimeout)
        var result, error = false
        if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304 || (xhr.status == 0 && protocol == 'file:')) {
          dataType = dataType || mimeToDataType(settings.mimeType || xhr.getResponseHeader('content-type'))
          result = xhr.responseText

          try {
            // http://perfectionkills.com/global-eval-what-are-the-options/
            if (dataType == 'script')    (1,eval)(result)
            else if (dataType == 'xml')  result = xhr.responseXML
            else if (dataType == 'json') result = blankRE.test(result) ? null : $.parseJSON(result)
          } catch (e) { error = e }

          if (error) ajaxError(error, 'parsererror', xhr, settings, deferred)
          else ajaxSuccess(result, xhr, settings, deferred)
        } else {
          ajaxError(xhr.statusText || null, xhr.status ? 'error' : 'abort', xhr, settings, deferred)
        }
      }
    }

    if (ajaxBeforeSend(xhr, settings) === false) {
      xhr.abort()
      ajaxError(null, 'abort', xhr, settings, deferred)
      return xhr
    }

    if (settings.xhrFields) for (name in settings.xhrFields) xhr[name] = settings.xhrFields[name]

    var async = 'async' in settings ? settings.async : true
    xhr.open(settings.type, settings.url, async, settings.username, settings.password)

    for (name in headers) nativeSetHeader.apply(xhr, headers[name])

    if (settings.timeout > 0) abortTimeout = setTimeout(function(){
        xhr.onreadystatechange = empty
        xhr.abort()
        ajaxError(null, 'timeout', xhr, settings, deferred)
      }, settings.timeout)

    // avoid sending empty string (#319)
    xhr.send(settings.data ? settings.data : null)
    return xhr
  }

  // handle optional data/success arguments
  function parseArguments(url, data, success, dataType) {
    if ($.isFunction(data)) dataType = success, success = data, data = undefined
    if (!$.isFunction(success)) dataType = success, success = undefined
    return {
      url: url
    , data: data
    , success: success
    , dataType: dataType
    }
  }

  $.get = function(/* url, data, success, dataType */){
    return $.ajax(parseArguments.apply(null, arguments))
  }

  $.post = function(/* url, data, success, dataType */){
    var options = parseArguments.apply(null, arguments)
    options.type = 'POST'
    return $.ajax(options)
  }

  $.getJSON = function(/* url, data, success */){
    var options = parseArguments.apply(null, arguments)
    options.dataType = 'json'
    return $.ajax(options)
  }

  $.fn.load = function(url, data, success){
    if (!this.length) return this
    var self = this, parts = url.split(/\s/), selector,
        options = parseArguments(url, data, success),
        callback = options.success
    if (parts.length > 1) options.url = parts[0], selector = parts[1]
    options.success = function(response){
      self.html(selector ?
        $('<div>').html(response.replace(rscript, "")).find(selector)
        : response)
      callback && callback.apply(self, arguments)
    }
    $.ajax(options)
    return this
  }

  var escape = encodeURIComponent

  function serialize(params, obj, traditional, scope){
    var type, array = $.isArray(obj), hash = $.isPlainObject(obj)
    $.each(obj, function(key, value) {
      type = $.type(value)
      if (scope) key = traditional ? scope :
        scope + '[' + (hash || type == 'object' || type == 'array' ? key : '') + ']'
      // handle data in serializeArray() format
      if (!scope && array) params.add(value.name, value.value)
      // recurse into nested objects
      else if (type == "array" || (!traditional && type == "object"))
        serialize(params, value, traditional, key)
      else params.add(key, value)
    })
  }

  $.param = function(obj, traditional){
    var params = []
    params.add = function(k, v){ this.push(escape(k) + '=' + escape(v)) }
    serialize(params, obj, traditional)
    return params.join('&').replace(/%20/g, '+')
  }
})(Zepto)

;(function($){
  $.fn.serializeArray = function() {
    var result = [], el
    $([].slice.call(this.get(0).elements)).each(function(){
      el = $(this)
      var type = el.attr('type')
      if (this.nodeName.toLowerCase() != 'fieldset' &&
        !this.disabled && type != 'submit' && type != 'reset' && type != 'button' &&
        ((type != 'radio' && type != 'checkbox') || this.checked))
        result.push({
          name: el.attr('name'),
          value: el.val()
        })
    })
    return result
  }

  $.fn.serialize = function(){
    var result = []
    this.serializeArray().forEach(function(elm){
      result.push(encodeURIComponent(elm.name) + '=' + encodeURIComponent(elm.value))
    })
    return result.join('&')
  }

  $.fn.submit = function(callback) {
    if (callback) this.bind('submit', callback)
    else if (this.length) {
      var event = $.Event('submit')
      this.eq(0).trigger(event)
      if (!event.isDefaultPrevented()) this.get(0).submit()
    }
    return this
  }

})(Zepto)

;(function($){
  // __proto__ doesn't exist on IE<11, so redefine
  // the Z function to use object extension instead
  if (!('__proto__' in {})) {
    $.extend($.zepto, {
      Z: function(dom, selector){
        dom = dom || []
        $.extend(dom, $.fn)
        dom.selector = selector || ''
        dom.__Z = true
        return dom
      },
      // this is a kludge but works
      isZ: function(object){
        return $.type(object) === 'array' && '__Z' in object
      }
    })
  }

  // getComputedStyle shouldn't freak out when called
  // without a valid element as argument
  try {
    getComputedStyle(undefined)
  } catch(e) {
    var nativeGetComputedStyle = getComputedStyle;
    window.getComputedStyle = function(element){
      try {
        return nativeGetComputedStyle(element)
      } catch(e) {
        return null
      }
    }
  }
})(Zepto)

;(function($){
  function detect(ua){
    var os = this.os = {}, browser = this.browser = {},
      webkit = ua.match(/Web[kK]it[\/]{0,1}([\d.]+)/),
      android = ua.match(/(Android);?[\s\/]+([\d.]+)?/),
      ipad = ua.match(/(iPad).*OS\s([\d_]+)/),
      ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/),
      iphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/),
      webos = ua.match(/(webOS|hpwOS)[\s\/]([\d.]+)/),
      touchpad = webos && ua.match(/TouchPad/),
      kindle = ua.match(/Kindle\/([\d.]+)/),
      silk = ua.match(/Silk\/([\d._]+)/),
      blackberry = ua.match(/(BlackBerry).*Version\/([\d.]+)/),
      bb10 = ua.match(/(BB10).*Version\/([\d.]+)/),
      rimtabletos = ua.match(/(RIM\sTablet\sOS)\s([\d.]+)/),
      playbook = ua.match(/PlayBook/),
      chrome = ua.match(/Chrome\/([\d.]+)/) || ua.match(/CriOS\/([\d.]+)/),
      firefox = ua.match(/Firefox\/([\d.]+)/),
      ie = ua.match(/MSIE\s([\d.]+)/),
      safari = webkit && ua.match(/Mobile\//) && !chrome,
      webview = ua.match(/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/) && !chrome

    // Todo: clean this up with a better OS/browser seperation:
    // - discern (more) between multiple browsers on android
    // - decide if kindle fire in silk mode is android or not
    // - Firefox on Android doesn't specify the Android version
    // - possibly devide in os, device and browser hashes

    if (browser.webkit = !!webkit) browser.version = webkit[1]

    if (android) os.android = true, os.version = android[2]
    if (iphone && !ipod) os.ios = os.iphone = true, os.version = iphone[2].replace(/_/g, '.')
    if (ipad) os.ios = os.ipad = true, os.version = ipad[2].replace(/_/g, '.')
    if (ipod) os.ios = os.ipod = true, os.version = ipod[3] ? ipod[3].replace(/_/g, '.') : null
    if (webos) os.webos = true, os.version = webos[2]
    if (touchpad) os.touchpad = true
    if (blackberry) os.blackberry = true, os.version = blackberry[2]
    if (bb10) os.bb10 = true, os.version = bb10[2]
    if (rimtabletos) os.rimtabletos = true, os.version = rimtabletos[2]
    if (playbook) browser.playbook = true
    if (kindle) os.kindle = true, os.version = kindle[1]
    if (silk) browser.silk = true, browser.version = silk[1]
    if (!silk && os.android && ua.match(/Kindle Fire/)) browser.silk = true
    if (chrome) browser.chrome = true, browser.version = chrome[1]
    if (firefox) browser.firefox = true, browser.version = firefox[1]
    if (ie) browser.ie = true, browser.version = ie[1]
    if (safari && (ua.match(/Safari/) || !!os.ios)) browser.safari = true
    if (webview) browser.webview = true

    os.tablet = !!(ipad || playbook || (android && !ua.match(/Mobile/)) ||
      (firefox && ua.match(/Tablet/)) || (ie && !ua.match(/Phone/) && ua.match(/Touch/)))
    os.phone  = !!(!os.tablet && !os.ipod && (android || iphone || webos || blackberry || bb10 ||
      (chrome && ua.match(/Android/)) || (chrome && ua.match(/CriOS\/([\d.]+)/)) ||
      (firefox && ua.match(/Mobile/)) || (ie && ua.match(/Touch/))))
  }

  detect.call($, navigator.userAgent)
  // make available to unit tests
  $.__detect = detect

})(Zepto)

;(function($, undefined){
  var prefix = '', eventPrefix, endEventName, endAnimationName,
    vendors = { Webkit: 'webkit', Moz: '', O: 'o' },
    document = window.document, testEl = document.createElement('div'),
    supportedTransforms = /^((translate|rotate|scale)(X|Y|Z|3d)?|matrix(3d)?|perspective|skew(X|Y)?)$/i,
    transform,
    transitionProperty, transitionDuration, transitionTiming, transitionDelay,
    animationName, animationDuration, animationTiming, animationDelay,
    cssReset = {}

  function dasherize(str) { return str.replace(/([a-z])([A-Z])/, '$1-$2').toLowerCase() }
  function normalizeEvent(name) { return eventPrefix ? eventPrefix + name : name.toLowerCase() }

  $.each(vendors, function(vendor, event){
    if (testEl.style[vendor + 'TransitionProperty'] !== undefined) {
      prefix = '-' + vendor.toLowerCase() + '-'
      eventPrefix = event
      return false
    }
  })

  transform = prefix + 'transform'
  cssReset[transitionProperty = prefix + 'transition-property'] =
  cssReset[transitionDuration = prefix + 'transition-duration'] =
  cssReset[transitionDelay    = prefix + 'transition-delay'] =
  cssReset[transitionTiming   = prefix + 'transition-timing-function'] =
  cssReset[animationName      = prefix + 'animation-name'] =
  cssReset[animationDuration  = prefix + 'animation-duration'] =
  cssReset[animationDelay     = prefix + 'animation-delay'] =
  cssReset[animationTiming    = prefix + 'animation-timing-function'] = ''

  $.fx = {
    off: (eventPrefix === undefined && testEl.style.transitionProperty === undefined),
    speeds: { _default: 400, fast: 200, slow: 600 },
    cssPrefix: prefix,
    transitionEnd: normalizeEvent('TransitionEnd'),
    animationEnd: normalizeEvent('AnimationEnd')
  }

  $.fn.animate = function(properties, duration, ease, callback, delay){
    if ($.isFunction(duration))
      callback = duration, ease = undefined, duration = undefined
    if ($.isFunction(ease))
      callback = ease, ease = undefined
    if ($.isPlainObject(duration))
      ease = duration.easing, callback = duration.complete, delay = duration.delay, duration = duration.duration
    if (duration) duration = (typeof duration == 'number' ? duration :
                    ($.fx.speeds[duration] || $.fx.speeds._default)) / 1000
    if (delay) delay = parseFloat(delay) / 1000
    return this.anim(properties, duration, ease, callback, delay)
  }

  $.fn.anim = function(properties, duration, ease, callback, delay){
    var key, cssValues = {}, cssProperties, transforms = '',
        that = this, wrappedCallback, endEvent = $.fx.transitionEnd,
        fired = false

    if (duration === undefined) duration = $.fx.speeds._default / 1000
    if (delay === undefined) delay = 0
    if ($.fx.off) duration = 0

    if (typeof properties == 'string') {
      // keyframe animation
      cssValues[animationName] = properties
      cssValues[animationDuration] = duration + 's'
      cssValues[animationDelay] = delay + 's'
      cssValues[animationTiming] = (ease || 'linear')
      endEvent = $.fx.animationEnd
    } else {
      cssProperties = []
      // CSS transitions
      for (key in properties)
        if (supportedTransforms.test(key)) transforms += key + '(' + properties[key] + ') '
        else cssValues[key] = properties[key], cssProperties.push(dasherize(key))

      if (transforms) cssValues[transform] = transforms, cssProperties.push(transform)
      if (duration > 0 && typeof properties === 'object') {
        cssValues[transitionProperty] = cssProperties.join(', ')
        cssValues[transitionDuration] = duration + 's'
        cssValues[transitionDelay] = delay + 's'
        cssValues[transitionTiming] = (ease || 'linear')
      }
    }

    wrappedCallback = function(event){
      if (typeof event !== 'undefined') {
        if (event.target !== event.currentTarget) return // makes sure the event didn't bubble from "below"
        $(event.target).unbind(endEvent, wrappedCallback)
      } else
        $(this).unbind(endEvent, wrappedCallback) // triggered by setTimeout

      fired = true
      $(this).css(cssReset)
      callback && callback.call(this)
    }
    if (duration > 0){
      this.bind(endEvent, wrappedCallback)
      // transitionEnd is not always firing on older Android phones
      // so make sure it gets fired
      setTimeout(function(){
        if (fired) return
        wrappedCallback.call(that)
      }, (duration * 1000) + 25)
    }

    // trigger page reflow so new elements can animate
    this.size() && this.get(0).clientLeft

    this.css(cssValues)

    if (duration <= 0) setTimeout(function() {
      that.each(function(){ wrappedCallback.call(this) })
    }, 0)

    return this
  }

  testEl = null
})(Zepto)

;(function($, undefined){
  var document = window.document, docElem = document.documentElement,
    origShow = $.fn.show, origHide = $.fn.hide, origToggle = $.fn.toggle

  function anim(el, speed, opacity, scale, callback) {
    if (typeof speed == 'function' && !callback) callback = speed, speed = undefined
    var props = { opacity: opacity }
    if (scale) {
      props.scale = scale
      el.css($.fx.cssPrefix + 'transform-origin', '0 0')
    }
    return el.animate(props, speed, null, callback)
  }

  function hide(el, speed, scale, callback) {
    return anim(el, speed, 0, scale, function(){
      origHide.call($(this))
      callback && callback.call(this)
    })
  }

  $.fn.show = function(speed, callback) {
    origShow.call(this)
    if (speed === undefined) speed = 0
    else this.css('opacity', 0)
    return anim(this, speed, 1, '1,1', callback)
  }

  $.fn.hide = function(speed, callback) {
    if (speed === undefined) return origHide.call(this)
    else return hide(this, speed, '0,0', callback)
  }

  $.fn.toggle = function(speed, callback) {
    if (speed === undefined || typeof speed == 'boolean')
      return origToggle.call(this, speed)
    else return this.each(function(){
      var el = $(this)
      el[el.css('display') == 'none' ? 'show' : 'hide'](speed, callback)
    })
  }

  $.fn.fadeTo = function(speed, opacity, callback) {
    return anim(this, speed, opacity, null, callback)
  }

  $.fn.fadeIn = function(speed, callback) {
    var target = this.css('opacity')
    if (target > 0) this.css('opacity', 0)
    else target = 1
    return origShow.call(this).fadeTo(speed, target, callback)
  }

  $.fn.fadeOut = function(speed, callback) {
    return hide(this, speed, null, callback)
  }

  $.fn.fadeToggle = function(speed, callback) {
    return this.each(function(){
      var el = $(this)
      el[
        (el.css('opacity') == 0 || el.css('display') == 'none') ? 'fadeIn' : 'fadeOut'
      ](speed, callback)
    })
  }

})(Zepto)

;(function($){
  var data = {}, dataAttr = $.fn.data, camelize = $.camelCase,
    exp = $.expando = 'Zepto' + (+new Date()), emptyArray = []

  // Get value from node:
  // 1. first try key as given,
  // 2. then try camelized key,
  // 3. fall back to reading "data-*" attribute.
  function getData(node, name) {
    var id = node[exp], store = id && data[id]
    if (name === undefined) return store || setData(node)
    else {
      if (store) {
        if (name in store) return store[name]
        var camelName = camelize(name)
        if (camelName in store) return store[camelName]
      }
      return dataAttr.call($(node), name)
    }
  }

  // Store value under camelized key on node
  function setData(node, name, value) {
    var id = node[exp] || (node[exp] = ++$.uuid),
      store = data[id] || (data[id] = attributeData(node))
    if (name !== undefined) store[camelize(name)] = value
    return store
  }

  // Read all "data-*" attributes from a node
  function attributeData(node) {
    var store = {}
    $.each(node.attributes || emptyArray, function(i, attr){
      if (attr.name.indexOf('data-') == 0)
        store[camelize(attr.name.replace('data-', ''))] =
          $.zepto.deserializeValue(attr.value)
    })
    return store
  }

  $.fn.data = function(name, value) {
    return value === undefined ?
      // set multiple values via object
      $.isPlainObject(name) ?
        this.each(function(i, node){
          $.each(name, function(key, value){ setData(node, key, value) })
        }) :
        // get value from first element
        this.length == 0 ? undefined : getData(this[0], name) :
      // set value on all elements
      this.each(function(){ setData(this, name, value) })
  }

  $.fn.removeData = function(names) {
    if (typeof names == 'string') names = names.split(/\s+/)
    return this.each(function(){
      var id = this[exp], store = id && data[id]
      if (store) $.each(names || store, function(key){
        delete store[names ? camelize(this) : key]
      })
    })
  }

  // Generate extended `remove` and `empty` functions
  ;['remove', 'empty'].forEach(function(methodName){
    var origFn = $.fn[methodName]
    $.fn[methodName] = function() {
      var elements = this.find('*')
      if (methodName === 'remove') elements = elements.add(this)
      elements.removeData()
      return origFn.call(this)
    }
  })
})(Zepto)

;(function($){
  var touch = {},
    touchTimeout, tapTimeout, swipeTimeout, longTapTimeout,
    longTapDelay = 750,
    gesture

  function swipeDirection(x1, x2, y1, y2) {
    return Math.abs(x1 - x2) >=
      Math.abs(y1 - y2) ? (x1 - x2 > 0 ? 'Left' : 'Right') : (y1 - y2 > 0 ? 'Up' : 'Down')
  }

  function longTap() {
    longTapTimeout = null
    if (touch.last) {
      touch.el.trigger('longTap')
      touch = {}
    }
  }

  function cancelLongTap() {
    if (longTapTimeout) clearTimeout(longTapTimeout)
    longTapTimeout = null
  }

  function cancelAll() {
    if (touchTimeout) clearTimeout(touchTimeout)
    if (tapTimeout) clearTimeout(tapTimeout)
    if (swipeTimeout) clearTimeout(swipeTimeout)
    if (longTapTimeout) clearTimeout(longTapTimeout)
    touchTimeout = tapTimeout = swipeTimeout = longTapTimeout = null
    touch = {}
  }

  function isPrimaryTouch(event){
    return (event.pointerType == 'touch' ||
      event.pointerType == event.MSPOINTER_TYPE_TOUCH)
      && event.isPrimary
  }

  function isPointerEventType(e, type){
    return (e.type == 'pointer'+type ||
      e.type.toLowerCase() == 'mspointer'+type)
  }

  $(document).ready(function(){
    var now, delta, deltaX = 0, deltaY = 0, firstTouch, _isPointerType

    if ('MSGesture' in window) {
      gesture = new MSGesture()
      gesture.target = document.body
    }

    $(document)
      .bind('MSGestureEnd', function(e){
        var swipeDirectionFromVelocity =
          e.velocityX > 1 ? 'Right' : e.velocityX < -1 ? 'Left' : e.velocityY > 1 ? 'Down' : e.velocityY < -1 ? 'Up' : null;
        if (swipeDirectionFromVelocity) {
          touch.el.trigger('swipe')
          touch.el.trigger('swipe'+ swipeDirectionFromVelocity)
        }



        // FIXME: This is a patch for issue https://github.com/madrobby/zepto/issues/932
        deltaX = deltaY = 0






      })
      .on('touchstart MSPointerDown pointerdown', function(e){
        if((_isPointerType = isPointerEventType(e, 'down')) &&
          !isPrimaryTouch(e)) return
        firstTouch = _isPointerType ? e : e.touches[0]
        if (e.touches && e.touches.length === 1 && touch.x2) {
          // Clear out touch movement data if we have it sticking around
          // This can occur if touchcancel doesn't fire due to preventDefault, etc.
          touch.x2 = undefined
          touch.y2 = undefined
        }
        now = Date.now()
        delta = now - (touch.last || now)
        touch.el = $('tagName' in firstTouch.target ?
          firstTouch.target : firstTouch.target.parentNode)
        touchTimeout && clearTimeout(touchTimeout)
        touch.x1 = firstTouch.pageX
        touch.y1 = firstTouch.pageY
        if (delta > 0 && delta <= 250) touch.isDoubleTap = true
        touch.last = now
        longTapTimeout = setTimeout(longTap, longTapDelay)
        // adds the current touch contact for IE gesture recognition
        if (gesture && _isPointerType) gesture.addPointer(e.pointerId);
      })
      .on('touchmove MSPointerMove pointermove', function(e){
        if((_isPointerType = isPointerEventType(e, 'move')) &&
          !isPrimaryTouch(e)) return
        firstTouch = _isPointerType ? e : e.touches[0]
        cancelLongTap()
        touch.x2 = firstTouch.pageX
        touch.y2 = firstTouch.pageY

        deltaX += Math.abs(touch.x1 - touch.x2)
        deltaY += Math.abs(touch.y1 - touch.y2)
      })
      .on('touchend MSPointerUp pointerup', function(e){
        if((_isPointerType = isPointerEventType(e, 'up')) &&
          !isPrimaryTouch(e)) return
        cancelLongTap()

        // swipe
        if ((touch.x2 && Math.abs(touch.x1 - touch.x2) > 30) ||
            (touch.y2 && Math.abs(touch.y1 - touch.y2) > 30))

          swipeTimeout = setTimeout(function() {
            touch.el.trigger('swipe')
            touch.el.trigger('swipe' + (swipeDirection(touch.x1, touch.x2, touch.y1, touch.y2)))
            touch = {}
          }, 0)

        // normal tap
        else if ('last' in touch)
          // don't fire tap when delta position changed by more than 30 pixels,
          // for instance when moving to a point and back to origin
          if (deltaX < 30 && deltaY < 30) {
            // delay by one tick so we can cancel the 'tap' event if 'scroll' fires
            // ('tap' fires before 'scroll')
            tapTimeout = setTimeout(function() {

              // trigger universal 'tap' with the option to cancelTouch()
              // (cancelTouch cancels processing of single vs double taps for faster 'tap' response)
              var event = $.Event('tap')
              event.cancelTouch = cancelAll
              touch.el.trigger(event)

              // trigger double tap immediately
              if (touch.isDoubleTap) {
                if (touch.el) touch.el.trigger('doubleTap')
                touch = {}
              }

              // trigger single tap after 250ms of inactivity
              else {
                touchTimeout = setTimeout(function(){
                  touchTimeout = null
                  if (touch.el) touch.el.trigger('singleTap')
                  touch = {}
                }, 250)
              }
            }, 0)
          } else {
            touch = {}
          }
          deltaX = deltaY = 0

      })
      // when the browser window loses focus,
      // for example when a modal dialog is shown,
      // cancel all ongoing events
      .on('touchcancel MSPointerCancel pointercancel', cancelAll)

    // scrolling the window indicates intention of the user
    // to scroll, not tap or swipe, so cancel all ongoing events
    $(window).on('scroll', cancelAll)
  })

  ;['swipe', 'swipeLeft', 'swipeRight', 'swipeUp', 'swipeDown',
    'doubleTap', 'tap', 'singleTap', 'longTap'].forEach(function(eventName){
    $.fn[eventName] = function(callback){ return this.on(eventName, callback) }
  })
})(Zepto)
;
define("jquery", (function (global) {
    return function () {
        var ret, fn;
        return ret || global.Zepto;
    };
}(this)));

/*!
 * Lo-Dash v0.7.0 <http://lodash.com>
 * Copyright 2012 John-David Dalton <http://allyoucanleet.com/>
 * Based on Underscore.js 1.3.3, copyright 2009-2012 Jeremy Ashkenas, DocumentCloud Inc.
 * <http://documentcloud.github.com/underscore>
 * Available under MIT license <http://lodash.com/license>
 */
;(function(window, undefined) {
  'use strict';

  /** Detect free variable `exports` */
  var freeExports = typeof exports == 'object' && exports &&
    (typeof global == 'object' && global && global == global.global && (window = global), exports);

  /** Native prototype shortcuts */
  var ArrayProto = Array.prototype,
      BoolProto = Boolean.prototype,
      ObjectProto = Object.prototype,
      NumberProto = Number.prototype,
      StringProto = String.prototype;

  /** Used to generate unique IDs */
  var idCounter = 0;

  /** Used by `cachedContains` as the default size when optimizations are enabled for large arrays */
  var largeArraySize = 30;

  /** Used to restore the original `_` reference in `noConflict` */
  var oldDash = window._;

  /** Used to detect delimiter values that should be processed by `tokenizeEvaluate` */
  var reComplexDelimiter = /[-?+=!~*%&^<>|{(\/]|\[\D|\b(?:delete|in|instanceof|new|typeof|void)\b/;

  /** Used to match HTML entities */
  var reEscapedHtml = /&(?:amp|lt|gt|quot|#x27);/g;

  /** Used to match empty string literals in compiled template source */
  var reEmptyStringLeading = /\b__p \+= '';/g,
      reEmptyStringMiddle = /\b(__p \+=) '' \+/g,
      reEmptyStringTrailing = /(__e\(.*?\)|\b__t\)) \+\n'';/g;

  /** Used to match regexp flags from their coerced string values */
  var reFlags = /\w*$/;

  /** Used to insert the data object variable into compiled template source */
  var reInsertVariable = /(?:__e|__t = )\(\s*(?![\d\s"']|this\.)/g;

  /** Used to detect if a method is native */
  var reNative = RegExp('^' +
    (ObjectProto.valueOf + '')
      .replace(/[.*+?^=!:${}()|[\]\/\\]/g, '\\$&')
      .replace(/valueOf|for [^\]]+/g, '.+?') + '$'
  );

  /** Used to ensure capturing order and avoid matches for undefined delimiters */
  var reNoMatch = /($^)/;

  /** Used to match HTML characters */
  var reUnescapedHtml = /[&<>"']/g;

  /** Used to match unescaped characters in compiled string literals */
  var reUnescapedString = /['\n\r\t\u2028\u2029\\]/g;

  /** Used to fix the JScript [[DontEnum]] bug */
  var shadowed = [
    'constructor', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable',
    'toLocaleString', 'toString', 'valueOf'
  ];

  /** Used to make template sourceURLs easier to identify */
  var templateCounter = 0;

  /** Native method shortcuts */
  var concat = ArrayProto.concat,
      hasOwnProperty = ObjectProto.hasOwnProperty,
      push = ArrayProto.push,
      propertyIsEnumerable = ObjectProto.propertyIsEnumerable,
      slice = ArrayProto.slice,
      toString = ObjectProto.toString;

  /* Native method shortcuts for methods with the same name as other `lodash` methods */
  var nativeBind = reNative.test(nativeBind = slice.bind) && nativeBind,
      nativeFloor = Math.floor,
      nativeIsArray = reNative.test(nativeIsArray = Array.isArray) && nativeIsArray,
      nativeIsFinite = window.isFinite,
      nativeKeys = reNative.test(nativeKeys = Object.keys) && nativeKeys,
      nativeMax = Math.max,
      nativeMin = Math.min,
      nativeRandom = Math.random;

  /** `Object#toString` result shortcuts */
  var argsClass = '[object Arguments]',
      arrayClass = '[object Array]',
      boolClass = '[object Boolean]',
      dateClass = '[object Date]',
      funcClass = '[object Function]',
      numberClass = '[object Number]',
      objectClass = '[object Object]',
      regexpClass = '[object RegExp]',
      stringClass = '[object String]';

  /** Timer shortcuts */
  var clearTimeout = window.clearTimeout,
      setTimeout = window.setTimeout;

  /**
   * Detect the JScript [[DontEnum]] bug:
   *
   * In IE < 9 an objects own properties, shadowing non-enumerable ones, are
   * made non-enumerable as well.
   */
  var hasDontEnumBug;

  /**
   * Detect if `Array#shift` and `Array#splice` augment array-like objects
   * incorrectly:
   *
   * Firefox < 10, IE compatibility mode, and IE < 9 have buggy Array `shift()`
   * and `splice()` functions that fail to remove the last element, `value[0]`,
   * of array-like objects even though the `length` property is set to `0`.
   * The `shift()` method is buggy in IE 8 compatibility mode, while `splice()`
   * is buggy regardless of mode in IE < 9 and buggy in compatibility mode in IE 9.
   */
  var hasObjectSpliceBug;

  /** Detect if own properties are iterated after inherited properties (IE < 9) */
  var iteratesOwnLast;

  /** Detect if an `arguments` object's indexes are non-enumerable (IE < 9) */
  var noArgsEnum = true;

  (function() {
    var object = { '0': 1, 'length': 1 },
        props = [];

    function ctor() { this.x = 1; }
    ctor.prototype = { 'valueOf': 1, 'y': 1 };
    for (var prop in new ctor) { props.push(prop); }
    for (prop in arguments) { noArgsEnum = !prop; }

    hasDontEnumBug = (props + '').length < 4;
    iteratesOwnLast = props[0] != 'x';
    hasObjectSpliceBug = (props.splice.call(object, 0, 1), object[0]);
  }(1));

  /** Detect if an `arguments` object's [[Class]] is unresolvable (Firefox < 4, IE < 9) */
  var noArgsClass = !isArguments(arguments);

  /** Detect if `Array#slice` cannot be used to convert strings to arrays (Opera < 10.52) */
  var noArraySliceOnStrings = slice.call('x')[0] != 'x';

  /**
   * Detect lack of support for accessing string characters by index:
   *
   * IE < 8 can't access characters by index and IE 8 can only access
   * characters by index on string literals.
   */
  var noCharByIndex = ('x'[0] + Object('x')[0]) != 'xx';

  /**
   * Detect if a node's [[Class]] is unresolvable (IE < 9)
   * and that the JS engine won't error when attempting to coerce an object to
   * a string without a `toString` property value of `typeof` "function".
   */
  try {
    var noNodeClass = ({ 'toString': 0 } + '', toString.call(window.document || 0) == objectClass);
  } catch(e) { }

  /* Detect if `Function#bind` exists and is inferred to be fast (all but V8) */
  var isBindFast = nativeBind && /\n|Opera/.test(nativeBind + toString.call(window.opera));

  /* Detect if `Object.keys` exists and is inferred to be fast (IE, Opera, V8) */
  var isKeysFast = nativeKeys && /^.+$|true/.test(nativeKeys + !!window.attachEvent);

  /* Detect if strict mode, "use strict", is inferred to be fast (V8) */
  var isStrictFast = !isBindFast;

  /**
   * Detect if sourceURL syntax is usable without erroring:
   *
   * The JS engine in Adobe products, like InDesign, will throw a syntax error
   * when it encounters a single line comment beginning with the `@` symbol.
   *
   * The JS engine in Narwhal will generate the function `function anonymous(){//}`
   * and throw a syntax error.
   *
   * Avoid comments beginning `@` symbols in IE because they are part of its
   * non-standard conditional compilation support.
   * http://msdn.microsoft.com/en-us/library/121hztk3(v=vs.94).aspx
   */
  try {
    var useSourceURL = (Function('//@')(), !window.attachEvent);
  } catch(e) { }

  /** Used to identify object classifications that are array-like */
  var arrayLikeClasses = {};
  arrayLikeClasses[boolClass] = arrayLikeClasses[dateClass] = arrayLikeClasses[funcClass] =
  arrayLikeClasses[numberClass] = arrayLikeClasses[objectClass] = arrayLikeClasses[regexpClass] = false;
  arrayLikeClasses[argsClass] = arrayLikeClasses[arrayClass] = arrayLikeClasses[stringClass] = true;

  /** Used to identify object classifications that `_.clone` supports */
  var cloneableClasses = {};
  cloneableClasses[argsClass] = cloneableClasses[funcClass] = false;
  cloneableClasses[arrayClass] = cloneableClasses[boolClass] = cloneableClasses[dateClass] =
  cloneableClasses[numberClass] = cloneableClasses[objectClass] = cloneableClasses[regexpClass] =
  cloneableClasses[stringClass] = true;

  /**
   * Used to convert characters to HTML entities:
   *
   * Though the `>` character is escaped for symmetry, characters like `>` and `/`
   * don't require escaping in HTML and have no special meaning unless they're part
   * of a tag or an unquoted attribute value.
   * http://mathiasbynens.be/notes/ambiguous-ampersands (under "semi-related fun fact")
   */
  var htmlEscapes = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;'
  };

  /** Used to convert HTML entities to characters */
  var htmlUnescapes = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#x27;': "'"
  };

  /** Used to determine if values are of the language type Object */
  var objectTypes = {
    'boolean': false,
    'function': true,
    'object': true,
    'number': false,
    'string': false,
    'undefined': false,
    'unknown': true
  };

  /** Used to escape characters for inclusion in compiled string literals */
  var stringEscapes = {
    '\\': '\\',
    "'": "'",
    '\n': 'n',
    '\r': 'r',
    '\t': 't',
    '\u2028': 'u2028',
    '\u2029': 'u2029'
  };

  /*--------------------------------------------------------------------------*/

  /**
   * The `lodash` function.
   *
   * @name _
   * @constructor
   * @param {Mixed} value The value to wrap in a `LoDash` instance.
   * @returns {Object} Returns a `LoDash` instance.
   */
  function lodash(value) {
    // allow invoking `lodash` without the `new` operator
    return new LoDash(value);
  }

  /**
   * Creates a `LoDash` instance that wraps a value to allow chaining.
   *
   * @private
   * @constructor
   * @param {Mixed} value The value to wrap.
   */
  function LoDash(value) {
    // exit early if already wrapped
    if (value && value.__wrapped__) {
      return value;
    }
    this.__wrapped__ = value;
  }

  /**
   * By default, the template delimiters used by Lo-Dash are similar to those in
   * embedded Ruby (ERB). Change the following template settings to use alternative
   * delimiters.
   *
   * @static
   * @memberOf _
   * @type Object
   */
  lodash.templateSettings = {

    /**
     * Used to detect `data` property values to be HTML-escaped.
     *
     * @static
     * @memberOf _.templateSettings
     * @type RegExp
     */
    'escape': /<%-([\s\S]+?)%>/g,

    /**
     * Used to detect code to be evaluated.
     *
     * @static
     * @memberOf _.templateSettings
     * @type RegExp
     */
    'evaluate': /<%([\s\S]+?)%>/g,

    /**
     * Used to detect `data` property values to inject.
     *
     * @static
     * @memberOf _.templateSettings
     * @type RegExp
     */
    'interpolate': /<%=([\s\S]+?)%>/g,

    /**
     * Used to reference the data object in the template text.
     *
     * @static
     * @memberOf _.templateSettings
     * @type String
     */
    'variable': ''
  };

  /*--------------------------------------------------------------------------*/

  /**
   * The template used to create iterator functions.
   *
   * @private
   * @param {Obect} data The data object used to populate the text.
   * @returns {String} Returns the interpolated text.
   */
  var iteratorTemplate = template(
    // conditional strict mode
    '<% if (useStrict) { %>\'use strict\';\n<% } %>' +

    // the `iteratee` may be reassigned by the `top` snippet
    'var index, value, iteratee = <%= firstArg %>, ' +
    // assign the `result` variable an initial value
    'result<% if (init) { %> = <%= init %><% } %>;\n' +
    // add code to exit early or do so if the first argument is falsey
    '<%= exit %>;\n' +
    // add code after the exit snippet but before the iteration branches
    '<%= top %>;\n' +

    // the following branch is for iterating arrays and array-like objects
    '<% if (arrayBranch) { %>' +
    'var length = iteratee.length; index = -1;' +
    '  <% if (objectBranch) { %>\nif (length === +length) {<% } %>' +

    // add support for accessing string characters by index if needed
    '  <% if (noCharByIndex) { %>\n' +
    '  if (toString.call(iteratee) == stringClass) {\n' +
    '    iteratee = iteratee.split(\'\')\n' +
    '  }' +
    '  <% } %>\n' +

    '  <%= arrayBranch.beforeLoop %>;\n' +
    '  while (++index < length) {\n' +
    '    value = iteratee[index];\n' +
    '    <%= arrayBranch.inLoop %>\n' +
    '  }' +
    '  <% if (objectBranch) { %>\n}<% } %>' +
    '<% } %>' +

    // the following branch is for iterating an object's own/inherited properties
    '<% if (objectBranch) { %>' +
    '  <% if (arrayBranch) { %>\nelse {' +

    // add support for iterating over `arguments` objects if needed
    '  <%  } else if (noArgsEnum) { %>\n' +
    '  var length = iteratee.length; index = -1;\n' +
    '  if (length && isArguments(iteratee)) {\n' +
    '    while (++index < length) {\n' +
    '      value = iteratee[index += \'\'];\n' +
    '      <%= objectBranch.inLoop %>\n' +
    '    }\n' +
    '  } else {' +
    '  <% } %>' +

    // Firefox < 3.6, Opera > 9.50 - Opera < 11.60, and Safari < 5.1
    // (if the prototype or a property on the prototype has been set)
    // incorrectly sets a function's `prototype` property [[Enumerable]]
    // value to `true`. Because of this Lo-Dash standardizes on skipping
    // the the `prototype` property of functions regardless of its
    // [[Enumerable]] value.
    '  <% if (!hasDontEnumBug) { %>\n' +
    '  var skipProto = typeof iteratee == \'function\' && \n' +
    '    propertyIsEnumerable.call(iteratee, \'prototype\');\n' +
    '  <% } %>' +

    // iterate own properties using `Object.keys` if it's fast
    '  <% if (isKeysFast && useHas) { %>\n' +
    '  var ownIndex = -1,\n' +
    '      ownProps = objectTypes[typeof iteratee] ? nativeKeys(iteratee) : [],\n' +
    '      length = ownProps.length;\n\n' +
    '  <%= objectBranch.beforeLoop %>;\n' +
    '  while (++ownIndex < length) {\n' +
    '    index = ownProps[ownIndex];\n' +
    '    <% if (!hasDontEnumBug) { %>if (!(skipProto && index == \'prototype\')) {\n  <% } %>' +
    '    value = iteratee[index];\n' +
    '    <%= objectBranch.inLoop %>\n' +
    '    <% if (!hasDontEnumBug) { %>}\n<% } %>' +
    '  }' +

    // else using a for-in loop
    '  <% } else { %>\n' +
    '  <%= objectBranch.beforeLoop %>;\n' +
    '  for (index in iteratee) {<%' +
    '    if (!hasDontEnumBug || useHas) { %>\n    if (<%' +
    '      if (!hasDontEnumBug) { %>!(skipProto && index == \'prototype\')<% }' +
    '      if (!hasDontEnumBug && useHas) { %> && <% }' +
    '      if (useHas) { %>hasOwnProperty.call(iteratee, index)<% }' +
    '    %>) {' +
    '    <% } %>\n' +
    '    value = iteratee[index];\n' +
    '    <%= objectBranch.inLoop %>;' +
    '    <% if (!hasDontEnumBug || useHas) { %>\n    }<% } %>\n' +
    '  }' +
    '  <% } %>' +

    // Because IE < 9 can't set the `[[Enumerable]]` attribute of an
    // existing property and the `constructor` property of a prototype
    // defaults to non-enumerable, Lo-Dash skips the `constructor`
    // property when it infers it's iterating over a `prototype` object.
    '  <% if (hasDontEnumBug) { %>\n\n' +
    '  var ctor = iteratee.constructor;\n' +
    '    <% for (var k = 0; k < 7; k++) { %>\n' +
    '  index = \'<%= shadowed[k] %>\';\n' +
    '  if (<%' +
    '      if (shadowed[k] == \'constructor\') {' +
    '        %>!(ctor && ctor.prototype === iteratee) && <%' +
    '      } %>hasOwnProperty.call(iteratee, index)) {\n' +
    '    value = iteratee[index];\n' +
    '    <%= objectBranch.inLoop %>\n' +
    '  }' +
    '    <% } %>' +
    '  <% } %>' +
    '  <% if (arrayBranch || noArgsEnum) { %>\n}<% } %>' +
    '<% } %>\n' +

    // add code to the bottom of the iteration function
    '<%= bottom %>;\n' +
    // finally, return the `result`
    'return result'
  );

  /**
   * Reusable iterator options shared by
   * `every`, `filter`, `find`, `forEach`, `forIn`, `forOwn`, `groupBy`, `map`,
   * `reject`, `some`, and `sortBy`.
   */
  var baseIteratorOptions = {
    'args': 'collection, callback, thisArg',
    'init': 'collection',
    'top':
      'if (!callback) {\n' +
      '  callback = identity\n' +
      '}\n' +
      'else if (thisArg) {\n' +
      '  callback = bindIterator(callback, thisArg)\n' +
      '}',
    'inLoop': 'if (callback(value, index, collection) === false) return result'
  };

  /** Reusable iterator options for `countBy`, `groupBy`, and `sortBy` */
  var countByIteratorOptions = {
    'init': '{}',
    'top':
      'var prop;\n' +
      'if (typeof callback != \'function\') {\n' +
      '  var valueProp = callback;\n' +
      '  callback = function(value) { return value[valueProp] }\n' +
      '}\n' +
      'else if (thisArg) {\n' +
      '  callback = bindIterator(callback, thisArg)\n' +
      '}',
    'inLoop':
      'prop = callback(value, index, collection);\n' +
      '(hasOwnProperty.call(result, prop) ? result[prop]++ : result[prop] = 1)'
  };

  /** Reusable iterator options for `every` and `some` */
  var everyIteratorOptions = {
    'init': 'true',
    'inLoop': 'if (!callback(value, index, collection)) return !result'
  };

  /** Reusable iterator options for `defaults` and `extend` */
  var extendIteratorOptions = {
    'useHas': false,
    'useStrict': false,
    'args': 'object',
    'init': 'object',
    'top':
      'for (var argsIndex = 1, argsLength = arguments.length; argsIndex < argsLength; argsIndex++) {\n' +
      '  if (iteratee = arguments[argsIndex]) {',
    'inLoop': 'result[index] = value',
    'bottom': '  }\n}'
  };

  /** Reusable iterator options for `filter`, `reject`, and `where` */
  var filterIteratorOptions = {
    'init': '[]',
    'inLoop': 'callback(value, index, collection) && result.push(value)'
  };

  /** Reusable iterator options for `find`, `forEach`, `forIn`, and `forOwn` */
  var forEachIteratorOptions = {
    'top': 'if (thisArg) callback = bindIterator(callback, thisArg)'
  };

  /** Reusable iterator options for `forIn` and `forOwn` */
  var forOwnIteratorOptions = {
    'inLoop': {
      'object': baseIteratorOptions.inLoop
    }
  };

  /** Reusable iterator options for `invoke`, `map`, `pluck`, and `sortBy` */
  var mapIteratorOptions = {
    'init': '',
    'exit': 'if (!collection) return []',
    'beforeLoop': {
      'array':  'result = Array(length)',
      'object': 'result = ' + (isKeysFast ? 'Array(length)' : '[]')
    },
    'inLoop': {
      'array':  'result[index] = callback(value, index, collection)',
      'object': 'result' + (isKeysFast ? '[ownIndex] = ' : '.push') + '(callback(value, index, collection))'
    }
  };

  /** Reusable iterator options for `omit` and `pick` */
  var omitIteratorOptions = {
    'useHas': false,
    'args': 'object, callback, thisArg',
    'init': '{}',
    'top':
      'var isFunc = typeof callback == \'function\';\n' +
      'if (!isFunc) {\n' +
      '  var props = concat.apply(ArrayProto, arguments)\n' +
      '} else if (thisArg) {\n' +
      '  callback = bindIterator(callback, thisArg)\n' +
      '}',
    'inLoop':
      'if (isFunc\n' +
      '  ? !callback(value, index, object)\n' +
      '  : indexOf(props, index) < 0\n' +
      ') result[index] = value'
  };

  /*--------------------------------------------------------------------------*/

  /**
   * Creates a bound iterator function that, when called, invokes `func` with
   * the `this` binding of `thisArg` and the arguments (value, index, object).
   *
   * @private
   * @param {Function} func The function to bind.
   * @param {Mixed} [thisArg] The `this` binding of `func`.
   * @returns {Function} Returns the new bound function.
   */
  function bindIterator(func, thisArg) {
    return function(value, index, object) {
      return func.call(thisArg, value, index, object);
    };
  }

  /**
   * Creates a function optimized for searching large arrays for a given `value`,
   * starting at `fromIndex`, using strict equality for comparisons, i.e. `===`.
   *
   * @private
   * @param {Array} array The array to search.
   * @param {Mixed} value The value to search for.
   * @param {Number} [fromIndex=0] The index to start searching from.
   * @param {Number} [largeSize=30] The length at which an array is considered large.
   * @returns {Boolean} Returns `true` if `value` is found, else `false`.
   */
  function cachedContains(array, fromIndex, largeSize) {
    fromIndex || (fromIndex = 0);

    var length = array.length,
        isLarge = (length - fromIndex) >= (largeSize || largeArraySize),
        cache = isLarge ? {} : array;

    if (isLarge) {
      // init value cache
      var key,
          index = fromIndex - 1;

      while (++index < length) {
        // manually coerce `value` to string because `hasOwnProperty`, in some
        // older versions of Firefox, coerces objects incorrectly
        key = array[index] + '';
        (hasOwnProperty.call(cache, key) ? cache[key] : (cache[key] = [])).push(array[index]);
      }
    }
    return function(value) {
      if (isLarge) {
        var key = value + '';
        return hasOwnProperty.call(cache, key) && indexOf(cache[key], value) > -1;
      }
      return indexOf(cache, value, fromIndex) > -1;
    }
  }

  /**
   * Used by `sortBy` to compare transformed `collection` values, stable sorting
   * them in ascending order.
   *
   * @private
   * @param {Object} a The object to compare to `b`.
   * @param {Object} b The object to compare to `a`.
   * @returns {Number} Returns the sort order indicator of `1` or `-1`.
   */
  function compareAscending(a, b) {
    var ai = a.index,
        bi = b.index;

    a = a.criteria;
    b = b.criteria;

    // ensure a stable sort in V8 and other engines
    // http://code.google.com/p/v8/issues/detail?id=90
    if (a !== b) {
      if (a > b || a === undefined) {
        return 1;
      }
      if (a < b || b === undefined) {
        return -1;
      }
    }
    return ai < bi ? -1 : 1;
  }

  /**
   * Creates a function that, when called, invokes `func` with the `this`
   * binding of `thisArg` and prepends any `partailArgs` to the arguments passed
   * to the bound function.
   *
   * @private
   * @param {Function|String} func The function to bind or the method name.
   * @param {Mixed} [thisArg] The `this` binding of `func`.
   * @param {Array} partialArgs An array of arguments to be partially applied.
   * @returns {Function} Returns the new bound function.
   */
  function createBound(func, thisArg, partialArgs) {
    var isFunc = isFunction(func),
        isPartial = !partialArgs,
        methodName = func;

    // juggle arguments
    if (isPartial) {
      partialArgs = thisArg;
    }

    function bound() {
      // `Function#bind` spec
      // http://es5.github.com/#x15.3.4.5
      var args = arguments,
          thisBinding = isPartial ? this : thisArg;

      if (!isFunc) {
        func = thisArg[methodName];
      }
      if (partialArgs.length) {
        args = args.length
          ? partialArgs.concat(slice.call(args))
          : partialArgs;
      }
      if (this instanceof bound) {
        // get `func` instance if `bound` is invoked in a `new` expression
        noop.prototype = func.prototype;
        thisBinding = new noop;

        // mimic the constructor's `return` behavior
        // http://es5.github.com/#x13.2.2
        var result = func.apply(thisBinding, args);
        return result && objectTypes[typeof result]
          ? result
          : thisBinding
      }
      return func.apply(thisBinding, args);
    }
    return bound;
  }

  /**
   * Creates compiled iteration functions. The iteration function will be created
   * to iterate over only objects if the first argument of `options.args` is
   * "object" or `options.inLoop.array` is falsey.
   *
   * @private
   * @param {Object} [options1, options2, ...] The compile options objects.
   *
   *  useHas - A boolean to specify whether or not to use `hasOwnProperty` checks
   *   in the object loop.
   *
   *  useStrict - A boolean to specify whether or not to include the ES5
   *   "use strict" directive.
   *
   *  args - A string of comma separated arguments the iteration function will
   *   accept.
   *
   *  init - A string to specify the initial value of the `result` variable.
   *
   *  exit - A string of code to use in place of the default exit-early check
   *   of `if (!arguments[0]) return result`.
   *
   *  top - A string of code to execute after the exit-early check but before
   *   the iteration branches.
   *
   *  beforeLoop - A string or object containing an "array" or "object" property
   *   of code to execute before the array or object loops.
   *
   *  inLoop - A string or object containing an "array" or "object" property
   *   of code to execute in the array or object loops.
   *
   *  bottom - A string of code to execute after the iteration branches but
   *   before the `result` is returned.
   *
   * @returns {Function} Returns the compiled function.
   */
  function createIterator() {
    var object,
        prop,
        value,
        index = -1,
        length = arguments.length;

    // merge options into a template data object
    var data = {
      'bottom': '',
      'exit': '',
      'init': '',
      'top': '',
      'arrayBranch': { 'beforeLoop': '' },
      'objectBranch': { 'beforeLoop': '' }
    };

    while (++index < length) {
      object = arguments[index];
      for (prop in object) {
        value = (value = object[prop]) == null ? '' : value;
        // keep this regexp explicit for the build pre-process
        if (/beforeLoop|inLoop/.test(prop)) {
          if (typeof value == 'string') {
            value = { 'array': value, 'object': value };
          }
          data.arrayBranch[prop] = value.array || '';
          data.objectBranch[prop] = value.object || '';
        } else {
          data[prop] = value;
        }
      }
    }
    // set additional template `data` values
    var args = data.args,
        firstArg = /^[^,]+/.exec(args)[0],
        useStrict = data.useStrict;

    data.firstArg = firstArg;
    data.hasDontEnumBug = hasDontEnumBug;
    data.isKeysFast = isKeysFast;
    data.noArgsEnum = noArgsEnum;
    data.shadowed = shadowed;
    data.useHas = data.useHas !== false;
    data.useStrict = useStrict == null ? isStrictFast : useStrict;

    if (data.noCharByIndex == null) {
      data.noCharByIndex = noCharByIndex;
    }
    if (!data.exit) {
      data.exit = 'if (!' + firstArg + ') return result';
    }
    if (firstArg != 'collection' || !data.arrayBranch.inLoop) {
      data.arrayBranch = null;
    }
    // create the function factory
    var factory = Function(
        'arrayLikeClasses, ArrayProto, bind, bindIterator, compareAscending, concat, ' +
        'forIn, hasOwnProperty, identity, indexOf, isArguments, isArray, isFunction, ' +
        'isPlainObject, objectClass, objectTypes, nativeKeys, propertyIsEnumerable, ' +
        'slice, stringClass, toString',
      'var callee = function(' + args + ') {\n' + iteratorTemplate(data) + '\n};\n' +
      'return callee'
    );
    // return the compiled function
    return factory(
      arrayLikeClasses, ArrayProto, bind, bindIterator, compareAscending, concat,
      forIn, hasOwnProperty, identity, indexOf, isArguments, isArray, isFunction,
      isPlainObject, objectClass, objectTypes, nativeKeys, propertyIsEnumerable,
      slice, stringClass, toString
    );
  }

  /**
   * Used by `template` to escape characters for inclusion in compiled
   * string literals.
   *
   * @private
   * @param {String} match The matched character to escape.
   * @returns {String} Returns the escaped character.
   */
  function escapeStringChar(match) {
    return '\\' + stringEscapes[match];
  }

  /**
   * Used by `escape` to convert characters to HTML entities.
   *
   * @private
   * @param {String} match The matched character to escape.
   * @returns {String} Returns the escaped character.
   */
  function escapeHtmlChar(match) {
    return htmlEscapes[match];
  }

  /**
   * A no-operation function.
   *
   * @private
   */
  function noop() {
    // no operation performed
  }

  /**
   * Used by `unescape` to convert HTML entities to characters.
   *
   * @private
   * @param {String} match The matched character to unescape.
   * @returns {String} Returns the unescaped character.
   */
  function unescapeHtmlChar(match) {
    return htmlUnescapes[match];
  }

  /*--------------------------------------------------------------------------*/

  /**
   * Checks if `value` is an `arguments` object.
   *
   * @static
   * @memberOf _
   * @category Objects
   * @param {Mixed} value The value to check.
   * @returns {Boolean} Returns `true` if the `value` is an `arguments` object, else `false`.
   * @example
   *
   * (function() { return _.isArguments(arguments); })(1, 2, 3);
   * // => true
   *
   * _.isArguments([1, 2, 3]);
   * // => false
   */
  function isArguments(value) {
    return toString.call(value) == argsClass;
  }
  // fallback for browsers that can't detect `arguments` objects by [[Class]]
  if (noArgsClass) {
    isArguments = function(value) {
      return !!(value && hasOwnProperty.call(value, 'callee'));
    };
  }

  /**
   * Checks if `value` is an array.
   *
   * @static
   * @memberOf _
   * @category Objects
   * @param {Mixed} value The value to check.
   * @returns {Boolean} Returns `true` if the `value` is an array, else `false`.
   * @example
   *
   * (function() { return _.isArray(arguments); })();
   * // => false
   *
   * _.isArray([1, 2, 3]);
   * // => true
   */
  var isArray = nativeIsArray || function(value) {
    return toString.call(value) == arrayClass;
  };

  /**
   * Checks if `value` is a function.
   *
   * @static
   * @memberOf _
   * @category Objects
   * @param {Mixed} value The value to check.
   * @returns {Boolean} Returns `true` if the `value` is a function, else `false`.
   * @example
   *
   * _.isFunction(''.concat);
   * // => true
   */
  function isFunction(value) {
    return typeof value == 'function';
  }
  // fallback for older versions of Chrome and Safari
  if (isFunction(/x/)) {
    isFunction = function(value) {
      return toString.call(value) == funcClass;
    };
  }

  /**
   * A fallback implementation of `isPlainObject` that checks if a given `value`
   * is an object created by the `Object` constructor, assuming objects created
   * by the `Object` constructor have no inherited enumerable properties and that
   * there are no `Object.prototype` extensions.
   *
   * @private
   * @param {Mixed} value The value to check.
   * @param {Boolean} [skipArgsCheck=false] Internally used to skip checks for
   *  `arguments` objects.
   * @returns {Boolean} Returns `true` if `value` is a plain object, else `false`.
   */
  function isPlainFallback(value, skipArgsCheck) {
    // avoid non-objects and false positives for `arguments` objects
    var result = false;
    if (!(value && typeof value == 'object') || (!skipArgsCheck && isArguments(value))) {
      return result;
    }
    // IE < 9 presents DOM nodes as `Object` objects except they have `toString`
    // methods that are `typeof` "string" and still can coerce nodes to strings.
    // Also check that the constructor is `Object` (i.e. `Object instanceof Object`)
    var ctor = value.constructor;
    if ((!noNodeClass || !(typeof value.toString != 'function' && typeof (value + '') == 'string')) &&
        (!isFunction(ctor) || ctor instanceof ctor)) {
      // IE < 9 iterates inherited properties before own properties. If the first
      // iterated property is an object's own property then there are no inherited
      // enumerable properties.
      if (iteratesOwnLast) {
        forIn(value, function(value, key, object) {
          result = !hasOwnProperty.call(object, key);
          return false;
        });
        return result === false;
      }
      // In most environments an object's own properties are iterated before
      // its inherited properties. If the last iterated property is an object's
      // own property then there are no inherited enumerable properties.
      forIn(value, function(value, key) {
        result = key;
      });
      return result === false || hasOwnProperty.call(value, result);
    }
    return result;
  }

  /**
   * Checks if a given `value` is an object created by the `Object` constructor.
   *
   * @private
   * @param {Mixed} value The value to check.
   * @param {Boolean} [skipArgsCheck=false] Internally used to skip checks for
   *  `arguments` objects.
   * @returns {Boolean} Returns `true` if `value` is a plain object, else `false`.
   */
  var isPlainObject = objectTypes.__proto__ != ObjectProto ? isPlainFallback : function(value, skipArgsCheck) {
    if (!value) {
      return false;
    }
    var valueOf = value.valueOf,
        objProto = typeof valueOf == 'function' && (objProto = valueOf.__proto__) && objProto.__proto__;

    return objProto
      ? value == objProto || (value.__proto__ == objProto && (skipArgsCheck || !isArguments(value)))
      : isPlainFallback(value);
  };

  /**
   * A shim implementation of `Object.keys` that produces an array of the given
   * object's own enumerable property names.
   *
   * @private
   * @param {Object} object The object to inspect.
   * @returns {Array} Returns a new array of property names.
   */
  var shimKeys = createIterator({
    'args': 'object',
    'init': '[]',
    'inLoop': 'result.push(index)'
  });

  /*--------------------------------------------------------------------------*/

  /**
   * Creates a clone of `value`. If `deep` is `true`, all nested objects will
   * also be cloned otherwise they will be assigned by reference. Functions, DOM
   * nodes, `arguments` objects, and objects created by constructors other than
   * `Object` are **not** cloned.
   *
   * @static
   * @memberOf _
   * @category Objects
   * @param {Mixed} value The value to clone.
   * @param {Boolean} deep A flag to indicate a deep clone.
   * @param {Object} [guard] Internally used to allow this method to work with
   *  others like `_.map` without using their callback `index` argument for `deep`.
   * @param {Array} [stackA=[]] Internally used to track traversed source objects.
   * @param {Array} [stackB=[]] Internally used to associate clones with their
   *  source counterparts.
   * @returns {Mixed} Returns the cloned `value`.
   * @example
   *
   * var stooges = [
   *   { 'name': 'moe', 'age': 40 },
   *   { 'name': 'larry', 'age': 50 },
   *   { 'name': 'curly', 'age': 60 }
   * ];
   *
   * _.clone({ 'name': 'moe' });
   * // => { 'name': 'moe' }
   *
   * var shallow = _.clone(stooges);
   * shallow[0] === stooges[0];
   * // => true
   *
   * var deep = _.clone(stooges, true);
   * shallow[0] === stooges[0];
   * // => false
   */
  function clone(value, deep, guard, stackA, stackB) {
    if (value == null) {
      return value;
    }
    if (guard) {
      deep = false;
    }
    // inspect [[Class]]
    var isObj = objectTypes[typeof value];
    if (isObj) {
      // don't clone `arguments` objects, functions, or non-object Objects
      var className = toString.call(value);
      if (!cloneableClasses[className] || (noArgsClass && isArguments(value))) {
        return value;
      }
      var isArr = className == arrayClass;
      isObj = isArr || (className == objectClass ? isPlainObject(value, true) : isObj);
    }
    // shallow clone
    if (!isObj || !deep) {
      // don't clone functions
      return isObj
        ? (isArr ? slice.call(value) : extend({}, value))
        : value;
    }

    var ctor = value.constructor;
    switch (className) {
      case boolClass:
        return new ctor(value == true);

      case dateClass:
        return new ctor(+value);

      case numberClass:
      case stringClass:
        return new ctor(value);

      case regexpClass:
        return ctor(value.source, reFlags.exec(value));
    }

    // check for circular references and return corresponding clone
    stackA || (stackA = []);
    stackB || (stackB = []);

    var length = stackA.length;
    while (length--) {
      if (stackA[length] == value) {
        return stackB[length];
      }
    }

    // init cloned object
    var result = isArr ? ctor(length = value.length) : {};

    // add the source value to the stack of traversed objects
    // and associate it with its clone
    stackA.push(value);
    stackB.push(result);

    // recursively populate clone (susceptible to call stack limits)
    if (isArr) {
      var index = -1;
      while (++index < length) {
        result[index] = clone(value[index], deep, null, stackA, stackB);
      }
    } else {
      forOwn(value, function(objValue, key) {
        result[key] = clone(objValue, deep, null, stackA, stackB);
      });
    }
    return result;
  }

  /**
   * Assigns enumerable properties of the default object(s) to the `destination`
   * object for all `destination` properties that resolve to `null`/`undefined`.
   * Once a property is set, additional defaults of the same property will be
   * ignored.
   *
   * @static
   * @memberOf _
   * @category Objects
   * @param {Object} object The destination object.
   * @param {Object} [default1, default2, ...] The default objects.
   * @returns {Object} Returns the destination object.
   * @example
   *
   * var iceCream = { 'flavor': 'chocolate' };
   * _.defaults(iceCream, { 'flavor': 'vanilla', 'sprinkles': 'rainbow' });
   * // => { 'flavor': 'chocolate', 'sprinkles': 'rainbow' }
   */
  var defaults = createIterator(extendIteratorOptions, {
    'inLoop': 'if (result[index] == null) ' + extendIteratorOptions.inLoop
  });

  /**
   * Assigns enumerable properties of the source object(s) to the `destination`
   * object. Subsequent sources will overwrite propery assignments of previous
   * sources.
   *
   * @static
   * @memberOf _
   * @category Objects
   * @param {Object} object The destination object.
   * @param {Object} [source1, source2, ...] The source objects.
   * @returns {Object} Returns the destination object.
   * @example
   *
   * _.extend({ 'name': 'moe' }, { 'age': 40 });
   * // => { 'name': 'moe', 'age': 40 }
   */
  var extend = createIterator(extendIteratorOptions);

  /**
   * Iterates over `object`'s own and inherited enumerable properties, executing
   * the `callback` for each property. The `callback` is bound to `thisArg` and
   * invoked with three arguments; (value, key, object). Callbacks may exit iteration
   * early by explicitly returning `false`.
   *
   * @static
   * @memberOf _
   * @category Objects
   * @param {Object} object The object to iterate over.
   * @param {Function} callback The function called per iteration.
   * @param {Mixed} [thisArg] The `this` binding for the callback.
   * @returns {Object} Returns `object`.
   * @example
   *
   * function Dog(name) {
   *   this.name = name;
   * }
   *
   * Dog.prototype.bark = function() {
   *   alert('Woof, woof!');
   * };
   *
   * _.forIn(new Dog('Dagny'), function(value, key) {
   *   alert(key);
   * });
   * // => alerts 'name' and 'bark' (order is not guaranteed)
   */
  var forIn = createIterator(baseIteratorOptions, forEachIteratorOptions, forOwnIteratorOptions, {
    'useHas': false
  });

  /**
   * Iterates over `object`'s own enumerable properties, executing the `callback`
   * for each property. The `callback` is bound to `thisArg` and invoked with three
   * arguments; (value, key, object). Callbacks may exit iteration early by explicitly
   * returning `false`.
   *
   * @static
   * @memberOf _
   * @category Objects
   * @param {Object} object The object to iterate over.
   * @param {Function} callback The function called per iteration.
   * @param {Mixed} [thisArg] The `this` binding for the callback.
   * @returns {Object} Returns `object`.
   * @example
   *
   * _.forOwn({ '0': 'zero', '1': 'one', 'length': 2 }, function(num, key) {
   *   alert(key);
   * });
   * // => alerts '0', '1', and 'length' (order is not guaranteed)
   */
  var forOwn = createIterator(baseIteratorOptions, forEachIteratorOptions, forOwnIteratorOptions);

  /**
   * Creates a sorted array of all enumerable properties, own and inherited,
   * of `object` that have function values.
   *
   * @static
   * @memberOf _
   * @alias methods
   * @category Objects
   * @param {Object} object The object to inspect.
   * @returns {Array} Returns a new array of property names that have function values.
   * @example
   *
   * _.functions(_);
   * // => ['all', 'any', 'bind', 'bindAll', 'clone', 'compact', 'compose', ...]
   */
  var functions = createIterator({
    'useHas': false,
    'args': 'object',
    'init': '[]',
    'inLoop': 'if (isFunction(value)) result.push(index)',
    'bottom': 'result.sort()'
  });

  /**
   * Checks if the specified object `property` exists and is a direct property,
   * instead of an inherited property.
   *
   * @static
   * @memberOf _
   * @category Objects
   * @param {Object} object The object to check.
   * @param {String} property The property to check for.
   * @returns {Boolean} Returns `true` if key is a direct property, else `false`.
   * @example
   *
   * _.has({ 'a': 1, 'b': 2, 'c': 3 }, 'b');
   * // => true
   */
  function has(object, property) {
    return object ? hasOwnProperty.call(object, property) : false;
  }

  /**
   * Creates an object composed of the inverted keys and values of the given `object`.
   *
   * @static
   * @memberOf _
   * @category Objects
   * @param {Object} object The object to invert.
   * @returns {Object} Returns the created inverted object.
   * @example
   *
   *  _.invert({ 'first': 'Moe', 'second': 'Larry', 'third': 'Curly' });
   * // => { 'Moe': 'first', 'Larry': 'second', 'Curly': 'third' } (order is not guaranteed)
   */
  var invert = createIterator({
    'args': 'object',
    'init': '{}',
    'inLoop': 'result[value] = index'
  });

  /**
   * Checks if `value` is a boolean (`true` or `false`) value.
   *
   * @static
   * @memberOf _
   * @category Objects
   * @param {Mixed} value The value to check.
   * @returns {Boolean} Returns `true` if the `value` is a boolean value, else `false`.
   * @example
   *
   * _.isBoolean(null);
   * // => false
   */
  function isBoolean(value) {
    return value === true || value === false || toString.call(value) == boolClass;
  }

  /**
   * Checks if `value` is a date.
   *
   * @static
   * @memberOf _
   * @category Objects
   * @param {Mixed} value The value to check.
   * @returns {Boolean} Returns `true` if the `value` is a date, else `false`.
   * @example
   *
   * _.isDate(new Date);
   * // => true
   */
  function isDate(value) {
    return toString.call(value) == dateClass;
  }

  /**
   * Checks if `value` is a DOM element.
   *
   * @static
   * @memberOf _
   * @category Objects
   * @param {Mixed} value The value to check.
   * @returns {Boolean} Returns `true` if the `value` is a DOM element, else `false`.
   * @example
   *
   * _.isElement(document.body);
   * // => true
   */
  function isElement(value) {
    return value ? value.nodeType === 1 : false;
  }

  /**
   * Checks if `value` is empty. Arrays, strings, or `arguments` objects with a
   * length of `0` and objects with no own enumerable properties are considered
   * "empty".
   *
   * @static
   * @memberOf _
   * @category Objects
   * @param {Array|Object|String} value The value to inspect.
   * @returns {Boolean} Returns `true` if the `value` is empty, else `false`.
   * @example
   *
   * _.isEmpty([1, 2, 3]);
   * // => false
   *
   * _.isEmpty({});
   * // => true
   *
   * _.isEmpty('');
   * // => true
   */
  var isEmpty = createIterator({
    'args': 'value',
    'init': 'true',
    'top':
      'var className = toString.call(value),\n' +
      '    length = value.length;\n' +
      'if (arrayLikeClasses[className]' +
      (noArgsClass ? ' || isArguments(value)' : '') + ' ||\n' +
      '  (className == objectClass && length === +length &&\n' +
      '  isFunction(value.splice))' +
      ') return !length',
    'inLoop': {
      'object': 'return false'
    }
  });

  /**
   * Performs a deep comparison between two values to determine if they are
   * equivalent to each other.
   *
   * @static
   * @memberOf _
   * @category Objects
   * @param {Mixed} a The value to compare.
   * @param {Mixed} b The other value to compare.
   * @param {Object} [stackA=[]] Internally used track traversed `a` objects.
   * @param {Object} [stackB=[]] Internally used track traversed `b` objects.
   * @returns {Boolean} Returns `true` if the values are equvalent, else `false`.
   * @example
   *
   * var moe = { 'name': 'moe', 'luckyNumbers': [13, 27, 34] };
   * var clone = { 'name': 'moe', 'luckyNumbers': [13, 27, 34] };
   *
   * moe == clone;
   * // => false
   *
   * _.isEqual(moe, clone);
   * // => true
   */
  function isEqual(a, b, stackA, stackB) {
    // a strict comparison is necessary because `null == undefined`
    if (a == null || b == null) {
      return a === b;
    }
    // exit early for identical values
    if (a === b) {
      // treat `+0` vs. `-0` as not equal
      return a !== 0 || (1 / a == 1 / b);
    }
    // unwrap any LoDash wrapped values
    if (objectTypes[typeof a] || objectTypes[typeof b]) {
      a = a.__wrapped__ || a;
      b = b.__wrapped__ || b;
    }
    // compare [[Class]] names
    var className = toString.call(a);
    if (className != toString.call(b)) {
      return false;
    }
    switch (className) {
      case boolClass:
      case dateClass:
        // coerce dates and booleans to numbers, dates to milliseconds and booleans
        // to `1` or `0`, treating invalid dates coerced to `NaN` as not equal
        return +a == +b;

      case numberClass:
        // treat `NaN` vs. `NaN` as equal
        return a != +a
          ? b != +b
          // but treat `+0` vs. `-0` as not equal
          : (a == 0 ? (1 / a == 1 / b) : a == +b);

      case regexpClass:
      case stringClass:
        // coerce regexes to strings (http://es5.github.com/#x15.10.6.4)
        // treat string primitives and their corresponding object instances as equal
        return a == b + '';
    }
    // exit early, in older browsers, if `a` is array-like but not `b`
    var isArr = arrayLikeClasses[className];
    if (noArgsClass && !isArr && (isArr = isArguments(a)) && !isArguments(b)) {
      return false;
    }
    // exit for functions and DOM nodes
    if (!isArr && (className != objectClass || (noNodeClass && (
        (typeof a.toString != 'function' && typeof (a + '') == 'string') ||
        (typeof b.toString != 'function' && typeof (b + '') == 'string'))))) {
      return false;
    }

    // assume cyclic structures are equal
    // the algorithm for detecting cyclic structures is adapted from ES 5.1
    // section 15.12.3, abstract operation `JO` (http://es5.github.com/#x15.12.3)
    stackA || (stackA = []);
    stackB || (stackB = []);

    var length = stackA.length;
    while (length--) {
      if (stackA[length] == a) {
        return stackB[length] == b;
      }
    }

    var index = -1,
        result = true,
        size = 0;

    // add `a` and `b` to the stack of traversed objects
    stackA.push(a);
    stackB.push(b);

    // recursively compare objects and arrays (susceptible to call stack limits)
    if (isArr) {
      // compare lengths to determine if a deep comparison is necessary
      size = a.length;
      result = size == b.length;

      if (result) {
        // deep compare the contents, ignoring non-numeric properties
        while (size--) {
          if (!(result = isEqual(a[size], b[size], stackA, stackB))) {
            break;
          }
        }
      }
      return result;
    }

    var ctorA = a.constructor,
        ctorB = b.constructor;

    // non `Object` object instances with different constructors are not equal
    if (ctorA != ctorB && !(
          isFunction(ctorA) && ctorA instanceof ctorA &&
          isFunction(ctorB) && ctorB instanceof ctorB
        )) {
      return false;
    }
    // deep compare objects
    for (var prop in a) {
      if (hasOwnProperty.call(a, prop)) {
        // count the number of properties.
        size++;
        // deep compare each property value.
        if (!(hasOwnProperty.call(b, prop) && isEqual(a[prop], b[prop], stackA, stackB))) {
          return false;
        }
      }
    }
    // ensure both objects have the same number of properties
    for (prop in b) {
      // The JS engine in Adobe products, like InDesign, has a bug that causes
      // `!size--` to throw an error so it must be wrapped in parentheses.
      // https://github.com/documentcloud/underscore/issues/355
      if (hasOwnProperty.call(b, prop) && !(size--)) {
        // `size` will be `-1` if `b` has more properties than `a`
        return false;
      }
    }
    // handle JScript [[DontEnum]] bug
    if (hasDontEnumBug) {
      while (++index < 7) {
        prop = shadowed[index];
        if (hasOwnProperty.call(a, prop) &&
            !(hasOwnProperty.call(b, prop) && isEqual(a[prop], b[prop], stackA, stackB))) {
          return false;
        }
      }
    }
    return true;
  }

  /**
   * Checks if `value` is a finite number.
   *
   * Note: This is not the same as native `isFinite`, which will return true for
   * booleans and other values. See http://es5.github.com/#x15.1.2.5.
   *
   * @deprecated
   * @static
   * @memberOf _
   * @category Objects
   * @param {Mixed} value The value to check.
   * @returns {Boolean} Returns `true` if the `value` is a finite number, else `false`.
   * @example
   *
   * _.isFinite(-101);
   * // => true
   *
   * _.isFinite('10');
   * // => false
   *
   * _.isFinite(Infinity);
   * // => false
   */
  function isFinite(value) {
    return nativeIsFinite(value) && toString.call(value) == numberClass;
  }

  /**
   * Checks if `value` is the language type of Object.
   * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
   *
   * @static
   * @memberOf _
   * @category Objects
   * @param {Mixed} value The value to check.
   * @returns {Boolean} Returns `true` if the `value` is an object, else `false`.
   * @example
   *
   * _.isObject({});
   * // => true
   *
   * _.isObject(1);
   * // => false
   */
  function isObject(value) {
    // check if the value is the ECMAScript language type of Object
    // http://es5.github.com/#x8
    // and avoid a V8 bug
    // http://code.google.com/p/v8/issues/detail?id=2291
    return value ? objectTypes[typeof value] : false;
  }

  /**
   * Checks if `value` is `NaN`.
   *
   * Note: This is not the same as native `isNaN`, which will return true for
   * `undefined` and other values. See http://es5.github.com/#x15.1.2.4.
   *
   * @deprecated
   * @static
   * @memberOf _
   * @category Objects
   * @param {Mixed} value The value to check.
   * @returns {Boolean} Returns `true` if the `value` is `NaN`, else `false`.
   * @example
   *
   * _.isNaN(NaN);
   * // => true
   *
   * _.isNaN(new Number(NaN));
   * // => true
   *
   * isNaN(undefined);
   * // => true
   *
   * _.isNaN(undefined);
   * // => false
   */
  function isNaN(value) {
    // `NaN` as a primitive is the only value that is not equal to itself
    // (perform the [[Class]] check first to avoid errors with some host objects in IE)
    return toString.call(value) == numberClass && value != +value
  }

  /**
   * Checks if `value` is `null`.
   *
   * @deprecated
   * @static
   * @memberOf _
   * @category Objects
   * @param {Mixed} value The value to check.
   * @returns {Boolean} Returns `true` if the `value` is `null`, else `false`.
   * @example
   *
   * _.isNull(null);
   * // => true
   *
   * _.isNull(undefined);
   * // => false
   */
  function isNull(value) {
    return value === null;
  }

  /**
   * Checks if `value` is a number.
   *
   * @static
   * @memberOf _
   * @category Objects
   * @param {Mixed} value The value to check.
   * @returns {Boolean} Returns `true` if the `value` is a number, else `false`.
   * @example
   *
   * _.isNumber(8.4 * 5);
   * // => true
   */
  function isNumber(value) {
    return toString.call(value) == numberClass;
  }

  /**
   * Checks if `value` is a regular expression.
   *
   * @static
   * @memberOf _
   * @category Objects
   * @param {Mixed} value The value to check.
   * @returns {Boolean} Returns `true` if the `value` is a regular expression, else `false`.
   * @example
   *
   * _.isRegExp(/moe/);
   * // => true
   */
  function isRegExp(value) {
    return toString.call(value) == regexpClass;
  }

  /**
   * Checks if `value` is a string.
   *
   * @static
   * @memberOf _
   * @category Objects
   * @param {Mixed} value The value to check.
   * @returns {Boolean} Returns `true` if the `value` is a string, else `false`.
   * @example
   *
   * _.isString('moe');
   * // => true
   */
  function isString(value) {
    return toString.call(value) == stringClass;
  }

  /**
   * Checks if `value` is `undefined`.
   *
   * @deprecated
   * @static
   * @memberOf _
   * @category Objects
   * @param {Mixed} value The value to check.
   * @returns {Boolean} Returns `true` if the `value` is `undefined`, else `false`.
   * @example
   *
   * _.isUndefined(void 0);
   * // => true
   */
  function isUndefined(value) {
    return value === undefined;
  }

  /**
   * Creates an array composed of the own enumerable property names of `object`.
   *
   * @static
   * @memberOf _
   * @category Objects
   * @param {Object} object The object to inspect.
   * @returns {Array} Returns a new array of property names.
   * @example
   *
   * _.keys({ 'one': 1, 'two': 2, 'three': 3 });
   * // => ['one', 'two', 'three'] (order is not guaranteed)
   */
  var keys = !nativeKeys ? shimKeys : function(object) {
    var type = typeof object;

    // avoid iterating over the `prototype` property
    if (type == 'function' && propertyIsEnumerable.call(object, 'prototype')) {
      return shimKeys(object);
    }
    return object && objectTypes[type]
      ? nativeKeys(object)
      : [];
  };

  /**
   * Merges enumerable properties of the source object(s) into the `destination`
   * object. Subsequent sources will overwrite propery assignments of previous
   * sources.
   *
   * @static
   * @memberOf _
   * @category Objects
   * @param {Object} object The destination object.
   * @param {Object} [source1, source2, ...] The source objects.
   * @param {Object} [indicator] Internally used to indicate that the `stack`
   *  argument is an array of traversed objects instead of another source object.
   * @param {Array} [stackA=[]] Internally used to track traversed source objects.
   * @param {Array} [stackB=[]] Internally used to associate clones with their
   *  source counterparts.
   * @returns {Object} Returns the destination object.
   * @example
   *
   * var stooges = [
   *   { 'name': 'moe' },
   *   { 'name': 'larry' }
   * ];
   *
   * var ages = [
   *   { 'age': 40 },
   *   { 'age': 50 }
   * ];
   *
   * _.merge(stooges, ages);
   * // => [{ 'name': 'moe', 'age': 40 }, { 'name': 'larry', 'age': 50 }]
   */
  var merge = createIterator(extendIteratorOptions, {
    'args': 'object, source, indicator',
    'top':
      'var argsLength, isArr, stackA, stackB,\n' +
      '    args = arguments, argsIndex = 0;\n' +
      'if (indicator == isPlainObject) {\n' +
      '  argsLength = 2;\n' +
      '  stackA = args[3];\n' +
      '  stackB = args[4]\n' +
      '} else {\n' +
      '  argsLength = args.length;\n' +
      '  stackA = [];\n' +
      '  stackB = []\n' +
      '}\n' +
      'while (++argsIndex < argsLength) {\n' +
      '  if (iteratee = args[argsIndex]) {',
    'inLoop':
      'if ((source = value) && ((isArr = isArray(source)) || isPlainObject(source))) {\n' +
      '  var found = false, stackLength = stackA.length;\n' +
      '  while (stackLength--) {\n' +
      '    if (found = stackA[stackLength] == source) break\n' +
      '  }\n' +
      '  if (found) {\n' +
      '    result[index] = stackB[stackLength]\n' +
      '  } else {\n' +
      '    stackA.push(source);\n' +
      '    stackB.push(value = (value = result[index]) && isArr\n' +
      '      ? (isArray(value) ? value : [])\n' +
      '      : (isPlainObject(value) ? value : {})\n' +
      '    );\n' +
      '    result[index] = callee(value, source, isPlainObject, stackA, stackB)\n' +
      '  }\n' +
      '} else if (source != null) {\n' +
      '  result[index] = source\n' +
      '}'
  });

  /**
   * Creates a shallow clone of `object` excluding the specified properties.
   * Property names may be specified as individual arguments or as arrays of
   * property names. If `callback` is passed, it will be executed for each property
   * in the `object`, omitting the properties `callback` returns truthy for. The
   * `callback` is bound to `thisArg` and invoked with three arguments; (value, key, object).
   *
   * @static
   * @memberOf _
   * @category Objects
   * @param {Object} object The source object.
   * @param {Function|String} callback|[prop1, prop2, ...] The properties to omit
   *  or the function called per iteration.
   * @param {Mixed} [thisArg] The `this` binding for the callback.
   * @returns {Object} Returns an object without the omitted properties.
   * @example
   *
   * _.omit({ 'name': 'moe', 'age': 40, 'userid': 'moe1' }, 'userid');
   * // => { 'name': 'moe', 'age': 40 }
   *
   * _.omit({ 'name': 'moe', '_hint': 'knucklehead', '_seed': '96c4eb' }, function(value, key) {
   *   return key.charAt(0) == '_';
   * });
   * // => { 'name': 'moe' }
   */
  var omit = createIterator(omitIteratorOptions);

  /**
   * Creates a two dimensional array of the given object's key-value pairs,
   * i.e. `[[key1, value1], [key2, value2]]`.
   *
   * @static
   * @memberOf _
   * @category Objects
   * @param {Object} object The object to inspect.
   * @returns {Array} Returns new array of key-value pairs.
   * @example
   *
   * _.pairs({ 'moe': 30, 'larry': 40, 'curly': 50 });
   * // => [['moe', 30], ['larry', 40], ['curly', 50]] (order is not guaranteed)
   */
  var pairs = createIterator({
    'args': 'object',
    'init':'[]',
    'inLoop': 'result'  + (isKeysFast ? '[ownIndex] = ' : '.push') + '([index, value])'
  });

  /**
   * Creates a shallow clone of `object` composed of the specified properties.
   * Property names may be specified as individual arguments or as arrays of
   * property names. If `callback` is passed, it will be executed for each property
   * in the `object`, picking the properties `callback` returns truthy for. The
   * `callback` is bound to `thisArg` and invoked with three arguments; (value, key, object).
   *
   * @static
   * @memberOf _
   * @category Objects
   * @param {Object} object The source object.
   * @param {Function|String} callback|[prop1, prop2, ...] The properties to pick
   *  or the function called per iteration.
   * @param {Mixed} [thisArg] The `this` binding for the callback.
   * @returns {Object} Returns an object composed of the picked properties.
   * @example
   *
   * _.pick({ 'name': 'moe', 'age': 40, 'userid': 'moe1' }, 'name', 'age');
   * // => { 'name': 'moe', 'age': 40 }
   *
   * _.pick({ 'name': 'moe', '_hint': 'knucklehead', '_seed': '96c4eb' }, function(value, key) {
   *   return key.charAt(0) != '_';
   * });
   * // => { 'name': 'moe' }
   */
  var pick = createIterator(omitIteratorOptions, {
    'top':
      'if (typeof callback != \'function\') {\n' +
      '  var prop,\n' +
      '      props = concat.apply(ArrayProto, arguments),\n' +
      '      length = props.length;\n' +
      '  for (index = 1; index < length; index++) {\n' +
      '    prop = props[index];\n' +
      '    if (prop in object) result[prop] = object[prop]\n' +
      '  }\n' +
      '} else {\n' +
      '  if (thisArg) callback = bindIterator(callback, thisArg)',
    'inLoop':
      'if (callback(value, index, object)) result[index] = value',
    'bottom': '}'
  });

  /**
   * Creates an array composed of the own enumerable property values of `object`.
   *
   * @static
   * @memberOf _
   * @category Objects
   * @param {Object} object The object to inspect.
   * @returns {Array} Returns a new array of property values.
   * @example
   *
   * _.values({ 'one': 1, 'two': 2, 'three': 3 });
   * // => [1, 2, 3]
   */
  var values = createIterator({
    'args': 'object',
    'init': '[]',
    'inLoop': 'result.push(value)'
  });

  /*--------------------------------------------------------------------------*/

  /**
   * Checks if a given `target` element is present in a `collection` using strict
   * equality for comparisons, i.e. `===`.
   *
   * @static
   * @memberOf _
   * @alias include
   * @category Collections
   * @param {Array|Object|String} collection The collection to iterate over.
   * @param {Mixed} target The value to check for.
   * @returns {Boolean} Returns `true` if the `target` element is found, else `false`.
   * @example
   *
   * _.contains([1, 2, 3], 3);
   * // => true
   *
   * _.contains({ 'name': 'moe', 'age': 40 }, 'moe');
   * // => true
   *
   * _.contains('curly', 'ur');
   * // => true
   */
  var contains = createIterator({
    'args': 'collection, target',
    'init': 'false',
    'noCharByIndex': false,
    'beforeLoop': {
      'array': 'if (toString.call(collection) == stringClass) return collection.indexOf(target) > -1'
    },
    'inLoop': 'if (value === target) return true'
  });

  /**
   * Creates an object composed of keys returned from running each element of
   * `collection` through a `callback`. The corresponding value of each key is
   * the number of times the key was returned by `callback`. The `callback` is
   * bound to `thisArg` and invoked with three arguments; (value, index|key, collection).
   * The `callback` argument may also be the name of a property to count by (e.g. 'length').
   *
   * @static
   * @memberOf _
   * @category Collections
   * @param {Array|Object|String} collection The collection to iterate over.
   * @param {Function|String} callback|property The function called per iteration
   *  or property name to count by.
   * @param {Mixed} [thisArg] The `this` binding for the callback.
   * @returns {Object} Returns the composed aggregate object.
   * @example
   *
   * _.countBy([4.3, 6.1, 6.4], function(num) { return Math.floor(num); });
   * // => { '4': 1, '6': 2 }
   *
   * _.countBy([4.3, 6.1, 6.4], function(num) { return this.floor(num); }, Math);
   * // => { '4': 1, '6': 2 }
   *
   * _.countBy(['one', 'two', 'three'], 'length');
   * // => { '3': 2, '5': 1 }
   */
  var countBy = createIterator(baseIteratorOptions, countByIteratorOptions);

  /**
   * Checks if the `callback` returns a truthy value for **all** elements of a
   * `collection`. The `callback` is bound to `thisArg` and invoked with three
   * arguments; (value, index|key, collection).
   *
   * @static
   * @memberOf _
   * @alias all
   * @category Collections
   * @param {Array|Object|String} collection The collection to iterate over.
   * @param {Function} [callback=identity] The function called per iteration.
   * @param {Mixed} [thisArg] The `this` binding for the callback.
   * @returns {Boolean} Returns `true` if all elements pass the callback check,
   *  else `false`.
   * @example
   *
   * _.every([true, 1, null, 'yes'], Boolean);
   * // => false
   */
  var every = createIterator(baseIteratorOptions, everyIteratorOptions);

  /**
   * Examines each element in a `collection`, returning an array of all elements
   * the `callback` returns truthy for. The `callback` is bound to `thisArg` and
   * invoked with three arguments; (value, index|key, collection).
   *
   * @static
   * @memberOf _
   * @alias select
   * @category Collections
   * @param {Array|Object|String} collection The collection to iterate over.
   * @param {Function} [callback=identity] The function called per iteration.
   * @param {Mixed} [thisArg] The `this` binding for the callback.
   * @returns {Array} Returns a new array of elements that passed the callback check.
   * @example
   *
   * var evens = _.filter([1, 2, 3, 4, 5, 6], function(num) { return num % 2 == 0; });
   * // => [2, 4, 6]
   */
  var filter = createIterator(baseIteratorOptions, filterIteratorOptions);

  /**
   * Examines each element in a `collection`, returning the first one the `callback`
   * returns truthy for. The function returns as soon as it finds an acceptable
   * element, and does not iterate over the entire `collection`. The `callback` is
   * bound to `thisArg` and invoked with three arguments; (value, index|key, collection).
   *
   * @static
   * @memberOf _
   * @alias detect
   * @category Collections
   * @param {Array|Object|String} collection The collection to iterate over.
   * @param {Function} callback The function called per iteration.
   * @param {Mixed} [thisArg] The `this` binding for the callback.
   * @returns {Mixed} Returns the element that passed the callback check,
   *  else `undefined`.
   * @example
   *
   * var even = _.find([1, 2, 3, 4, 5, 6], function(num) { return num % 2 == 0; });
   * // => 2
   */
  var find = createIterator(baseIteratorOptions, forEachIteratorOptions, {
    'init': '',
    'inLoop': 'if (callback(value, index, collection)) return value'
  });

  /**
   * Iterates over a `collection`, executing the `callback` for each element in
   * the `collection`. The `callback` is bound to `thisArg` and invoked with three
   * arguments; (value, index|key, collection). Callbacks may exit iteration early
   * by explicitly returning `false`.
   *
   * @static
   * @memberOf _
   * @alias each
   * @category Collections
   * @param {Array|Object|String} collection The collection to iterate over.
   * @param {Function} callback The function called per iteration.
   * @param {Mixed} [thisArg] The `this` binding for the callback.
   * @returns {Array|Object|String} Returns `collection`.
   * @example
   *
   * _([1, 2, 3]).forEach(alert).join(',');
   * // => alerts each number and returns '1,2,3'
   *
   * _.forEach({ 'one': 1, 'two': 2, 'three': 3 }, alert);
   * // => alerts each number (order is not guaranteed)
   */
  var forEach = createIterator(baseIteratorOptions, forEachIteratorOptions);

  /**
   * Creates an object composed of keys returned from running each element of
   * `collection` through a `callback`. The corresponding value of each key is an
   * array of elements passed to `callback` that returned the key. The `callback`
   * is bound to `thisArg` and invoked with three arguments; (value, index|key, collection).
   * The `callback` argument may also be the name of a property to count by (e.g. 'length').
   *
   * @static
   * @memberOf _
   * @category Collections
   * @param {Array|Object|String} collection The collection to iterate over.
   * @param {Function|String} callback|property The function called per iteration
   *  or property name to group by.
   * @param {Mixed} [thisArg] The `this` binding for the callback.
   * @returns {Object} Returns the composed aggregate object.
   * @example
   *
   * _.groupBy([4.2, 6.1, 6.4], function(num) { return Math.floor(num); });
   * // => { '4': [4.2], '6': [6.1, 6.4] }
   *
   * _.groupBy([4.2, 6.1, 6.4], function(num) { return this.floor(num); }, Math);
   * // => { '4': [4.2], '6': [6.1, 6.4] }
   *
   * _.groupBy(['one', 'two', 'three'], 'length');
   * // => { '3': ['one', 'two'], '5': ['three'] }
   */
  var groupBy = createIterator(baseIteratorOptions, countByIteratorOptions, {
    'inLoop':
      'prop = callback(value, index, collection);\n' +
      '(hasOwnProperty.call(result, prop) ? result[prop] : result[prop] = []).push(value)'
  });

  /**
   * Invokes the method named by `methodName` on each element in the `collection`,
   * returning an array of the results of each invoked method. Additional arguments
   * will be passed to each invoked method. If `methodName` is a function it will
   * be invoked for, and `this` bound to, each element in the `collection`.
   *
   * @static
   * @memberOf _
   * @category Collections
   * @param {Array|Object|String} collection The collection to iterate over.
   * @param {Function|String} methodName The name of the method to invoke or
   *  the function invoked per iteration.
   * @param {Mixed} [arg1, arg2, ...] Arguments to invoke the method with.
   * @returns {Array} Returns a new array of the results of each invoked method.
   * @example
   *
   * _.invoke([[5, 1, 7], [3, 2, 1]], 'sort');
   * // => [[1, 5, 7], [1, 2, 3]]
   *
   * _.invoke([123, 456], String.prototype.split, '');
   * // => [['1', '2', '3'], ['4', '5', '6']]
   */
  var invoke = createIterator(mapIteratorOptions, {
    'args': 'collection, methodName',
    'top':
      'var args = slice.call(arguments, 2),\n' +
      '    isFunc = typeof methodName == \'function\'',
    'inLoop': {
      'array':
        'result[index] = (isFunc ? methodName : value[methodName]).apply(value, args)',
      'object':
        'result' + (isKeysFast ? '[ownIndex] = ' : '.push') +
        '((isFunc ? methodName : value[methodName]).apply(value, args))'
    }
  });

  /**
   * Creates an array of values by running each element in the `collection`
   * through a `callback`. The `callback` is bound to `thisArg` and invoked with
   * three arguments; (value, index|key, collection).
   *
   * @static
   * @memberOf _
   * @alias collect
   * @category Collections
   * @param {Array|Object|String} collection The collection to iterate over.
   * @param {Function} [callback=identity] The function called per iteration.
   * @param {Mixed} [thisArg] The `this` binding for the callback.
   * @returns {Array} Returns a new array of the results of each `callback` execution.
   * @example
   *
   * _.map([1, 2, 3], function(num) { return num * 3; });
   * // => [3, 6, 9]
   *
   * _.map({ 'one': 1, 'two': 2, 'three': 3 }, function(num) { return num * 3; });
   * // => [3, 6, 9] (order is not guaranteed)
   */
  var map = createIterator(baseIteratorOptions, mapIteratorOptions);

  /**
   * Retrieves the value of a specified property from all elements in
   * the `collection`.
   *
   * @static
   * @memberOf _
   * @category Collections
   * @param {Array|Object|String} collection The collection to iterate over.
   * @param {String} property The property to pluck.
   * @returns {Array} Returns a new array of property values.
   * @example
   *
   * var stooges = [
   *   { 'name': 'moe', 'age': 40 },
   *   { 'name': 'larry', 'age': 50 },
   *   { 'name': 'curly', 'age': 60 }
   * ];
   *
   * _.pluck(stooges, 'name');
   * // => ['moe', 'larry', 'curly']
   */
  var pluck = createIterator(mapIteratorOptions, {
    'args': 'collection, property',
    'inLoop': {
      'array':  'result[index] = value[property]',
      'object': 'result' + (isKeysFast ? '[ownIndex] = ' : '.push') + '(value[property])'
    }
  });

  /**
   * Boils down a `collection` to a single value. The initial state of the
   * reduction is `accumulator` and each successive step of it should be returned
   * by the `callback`. The `callback` is bound to `thisArg` and invoked with 4
   * arguments; for arrays they are (accumulator, value, index|key, collection).
   *
   * @static
   * @memberOf _
   * @alias foldl, inject
   * @category Collections
   * @param {Array|Object|String} collection The collection to iterate over.
   * @param {Function} callback The function called per iteration.
   * @param {Mixed} [accumulator] Initial value of the accumulator.
   * @param {Mixed} [thisArg] The `this` binding for the callback.
   * @returns {Mixed} Returns the accumulated value.
   * @example
   *
   * var sum = _.reduce([1, 2, 3], function(memo, num) { return memo + num; });
   * // => 6
   */
  var reduce = createIterator({
    'args': 'collection, callback, accumulator, thisArg',
    'init': 'accumulator',
    'top':
      'var noaccum = arguments.length < 3;\n' +
      'if (thisArg) callback = bindIterator(callback, thisArg)',
    'beforeLoop': {
      'array': 'if (noaccum) result = iteratee[++index]'
    },
    'inLoop': {
      'array':
        'result = callback(result, value, index, collection)',
      'object':
        'result = noaccum\n' +
        '  ? (noaccum = false, value)\n' +
        '  : callback(result, value, index, collection)'
    }
  });

  /**
   * The right-associative version of `_.reduce`.
   *
   * @static
   * @memberOf _
   * @alias foldr
   * @category Collections
   * @param {Array|Object|String} collection The collection to iterate over.
   * @param {Function} callback The function called per iteration.
   * @param {Mixed} [accumulator] Initial value of the accumulator.
   * @param {Mixed} [thisArg] The `this` binding for the callback.
   * @returns {Mixed} Returns the accumulated value.
   * @example
   *
   * var list = [[0, 1], [2, 3], [4, 5]];
   * var flat = _.reduceRight(list, function(a, b) { return a.concat(b); }, []);
   * // => [4, 5, 2, 3, 0, 1]
   */
  function reduceRight(collection, callback, accumulator, thisArg) {
    if (!collection) {
      return accumulator;
    }

    var length = collection.length,
        noaccum = arguments.length < 3;

    if(thisArg) {
      callback = bindIterator(callback, thisArg);
    }
    if (length === +length) {
      var iteratee = noCharByIndex && toString.call(collection) == stringClass
        ? collection.split('')
        : collection;

      if (length && noaccum) {
        accumulator = iteratee[--length];
      }
      while (length--) {
        accumulator = callback(accumulator, iteratee[length], length, collection);
      }
      return accumulator;
    }

    var prop,
        props = keys(collection);

    length = props.length;
    if (length && noaccum) {
      accumulator = collection[props[--length]];
    }
    while (length--) {
      prop = props[length];
      accumulator = callback(accumulator, collection[prop], prop, collection);
    }
    return accumulator;
  }

  /**
   * The opposite of `_.filter`, this method returns the values of a
   * `collection` that `callback` does **not** return truthy for.
   *
   * @static
   * @memberOf _
   * @category Collections
   * @param {Array|Object|String} collection The collection to iterate over.
   * @param {Function} [callback=identity] The function called per iteration.
   * @param {Mixed} [thisArg] The `this` binding for the callback.
   * @returns {Array} Returns a new array of elements that did **not** pass the
   *  callback check.
   * @example
   *
   * var odds = _.reject([1, 2, 3, 4, 5, 6], function(num) { return num % 2 == 0; });
   * // => [1, 3, 5]
   */
  var reject = createIterator(baseIteratorOptions, filterIteratorOptions, {
    'inLoop': '!' + filterIteratorOptions.inLoop
  });

  /**
   * Gets the size of the `collection` by returning `collection.length` for arrays
   * and array-like objects or the number of own enumerable properties for objects.
   *
   * @static
   * @memberOf _
   * @category Collections
   * @param {Array|Object|String} collection The collection to inspect.
   * @returns {Number} Returns `collection.length` or number of own enumerable properties.
   * @example
   *
   * _.size([1, 2]);
   * // => 2
   *
   * _.size({ 'one': 1, 'two': 2, 'three': 3 });
   * // => 3
   *
   * _.size('curly');
   * // => 5
   */
  function size(collection) {
    if (!collection) {
      return 0;
    }
    var length = collection.length;
    return length === +length ? length : keys(collection).length;
  }

  /**
   * Checks if the `callback` returns a truthy value for **any** element of a
   * `collection`. The function returns as soon as it finds passing value, and
   * does not iterate over the entire `collection`. The `callback` is bound to
   * `thisArg` and invoked with three arguments; (value, index|key, collection).
   *
   * @static
   * @memberOf _
   * @alias any
   * @category Collections
   * @param {Array|Object|String} collection The collection to iterate over.
   * @param {Function} [callback=identity] The function called per iteration.
   * @param {Mixed} [thisArg] The `this` binding for the callback.
   * @returns {Boolean} Returns `true` if any element passes the callback check,
   *  else `false`.
   * @example
   *
   * _.some([null, 0, 'yes', false]);
   * // => true
   */
  var some = createIterator(baseIteratorOptions, everyIteratorOptions, {
    'init': 'false',
    'inLoop': everyIteratorOptions.inLoop.replace('!', '')
  });

  /**
   * Creates an array, stable sorted in ascending order by the results of
   * running each element of `collection` through a `callback`. The `callback`
   * is bound to `thisArg` and invoked with three arguments; (value, index|key, collection).
   * The `callback` argument may also be the name of a property to sort by (e.g. 'length').
   *
   * @static
   * @memberOf _
   * @category Collections
   * @param {Array|Object|String} collection The collection to iterate over.
   * @param {Function|String} callback|property The function called per iteration
   *  or property name to sort by.
   * @param {Mixed} [thisArg] The `this` binding for the callback.
   * @returns {Array} Returns a new array of sorted elements.
   * @example
   *
   * _.sortBy([1, 2, 3], function(num) { return Math.sin(num); });
   * // => [3, 1, 2]
   *
   * _.sortBy([1, 2, 3], function(num) { return this.sin(num); }, Math);
   * // => [3, 1, 2]
   *
   * _.sortBy(['larry', 'brendan', 'moe'], 'length');
   * // => ['moe', 'larry', 'brendan']
   */
  var sortBy = createIterator(baseIteratorOptions, countByIteratorOptions, mapIteratorOptions, {
    'inLoop': {
      'array':
        'result[index] = {\n' +
        '  criteria: callback(value, index, collection),\n' +
        '  index: index,\n' +
        '  value: value\n' +
        '}',
      'object':
        'result' + (isKeysFast ? '[ownIndex] = ' : '.push') + '({\n' +
        '  criteria: callback(value, index, collection),\n' +
        '  index: index,\n' +
        '  value: value\n' +
        '})'
    },
    'bottom':
      'result.sort(compareAscending);\n' +
      'length = result.length;\n' +
      'while (length--) {\n' +
      '  result[length] = result[length].value\n' +
      '}'
  });

  /**
   * Converts the `collection`, to an array.
   *
   * @static
   * @memberOf _
   * @category Collections
   * @param {Array|Object|String} collection The collection to convert.
   * @returns {Array} Returns the new converted array.
   * @example
   *
   * (function() { return _.toArray(arguments).slice(1); })(1, 2, 3, 4);
   * // => [2, 3, 4]
   */
  function toArray(collection) {
    if (!collection) {
      return [];
    }
    var length = collection.length;
    if (length === +length) {
      return (noArraySliceOnStrings ? toString.call(collection) == stringClass : typeof collection == 'string')
        ? collection.split('')
        : slice.call(collection);
    }
    return values(collection);
  }

  /**
   * Examines each element in a `collection`, returning an array of all elements
   * that contain the given `properties`.
   *
   * @static
   * @memberOf _
   * @category Collections
   * @param {Array|Object|String} collection The collection to iterate over.
   * @param {Object} properties The object of properties/values to filter by.
   * @returns {Array} Returns a new array of elements that contain the given `properties`.
   * @example
   *
   * var stooges = [
   *   { 'name': 'moe', 'age': 40 },
   *   { 'name': 'larry', 'age': 50 },
   *   { 'name': 'curly', 'age': 60 }
   * ];
   *
   * _.where(stooges, { 'age': 40 });
   * // => [{ 'name': 'moe', 'age': 40 }]
   */
  var where = createIterator(filterIteratorOptions, {
    'args': 'collection, properties',
    'top':
      'var props = [];\n' +
      'forIn(properties, function(value, prop) { props.push(prop) });\n' +
      'var propsLength = props.length',
    'inLoop':
      'for (var prop, pass = true, propIndex = 0; propIndex < propsLength; propIndex++) {\n' +
      '  prop = props[propIndex];\n' +
      '  if (!(pass = value[prop] === properties[prop])) break\n' +
      '}\n' +
      'pass && result.push(value)'
  });

  /*--------------------------------------------------------------------------*/

  /**
   * Creates an array with all falsey values of `array` removed. The values
   * `false`, `null`, `0`, `""`, `undefined` and `NaN` are all falsey.
   *
   * @static
   * @memberOf _
   * @category Arrays
   * @param {Array} array The array to compact.
   * @returns {Array} Returns a new filtered array.
   * @example
   *
   * _.compact([0, 1, false, 2, '', 3]);
   * // => [1, 2, 3]
   */
  function compact(array) {
    var result = [];
    if (!array) {
      return result;
    }
    var index = -1,
        length = array.length;

    while (++index < length) {
      if (array[index]) {
        result.push(array[index]);
      }
    }
    return result;
  }

  /**
   * Creates an array of `array` elements not present in the other arrays
   * using strict equality for comparisons, i.e. `===`.
   *
   * @static
   * @memberOf _
   * @category Arrays
   * @param {Array} array The array to process.
   * @param {Array} [array1, array2, ...] Arrays to check.
   * @returns {Array} Returns a new array of `array` elements not present in the
   *  other arrays.
   * @example
   *
   * _.difference([1, 2, 3, 4, 5], [5, 2, 10]);
   * // => [1, 3, 4]
   */
  function difference(array) {
    var result = [];
    if (!array) {
      return result;
    }
    var index = -1,
        length = array.length,
        flattened = concat.apply(result, arguments),
        contains = cachedContains(flattened, length);

    while (++index < length) {
      if (!contains(array[index])) {
        result.push(array[index]);
      }
    }
    return result;
  }

  /**
   * Gets the first element of the `array`. Pass `n` to return the first `n`
   * elements of the `array`.
   *
   * @static
   * @memberOf _
   * @alias head, take
   * @category Arrays
   * @param {Array} array The array to query.
   * @param {Number} [n] The number of elements to return.
   * @param {Object} [guard] Internally used to allow this method to work with
   *  others like `_.map` without using their callback `index` argument for `n`.
   * @returns {Mixed} Returns the first element or an array of the first `n`
   *  elements of `array`.
   * @example
   *
   * _.first([5, 4, 3, 2, 1]);
   * // => 5
   */
  function first(array, n, guard) {
    if (array) {
      return (n == null || guard) ? array[0] : slice.call(array, 0, n);
    }
  }

  /**
   * Flattens a nested array (the nesting can be to any depth). If `shallow` is
   * truthy, `array` will only be flattened a single level.
   *
   * @static
   * @memberOf _
   * @category Arrays
   * @param {Array} array The array to compact.
   * @param {Boolean} shallow A flag to indicate only flattening a single level.
   * @returns {Array} Returns a new flattened array.
   * @example
   *
   * _.flatten([1, [2], [3, [[4]]]]);
   * // => [1, 2, 3, 4];
   *
   * _.flatten([1, [2], [3, [[4]]]], true);
   * // => [1, 2, 3, [[4]]];
   */
  function flatten(array, shallow) {
    var result = [];
    if (!array) {
      return result;
    }
    var value,
        index = -1,
        length = array.length;

    while (++index < length) {
      value = array[index];

      // recursively flatten arrays (susceptible to call stack limits)
      if (isArray(value)) {
        push.apply(result, shallow ? value : flatten(value));
      } else {
        result.push(value);
      }
    }
    return result;
  }

  /**
   * Gets the index at which the first occurrence of `value` is found using
   * strict equality for comparisons, i.e. `===`. If the `array` is already
   * sorted, passing `true` for `isSorted` will run a faster binary search.
   *
   * @static
   * @memberOf _
   * @category Arrays
   * @param {Array} array The array to search.
   * @param {Mixed} value The value to search for.
   * @param {Boolean|Number} [fromIndex=0] The index to start searching from or
   *  `true` to perform a binary search on a sorted `array`.
   * @returns {Number} Returns the index of the matched value or `-1`.
   * @example
   *
   * _.indexOf([1, 2, 3, 1, 2, 3], 2);
   * // => 1
   *
   * _.indexOf([1, 2, 3, 1, 2, 3], 2, 3);
   * // => 4
   *
   * _.indexOf([1, 1, 2, 2, 3, 3], 2, true);
   * // => 2
   */
  function indexOf(array, value, fromIndex) {
    if (!array) {
      return -1;
    }
    var index = -1,
        length = array.length;

    if (fromIndex) {
      if (typeof fromIndex == 'number') {
        index = (fromIndex < 0 ? nativeMax(0, length + fromIndex) : fromIndex) - 1;
      } else {
        index = sortedIndex(array, value);
        return array[index] === value ? index : -1;
      }
    }
    while (++index < length) {
      if (array[index] === value) {
        return index;
      }
    }
    return -1;
  }

  /**
   * Gets all but the last element of `array`. Pass `n` to exclude the last `n`
   * elements from the result.
   *
   * @static
   * @memberOf _
   * @category Arrays
   * @param {Array} array The array to query.
   * @param {Number} [n] The number of elements to return.
   * @param {Object} [guard] Internally used to allow this method to work with
   *  others like `_.map` without using their callback `index` argument for `n`.
   * @returns {Array} Returns all but the last element or `n` elements of `array`.
   * @example
   *
   * _.initial([3, 2, 1]);
   * // => [3, 2]
   */
  function initial(array, n, guard) {
    if (!array) {
      return [];
    }
    return slice.call(array, 0, -((n == null || guard) ? 1 : n));
  }

  /**
   * Computes the intersection of all the passed-in arrays using strict equality
   * for comparisons, i.e. `===`.
   *
   * @static
   * @memberOf _
   * @category Arrays
   * @param {Array} [array1, array2, ...] Arrays to process.
   * @returns {Array} Returns a new array of unique elements, in order, that are
   *  present in **all** of the arrays.
   * @example
   *
   * _.intersection([1, 2, 3], [101, 2, 1, 10], [2, 1]);
   * // => [1, 2]
   */
  function intersection(array) {
    var result = [];
    if (!array) {
      return result;
    }
    var value,
        argsLength = arguments.length,
        cache = [],
        index = -1,
        length = array.length;

    array: while (++index < length) {
      value = array[index];
      if (indexOf(result, value) < 0) {
        for (var argsIndex = 1; argsIndex < argsLength; argsIndex++) {
          if (!(cache[argsIndex] || (cache[argsIndex] = cachedContains(arguments[argsIndex])))(value)) {
            continue array;
          }
        }
        result.push(value);
      }
    }
    return result;
  }

  /**
   * Gets the last element of the `array`. Pass `n` to return the lasy `n`
   * elementsvof the `array`.
   *
   * @static
   * @memberOf _
   * @category Arrays
   * @param {Array} array The array to query.
   * @param {Number} [n] The number of elements to return.
   * @param {Object} [guard] Internally used to allow this method to work with
   *  others like `_.map` without using their callback `index` argument for `n`.
   * @returns {Mixed} Returns the last element or an array of the last `n`
   *  elements of `array`.
   * @example
   *
   * _.last([3, 2, 1]);
   * // => 1
   */
  function last(array, n, guard) {
    if (array) {
      var length = array.length;
      return (n == null || guard) ? array[length - 1] : slice.call(array, -n || length);
    }
  }

  /**
   * Gets the index at which the last occurrence of `value` is found using
   * strict equality for comparisons, i.e. `===`.
   *
   * @static
   * @memberOf _
   * @category Arrays
   * @param {Array} array The array to search.
   * @param {Mixed} value The value to search for.
   * @param {Number} [fromIndex=array.length-1] The index to start searching from.
   * @returns {Number} Returns the index of the matched value or `-1`.
   * @example
   *
   * _.lastIndexOf([1, 2, 3, 1, 2, 3], 2);
   * // => 4
   *
   * _.lastIndexOf([1, 2, 3, 1, 2, 3], 2, 3);
   * // => 1
   */
  function lastIndexOf(array, value, fromIndex) {
    if (!array) {
      return -1;
    }
    var index = array.length;
    if (fromIndex && typeof fromIndex == 'number') {
      index = (fromIndex < 0 ? nativeMax(0, index + fromIndex) : nativeMin(fromIndex, index - 1)) + 1;
    }
    while (index--) {
      if (array[index] === value) {
        return index;
      }
    }
    return -1;
  }

  /**
   * Retrieves the maximum value of an `array`. If `callback` is passed,
   * it will be executed for each value in the `array` to generate the
   * criterion by which the value is ranked. The `callback` is bound to
   * `thisArg` and invoked with three arguments; (value, index, array).
   *
   * @static
   * @memberOf _
   * @category Arrays
   * @param {Array} array The array to iterate over.
   * @param {Function} [callback] The function called per iteration.
   * @param {Mixed} [thisArg] The `this` binding for the callback.
   * @returns {Mixed} Returns the maximum value.
   * @example
   *
   * var stooges = [
   *   { 'name': 'moe', 'age': 40 },
   *   { 'name': 'larry', 'age': 50 },
   *   { 'name': 'curly', 'age': 60 }
   * ];
   *
   * _.max(stooges, function(stooge) { return stooge.age; });
   * // => { 'name': 'curly', 'age': 60 };
   */
  function max(array, callback, thisArg) {
    var computed = -Infinity,
        result = computed;

    if (!array) {
      return result;
    }
    var current,
        index = -1,
        length = array.length;

    if (!callback) {
      while (++index < length) {
        if (array[index] > result) {
          result = array[index];
        }
      }
      return result;
    }
    if (thisArg) {
      callback = bindIterator(callback, thisArg);
    }
    while (++index < length) {
      current = callback(array[index], index, array);
      if (current > computed) {
        computed = current;
        result = array[index];
      }
    }
    return result;
  }

  /**
   * Retrieves the minimum value of an `array`. If `callback` is passed,
   * it will be executed for each value in the `array` to generate the
   * criterion by which the value is ranked. The `callback` is bound to `thisArg`
   * and invoked with three arguments; (value, index, array).
   *
   * @static
   * @memberOf _
   * @category Arrays
   * @param {Array} array The array to iterate over.
   * @param {Function} [callback] The function called per iteration.
   * @param {Mixed} [thisArg] The `this` binding for the callback.
   * @returns {Mixed} Returns the minimum value.
   * @example
   *
   * _.min([10, 5, 100, 2, 1000]);
   * // => 2
   */
  function min(array, callback, thisArg) {
    var computed = Infinity,
        result = computed;

    if (!array) {
      return result;
    }
    var current,
        index = -1,
        length = array.length;

    if (!callback) {
      while (++index < length) {
        if (array[index] < result) {
          result = array[index];
        }
      }
      return result;
    }
    if (thisArg) {
      callback = bindIterator(callback, thisArg);
    }
    while (++index < length) {
      current = callback(array[index], index, array);
      if (current < computed) {
        computed = current;
        result = array[index];
      }
    }
    return result;
  }

  /**
   * Creates an object composed from arrays of `keys` and `values`. Pass either
   * a single two dimensional array, i.e. `[[key1, value1], [key2, value2]]`, or
   * two arrays, one of `keys` and one of corresponding `values`.
   *
   * @static
   * @memberOf _
   * @category Arrays
   * @param {Array} keys The array of keys.
   * @param {Array} [values=[]] The array of values.
   * @returns {Object} Returns an object composed of the given keys and
   *  corresponding values.
   * @example
   *
   * _.object(['moe', 'larry', 'curly'], [30, 40, 50]);
   * // => { 'moe': 30, 'larry': 40, 'curly': 50 }
   */
  function object(keys, values) {
    if (!keys) {
      return {};
    }
    var index = -1,
        length = keys.length,
        result = {};

    while (++index < length) {
      if (values) {
        result[keys[index]] = values[index];
      } else {
        result[keys[index][0]] = keys[index][1];
      }
    }
    return result;
  }

  /**
   * Creates an array of numbers (positive and/or negative) progressing from
   * `start` up to but not including `stop`. This method is a port of Python's
   * `range()` function. See http://docs.python.org/library/functions.html#range.
   *
   * @static
   * @memberOf _
   * @category Arrays
   * @param {Number} [start=0] The start of the range.
   * @param {Number} end The end of the range.
   * @param {Number} [step=1] The value to increment or descrement by.
   * @returns {Array} Returns a new range array.
   * @example
   *
   * _.range(10);
   * // => [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
   *
   * _.range(1, 11);
   * // => [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
   *
   * _.range(0, 30, 5);
   * // => [0, 5, 10, 15, 20, 25]
   *
   * _.range(0, -10, -1);
   * // => [0, -1, -2, -3, -4, -5, -6, -7, -8, -9]
   *
   * _.range(0);
   * // => []
   */
  function range(start, end, step) {
    start = +start || 0;
    step = +step || 1;

    if (end == null) {
      end = start;
      start = 0;
    }
    // use `Array(length)` so V8 will avoid the slower "dictionary" mode
    // http://www.youtube.com/watch?v=XAqIpGU8ZZk#t=16m27s
    var index = -1,
        length = nativeMax(0, Math.ceil((end - start) / step)),
        result = Array(length);

    while (++index < length) {
      result[index] = start;
      start += step;
    }
    return result;
  }

  /**
   * The opposite of `_.initial`, this method gets all but the first value of
   * `array`. Pass `n` to exclude the first `n` values from the result.
   *
   * @static
   * @memberOf _
   * @alias drop, tail
   * @category Arrays
   * @param {Array} array The array to query.
   * @param {Number} [n] The number of elements to return.
   * @param {Object} [guard] Internally used to allow this method to work with
   *  others like `_.map` without using their callback `index` argument for `n`.
   * @returns {Array} Returns all but the first value or `n` values of `array`.
   * @example
   *
   * _.rest([3, 2, 1]);
   * // => [2, 1]
   */
  function rest(array, n, guard) {
    if (!array) {
      return [];
    }
    return slice.call(array, (n == null || guard) ? 1 : n);
  }

  /**
   * Creates an array of shuffled `array` values, using a version of the
   * Fisher-Yates shuffle. See http://en.wikipedia.org/wiki/Fisher-Yates_shuffle.
   *
   * @static
   * @memberOf _
   * @category Arrays
   * @param {Array} array The array to shuffle.
   * @returns {Array} Returns a new shuffled array.
   * @example
   *
   * _.shuffle([1, 2, 3, 4, 5, 6]);
   * // => [4, 1, 6, 3, 5, 2]
   */
  function shuffle(array) {
    if (!array) {
      return [];
    }
    var rand,
        index = -1,
        length = array.length,
        result = Array(length);

    while (++index < length) {
      rand = nativeFloor(nativeRandom() * (index + 1));
      result[index] = result[rand];
      result[rand] = array[index];
    }
    return result;
  }

  /**
   * Uses a binary search to determine the smallest index at which the `value`
   * should be inserted into `array` in order to maintain the sort order of the
   * sorted `array`. If `callback` is passed, it will be executed for `value` and
   * each element in `array` to compute their sort ranking. The `callback` is
   * bound to `thisArg` and invoked with one argument; (value).
   *
   * @static
   * @memberOf _
   * @category Arrays
   * @param {Array} array The array to iterate over.
   * @param {Mixed} value The value to evaluate.
   * @param {Function} [callback=identity] The function called per iteration.
   * @param {Mixed} [thisArg] The `this` binding for the callback.
   * @returns {Number} Returns the index at which the value should be inserted
   *  into `array`.
   * @example
   *
   * _.sortedIndex([20, 30, 40], 35);
   * // => 2
   *
   * var dict = {
   *   'wordToNumber': { 'twenty': 20, 'thirty': 30, 'thirty-five': 35, 'fourty': 40 }
   * };
   *
   * _.sortedIndex(['twenty', 'thirty', 'fourty'], 'thirty-five', function(word) {
   *   return dict.wordToNumber[word];
   * });
   * // => 2
   *
   * _.sortedIndex(['twenty', 'thirty', 'fourty'], 'thirty-five', function(word) {
   *   return this.wordToNumber[word];
   * }, dict);
   * // => 2
   */
  function sortedIndex(array, value, callback, thisArg) {
    if (!array) {
      return 0;
    }
    var mid,
        low = 0,
        high = array.length;

    if (callback) {
      if (thisArg) {
        callback = bind(callback, thisArg);
      }
      value = callback(value);
      while (low < high) {
        mid = (low + high) >>> 1;
        callback(array[mid]) < value ? low = mid + 1 : high = mid;
      }
    } else {
      while (low < high) {
        mid = (low + high) >>> 1;
        array[mid] < value ? low = mid + 1 : high = mid;
      }
    }
    return low;
  }

  /**
   * Computes the union of the passed-in arrays using strict equality for
   * comparisons, i.e. `===`.
   *
   * @static
   * @memberOf _
   * @category Arrays
   * @param {Array} [array1, array2, ...] Arrays to process.
   * @returns {Array} Returns a new array of unique values, in order, that are
   *  present in one or more of the arrays.
   * @example
   *
   * _.union([1, 2, 3], [101, 2, 1, 10], [2, 1]);
   * // => [1, 2, 3, 101, 10]
   */
  function union() {
    var index = -1,
        result = [],
        flattened = concat.apply(result, arguments),
        length = flattened.length;

    while (++index < length) {
      if (indexOf(result, flattened[index]) < 0) {
        result.push(flattened[index]);
      }
    }
    return result;
  }

  /**
   * Creates a duplicate-value-free version of the `array` using strict equality
   * for comparisons, i.e. `===`. If the `array` is already sorted, passing `true`
   * for `isSorted` will run a faster algorithm. If `callback` is passed, each
   * element of `array` is passed through a callback` before uniqueness is computed.
   * The `callback` is bound to `thisArg` and invoked with three arguments; (value, index, array).
   *
   * @static
   * @memberOf _
   * @alias unique
   * @category Arrays
   * @param {Array} array The array to process.
   * @param {Boolean} [isSorted=false] A flag to indicate that the `array` is already sorted.
   * @param {Function} [callback=identity] The function called per iteration.
   * @param {Mixed} [thisArg] The `this` binding for the callback.
   * @returns {Array} Returns a duplicate-value-free array.
   * @example
   *
   * _.uniq([1, 2, 1, 3, 1]);
   * // => [1, 2, 3]
   *
   * _.uniq([1, 1, 2, 2, 3], true);
   * // => [1, 2, 3]
   *
   * _.uniq([1, 2, 1.5, 3, 2.5], function(num) { return Math.floor(num); });
   * // => [1, 2, 3]
   *
   * _.uniq([1, 2, 1.5, 3, 2.5], function(num) { return this.floor(num); }, Math);
   * // => [1, 2, 3]
   */
  function uniq(array, isSorted, callback, thisArg) {
    var result = [];
    if (!array) {
      return result;
    }
    var computed,
        index = -1,
        length = array.length,
        seen = [];

    // juggle arguments
    if (typeof isSorted == 'function') {
      thisArg = callback;
      callback = isSorted;
      isSorted = false;
    }
    if (!callback) {
      callback = identity;
    } else if (thisArg) {
      callback = bindIterator(callback, thisArg);
    }
    while (++index < length) {
      computed = callback(array[index], index, array);
      if (isSorted
            ? !index || seen[seen.length - 1] !== computed
            : indexOf(seen, computed) < 0
          ) {
        seen.push(computed);
        result.push(array[index]);
      }
    }
    return result;
  }

  /**
   * Creates an array with all occurrences of the passed values removed using
   * strict equality for comparisons, i.e. `===`.
   *
   * @static
   * @memberOf _
   * @category Arrays
   * @param {Array} array The array to filter.
   * @param {Mixed} [value1, value2, ...] Values to remove.
   * @returns {Array} Returns a new filtered array.
   * @example
   *
   * _.without([1, 2, 1, 0, 3, 1, 4], 0, 1);
   * // => [2, 3, 4]
   */
  function without(array) {
    var result = [];
    if (!array) {
      return result;
    }
    var index = -1,
        length = array.length,
        contains = cachedContains(arguments, 1, 20);

    while (++index < length) {
      if (!contains(array[index])) {
        result.push(array[index]);
      }
    }
    return result;
  }

  /**
   * Groups the elements of each array at their corresponding indexes. Useful for
   * separate data sources that are coordinated through matching array indexes.
   * For a matrix of nested arrays, `_.zip.apply(...)` can transpose the matrix
   * in a similar fashion.
   *
   * @static
   * @memberOf _
   * @category Arrays
   * @param {Array} [array1, array2, ...] Arrays to process.
   * @returns {Array} Returns a new array of grouped elements.
   * @example
   *
   * _.zip(['moe', 'larry', 'curly'], [30, 40, 50], [true, false, false]);
   * // => [['moe', 30, true], ['larry', 40, false], ['curly', 50, false]]
   */
  function zip(array) {
    if (!array) {
      return [];
    }
    var index = -1,
        length = max(pluck(arguments, 'length')),
        result = Array(length);

    while (++index < length) {
      result[index] = pluck(arguments, index);
    }
    return result;
  }

  /*--------------------------------------------------------------------------*/

  /**
   * Creates a function that is restricted to executing only after it is
   * called `n` times.
   *
   * @static
   * @memberOf _
   * @category Functions
   * @param {Number} n The number of times the function must be called before
   * it is executed.
   * @param {Function} func The function to restrict.
   * @returns {Function} Returns the new restricted function.
   * @example
   *
   * var renderNotes = _.after(notes.length, render);
   * _.forEach(notes, function(note) {
   *   note.asyncSave({ 'success': renderNotes });
   * });
   * // `renderNotes` is run once, after all notes have saved
   */
  function after(n, func) {
    if (n < 1) {
      return func();
    }
    return function() {
      if (--n < 1) {
        return func.apply(this, arguments);
      }
    };
  }

  /**
   * Creates a function that, when called, invokes `func` with the `this`
   * binding of `thisArg` and prepends any additional `bind` arguments to those
   * passed to the bound function.
   *
   * @static
   * @memberOf _
   * @category Functions
   * @param {Function} func The function to bind.
   * @param {Mixed} [thisArg] The `this` binding of `func`.
   * @param {Mixed} [arg1, arg2, ...] Arguments to be partially applied.
   * @returns {Function} Returns the new bound function.
   * @example
   *
   * var func = function(greeting) {
   *   return greeting + ' ' + this.name;
   * };
   *
   * func = _.bind(func, { 'name': 'moe' }, 'hi');
   * func();
   * // => 'hi moe'
   */
  function bind(func, thisArg) {
    // use `Function#bind` if it exists and is fast
    // (in V8 `Function#bind` is slower except when partially applied)
    return isBindFast || (nativeBind && arguments.length > 2)
      ? nativeBind.call.apply(nativeBind, arguments)
      : createBound(func, thisArg, slice.call(arguments, 2));
  }

  /**
   * Binds methods on `object` to `object`, overwriting the existing method.
   * If no method names are provided, all the function properties of `object`
   * will be bound.
   *
   * @static
   * @memberOf _
   * @category Functions
   * @param {Object} object The object to bind and assign the bound methods to.
   * @param {String} [methodName1, methodName2, ...] Method names on the object to bind.
   * @returns {Object} Returns `object`.
   * @example
   *
   * var buttonView = {
   *  'label': 'lodash',
   *  'onClick': function() { alert('clicked: ' + this.label); }
   * };
   *
   * _.bindAll(buttonView);
   * jQuery('#lodash_button').on('click', buttonView.onClick);
   * // => When the button is clicked, `this.label` will have the correct value
   */
  var bindAll = createIterator({
    'useHas': false,
    'useStrict': false,
    'args': 'object',
    'init': 'object',
    'top':
      'var funcs = arguments,\n' +
      '    length = funcs.length;\n' +
      'if (length > 1) {\n' +
      '  for (var index = 1; index < length; index++) {\n' +
      '    result[funcs[index]] = bind(result[funcs[index]], result)\n' +
      '  }\n' +
      '  return result\n' +
      '}',
    'inLoop':
      'if (isFunction(result[index])) {\n' +
      '  result[index] = bind(result[index], result)\n' +
      '}'
  });

  /**
   * Creates a function that is the composition of the passed functions,
   * where each function consumes the return value of the function that follows.
   * In math terms, composing the functions `f()`, `g()`, and `h()` produces `f(g(h()))`.
   *
   * @static
   * @memberOf _
   * @category Functions
   * @param {Function} [func1, func2, ...] Functions to compose.
   * @returns {Function} Returns the new composed function.
   * @example
   *
   * var greet = function(name) { return 'hi: ' + name; };
   * var exclaim = function(statement) { return statement + '!'; };
   * var welcome = _.compose(exclaim, greet);
   * welcome('moe');
   * // => 'hi: moe!'
   */
  function compose() {
    var funcs = arguments;
    return function() {
      var args = arguments,
          length = funcs.length;

      while (length--) {
        args = [funcs[length].apply(this, args)];
      }
      return args[0];
    };
  }

  /**
   * Creates a function that will delay the execution of `func` until after
   * `wait` milliseconds have elapsed since the last time it was invoked. Pass
   * `true` for `immediate` to cause debounce to invoke `func` on the leading,
   * instead of the trailing, edge of the `wait` timeout. Subsequent calls to
   * the debounced function will return the result of the last `func` call.
   *
   * @static
   * @memberOf _
   * @category Functions
   * @param {Function} func The function to debounce.
   * @param {Number} wait The number of milliseconds to delay.
   * @param {Boolean} immediate A flag to indicate execution is on the leading
   *  edge of the timeout.
   * @returns {Function} Returns the new debounced function.
   * @example
   *
   * var lazyLayout = _.debounce(calculateLayout, 300);
   * jQuery(window).on('resize', lazyLayout);
   */
  function debounce(func, wait, immediate) {
    var args,
        result,
        thisArg,
        timeoutId;

    function delayed() {
      timeoutId = null;
      if (!immediate) {
        result = func.apply(thisArg, args);
      }
    }

    return function() {
      var isImmediate = immediate && !timeoutId;
      args = arguments;
      thisArg = this;

      clearTimeout(timeoutId);
      timeoutId = setTimeout(delayed, wait);

      if (isImmediate) {
        result = func.apply(thisArg, args);
      }
      return result;
    };
  }

  /**
   * Executes the `func` function after `wait` milliseconds. Additional arguments
   * will be passed to `func` when it is invoked.
   *
   * @static
   * @memberOf _
   * @category Functions
   * @param {Function} func The function to delay.
   * @param {Number} wait The number of milliseconds to delay execution.
   * @param {Mixed} [arg1, arg2, ...] Arguments to invoke the function with.
   * @returns {Number} Returns the `setTimeout` timeout id.
   * @example
   *
   * var log = _.bind(console.log, console);
   * _.delay(log, 1000, 'logged later');
   * // => 'logged later' (Appears after one second.)
   */
  function delay(func, wait) {
    var args = slice.call(arguments, 2);
    return setTimeout(function() { return func.apply(undefined, args); }, wait);
  }

  /**
   * Defers executing the `func` function until the current call stack has cleared.
   * Additional arguments will be passed to `func` when it is invoked.
   *
   * @static
   * @memberOf _
   * @category Functions
   * @param {Function} func The function to defer.
   * @param {Mixed} [arg1, arg2, ...] Arguments to invoke the function with.
   * @returns {Number} Returns the `setTimeout` timeout id.
   * @example
   *
   * _.defer(function() { alert('deferred'); });
   * // returns from the function before `alert` is called
   */
  function defer(func) {
    var args = slice.call(arguments, 1);
    return setTimeout(function() { return func.apply(undefined, args); }, 1);
  }

  /**
   * Creates a function that, when called, invokes `object[methodName]` and
   * prepends any additional `lateBind` arguments to those passed to the bound
   * function. This method
   *
   * @static
   * @memberOf _
   * @category Functions
   * @param {Object} object The object the method belongs to.
   * @param {String} methodName The method name.
   * @param {Mixed} [arg1, arg2, ...] Arguments to be partially applied.
   * @returns {Function} Returns the new bound function.
   * @example
   *
   * var object = {
   *   'name': 'moe',
   *   'greet': function(greeting) {
   *     return greeting + ' ' + this.name;
   *   }
   * };
   *
   * var func = _.bind(object, 'greet', 'hi');
   * func();
   * // => 'hi moe'
   *
   * object.greet = function(greeting) {
   *   return greeting + ', ' + this.name + '!';
   * };
   *
   * func();
   * // => 'hi, moe!'
   */
  function lateBind(object, methodName) {
    return createBound(methodName, object, slice.call(arguments, 2));
  }

  /**
   * Creates a function that memoizes the result of `func`. If `resolver` is
   * passed, it will be used to determine the cache key for storing the result
   * based on the arguments passed to the memoized function. By default, the first
   * argument passed to the memoized function is used as the cache key.
   *
   * @static
   * @memberOf _
   * @category Functions
   * @param {Function} func The function to have its output memoized.
   * @param {Function} [resolver] A function used to resolve the cache key.
   * @returns {Function} Returns the new memoizing function.
   * @example
   *
   * var fibonacci = _.memoize(function(n) {
   *   return n < 2 ? n : fibonacci(n - 1) + fibonacci(n - 2);
   * });
   */
  function memoize(func, resolver) {
    var cache = {};
    return function() {
      var prop = resolver ? resolver.apply(this, arguments) : arguments[0];
      return hasOwnProperty.call(cache, prop)
        ? cache[prop]
        : (cache[prop] = func.apply(this, arguments));
    };
  }

  /**
   * Creates a function that is restricted to one execution. Repeat calls to
   * the function will return the value of the first call.
   *
   * @static
   * @memberOf _
   * @category Functions
   * @param {Function} func The function to restrict.
   * @returns {Function} Returns the new restricted function.
   * @example
   *
   * var initialize = _.once(createApplication);
   * initialize();
   * initialize();
   * // Application is only created once.
   */
  function once(func) {
    var result,
        ran = false;

    return function() {
      if (ran) {
        return result;
      }
      ran = true;
      result = func.apply(this, arguments);

      // clear the `func` variable so the function may be garbage collected
      func = null;
      return result;
    };
  }

  /**
   * Creates a function that, when called, invokes `func` with any additional
   * `partial` arguments prepended to those passed to the new function. This method
   * is similar to `bind`, except it does **not** alter the `this` binding.
   *
   * @static
   * @memberOf _
   * @category Functions
   * @param {Function} func The function to partially apply arguments to.
   * @param {Mixed} [arg1, arg2, ...] Arguments to be partially applied.
   * @returns {Function} Returns the new partially applied function.
   * @example
   *
   * var greet = function(greeting, name) { return greeting + ': ' + name; };
   * var hi = _.partial(greet, 'hi');
   * hi('moe');
   * // => 'hi: moe'
   */
  function partial(func) {
    return createBound(func, slice.call(arguments, 1));
  }

  /**
   * Creates a function that, when executed, will only call the `func`
   * function at most once per every `wait` milliseconds. If the throttled
   * function is invoked more than once during the `wait` timeout, `func` will
   * also be called on the trailing edge of the timeout. Subsequent calls to the
   * throttled function will return the result of the last `func` call.
   *
   * @static
   * @memberOf _
   * @category Functions
   * @param {Function} func The function to throttle.
   * @param {Number} wait The number of milliseconds to throttle executions to.
   * @returns {Function} Returns the new throttled function.
   * @example
   *
   * var throttled = _.throttle(updatePosition, 100);
   * jQuery(window).on('scroll', throttled);
   */
  function throttle(func, wait) {
    var args,
        result,
        thisArg,
        timeoutId,
        lastCalled = 0;

    function trailingCall() {
      lastCalled = new Date;
      timeoutId = null;
      result = func.apply(thisArg, args);
    }

    return function() {
      var now = new Date,
          remain = wait - (now - lastCalled);

      args = arguments;
      thisArg = this;

      if (remain <= 0) {
        lastCalled = now;
        result = func.apply(thisArg, args);
      }
      else if (!timeoutId) {
        timeoutId = setTimeout(trailingCall, remain);
      }
      return result;
    };
  }

  /**
   * Creates a function that passes `value` to the `wrapper` function as its
   * first argument. Additional arguments passed to the new function are appended
   * to those passed to the `wrapper` function.
   *
   * @static
   * @memberOf _
   * @category Functions
   * @param {Mixed} value The value to wrap.
   * @param {Function} wrapper The wrapper function.
   * @returns {Function} Returns the new function.
   * @example
   *
   * var hello = function(name) { return 'hello: ' + name; };
   * hello = _.wrap(hello, function(func) {
   *   return 'before, ' + func('moe') + ', after';
   * });
   * hello();
   * // => 'before, hello: moe, after'
   */
  function wrap(value, wrapper) {
    return function() {
      var args = [value];
      if (arguments.length) {
        push.apply(args, arguments);
      }
      return wrapper.apply(this, args);
    };
  }

  /*--------------------------------------------------------------------------*/

  /**
   * Converts the characters `&`, `<`, `>`, `"`, and `'` in `string` to their
   * corresponding HTML entities.
   *
   * @static
   * @memberOf _
   * @category Utilities
   * @param {String} string The string to escape.
   * @returns {String} Returns the escaped string.
   * @example
   *
   * _.escape('Moe, Larry & Curly');
   * // => "Moe, Larry &amp; Curly"
   */
  function escape(string) {
    return string == null ? '' : (string + '').replace(reUnescapedHtml, escapeHtmlChar);
  }

  /**
   * This function returns the first argument passed to it.
   *
   * Note: It is used throughout Lo-Dash as a default callback.
   *
   * @static
   * @memberOf _
   * @category Utilities
   * @param {Mixed} value Any value.
   * @returns {Mixed} Returns `value`.
   * @example
   *
   * var moe = { 'name': 'moe' };
   * moe === _.identity(moe);
   * // => true
   */
  function identity(value) {
    return value;
  }

  /**
   * Adds functions properties of `object` to the `lodash` function and chainable
   * wrapper.
   *
   * @static
   * @memberOf _
   * @category Utilities
   * @param {Object} object The object of function properties to add to `lodash`.
   * @example
   *
   * _.mixin({
   *   'capitalize': function(string) {
   *     return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
   *   }
   * });
   *
   * _.capitalize('larry');
   * // => 'Larry'
   *
   * _('curly').capitalize();
   * // => 'Curly'
   */
  function mixin(object) {
    forEach(functions(object), function(methodName) {
      var func = lodash[methodName] = object[methodName];

      LoDash.prototype[methodName] = function() {
        var args = [this.__wrapped__];
        if (arguments.length) {
          push.apply(args, arguments);
        }
        var result = func.apply(lodash, args);
        if (this.__chain__) {
          result = new LoDash(result);
          result.__chain__ = true;
        }
        return result;
      };
    });
  }

  /**
   * Reverts the '_' variable to its previous value and returns a reference to
   * the `lodash` function.
   *
   * @static
   * @memberOf _
   * @category Utilities
   * @returns {Function} Returns the `lodash` function.
   * @example
   *
   * var lodash = _.noConflict();
   */
  function noConflict() {
    window._ = oldDash;
    return this;
  }

  /**
   * Produces a random number between `min` and `max` (inclusive). If only one
   * argument is passed, a number between `0` and the given number will be returned.
   *
   * @static
   * @memberOf _
   * @category Utilities
   * @param {Number} [min=0] The minimum possible value.
   * @param {Number} [max=1] The maximum possible value.
   * @returns {Number} Returns a random number.
   * @example
   *
   * _.random(0, 5);
   * // => a number between 1 and 5
   *
   * _.random(5);
   * // => also a number between 1 and 5
   */
  function random(min, max) {
    if (min == null && max == null) {
      max = 1;
    }
    min = +min || 0;
    if (max == null) {
      max = min;
      min = 0;
    }
    return min + nativeFloor(nativeRandom() * ((+max || 0) - min + 1));
  }

  /**
   * Resolves the value of `property` on `object`. If `property` is a function
   * it will be invoked and its result returned, else the property value is
   * returned. If `object` is falsey, then `null` is returned.
   *
   * @deprecated
   * @static
   * @memberOf _
   * @category Utilities
   * @param {Object} object The object to inspect.
   * @param {String} property The property to get the result of.
   * @returns {Mixed} Returns the resolved value.
   * @example
   *
   * var object = {
   *   'cheese': 'crumpets',
   *   'stuff': function() {
   *     return 'nonsense';
   *   }
   * };
   *
   * _.result(object, 'cheese');
   * // => 'crumpets'
   *
   * _.result(object, 'stuff');
   * // => 'nonsense'
   */
  function result(object, property) {
    // based on Backbone's private `getValue` function
    // https://github.com/documentcloud/backbone/blob/0.9.2/backbone.js#L1419-1424
    if (!object) {
      return null;
    }
    var value = object[property];
    return isFunction(value) ? object[property]() : value;
  }

  /**
   * A micro-templating method that handles arbitrary delimiters, preserves
   * whitespace, and correctly escapes quotes within interpolated code.
   *
   * Note: In the development build `_.template` utilizes sourceURLs for easier
   * debugging. See http://www.html5rocks.com/en/tutorials/developertools/sourcemaps/#toc-sourceurl
   *
   * Note: Lo-Dash may be used in Chrome extensions by either creating a `lodash csp`
   * build and avoiding `_.template` use, or loading Lo-Dash in a sandboxed page.
   * See http://developer.chrome.com/trunk/extensions/sandboxingEval.html
   *
   * @static
   * @memberOf _
   * @category Utilities
   * @param {String} text The template text.
   * @param {Obect} data The data object used to populate the text.
   * @param {Object} options The options object.
   * @returns {Function|String} Returns a compiled function when no `data` object
   *  is given, else it returns the interpolated text.
   * @example
   *
   * // using a compiled template
   * var compiled = _.template('hello: <%= name %>');
   * compiled({ 'name': 'moe' });
   * // => 'hello: moe'
   *
   * var list = '<% _.forEach(people, function(name) { %> <li><%= name %></li> <% }); %>';
   * _.template(list, { 'people': ['moe', 'larry', 'curly'] });
   * // => '<li>moe</li><li>larry</li><li>curly</li>'
   *
   * // using the "escape" delimiter to escape HTML in data property values
   * _.template('<b><%- value %></b>', { 'value': '<script>' });
   * // => '<b>&lt;script></b>'
   *
   * // using the internal `print` function in "evaluate" delimiters
   * _.template('<% print("Hello " + epithet); %>', { 'epithet': 'stooge' });
   * // => 'Hello stooge.'
   *
   * // using custom template delimiter settings
   * _.templateSettings = {
   *   'interpolate': /\{\{(.+?)\}\}/g
   * };
   *
   * _.template('Hello {{ name }}!', { 'name': 'Mustache' });
   * // => 'Hello Mustache!'
   *
   * // using the `variable` option to ensure a with-statement isn't used in the compiled template
   * var compiled = _.template('hello: <%= data.name %>', null, { 'variable': 'data' });
   * compiled.source;
   * // => function(data) {
   *   var __t, __p = '', __e = _.escape;
   *   __p += 'hello: ' + ((__t = ( data.name )) == null ? '' : __t);
   *   return __p;
   * }
   *
   * // using the `source` property to inline compiled templates for meaningful
   * // line numbers in error messages and a stack trace
   * fs.writeFileSync(path.join(cwd, 'jst.js'), '\
   *   var JST = {\
   *     "main": ' + _.template(mainText).source + '\
   *   };\
   * ');
   */
  function template(text, data, options) {
    // based on John Resig's `tmpl` implementation
    // http://ejohn.org/blog/javascript-micro-templating/
    // and Laura Doktorova's doT.js
    // https://github.com/olado/doT
    options || (options = {});
    text += '';

    var isEvaluating,
        result,
        index = 0,
        settings = lodash.templateSettings,
        source = "__p += '",
        variable = options.variable || settings.variable,
        hasVariable = variable;

    // compile regexp to match each delimiter
    var reDelimiters = RegExp(
      (options.escape || settings.escape || reNoMatch).source + '|' +
      (options.interpolate || settings.interpolate || reNoMatch).source + '|' +
      (options.evaluate || settings.evaluate || reNoMatch).source + '|$'
    , 'g');

    text.replace(reDelimiters, function(match, escapeValue, interpolateValue, evaluateValue, offset) {
      // escape characters that cannot be included in string literals
      source += text.slice(index, offset).replace(reUnescapedString, escapeStringChar);

      // replace delimiters with snippets
      source +=
        escapeValue ? "' +\n__e(" + escapeValue + ") +\n'" :
        evaluateValue ? "';\n" + evaluateValue + ";\n__p += '" :
        interpolateValue ? "' +\n((__t = (" + interpolateValue + ")) == null ? '' : __t) +\n'" : '';

      isEvaluating || (isEvaluating = evaluateValue || reComplexDelimiter.test(escapeValue || interpolateValue));
      index = offset + match.length;
    });

    source += "';\n";

    // if `variable` is not specified and the template contains "evaluate"
    // delimiters, wrap a with-statement around the generated code to add the
    // data object to the top of the scope chain
    if (!hasVariable) {
      variable = 'obj';
      if (isEvaluating) {
        source = 'with (' + variable + ') {\n' + source + '\n}\n';
      }
      else {
        // avoid a with-statement by prepending data object references to property names
        var reDoubleVariable = RegExp('(\\(\\s*)' + variable + '\\.' + variable + '\\b', 'g');
        source = source
          .replace(reInsertVariable, '$&' + variable + '.')
          .replace(reDoubleVariable, '$1__d');
      }
    }

    // cleanup code by stripping empty strings
    source = (isEvaluating ? source.replace(reEmptyStringLeading, '') : source)
      .replace(reEmptyStringMiddle, '$1')
      .replace(reEmptyStringTrailing, '$1;');

    // frame code as the function body
    source = 'function(' + variable + ') {\n' +
      (hasVariable ? '' : variable + ' || (' + variable + ' = {});\n') +
      'var __t, __p = \'\', __e = _.escape' +
      (isEvaluating
        ? ', __j = Array.prototype.join;\n' +
          'function print() { __p += __j.call(arguments, \'\') }\n'
        : (hasVariable ? '' : ', __d = ' + variable + '.' + variable + ' || ' + variable) + ';\n'
      ) +
      source +
      'return __p\n}';

    // use a sourceURL for easier debugging
    // http://www.html5rocks.com/en/tutorials/developertools/sourcemaps/#toc-sourceurl
    var sourceURL = useSourceURL
      ? '\n//@ sourceURL=/lodash/template/source[' + (templateCounter++) + ']'
      : '';

    try {
      result = Function('_', 'return ' + source + sourceURL)(lodash);
    } catch(e) {
      e.source = source;
      throw e;
    }

    if (data) {
      return result(data);
    }
    // provide the compiled function's source via its `toString` method, in
    // supported environments, or the `source` property as a convenience for
    // inlining compiled templates during the build process
    result.source = source;
    return result;
  }

  /**
   * Executes the `callback` function `n` times, returning an array of the results
   * of each `callback` execution. The `callback` is bound to `thisArg` and invoked
   * with one argument; (index).
   *
   * @static
   * @memberOf _
   * @category Utilities
   * @param {Number} n The number of times to execute the callback.
   * @param {Function} callback The function called per iteration.
   * @param {Mixed} [thisArg] The `this` binding for the callback.
   * @returns {Array} Returns a new array of the results of each `callback` execution.
   * @example
   *
   * var diceRolls = _.times(3, _.partial(_.random, 1, 6));
   * // => [3, 6, 4]
   *
   * _.times(3, function(n) { mage.castSpell(n); });
   * // => calls `mage.castSpell(n)` three times, passing `n` of `0`, `1`, and `2` respectively
   *
   * _.times(3, function(n) { this.cast(n); }, mage);
   * // => also calls `mage.castSpell(n)` three times
   */
  function times(n, callback, thisArg) {
    var index = -1,
        result = Array(n || 0);

    if (thisArg) {
      while (++index < n) {
        result[index] = callback.call(thisArg, index);
      }
    } else {
      while (++index < n) {
        result[index] = callback(index);
      }
    }
    return result;
  }

  /**
   * Converts the HTML entities `&amp;`, `&lt;`, `&gt;`, `&quot;`, and `&#x27;`
   * in `string` to their corresponding characters.
   *
   * @static
   * @memberOf _
   * @category Utilities
   * @param {String} string The string to unescape.
   * @returns {String} Returns the unescaped string.
   * @example
   *
   * _.unescape('Moe, Larry &amp; Curly');
   * // => "Moe, Larry & Curly"
   */
  function unescape(string) {
    return string == null ? '' : (string + '').replace(reEscapedHtml, unescapeHtmlChar);
  }

  /**
   * Generates a unique id. If `prefix` is passed, the id will be appended to it.
   *
   * @static
   * @memberOf _
   * @category Utilities
   * @param {String} [prefix] The value to prefix the id with.
   * @returns {Number|String} Returns a numeric id if no prefix is passed, else
   *  a string id may be returned.
   * @example
   *
   * _.uniqueId('contact_');
   * // => 'contact_104'
   */
  function uniqueId(prefix) {
    var id = idCounter++;
    return prefix ? prefix + id : id;
  }

  /*--------------------------------------------------------------------------*/

  /**
   * Wraps the value in a `lodash` wrapper object.
   *
   * @static
   * @memberOf _
   * @category Chaining
   * @param {Mixed} value The value to wrap.
   * @returns {Object} Returns the wrapper object.
   * @example
   *
   * var stooges = [
   *   { 'name': 'moe', 'age': 40 },
   *   { 'name': 'larry', 'age': 50 },
   *   { 'name': 'curly', 'age': 60 }
   * ];
   *
   * var youngest = _.chain(stooges)
   *     .sortBy(function(stooge) { return stooge.age; })
   *     .map(function(stooge) { return stooge.name + ' is ' + stooge.age; })
   *     .first()
   *     .value();
   * // => 'moe is 40'
   */
  function chain(value) {
    value = new LoDash(value);
    value.__chain__ = true;
    return value;
  }

  /**
   * Invokes `interceptor` with the `value` as the first argument, and then
   * returns `value`. The purpose of this method is to "tap into" a method chain,
   * in order to perform operations on intermediate results within the chain.
   *
   * @static
   * @memberOf _
   * @category Chaining
   * @param {Mixed} value The value to pass to `interceptor`.
   * @param {Function} interceptor The function to invoke.
   * @returns {Mixed} Returns `value`.
   * @example
   *
   * _.chain([1, 2, 3, 200])
   *  .filter(function(num) { return num % 2 == 0; })
   *  .tap(alert)
   *  .map(function(num) { return num * num })
   *  .value();
   * // => // [2, 200] (alerted)
   * // => [4, 40000]
   */
  function tap(value, interceptor) {
    interceptor(value);
    return value;
  }

  /**
   * Enables method chaining on the wrapper object.
   *
   * @name chain
   * @deprecated
   * @memberOf _
   * @category Chaining
   * @returns {Mixed} Returns the wrapper object.
   * @example
   *
   * _([1, 2, 3]).value();
   * // => [1, 2, 3]
   */
  function wrapperChain() {
    this.__chain__ = true;
    return this;
  }

  /**
   * Extracts the wrapped value.
   *
   * @name value
   * @memberOf _
   * @category Chaining
   * @returns {Mixed} Returns the wrapped value.
   * @example
   *
   * _([1, 2, 3]).value();
   * // => [1, 2, 3]
   */
  function wrapperValue() {
    return this.__wrapped__;
  }

  /*--------------------------------------------------------------------------*/

  /**
   * The semantic version number.
   *
   * @static
   * @memberOf _
   * @type String
   */
  lodash.VERSION = '0.7.0';

  // assign static methods
  lodash.after = after;
  lodash.bind = bind;
  lodash.bindAll = bindAll;
  lodash.chain = chain;
  lodash.clone = clone;
  lodash.compact = compact;
  lodash.compose = compose;
  lodash.contains = contains;
  lodash.countBy = countBy;
  lodash.debounce = debounce;
  lodash.defaults = defaults;
  lodash.defer = defer;
  lodash.delay = delay;
  lodash.difference = difference;
  lodash.escape = escape;
  lodash.every = every;
  lodash.extend = extend;
  lodash.filter = filter;
  lodash.find = find;
  lodash.first = first;
  lodash.flatten = flatten;
  lodash.forEach = forEach;
  lodash.forIn = forIn;
  lodash.forOwn = forOwn;
  lodash.functions = functions;
  lodash.groupBy = groupBy;
  lodash.has = has;
  lodash.identity = identity;
  lodash.indexOf = indexOf;
  lodash.initial = initial;
  lodash.intersection = intersection;
  lodash.invert = invert;
  lodash.invoke = invoke;
  lodash.isArguments = isArguments;
  lodash.isArray = isArray;
  lodash.isBoolean = isBoolean;
  lodash.isDate = isDate;
  lodash.isElement = isElement;
  lodash.isEmpty = isEmpty;
  lodash.isEqual = isEqual;
  lodash.isFinite = isFinite;
  lodash.isFunction = isFunction;
  lodash.isNaN = isNaN;
  lodash.isNull = isNull;
  lodash.isNumber = isNumber;
  lodash.isObject = isObject;
  lodash.isRegExp = isRegExp;
  lodash.isString = isString;
  lodash.isUndefined = isUndefined;
  lodash.keys = keys;
  lodash.last = last;
  lodash.lastIndexOf = lastIndexOf;
  lodash.lateBind = lateBind;
  lodash.map = map;
  lodash.max = max;
  lodash.memoize = memoize;
  lodash.merge = merge;
  lodash.min = min;
  lodash.mixin = mixin;
  lodash.noConflict = noConflict;
  lodash.object = object;
  lodash.omit = omit;
  lodash.once = once;
  lodash.pairs = pairs;
  lodash.partial = partial;
  lodash.pick = pick;
  lodash.pluck = pluck;
  lodash.random = random;
  lodash.range = range;
  lodash.reduce = reduce;
  lodash.reduceRight = reduceRight;
  lodash.reject = reject;
  lodash.rest = rest;
  lodash.result = result;
  lodash.shuffle = shuffle;
  lodash.size = size;
  lodash.some = some;
  lodash.sortBy = sortBy;
  lodash.sortedIndex = sortedIndex;
  lodash.tap = tap;
  lodash.template = template;
  lodash.throttle = throttle;
  lodash.times = times;
  lodash.toArray = toArray;
  lodash.unescape = unescape;
  lodash.union = union;
  lodash.uniq = uniq;
  lodash.uniqueId = uniqueId;
  lodash.values = values;
  lodash.where = where;
  lodash.without = without;
  lodash.wrap = wrap;
  lodash.zip = zip;

  // assign aliases
  lodash.all = every;
  lodash.any = some;
  lodash.collect = map;
  lodash.detect = find;
  lodash.drop = rest;
  lodash.each = forEach;
  lodash.foldl = reduce;
  lodash.foldr = reduceRight;
  lodash.head = first;
  lodash.include = contains;
  lodash.inject = reduce;
  lodash.methods = functions;
  lodash.select = filter;
  lodash.tail = rest;
  lodash.take = first;
  lodash.unique = uniq;

  // add pseudo private properties used and removed during the build process
  lodash._iteratorTemplate = iteratorTemplate;
  lodash._shimKeys = shimKeys;

  /*--------------------------------------------------------------------------*/

  // assign private `LoDash` constructor's prototype
  LoDash.prototype = lodash.prototype;

  // add all static functions to `LoDash.prototype`
  mixin(lodash);

  // add `LoDash.prototype.chain` after calling `mixin()` to avoid overwriting
  // it with the wrapped `lodash.chain`
  LoDash.prototype.chain = wrapperChain;
  LoDash.prototype.value = wrapperValue;

  // add all mutator Array functions to the wrapper.
  forEach(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(methodName) {
    var func = ArrayProto[methodName];

    LoDash.prototype[methodName] = function() {
      var value = this.__wrapped__;
      func.apply(value, arguments);

      // avoid array-like object bugs with `Array#shift` and `Array#splice` in
      // Firefox < 10 and IE < 9
      if (hasObjectSpliceBug && value.length === 0) {
        delete value[0];
      }
      if (this.__chain__) {
        value = new LoDash(value);
        value.__chain__ = true;
      }
      return value;
    };
  });

  // add all accessor Array functions to the wrapper.
  forEach(['concat', 'join', 'slice'], function(methodName) {
    var func = ArrayProto[methodName];

    LoDash.prototype[methodName] = function() {
      var value = this.__wrapped__,
          result = func.apply(value, arguments);

      if (this.__chain__) {
        result = new LoDash(result);
        result.__chain__ = true;
      }
      return result;
    };
  });

  /*--------------------------------------------------------------------------*/

  // expose Lo-Dash
  // some AMD build optimizers, like r.js, check for specific condition patterns like the following:
  if (typeof define == 'function' && typeof define.amd == 'object' && define.amd) {
    // Expose Lo-Dash to the global object even when an AMD loader is present in
    // case Lo-Dash was injected by a third-party script and not intended to be
    // loaded as a module. The global assignment can be reverted in the Lo-Dash
    // module via its `noConflict()` method.
    window._ = lodash;

    // define as an anonymous module so, through path mapping, it can be
    // referenced as the "underscore" module
    define('underscore',[],function() {
      return lodash;
    });
  }
  // check for `exports` after `define` in case a build optimizer adds an `exports` object
  else if (freeExports) {
    // in Node.js or RingoJS v0.8.0+
    if (typeof module == 'object' && module && module.exports == freeExports) {
      (module.exports = lodash)._ = lodash;
    }
    // in Narwhal or RingoJS v0.7.0-
    else {
      freeExports._ = lodash;
    }
  }
  else {
    // in a browser or Rhino
    window._ = lodash;
  }
}(this));
//     Backbone.js 0.9.10

//     (c) 2010-2012 Jeremy Ashkenas, DocumentCloud Inc.
//     Backbone may be freely distributed under the MIT license.
//     For all details and documentation:
//     http://backbonejs.org

(function(){

  // Initial Setup
  // -------------

  // Save a reference to the global object (`window` in the browser, `exports`
  // on the server).
  var root = this;

  // Save the previous value of the `Backbone` variable, so that it can be
  // restored later on, if `noConflict` is used.
  var previousBackbone = root.Backbone;

  // Create a local reference to array methods.
  var array = [];
  var push = array.push;
  var slice = array.slice;
  var splice = array.splice;

  // The top-level namespace. All public Backbone classes and modules will
  // be attached to this. Exported for both CommonJS and the browser.
  var Backbone;
  if (typeof exports !== 'undefined') {
    Backbone = exports;
  } else {
    Backbone = root.Backbone = {};
  }

  // Current version of the library. Keep in sync with `package.json`.
  Backbone.VERSION = '0.9.10';

  // Require Underscore, if we're on the server, and it's not already present.
  var _ = root._;
  if (!_ && (typeof require !== 'undefined')) _ = require('underscore');

  // For Backbone's purposes, jQuery, Zepto, or Ender owns the `$` variable.
  Backbone.$ = root.jQuery || root.Zepto || root.ender;

  // Runs Backbone.js in *noConflict* mode, returning the `Backbone` variable
  // to its previous owner. Returns a reference to this Backbone object.
  Backbone.noConflict = function() {
    root.Backbone = previousBackbone;
    return this;
  };

  // Turn on `emulateHTTP` to support legacy HTTP servers. Setting this option
  // will fake `"PUT"` and `"DELETE"` requests via the `_method` parameter and
  // set a `X-Http-Method-Override` header.
  Backbone.emulateHTTP = false;

  // Turn on `emulateJSON` to support legacy servers that can't deal with direct
  // `application/json` requests ... will encode the body as
  // `application/x-www-form-urlencoded` instead and will send the model in a
  // form param named `model`.
  Backbone.emulateJSON = false;

  // Backbone.Events
  // ---------------

  // Regular expression used to split event strings.
  var eventSplitter = /\s+/;

  // Implement fancy features of the Events API such as multiple event
  // names `"change blur"` and jQuery-style event maps `{change: action}`
  // in terms of the existing API.
  var eventsApi = function(obj, action, name, rest) {
    if (!name) return true;
    if (typeof name === 'object') {
      for (var key in name) {
        obj[action].apply(obj, [key, name[key]].concat(rest));
      }
    } else if (eventSplitter.test(name)) {
      var names = name.split(eventSplitter);
      for (var i = 0, l = names.length; i < l; i++) {
        obj[action].apply(obj, [names[i]].concat(rest));
      }
    } else {
      return true;
    }
  };

  // Optimized internal dispatch function for triggering events. Tries to
  // keep the usual cases speedy (most Backbone events have 3 arguments).
  var triggerEvents = function(events, args) {
    var ev, i = -1, l = events.length;
    switch (args.length) {
    case 0: while (++i < l) (ev = events[i]).callback.call(ev.ctx);
    return;
    case 1: while (++i < l) (ev = events[i]).callback.call(ev.ctx, args[0]);
    return;
    case 2: while (++i < l) (ev = events[i]).callback.call(ev.ctx, args[0], args[1]);
    return;
    case 3: while (++i < l) (ev = events[i]).callback.call(ev.ctx, args[0], args[1], args[2]);
    return;
    default: while (++i < l) (ev = events[i]).callback.apply(ev.ctx, args);
    }
  };

  // A module that can be mixed in to *any object* in order to provide it with
  // custom events. You may bind with `on` or remove with `off` callback
  // functions to an event; `trigger`-ing an event fires all callbacks in
  // succession.
  //
  //     var object = {};
  //     _.extend(object, Backbone.Events);
  //     object.on('expand', function(){ alert('expanded'); });
  //     object.trigger('expand');
  //
  var Events = Backbone.Events = {

    // Bind one or more space separated events, or an events map,
    // to a `callback` function. Passing `"all"` will bind the callback to
    // all events fired.
    on: function(name, callback, context) {
      if (!eventsApi(this, 'on', name, [callback, context]) || !callback) return this;
      this._events || (this._events = {});
      var list = this._events[name] || (this._events[name] = []);
      list.push({callback: callback, context: context, ctx: context || this});
      return this;
    },

    // Bind events to only be triggered a single time. After the first time
    // the callback is invoked, it will be removed.
    once: function(name, callback, context) {
      if (!eventsApi(this, 'once', name, [callback, context]) || !callback) return this;
      var self = this;
      var once = _.once(function() {
        self.off(name, once);
        callback.apply(this, arguments);
      });
      once._callback = callback;
      this.on(name, once, context);
      return this;
    },

    // Remove one or many callbacks. If `context` is null, removes all
    // callbacks with that function. If `callback` is null, removes all
    // callbacks for the event. If `name` is null, removes all bound
    // callbacks for all events.
    off: function(name, callback, context) {
      var retain, ev, events, names, i, l, j, k;
      if (!this._events || !eventsApi(this, 'off', name, [callback, context])) return this;
      if (!name && !callback && !context) {
        this._events = {};
        return this;
      }

      names = name ? [name] : _.keys(this._events);
      for (i = 0, l = names.length; i < l; i++) {
        name = names[i];
        if (events = this._events[name]) {
          this._events[name] = retain = [];
          if (callback || context) {
            for (j = 0, k = events.length; j < k; j++) {
              ev = events[j];
              if ((callback && callback !== ev.callback &&
                               callback !== ev.callback._callback) ||
                  (context && context !== ev.context)) {
                retain.push(ev);
              }
            }
          }
          if (!retain.length) delete this._events[name];
        }
      }

      return this;
    },

    // Trigger one or many events, firing all bound callbacks. Callbacks are
    // passed the same arguments as `trigger` is, apart from the event name
    // (unless you're listening on `"all"`, which will cause your callback to
    // receive the true name of the event as the first argument).
    trigger: function(name) {
      if (!this._events) return this;
      var args = slice.call(arguments, 1);
      if (!eventsApi(this, 'trigger', name, args)) return this;
      var events = this._events[name];
      var allEvents = this._events.all;
      if (events) triggerEvents(events, args);
      if (allEvents) triggerEvents(allEvents, arguments);
      return this;
    },

    // An inversion-of-control version of `on`. Tell *this* object to listen to
    // an event in another object ... keeping track of what it's listening to.
    listenTo: function(obj, name, callback) {
      var listeners = this._listeners || (this._listeners = {});
      var id = obj._listenerId || (obj._listenerId = _.uniqueId('l'));
      listeners[id] = obj;
      obj.on(name, typeof name === 'object' ? this : callback, this);
      return this;
    },

    // Tell this object to stop listening to either specific events ... or
    // to every object it's currently listening to.
    stopListening: function(obj, name, callback) {
      var listeners = this._listeners;
      if (!listeners) return this;
      if (obj) {
        obj.off(name, typeof name === 'object' ? this : callback, this);
        if (!name && !callback) delete listeners[obj._listenerId];
      } else {
        if (typeof name === 'object') callback = this;
        for (var id in listeners) {
          listeners[id].off(name, callback, this);
        }
        this._listeners = {};
      }
      return this;
    }
  };

  // Aliases for backwards compatibility.
  Events.bind   = Events.on;
  Events.unbind = Events.off;

  // Allow the `Backbone` object to serve as a global event bus, for folks who
  // want global "pubsub" in a convenient place.
  _.extend(Backbone, Events);

  // Backbone.Model
  // --------------

  // Create a new model, with defined attributes. A client id (`cid`)
  // is automatically generated and assigned for you.
  var Model = Backbone.Model = function(attributes, options) {
    var defaults;
    var attrs = attributes || {};
    this.cid = _.uniqueId('c');
    this.attributes = {};
    if (options && options.collection) this.collection = options.collection;
    if (options && options.parse) attrs = this.parse(attrs, options) || {};
    if (defaults = _.result(this, 'defaults')) {
      attrs = _.defaults({}, attrs, defaults);
    }
    this.set(attrs, options);
    this.changed = {};
    this.initialize.apply(this, arguments);
  };

  // Attach all inheritable methods to the Model prototype.
  _.extend(Model.prototype, Events, {

    // A hash of attributes whose current and previous value differ.
    changed: null,

    // The default name for the JSON `id` attribute is `"id"`. MongoDB and
    // CouchDB users may want to set this to `"_id"`.
    idAttribute: 'id',

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize: function(){},

    // Return a copy of the model's `attributes` object.
    toJSON: function(options) {
      return _.clone(this.attributes);
    },

    // Proxy `Backbone.sync` by default.
    sync: function() {
      return Backbone.sync.apply(this, arguments);
    },

    // Get the value of an attribute.
    get: function(attr) {
      return this.attributes[attr];
    },

    // Get the HTML-escaped value of an attribute.
    escape: function(attr) {
      return _.escape(this.get(attr));
    },

    // Returns `true` if the attribute contains a value that is not null
    // or undefined.
    has: function(attr) {
      return this.get(attr) != null;
    },

    // ----------------------------------------------------------------------

    // Set a hash of model attributes on the object, firing `"change"` unless
    // you choose to silence it.
    set: function(key, val, options) {
      var attr, attrs, unset, changes, silent, changing, prev, current;
      if (key == null) return this;

      // Handle both `"key", value` and `{key: value}` -style arguments.
      if (typeof key === 'object') {
        attrs = key;
        options = val;
      } else {
        (attrs = {})[key] = val;
      }

      options || (options = {});

      // Run validation.
      if (!this._validate(attrs, options)) return false;

      // Extract attributes and options.
      unset           = options.unset;
      silent          = options.silent;
      changes         = [];
      changing        = this._changing;
      this._changing  = true;

      if (!changing) {
        this._previousAttributes = _.clone(this.attributes);
        this.changed = {};
      }
      current = this.attributes, prev = this._previousAttributes;

      // Check for changes of `id`.
      if (this.idAttribute in attrs) this.id = attrs[this.idAttribute];

      // For each `set` attribute, update or delete the current value.
      for (attr in attrs) {
        val = attrs[attr];
        if (!_.isEqual(current[attr], val)) changes.push(attr);
        if (!_.isEqual(prev[attr], val)) {
          this.changed[attr] = val;
        } else {
          delete this.changed[attr];
        }
        unset ? delete current[attr] : current[attr] = val;
      }

      // Trigger all relevant attribute changes.
      if (!silent) {
        if (changes.length) this._pending = true;
        for (var i = 0, l = changes.length; i < l; i++) {
          this.trigger('change:' + changes[i], this, current[changes[i]], options);
        }
      }

      if (changing) return this;
      if (!silent) {
        while (this._pending) {
          this._pending = false;
          this.trigger('change', this, options);
        }
      }
      this._pending = false;
      this._changing = false;
      return this;
    },

    // Remove an attribute from the model, firing `"change"` unless you choose
    // to silence it. `unset` is a noop if the attribute doesn't exist.
    unset: function(attr, options) {
      return this.set(attr, void 0, _.extend({}, options, {unset: true}));
    },

    // Clear all attributes on the model, firing `"change"` unless you choose
    // to silence it.
    clear: function(options) {
      var attrs = {};
      for (var key in this.attributes) attrs[key] = void 0;
      return this.set(attrs, _.extend({}, options, {unset: true}));
    },

    // Determine if the model has changed since the last `"change"` event.
    // If you specify an attribute name, determine if that attribute has changed.
    hasChanged: function(attr) {
      if (attr == null) return !_.isEmpty(this.changed);
      return _.has(this.changed, attr);
    },

    // Return an object containing all the attributes that have changed, or
    // false if there are no changed attributes. Useful for determining what
    // parts of a view need to be updated and/or what attributes need to be
    // persisted to the server. Unset attributes will be set to undefined.
    // You can also pass an attributes object to diff against the model,
    // determining if there *would be* a change.
    changedAttributes: function(diff) {
      if (!diff) return this.hasChanged() ? _.clone(this.changed) : false;
      var val, changed = false;
      var old = this._changing ? this._previousAttributes : this.attributes;
      for (var attr in diff) {
        if (_.isEqual(old[attr], (val = diff[attr]))) continue;
        (changed || (changed = {}))[attr] = val;
      }
      return changed;
    },

    // Get the previous value of an attribute, recorded at the time the last
    // `"change"` event was fired.
    previous: function(attr) {
      if (attr == null || !this._previousAttributes) return null;
      return this._previousAttributes[attr];
    },

    // Get all of the attributes of the model at the time of the previous
    // `"change"` event.
    previousAttributes: function() {
      return _.clone(this._previousAttributes);
    },

    // ---------------------------------------------------------------------

    // Fetch the model from the server. If the server's representation of the
    // model differs from its current attributes, they will be overriden,
    // triggering a `"change"` event.
    fetch: function(options) {
      options = options ? _.clone(options) : {};
      if (options.parse === void 0) options.parse = true;
      var success = options.success;
      options.success = function(model, resp, options) {
        if (!model.set(model.parse(resp, options), options)) return false;
        if (success) success(model, resp, options);
      };
      return this.sync('read', this, options);
    },

    // Set a hash of model attributes, and sync the model to the server.
    // If the server returns an attributes hash that differs, the model's
    // state will be `set` again.
    save: function(key, val, options) {
      var attrs, success, method, xhr, attributes = this.attributes;

      // Handle both `"key", value` and `{key: value}` -style arguments.
      if (key == null || typeof key === 'object') {
        attrs = key;
        options = val;
      } else {
        (attrs = {})[key] = val;
      }

      // If we're not waiting and attributes exist, save acts as `set(attr).save(null, opts)`.
      if (attrs && (!options || !options.wait) && !this.set(attrs, options)) return false;

      options = _.extend({validate: true}, options);

      // Do not persist invalid models.
      if (!this._validate(attrs, options)) return false;

      // Set temporary attributes if `{wait: true}`.
      if (attrs && options.wait) {
        this.attributes = _.extend({}, attributes, attrs);
      }

      // After a successful server-side save, the client is (optionally)
      // updated with the server-side state.
      if (options.parse === void 0) options.parse = true;
      success = options.success;
      options.success = function(model, resp, options) {
        // Ensure attributes are restored during synchronous saves.
        model.attributes = attributes;
        var serverAttrs = model.parse(resp, options);
        if (options.wait) serverAttrs = _.extend(attrs || {}, serverAttrs);
        if (_.isObject(serverAttrs) && !model.set(serverAttrs, options)) {
          return false;
        }
        if (success) success(model, resp, options);
      };

      // Finish configuring and sending the Ajax request.
      method = this.isNew() ? 'create' : (options.patch ? 'patch' : 'update');
      if (method === 'patch') options.attrs = attrs;
      xhr = this.sync(method, this, options);

      // Restore attributes.
      if (attrs && options.wait) this.attributes = attributes;

      return xhr;
    },

    // Destroy this model on the server if it was already persisted.
    // Optimistically removes the model from its collection, if it has one.
    // If `wait: true` is passed, waits for the server to respond before removal.
    destroy: function(options) {
      options = options ? _.clone(options) : {};
      var model = this;
      var success = options.success;

      var destroy = function() {
        model.trigger('destroy', model, model.collection, options);
      };

      options.success = function(model, resp, options) {
        if (options.wait || model.isNew()) destroy();
        if (success) success(model, resp, options);
      };

      if (this.isNew()) {
        options.success(this, null, options);
        return false;
      }

      var xhr = this.sync('delete', this, options);
      if (!options.wait) destroy();
      return xhr;
    },

    // Default URL for the model's representation on the server -- if you're
    // using Backbone's restful methods, override this to change the endpoint
    // that will be called.
    url: function() {
      var base = _.result(this, 'urlRoot') || _.result(this.collection, 'url') || urlError();
      if (this.isNew()) return base;
      return base + (base.charAt(base.length - 1) === '/' ? '' : '/') + encodeURIComponent(this.id);
    },

    // **parse** converts a response into the hash of attributes to be `set` on
    // the model. The default implementation is just to pass the response along.
    parse: function(resp, options) {
      return resp;
    },

    // Create a new model with identical attributes to this one.
    clone: function() {
      return new this.constructor(this.attributes);
    },

    // A model is new if it has never been saved to the server, and lacks an id.
    isNew: function() {
      return this.id == null;
    },

    // Check if the model is currently in a valid state.
    isValid: function(options) {
      return !this.validate || !this.validate(this.attributes, options);
    },

    // Run validation against the next complete set of model attributes,
    // returning `true` if all is well. Otherwise, fire an
    // `"invalid"` event and call the invalid callback, if specified.
    _validate: function(attrs, options) {
      if (!options.validate || !this.validate) return true;
      attrs = _.extend({}, this.attributes, attrs);
      var error = this.validationError = this.validate(attrs, options) || null;
      if (!error) return true;
      this.trigger('invalid', this, error, options || {});
      return false;
    }

  });

  // Backbone.Collection
  // -------------------

  // Provides a standard collection class for our sets of models, ordered
  // or unordered. If a `comparator` is specified, the Collection will maintain
  // its models in sort order, as they're added and removed.
  var Collection = Backbone.Collection = function(models, options) {
    options || (options = {});
    if (options.model) this.model = options.model;
    if (options.comparator !== void 0) this.comparator = options.comparator;
    this._reset();
    this.initialize.apply(this, arguments);
    if (models) this.reset(models, _.extend({silent: true}, options));
  };

  // Define the Collection's inheritable methods.
  _.extend(Collection.prototype, Events, {

    // The default model for a collection is just a **Backbone.Model**.
    // This should be overridden in most cases.
    model: Model,

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize: function(){},

    // The JSON representation of a Collection is an array of the
    // models' attributes.
    toJSON: function(options) {
      return this.map(function(model){ return model.toJSON(options); });
    },

    // Proxy `Backbone.sync` by default.
    sync: function() {
      return Backbone.sync.apply(this, arguments);
    },

    // Add a model, or list of models to the set.
    add: function(models, options) {
      models = _.isArray(models) ? models.slice() : [models];
      options || (options = {});
      var i, l, model, attrs, existing, doSort, add, at, sort, sortAttr;
      add = [];
      at = options.at;
      sort = this.comparator && (at == null) && options.sort !== false;
      sortAttr = _.isString(this.comparator) ? this.comparator : null;

      // Turn bare objects into model references, and prevent invalid models
      // from being added.
      for (i = 0, l = models.length; i < l; i++) {
        if (!(model = this._prepareModel(attrs = models[i], options))) {
          this.trigger('invalid', this, attrs, options);
          continue;
        }

        // If a duplicate is found, prevent it from being added and
        // optionally merge it into the existing model.
        if (existing = this.get(model)) {
          if (options.merge) {
            existing.set(attrs === model ? model.attributes : attrs, options);
            if (sort && !doSort && existing.hasChanged(sortAttr)) doSort = true;
          }
          continue;
        }

        // This is a new model, push it to the `add` list.
        add.push(model);

        // Listen to added models' events, and index models for lookup by
        // `id` and by `cid`.
        model.on('all', this._onModelEvent, this);
        this._byId[model.cid] = model;
        if (model.id != null) this._byId[model.id] = model;
      }

      // See if sorting is needed, update `length` and splice in new models.
      if (add.length) {
        if (sort) doSort = true;
        this.length += add.length;
        if (at != null) {
          splice.apply(this.models, [at, 0].concat(add));
        } else {
          push.apply(this.models, add);
        }
      }

      // Silently sort the collection if appropriate.
      if (doSort) this.sort({silent: true});

      if (options.silent) return this;

      // Trigger `add` events.
      for (i = 0, l = add.length; i < l; i++) {
        (model = add[i]).trigger('add', model, this, options);
      }

      // Trigger `sort` if the collection was sorted.
      if (doSort) this.trigger('sort', this, options);

      return this;
    },

    // Remove a model, or a list of models from the set.
    remove: function(models, options) {
      models = _.isArray(models) ? models.slice() : [models];
      options || (options = {});
      var i, l, index, model;
      for (i = 0, l = models.length; i < l; i++) {
        model = this.get(models[i]);
        if (!model) continue;
        delete this._byId[model.id];
        delete this._byId[model.cid];
        index = this.indexOf(model);
        this.models.splice(index, 1);
        this.length--;
        if (!options.silent) {
          options.index = index;
          model.trigger('remove', model, this, options);
        }
        this._removeReference(model);
      }
      return this;
    },

    // Add a model to the end of the collection.
    push: function(model, options) {
      model = this._prepareModel(model, options);
      this.add(model, _.extend({at: this.length}, options));
      return model;
    },

    // Remove a model from the end of the collection.
    pop: function(options) {
      var model = this.at(this.length - 1);
      this.remove(model, options);
      return model;
    },

    // Add a model to the beginning of the collection.
    unshift: function(model, options) {
      model = this._prepareModel(model, options);
      this.add(model, _.extend({at: 0}, options));
      return model;
    },

    // Remove a model from the beginning of the collection.
    shift: function(options) {
      var model = this.at(0);
      this.remove(model, options);
      return model;
    },

    // Slice out a sub-array of models from the collection.
    slice: function(begin, end) {
      return this.models.slice(begin, end);
    },

    // Get a model from the set by id.
    get: function(obj) {
      if (obj == null) return void 0;
      this._idAttr || (this._idAttr = this.model.prototype.idAttribute);
      return this._byId[obj.id || obj.cid || obj[this._idAttr] || obj];
    },

    // Get the model at the given index.
    at: function(index) {
      return this.models[index];
    },

    // Return models with matching attributes. Useful for simple cases of `filter`.
    where: function(attrs) {
      if (_.isEmpty(attrs)) return [];
      return this.filter(function(model) {
        for (var key in attrs) {
          if (attrs[key] !== model.get(key)) return false;
        }
        return true;
      });
    },

    // Force the collection to re-sort itself. You don't need to call this under
    // normal circumstances, as the set will maintain sort order as each item
    // is added.
    sort: function(options) {
      if (!this.comparator) {
        throw new Error('Cannot sort a set without a comparator');
      }
      options || (options = {});

      // Run sort based on type of `comparator`.
      if (_.isString(this.comparator) || this.comparator.length === 1) {
        this.models = this.sortBy(this.comparator, this);
      } else {
        this.models.sort(_.bind(this.comparator, this));
      }

      if (!options.silent) this.trigger('sort', this, options);
      return this;
    },

    // Pluck an attribute from each model in the collection.
    pluck: function(attr) {
      return _.invoke(this.models, 'get', attr);
    },

    // Smartly update a collection with a change set of models, adding,
    // removing, and merging as necessary.
    update: function(models, options) {
      options = _.extend({add: true, merge: true, remove: true}, options);
      if (options.parse) models = this.parse(models, options);
      var model, i, l, existing;
      var add = [], remove = [], modelMap = {};

      // Allow a single model (or no argument) to be passed.
      if (!_.isArray(models)) models = models ? [models] : [];

      // Proxy to `add` for this case, no need to iterate...
      if (options.add && !options.remove) return this.add(models, options);

      // Determine which models to add and merge, and which to remove.
      for (i = 0, l = models.length; i < l; i++) {
        model = models[i];
        existing = this.get(model);
        if (options.remove && existing) modelMap[existing.cid] = true;
        if ((options.add && !existing) || (options.merge && existing)) {
          add.push(model);
        }
      }
      if (options.remove) {
        for (i = 0, l = this.models.length; i < l; i++) {
          model = this.models[i];
          if (!modelMap[model.cid]) remove.push(model);
        }
      }

      // Remove models (if applicable) before we add and merge the rest.
      if (remove.length) this.remove(remove, options);
      if (add.length) this.add(add, options);
      return this;
    },

    // When you have more items than you want to add or remove individually,
    // you can reset the entire set with a new list of models, without firing
    // any `add` or `remove` events. Fires `reset` when finished.
    reset: function(models, options) {
      options || (options = {});
      if (options.parse) models = this.parse(models, options);
      for (var i = 0, l = this.models.length; i < l; i++) {
        this._removeReference(this.models[i]);
      }
      options.previousModels = this.models;
      this._reset();
      if (models) this.add(models, _.extend({silent: true}, options));
      if (!options.silent) this.trigger('reset', this, options);
      return this;
    },

    // Fetch the default set of models for this collection, resetting the
    // collection when they arrive. If `update: true` is passed, the response
    // data will be passed through the `update` method instead of `reset`.
    fetch: function(options) {
      options = options ? _.clone(options) : {};
      if (options.parse === void 0) options.parse = true;
      var success = options.success;
      options.success = function(collection, resp, options) {
        var method = options.update ? 'update' : 'reset';
        collection[method](resp, options);
        if (success) success(collection, resp, options);
      };
      return this.sync('read', this, options);
    },

    // Create a new instance of a model in this collection. Add the model to the
    // collection immediately, unless `wait: true` is passed, in which case we
    // wait for the server to agree.
    create: function(model, options) {
      options = options ? _.clone(options) : {};
      if (!(model = this._prepareModel(model, options))) return false;
      if (!options.wait) this.add(model, options);
      var collection = this;
      var success = options.success;
      options.success = function(model, resp, options) {
        if (options.wait) collection.add(model, options);
        if (success) success(model, resp, options);
      };
      model.save(null, options);
      return model;
    },

    // **parse** converts a response into a list of models to be added to the
    // collection. The default implementation is just to pass it through.
    parse: function(resp, options) {
      return resp;
    },

    // Create a new collection with an identical list of models as this one.
    clone: function() {
      return new this.constructor(this.models);
    },

    // Reset all internal state. Called when the collection is reset.
    _reset: function() {
      this.length = 0;
      this.models = [];
      this._byId  = {};
    },

    // Prepare a model or hash of attributes to be added to this collection.
    _prepareModel: function(attrs, options) {
      if (attrs instanceof Model) {
        if (!attrs.collection) attrs.collection = this;
        return attrs;
      }
      options || (options = {});
      options.collection = this;
      var model = new this.model(attrs, options);
      if (!model._validate(attrs, options)) return false;
      return model;
    },

    // Internal method to remove a model's ties to a collection.
    _removeReference: function(model) {
      if (this === model.collection) delete model.collection;
      model.off('all', this._onModelEvent, this);
    },

    // Internal method called every time a model in the set fires an event.
    // Sets need to update their indexes when models change ids. All other
    // events simply proxy through. "add" and "remove" events that originate
    // in other collections are ignored.
    _onModelEvent: function(event, model, collection, options) {
      if ((event === 'add' || event === 'remove') && collection !== this) return;
      if (event === 'destroy') this.remove(model, options);
      if (model && event === 'change:' + model.idAttribute) {
        delete this._byId[model.previous(model.idAttribute)];
        if (model.id != null) this._byId[model.id] = model;
      }
      this.trigger.apply(this, arguments);
    },

    sortedIndex: function (model, value, context) {
      value || (value = this.comparator);
      var iterator = _.isFunction(value) ? value : function(model) {
        return model.get(value);
      };
      return _.sortedIndex(this.models, model, iterator, context);
    }

  });

  // Underscore methods that we want to implement on the Collection.
  var methods = ['forEach', 'each', 'map', 'collect', 'reduce', 'foldl',
    'inject', 'reduceRight', 'foldr', 'find', 'detect', 'filter', 'select',
    'reject', 'every', 'all', 'some', 'any', 'include', 'contains', 'invoke',
    'max', 'min', 'toArray', 'size', 'first', 'head', 'take', 'initial', 'rest',
    'tail', 'drop', 'last', 'without', 'indexOf', 'shuffle', 'lastIndexOf',
    'isEmpty', 'chain'];

  // Mix in each Underscore method as a proxy to `Collection#models`.
  _.each(methods, function(method) {
    Collection.prototype[method] = function() {
      var args = slice.call(arguments);
      args.unshift(this.models);
      return _[method].apply(_, args);
    };
  });

  // Underscore methods that take a property name as an argument.
  var attributeMethods = ['groupBy', 'countBy', 'sortBy'];

  // Use attributes instead of properties.
  _.each(attributeMethods, function(method) {
    Collection.prototype[method] = function(value, context) {
      var iterator = _.isFunction(value) ? value : function(model) {
        return model.get(value);
      };
      return _[method](this.models, iterator, context);
    };
  });

  // Backbone.Router
  // ---------------

  // Routers map faux-URLs to actions, and fire events when routes are
  // matched. Creating a new one sets its `routes` hash, if not set statically.
  var Router = Backbone.Router = function(options) {
    options || (options = {});
    if (options.routes) this.routes = options.routes;
    this._bindRoutes();
    this.initialize.apply(this, arguments);
  };

  // Cached regular expressions for matching named param parts and splatted
  // parts of route strings.
  var optionalParam = /\((.*?)\)/g;
  var namedParam    = /(\(\?)?:\w+/g;
  var splatParam    = /\*\w+/g;
  var escapeRegExp  = /[\-{}\[\]+?.,\\\^$|#\s]/g;

  // Set up all inheritable **Backbone.Router** properties and methods.
  _.extend(Router.prototype, Events, {

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize: function(){},

    // Manually bind a single named route to a callback. For example:
    //
    //     this.route('search/:query/p:num', 'search', function(query, num) {
    //       ...
    //     });
    //
    route: function(route, name, callback) {
      if (!_.isRegExp(route)) route = this._routeToRegExp(route);
      if (!callback) callback = this[name];
      Backbone.history.route(route, _.bind(function(fragment) {
        var args = this._extractParameters(route, fragment);
        callback && callback.apply(this, args);
        this.trigger.apply(this, ['route:' + name].concat(args));
        this.trigger('route', name, args);
        Backbone.history.trigger('route', this, name, args);
      }, this));
      return this;
    },

    // Simple proxy to `Backbone.history` to save a fragment into the history.
    navigate: function(fragment, options) {
      Backbone.history.navigate(fragment, options);
      return this;
    },

    // Bind all defined routes to `Backbone.history`. We have to reverse the
    // order of the routes here to support behavior where the most general
    // routes can be defined at the bottom of the route map.
    _bindRoutes: function() {
      if (!this.routes) return;
      var route, routes = _.keys(this.routes);
      while ((route = routes.pop()) != null) {
        this.route(route, this.routes[route]);
      }
    },

    // Convert a route string into a regular expression, suitable for matching
    // against the current location hash.
    _routeToRegExp: function(route) {
      route = route.replace(escapeRegExp, '\\$&')
                   .replace(optionalParam, '(?:$1)?')
                   .replace(namedParam, function(match, optional){
                     return optional ? match : '([^\/]+)';
                   })
                   .replace(splatParam, '(.*?)');
      return new RegExp('^' + route + '$');
    },

    // Given a route, and a URL fragment that it matches, return the array of
    // extracted parameters.
    _extractParameters: function(route, fragment) {
      return route.exec(fragment).slice(1);
    }

  });

  // Backbone.History
  // ----------------

  // Handles cross-browser history management, based on URL fragments. If the
  // browser does not support `onhashchange`, falls back to polling.
  var History = Backbone.History = function() {
    this.handlers = [];
    _.bindAll(this, 'checkUrl');

    // Ensure that `History` can be used outside of the browser.
    if (typeof window !== 'undefined') {
      this.location = window.location;
      this.history = window.history;
    }
  };

  // Cached regex for stripping a leading hash/slash and trailing space.
  var routeStripper = /^[#\/]|\s+$/g;

  // Cached regex for stripping leading and trailing slashes.
  var rootStripper = /^\/+|\/+$/g;

  // Cached regex for detecting MSIE.
  var isExplorer = /msie [\w.]+/;

  // Cached regex for removing a trailing slash.
  var trailingSlash = /\/$/;

  // Has the history handling already been started?
  History.started = false;

  // Set up all inheritable **Backbone.History** properties and methods.
  _.extend(History.prototype, Events, {

    // The default interval to poll for hash changes, if necessary, is
    // twenty times a second.
    interval: 50,

    // Gets the true hash value. Cannot use location.hash directly due to bug
    // in Firefox where location.hash will always be decoded.
    getHash: function(window) {
      var match = (window || this).location.href.match(/#(.*)$/);
      return match ? match[1] : '';
    },

    // Get the cross-browser normalized URL fragment, either from the URL,
    // the hash, or the override.
    getFragment: function(fragment, forcePushState) {
      if (fragment == null) {
        if (this._hasPushState || !this._wantsHashChange || forcePushState) {
          fragment = this.location.pathname;
          var root = this.root.replace(trailingSlash, '');
          if (!fragment.indexOf(root)) fragment = fragment.substr(root.length);
        } else {
          fragment = this.getHash();
        }
      }
      return fragment.replace(routeStripper, '');
    },

    // Start the hash change handling, returning `true` if the current URL matches
    // an existing route, and `false` otherwise.
    start: function(options) {
      if (History.started) throw new Error("Backbone.history has already been started");
      History.started = true;

      // Figure out the initial configuration. Do we need an iframe?
      // Is pushState desired ... is it available?
      this.options          = _.extend({}, {root: '/'}, this.options, options);
      this.root             = this.options.root;
      this._wantsHashChange = this.options.hashChange !== false;
      this._wantsPushState  = !!this.options.pushState;
      this._hasPushState    = !!(this.options.pushState && this.history && this.history.pushState);
      var fragment          = this.getFragment();
      var docMode           = document.documentMode;
      var oldIE             = (isExplorer.exec(navigator.userAgent.toLowerCase()) && (!docMode || docMode <= 7));

      // Normalize root to always include a leading and trailing slash.
      this.root = ('/' + this.root + '/').replace(rootStripper, '/');

      if (oldIE && this._wantsHashChange) {
        this.iframe = Backbone.$('<iframe src="javascript:0" tabindex="-1" />').hide().appendTo('body')[0].contentWindow;
        this.navigate(fragment);
      }

      // Depending on whether we're using pushState or hashes, and whether
      // 'onhashchange' is supported, determine how we check the URL state.
      if (this._hasPushState) {
        Backbone.$(window).on('popstate', this.checkUrl);
      } else if (this._wantsHashChange && ('onhashchange' in window) && !oldIE) {
        Backbone.$(window).on('hashchange', this.checkUrl);
      } else if (this._wantsHashChange) {
        this._checkUrlInterval = setInterval(this.checkUrl, this.interval);
      }

      // Determine if we need to change the base url, for a pushState link
      // opened by a non-pushState browser.
      this.fragment = fragment;
      var loc = this.location;
      var atRoot = loc.pathname.replace(/[^\/]$/, '$&/') === this.root;

      // If we've started off with a route from a `pushState`-enabled browser,
      // but we're currently in a browser that doesn't support it...
      if (this._wantsHashChange && this._wantsPushState && !this._hasPushState && !atRoot) {
        this.fragment = this.getFragment(null, true);
        this.location.replace(this.root + this.location.search + '#' + this.fragment);
        // Return immediately as browser will do redirect to new url
        return true;

      // Or if we've started out with a hash-based route, but we're currently
      // in a browser where it could be `pushState`-based instead...
      } else if (this._wantsPushState && this._hasPushState && atRoot && loc.hash) {
        this.fragment = this.getHash().replace(routeStripper, '');
        this.history.replaceState({}, document.title, this.root + this.fragment + loc.search);
      }

      if (!this.options.silent) return this.loadUrl();
    },

    // Disable Backbone.history, perhaps temporarily. Not useful in a real app,
    // but possibly useful for unit testing Routers.
    stop: function() {
      Backbone.$(window).off('popstate', this.checkUrl).off('hashchange', this.checkUrl);
      clearInterval(this._checkUrlInterval);
      History.started = false;
    },

    // Add a route to be tested when the fragment changes. Routes added later
    // may override previous routes.
    route: function(route, callback) {
      this.handlers.unshift({route: route, callback: callback});
    },

    // Checks the current URL to see if it has changed, and if it has,
    // calls `loadUrl`, normalizing across the hidden iframe.
    checkUrl: function(e) {
      var current = this.getFragment();
      if (current === this.fragment && this.iframe) {
        current = this.getFragment(this.getHash(this.iframe));
      }
      if (current === this.fragment) return false;
      if (this.iframe) this.navigate(current);
      this.loadUrl() || this.loadUrl(this.getHash());
    },

    // Attempt to load the current URL fragment. If a route succeeds with a
    // match, returns `true`. If no defined routes matches the fragment,
    // returns `false`.
    loadUrl: function(fragmentOverride) {
      var fragment = this.fragment = this.getFragment(fragmentOverride);
      var matched = _.any(this.handlers, function(handler) {
        if (handler.route.test(fragment)) {
          handler.callback(fragment);
          return true;
        }
      });
      return matched;
    },

    // Save a fragment into the hash history, or replace the URL state if the
    // 'replace' option is passed. You are responsible for properly URL-encoding
    // the fragment in advance.
    //
    // The options object can contain `trigger: true` if you wish to have the
    // route callback be fired (not usually desirable), or `replace: true`, if
    // you wish to modify the current URL without adding an entry to the history.
    navigate: function(fragment, options) {
      if (!History.started) return false;
      if (!options || options === true) options = {trigger: options};
      fragment = this.getFragment(fragment || '');
      if (this.fragment === fragment) return;
      this.fragment = fragment;
      var url = this.root + fragment;

      // If pushState is available, we use it to set the fragment as a real URL.
      if (this._hasPushState) {
        this.history[options.replace ? 'replaceState' : 'pushState']({}, document.title, url);

      // If hash changes haven't been explicitly disabled, update the hash
      // fragment to store history.
      } else if (this._wantsHashChange) {
        this._updateHash(this.location, fragment, options.replace);
        if (this.iframe && (fragment !== this.getFragment(this.getHash(this.iframe)))) {
          // Opening and closing the iframe tricks IE7 and earlier to push a
          // history entry on hash-tag change.  When replace is true, we don't
          // want this.
          if(!options.replace) this.iframe.document.open().close();
          this._updateHash(this.iframe.location, fragment, options.replace);
        }

      // If you've told us that you explicitly don't want fallback hashchange-
      // based history, then `navigate` becomes a page refresh.
      } else {
        return this.location.assign(url);
      }
      if (options.trigger) this.loadUrl(fragment);
    },

    // Update the hash location, either replacing the current entry, or adding
    // a new one to the browser history.
    _updateHash: function(location, fragment, replace) {
      if (replace) {
        var href = location.href.replace(/(javascript:|#).*$/, '');
        location.replace(href + '#' + fragment);
      } else {
        // Some browsers require that `hash` contains a leading #.
        location.hash = '#' + fragment;
      }
    }

  });

  // Create the default Backbone.history.
  Backbone.history = new History;

  // Backbone.View
  // -------------

  // Creating a Backbone.View creates its initial element outside of the DOM,
  // if an existing element is not provided...
  var View = Backbone.View = function(options) {
    this.cid = _.uniqueId('view');
    this._configure(options || {});
    this._ensureElement();
    this.initialize.apply(this, arguments);
    this.delegateEvents();
  };

  // Cached regex to split keys for `delegate`.
  var delegateEventSplitter = /^(\S+)\s*(.*)$/;

  // List of view options to be merged as properties.
  var viewOptions = ['model', 'collection', 'el', 'id', 'attributes', 'className', 'tagName', 'events'];

  // Set up all inheritable **Backbone.View** properties and methods.
  _.extend(View.prototype, Events, {

    // The default `tagName` of a View's element is `"div"`.
    tagName: 'div',

    // jQuery delegate for element lookup, scoped to DOM elements within the
    // current view. This should be prefered to global lookups where possible.
    $: function(selector) {
      return this.$el.find(selector);
    },

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize: function(){},

    // **render** is the core function that your view should override, in order
    // to populate its element (`this.el`), with the appropriate HTML. The
    // convention is for **render** to always return `this`.
    render: function() {
      return this;
    },

    // Remove this view by taking the element out of the DOM, and removing any
    // applicable Backbone.Events listeners.
    remove: function() {
      this.$el.remove();
      this.stopListening();
      return this;
    },

    // Change the view's element (`this.el` property), including event
    // re-delegation.
    setElement: function(element, delegate) {
      if (this.$el) this.undelegateEvents();
      this.$el = element instanceof Backbone.$ ? element : Backbone.$(element);
      this.el = this.$el[0];
      if (delegate !== false) this.delegateEvents();
      return this;
    },

    // Set callbacks, where `this.events` is a hash of
    //
    // *{"event selector": "callback"}*
    //
    //     {
    //       'mousedown .title':  'edit',
    //       'click .button':     'save'
    //       'click .open':       function(e) { ... }
    //     }
    //
    // pairs. Callbacks will be bound to the view, with `this` set properly.
    // Uses event delegation for efficiency.
    // Omitting the selector binds the event to `this.el`.
    // This only works for delegate-able events: not `focus`, `blur`, and
    // not `change`, `submit`, and `reset` in Internet Explorer.
    delegateEvents: function(events) {
      if (!(events || (events = _.result(this, 'events')))) return;
      this.undelegateEvents();
      for (var key in events) {
        var method = events[key];
        if (!_.isFunction(method)) method = this[events[key]];
        if (!method) throw new Error('Method "' + events[key] + '" does not exist');
        var match = key.match(delegateEventSplitter);
        var eventName = match[1], selector = match[2];
        method = _.bind(method, this);
        eventName += '.delegateEvents' + this.cid;
        if (selector === '') {
          this.$el.on(eventName, method);
        } else {
          this.$el.on(eventName, selector, method);
        }
      }
    },

    // Clears all callbacks previously bound to the view with `delegateEvents`.
    // You usually don't need to use this, but may wish to if you have multiple
    // Backbone views attached to the same DOM element.
    undelegateEvents: function() {
      this.$el.off('.delegateEvents' + this.cid);
    },

    // Performs the initial configuration of a View with a set of options.
    // Keys with special meaning *(model, collection, id, className)*, are
    // attached directly to the view.
    _configure: function(options) {
      if (this.options) options = _.extend({}, _.result(this, 'options'), options);
      _.extend(this, _.pick(options, viewOptions));
      this.options = options;
    },

    // Ensure that the View has a DOM element to render into.
    // If `this.el` is a string, pass it through `$()`, take the first
    // matching element, and re-assign it to `el`. Otherwise, create
    // an element from the `id`, `className` and `tagName` properties.
    _ensureElement: function() {
      if (!this.el) {
        var attrs = _.extend({}, _.result(this, 'attributes'));
        if (this.id) attrs.id = _.result(this, 'id');
        if (this.className) attrs['class'] = _.result(this, 'className');
        var $el = Backbone.$('<' + _.result(this, 'tagName') + '>').attr(attrs);
        this.setElement($el, false);
      } else {
        this.setElement(_.result(this, 'el'), false);
      }
    }

  });

  // Backbone.sync
  // -------------

  // Map from CRUD to HTTP for our default `Backbone.sync` implementation.
  var methodMap = {
    'create': 'POST',
    'update': 'PUT',
    'patch':  'PATCH',
    'delete': 'DELETE',
    'read':   'GET'
  };

  // Override this function to change the manner in which Backbone persists
  // models to the server. You will be passed the type of request, and the
  // model in question. By default, makes a RESTful Ajax request
  // to the model's `url()`. Some possible customizations could be:
  //
  // * Use `setTimeout` to batch rapid-fire updates into a single request.
  // * Send up the models as XML instead of JSON.
  // * Persist models via WebSockets instead of Ajax.
  //
  // Turn on `Backbone.emulateHTTP` in order to send `PUT` and `DELETE` requests
  // as `POST`, with a `_method` parameter containing the true HTTP method,
  // as well as all requests with the body as `application/x-www-form-urlencoded`
  // instead of `application/json` with the model in a param named `model`.
  // Useful when interfacing with server-side languages like **PHP** that make
  // it difficult to read the body of `PUT` requests.
  Backbone.sync = function(method, model, options) {
    var type = methodMap[method];

    // Default options, unless specified.
    _.defaults(options || (options = {}), {
      emulateHTTP: Backbone.emulateHTTP,
      emulateJSON: Backbone.emulateJSON
    });

    // Default JSON-request options.
    var params = {type: type, dataType: 'json'};

    // Ensure that we have a URL.
    if (!options.url) {
      params.url = _.result(model, 'url') || urlError();
    }

    // Ensure that we have the appropriate request data.
    if (options.data == null && model && (method === 'create' || method === 'update' || method === 'patch')) {
      params.contentType = 'application/json';
      params.data = JSON.stringify(options.attrs || model.toJSON(options));
    }

    // For older servers, emulate JSON by encoding the request into an HTML-form.
    if (options.emulateJSON) {
      params.contentType = 'application/x-www-form-urlencoded';
      params.data = params.data ? {model: params.data} : {};
    }

    // For older servers, emulate HTTP by mimicking the HTTP method with `_method`
    // And an `X-HTTP-Method-Override` header.
    if (options.emulateHTTP && (type === 'PUT' || type === 'DELETE' || type === 'PATCH')) {
      params.type = 'POST';
      if (options.emulateJSON) params.data._method = type;
      var beforeSend = options.beforeSend;
      options.beforeSend = function(xhr) {
        xhr.setRequestHeader('X-HTTP-Method-Override', type);
        if (beforeSend) return beforeSend.apply(this, arguments);
      };
    }

    // Don't process data on a non-GET request.
    if (params.type !== 'GET' && !options.emulateJSON) {
      params.processData = false;
    }

    var success = options.success;
    options.success = function(resp) {
      if (success) success(model, resp, options);
      model.trigger('sync', model, resp, options);
    };

    var error = options.error;
    options.error = function(xhr) {
      if (error) error(model, xhr, options);
      model.trigger('error', model, xhr, options);
    };

    // Make the request, allowing the user to override any Ajax options.
    var xhr = options.xhr = Backbone.ajax(_.extend(params, options));
    model.trigger('request', model, xhr, options);
    return xhr;
  };

  // Set the default implementation of `Backbone.ajax` to proxy through to `$`.
  Backbone.ajax = function() {
    return Backbone.$.ajax.apply(Backbone.$, arguments);
  };

  // Helpers
  // -------

  // Helper function to correctly set up the prototype chain, for subclasses.
  // Similar to `goog.inherits`, but uses a hash of prototype properties and
  // class properties to be extended.
  var extend = function(protoProps, staticProps) {
    var parent = this;
    var child;

    // The constructor function for the new subclass is either defined by you
    // (the "constructor" property in your `extend` definition), or defaulted
    // by us to simply call the parent's constructor.
    if (protoProps && _.has(protoProps, 'constructor')) {
      child = protoProps.constructor;
    } else {
      child = function(){ return parent.apply(this, arguments); };
    }

    // Add static properties to the constructor function, if supplied.
    _.extend(child, parent, staticProps);

    // Set the prototype chain to inherit from `parent`, without calling
    // `parent`'s constructor function.
    var Surrogate = function(){ this.constructor = child; };
    Surrogate.prototype = parent.prototype;
    child.prototype = new Surrogate;

    // Add prototype properties (instance properties) to the subclass,
    // if supplied.
    if (protoProps) _.extend(child.prototype, protoProps);

    // Set a convenience property in case the parent's prototype is needed
    // later.
    child.__super__ = parent.prototype;

    return child;
  };

  // Set up inheritance for the model, collection, router, view and history.
  Model.extend = Collection.extend = Router.extend = View.extend = History.extend = extend;

  // Throw an error when a URL is needed, and none is supplied.
  var urlError = function() {
    throw new Error('A "url" property or function must be specified');
  };

}).call(this);

define("backbone", ["underscore","jquery"], (function (global) {
    return function () {
        var ret, fn;
        return ret || global.Backbone;
    };
}(this)));


define('touchscroll',['jquery'], function touchscroll($) {
	// From https://github.com/filamentgroup/Overthrow

	overflowProbablyAlreadyWorks = 
		// Features-first. iOS5 overflow scrolling property check - no UA needed here. thanks Apple :)
		"WebkitOverflowScrolling" in document.documentElement.style ||
		// Touch events aren't supported and screen width is greater than X
		// ...basically, this is a loose "desktop browser" check. 
		// It may wrongly opt-in very large tablets with no touch support.
		( "ontouchmove" in document && window.screen.width > 1200 );

		/* Android is still flakey so ignore it for now

		||
		

		// Hang on to your hats.
		// Whitelist some popular, overflow-supporting mobile browsers for now and the future
		// These browsers are known to get overlow support right, but give us no way of detecting it.
		(function(){
			var ua = window.navigator.userAgent,
				// Webkit crosses platforms, and the browsers on our list run at least version 534
				webkit = ua.match( /AppleWebKit\/([0-9]+)/ ),
				wkversion = webkit && webkit[1],
				wkLte534 = webkit && wkversion >= 534;

			return (
				// Android 3+ with webkit gte 534
				// ~: Mozilla/5.0 (Linux; U; Android 3.0; en-us; Xoom Build/HRI39) AppleWebKit/534.13 (KHTML, like Gecko) Version/4.0 Safari/534.13
				ua.match( /Android ([0-9]+)/ ) && RegExp.$1 >= 3 && wkLte534
			)

			

		})(); */

	return {
  /* Disable overflow touch for now beacuse of issues with touch events during fling
   * Touches cause events to fire on wrong element adding things to basket that the user
   * does not expect. Swapping to iScroll */
		available: $.browser.ie //overflowProbablyAlreadyWorks
	};

});
//! moment.js
//! version : 2.4.0
//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
//! license : MIT
//! momentjs.com

(function (undefined) {

    /************************************
        Constants
    ************************************/

    var moment,
        VERSION = "2.4.0",
        global = this,
        round = Math.round,
        i,

        YEAR = 0,
        MONTH = 1,
        DATE = 2,
        HOUR = 3,
        MINUTE = 4,
        SECOND = 5,
        MILLISECOND = 6,

        // internal storage for language config files
        languages = {},

        // check for nodeJS
        hasModule = (typeof module !== 'undefined' && module.exports && typeof require !== 'undefined'),

        // ASP.NET json date format regex
        aspNetJsonRegex = /^\/?Date\((\-?\d+)/i,
        aspNetTimeSpanJsonRegex = /(\-)?(?:(\d*)\.)?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?)?/,

        // from http://docs.closure-library.googlecode.com/git/closure_goog_date_date.js.source.html
        // somewhat more in line with 4.4.3.2 2004 spec, but allows decimal anywhere
        isoDurationRegex = /^(-)?P(?:(?:([0-9,.]*)Y)?(?:([0-9,.]*)M)?(?:([0-9,.]*)D)?(?:T(?:([0-9,.]*)H)?(?:([0-9,.]*)M)?(?:([0-9,.]*)S)?)?|([0-9,.]*)W)$/,

        // format tokens
        formattingTokens = /(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|S{1,4}|X|zz?|ZZ?|.)/g,
        localFormattingTokens = /(\[[^\[]*\])|(\\)?(LT|LL?L?L?|l{1,4})/g,

        // parsing token regexes
        parseTokenOneOrTwoDigits = /\d\d?/, // 0 - 99
        parseTokenOneToThreeDigits = /\d{1,3}/, // 0 - 999
        parseTokenThreeDigits = /\d{3}/, // 000 - 999
        parseTokenFourDigits = /\d{1,4}/, // 0 - 9999
        parseTokenSixDigits = /[+\-]?\d{1,6}/, // -999,999 - 999,999
        parseTokenDigits = /\d+/, // nonzero number of digits
        parseTokenWord = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i, // any word (or two) characters or numbers including two/three word month in arabic.
        parseTokenTimezone = /Z|[\+\-]\d\d:?\d\d/i, // +00:00 -00:00 +0000 -0000 or Z
        parseTokenT = /T/i, // T (ISO separator)
        parseTokenTimestampMs = /[\+\-]?\d+(\.\d{1,3})?/, // 123456789 123456789.123

        // preliminary iso regex
        // 0000-00-00 0000-W00 or 0000-W00-0 + T + 00 or 00:00 or 00:00:00 or 00:00:00.000 + +00:00 or +0000)
        isoRegex = /^\s*\d{4}-(?:(\d\d-\d\d)|(W\d\d$)|(W\d\d-\d)|(\d\d\d))((T| )(\d\d(:\d\d(:\d\d(\.\d+)?)?)?)?([\+\-]\d\d:?\d\d|Z)?)?$/,

        isoFormat = 'YYYY-MM-DDTHH:mm:ssZ',

        isoDates = [
            'YYYY-MM-DD',
            'GGGG-[W]WW',
            'GGGG-[W]WW-E',
            'YYYY-DDD'
        ],

        // iso time formats and regexes
        isoTimes = [
            ['HH:mm:ss.SSSS', /(T| )\d\d:\d\d:\d\d\.\d{1,3}/],
            ['HH:mm:ss', /(T| )\d\d:\d\d:\d\d/],
            ['HH:mm', /(T| )\d\d:\d\d/],
            ['HH', /(T| )\d\d/]
        ],

        // timezone chunker "+10:00" > ["10", "00"] or "-1530" > ["-15", "30"]
        parseTimezoneChunker = /([\+\-]|\d\d)/gi,

        // getter and setter names
        proxyGettersAndSetters = 'Date|Hours|Minutes|Seconds|Milliseconds'.split('|'),
        unitMillisecondFactors = {
            'Milliseconds' : 1,
            'Seconds' : 1e3,
            'Minutes' : 6e4,
            'Hours' : 36e5,
            'Days' : 864e5,
            'Months' : 2592e6,
            'Years' : 31536e6
        },

        unitAliases = {
            ms : 'millisecond',
            s : 'second',
            m : 'minute',
            h : 'hour',
            d : 'day',
            D : 'date',
            w : 'week',
            W : 'isoWeek',
            M : 'month',
            y : 'year',
            DDD : 'dayOfYear',
            e : 'weekday',
            E : 'isoWeekday',
            gg: 'weekYear',
            GG: 'isoWeekYear'
        },

        camelFunctions = {
            dayofyear : 'dayOfYear',
            isoweekday : 'isoWeekday',
            isoweek : 'isoWeek',
            weekyear : 'weekYear',
            isoweekyear : 'isoWeekYear'
        },

        // format function strings
        formatFunctions = {},

        // tokens to ordinalize and pad
        ordinalizeTokens = 'DDD w W M D d'.split(' '),
        paddedTokens = 'M D H h m s w W'.split(' '),

        formatTokenFunctions = {
            M    : function () {
                return this.month() + 1;
            },
            MMM  : function (format) {
                return this.lang().monthsShort(this, format);
            },
            MMMM : function (format) {
                return this.lang().months(this, format);
            },
            D    : function () {
                return this.date();
            },
            DDD  : function () {
                return this.dayOfYear();
            },
            d    : function () {
                return this.day();
            },
            dd   : function (format) {
                return this.lang().weekdaysMin(this, format);
            },
            ddd  : function (format) {
                return this.lang().weekdaysShort(this, format);
            },
            dddd : function (format) {
                return this.lang().weekdays(this, format);
            },
            w    : function () {
                return this.week();
            },
            W    : function () {
                return this.isoWeek();
            },
            YY   : function () {
                return leftZeroFill(this.year() % 100, 2);
            },
            YYYY : function () {
                return leftZeroFill(this.year(), 4);
            },
            YYYYY : function () {
                return leftZeroFill(this.year(), 5);
            },
            gg   : function () {
                return leftZeroFill(this.weekYear() % 100, 2);
            },
            gggg : function () {
                return this.weekYear();
            },
            ggggg : function () {
                return leftZeroFill(this.weekYear(), 5);
            },
            GG   : function () {
                return leftZeroFill(this.isoWeekYear() % 100, 2);
            },
            GGGG : function () {
                return this.isoWeekYear();
            },
            GGGGG : function () {
                return leftZeroFill(this.isoWeekYear(), 5);
            },
            e : function () {
                return this.weekday();
            },
            E : function () {
                return this.isoWeekday();
            },
            a    : function () {
                return this.lang().meridiem(this.hours(), this.minutes(), true);
            },
            A    : function () {
                return this.lang().meridiem(this.hours(), this.minutes(), false);
            },
            H    : function () {
                return this.hours();
            },
            h    : function () {
                return this.hours() % 12 || 12;
            },
            m    : function () {
                return this.minutes();
            },
            s    : function () {
                return this.seconds();
            },
            S    : function () {
                return toInt(this.milliseconds() / 100);
            },
            SS   : function () {
                return leftZeroFill(toInt(this.milliseconds() / 10), 2);
            },
            SSS  : function () {
                return leftZeroFill(this.milliseconds(), 3);
            },
            SSSS : function () {
                return leftZeroFill(this.milliseconds(), 3);
            },
            Z    : function () {
                var a = -this.zone(),
                    b = "+";
                if (a < 0) {
                    a = -a;
                    b = "-";
                }
                return b + leftZeroFill(toInt(a / 60), 2) + ":" + leftZeroFill(toInt(a) % 60, 2);
            },
            ZZ   : function () {
                var a = -this.zone(),
                    b = "+";
                if (a < 0) {
                    a = -a;
                    b = "-";
                }
                return b + leftZeroFill(toInt(10 * a / 6), 4);
            },
            z : function () {
                return this.zoneAbbr();
            },
            zz : function () {
                return this.zoneName();
            },
            X    : function () {
                return this.unix();
            }
        },

        lists = ['months', 'monthsShort', 'weekdays', 'weekdaysShort', 'weekdaysMin'];

    function padToken(func, count) {
        return function (a) {
            return leftZeroFill(func.call(this, a), count);
        };
    }
    function ordinalizeToken(func, period) {
        return function (a) {
            return this.lang().ordinal(func.call(this, a), period);
        };
    }

    while (ordinalizeTokens.length) {
        i = ordinalizeTokens.pop();
        formatTokenFunctions[i + 'o'] = ordinalizeToken(formatTokenFunctions[i], i);
    }
    while (paddedTokens.length) {
        i = paddedTokens.pop();
        formatTokenFunctions[i + i] = padToken(formatTokenFunctions[i], 2);
    }
    formatTokenFunctions.DDDD = padToken(formatTokenFunctions.DDD, 3);


    /************************************
        Constructors
    ************************************/

    function Language() {

    }

    // Moment prototype object
    function Moment(config) {
        checkOverflow(config);
        extend(this, config);
    }

    // Duration Constructor
    function Duration(duration) {
        var normalizedInput = normalizeObjectUnits(duration),
            years = normalizedInput.year || 0,
            months = normalizedInput.month || 0,
            weeks = normalizedInput.week || 0,
            days = normalizedInput.day || 0,
            hours = normalizedInput.hour || 0,
            minutes = normalizedInput.minute || 0,
            seconds = normalizedInput.second || 0,
            milliseconds = normalizedInput.millisecond || 0;

        // representation for dateAddRemove
        this._milliseconds = +milliseconds +
            seconds * 1e3 + // 1000
            minutes * 6e4 + // 1000 * 60
            hours * 36e5; // 1000 * 60 * 60
        // Because of dateAddRemove treats 24 hours as different from a
        // day when working around DST, we need to store them separately
        this._days = +days +
            weeks * 7;
        // It is impossible translate months into days without knowing
        // which months you are are talking about, so we have to store
        // it separately.
        this._months = +months +
            years * 12;

        this._data = {};

        this._bubble();
    }

    /************************************
        Helpers
    ************************************/


    function extend(a, b) {
        for (var i in b) {
            if (b.hasOwnProperty(i)) {
                a[i] = b[i];
            }
        }

        if (b.hasOwnProperty("toString")) {
            a.toString = b.toString;
        }

        if (b.hasOwnProperty("valueOf")) {
            a.valueOf = b.valueOf;
        }

        return a;
    }

    function absRound(number) {
        if (number < 0) {
            return Math.ceil(number);
        } else {
            return Math.floor(number);
        }
    }

    // left zero fill a number
    // see http://jsperf.com/left-zero-filling for performance comparison
    function leftZeroFill(number, targetLength) {
        var output = number + '';
        while (output.length < targetLength) {
            output = '0' + output;
        }
        return output;
    }

    // helper function for _.addTime and _.subtractTime
    function addOrSubtractDurationFromMoment(mom, duration, isAdding, ignoreUpdateOffset) {
        var milliseconds = duration._milliseconds,
            days = duration._days,
            months = duration._months,
            minutes,
            hours;

        if (milliseconds) {
            mom._d.setTime(+mom._d + milliseconds * isAdding);
        }
        // store the minutes and hours so we can restore them
        if (days || months) {
            minutes = mom.minute();
            hours = mom.hour();
        }
        if (days) {
            mom.date(mom.date() + days * isAdding);
        }
        if (months) {
            mom.month(mom.month() + months * isAdding);
        }
        if (milliseconds && !ignoreUpdateOffset) {
            moment.updateOffset(mom);
        }
        // restore the minutes and hours after possibly changing dst
        if (days || months) {
            mom.minute(minutes);
            mom.hour(hours);
        }
    }

    // check if is an array
    function isArray(input) {
        return Object.prototype.toString.call(input) === '[object Array]';
    }

    function isDate(input) {
        return  Object.prototype.toString.call(input) === '[object Date]' ||
                input instanceof Date;
    }

    // compare two arrays, return the number of differences
    function compareArrays(array1, array2, dontConvert) {
        var len = Math.min(array1.length, array2.length),
            lengthDiff = Math.abs(array1.length - array2.length),
            diffs = 0,
            i;
        for (i = 0; i < len; i++) {
            if ((dontConvert && array1[i] !== array2[i]) ||
                (!dontConvert && toInt(array1[i]) !== toInt(array2[i]))) {
                diffs++;
            }
        }
        return diffs + lengthDiff;
    }

    function normalizeUnits(units) {
        if (units) {
            var lowered = units.toLowerCase().replace(/(.)s$/, '$1');
            units = unitAliases[units] || camelFunctions[lowered] || lowered;
        }
        return units;
    }

    function normalizeObjectUnits(inputObject) {
        var normalizedInput = {},
            normalizedProp,
            prop,
            index;

        for (prop in inputObject) {
            if (inputObject.hasOwnProperty(prop)) {
                normalizedProp = normalizeUnits(prop);
                if (normalizedProp) {
                    normalizedInput[normalizedProp] = inputObject[prop];
                }
            }
        }

        return normalizedInput;
    }

    function makeList(field) {
        var count, setter;

        if (field.indexOf('week') === 0) {
            count = 7;
            setter = 'day';
        }
        else if (field.indexOf('month') === 0) {
            count = 12;
            setter = 'month';
        }
        else {
            return;
        }

        moment[field] = function (format, index) {
            var i, getter,
                method = moment.fn._lang[field],
                results = [];

            if (typeof format === 'number') {
                index = format;
                format = undefined;
            }

            getter = function (i) {
                var m = moment().utc().set(setter, i);
                return method.call(moment.fn._lang, m, format || '');
            };

            if (index != null) {
                return getter(index);
            }
            else {
                for (i = 0; i < count; i++) {
                    results.push(getter(i));
                }
                return results;
            }
        };
    }

    function toInt(argumentForCoercion) {
        var coercedNumber = +argumentForCoercion,
            value = 0;

        if (coercedNumber !== 0 && isFinite(coercedNumber)) {
            if (coercedNumber >= 0) {
                value = Math.floor(coercedNumber);
            } else {
                value = Math.ceil(coercedNumber);
            }
        }

        return value;
    }

    function daysInMonth(year, month) {
        return new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
    }

    function daysInYear(year) {
        return isLeapYear(year) ? 366 : 365;
    }

    function isLeapYear(year) {
        return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    }

    function checkOverflow(m) {
        var overflow;
        if (m._a && m._pf.overflow === -2) {
            overflow =
                m._a[MONTH] < 0 || m._a[MONTH] > 11 ? MONTH :
                m._a[DATE] < 1 || m._a[DATE] > daysInMonth(m._a[YEAR], m._a[MONTH]) ? DATE :
                m._a[HOUR] < 0 || m._a[HOUR] > 23 ? HOUR :
                m._a[MINUTE] < 0 || m._a[MINUTE] > 59 ? MINUTE :
                m._a[SECOND] < 0 || m._a[SECOND] > 59 ? SECOND :
                m._a[MILLISECOND] < 0 || m._a[MILLISECOND] > 999 ? MILLISECOND :
                -1;

            if (m._pf._overflowDayOfYear && (overflow < YEAR || overflow > DATE)) {
                overflow = DATE;
            }

            m._pf.overflow = overflow;
        }
    }

    function initializeParsingFlags(config) {
        config._pf = {
            empty : false,
            unusedTokens : [],
            unusedInput : [],
            overflow : -2,
            charsLeftOver : 0,
            nullInput : false,
            invalidMonth : null,
            invalidFormat : false,
            userInvalidated : false,
            iso: false
        };
    }

    function isValid(m) {
        if (m._isValid == null) {
            m._isValid = !isNaN(m._d.getTime()) &&
                m._pf.overflow < 0 &&
                !m._pf.empty &&
                !m._pf.invalidMonth &&
                !m._pf.nullInput &&
                !m._pf.invalidFormat &&
                !m._pf.userInvalidated;

            if (m._strict) {
                m._isValid = m._isValid &&
                    m._pf.charsLeftOver === 0 &&
                    m._pf.unusedTokens.length === 0;
            }
        }
        return m._isValid;
    }

    function normalizeLanguage(key) {
        return key ? key.toLowerCase().replace('_', '-') : key;
    }

    /************************************
        Languages
    ************************************/


    extend(Language.prototype, {

        set : function (config) {
            var prop, i;
            for (i in config) {
                prop = config[i];
                if (typeof prop === 'function') {
                    this[i] = prop;
                } else {
                    this['_' + i] = prop;
                }
            }
        },

        _months : "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
        months : function (m) {
            return this._months[m.month()];
        },

        _monthsShort : "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
        monthsShort : function (m) {
            return this._monthsShort[m.month()];
        },

        monthsParse : function (monthName) {
            var i, mom, regex;

            if (!this._monthsParse) {
                this._monthsParse = [];
            }

            for (i = 0; i < 12; i++) {
                // make the regex if we don't have it already
                if (!this._monthsParse[i]) {
                    mom = moment.utc([2000, i]);
                    regex = '^' + this.months(mom, '') + '|^' + this.monthsShort(mom, '');
                    this._monthsParse[i] = new RegExp(regex.replace('.', ''), 'i');
                }
                // test the regex
                if (this._monthsParse[i].test(monthName)) {
                    return i;
                }
            }
        },

        _weekdays : "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
        weekdays : function (m) {
            return this._weekdays[m.day()];
        },

        _weekdaysShort : "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
        weekdaysShort : function (m) {
            return this._weekdaysShort[m.day()];
        },

        _weekdaysMin : "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
        weekdaysMin : function (m) {
            return this._weekdaysMin[m.day()];
        },

        weekdaysParse : function (weekdayName) {
            var i, mom, regex;

            if (!this._weekdaysParse) {
                this._weekdaysParse = [];
            }

            for (i = 0; i < 7; i++) {
                // make the regex if we don't have it already
                if (!this._weekdaysParse[i]) {
                    mom = moment([2000, 1]).day(i);
                    regex = '^' + this.weekdays(mom, '') + '|^' + this.weekdaysShort(mom, '') + '|^' + this.weekdaysMin(mom, '');
                    this._weekdaysParse[i] = new RegExp(regex.replace('.', ''), 'i');
                }
                // test the regex
                if (this._weekdaysParse[i].test(weekdayName)) {
                    return i;
                }
            }
        },

        _longDateFormat : {
            LT : "h:mm A",
            L : "MM/DD/YYYY",
            LL : "MMMM D YYYY",
            LLL : "MMMM D YYYY LT",
            LLLL : "dddd, MMMM D YYYY LT"
        },
        longDateFormat : function (key) {
            var output = this._longDateFormat[key];
            if (!output && this._longDateFormat[key.toUpperCase()]) {
                output = this._longDateFormat[key.toUpperCase()].replace(/MMMM|MM|DD|dddd/g, function (val) {
                    return val.slice(1);
                });
                this._longDateFormat[key] = output;
            }
            return output;
        },

        isPM : function (input) {
            // IE8 Quirks Mode & IE7 Standards Mode do not allow accessing strings like arrays
            // Using charAt should be more compatible.
            return ((input + '').toLowerCase().charAt(0) === 'p');
        },

        _meridiemParse : /[ap]\.?m?\.?/i,
        meridiem : function (hours, minutes, isLower) {
            if (hours > 11) {
                return isLower ? 'pm' : 'PM';
            } else {
                return isLower ? 'am' : 'AM';
            }
        },

        _calendar : {
            sameDay : '[Today at] LT',
            nextDay : '[Tomorrow at] LT',
            nextWeek : 'dddd [at] LT',
            lastDay : '[Yesterday at] LT',
            lastWeek : '[Last] dddd [at] LT',
            sameElse : 'L'
        },
        calendar : function (key, mom) {
            var output = this._calendar[key];
            return typeof output === 'function' ? output.apply(mom) : output;
        },

        _relativeTime : {
            future : "in %s",
            past : "%s ago",
            s : "a few seconds",
            m : "a minute",
            mm : "%d minutes",
            h : "an hour",
            hh : "%d hours",
            d : "a day",
            dd : "%d days",
            M : "a month",
            MM : "%d months",
            y : "a year",
            yy : "%d years"
        },
        relativeTime : function (number, withoutSuffix, string, isFuture) {
            var output = this._relativeTime[string];
            return (typeof output === 'function') ?
                output(number, withoutSuffix, string, isFuture) :
                output.replace(/%d/i, number);
        },
        pastFuture : function (diff, output) {
            var format = this._relativeTime[diff > 0 ? 'future' : 'past'];
            return typeof format === 'function' ? format(output) : format.replace(/%s/i, output);
        },

        ordinal : function (number) {
            return this._ordinal.replace("%d", number);
        },
        _ordinal : "%d",

        preparse : function (string) {
            return string;
        },

        postformat : function (string) {
            return string;
        },

        week : function (mom) {
            return weekOfYear(mom, this._week.dow, this._week.doy).week;
        },

        _week : {
            dow : 0, // Sunday is the first day of the week.
            doy : 6  // The week that contains Jan 1st is the first week of the year.
        },

        _invalidDate: 'Invalid date',
        invalidDate: function () {
            return this._invalidDate;
        }
    });

    // Loads a language definition into the `languages` cache.  The function
    // takes a key and optionally values.  If not in the browser and no values
    // are provided, it will load the language file module.  As a convenience,
    // this function also returns the language values.
    function loadLang(key, values) {
        values.abbr = key;
        if (!languages[key]) {
            languages[key] = new Language();
        }
        languages[key].set(values);
        return languages[key];
    }

    // Remove a language from the `languages` cache. Mostly useful in tests.
    function unloadLang(key) {
        delete languages[key];
    }

    // Determines which language definition to use and returns it.
    //
    // With no parameters, it will return the global language.  If you
    // pass in a language key, such as 'en', it will return the
    // definition for 'en', so long as 'en' has already been loaded using
    // moment.lang.
    function getLangDefinition(key) {
        var i = 0, j, lang, next, split,
            get = function (k) {
                if (!languages[k] && hasModule) {
                    try {
                        require('./lang/' + k);
                    } catch (e) { }
                }
                return languages[k];
            };

        if (!key) {
            return moment.fn._lang;
        }

        if (!isArray(key)) {
            //short-circuit everything else
            lang = get(key);
            if (lang) {
                return lang;
            }
            key = [key];
        }

        //pick the language from the array
        //try ['en-au', 'en-gb'] as 'en-au', 'en-gb', 'en', as in move through the list trying each
        //substring from most specific to least, but move to the next array item if it's a more specific variant than the current root
        while (i < key.length) {
            split = normalizeLanguage(key[i]).split('-');
            j = split.length;
            next = normalizeLanguage(key[i + 1]);
            next = next ? next.split('-') : null;
            while (j > 0) {
                lang = get(split.slice(0, j).join('-'));
                if (lang) {
                    return lang;
                }
                if (next && next.length >= j && compareArrays(split, next, true) >= j - 1) {
                    //the next array item is better than a shallower substring of this one
                    break;
                }
                j--;
            }
            i++;
        }
        return moment.fn._lang;
    }

    /************************************
        Formatting
    ************************************/


    function removeFormattingTokens(input) {
        if (input.match(/\[[\s\S]/)) {
            return input.replace(/^\[|\]$/g, "");
        }
        return input.replace(/\\/g, "");
    }

    function makeFormatFunction(format) {
        var array = format.match(formattingTokens), i, length;

        for (i = 0, length = array.length; i < length; i++) {
            if (formatTokenFunctions[array[i]]) {
                array[i] = formatTokenFunctions[array[i]];
            } else {
                array[i] = removeFormattingTokens(array[i]);
            }
        }

        return function (mom) {
            var output = "";
            for (i = 0; i < length; i++) {
                output += array[i] instanceof Function ? array[i].call(mom, format) : array[i];
            }
            return output;
        };
    }

    // format date using native date object
    function formatMoment(m, format) {

        if (!m.isValid()) {
            return m.lang().invalidDate();
        }

        format = expandFormat(format, m.lang());

        if (!formatFunctions[format]) {
            formatFunctions[format] = makeFormatFunction(format);
        }

        return formatFunctions[format](m);
    }

    function expandFormat(format, lang) {
        var i = 5;

        function replaceLongDateFormatTokens(input) {
            return lang.longDateFormat(input) || input;
        }

        localFormattingTokens.lastIndex = 0;
        while (i >= 0 && localFormattingTokens.test(format)) {
            format = format.replace(localFormattingTokens, replaceLongDateFormatTokens);
            localFormattingTokens.lastIndex = 0;
            i -= 1;
        }

        return format;
    }


    /************************************
        Parsing
    ************************************/


    // get the regex to find the next token
    function getParseRegexForToken(token, config) {
        var a;
        switch (token) {
        case 'DDDD':
            return parseTokenThreeDigits;
        case 'YYYY':
        case 'GGGG':
        case 'gggg':
            return parseTokenFourDigits;
        case 'YYYYY':
        case 'GGGGG':
        case 'ggggg':
            return parseTokenSixDigits;
        case 'S':
        case 'SS':
        case 'SSS':
        case 'DDD':
            return parseTokenOneToThreeDigits;
        case 'MMM':
        case 'MMMM':
        case 'dd':
        case 'ddd':
        case 'dddd':
            return parseTokenWord;
        case 'a':
        case 'A':
            return getLangDefinition(config._l)._meridiemParse;
        case 'X':
            return parseTokenTimestampMs;
        case 'Z':
        case 'ZZ':
            return parseTokenTimezone;
        case 'T':
            return parseTokenT;
        case 'SSSS':
            return parseTokenDigits;
        case 'MM':
        case 'DD':
        case 'YY':
        case 'GG':
        case 'gg':
        case 'HH':
        case 'hh':
        case 'mm':
        case 'ss':
        case 'M':
        case 'D':
        case 'd':
        case 'H':
        case 'h':
        case 'm':
        case 's':
        case 'w':
        case 'ww':
        case 'W':
        case 'WW':
        case 'e':
        case 'E':
            return parseTokenOneOrTwoDigits;
        default :
            a = new RegExp(regexpEscape(unescapeFormat(token.replace('\\', '')), "i"));
            return a;
        }
    }

    function timezoneMinutesFromString(string) {
        var tzchunk = (parseTokenTimezone.exec(string) || [])[0],
            parts = (tzchunk + '').match(parseTimezoneChunker) || ['-', 0, 0],
            minutes = +(parts[1] * 60) + toInt(parts[2]);

        return parts[0] === '+' ? -minutes : minutes;
    }

    // function to convert string input to date
    function addTimeToArrayFromToken(token, input, config) {
        var a, datePartArray = config._a;

        switch (token) {
        // MONTH
        case 'M' : // fall through to MM
        case 'MM' :
            if (input != null) {
                datePartArray[MONTH] = toInt(input) - 1;
            }
            break;
        case 'MMM' : // fall through to MMMM
        case 'MMMM' :
            a = getLangDefinition(config._l).monthsParse(input);
            // if we didn't find a month name, mark the date as invalid.
            if (a != null) {
                datePartArray[MONTH] = a;
            } else {
                config._pf.invalidMonth = input;
            }
            break;
        // DAY OF MONTH
        case 'D' : // fall through to DD
        case 'DD' :
            if (input != null) {
                datePartArray[DATE] = toInt(input);
            }
            break;
        // DAY OF YEAR
        case 'DDD' : // fall through to DDDD
        case 'DDDD' :
            if (input != null) {
                config._dayOfYear = toInt(input);
            }

            break;
        // YEAR
        case 'YY' :
            datePartArray[YEAR] = toInt(input) + (toInt(input) > 68 ? 1900 : 2000);
            break;
        case 'YYYY' :
        case 'YYYYY' :
            datePartArray[YEAR] = toInt(input);
            break;
        // AM / PM
        case 'a' : // fall through to A
        case 'A' :
            config._isPm = getLangDefinition(config._l).isPM(input);
            break;
        // 24 HOUR
        case 'H' : // fall through to hh
        case 'HH' : // fall through to hh
        case 'h' : // fall through to hh
        case 'hh' :
            datePartArray[HOUR] = toInt(input);
            break;
        // MINUTE
        case 'm' : // fall through to mm
        case 'mm' :
            datePartArray[MINUTE] = toInt(input);
            break;
        // SECOND
        case 's' : // fall through to ss
        case 'ss' :
            datePartArray[SECOND] = toInt(input);
            break;
        // MILLISECOND
        case 'S' :
        case 'SS' :
        case 'SSS' :
        case 'SSSS' :
            datePartArray[MILLISECOND] = toInt(('0.' + input) * 1000);
            break;
        // UNIX TIMESTAMP WITH MS
        case 'X':
            config._d = new Date(parseFloat(input) * 1000);
            break;
        // TIMEZONE
        case 'Z' : // fall through to ZZ
        case 'ZZ' :
            config._useUTC = true;
            config._tzm = timezoneMinutesFromString(input);
            break;
        case 'w':
        case 'ww':
        case 'W':
        case 'WW':
        case 'd':
        case 'dd':
        case 'ddd':
        case 'dddd':
        case 'e':
        case 'E':
            token = token.substr(0, 1);
            /* falls through */
        case 'gg':
        case 'gggg':
        case 'GG':
        case 'GGGG':
        case 'GGGGG':
            token = token.substr(0, 2);
            if (input) {
                config._w = config._w || {};
                config._w[token] = input;
            }
            break;
        }
    }

    // convert an array to a date.
    // the array should mirror the parameters below
    // note: all values past the year are optional and will default to the lowest possible value.
    // [year, month, day , hour, minute, second, millisecond]
    function dateFromConfig(config) {
        var i, date, input = [], currentDate,
            yearToUse, fixYear, w, temp, lang, weekday, week;

        if (config._d) {
            return;
        }

        currentDate = currentDateArray(config);

        //compute day of the year from weeks and weekdays
        if (config._w && config._a[DATE] == null && config._a[MONTH] == null) {
            fixYear = function (val) {
                return val ?
                  (val.length < 3 ? (parseInt(val, 10) > 68 ? '19' + val : '20' + val) : val) :
                  (config._a[YEAR] == null ? moment().weekYear() : config._a[YEAR]);
            };

            w = config._w;
            if (w.GG != null || w.W != null || w.E != null) {
                temp = dayOfYearFromWeeks(fixYear(w.GG), w.W || 1, w.E, 4, 1);
            }
            else {
                lang = getLangDefinition(config._l);
                weekday = w.d != null ?  parseWeekday(w.d, lang) :
                  (w.e != null ?  parseInt(w.e, 10) + lang._week.dow : 0);

                week = parseInt(w.w, 10) || 1;

                //if we're parsing 'd', then the low day numbers may be next week
                if (w.d != null && weekday < lang._week.dow) {
                    week++;
                }

                temp = dayOfYearFromWeeks(fixYear(w.gg), week, weekday, lang._week.doy, lang._week.dow);
            }

            config._a[YEAR] = temp.year;
            config._dayOfYear = temp.dayOfYear;
        }

        //if the day of the year is set, figure out what it is
        if (config._dayOfYear) {
            yearToUse = config._a[YEAR] == null ? currentDate[YEAR] : config._a[YEAR];

            if (config._dayOfYear > daysInYear(yearToUse)) {
                config._pf._overflowDayOfYear = true;
            }

            date = makeUTCDate(yearToUse, 0, config._dayOfYear);
            config._a[MONTH] = date.getUTCMonth();
            config._a[DATE] = date.getUTCDate();
        }

        // Default to current date.
        // * if no year, month, day of month are given, default to today
        // * if day of month is given, default month and year
        // * if month is given, default only year
        // * if year is given, don't default anything
        for (i = 0; i < 3 && config._a[i] == null; ++i) {
            config._a[i] = input[i] = currentDate[i];
        }

        // Zero out whatever was not defaulted, including time
        for (; i < 7; i++) {
            config._a[i] = input[i] = (config._a[i] == null) ? (i === 2 ? 1 : 0) : config._a[i];
        }

        // add the offsets to the time to be parsed so that we can have a clean array for checking isValid
        input[HOUR] += toInt((config._tzm || 0) / 60);
        input[MINUTE] += toInt((config._tzm || 0) % 60);

        config._d = (config._useUTC ? makeUTCDate : makeDate).apply(null, input);
    }

    function dateFromObject(config) {
        var normalizedInput;

        if (config._d) {
            return;
        }

        normalizedInput = normalizeObjectUnits(config._i);
        config._a = [
            normalizedInput.year,
            normalizedInput.month,
            normalizedInput.day,
            normalizedInput.hour,
            normalizedInput.minute,
            normalizedInput.second,
            normalizedInput.millisecond
        ];

        dateFromConfig(config);
    }

    function currentDateArray(config) {
        var now = new Date();
        if (config._useUTC) {
            return [
                now.getUTCFullYear(),
                now.getUTCMonth(),
                now.getUTCDate()
            ];
        } else {
            return [now.getFullYear(), now.getMonth(), now.getDate()];
        }
    }

    // date from string and format string
    function makeDateFromStringAndFormat(config) {

        config._a = [];
        config._pf.empty = true;

        // This array is used to make a Date, either with `new Date` or `Date.UTC`
        var lang = getLangDefinition(config._l),
            string = '' + config._i,
            i, parsedInput, tokens, token, skipped,
            stringLength = string.length,
            totalParsedInputLength = 0;

        tokens = expandFormat(config._f, lang).match(formattingTokens) || [];

        for (i = 0; i < tokens.length; i++) {
            token = tokens[i];
            parsedInput = (getParseRegexForToken(token, config).exec(string) || [])[0];
            if (parsedInput) {
                skipped = string.substr(0, string.indexOf(parsedInput));
                if (skipped.length > 0) {
                    config._pf.unusedInput.push(skipped);
                }
                string = string.slice(string.indexOf(parsedInput) + parsedInput.length);
                totalParsedInputLength += parsedInput.length;
            }
            // don't parse if it's not a known token
            if (formatTokenFunctions[token]) {
                if (parsedInput) {
                    config._pf.empty = false;
                }
                else {
                    config._pf.unusedTokens.push(token);
                }
                addTimeToArrayFromToken(token, parsedInput, config);
            }
            else if (config._strict && !parsedInput) {
                config._pf.unusedTokens.push(token);
            }
        }

        // add remaining unparsed input length to the string
        config._pf.charsLeftOver = stringLength - totalParsedInputLength;
        if (string.length > 0) {
            config._pf.unusedInput.push(string);
        }

        // handle am pm
        if (config._isPm && config._a[HOUR] < 12) {
            config._a[HOUR] += 12;
        }
        // if is 12 am, change hours to 0
        if (config._isPm === false && config._a[HOUR] === 12) {
            config._a[HOUR] = 0;
        }

        dateFromConfig(config);
        checkOverflow(config);
    }

    function unescapeFormat(s) {
        return s.replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function (matched, p1, p2, p3, p4) {
            return p1 || p2 || p3 || p4;
        });
    }

    // Code from http://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript
    function regexpEscape(s) {
        return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    }

    // date from string and array of format strings
    function makeDateFromStringAndArray(config) {
        var tempConfig,
            bestMoment,

            scoreToBeat,
            i,
            currentScore;

        if (config._f.length === 0) {
            config._pf.invalidFormat = true;
            config._d = new Date(NaN);
            return;
        }

        for (i = 0; i < config._f.length; i++) {
            currentScore = 0;
            tempConfig = extend({}, config);
            initializeParsingFlags(tempConfig);
            tempConfig._f = config._f[i];
            makeDateFromStringAndFormat(tempConfig);

            if (!isValid(tempConfig)) {
                continue;
            }

            // if there is any input that was not parsed add a penalty for that format
            currentScore += tempConfig._pf.charsLeftOver;

            //or tokens
            currentScore += tempConfig._pf.unusedTokens.length * 10;

            tempConfig._pf.score = currentScore;

            if (scoreToBeat == null || currentScore < scoreToBeat) {
                scoreToBeat = currentScore;
                bestMoment = tempConfig;
            }
        }

        extend(config, bestMoment || tempConfig);
    }

    // date from iso format
    function makeDateFromString(config) {
        var i,
            string = config._i,
            match = isoRegex.exec(string);

        if (match) {
            config._pf.iso = true;
            for (i = 4; i > 0; i--) {
                if (match[i]) {
                    // match[5] should be "T" or undefined
                    config._f = isoDates[i - 1] + (match[6] || " ");
                    break;
                }
            }
            for (i = 0; i < 4; i++) {
                if (isoTimes[i][1].exec(string)) {
                    config._f += isoTimes[i][0];
                    break;
                }
            }
            if (parseTokenTimezone.exec(string)) {
                config._f += "Z";
            }
            makeDateFromStringAndFormat(config);
        }
        else {
            config._d = new Date(string);
        }
    }

    function makeDateFromInput(config) {
        var input = config._i,
            matched = aspNetJsonRegex.exec(input);

        if (input === undefined) {
            config._d = new Date();
        } else if (matched) {
            config._d = new Date(+matched[1]);
        } else if (typeof input === 'string') {
            makeDateFromString(config);
        } else if (isArray(input)) {
            config._a = input.slice(0);
            dateFromConfig(config);
        } else if (isDate(input)) {
            config._d = new Date(+input);
        } else if (typeof(input) === 'object') {
            dateFromObject(config);
        } else {
            config._d = new Date(input);
        }
    }

    function makeDate(y, m, d, h, M, s, ms) {
        //can't just apply() to create a date:
        //http://stackoverflow.com/questions/181348/instantiating-a-javascript-object-by-calling-prototype-constructor-apply
        var date = new Date(y, m, d, h, M, s, ms);

        //the date constructor doesn't accept years < 1970
        if (y < 1970) {
            date.setFullYear(y);
        }
        return date;
    }

    function makeUTCDate(y) {
        var date = new Date(Date.UTC.apply(null, arguments));
        if (y < 1970) {
            date.setUTCFullYear(y);
        }
        return date;
    }

    function parseWeekday(input, language) {
        if (typeof input === 'string') {
            if (!isNaN(input)) {
                input = parseInt(input, 10);
            }
            else {
                input = language.weekdaysParse(input);
                if (typeof input !== 'number') {
                    return null;
                }
            }
        }
        return input;
    }

    /************************************
        Relative Time
    ************************************/


    // helper function for moment.fn.from, moment.fn.fromNow, and moment.duration.fn.humanize
    function substituteTimeAgo(string, number, withoutSuffix, isFuture, lang) {
        return lang.relativeTime(number || 1, !!withoutSuffix, string, isFuture);
    }

    function relativeTime(milliseconds, withoutSuffix, lang) {
        var seconds = round(Math.abs(milliseconds) / 1000),
            minutes = round(seconds / 60),
            hours = round(minutes / 60),
            days = round(hours / 24),
            years = round(days / 365),
            args = seconds < 45 && ['s', seconds] ||
                minutes === 1 && ['m'] ||
                minutes < 45 && ['mm', minutes] ||
                hours === 1 && ['h'] ||
                hours < 22 && ['hh', hours] ||
                days === 1 && ['d'] ||
                days <= 25 && ['dd', days] ||
                days <= 45 && ['M'] ||
                days < 345 && ['MM', round(days / 30)] ||
                years === 1 && ['y'] || ['yy', years];
        args[2] = withoutSuffix;
        args[3] = milliseconds > 0;
        args[4] = lang;
        return substituteTimeAgo.apply({}, args);
    }


    /************************************
        Week of Year
    ************************************/


    // firstDayOfWeek       0 = sun, 6 = sat
    //                      the day of the week that starts the week
    //                      (usually sunday or monday)
    // firstDayOfWeekOfYear 0 = sun, 6 = sat
    //                      the first week is the week that contains the first
    //                      of this day of the week
    //                      (eg. ISO weeks use thursday (4))
    function weekOfYear(mom, firstDayOfWeek, firstDayOfWeekOfYear) {
        var end = firstDayOfWeekOfYear - firstDayOfWeek,
            daysToDayOfWeek = firstDayOfWeekOfYear - mom.day(),
            adjustedMoment;


        if (daysToDayOfWeek > end) {
            daysToDayOfWeek -= 7;
        }

        if (daysToDayOfWeek < end - 7) {
            daysToDayOfWeek += 7;
        }

        adjustedMoment = moment(mom).add('d', daysToDayOfWeek);
        return {
            week: Math.ceil(adjustedMoment.dayOfYear() / 7),
            year: adjustedMoment.year()
        };
    }

    //http://en.wikipedia.org/wiki/ISO_week_date#Calculating_a_date_given_the_year.2C_week_number_and_weekday
    function dayOfYearFromWeeks(year, week, weekday, firstDayOfWeekOfYear, firstDayOfWeek) {
        var d = new Date(Date.UTC(year, 0)).getUTCDay(),
            daysToAdd, dayOfYear;

        weekday = weekday != null ? weekday : firstDayOfWeek;
        daysToAdd = firstDayOfWeek - d + (d > firstDayOfWeekOfYear ? 7 : 0);
        dayOfYear = 7 * (week - 1) + (weekday - firstDayOfWeek) + daysToAdd + 1;

        return {
            year: dayOfYear > 0 ? year : year - 1,
            dayOfYear: dayOfYear > 0 ?  dayOfYear : daysInYear(year - 1) + dayOfYear
        };
    }

    /************************************
        Top Level Functions
    ************************************/

    function makeMoment(config) {
        var input = config._i,
            format = config._f;

        if (typeof config._pf === 'undefined') {
            initializeParsingFlags(config);
        }

        if (input === null) {
            return moment.invalid({nullInput: true});
        }

        if (typeof input === 'string') {
            config._i = input = getLangDefinition().preparse(input);
        }

        if (moment.isMoment(input)) {
            config = extend({}, input);

            config._d = new Date(+input._d);
        } else if (format) {
            if (isArray(format)) {
                makeDateFromStringAndArray(config);
            } else {
                makeDateFromStringAndFormat(config);
            }
        } else {
            makeDateFromInput(config);
        }

        return new Moment(config);
    }

    moment = function (input, format, lang, strict) {
        if (typeof(lang) === "boolean") {
            strict = lang;
            lang = undefined;
        }
        return makeMoment({
            _i : input,
            _f : format,
            _l : lang,
            _strict : strict,
            _isUTC : false
        });
    };

    // creating with utc
    moment.utc = function (input, format, lang, strict) {
        var m;

        if (typeof(lang) === "boolean") {
            strict = lang;
            lang = undefined;
        }
        m = makeMoment({
            _useUTC : true,
            _isUTC : true,
            _l : lang,
            _i : input,
            _f : format,
            _strict : strict
        }).utc();

        return m;
    };

    // creating with unix timestamp (in seconds)
    moment.unix = function (input) {
        return moment(input * 1000);
    };

    // duration
    moment.duration = function (input, key) {
        var duration = input,
            // matching against regexp is expensive, do it on demand
            match = null,
            sign,
            ret,
            parseIso,
            timeEmpty,
            dateTimeEmpty;

        if (moment.isDuration(input)) {
            duration = {
                ms: input._milliseconds,
                d: input._days,
                M: input._months
            };
        } else if (typeof input === 'number') {
            duration = {};
            if (key) {
                duration[key] = input;
            } else {
                duration.milliseconds = input;
            }
        } else if (!!(match = aspNetTimeSpanJsonRegex.exec(input))) {
            sign = (match[1] === "-") ? -1 : 1;
            duration = {
                y: 0,
                d: toInt(match[DATE]) * sign,
                h: toInt(match[HOUR]) * sign,
                m: toInt(match[MINUTE]) * sign,
                s: toInt(match[SECOND]) * sign,
                ms: toInt(match[MILLISECOND]) * sign
            };
        } else if (!!(match = isoDurationRegex.exec(input))) {
            sign = (match[1] === "-") ? -1 : 1;
            parseIso = function (inp) {
                // We'd normally use ~~inp for this, but unfortunately it also
                // converts floats to ints.
                // inp may be undefined, so careful calling replace on it.
                var res = inp && parseFloat(inp.replace(',', '.'));
                // apply sign while we're at it
                return (isNaN(res) ? 0 : res) * sign;
            };
            duration = {
                y: parseIso(match[2]),
                M: parseIso(match[3]),
                d: parseIso(match[4]),
                h: parseIso(match[5]),
                m: parseIso(match[6]),
                s: parseIso(match[7]),
                w: parseIso(match[8])
            };
        }

        ret = new Duration(duration);

        if (moment.isDuration(input) && input.hasOwnProperty('_lang')) {
            ret._lang = input._lang;
        }

        return ret;
    };

    // version number
    moment.version = VERSION;

    // default format
    moment.defaultFormat = isoFormat;

    // This function will be called whenever a moment is mutated.
    // It is intended to keep the offset in sync with the timezone.
    moment.updateOffset = function () {};

    // This function will load languages and then set the global language.  If
    // no arguments are passed in, it will simply return the current global
    // language key.
    moment.lang = function (key, values) {
        var r;
        if (!key) {
            return moment.fn._lang._abbr;
        }
        if (values) {
            loadLang(normalizeLanguage(key), values);
        } else if (values === null) {
            unloadLang(key);
            key = 'en';
        } else if (!languages[key]) {
            getLangDefinition(key);
        }
        r = moment.duration.fn._lang = moment.fn._lang = getLangDefinition(key);
        return r._abbr;
    };

    // returns language data
    moment.langData = function (key) {
        if (key && key._lang && key._lang._abbr) {
            key = key._lang._abbr;
        }
        return getLangDefinition(key);
    };

    // compare moment object
    moment.isMoment = function (obj) {
        return obj instanceof Moment;
    };

    // for typechecking Duration objects
    moment.isDuration = function (obj) {
        return obj instanceof Duration;
    };

    for (i = lists.length - 1; i >= 0; --i) {
        makeList(lists[i]);
    }

    moment.normalizeUnits = function (units) {
        return normalizeUnits(units);
    };

    moment.invalid = function (flags) {
        var m = moment.utc(NaN);
        if (flags != null) {
            extend(m._pf, flags);
        }
        else {
            m._pf.userInvalidated = true;
        }

        return m;
    };

    moment.parseZone = function (input) {
        return moment(input).parseZone();
    };

    /************************************
        Moment Prototype
    ************************************/


    extend(moment.fn = Moment.prototype, {

        clone : function () {
            return moment(this);
        },

        valueOf : function () {
            return +this._d + ((this._offset || 0) * 60000);
        },

        unix : function () {
            return Math.floor(+this / 1000);
        },

        toString : function () {
            return this.clone().lang('en').format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ");
        },

        toDate : function () {
            return this._offset ? new Date(+this) : this._d;
        },

        toISOString : function () {
            return formatMoment(moment(this).utc(), 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
        },

        toArray : function () {
            var m = this;
            return [
                m.year(),
                m.month(),
                m.date(),
                m.hours(),
                m.minutes(),
                m.seconds(),
                m.milliseconds()
            ];
        },

        isValid : function () {
            return isValid(this);
        },

        isDSTShifted : function () {

            if (this._a) {
                return this.isValid() && compareArrays(this._a, (this._isUTC ? moment.utc(this._a) : moment(this._a)).toArray()) > 0;
            }

            return false;
        },

        parsingFlags : function () {
            return extend({}, this._pf);
        },

        invalidAt: function () {
            return this._pf.overflow;
        },

        utc : function () {
            return this.zone(0);
        },

        local : function () {
            this.zone(0);
            this._isUTC = false;
            return this;
        },

        format : function (inputString) {
            var output = formatMoment(this, inputString || moment.defaultFormat);
            return this.lang().postformat(output);
        },

        add : function (input, val) {
            var dur;
            // switch args to support add('s', 1) and add(1, 's')
            if (typeof input === 'string') {
                dur = moment.duration(+val, input);
            } else {
                dur = moment.duration(input, val);
            }
            addOrSubtractDurationFromMoment(this, dur, 1);
            return this;
        },

        subtract : function (input, val) {
            var dur;
            // switch args to support subtract('s', 1) and subtract(1, 's')
            if (typeof input === 'string') {
                dur = moment.duration(+val, input);
            } else {
                dur = moment.duration(input, val);
            }
            addOrSubtractDurationFromMoment(this, dur, -1);
            return this;
        },

        diff : function (input, units, asFloat) {
            var that = this._isUTC ? moment(input).zone(this._offset || 0) : moment(input).local(),
                zoneDiff = (this.zone() - that.zone()) * 6e4,
                diff, output;

            units = normalizeUnits(units);

            if (units === 'year' || units === 'month') {
                // average number of days in the months in the given dates
                diff = (this.daysInMonth() + that.daysInMonth()) * 432e5; // 24 * 60 * 60 * 1000 / 2
                // difference in months
                output = ((this.year() - that.year()) * 12) + (this.month() - that.month());
                // adjust by taking difference in days, average number of days
                // and dst in the given months.
                output += ((this - moment(this).startOf('month')) -
                        (that - moment(that).startOf('month'))) / diff;
                // same as above but with zones, to negate all dst
                output -= ((this.zone() - moment(this).startOf('month').zone()) -
                        (that.zone() - moment(that).startOf('month').zone())) * 6e4 / diff;
                if (units === 'year') {
                    output = output / 12;
                }
            } else {
                diff = (this - that);
                output = units === 'second' ? diff / 1e3 : // 1000
                    units === 'minute' ? diff / 6e4 : // 1000 * 60
                    units === 'hour' ? diff / 36e5 : // 1000 * 60 * 60
                    units === 'day' ? (diff - zoneDiff) / 864e5 : // 1000 * 60 * 60 * 24, negate dst
                    units === 'week' ? (diff - zoneDiff) / 6048e5 : // 1000 * 60 * 60 * 24 * 7, negate dst
                    diff;
            }
            return asFloat ? output : absRound(output);
        },

        from : function (time, withoutSuffix) {
            return moment.duration(this.diff(time)).lang(this.lang()._abbr).humanize(!withoutSuffix);
        },

        fromNow : function (withoutSuffix) {
            return this.from(moment(), withoutSuffix);
        },

        calendar : function () {
            var diff = this.diff(moment().zone(this.zone()).startOf('day'), 'days', true),
                format = diff < -6 ? 'sameElse' :
                diff < -1 ? 'lastWeek' :
                diff < 0 ? 'lastDay' :
                diff < 1 ? 'sameDay' :
                diff < 2 ? 'nextDay' :
                diff < 7 ? 'nextWeek' : 'sameElse';
            return this.format(this.lang().calendar(format, this));
        },

        isLeapYear : function () {
            return isLeapYear(this.year());
        },

        isDST : function () {
            return (this.zone() < this.clone().month(0).zone() ||
                this.zone() < this.clone().month(5).zone());
        },

        day : function (input) {
            var day = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
            if (input != null) {
                input = parseWeekday(input, this.lang());
                return this.add({ d : input - day });
            } else {
                return day;
            }
        },

        month : function (input) {
            var utc = this._isUTC ? 'UTC' : '',
                dayOfMonth;

            if (input != null) {
                if (typeof input === 'string') {
                    input = this.lang().monthsParse(input);
                    if (typeof input !== 'number') {
                        return this;
                    }
                }

                dayOfMonth = this.date();
                this.date(1);
                this._d['set' + utc + 'Month'](input);
                this.date(Math.min(dayOfMonth, this.daysInMonth()));

                moment.updateOffset(this);
                return this;
            } else {
                return this._d['get' + utc + 'Month']();
            }
        },

        startOf: function (units) {
            units = normalizeUnits(units);
            // the following switch intentionally omits break keywords
            // to utilize falling through the cases.
            switch (units) {
            case 'year':
                this.month(0);
                /* falls through */
            case 'month':
                this.date(1);
                /* falls through */
            case 'week':
            case 'isoWeek':
            case 'day':
                this.hours(0);
                /* falls through */
            case 'hour':
                this.minutes(0);
                /* falls through */
            case 'minute':
                this.seconds(0);
                /* falls through */
            case 'second':
                this.milliseconds(0);
                /* falls through */
            }

            // weeks are a special case
            if (units === 'week') {
                this.weekday(0);
            } else if (units === 'isoWeek') {
                this.isoWeekday(1);
            }

            return this;
        },

        endOf: function (units) {
            units = normalizeUnits(units);
            return this.startOf(units).add((units === 'isoWeek' ? 'week' : units), 1).subtract('ms', 1);
        },

        isAfter: function (input, units) {
            units = typeof units !== 'undefined' ? units : 'millisecond';
            return +this.clone().startOf(units) > +moment(input).startOf(units);
        },

        isBefore: function (input, units) {
            units = typeof units !== 'undefined' ? units : 'millisecond';
            return +this.clone().startOf(units) < +moment(input).startOf(units);
        },

        isSame: function (input, units) {
            units = typeof units !== 'undefined' ? units : 'millisecond';
            return +this.clone().startOf(units) === +moment(input).startOf(units);
        },

        min: function (other) {
            other = moment.apply(null, arguments);
            return other < this ? this : other;
        },

        max: function (other) {
            other = moment.apply(null, arguments);
            return other > this ? this : other;
        },

        zone : function (input) {
            var offset = this._offset || 0;
            if (input != null) {
                if (typeof input === "string") {
                    input = timezoneMinutesFromString(input);
                }
                if (Math.abs(input) < 16) {
                    input = input * 60;
                }
                this._offset = input;
                this._isUTC = true;
                if (offset !== input) {
                    addOrSubtractDurationFromMoment(this, moment.duration(offset - input, 'm'), 1, true);
                }
            } else {
                return this._isUTC ? offset : this._d.getTimezoneOffset();
            }
            return this;
        },

        zoneAbbr : function () {
            return this._isUTC ? "UTC" : "";
        },

        zoneName : function () {
            return this._isUTC ? "Coordinated Universal Time" : "";
        },

        parseZone : function () {
            if (typeof this._i === 'string') {
                this.zone(this._i);
            }
            return this;
        },

        hasAlignedHourOffset : function (input) {
            if (!input) {
                input = 0;
            }
            else {
                input = moment(input).zone();
            }

            return (this.zone() - input) % 60 === 0;
        },

        daysInMonth : function () {
            return daysInMonth(this.year(), this.month());
        },

        dayOfYear : function (input) {
            var dayOfYear = round((moment(this).startOf('day') - moment(this).startOf('year')) / 864e5) + 1;
            return input == null ? dayOfYear : this.add("d", (input - dayOfYear));
        },

        weekYear : function (input) {
            var year = weekOfYear(this, this.lang()._week.dow, this.lang()._week.doy).year;
            return input == null ? year : this.add("y", (input - year));
        },

        isoWeekYear : function (input) {
            var year = weekOfYear(this, 1, 4).year;
            return input == null ? year : this.add("y", (input - year));
        },

        week : function (input) {
            var week = this.lang().week(this);
            return input == null ? week : this.add("d", (input - week) * 7);
        },

        isoWeek : function (input) {
            var week = weekOfYear(this, 1, 4).week;
            return input == null ? week : this.add("d", (input - week) * 7);
        },

        weekday : function (input) {
            var weekday = (this.day() + 7 - this.lang()._week.dow) % 7;
            return input == null ? weekday : this.add("d", input - weekday);
        },

        isoWeekday : function (input) {
            // behaves the same as moment#day except
            // as a getter, returns 7 instead of 0 (1-7 range instead of 0-6)
            // as a setter, sunday should belong to the previous week.
            return input == null ? this.day() || 7 : this.day(this.day() % 7 ? input : input - 7);
        },

        get : function (units) {
            units = normalizeUnits(units);
            return this[units]();
        },

        set : function (units, value) {
            units = normalizeUnits(units);
            if (typeof this[units] === 'function') {
                this[units](value);
            }
            return this;
        },

        // If passed a language key, it will set the language for this
        // instance.  Otherwise, it will return the language configuration
        // variables for this instance.
        lang : function (key) {
            if (key === undefined) {
                return this._lang;
            } else {
                this._lang = getLangDefinition(key);
                return this;
            }
        }
    });

    // helper for adding shortcuts
    function makeGetterAndSetter(name, key) {
        moment.fn[name] = moment.fn[name + 's'] = function (input) {
            var utc = this._isUTC ? 'UTC' : '';
            if (input != null) {
                this._d['set' + utc + key](input);
                moment.updateOffset(this);
                return this;
            } else {
                return this._d['get' + utc + key]();
            }
        };
    }

    // loop through and add shortcuts (Month, Date, Hours, Minutes, Seconds, Milliseconds)
    for (i = 0; i < proxyGettersAndSetters.length; i ++) {
        makeGetterAndSetter(proxyGettersAndSetters[i].toLowerCase().replace(/s$/, ''), proxyGettersAndSetters[i]);
    }

    // add shortcut for year (uses different syntax than the getter/setter 'year' == 'FullYear')
    makeGetterAndSetter('year', 'FullYear');

    // add plural methods
    moment.fn.days = moment.fn.day;
    moment.fn.months = moment.fn.month;
    moment.fn.weeks = moment.fn.week;
    moment.fn.isoWeeks = moment.fn.isoWeek;

    // add aliased format methods
    moment.fn.toJSON = moment.fn.toISOString;

    /************************************
        Duration Prototype
    ************************************/


    extend(moment.duration.fn = Duration.prototype, {

        _bubble : function () {
            var milliseconds = this._milliseconds,
                days = this._days,
                months = this._months,
                data = this._data,
                seconds, minutes, hours, years;

            // The following code bubbles up values, see the tests for
            // examples of what that means.
            data.milliseconds = milliseconds % 1000;

            seconds = absRound(milliseconds / 1000);
            data.seconds = seconds % 60;

            minutes = absRound(seconds / 60);
            data.minutes = minutes % 60;

            hours = absRound(minutes / 60);
            data.hours = hours % 24;

            days += absRound(hours / 24);
            data.days = days % 30;

            months += absRound(days / 30);
            data.months = months % 12;

            years = absRound(months / 12);
            data.years = years;
        },

        weeks : function () {
            return absRound(this.days() / 7);
        },

        valueOf : function () {
            return this._milliseconds +
              this._days * 864e5 +
              (this._months % 12) * 2592e6 +
              toInt(this._months / 12) * 31536e6;
        },

        humanize : function (withSuffix) {
            var difference = +this,
                output = relativeTime(difference, !withSuffix, this.lang());

            if (withSuffix) {
                output = this.lang().pastFuture(difference, output);
            }

            return this.lang().postformat(output);
        },

        add : function (input, val) {
            // supports only 2.0-style add(1, 's') or add(moment)
            var dur = moment.duration(input, val);

            this._milliseconds += dur._milliseconds;
            this._days += dur._days;
            this._months += dur._months;

            this._bubble();

            return this;
        },

        subtract : function (input, val) {
            var dur = moment.duration(input, val);

            this._milliseconds -= dur._milliseconds;
            this._days -= dur._days;
            this._months -= dur._months;

            this._bubble();

            return this;
        },

        get : function (units) {
            units = normalizeUnits(units);
            return this[units.toLowerCase() + 's']();
        },

        as : function (units) {
            units = normalizeUnits(units);
            return this['as' + units.charAt(0).toUpperCase() + units.slice(1) + 's']();
        },

        lang : moment.fn.lang,

        toIsoString : function () {
            // inspired by https://github.com/dordille/moment-isoduration/blob/master/moment.isoduration.js
            var years = Math.abs(this.years()),
                months = Math.abs(this.months()),
                days = Math.abs(this.days()),
                hours = Math.abs(this.hours()),
                minutes = Math.abs(this.minutes()),
                seconds = Math.abs(this.seconds() + this.milliseconds() / 1000);

            if (!this.asSeconds()) {
                // this is the same as C#'s (Noda) and python (isodate)...
                // but not other JS (goog.date)
                return 'P0D';
            }

            return (this.asSeconds() < 0 ? '-' : '') +
                'P' +
                (years ? years + 'Y' : '') +
                (months ? months + 'M' : '') +
                (days ? days + 'D' : '') +
                ((hours || minutes || seconds) ? 'T' : '') +
                (hours ? hours + 'H' : '') +
                (minutes ? minutes + 'M' : '') +
                (seconds ? seconds + 'S' : '');
        }
    });

    function makeDurationGetter(name) {
        moment.duration.fn[name] = function () {
            return this._data[name];
        };
    }

    function makeDurationAsGetter(name, factor) {
        moment.duration.fn['as' + name] = function () {
            return +this / factor;
        };
    }

    for (i in unitMillisecondFactors) {
        if (unitMillisecondFactors.hasOwnProperty(i)) {
            makeDurationAsGetter(i, unitMillisecondFactors[i]);
            makeDurationGetter(i.toLowerCase());
        }
    }

    makeDurationAsGetter('Weeks', 6048e5);
    moment.duration.fn.asMonths = function () {
        return (+this - this.years() * 31536e6) / 2592e6 + this.years() * 12;
    };


    /************************************
        Default Lang
    ************************************/


    // Set default language, other languages will inherit from English.
    moment.lang('en', {
        ordinal : function (number) {
            var b = number % 10,
                output = (toInt(number % 100 / 10) === 1) ? 'th' :
                (b === 1) ? 'st' :
                (b === 2) ? 'nd' :
                (b === 3) ? 'rd' : 'th';
            return number + output;
        }
    });

    /* EMBED_LANGUAGES */

    /************************************
        Exposing Moment
    ************************************/

    function makeGlobal(deprecate) {
        var warned = false, local_moment = moment;
        /*global ender:false */
        if (typeof ender !== 'undefined') {
            return;
        }
        // here, `this` means `window` in the browser, or `global` on the server
        // add `moment` as a global object via a string identifier,
        // for Closure Compiler "advanced" mode
        if (deprecate) {
            global.moment = function () {
                if (!warned && console && console.warn) {
                    warned = true;
                    console.warn(
                            "Accessing Moment through the global scope is " +
                            "deprecated, and will be removed in an upcoming " +
                            "release.");
                }
                return local_moment.apply(null, arguments);
            };
        } else {
            global['moment'] = moment;
        }
    }

    // CommonJS module is defined
    if (hasModule) {
        module.exports = moment;
        makeGlobal(true);
    } else if (typeof define === "function" && define.amd) {
        define("moment", ['require','exports','module'],function (require, exports, module) {
            if (module.config() && module.config().noGlobal !== true) {
                // If user provided noGlobal, he is aware of global
                makeGlobal(module.config().noGlobal === undefined);
            }

            return moment;
        });
    } else {
        makeGlobal();
    }
}).call(this);
/*!
 * accounting.js v0.3.2
 * Copyright 2011, Joss Crowcroft
 *
 * Freely distributable under the MIT license.
 * Portions of accounting.js are inspired or borrowed from underscore.js
 *
 * Full details and documentation:
 * http://josscrowcroft.github.com/accounting.js/
 */

(function(root, undefined) {

	/* --- Setup --- */

	// Create the local library object, to be exported or referenced globally later
	var lib = {};

	// Current version
	lib.version = '0.3.2';


	/* --- Exposed settings --- */

	// The library's settings configuration object. Contains default parameters for
	// currency and number formatting
	lib.settings = {
		currency: {
			symbol : "$",		// default currency symbol is '$'
			format : "%s%v",	// controls output: %s = symbol, %v = value (can be object, see docs)
			decimal : ".",		// decimal point separator
			thousand : ",",		// thousands separator
			precision : 2,		// decimal places
			grouping : 3		// digit grouping (not implemented yet)
		},
		number: {
			precision : 0,		// default precision on numbers is 0
			grouping : 3,		// digit grouping (not implemented yet)
			thousand : ",",
			decimal : "."
		}
	};


	/* --- Internal Helper Methods --- */

	// Store reference to possibly-available ECMAScript 5 methods for later
	var nativeMap = Array.prototype.map,
		nativeIsArray = Array.isArray,
		toString = Object.prototype.toString;

	/**
	 * Tests whether supplied parameter is a string
	 * from underscore.js
	 */
	function isString(obj) {
		return !!(obj === '' || (obj && obj.charCodeAt && obj.substr));
	}

	/**
	 * Tests whether supplied parameter is a string
	 * from underscore.js, delegates to ECMA5's native Array.isArray
	 */
	function isArray(obj) {
		return nativeIsArray ? nativeIsArray(obj) : toString.call(obj) === '[object Array]';
	}

	/**
	 * Tests whether supplied parameter is a true object
	 */
	function isObject(obj) {
		return obj && toString.call(obj) === '[object Object]';
	}

	/**
	 * Extends an object with a defaults object, similar to underscore's _.defaults
	 *
	 * Used for abstracting parameter handling from API methods
	 */
	function defaults(object, defs) {
		var key;
		object = object || {};
		defs = defs || {};
		// Iterate over object non-prototype properties:
		for (key in defs) {
			if (defs.hasOwnProperty(key)) {
				// Replace values with defaults only if undefined (allow empty/zero values):
				if (object[key] == null) object[key] = defs[key];
			}
		}
		return object;
	}

	/**
	 * Implementation of `Array.map()` for iteration loops
	 *
	 * Returns a new Array as a result of calling `iterator` on each array value.
	 * Defers to native Array.map if available
	 */
	function map(obj, iterator, context) {
		var results = [], i, j;

		if (!obj) return results;

		// Use native .map method if it exists:
		if (nativeMap && obj.map === nativeMap) return obj.map(iterator, context);

		// Fallback for native .map:
		for (i = 0, j = obj.length; i < j; i++ ) {
			results[i] = iterator.call(context, obj[i], i, obj);
		}
		return results;
	}

	/**
	 * Check and normalise the value of precision (must be positive integer)
	 */
	function checkPrecision(val, base) {
		val = Math.round(Math.abs(val));
		return isNaN(val)? base : val;
	}


	/**
	 * Parses a format string or object and returns format obj for use in rendering
	 *
	 * `format` is either a string with the default (positive) format, or object
	 * containing `pos` (required), `neg` and `zero` values (or a function returning
	 * either a string or object)
	 *
	 * Either string or format.pos must contain "%v" (value) to be valid
	 */
	function checkCurrencyFormat(format) {
		var defaults = lib.settings.currency.format;

		// Allow function as format parameter (should return string or object):
		if ( typeof format === "function" ) format = format();

		// Format can be a string, in which case `value` ("%v") must be present:
		if ( isString( format ) && format.match("%v") ) {

			// Create and return positive, negative and zero formats:
			return {
				pos : format,
				neg : format.replace("-", "").replace("%v", "-%v"),
				zero : format
			};

		// If no format, or object is missing valid positive value, use defaults:
		} else if ( !format || !format.pos || !format.pos.match("%v") ) {

			// If defaults is a string, casts it to an object for faster checking next time:
			return ( !isString( defaults ) ) ? defaults : lib.settings.currency.format = {
				pos : defaults,
				neg : defaults.replace("%v", "-%v"),
				zero : defaults
			};

		}
		// Otherwise, assume format was fine:
		return format;
	}


	/* --- API Methods --- */

	/**
	 * Takes a string/array of strings, removes all formatting/cruft and returns the raw float value
	 * alias: accounting.`parse(string)`
	 *
	 * Decimal must be included in the regular expression to match floats (defaults to
	 * accounting.settings.number.decimal), so if the number uses a non-standard decimal 
	 * separator, provide it as the second argument.
	 *
	 * Also matches bracketed negatives (eg. "$ (1.99)" => -1.99)
	 *
	 * Doesn't throw any errors (`NaN`s become 0) but this may change in future
	 */
	var unformat = lib.unformat = lib.parse = function(value, decimal) {
		// Recursively unformat arrays:
		if (isArray(value)) {
			return map(value, function(val) {
				return unformat(val, decimal);
			});
		}

		// Fails silently (need decent errors):
		value = value || 0;

		// Return the value as-is if it's already a number:
		if (typeof value === "number") return value;

		// Default decimal point comes from settings, but could be set to eg. "," in opts:
		decimal = decimal || lib.settings.number.decimal;

		 // Build regex to strip out everything except digits, decimal point and minus sign:
		var regex = new RegExp("[^0-9-" + decimal + "]", ["g"]),
			unformatted = parseFloat(
				("" + value)
				.replace(/\((.*)\)/, "-$1") // replace bracketed values with negatives
				.replace(regex, '')         // strip out any cruft
				.replace(decimal, '.')      // make sure decimal point is standard
			);

		// This will fail silently which may cause trouble, let's wait and see:
		return !isNaN(unformatted) ? unformatted : 0;
	};


	/**
	 * Implementation of toFixed() that treats floats more like decimals
	 *
	 * Fixes binary rounding issues (eg. (0.615).toFixed(2) === "0.61") that present
	 * problems for accounting- and finance-related software.
	 */
	var toFixed = lib.toFixed = function(value, precision) {
		precision = checkPrecision(precision, lib.settings.number.precision);
		var power = Math.pow(10, precision);

		// Multiply up by precision, round accurately, then divide and use native toFixed():
		return (Math.round(lib.unformat(value) * power) / power).toFixed(precision);
	};


	/**
	 * Format a number, with comma-separated thousands and custom precision/decimal places
	 *
	 * Localise by overriding the precision and thousand / decimal separators
	 * 2nd parameter `precision` can be an object matching `settings.number`
	 */
	var formatNumber = lib.formatNumber = function(number, precision, thousand, decimal) {
		// Resursively format arrays:
		if (isArray(number)) {
			return map(number, function(val) {
				return formatNumber(val, precision, thousand, decimal);
			});
		}

		// Clean up number:
		number = unformat(number);

		// Build options object from second param (if object) or all params, extending defaults:
		var opts = defaults(
				(isObject(precision) ? precision : {
					precision : precision,
					thousand : thousand,
					decimal : decimal
				}),
				lib.settings.number
			),

			// Clean up precision
			usePrecision = checkPrecision(opts.precision),

			// Do some calc:
			negative = number < 0 ? "-" : "",
			base = parseInt(toFixed(Math.abs(number || 0), usePrecision), 10) + "",
			mod = base.length > 3 ? base.length % 3 : 0;

		// Format the number:
		return negative + (mod ? base.substr(0, mod) + opts.thousand : "") + base.substr(mod).replace(/(\d{3})(?=\d)/g, "$1" + opts.thousand) + (usePrecision ? opts.decimal + toFixed(Math.abs(number), usePrecision).split('.')[1] : "");
	};


	/**
	 * Format a number into currency
	 *
	 * Usage: accounting.formatMoney(number, symbol, precision, thousandsSep, decimalSep, format)
	 * defaults: (0, "$", 2, ",", ".", "%s%v")
	 *
	 * Localise by overriding the symbol, precision, thousand / decimal separators and format
	 * Second param can be an object matching `settings.currency` which is the easiest way.
	 *
	 * To do: tidy up the parameters
	 */
	var formatMoney = lib.formatMoney = function(number, symbol, precision, thousand, decimal, format) {
		// Resursively format arrays:
		if (isArray(number)) {
			return map(number, function(val){
				return formatMoney(val, symbol, precision, thousand, decimal, format);
			});
		}

		// Clean up number:
		number = unformat(number);

		// Build options object from second param (if object) or all params, extending defaults:
		var opts = defaults(
				(isObject(symbol) ? symbol : {
					symbol : symbol,
					precision : precision,
					thousand : thousand,
					decimal : decimal,
					format : format
				}),
				lib.settings.currency
			),

			// Check format (returns object with pos, neg and zero):
			formats = checkCurrencyFormat(opts.format),

			// Choose which format to use for this value:
			useFormat = number > 0 ? formats.pos : number < 0 ? formats.neg : formats.zero;

		// Return with currency symbol added:
		return useFormat.replace('%s', opts.symbol).replace('%v', formatNumber(Math.abs(number), checkPrecision(opts.precision), opts.thousand, opts.decimal));
	};


	/**
	 * Format a list of numbers into an accounting column, padding with whitespace
	 * to line up currency symbols, thousand separators and decimals places
	 *
	 * List should be an array of numbers
	 * Second parameter can be an object containing keys that match the params
	 *
	 * Returns array of accouting-formatted number strings of same length
	 *
	 * NB: `white-space:pre` CSS rule is required on the list container to prevent
	 * browsers from collapsing the whitespace in the output strings.
	 */
	lib.formatColumn = function(list, symbol, precision, thousand, decimal, format) {
		if (!list) return [];

		// Build options object from second param (if object) or all params, extending defaults:
		var opts = defaults(
				(isObject(symbol) ? symbol : {
					symbol : symbol,
					precision : precision,
					thousand : thousand,
					decimal : decimal,
					format : format
				}),
				lib.settings.currency
			),

			// Check format (returns object with pos, neg and zero), only need pos for now:
			formats = checkCurrencyFormat(opts.format),

			// Whether to pad at start of string or after currency symbol:
			padAfterSymbol = formats.pos.indexOf("%s") < formats.pos.indexOf("%v") ? true : false,

			// Store value for the length of the longest string in the column:
			maxLength = 0,

			// Format the list according to options, store the length of the longest string:
			formatted = map(list, function(val, i) {
				if (isArray(val)) {
					// Recursively format columns if list is a multi-dimensional array:
					return lib.formatColumn(val, opts);
				} else {
					// Clean up the value
					val = unformat(val);

					// Choose which format to use for this value (pos, neg or zero):
					var useFormat = val > 0 ? formats.pos : val < 0 ? formats.neg : formats.zero,

						// Format this value, push into formatted list and save the length:
						fVal = useFormat.replace('%s', opts.symbol).replace('%v', formatNumber(Math.abs(val), checkPrecision(opts.precision), opts.thousand, opts.decimal));

					if (fVal.length > maxLength) maxLength = fVal.length;
					return fVal;
				}
			});

		// Pad each number in the list and send back the column of numbers:
		return map(formatted, function(val, i) {
			// Only if this is a string (not a nested array, which would have already been padded):
			if (isString(val) && val.length < maxLength) {
				// Depending on symbol position, pad after symbol or at index 0:
				return padAfterSymbol ? val.replace(opts.symbol, opts.symbol+(new Array(maxLength - val.length + 1).join(" "))) : (new Array(maxLength - val.length + 1).join(" ")) + val;
			}
			return val;
		});
	};


	/* --- Module Definition --- */

	// Export accounting for CommonJS. If being loaded as an AMD module, define it as such.
	// Otherwise, just add `accounting` to the global object
	if (typeof exports !== 'undefined') {
		if (typeof module !== 'undefined' && module.exports) {
			exports = module.exports = lib;
		}
		exports.accounting = lib;
	} else if (typeof define === 'function' && define.amd) {
		// Return the library as an AMD module:
		define('accounting/accounting',[], function() {
			return lib;
		});
	} else {
		// Use accounting.noConflict to restore `accounting` back to its original value.
		// Returns a reference to the library's `accounting` object;
		// e.g. `var numbers = accounting.noConflict();`
		lib.noConflict = (function(oldAccounting) {
			return function() {
				// Reset the value of the root's `accounting` variable:
				root.accounting = oldAccounting;
				// Delete the noConflict method:
				lib.noConflict = undefined;
				// Return reference to the library to re-assign it:
				return lib;
			};
		})(root.accounting);

		// Declare `fx` on the root (global/window) object:
		root['accounting'] = lib;
	}

	// Root will be `window` in browser or `global` on the server:
}(this));

define('accounting/lang/ch',[
  'underscore',
  'accounting/accounting'
], function(_, accounting) {
  var settings = {
    currency: {
      symbol : "CHF", 
      format : "%s %v", 
      decimal : ".",  
      thousand : "\'",
      precision : 2,
      grouping : 3 
    },
    number: {
      precision : 0,
      grouping : 3,
      thousand : "\'",
      decimal : "."
    }
  };

  accounting.languages = accounting.languages || {};
  accounting.languages['de-CH'] = settings;
  accounting.languages['fr-CH'] = settings;
  accounting.languages['it-CH'] = settings;
  accounting.languages['gsw-CH'] = settings;

  return settings;
});
define('accounting/lang/de',[
  'underscore',
  'accounting/accounting'
], function(_, accounting) {
  var settings = {
    currency: {
      symbol : "\u20ac", 
      format : "%v %s", 
      decimal : ",",  
      thousand : ".",
      precision : 2,
      grouping : 3 
    },
    number: {
      precision : 0,
      grouping : 3,
      thousand : ".",
      decimal : ","
    }
  };

  accounting.languages = accounting.languages || {};
  accounting.languages['de'] = settings;
  accounting.languages['de-DE'] = settings;

  return settings;
});

define('accounting/lang/en',[
  'underscore',
  'accounting/accounting'
], function(_, accounting) {
  var settings = {
    currency: {
      symbol : "$",   // default currency symbol is '$'
      format : "%s%v",  // controls output: %s = symbol, %v = value (can be object, see docs)
      decimal : ".",    // decimal point separator
      thousand : ",",   // thousands separator
      precision : 2,    // decimal places
      grouping : 3    // digit grouping (not implemented yet)
    },
    number: {
      precision : 0,    // default precision on numbers is 0
      grouping : 3,   // digit grouping (not implemented yet)
      thousand : ",",
      decimal : "."
    }
  };

  accounting.languages = accounting.languages || {};
  accounting.languages['en'] = settings;
  accounting.languages['en-AU'] = settings;
  accounting.languages['en-NZ'] = settings;
  accounting.languages['en-US'] = settings;

  return settings;
});

define('accounting/lang/eur',[
  'underscore',
  'accounting/accounting'
], function(_, accounting) {
  var settings = {
    currency: {
      symbol : "\u20ac",
      format : "%s%v",  // controls output: %s = symbol, %v = value (can be object, see docs)
      decimal : ".",    // decimal point separator
      thousand : ",",   // thousands separator
      precision : 2,    // decimal places
      grouping : 3    // digit grouping (not implemented yet)
    },
    number: {
      precision : 0,    // default precision on numbers is 0
      grouping : 3,   // digit grouping (not implemented yet)
      thousand : ",",
      decimal : "."
    }
  };

  accounting.languages = accounting.languages || {};
  accounting.languages['en-IE'] = settings;
  accounting.languages['fr'] = settings;
  accounting.languages['fr-FR'] = settings;

  return settings;
});

define('accounting/lang/gb',[
  'underscore',
  'accounting/accounting'
], function(_, accounting) {
  var settings = {
    currency: {
      symbol : "£",   // default currency symbol is '$'
      format : "%s%v",  // controls output: %s = symbol, %v = value (can be object, see docs)
      decimal : ".",    // decimal point separator
      thousand : ",",   // thousands separator
      precision : 2,    // decimal places
      grouping : 3    // digit grouping (not implemented yet)
    },
    number: {
      precision : 0,    // default precision on numbers is 0
      grouping : 3,   // digit grouping (not implemented yet)
      thousand : ",",
      decimal : "."
    }
  };

  accounting.languages = accounting.languages || {};
  accounting.languages['en-GB'] = settings;

  return settings;
});

define('accounting/numbers',[
  'underscore',
  'accounting/accounting',
  'accounting/lang/ch',
  'accounting/lang/de',
  'accounting/lang/en',
  'accounting/lang/eur',
  'accounting/lang/gb'
], function(_, accounting, ch, de, en, ie, gb) {

  // Set default formatting to UK
  accounting.settings = gb;

  function get(locale) {
    var split = locale.split('-'),
        j = split.length;

    while ( j > 0 ) {
      var lang = accounting.languages[split.slice(0, j).join('-')];
      if ( lang ) return lang;
      j--;
    }

  }

  var formatter = {
    lang: function(locale) {
      accounting.settings = get(locale) || gb;
    },
    price: function(price, venueSettings) {
      if ( !_.isNumber(price) || _.isNaN(price) ) return "";

      var ccySymbol = venueSettings && venueSettings.get('ccySymbol');
      var settings = ccySymbol ? {symbol: ccySymbol} : {};

      return accounting.formatMoney(price, settings);

    }

  }

  return formatter;
});
define('effects/vendorPrefix',[], function () {

    /**
     * Helper function to detect browser vendor prefix.
     * Thanks to Lea Verou: http://lea.verou.me/2009/02/find-the-vendor-prefix-of-the-current-browser/
     * I just modified it slightly as I expect it to be used in mobile/WebKit scenarios mostly.
     */
    var vendorPrefix,
        regex = /^(Moz|Webkit|Khtml|O|ms|Icab)(?=[A-Z])/,
        someScript = document.getElementsByTagName('script')[0];

    // Exception for WebKit based browsers
    if ('WebkitOpacity' in someScript.style) {
        vendorPrefix = 'Webkit';
    } else if ('KhtmlOpacity' in someScript.style) {
        vendorPrefix = 'Khtml';
    } else {
        for (var prop in someScript.style) {
            if (regex.test(prop)) {
                // test is faster than match, so it's better to perform
                // that on the lot and match only when necessary
                vendorPrefix = prop.match(regex)[0];
                break;
            }
        }
    }

    return (vendorPrefix.toLowerCase() || '');
});
define('effects/Effect',['effects/vendorPrefix'], function (vendorPrefix) {

    var Effect = function Effect(params) {

        if (params) _.extend(this, params);

        this.vendorPrefix = vendorPrefix;

        if (this.vendorPrefix == 'moz' || this.vendorPrefix == '') this.transitionEndEvent = 'transitionend';
        else if (this.vendorPrefix == 'ms') this.transitionEndEvent = 'MSTransitionEnd';
        else this.transitionEndEvent = this.vendorPrefix + 'TransitionEnd';

    };

    // Shared empty constructor function to aid in prototype-chain creation.
    var ctor = function () {
    };

    Effect.extend = function (protoProps, staticProps) {
        var child = function () {
            Effect.apply(this, arguments);
        };

        // Inherit class (static) properties from parent.
        _.extend(child, Effect);

        // Set the prototype chain to inherit from `parent`, without calling
        // `parent`'s constructor function.
        ctor.prototype = Effect.prototype;
        child.prototype = new ctor();

        // Add prototype properties (instance properties) to the subclass,
        // if supplied.
        if (protoProps) _.extend(child.prototype, protoProps);

        // Add static properties to the constructor function, if supplied.
        if (staticProps) _.extend(child, staticProps);

        // Correctly set child's `prototype.constructor`.
        child.prototype.constructor = child;

        // Set a convenience property in case the parent's prototype is needed later.
        child.__super__ = Effect.prototype;

        return child;
    };

    return Effect;
});
define('effects/SlideEffect',['effects/Effect'], function (Effect) {

    var SlideEffect = Effect.extend({

        direction:'left',

        fromViewTransitionProps:{duration:0.4, easing:'ease-out', delay:0},

        toViewTransitionProps:{duration:0.4, easing:'ease-out', delay:0},

        play:function ($fromView, $toView, callback, context) {

            var timeout,
                that = this,
                activeTransitions = 0,
                transformParams,
                transformProp = that.vendorPrefix == '' ? 'transform' :
                    ['-' + that.vendorPrefix, '-', 'transform'].join(''),
                transitionProp = that.vendorPrefix == '' ? 'transition' :
                    ['-' + that.vendorPrefix, '-', 'transition'].join('');

            var transitionEndHandler = function (event) {
                if (activeTransitions >= 0) {
                    activeTransitions--;

                    var $target = $(event.target);
                    $target.css(transformProp, '');
                    $target.css(transitionProp, '');

                    if ($toView && $toView[0] == event.target) $toView.css('left', 0);

                    if (activeTransitions == 0 && callback) {
                        if (timeout) clearTimeout(timeout);
                        callback.call(context);
                    }
                }
            };

            if ($fromView) {
                activeTransitions++;

                //$fromView.one(that.transitionEndEvent, transitionEndHandler);

                $fromView.css('left', 0);
                $fromView.css(transitionProp, [transformProp, ' ',
                                               that.fromViewTransitionProps.duration, 's ',
                                               that.fromViewTransitionProps.easing, ' ',
                                               that.fromViewTransitionProps.delay, 's'].join(''));
            }

            if ($toView) {
                activeTransitions++;

                //$toView.one(that.transitionEndEvent, transitionEndHandler);

                $toView.css('left', that.direction == 'left' ? context.$el.width() : -context.$el.width());
                $toView.css(transitionProp, [transformProp, ' ',
                                             that.toViewTransitionProps.duration, 's ',
                                             that.toViewTransitionProps.easing, ' ',
                                             that.toViewTransitionProps.delay, 's'].join(''));

                // Showing the view
                //$toView.css('visibility', 'visible');
            }

            if ($fromView || $toView) {
                // This is a hack to force DOM reflow before transition starts
                context.$el.css('width');

                transformParams = 'translate3d(' + (that.direction == 'left' ? -context.$el.width() : context.$el.width()) + 'px, 0, 0)';
            }

            // This is a fallback for situations when TransitionEnd event doesn't get triggered
            var transDuration = Math.max(that.fromViewTransitionProps.duration, that.toViewTransitionProps.duration) +
                Math.max(that.fromViewTransitionProps.delay, that.toViewTransitionProps.delay);

            timeout = setTimeout(function () {
                if (activeTransitions > 0) {
                    activeTransitions = -1;

                    //console.log('Warning ' + that.transitionEndEvent + ' didn\'t trigger in expected time!');

                    if ($toView) {
                        $toView.off(that.transitionEndEvent, transitionEndHandler);
                        $toView.css(transitionProp, '');
                        $toView.css(transformProp, '');
                        $toView.css('left', 0);
                    }

                    if ($fromView) {
                        $fromView.off(that.transitionEndEvent, transitionEndHandler);
                        $fromView.css(transitionProp, '');
                        $fromView.css(transformProp, '');
                    }

                    callback.call(context);
                }
            }, transDuration * 1000); // * 1.5

            var $views;
            if ($fromView && $toView) $views = $fromView.add($toView);
            else if ($toView) $views = $toView;
            else if ($fromView) $views = $fromView;

            if ($toView) $toView.css('visibility', 'visible');
            
            if ($views) $views.css(transformProp, transformParams);
        }
    });

    return SlideEffect;
});
define('effects/NoEffect',['effects/Effect'], function (Effect) {

    var NoEffect = Effect.extend();
    NoEffect.prototype.play = function ($fromView, $toView, callback, context) {
        if ($toView) {
            // Showing the view
            $toView.css('visibility', 'visible');
        }
        callback.call(context);
    };

    return NoEffect;
});
define('effects/PopEffect',[ 'effects/Effect' ], function(Effect) {

	var StackEffect = Effect.extend({

		back : false,

		play : function($fromView, $toView, callback, context) {
			var tOut = 200 * 1.5;

			if ( !this.back ) {
				if ($toView) {

					// Showing the view
					$toView.css('visibility', 'visible');
					$toView.css('-webkit-transform', 'scale(0.8)');

					setTimeout(function() {
						$toView.css('-webkit-transition',
								'-webkit-transform 0.2s ease-out 0s');
						$toView.css('-webkit-transform', 'scale(1)');
					}, 0);
				}

			} else {
				if ( $toView ) {
					$toView.css('visibility', 'visible');
				}
				
				tOut = 0;
			} 

			
			// just call the timeout after 400mm
			setTimeout(function() {
				callback.call(context);
			}, tOut);
		}
	});
	return StackEffect;
});
define('StackNavigator',['effects/SlideEffect', 'effects/NoEffect', 'effects/PopEffect'], function (SlideEffect, NoEffect, PopEffect) {

    var DefaultEffect = $.os.android ? PopEffect : $.browser.ie ? NoEffect : SlideEffect;

    /**
     * Rendering the view and setting props required by StackNavigator.
     * @private
     * @ignore
     *
     * @param {View} view View to be rendered.
     * @param {StackNavigator} stackNavigator View StackNavigator instance.
     */
    function appendView(view, stackNavigator) {

        if (!view.__backStackRendered__) {

            // Setting ref to parent StackNavigator
            view.stackNavigator = stackNavigator;

            // Setting default destructionPolicy if it's not set
            if (typeof view.destructionPolicy === 'undefined') view.destructionPolicy = 'auto';

            // Setting default styles
            view.$el.css({position:'absolute', visibility:'hidden', overflow:'hidden', width:'100%', height:'100%'});

        } else {
            // Resetting visibility to hidden
            view.$el.css({visibility:'hidden'});
            
        }

        // Adding view to the DOM
        stackNavigator.$el.append(view.el);

        if (!view.__backStackRendered__) {
            // Rendering the view
            view.render.call(view);

            // Setting default of __backStackRendered__ property
            view.__backStackRendered__ = true;
        }


        createEvent('viewAppended', {target:view}).trigger(view);
    }

    /**
     * Creates event objects triggered by BackStack.
     * @private
     * @ignore
     *
     * @param {string} type Event type name.
     * @param {*} args Event args.
     * @param {boolean} cancelable Flag indicating if event is cancelable.
     * @return {event} The new object.
     */
    function createEvent(type, args, cancelable) {
        return _.extend({

            type:type,

            cancelable:_.isUndefined(cancelable) ? false : cancelable,

            preventDefault:function () {
                if (this.cancelable)
                    this.isDefaultPrevented = function () {
                        return true;
                    };
            },

            isDefaultPrevented:function () {
                return false;
            },

            trigger:function (target) {
                target.trigger(this.type, this);
                return this;
            }
        }, args);
    }

    /**
     * Private common push method.
     * @private
     * @ignore
     *
     * @param {object} fromViewRef Reference to from view.
     * @param {object} toViewRef Reference to to view.
     * @param {number} replaceHowMany Number of views to replace with pushed view.
     * @param {Effect} transition Transition to played during push.
     */
    function push(fromViewRef, toViewRef, replaceHowMany, transition) {

        // Rendering view if required
        appendView(toViewRef.instance, this);

        transition = transition || this.defaultPushTransition || (this.defaultPushTransition = new DefaultEffect({direction:'left'}));
        transition.back = false;
        transition.play(fromViewRef ? fromViewRef.instance.$el : null, toViewRef.instance.$el,
            function () { // Callback function

                var remove = replaceHowMany > 0 ? this.viewsStack.splice(this.viewsStack.length - replaceHowMany, replaceHowMany)
                    : (fromViewRef ? [fromViewRef] : null);

                if (remove != null) {
                    _.each(remove, function (ref) {

                        // Triggering viewDeactivate event
                    	if ( ref.instance ) {
                        createEvent('viewDeactivate', {target:ref.instance}).trigger(ref.instance);

                        if (ref.instance.destructionPolicy == 'never' || ref.instance.destructionPolicy == 'neverPush' ) { // Detaching if destructionPolicy == 'never'
                            ref.instance.$el.detach();
                        } else { // Removing if destructionPolicy == 'auto'
                            ref.instance.remove();
                            ref.instance = null;
                        }
                    	}
                    }, this);
                }

                // Adding view to the stack internal array
                this.viewsStack.push(toViewRef);

                // Setting activeView property
                this.activeView = toViewRef.instance;

                // Triggering viewActivate event
                createEvent('viewActivate', {target:toViewRef.instance}).trigger(toViewRef.instance);

                // Triggering viewChanged event
                createEvent('viewChanged', {target:this}).trigger(this);

                // Popping item from actions queue
                popActionsQueue.call(this);

            }, this);
    }

    /**
     * Private common pop method.
     * @private
     * @ignore
     *
     * @param {object} fromViewRef Reference to from view.
     * @param {object} toViewRef Reference to to view.
     * @param {number} howMany Number of views to pop from the stack.
     * @param {Effect} transition Transition to played during pop.
     */
    function pop(fromViewRef, toViewRef, howMany, transition) {

        if (toViewRef) {
            // Recreating view instance if necessary
            toViewRef.instance = toViewRef.instance ? toViewRef.instance : new toViewRef.viewClass(toViewRef.options);
            // Rendering view if required
            appendView(toViewRef.instance, this);
        }

        transition = transition || this.defaultPopTransition || (this.defaultPopTransition = new DefaultEffect({direction:'right'}));
        transition.back = true;
        transition.play(fromViewRef.instance.$el, toViewRef ? toViewRef.instance.$el : null,
            function () { // Callback function

                // Popping views from a stack
                var remove = this.viewsStack.splice(this.viewsStack.length - howMany, howMany);
                _.each(remove, function (ref) {

                    // Triggering viewDeactivate event
                    createEvent('viewDeactivate', {target:ref.instance}).trigger(ref.instance);

                    if (ref.instance.destructionPolicy == 'never') { // Detaching if destructionPolicy == 'never'
                        ref.instance.$el.detach();
                    } else { // Removing if destructionPolicy == 'auto'
                        ref.instance.remove();
                        ref.instance = null;
                    }
                }, this);

                if (toViewRef) { // If toViewRef exists activating it

                    // Setting activeView property
                    this.activeView = toViewRef.instance;

                    // Triggering viewActivate event
                    createEvent('viewActivate', {target:toViewRef.instance}).trigger(toViewRef.instance);

                } else { // Nulling activeView property
                    this.activeView = null;
                }

                // Triggering viewChanged event
                createEvent('viewChanged', {target:this}).trigger(this);

                // Popping item from actions queue
                popActionsQueue.call(this);
            }, this);
    }

    function pushView(view, viewOptions, transition) {
        // Getting ref of the view on top of the stack
        var fromViewRef = _.last(this.viewsStack),
        // Creating new view instance if it is necessary
            toView = _.isFunction(view) ? new view(viewOptions) : view,
        // Creating new view ref
            toViewRef = {instance:toView, viewClass:toView.constructor, options:viewOptions},
        // Creating viewChanging event object and triggering it
            event = createEvent('viewChanging',
                {
                    action:'push',
                    fromViewClass:fromViewRef ? fromViewRef.viewClass : null,
                    fromView:fromViewRef ? fromViewRef.instance : null,
                    toViewClass:toViewRef.viewClass,
                    toView:toViewRef.instance
                },
                true).trigger(this);

        // Checking if event wasn't cancelled
        if (event.isDefaultPrevented()) return null;

        push.call(this, fromViewRef, toViewRef, 0, transition);
    }

    function popView(transition) {
        if (this.viewsStack.length == 0) throw new Error('Popping from an empty stack!');

        // Getting ref of the view on top of the stack
        var fromViewRef = _.last(this.viewsStack),
        // Getting ref of the view below current one
            toViewRef = this.viewsStack.length > 1 ? this.viewsStack[this.viewsStack.length - 2] : null,
        // Creating viewChanging event object and triggering it
            event = createEvent('viewChanging',
                {
                    action:'pop',
                    fromViewClass:fromViewRef.viewClass,
                    fromView:fromViewRef.instance,
                    toViewClass:toViewRef ? toViewRef.viewClass : null,
                    toView:toViewRef ? toViewRef.instance : null
                },
                true).trigger(this);

        // Checking if event wasn't cancelled
        if (event.isDefaultPrevented()) return;

        // Popping top view
        pop.call(this, fromViewRef, toViewRef, 1, transition);
    }

    function popAll(transition) {
        if (this.viewsStack.length == 0) throw new Error('Popping from an empty stack!');

        // Getting ref of the view on top of the stack
        var fromViewRef = _.last(this.viewsStack),
        // Creating viewChanging event object and triggering it
            event = createEvent('viewChanging',
                {
                    action:'popAll',
                    fromViewClass:fromViewRef.viewClass,
                    fromView:fromViewRef.instance,
                    toViewClass:null,
                    toView:null
                },
                true).trigger(this);

        // Checking if event wasn't cancelled
        if (event.isDefaultPrevented()) return;

        // Popping top view
        pop.call(this, fromViewRef, null, this.viewsStack.length, transition);
    }

    function replaceView(view, viewOptions, transition) {
        if (this.viewsStack.length == 0) throw new Error('Replacing on an empty stack!');

        // Getting ref of the view on top of the stack
        var fromViewRef = _.last(this.viewsStack),
        // Creating new view instance if it is necessary
            toView = _.isFunction(view) ? new view(viewOptions) : view,
        // Creating new view ref
            toViewRef = {instance:toView, viewClass:toView.constructor, options:viewOptions},
        // Creating viewChanging event object and triggering it
            event = createEvent('viewChanging',
                {
                    action:'replace',
                    fromViewClass:fromViewRef.viewClass,
                    fromView:fromViewRef.instance,
                    toViewClass:toViewRef.viewClass,
                    toView:toViewRef.instance
                },
                true).trigger(this);

        // Checking if event wasn't cancelled
        if (event.isDefaultPrevented()) return null;

        // Pushing new view on top
        push.call(this, fromViewRef, toViewRef, 1, transition);
    }

    function replaceAll(view, viewOptions, transition) {
        //if (this.viewsStack.length == 0) throw new Error('Replacing on an empty stack!');

        // Getting ref of the view on top of the stack
        var fromViewRef = _.last(this.viewsStack),
        // Creating new view instance if it is necessary
            toView = _.isFunction(view) ? new view(viewOptions) : view,
        // Creating new view ref
            toViewRef = {instance:toView, viewClass:toView.constructor, options:viewOptions},
        // Creating viewChanging event object and triggering it
            event = createEvent('viewChanging',
                {
                    action:'replaceAll',
                    fromViewClass:fromViewRef && fromViewRef.viewClass,
                    fromView:fromViewRef && fromViewRef.instance,
                    toViewClass:toViewRef.viewClass,
                    toView:toViewRef.instance
                },
                true).trigger(this);

        // Checking if event wasn't cancelled
        if (event.isDefaultPrevented()) return null;

        // Pushing new view on top
        push.call(this, fromViewRef, toViewRef, (viewOptions && viewOptions.replaceLength) || this.viewsStack.length, transition);
    }

    function popActionsQueue() {
        this.actionsQueue.splice(0, 1);
        if (this.actionsQueue.length > 0) {
            var action = this.actionsQueue[0],
                args = Array.prototype.slice.call(action.args);
            switch (action.fn) {
                case 'pushView':
                    pushView.apply(this, args);
                    break;
                case 'popView':
                    popView.apply(this, args);
                    break;
                case 'popAll':
                    popAll.apply(this, args);
                    break;
                case 'replaceView':
                    replaceView.apply(this, args);
                    break;
                case 'replaceAll':
                    replaceAll.apply(this, args);
                    break;
            }
        }
    }

    var StackNavigator = Backbone.View.extend(
        /** @lends BackStack.StackNavigator */
        {
            /**
             * @name StackNavigator#viewChanging
             * @event
             * @param {Object} e
             * @param {Boolean} [e.cancelable=true]
             */

            /**
             * An array with all the view refs on the stack.
             */
            viewsStack:null,

            /**
             * View on top of the stack.
             */
            activeView:null,

            /**
             * Default push transition effect.
             */
            defaultPushTransition:null,

            /**
             * Default pop transition effect.
             */
            defaultPopTransition:null,

            /**
             * Queue of actions to be executed on the stack.
             */
            actionsQueue:null,

            /**
             * Initializes StackNavigator.
             *
             * @param {Object} options This is a Backbone.View options hash that can have popTransition and pushTransition
             * properties that can be initiated for this instance of navigator.
             *
             * @constructs
             * */
            initialize:function (options) {
                // Setting default styles
                this.$el.css({overflow:'hidden'});

                // Setting new viewsStack array
                this.viewsStack = [];

                // Setting new queue of actions
                this.actionsQueue = [];

                // Setting default pop transition
                if (options.popTransition) this.defaultPopTransition = options.popTransition;

                // Setting default push transition
                if (options.pushTransition) this.defaultPushTransition = options.pushTransition;
            },

            /**
             * Pushes new view to the stack.
             *
             * @param {Backbone.View || Backbone.ViewClass} view View class or view instance to be pushed to the stack.
             * @param {Object} viewOptions Options to be passed if view is contructed by StackNavigator.
             * @param {Effect} transition Transition effect to be played when pushing new view.
             */
            pushView:function (view, viewOptions, transition) {
                // Pushing current action to the queue
                this.actionsQueue.push({fn:'pushView', args:arguments});

                if (this.actionsQueue.length == 1) pushView.call(this, view, viewOptions, transition);
            },

            /**
             * Pops an active view from a stack and displays one below.
             *
             * @param {Effect} transition Transition effect to be played when popping new view.
             */
            popView:function (transition) {
                // Pushing current action to the queue
                this.actionsQueue.push({fn:'popView', args:arguments});

                if (this.actionsQueue.length == 1) popView.call(this, transition);
            },

            /**
             * Pops all views from a stack and leaves empty stack.
             *
             * @param {Effect} transition Transition effect to be played when popping views.
             */
            popAll:function (transition) {
                // Pushing current action to the queue
                this.actionsQueue.push({fn:'popAll', args:arguments});

                if (this.actionsQueue.length == 1) popAll.call(this, transition);
            },

            /**
             * Replaces view on top of the stack, with the one passed as a view param.
             *
             * @param {Backbone.View || Backbone.ViewClass} view View class or view instance to be pushed on top of the stack instead of current one.
             * @param {Object} viewOptions Hash with options to be passed to the view, if view param is not an instance.
             * @param {Effect} transition Transition effect to be played when replacing views.
             */
            replaceView:function (view, viewOptions, transition) {
                // Pushing current action to the queue
                this.actionsQueue.push({fn:'replaceView', args:arguments});

                if (this.actionsQueue.length == 1) replaceView.call(this, view, viewOptions, transition);
            },

            /**
             * Replaces all of the views on the stack, with the one passed as a view param.
             *
             * @param {Backbone.View || Backbone.ViewClass} view View class or view instance to be pushed on top of the stack.
             * @param {Object} viewOptions Hash with options to be passed to the view, if view param is not an instance.
             * @param {Effect} transition Transition effect to be played when replacing views.
             */
            replaceAll:function (view, viewOptions, transition) {
                // Pushing current action to the queue
                this.actionsQueue.push({fn:'replaceAll', args:arguments});

                if (this.actionsQueue.length == 1) replaceAll.call(this, view, viewOptions, transition);
            }
        });

    return StackNavigator;
});
define('effects/StackEffect',[ 'effects/Effect' ], function(Effect) {

	var StackEffect = Effect.extend({

		back : false,

		play : function($fromView, $toView, callback, context) {
			if ($toView) {

				// Showing the view
				var windowWidth = window.innerWidth;
				$toView.css('visibility', 'visible');
				$toView.css('-webkit-transform', 'translate3d(0,400px,0)');
				if ( $fromView ) $fromView.css('-webkit-transform', 'translate3d(0,0,0)');

				setTimeout(function() {
					$toView.css('-webkit-transition',
							'-webkit-transform 0.4s ease-out 0s');
					$toView.css('-webkit-transform', 'translate3d(0,0,0)');
				}, 0);
			}
			
			// just call the timeout after 400mm
			setTimeout(function() {
				callback.call(context);
			}, 400 * 1.5);
		}
	});
	return StackEffect;
});
(function(){var e,t,n,r,i,s={}.hasOwnProperty,o=function(e,t){function r(){this.constructor=e}for(var n in t)s.call(t,n)&&(e[n]=t[n]);return r.prototype=t.prototype,e.prototype=new r,e.__super__=t.prototype,e},u=this;this.Stripe=function(){function e(){}return e.version=2,e.endpoint="https://api.stripe.com/v1",e.setPublishableKey=function(t){e.key=t},e.complete=function(t){return function(n,r,i){var s;if(n!=="success")return s=Math.round((new Date).getTime()/1e3),(new Image).src="https://q.stripe.com?event=stripejs-error&type="+n+"&key="+e.key+"&timestamp="+s,typeof t=="function"?t(500,{error:{code:n,type:n,message:"An unexpected error has occurred submitting your credit\ncard to our secure credit card processor. This may be\ndue to network connectivity issues, so you should try\nagain (you won't be charged twice). If this problem\npersists, please let us know!"}}):void 0}},e}.call(this),e=this.Stripe,this.Stripe.token=function(){function t(){}return t.validate=function(e,t){if(!e)throw t+" required";if(typeof e!="object")throw t+" invalid"},t.formatData=function(t,n){return e.utils.isElement(t)&&(t=e.utils.paramsFromForm(t,n)),e.utils.underscoreKeys(t),t},t.create=function(t,n){return t.key||(t.key=e.key||e.publishableKey),e.utils.validateKey(t.key),e.ajaxJSONP({url:""+e.endpoint+"/tokens",data:t,method:"POST",success:function(e,t){return typeof n=="function"?n(t,e):void 0},complete:e.complete(n),timeout:4e4})},t.get=function(t,n){if(!t)throw"token required";return e.utils.validateKey(e.key),e.ajaxJSONP({url:""+e.endpoint+"/tokens/"+t,data:{key:e.key},success:function(e,t){return typeof n=="function"?n(t,e):void 0},complete:e.complete(n),timeout:4e4})},t}.call(this),this.Stripe.card=function(t){function n(){return n.__super__.constructor.apply(this,arguments)}return o(n,t),n.tokenName="card",n.whitelistedAttrs=["number","cvc","exp_month","exp_year","name","address_line1","address_line2","address_city","address_state","address_zip","address_country"],n.createToken=function(t,r,i){var s;return r==null&&(r={}),e.token.validate(t,"card"),typeof r=="function"?(i=r,r={}):typeof r!="object"&&(s=parseInt(r,10),r={},s>0&&(r.amount=s)),r[n.tokenName]=e.token.formatData(t,n.whitelistedAttrs),e.token.create(r,i)},n.getToken=function(t,n){return e.token.get(t,n)},n.validateCardNumber=function(e){return e=(e+"").replace(/\s+|-/g,""),e.length>=10&&e.length<=16&&n.luhnCheck(e)},n.validateCVC=function(t){return t=e.utils.trim(t),/^\d+$/.test(t)&&t.length>=3&&t.length<=4},n.validateExpiry=function(t,n){var r,i;return t=e.utils.trim(t),n=e.utils.trim(n),/^\d+$/.test(t)?/^\d+$/.test(n)?parseInt(t,10)<=12?(i=new Date(n,t),r=new Date,i.setMonth(i.getMonth()-1),i.setMonth(i.getMonth()+1,1),i>r):!1:!1:!1},n.luhnCheck=function(e){var t,n,r,i,s,o;r=!0,i=0,n=(e+"").split("").reverse();for(s=0,o=n.length;s<o;s++){t=n[s],t=parseInt(t,10);if(r=!r)t*=2;t>9&&(t-=9),i+=t}return i%10===0},n.cardType=function(e){return n.cardTypes[e.slice(0,2)]||"Unknown"},n.cardTypes=function(){var e,t,n,r;t={};for(e=n=40;n<=49;e=++n)t[e]="Visa";for(e=r=50;r<=59;e=++r)t[e]="MasterCard";return t[34]=t[37]="American Express",t[60]=t[62]=t[64]=t[65]="Discover",t[35]="JCB",t[30]=t[36]=t[38]=t[39]="Diners Club",t}(),n}.call(this,this.Stripe.token),this.Stripe.bankAccount=function(t){function n(){return n.__super__.constructor.apply(this,arguments)}return o(n,t),n.tokenName="bank_account",n.whitelistedAttrs=["country","routing_number","account_number"],n.createToken=function(t,r,i){return r==null&&(r={}),e.token.validate(t,"bank account"),typeof r=="function"&&(i=r,r={}),r[n.tokenName]=e.token.formatData(t,n.whitelistedAttrs),e.token.create(r,i)},n.getToken=function(t,n){return e.token.get(t,n)},n.validateRoutingNumber=function(t,r){t=e.utils.trim(t);switch(r){case"US":return/^\d+$/.test(t)&&t.length===9&&n.routingChecksum(t);case"CA":return/\d{5}\-\d{3}/.test(t)&&t.length===9;default:return!0}},n.validateAccountNumber=function(t,n){t=e.utils.trim(t);switch(n){case"US":return/^\d+$/.test(t)&&t.length>=1&&t.length<=17;default:return!0}},n.routingChecksum=function(e){var t,n,r,i,s,o;r=0,t=(e+"").split(""),o=[0,3,6];for(i=0,s=o.length;i<s;i++)n=o[i],r+=parseInt(t[n])*3,r+=parseInt(t[n+1])*7,r+=parseInt(t[n+2]);return r!==0&&r%10===0},n}.call(this,this.Stripe.token),t=["createToken","getToken","cardType","validateExpiry","validateCVC","validateCardNumber"];for(r=0,i=t.length;r<i;r++)n=t[r],this.Stripe[n]=this.Stripe.card[n];typeof module!="undefined"&&module!==null&&(module.exports=this.Stripe),typeof define=="function"&&define("stripe",[],function(){return u.Stripe})}).call(this),function(){var e,t,n,r=[].slice;e=encodeURIComponent,t=(new Date).getTime(),n=function(t,r,i){var s,o;r==null&&(r=[]);for(s in t)o=t[s],i&&(s=""+i+"["+s+"]"),typeof o=="object"?n(o,r,s):r.push(""+s+"="+e(o));return r.join("&").replace(/%20/g,"+")},this.Stripe.ajaxJSONP=function(e){var i,s,o,u,a,f;return e==null&&(e={}),o="sjsonp"+ ++t,a=document.createElement("script"),s=null,i=function(t){var n;return t==null&&(t="abort"),clearTimeout(s),(n=a.parentNode)!=null&&n.removeChild(a),o in window&&(window[o]=function(){}),typeof e.complete=="function"?e.complete(t,f,e):void 0},f={abort:i},a.onerror=function(){return f.abort(),typeof e.error=="function"?e.error(f,e):void 0},window[o]=function(){var t;t=1<=arguments.length?r.call(arguments,0):[],clearTimeout(s),a.parentNode.removeChild(a);try{delete window[o]}catch(n){window[o]=void 0}return typeof e.success=="function"&&e.success.apply(e,t),typeof e.complete=="function"?e.complete("success",f,e):void 0},e.data||(e.data={}),e.data.callback=o,e.method&&(e.data._method=e.method),a.src=e.url+"?"+n(e.data),u=document.getElementsByTagName("head")[0],u.appendChild(a),e.timeout>0&&(s=setTimeout(function(){return f.abort("timeout")},e.timeout)),f}}.call(this),function(){var e=[].indexOf||function(e){for(var t=0,n=this.length;t<n;t++)if(t in this&&this[t]===e)return t;return-1};this.Stripe.utils=function(){function t(){}return t.trim=function(e){return(e+"").replace(/^\s+|\s+$/g,"")},t.underscore=function(e){return(e+"").replace(/([A-Z])/g,function(e){return"_"+e.toLowerCase()}).replace(/-/g,"_")},t.underscoreKeys=function(e){var t,n,r;r=[];for(t in e)n=e[t],delete e[t],r.push(e[this.underscore(t)]=n);return r},t.isElement=function(e){return typeof e!="object"?!1:typeof jQuery!="undefined"&&jQuery!==null&&e instanceof jQuery?!0:e.nodeType===1},t.paramsFromForm=function(t,n){var r,i,s,o,u,a,f,l,c,h;n==null&&(n=[]),typeof jQuery!="undefined"&&jQuery!==null&&t instanceof jQuery&&(t=t[0]),s=t.getElementsByTagName("input"),u=t.getElementsByTagName("select"),a={};for(f=0,c=s.length;f<c;f++){i=s[f],r=this.underscore(i.getAttribute("data-stripe"));if(e.call(n,r)<0)continue;a[r]=i.value}for(l=0,h=u.length;l<h;l++){o=u[l],r=this.underscore(o.getAttribute("data-stripe"));if(e.call(n,r)<0)continue;o.selectedIndex!=null&&(a[r]=o.options[o.selectedIndex].value)}return a},t.validateKey=function(e){if(!e||typeof e!="string")throw new Error("You did not set a valid publishable key. Call Stripe.setPublishableKey() with your publishable key. For more info, see https://stripe.com/docs/stripe.js");if(/\s/g.test(e))throw new Error("Your key is invalid, as it contains whitespace. For more info, see https://stripe.com/docs/stripe.js");if(/^sk_/.test(e))throw new Error("You are using a secret key with Stripe.js, instead of the publishable one. For more info, see https://stripe.com/docs/stripe.js")},t}()}.call(this),function(){var e=[].indexOf||function(e){for(var t=0,n=this.length;t<n;t++)if(t in this&&this[t]===e)return t;return-1};this.Stripe.validator={"boolean":function(e,t){if(t!=="true"&&t!=="false")return"Enter a boolean string (true or false)"},integer:function(e,t){if(!/^\d+$/.test(t))return"Enter an integer"},positive:function(e,t){if(!(!this.integer(e,t)&&parseInt(t,10)>0))return"Enter a positive value"},range:function(t,n){var r;if(r=parseInt(n,10),e.call(t,r)<0)return"Needs to be between "+t[0]+" and "+t[t.length-1]},required:function(e,t){if(e&&(t==null||t===""))return"Required"},year:function(e,t){if(!/^\d{4}$/.test(t))return"Enter a 4-digit year"},birthYear:function(e,t){var n;n=this.year(e,t);if(n)return n;if(parseInt(t,10)>2e3)return"You must be over 18";if(parseInt(t,10)<1900)return"Enter your birth year"},month:function(e,t){if(this.integer(e,t))return"Please enter a month";if(this.range([1,2,3,4,5,6,7,8,9,10,11,12],t))return"Needs to be between 1 and 12"},choices:function(t,n){if(e.call(t,n)<0)return"Not an acceptable value for this field"},email:function(e,t){if(!/^[^@<\s>]+@[^@<\s>]+$/.test(t))return"That doesn't look like an email address"},url:function(e,t){if(!/^https?:\/\/.+\..+/.test(t))return"Not a valid url"},usTaxID:function(e,t){if(!/^\d{2}-?\d{1}-?\d{2}-?\d{4}$/.test(t))return"Not a valid tax ID"},ein:function(e,t){if(!/^\d{2}-?\d{7}$/.test(t))return"Not a valid EIN"},ssnLast4:function(e,t){if(!/^\d{4}$/.test(t))return"Not a valid last 4 digits for an SSN"},ownerPersonalID:function(e,t){var n;n=function(){switch(e){case"CA":return/^\d{3}-?\d{3}-?\d{3}$/.test(t);case"US":return!0}}();if(!n)return"Not a valid ID"},bizTaxID:function(e,t){var n,r,i,s,o,u,a,f;u={CA:["Tax ID",[/^\d{9}$/]],US:["EIN",[/^\d{2}-?\d{7}$/]]},o=u[e];if(o!=null){n=o[0],s=o[1],r=!1;for(a=0,f=s.length;a<f;a++){i=s[a];if(i.test(t)){r=!0;break}}if(!r)return"Not a valid "+n}},zip:function(e,t){var n;n=function(){switch(e.toUpperCase()){case"CA":return/^[\d\w]{6}$/.test(t!=null?t.replace(/\s+/g,""):void 0);case"US":return/^\d{5}$/.test(t)||/^\d{9}$/.test(t)}}();if(!n)return"Not a valid zip"},bankAccountNumber:function(e,t){if(!/^\d{1,17}$/.test(t))return"Invalid bank account number"},usRoutingNumber:function(e){var t,n,r,i,s,o,u;if(!/^\d{9}$/.test(e))return"Routing number must have 9 digits";s=0;for(t=o=0,u=e.length-1;o<=u;t=o+=3)n=parseInt(e.charAt(t),10)*3,r=parseInt(e.charAt(t+1),10)*7,i=parseInt(e.charAt(t+2),10),s+=n+r+i;if(s===0||s%10!==0)return"Invalid routing number"},caRoutingNumber:function(e){if(!/^\d{5}\-\d{3}$/.test(e))return"Invalid transit number"},routingNumber:function(e,t){switch(e.toUpperCase()){case"CA":return this.caRoutingNumber(t);case"US":return this.usRoutingNumber(t)}},phoneNumber:function(e,t){var n;n=t.replace(/[^0-9]/g,"");if(n.length!==10)return"Invalid phone number"},bizDBA:function(e,t){if(!/^.{1,23}$/.test(t))return"Statement descriptors can only have up to 23 characters"},nameLength:function(e,t){if(t.length===1)return"Names need to be longer than one character"}}}.call(this);
//Filename: models/modelConfiguration.js

define('modelConfiguration',[], function(){
    return $settings;
});
// Filename: models/card
define('models/card',[ "underscore", "backbone", "stripe", "modelConfiguration"], function(_, Backbone, Stripe, Configuration) {
	var Model = Backbone.Model.extend({
		
  	urlRoot: Configuration.apiRoot + "paymentmethods",
        parse: function(model) {
            delete model.store;
            return model;
        },
		validation : {
			name : {
				required : true,
                maxLength: 35,
                pattern: /^([ \u00c0-\u01ffa-zA-Z'\-.,])+$/
			},
			number : {
				required : true,
				pattern: /^[0-9]*$/,
                minLength: 5,
                maxLength: 20
			},
			cvc : {
				required : true,
				rangeLength : [ 3, 4 ],
                pattern: /^[0-9]*$/
			},
			exp_month : {
				required : true,
				pattern : /^\d{2}$/,
                oneOf: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]
			},
			exp_year : {
				required : true,
				pattern : /^\d{2}$/
			}

		},

		luhnValid : function(str, attr, computed) {
			var luhnArr = [ 0, 2, 4, 6, 8, 1, 3, 5, 7, 9 ];
			var counter = 0;
			var incNum;
			var odd = false;
			var temp = String(str).replace(/[^\d]/g, "");
			if (temp.length > 0) {
				for ( var i = temp.length - 1; i >= 0; --i) {
					incNum = parseInt(temp.charAt(i), 10);
					counter += (odd = !odd) ? incNum : luhnArr[incNum];
				}
				
				if (counter % 10 != 0) {
					return "Credit card number is invalid";
				}
			}
		},
		
		// return json for an order
		// strip out everything except id's
		toOrderJSON: function() {
			if ( this.get('id') ) {
				return {id: this.get('id')};
			} else {
				return this.toJSON();
			}
		}

	});

	return Model;
});
// Filename: models/card-collection
define('models/card-collection',[
    "underscore",
    "backbone",
    "models/card"
], function (_, Backbone, Card) {
    var Model = Backbone.Collection.extend({
        model: Card,
        clearUnsaved: function () {
            // remove addresses from the local collection that user elected not to save.
            // these aren't sent to api so only local removal is required.
            var unsaved = this.getUnsaved();
            if (!!unsaved.length) this.remove(unsaved);
        },
        getUnsaved: function () {
            var filtered = this.filter(function (model) {
                return (model.get('store') === false);
            });
            return filtered;
        }
    });

    // Our module now returns our view
    return Model;
});
/** address.js
 *
 *  This active record object is a Backbone Model for addresses.
 *
 *  @author: A. I. Grayson-Widarsito
 */

define('models/address',[ "underscore", "backbone", "modelConfiguration"], function(_, Backbone, Configuration) {
    var Model = Backbone.Model.extend({

        url: function(){
            if (typeof this.get("id") == "undefined"){
                return Configuration.apiRoot + "users/" + this.get("userId") + "/addresses";
            }else{
                return Configuration.apiRoot + "users/" + this.get("userId") + "/addresses/" + this.get("id");
            }
        },

        defaults: {
            address2: "",
            address3: "",
            country: "UK"
        },

        validation : {
            userId : {
                required : true
            },
            address1 : {
                required : true,
                minLength: 2,
                maxLength: 100,
                pattern: /^([ \u0180-\u024F\u0100-\u017Fa-zA-Z0-9\-\_ ,.\/])+$/
            },
            address2 : {
                required : false,
                minLength: 2,
                maxLength: 100,
                pattern: /^([ \u0180-\u024F\u0100-\u017Fa-zA-Z0-9\-\_ ,.\/])+$/
            },
            address3 : {
                required : false,
                minLength: 2,
                maxLength: 100,
                pattern: /^([ \u0180-\u024F\u0100-\u017Fa-zA-Z0-9\-\_ ,.\/])+$/
            },
            city : {
                required : true,
                minLength: 2,
                maxLength: 35,
                pattern: /^([ \u0180-\u024F\u0100-\u017Fa-zA-Z\-\_ ,.\/])+$/
            },
            postcode : {
                required : true,
                maxLength: 9,
                minLength: 1,
                pattern: /^[a-zA-Z0-9 ]*$/
            },
            county : {
                required : true,
                minLength: 2,
                maxLength: 35,
                pattern: /^([ \u0180-\u024F\u0100-\u017Fa-zA-Z\-\_ ,.\/])+$/
            },
            country : {
                required : true
            }
        }

    });

    return Model;
});
// Filename: models/address-collection
define('models/address-collection',[
    "underscore",
    "backbone",
    "models/address"
], function(_, Backbone, Address) {
    var Model = Backbone.Collection.extend({
        model: Address,
        url: function() {
            return $settings.apiRoot + "users/" + this.userId + "/addresses";
        },
        clearUnsaved: function(){
            // remove addresses from the local collection that user elected not to save.
            // these aren't sent to api so only local removal is required.
            var unsaved = this.getUnsaved();
            if (!!unsaved.length) this.remove(unsaved);
        },
        getUnsaved: function(){
            var filtered = this.filter(function(model){
                return (model.get('store') === false);
            });
            return filtered;
        }
    });

    return Model;

});
// Filename: models/user
define('models/User',[
  "jquery",
  "underscore",
  "backbone",
  "models/card-collection",
  "models/address-collection",
  "modelConfiguration"
], function($, _, Backbone, CardCollection, AddressCollection, Configuration, Validation){
  var Model = Backbone.Model.extend({
  	urlRoot: Configuration.apiRoot + "users",
  	
  	defaults: {
  		paymentMethods: new CardCollection(),
        addresses: new AddressCollection()
  	},
  	
  	validation : {
			name : {
				required : true
			},

            /** firstName and lastName validation
             *
             *  This function will return regex used to validate partially against international names.
             *  This includes all names expressible in ASCII Latin, as well as those characters in the
             *  Latin Extended A block (U+0100 - U+017F) including, Latin, Czech, Dutch, Polish and
             *  Turkish characters. Latin Extended B (U+0180 - U+024F) is also supported, including the
             *  Africa alphabet, Pan-Nigerian, Americanist, Khoisan, Pinyin and Romanian symbols. Commas,
             *  periods, hyphens and spaces are allowed.
             *
             */
            firstName: {
                minLength: 1,
                maxLength: 35,
                pattern: /^([\u0180-\u024F\u0100-\u017Fa-zA-Z'\-., ])+$/
            },
            lastName: {
                minLength: 1,
                maxLength: 35,
                pattern: /^([\u0180-\u024F\u0100-\u017Fa-zA-Z'\-., ])+$/
            },

			email : {
				required : true,
				pattern : "email"
			},
			password : {
				required : true
			},
            phone: {
                // Number is optional but if given make sure it's 
                // between minLength and maxLength and matches the pattern
                fn: function(value, attr, model) {
                  var minLength = 7;
                  var maxLength = 20;
                  if ( !(_.isNull(value) || _.isUndefined(value)) ) {
                    if ( value.trim().length < minLength || value.trim().length > maxLength ) {
                      return attr + ' must be between ' + minLength + ' and ' + maxLength + ' characters';
                    }
                    var pattern = /^[+]?[\d\(\)\.\- ]*$/;
                    if ( !value.toString().match(pattern) ) {
                      return attr + ' must be a valid phone number';
                    }
                  }
                }
            }

		},
  	
  	parse: function(response) {
  		response.paymentMethods = new CardCollection(response.paymentMethods, {parse: true});
  		response.selectedMethod = response.paymentMethods.first();
        response.addresses = new AddressCollection(response.addresses);
        response.addressSelected = response.addresses.first();
  		return response;
  	},
  	
  	toJSON: function() {
  		var json = Backbone.Model.prototype.toJSON.apply(this, arguments);
  		json.paymentMethods = json.paymentMethods ? json.paymentMethods.toJSON() : undefined;
        json.addresses = json.addresses ? json.addresses.toJSON() : undefined;
  		
  		return json;
  	},

    toExternalJSON: function() {
      // Only send name email and phone
      return _.pick(this.attributes, 'id', 'firstName', 'lastName', 'email', 'phone');
    }
  	
  }, {
  	// Static auth method
  	auth: function(attrs, options) {  		
  		// It's a complete hack using save here.
  		// We do it so the response is parsed and set back on the model.
  		new this().save({}, _.extend({
	  			url: $settings.apiRoot + "users/auth",
	  			data: $.param(attrs), // pass attributes here so the password is not set on the User object
	  			wait: true
	  		}, options)
  		);
  	},
  	
  	create: function(attrs, options) {
  		new this().save({}, _.extend({
	  			attrs: attrs, // pass attributes here so the password is not set on the User object
	  			wait: true
	  		}, options)
  		);
  	},

    forgot: function(attrs, options) {
      $.ajax(_.defaults(options || {}, {
        type: 'POST',
        url: $settings.apiRoot + "users/auth/forgot",
        data: $.param(attrs)
      }));
    }
  });
  
  return Model;
});
// Filename: models/oulet
define('models/outlet',[
	"underscore",
  "backbone"
], function(_, Backbone){
  var Model = Backbone.Model.extend({
  });
  
  return Model;
});
// Filename: models/outlet-collection
define('models/outlet-collection',[
	"underscore",
  "backbone",
  "models/outlet"
], function(_, Backbone, Outlet){
  var Model = Backbone.Collection.extend({
  	url: $settings.apiRoot + "outlets",
  	model: Outlet,
  	initialize: function(models, options) {
      this.filter = options;
  	},
  	load: function(options) {
      options = options || {};
  		this.loadFailed = false;
  		this.fetch(_.extend(options, {
				data: this.filter,
				error: function(model, resp) {
          if ( !options.background ) {
  			    model.loadFailed = true;
  			    model.reset([]);
          }
				}
			
			}));
  	}
  });
  
  return Model;
});
// Filename: models/hours
define('models/hours',[ "underscore", "backbone" ], function(_, Backbone) {
	var Model = Backbone.Model.extend({
  	urlRoot: $settings.apiRoot + "hours"
  });

  return Model;
});
// Filename: models/hours-collection
define('models/hours-collection',["underscore", "backbone", "moment", "models/hours"],
    function(_, Backbone, moment, Hours) {

	var formatDay = function(date) {
		var m = moment(date).startOf('day');
		var ago = m.diff(moment().startOf('day'), 'days');
		return ago == 0 ? _.tr('Today') :
				ago == 1 ? _.tr('Tomorrow') : 
						moment(date).format('dddd Do');
	}

	function pad(val) {
		return val < 10 ? "0" + val : val;
	}

	var formatDate = function(date) {
		var date = [date.getFullYear(), pad(date.getMonth()+1), pad(date.getDate())].join('-');
		return date;
	}
    var formatHour = function(date) {
        var date = [pad(date.getHours()), pad(date.getMinutes())].join(':');
        return date;
    }

    var createPickup = function(date, slots) {
        slots = slots || [formatHour(date)];
        return {
            name: formatDay(date),
            value: formatDate(date),
            slots: slots
        };
    }

	var TimeRange = function(start, end) {
		this.start = start;
		this.end = end.replace(/^00:/, '24:');

		var splitStart = this.start.split(':');
		var splitEnd = this.end.split(':');

		this.getValues = function(incr, lead, start) {
			var values = [],
					startMinute = ((parseInt(splitStart[0], 10) * 60)+ parseInt(splitStart[1], 10)) + lead,
					endMinute = ((parseInt(splitEnd[0], 10) * 60) + parseInt(splitEnd[1], 10)) - lead,
					minute = startMinute;

			while ( minute <= endMinute ) {
				if ( minute >= start ) {
					values.push( pad(Math.floor(minute / 60)) + ":" + pad(minute % 60) );
				}
				minute += incr
			};

			return values;
		};
	};

    var Model = Backbone.Collection.extend({

		url: function() {
			return $settings.apiRoot + 'outlets/' + this.outletId + '/hours';  	
		},

        model: Hours,

        parse: function(response, options)  {
            this.tzOffset = response.tzOffset;

            return response.hours;
        },

        getCloseTime: function(day) {
                var hours = this.where({day: day});
                return _.reduce(hours, function(memo, hour) {
                    var close = hour.get('close');
                    return memo == null ? close :
                                close > memo ? close : memo;
                }, null);
        },

        /** getTimes
         *
         *  This function will return the applicable times for the given order type.
         *
         * @param numDays
         * @param interval
         * @param leadTime
         * @param minPickupDate
         * @param type (either "pickup" or "delivery")
         * @returns {Array}
         */
        getTimes: function(numDays, interval, leadTime, minPickupDate, type) {
            if (!~["delivery", "pickup"].indexOf(type)){
                throw new Error("Please ensure the type is either 'pickup' or 'delivery'.");
            }

            var pickups = [];
            var now = minPickupDate || new Date();
            var today = now.getDay()+1; // Javascript day is zero based
            var firstTimeSlot = ( now.getHours() * 60 + now.getMinutes() + (minPickupDate ? 0 : leadTime) );

            for (var i=0; i<7; i++) {
                var hours = this.where({day: today})
                var slots = [];

                /** Go through each hour **/
                _.each(hours, function(hour) {
                    if (hour.get(type)){
                        var range = new TimeRange(hour.get('open'), hour.get('close')); // "HH:MM:SS"
                        [].push.apply(slots, range.getValues(interval, leadTime, i==0 ? firstTimeSlot : 0));
                    }
                });

                if ( slots.length > 0 ) {
                    pickups.push(createPickup(now, slots));
                }

                // break when we have numDays
                if ( pickups.length == numDays ) {
                    break;
                }

                now.setDate(now.getDate() + 1);
                today = today > 6 ? 1 : today + 1;
            }
            return pickups;
        }
    }, {
        createPickup: createPickup
    });

    return Model;
});
// Filename: models/offer
define('models/offer',[ "underscore", "backbone" ], function(_, Backbone) {
	var Model = Backbone.Model.extend({
  });

  return Model;
});
// Filename: models/offer-collection
define('models/offer-collection',[
	"underscore",
  "backbone",
  "models/offer"
], function(_, Backbone, Offer){
  var Model = Backbone.Collection.extend({
  	model: Offer
  });
  
  return Model;
});
// Filename: models/event
define('models/event',[
	"underscore",
  "backbone"
], function(_, Backbone){

  var Model = Backbone.Model.extend({
  	getRecurrences: function(start, end) {
  		var schedules = this.get('schedules'),
  				minDate = start ? new Date(start) : new Date(),
  				values = [];

      // If the event has a duration set, let the event
      // still appear duration minutes after it's start time
      var duration = this.get('duration');
      if ( duration != null ) {
        minDate = new Date(minDate);
        minDate.setMinutes(minDate.getMinutes() - duration);
      }

      // Make sure we have an end date
      // Default to 24 months out
      if ( !end ) {
        end = new Date();
        end.setMonth(end.getMonth() + 24);
      } else {
        end = new Date(end);
      }

  		_.each(schedules, function(sch) {
  			var maxDate = sch.endDate ? _.min([new Date(sch.endDate), end]) : end;
        var guard = 100;

  			if ( sch.freq == 'ONCE' ) {
          var d = new Date(sch.startDate);
          if ( d.getTime() >= minDate && d.getTime() <= maxDate ) {
  				  values.push(sch.startDate);
          }

  			} else if ( sch.freq == 'DAILY' ) {
  				var d = new Date(sch.startDate),
  						interval = sch.multiple || 1;
  				while ( d.getTime() <= maxDate && guard-- > 0 ) {
  					if ( d.getTime() >= minDate ) {
  						values.push(d.getTime());
  					}

  					d.setDate(d.getDate() + interval);

  				}

  			} else if ( sch.freq == 'WEEKLY' ) {
  				var d = new Date(sch.startDate),
  						interval = (sch.multiple || 1) * 7;

  				while ( d.getTime() <= maxDate && guard-- > 0 ) {
  					if ( d.getTime() >= minDate ) {
  						values.push(d.getTime());
  					}

  					d.setDate(d.getDate() + interval);
  					if ( sch.day ) {
  						d.setDate(d.getDate() + sch.day - d.getDay());
  					}

  				}

  			} else if ( sch.freq == 'MONTHLY' || sch.freq == 'YEARLY' ) {
  				var d = new Date(sch.startDate),
  						interval = sch.multiple || 1,
  						dow = sch.day || d.getDay()+1;

  				if ( sch.freq == 'YEARLY' ) interval = interval * 12;

  				while ( d.getTime() <= maxDate && guard-- > 0 ) {
  					
  					if ( d.getTime() >= minDate ) {
  						values.push(d.getTime());
  					}

  					var moy = sch.month || d.getMonth();

  					d.setMonth(moy + interval);

  					if ( sch.week ) {
  						// Set to first of this month
  						d.setDate(1);

  						// Move to correct day of week
  						var diff = dow - d.getDay() - 1;
  						d.setDate(d.getDate() + ( diff < 0 ? diff + 7 : diff ));

  						// If not first week roll by sch.week weeks
  						if ( sch.week > 1 ) {
  							d.setDate(d.getDate() + ( (sch.week - 1) * 7 ));
  						}

  					} else if ( sch.day ) {
  						d.setDate(sch.day);

  					}

  				}

  			}
  		});

			return values.sort();
  	}
  });
  
  return Model;
});
// Filename: models/event-collection
define('models/event-collection',[
	"underscore",
  "backbone",
  "models/event"
], function(_, Backbone, Event){
  var Model = Backbone.Collection.extend({
  	url: function() {
      return $settings.apiRoot + "venues/" + this.venueId + "/events";
    },
  	model: Event,
  	initialize: function(models, options) {
      options = options || {};
      this.venueId = options.venueId;
      this.filter = options.filter;

  	},
  	load: function(options) {
      options = options || {};
  		this.loadFailed = false;
  		this.fetch(_.extend(options, {
				data: this.filter,
				error: function(model, resp) {
          if ( !options.background ) {
  			    model.loadFailed = true;
  			    model.reset([]);
          }
				}
			
			}));
  	},
    expandEvents: function(maxDate) {
      // Return expanded event list
      var now = new Date();

      if ( !maxDate ) {
        maxDate = new Date();
        // Changed this to be two years out instead of just a month
        // We might need to revisit this at some point
        maxDate.setMonth(maxDate.getMonth() + 24);
      }

      var allEvents = [];
      this.each(function(event) {
        var json = _.omit(event.toJSON(),'schedules'),
            dates = event.getRecurrences(now, maxDate);

        // Add a copy of the event for each date it's on
        _.each(dates, function(date) {
          allEvents.push(_.extend({}, json, {
            date: date
          }));
        });
        
      });

      // Sort by date
      allEvents = _.sortBy(allEvents, 'date');

      return allEvents;
    }
  });
  
  return Model;
});
// Filename: models/venue
define('models/Venue',[
	"underscore",
  "backbone",
  "models/outlet-collection",
  "models/hours-collection",
  "models/offer-collection",
  "models/event-collection"
], function(_, Backbone, OutletCollection, HoursCollection, OfferCollection, EventCollection){
  var Model = Backbone.Model.extend({
    urlRoot: $settings.apiRoot + "venues",
    constructor: function(attr) {
      this.outlets = new OutletCollection([], {venueId: attr.id});
      this.hours = new HoursCollection([], {venueId: attr.id});
      this.offers = new OfferCollection([], {venueId: attr.id});
      this.events = new EventCollection([], {venueId: attr.id});
      
      Backbone.Model.apply(this, arguments);
    },
  	set: function(key, val, options) {
      if (key == null) return this;

      var cols = ['events', 'outlets', 'hours', 'offers'];
      for ( var i=0; i<cols.length; i++) {
        if ( key == cols[i] ) {
          this[cols[i]].reset(val);
          return this;
        } else if ( key[cols[i]] ) {
          this[cols[i]].reset(key[cols[i]]);
        }
      }

      return Backbone.Model.prototype.set.apply(this, arguments);
    },
    load: function(options) {
      var background = options && options.background,
          success = options && options.success,
          error = options && options.error;
      this.fetch(_.extend(options || {}, {
        data: {expand: 'hours,outlets,offers,settings,events'},
        success: function(model, resp, options) {
          model.loadFailed = model.outlets.loadFailed = model.hours.loadFailed = false;
          if ( success ) {
            success.apply(this, arguments);
          }
        },
        error: function(model, resp, options) {
          if ( !background ) {
            model.loadFailed = model.events.loadFailed = model.outlets.loadFailed = model.hours.loadFailed = true;
            model.outlets.reset([]);
            model.hours.reset([]);
            model.events.reset([]);
            model.trigger('change');
          }
          if ( error ) {
            error.apply(this, arguments);
          }
        }
      
      }));
    }
  });
  
  return Model;
});
// Filename: models/venue
define('models/venue',[
	"underscore",
  "backbone",
  "models/outlet-collection",
  "models/hours-collection",
  "models/offer-collection",
  "models/event-collection"
], function(_, Backbone, OutletCollection, HoursCollection, OfferCollection, EventCollection){
  var Model = Backbone.Model.extend({
    urlRoot: $settings.apiRoot + "venues",
    constructor: function(attr) {
      this.outlets = new OutletCollection([], {venueId: attr.id});
      this.hours = new HoursCollection([], {venueId: attr.id});
      this.offers = new OfferCollection([], {venueId: attr.id});
      this.events = new EventCollection([], {venueId: attr.id});
      
      Backbone.Model.apply(this, arguments);
    },
  	set: function(key, val, options) {
      if (key == null) return this;

      var cols = ['events', 'outlets', 'hours', 'offers'];
      for ( var i=0; i<cols.length; i++) {
        if ( key == cols[i] ) {
          this[cols[i]].reset(val);
          return this;
        } else if ( key[cols[i]] ) {
          this[cols[i]].reset(key[cols[i]]);
        }
      }

      return Backbone.Model.prototype.set.apply(this, arguments);
    },
    load: function(options) {
      var background = options && options.background,
          success = options && options.success,
          error = options && options.error;
      this.fetch(_.extend(options || {}, {
        data: {expand: 'hours,outlets,offers,settings,events'},
        success: function(model, resp, options) {
          model.loadFailed = model.outlets.loadFailed = model.hours.loadFailed = false;
          if ( success ) {
            success.apply(this, arguments);
          }
        },
        error: function(model, resp, options) {
          if ( !background ) {
            model.loadFailed = model.events.loadFailed = model.outlets.loadFailed = model.hours.loadFailed = true;
            model.outlets.reset([]);
            model.hours.reset([]);
            model.events.reset([]);
            model.trigger('change');
          }
          if ( error ) {
            error.apply(this, arguments);
          }
        }
      
      }));
    }
  });
  
  return Model;
});
// Filename: models/venue-collection
define('models/venue-collection',[
	"underscore",
  "backbone",
  "models/venue"
], function(_, Backbone, Venue){
  var Model = Backbone.Collection.extend({
  	url: $settings.apiRoot + "venues",
  	model: Venue,
  	initialize: function(models, options) {
  		this.params = options
  	},
  	load: function() {
  		this.loadFailed = false;
  		this.fetch({
				data: this.params,
				error: function(model, resp, options) {
			    model.loadFailed = true;
			    model.reset([]);
				}
			
			});
  	}
  });
  
  return Model;
});
var dictionary={
	"de": {
		"The server has denied access. Please ensure you have the latest version of the app.": "Zugriff zum Server wurde verweigert. Bitte überprüfen Sie, ob Sie die neueste Version der App haben. ",
		"Today": "Heute",
		"Tomorrow": "Morgen",
		"Venues": "Betrieb",
		"We could not load the latest menu. Make sure you have a network connection and try again.": "Das neueste Angebot konnte nicht geladen werden. Überprüfen Sie Ihre Netzwerkverbindung und versuchen Sie es erneut. ",
		"Network error": "Netzwerkfehler",
		"Home": "Startseite",
		"Back": "Zurück",
		"Events": "Veranstaltungen",
		"Venue": "Betrieb",
		"Seat": "Platz",
		"Cancel": "Abbrechen",
		"Already have an account": "Ich habe bereits ein Konto",
		"Sign in here": "Hier anmelden",
		"Create Account": "Benutzerkonto erstellen",
		"First Name": "Vorname",
		"Last Name": "Nachname",
		"Email": "E-Mail",
		"Password": "Passwort",
		"Please switch-off this box if you do not wish to be contacted regarding loyalty programmes": "Bitte schließen Sie diese Meldung, wenn Sie bezüglich der Treueprogramme nicht kontaktiert werden wollen",
		"Please switch-off this box if you do not want more information about discounts and special offers": "Bitte schließen Sie diese Meldung, wenn Sie keine weiteren Informationen zu Rabatten und Sonderangeboten wollen ",
		"Please switch-on this box if you are happy to receive newsletters, research and marketing emails": "Bitte bestätitigen Sie diese Meldung, wenn Sie Newsletter und E-Mails zu Marktforschung und Marketing erhalten wollen",
		"By continuing, you accept the": "Wenn Sie fortfahren, akzeptieren Sie die",
		"Terms and Conditions": "Allgemeinen Geschäftsbedingungen",
		"and": "und",
		"Privacy Policy": "Datenschutzrichtlinien",
		"Failed to save details": "Angaben konnten nicht gespeichert werden",
		"Profile": "Profil",
		"Update": "Aktualisierung",
		"Address Details": "Adressenangaben",
		"Edit": "Ändern",
		"Delete": "Löschen",
		"Address": "Adresse",
		"Town/City": "Wohnort",
		"County": "Bundesland",
		"Postcode": "Postleitzahl",
		"Stored Addresses": "Gespeicherte Adressen ",
		"Add Address": "Adresse hinzufügen",
		"Enter New Delivery Address": "Neue Lieferadresse eingeben",
		"Edit Address": "Adresse bearbeiten ",
		"Enter New Address": "Neue Adresse eingeben",
		"Order to this address": "An diese Adresse liefern ",
		"Update this address": "Diese Adresse aktualisieren",
		"Add this address": "Diese Adresse hinzufügen",
		"Store this address for future orders?": "Diese Adresse für weitere Bestellungen speichern?",
		"Order Summary": "Bestellübersicht",
		"Go to checkout": "Zur Kasse gehen",
		"Change": "Ändern",
		"Please choose at least": "Mindestauswahl",
		"You can choose at most": "Höchstauswahl",
		"Meal Deal": "Angebote",
		"Done": "Fertig",
		"Total": "Gesamt",
		"Collection": "Abholung",
		"Delivery": "Lieferung",
		"Delivery Area": "Liefergebiet",
		"Could not load basket. Please make sure you have a network connection and try again.": "Warenkorb konnte nicht geladen werden. Bitte überprüfen Sie Ihre Netzwerkverbindung und versuchen Sie es erneut.",
		"Event": "Veranstaltung",
		"Order": "Bestellung",
		"Add %s to meet the minimum delivery order value": "Fügen Sie %s für den Mindestbestellwert hinzu",
		"Add %s to meet the minimum collection order value": "Fügen Sie %s für den Mindestlieferwert hinzu",
		"Discounts": "Rabatte",
		"Fees": "Gebühren ",
		"Special Requests": "Besondere Wünsche",
		"If you have any food allergies or special instructions for us, please use this area to let us know.": "Bei möglichen Nahrungsmittelallergien oder wenn Sie uns auf etwas hinweisen wollen, nutzen Sie bitte für Ihre Mitteilung dieses Feld.",
		"EMPTY BASKET": "Warenkorb leeren",
		"Card Details": "Kartenangaben",
		"New Card": "Neue Karte",
		"Failed to save card.": "Karte konnte nicht gespeichert werden. ",
		"Continuing will permenantly remove the selected card.": "Wenn Sie fortfahren, wird die ausgewählte Karte endgültig gelöscht. ",
		"Delete failed.": "Löschen fehlgeschlagen.",
		"Save": "Speichern",
		"Name": "Name",
		"Card #": "Kartennummer",
		"Exp. Date": "Verfalldatum",
		"Store this card for future purchases?": "Diese Karte für weitere Bestellungen speichern?",
		"Name on Card": "Name des Karteninhabers ",
		"Credit Card Number": "Kreditkartennummer ",
		"CCV": "CCV",
		"Card Security Code": "Kartenverifizierungscode",
		"MM": "MM",
		"YY": "JJ",
		"Select payment method": "Wählen Sie eine Zahlungsmethode",
		"Add Card": "Karte hinzufügen",
		"Stored Cards": "Gespeicherte Karten",
		"No stored cards, please add a card.": "Keine gespeicherten Karten, bitte fügen Sie eine Karte hinzu.",
		"Select Delivery Address": "Lieferadresse auswählen ",
		"We were unable to update your mobile phone number.": "Ihre Handynummer konnte nicht aktualisiert werden.",
		"Please update your account information": "Bitte aktualisieren Sie Ihre Kontoinformationen",
		"Please add a mobile phone number to your account so that we can call you if there's a problem with your delivery.": "Bitte fügen Sie Ihrem Konto eine Handynummer hinzu, sodass wir Sie erreichen können, wenn Problem bei der Lieferung auftreten. ",
		"Mobile No.": "Handynr.",
		"Submit": "Abschicken",
		"We couldn't process your request. Please make sure you have a network connection and try again.": "Ihre Anfrage konnte nicht bearbeitet werden. Bitte überprüfen Sie Ihre Netwerkverbindung und versuchen Sie es erneut. ",
		"It looks like the venue has changed their menu. We've had to clear your basket.": "Das Angebot wurde geändert. Der Warenkorb musste deswegen leider geleert werden. ",
		"Payment failed. Please try again.": "Zahlung fehlgeschlagen. Bitte erneut versuchen. ",
		"Place Order": "Bestellung aufgeben",
		"Checkout": "Kasse",
		"Amount to pay": "Zu zahlender Betrag",
		"Pickup Time": "Abholzeit",
		"Delivery Time": "Lieferzeit",
		"Location": "Standort",
		"Delivery Location": "Ort der Lieferung",
		"Payment Method": "Zahlungsmethode",
		"Store Card": "Kundenkarte",
		"Choose existing card": "Wählen Sie eine vorhandene Karte",
		"Demo Mode": "Demo-Modus",
		"This app is currently running in demo mode which means the venue owner has not yet activated this app to accept live transactions.": "Diese App ist zurzeit im Demo-Modus. Das bedeutet, dass diese App vom Eigentümer noch nicht für Live-Transaktionen freigeschalten wurde.",
		"If you are the venue owner, you will need to connect your Stripe account in order to begin accepting payments and move your app from demo mode to live.": "Wenn Sie der Unternehmenseigentümer sind, müssen Sie erst Ihr Stripe-Konto verbinden, um Zahlungen empfangen zu können, und um Ihre App von Demo-Modus zu Live-Modus zu ändern.",
		"Choose Performance": "Wählen Sie eine Veranstaltung",
		"Items": "Artikel",
		"Basket": "Warenkorb",
		"This app is currently in demo mode": "Diese App ist zurzeit im Demo-Modus",
		"No venue found for search": "Keine Einträge gefunden",
		"OK": "Ok",
		"Please try again...": "Bitte erneut versuchen...",
		"Error": "Fehler ",
		"Add venue": "Unternehmen hinzufügen",
		"Enter venue code": "Unternehmens-Code eingeben",
		"Add": "Hinzufügen",
		"Invite your favourite venue to join": "Laden Sie Ihr Lieblingsunternehmen ein, bei uns mitzumachen",
		"Enter venue name": "Unternehmens-Name eingeben",
		"Invited venues": "Eingeladene Unternehmen",
		"Burnley Bowl": "Burnley Bowl",
		"Burnley Rugby Clu": "Burnley Rugby Club",
		"Burnley Coffee Shop": "Burnley Coffee Shop",
		"Burnley Pizza & Pasta": "Burnley Pizza & Pasta",
		"Burnley Chip Shop": "Burnley Chip Shop",
		"Invitation was successful!": "Einladung war erfolgreich!",
		"Information": "Information",
		"Enter venue email": "Unternehmens-E-Mail eingeben",
		"Invite": "Einladen",
		"Change Order": "Bestellung ändern ",
		"Change/duplicate/remove item": "Artikel ändern / verdoppeln / entfernen",
		"Forgot Password": "Passwort vergessen",
		"Please enter your email address below and we will send you instructions on how to reset your password.": "Bitte geben Sie Ihre E-Mail-Adresse ein und wir werden Ihnen Anweisungen für das Zurücksetzen Ihres Passworts zusenden. ",
		"Send Reset Email": "E-Mail für Passwort Zurücksetzen senden ",
		"Back to login": "Zurück zu Login",
		"Don't yet have an account?": "Haben Sie noch kein Konto?",
		"A user with that email already exists": "Diese Nutzer-E-Mail existiert bereits",
		"Oops. Something went wrong. Please try again.": "Ups, etwas ist schiefgelaufen. Bitte erneut versuchen. ",
		"Incorrect username or password": "Nutzername oder Passwort nicht korrekt",
		"Oops. Somthing went wrong. Please try again.": "Ups, etwas ist schiefgelaufen. Bitte erneut versuchen. ",
		"Please check your email for further instructions on how to reset your password.": "Bitte überprüfen Sie Ihre E-Mails für weitere Anweisungen zum Zurücksetzen Ihres Passworts. ",
		"Sorry. We can't find that email address.": "Leider kann diese E-Mail Adresse nicht gefunden werden.",
		"Login": "Login",
		"Forgot password?": "Passwort vergessen?",
		"Sign up here": "Hier anmelden",
		"Open": "Geöffnet",
		"Events Calendar": "Veranstaltungskalender",
		"RETURN TO HOME": "ZURÜCK ZUR STARTSEITE",
		"Thank you.": "Vielen Dank.",
		"Your order has been submitted, payment pending. You will receive a confirmation in a few minutes.": "Ihre Bestellung ist eingegangen, die Zahlung ist noch schwebend. Sie werden in wenigen Minuten eine Bestätigung erhalten. ",
		"If you have any queries or need to amend your order, please call us on:": "Bei Fragen oder Änderungswünsche der Bestellung, rufen Sie uns an unter: ",
		"ORDER WAS REJECTED": "BESTELLUNG WURDE ABGELEHNT",
		"Order No.": "Bestellnr.",
		"Thank you!": "Danke!",
		"Confirmation Code": "Bestätigungs-Code",
		"Collection Time": "Abholzeit ",
		"Collection Location": "Abhol-Standort",
		"Delivery Address": "Lieferadresse",
		"Order Total": "Gesamtbetrag der Bestellung",
		"Order Details": "Bestellungsdetails",
		"Previous Orders": "Vorherige Bestellungen",
		"Where would you like to pickup?": "Wo würden Sie gerne Ihre Bestellung abholen?",
		"Tap to select": "Tippen Sie zum Auswählen",
		"Continue": "Weiter",
		"Menu": "Angebot",
		"Offer": "Spezialangebot",
		"We could not load the latest menu.": "Das neueste Angebot konnte nicht geladen werden. ",
		"Make sure you have a network connection and try again.": "Überprüfen Sie Ihre Netzwerkverbindung und versuchen Sie es erneut.",
		"Retry": "Erneut versuchen",
		"Venue Contact Details": "Kontaktdetails des Unternehmens",
		"Delivery Addresses": "Lieferadressen",
		"About": "Über uns",
		"Logout": "Abmelden",
		"Profile Updated": "Profil wurde aktualisiert",
		"Please check your details": "Bitte Angaben überprüfen ",
		"User Profile": "Benutzerprofil",
		"Mobile Num": "Handynr.",
		"Update Profile": "Profil aktualisieren",
		"Choose Location to Order": "Wählen einen Standort zum Bestellen ",
		"We could not load the latest locations.": "Wir konnten nicht die neuesten Standorte laden.",
		"Venue name": "Unternehmens-Name",
		"Venue address": "Unternehmens-Adresse",
		"Currently Offline": "Zurzeit Offline",
		"Select an event": "Wählen Sie eine Veranstaltung",
		"Select": "Auswählen",
		"Future events": "Künftige Veranstaltungen",
		"View more listing to select your event.": "Mehr Einträge sehen, um Ihre Veranstaltung auszuwählen.",
		"View More": "Mehr sehen",
		"Order Now": "Jetzt bestellen",
		"Edit favourite venues": "Lieblingsunternehmen bearbeiten",
		"Not here? Add their email...": "Nicht hier? Fügen Sie die E-Mail-Adresse hinzu..."
	},
	"fr": {
		"Today": "Aujourd'hui",
		"Tomorrow": "Demain.",
		"Venues": "Stades",
		"Home": "H",
		"Back": "Retour",
		"Events": "Événements",
		"Venue": "Lieu",
		"Seat": "Siège",
		"Cancel": "Annuler",
		"Already have an account": "Vous avez déjà un compte",
		"Sign in here": "Inscrivez-vous ici",
		"Create Account": "Créer un compte",
		"First Name": "Prénom",
		"Last Name": "Nom de famille",
		"Email": "Courriel",
		"Password": "Mot de passe",
		"Please switch-off this box if you do not wish to be contacted regarding loyalty programmes": "S'il vous plaît coupure cette case si vous ne souhaitez pas être contacté au sujet des programmes de fidélité",
		"Please switch-off this box if you do not want more information about discounts and special offers": "S'il vous plaît coupure cette case si vous ne voulez pas en savoir plus sur les rabais et des offres spéciales",
		"Please switch-on this box if you are happy to receive newsletters, research and marketing emails": "S'il vous plaît passer sur cette case si vous êtes heureux de recevoir des courriels de bulletins, de recherche et de marketing",
		"By continuing, you accept the": "En continuant, vous acceptez l'",
		"Terms and Conditions": "Termes du service",
		"and": "et",
		"Privacy Policy": "Politique de confidentialité",
		"Profile": "Profil",
		"Update": "Mettre à jour",
		"Edit": "Modifier",
		"Delete": "Supprimer",
		"Order Summary": "Résumé de la commande",
		"Go to checkout": "Passer à la caisse",
		"Change": "Modifier",
		"Meal Deal": "Offre de repas",
		"Done": "Fait",
		"Total": "Tota",
		"Could not load basket. Please make sure you have a network connection and try again.": "Impossible de charger panier. S'il vous plaît assurez-vous d'une connexion réseau et essayez à nouveau.",
		"Event": "Événement",
		"Order": "Ordre",
		"Discounts": "Réductions",
		"Special Requests": "Demandes spéciales ",
		"If you have any food allergies or special instructions for us, please use this area to let us know.": "Si vous avez des allergies alimentaires ou des instructions spéciales pour nous, s'il vous plaît utiliser ce domaine pour nous faire savoir.",
		"EMPTY BASKET": "Vider le panier",
		"New Card": "Nouvelle carte",
		"Save": "Enregistrer",
		"Name": "Nom",
		"Card #": "Carte #",
		"Exp. Date": "Exp. Date",
		"CCV": "CCV",
		"Select payment method": "Sélectionnez la méthode de paiement",
		"Add Card": "Ajouter une carte",
		"Stored Cards": "Cartes stockées",
		"No stored cards, please add a card.": "Pas de cartes stockées, s'il vous plaît ajouter une carte.",
		"Place Order": "Commander",
		"Checkout": "Commander",
		"Amount to pay": "Montant à payer",
		"Pickup Time": "Les prises en charge",
		"Location": "Etablissement",
		"Payment Method": "Mode de paiement",
		"Store Card": "Carte de magasin",
		"Choose existing card": "Choisissez une carte existante",
		"Demo Mode": "Mode Démo",
		"This app is currently running in demo mode which means the venue owner has not yet activated this app to accept live transactions.": "Cette application est en cours d'exécution en mode démo qui signifie que le propriétaire du site n'a pas encore activé cette application d'accepter des transactions en direct.",
		"If you are the venue owner, you will need to connect your Stripe account in order to begin accepting payments and move your app from demo mode to live.": "Si vous êtes le propriétaire du site, vous aurez besoin pour vous connecter à votre compte Stripe afin de commencer à accepter des paiements et déplacer votre application à partir du mode de démonstration à vivre.",
		"Choose Performance": "Choisissez Performance",
		"Items": "Elément",
		"Basket": "Panier",
		"This app is currently in demo mode": "Cette application est actuellement en mode de démonstration",
		"Add venue": "Ajouter lieu",
		"Enter venue code": "Entrez le code de lieu",
		"Add": "Ajouter",
		"Invite your favourite venue to join": "Invitez votre lieu de prédilection pour rejoindre",
		"Enter venue name": "Entrez un nom lieu",
		"Invited venues": "Lieux invités",
		"Burnley Bowl": "Burnley Bowl",
		"Burnley Rugby Clu": "Burnley Rugby Clu",
		"Burnley Coffee Shop": "Burnley Café",
		"Burnley Pizza & Pasta": "Burnley Pizza & Pasta",
		"Burnley Chip Shop": "Burnley Chip Shop",
		"Invite": "Inviter",
		"Change Order": "Changer la Commande",
		"Change/duplicate/remove item": "Modifier / double / retirer l'article",
		"Forgot Password": "Mot de passe oublié",
		"Please enter your email address below and we will send you instructions on how to reset your password.": "S'il vous plaît, entrez votre adresse email ci-dessous et nous vous ferons parvenir des instructions sur la réinitialisation de votre mot de passe.",
		"Send Reset Email": "Envoyer Réinitialiser Email",
		"Back to login": "Retour à la connexion",
		"Don't yet have an account?": "Vous n'avez pas encore un compte?",
		"Login": "Connexion ",
		"Forgot password?": "Mot de passe oublié?",
		"Sign up here": "Inscrivez-vous ici",
		"Open": "Ouvrir",
		"Events Calendar": "Calendrier d'événements",
		"Order No.": "No de Commande ",
		"Thank you!": "Merci !",
		"Confirmation Code": "Code de confirmation",
		"Collection Time": "Collection Time",
		"Collection Location": "Collection Localisation",
		"Order Total": "Commande Totale",
		"Order Details": "Détails de la Commande",
		"Previous Orders": "Commandes précédentes",
		"Where would you like to pickup?": "Où aimeriez-vous à la collecte?",
		"Tap to select": "Appuyer pour sélectionner",
		"Continue": "Continuer",
		"Offer": "Offre",
		"We could not load the latest menu.": "Nous n'avons pas pu charger la dernière menu.",
		"Make sure you have a network connection and try again.": "Assurez-vous que vous avez une connexion réseau et essayez à nouveau.",
		"Retry": "Réitérer",
		"About": "A propos",
		"Logout": "Déconnexion",
		"User Profile": "Profil d'utilisateur",
		"Update Profile": "Mise à jour du profil",
		"Choose Location to Order": "Choisir un emplacement à la commande",
		"We could not load the latest locations.": "Nous n'avons pas pu charger les dernières localités.",
		"Venue name": "Nom Lieu",
		"Venue address": "Adresse Lieu",
		"Currently Offline": "Est déconnecté",
		"Select an event": "Sélectionnez un événement",
		"Select": "Sélectionner",
		"Future events": "Événements futurs",
		"View more listing to select your event.": "Voir plus listage pour sélectionner votre événement.",
		"View More": "Lire la suite",
		"Order Now": "Commander maintenant",
		"Edit favourite venues": "Modifier lieux préférés",
		"Not here? Add their email...": "Pas ici? Ajoutez leur e-mail ..."
	},
	"zz": {
		"The server has denied access. Please ensure you have the latest version of the app.": "DE: The server has denied access. Please ensure you have the latest version of the app.",
		"Today": "DE: Today",
		"Tomorrow": "DE: Tomorrow",
		"Venues": "DE: Venues",
		"We could not load the latest menu. Make sure you have a network connection and try again.": "DE: We could not load the latest menu. Make sure you have a network connection and try again.",
		"Network error": "DE: Network error",
		"Home": "DE: Home",
		"Back": "DE: Back",
		"Events": "DE: DE: Events",
		"Venue": "DE: Venue",
		"Seat": "DE: Seat",
		"Cancel": "DE: Cancel",
		"Already have an account": "DE: Already have an account",
		"Sign in here": "DE: Sign in here",
		"Create Account": "DE: Create Account",
		"First Name": "DE: First Name",
		"Last Name": "DE: Last Name",
		"Email": "DE: Email",
		"Password": "DE: Password",
		"Please switch-off this box if you do not wish to be contacted regarding loyalty programmes": "DE: Please switch-off this box if you do not wish to be contacted regarding loyalty programmes",
		"Please switch-off this box if you do not want more information about discounts and special offers": "DE: Please switch-off this box if you do not want more information about discounts and special offers",
		"Please switch-on this box if you are happy to receive newsletters, research and marketing emails": "DE: Please switch-on this box if you are happy to receive newsletters, research and marketing emails",
		"By continuing, you accept the": "DE: By continuing, you accept the",
		"Terms and Conditions": "DE: Terms and Conditions",
		"and": "DE: and",
		"Privacy Policy": "DE: Privacy Policy",
		"Failed to save details": "DE: Failed to save details",
		"Profile": "DE: Profile",
		"Update": "DE: Update",
		"Address Details": "DE: Address Details",
		"Edit": "DE: Edit",
		"Delete": "DE: Delete",
		"Address": "DE: Address",
		"Town/City": "DE: Town/City",
		"County": "DE: County",
		"Postcode": "DE: Postcode",
		"Stored Addresses": "DE: Stored Addresses",
		"Add Address": "DE: Add Address",
		"Enter New Delivery Address": "DE: Enter New Delivery Address",
		"Edit Address": "DE: Edit Address",
		"Enter New Address": "DE: Enter New Address",
		"Order to this address": "DE: Order to this address",
		"Update this address": "DE: Update this address",
		"Add this address": "DE: Add this address",
		"Store this address for future orders?": "DE: Store this address for future orders?",
		"Order Summary": "DE: Order Summary",
		"Go to checkout": "DE: Go to checkout",
		"Change": "DE: Change",
		"Please choose at least": "DE: Please choose at least",
		"You can choose at most": "DE: You can choose at most",
		"Meal Deal": "DE: Meal Deal",
		"Done": "DE: Done",
		"Total": "DE: Total",
		"Collection": "DE: Collection",
		"Delivery": "DE: Delivery",
		"Delivery Area": "DE: Delivery Area",
		"Could not load basket. Please make sure you have a network connection and try again.": "DE: Could not load basket. Please make sure you have a network connection and try again.",
		"Event": "DE: Event",
		"Order": "DE: Order",
		"Add %s to meet the minimum delivery order value": "DE: Add %s to meet the minimum delivery order value",
		"Add %s to meet the minimum collection order value": "DE: Add %s to meet the minimum collection order value",
		"Discounts": "DE: Discounts",
		"Fees": "DE: Fees",
		"Special Requests": "DE: Special Requests",
		"If you have any food allergies or special instructions for us, please use this area to let us know.": "DE: If you have any food allergies or special instructions for us, please use this area to let us know.",
		"EMPTY BASKET": "DE: EMPTY BASKET",
		"Card Details": "DE: Card Details",
		"New Card": "DE: New Card",
		"Failed to save card.": "DE: Failed to save card.",
		"Continuing will permenantly remove the selected card.": "DE: Continuing will permenantly remove the selected card.",
		"Delete failed.": "DE: Delete failed.",
		"Save": "DE: Save",
		"Name": "DE: Name",
		"Card #": "DE: Card #",
		"Exp. Date": "DE: Exp. Date",
		"Store this card for future purchases?": "DE: Store this card for future purchases?",
		"CCV": "DE: CCV",
		"Select payment method": "DE: Select payment method",
		"Add Card": "DE: Add Card",
		"Stored Cards": "DE: Stored Cards",
		"No stored cards, please add a card.": "DE: No stored cards, please add a card.",
		"Select Delivery Address": "DE: Select Delivery Address",
		"We were unable to update your mobile phone number.": "DE: We were unable to update your mobile phone number.",
		"Please update your account information": "DE: Please update your account information",
		"Please add a mobile phone number to your account so that we can call you if there's a problem with your delivery.": "DE: Please add a mobile phone number to your account so that we can call you if there's a problem with your delivery.",
		"Mobile No.": "DE: Mobile No.",
		"Submit": "DE: Submit",
		"We couldn't process your request. Please make sure you have a network connection and try again.": "DE: We couldn't process your request. Please make sure you have a network connection and try again.",
		"It looks like the venue has changed their menu. We've had to clear your basket.": "DE: It looks like the venue has changed their menu. We've had to clear your basket.",
		"Payment failed. Please try again.": "DE: Payment failed. Please try again.",
		"Place Order": "DE: Place Order",
		"Checkout": "DE: Checkout",
		"Amount to pay": "DE: Amount to pay",
		"Pickup Time": "DE: Pickup Time",
		"Delivery Time": "DE: Delivery Time",
		"Location": "DE: Location",
		"Delivery Location": "DE: Delivery Location",
		"Payment Method": "DE: Payment Method",
		"Store Card": "DE: Store Card",
		"Choose existing card": "DE: Choose existing card",
		"Demo Mode": "DE: Demo Mode",
		"This app is currently running in demo mode which means the venue owner has not yet activated this app to accept live transactions.": "DE: This app is currently running in demo mode which means the venue owner has not yet activated this app to accept live transactions.",
		"If you are the venue owner, you will need to connect your Stripe account in order to begin accepting payments and move your app from demo mode to live.": "DE: If you are the venue owner, you will need to connect your Stripe account in order to begin accepting payments and move your app from demo mode to live.",
		"Choose Performance": "DE: Choose Performance",
		"Items": "DE: Items",
		"Basket": "DE: Basket",
		"This app is currently in demo mode": "DE: This app is currently in demo mode",
		"No venue found for search": "DE: No venue found for search",
		"OK": "DE: OK",
		"Please try again...": "DE: Please try again...",
		"Error": "DE: Error",
		"Add venue": "DE: Add venue",
		"Enter venue code": "DE: Enter venue code",
		"Add": "DE: Add",
		"Invite your favourite venue to join": "DE: Invite your favourite venue to join",
		"Enter venue name": "DE: Enter venue name",
		"Invited venues": "DE: Invited venues",
		"Burnley Bowl": "DE: Burnley Bowl",
		"Burnley Rugby Clu": "DE: Burnley Rugby Clu",
		"Burnley Coffee Shop": "DE: Burnley Coffee Shop",
		"Burnley Pizza & Pasta": "DE: Burnley Pizza & Pasta",
		"Burnley Chip Shop": "DE: Burnley Chip Shop",
		"Invitation was successful!": "DE: Invitation was successful!",
		"Information": "DE: Information",
		"Enter venue email": "DE: Enter venue email",
		"Invite": "DE: Invite",
		"Change Order": "DE: Change Order",
		"Change/duplicate/remove item": "DE: Change/duplicate/remove item",
		"Forgot Password": "DE: Forgot Password",
		"Please enter your email address below and we will send you instructions on how to reset your password.": "DE: Please enter your email address below and we will send you instructions on how to reset your password.",
		"Send Reset Email": "DE: Send Reset Email",
		"Back to login": "DE: Back to login",
		"Don't yet have an account?": "DE: Don't yet have an account?",
		"A user with that email already exists": "DE: A user with that email already exists",
		"Oops. Something went wrong. Please try again.": "DE: Oops. Something went wrong. Please try again.",
		"Incorrect username or password": "DE: Incorrect username or password",
		"Oops. Somthing went wrong. Please try again.": "DE: Oops. Somthing went wrong. Please try again.",
		"Please check your email for further instructions on how to reset your password.": "DE: Please check your email for further instructions on how to reset your password.",
		"Sorry. We can't find that email address.": "DE: Sorry. We can't find that email address.",
		"Login": "DE: Login",
		"Forgot password?": "DE: Forgot password?",
		"Sign up here": "DE: Sign up here",
		"Open": "DE: Open",
		"Events Calendar": "DE: Events Calendar",
		"RETURN TO HOME": "DE: RETURN TO HOME",
		"Thank you.": "DE: Thank you.",
		"Your order has been submitted, payment pending. You will receive a confirmation in a few minutes.": "DE: Your order has been submitted, payment pending. You will receive a confirmation in a few minutes.",
		"If you have any queries or need to amend your order, please call us on:": "DE: If you have any queries or need to amend your order, please call us on:",
		"ORDER WAS REJECTED": "DE: ORDER WAS REJECTED",
		"Order No.": "DE: Order No.",
		"Thank you!": "DE: Thank you!",
		"Confirmation Code": "DE: Confirmation Code",
		"Collection Time": "DE: Collection Time",
		"Collection Location": "DE: Collection Location",
		"Delivery Address": "DE: Delivery Address",
		"Order Total": "DE: Order Total",
		"Order Details": "DE: Order Details",
		"Previous Orders": "DE: Previous Orders",
		"Where would you like to pickup?": "DE: Where would you like to pickup?",
		"Tap to select": "DE: Tap to select",
		"Continue": "DE: Continue",
		"Menu": "DE: Menu",
		"Offer": "DE: Offer",
		"We could not load the latest menu.": "DE: We could not load the latest menu.",
		"Make sure you have a network connection and try again.": "DE: Make sure you have a network connection and try again.",
		"Retry": "DE: Retry",
		"Venue Contact Details": "DE: Venue Contact Details",
		"Delivery Addresses": "DE: Delivery Addresses",
		"About": "DE: About",
		"Logout": "DE: Logout",
		"Profile Updated": "DE: Profile Updated",
		"Please check your details": "DE: Please check your details",
		"User Profile": "DE: User Profile",
		"Mobile Num": "DE: Mobile Num",
		"Update Profile": "DE: Update Profile",
		"Choose Location to Order": "DE: Choose Location to Order",
		"We could not load the latest locations.": "DE: We could not load the latest locations.",
		"Venue name": "DE: Venue name",
		"Venue address": "DE: Venue address",
		"Currently Offline": "DE: Currently Offline",
		"Select an event": "DE: Select an event",
		"Select": "DE: Select",
		"Future events": "DE: Future events",
		"View more listing to select your event.": "DE: View more listing to select your event.",
		"View More": "DE: View More",
		"Order Now": "DE: Order Now",
		"Edit favourite venues": "DE: Edit favourite venues",
		"Not here? Add their email...": "DE: Not here? Add their email…"
	}
};
define("i18n/translations", function(){});

// moment.js language configuration
// language : great britain english (en-gb)
// author : Chris Gedrim : https://github.com/chrisgedrim

(function (factory) {
    if (typeof define === 'function' && define.amd) {
        define('libs/moment/lang/en-gb',['moment'], factory); // AMD
    } else if (typeof exports === 'object') {
        module.exports = factory(require('../moment')); // Node
    } else {
        factory(window.moment); // Browser global
    }
}(function (moment) {
    return moment.lang('en-gb', {
        months : "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
        monthsShort : "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
        weekdays : "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
        weekdaysShort : "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
        weekdaysMin : "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
        longDateFormat : {
            LT : "HH:mm",
            L : "DD/MM/YYYY",
            LL : "D MMMM YYYY",
            LLL : "D MMMM YYYY LT",
            LLLL : "dddd, D MMMM YYYY LT"
        },
        calendar : {
            sameDay : '[Today at] LT',
            nextDay : '[Tomorrow at] LT',
            nextWeek : 'dddd [at] LT',
            lastDay : '[Yesterday at] LT',
            lastWeek : '[Last] dddd [at] LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : "in %s",
            past : "%s ago",
            s : "a few seconds",
            m : "a minute",
            mm : "%d minutes",
            h : "an hour",
            hh : "%d hours",
            d : "a day",
            dd : "%d days",
            M : "a month",
            MM : "%d months",
            y : "a year",
            yy : "%d years"
        },
        ordinal : function (number) {
            var b = number % 10,
                output = (~~ (number % 100 / 10) === 1) ? 'th' :
                (b === 1) ? 'st' :
                (b === 2) ? 'nd' :
                (b === 3) ? 'rd' : 'th';
            return number + output;
        },
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });
}));

// moment.js language configuration
// language : german (de)
// author : lluchs : https://github.com/lluchs
// author: Menelion Elensúle: https://github.com/Oire

(function (factory) {
    if (typeof define === 'function' && define.amd) {
        define('libs/moment/lang/de',['moment'], factory); // AMD
    } else if (typeof exports === 'object') {
        module.exports = factory(require('../moment')); // Node
    } else {
        factory(window.moment); // Browser global
    }
}(function (moment) {
    function processRelativeTime(number, withoutSuffix, key, isFuture) {
        var format = {
            'm': ['eine Minute', 'einer Minute'],
            'h': ['eine Stunde', 'einer Stunde'],
            'd': ['ein Tag', 'einem Tag'],
            'dd': [number + ' Tage', number + ' Tagen'],
            'M': ['ein Monat', 'einem Monat'],
            'MM': [number + ' Monate', number + ' Monaten'],
            'y': ['ein Jahr', 'einem Jahr'],
            'yy': [number + ' Jahre', number + ' Jahren']
        };
        return withoutSuffix ? format[key][0] : format[key][1];
    }

    return moment.lang('de', {
        months : "Januar_Februar_März_April_Mai_Juni_Juli_August_September_Oktober_November_Dezember".split("_"),
        monthsShort : "Jan._Febr._Mrz._Apr._Mai_Jun._Jul._Aug._Sept._Okt._Nov._Dez.".split("_"),
        weekdays : "Sonntag_Montag_Dienstag_Mittwoch_Donnerstag_Freitag_Samstag".split("_"),
        weekdaysShort : "So._Mo._Di._Mi._Do._Fr._Sa.".split("_"),
        weekdaysMin : "So_Mo_Di_Mi_Do_Fr_Sa".split("_"),
        longDateFormat : {
            LT: "H:mm [Uhr]",
            L : "DD.MM.YYYY",
            LL : "D. MMMM YYYY",
            LLL : "D. MMMM YYYY LT",
            LLLL : "dddd, D. MMMM YYYY LT"
        },
        calendar : {
            sameDay: "[Heute um] LT",
            sameElse: "L",
            nextDay: '[Morgen um] LT',
            nextWeek: 'dddd [um] LT',
            lastDay: '[Gestern um] LT',
            lastWeek: '[letzten] dddd [um] LT'
        },
        relativeTime : {
            future : "in %s",
            past : "vor %s",
            s : "ein paar Sekunden",
            m : processRelativeTime,
            mm : "%d Minuten",
            h : processRelativeTime,
            hh : "%d Stunden",
            d : processRelativeTime,
            dd : processRelativeTime,
            M : processRelativeTime,
            MM : processRelativeTime,
            y : processRelativeTime,
            yy : processRelativeTime
        },
        ordinal : '%d.',
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });
}));

// moment.js language configuration
// language : french (fr)
// author : John Fischer : https://github.com/jfroffice

(function (factory) {
    if (typeof define === 'function' && define.amd) {
        define('libs/moment/lang/fr',['moment'], factory); // AMD
    } else if (typeof exports === 'object') {
        module.exports = factory(require('../moment')); // Node
    } else {
        factory(window.moment); // Browser global
    }
}(function (moment) {
    return moment.lang('fr', {
        months : "janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre".split("_"),
        monthsShort : "janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.".split("_"),
        weekdays : "dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi".split("_"),
        weekdaysShort : "dim._lun._mar._mer._jeu._ven._sam.".split("_"),
        weekdaysMin : "Di_Lu_Ma_Me_Je_Ve_Sa".split("_"),
        longDateFormat : {
            LT : "HH:mm",
            L : "DD/MM/YYYY",
            LL : "D MMMM YYYY",
            LLL : "D MMMM YYYY LT",
            LLLL : "dddd D MMMM YYYY LT"
        },
        calendar : {
            sameDay: "[Aujourd'hui à] LT",
            nextDay: '[Demain à] LT',
            nextWeek: 'dddd [à] LT',
            lastDay: '[Hier à] LT',
            lastWeek: 'dddd [dernier à] LT',
            sameElse: 'L'
        },
        relativeTime : {
            future : "dans %s",
            past : "il y a %s",
            s : "quelques secondes",
            m : "une minute",
            mm : "%d minutes",
            h : "une heure",
            hh : "%d heures",
            d : "un jour",
            dd : "%d jours",
            M : "un mois",
            MM : "%d mois",
            y : "un an",
            yy : "%d ans"
        },
        ordinal : function (number) {
            return number + (number === 1 ? 'er' : '');
        },
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });
}));

define('app',[
  // Libraries.
  "jquery",
  "underscore",
  "backbone",
  'moment',
  'accounting/numbers',
  "StackNavigator",
  "effects/NoEffect",
  "effects/PopEffect",
  "effects/StackEffect",
  "models/User",
  "models/Venue",
  "models/venue-collection",
  "i18n/translations",
  "libs/moment/lang/en-gb",
  "libs/moment/lang/de",
  "libs/moment/lang/fr"
], function($, _, Backbone, moment, numbers, StackNavigator, NoEffect, PopEffect, StackEffect, User, Venue, VenueCollection) {

  var locale = window.navigator.userLanguage || window.navigator.language || 'en-gb';
  var language = locale.split('-')[0];
  var debugLanguage = window.navigator.showMissingTranslations;

  // Set the lang on our number formatter
  numbers.lang(locale);

  // Set the lang on Moment default en-gb by setting that first
  moment.lang('en-gb');
  moment.lang(locale);


  _.mixin({
    /**
    * From https://github.com/mozilla/i18n-abide
    *
    * Named Example:
    * format("%(salutation)s %(place)s", {salutation: "Hello", place: "World"}, true);
    * Positional Example:
    * format("%s %s", ["Hello", "World"]);
    */
    trFormat: function(fmt, obj, named) {
      if (!fmt) return "";
      if (Array.isArray(obj) || named === false) {
        return fmt.replace(/%s/g, function(){return String(obj.shift());});
      } else if (typeof obj === 'object' || named === true) {
        return fmt.replace(/%\(\s*([^)]+)\s*\)s/g, function(m, v){
          return String(obj[v.trim()]);
        });
      } else {
        return fmt;
      }
    },
	  tr : function(string, obj, named) {
      var dict = dictionary[language];
	    var translation = dict && dict[string];
		  if (translation == undefined) {
		    translation = (debugLanguage && dict)? '[MISSING]:' + string : string;
      }

      if ( obj ) {
        translation = _.trFormat(translation, obj, named);
      }


      return translation;
	  }
  });
  
  // Provide a global location to place configuration settings and module
  // creation.
  var app = new StackNavigator({
      el: '#content'
  });
  
  // Mix Backbone.Events, modules into the app object.
  return _.extend(app, {

      fx: {
          None: new NoEffect(),
          Stack: $.os.android ? new PopEffect() : $.browser.ie ? new NoEffect() : new StackEffect()
      },

      templateHelper: {
          format: {
              price : function(price, prefix) {
                  var format = numbers.price(price, app.currentVenue);
                  return format && format.length > 0 ? (prefix || "") + format : "";
              },
              eventDate: function (date) {
                  return moment(date).format("HH:mm dddd<br>DD-MM-YYYY");
              },
              eventDateBasket: function (date) {
                  return moment(date).format("HH:mm dddd DD-MM-YYYY");
              },
              orderPickupDate: function (time) {
                  return time ? moment(time).format("dddd DD-MM-YYYY") : "";
              },
              orderPickupTime: function (time) {
                  return time ? moment(time).format("HH:mm") : "";
              },
              orderListDate: function (date) {
                  return date ? moment(date).format("DD/MM/YYYY") : ""; 
              },
              img: function(url) {
                  return url.search(/http(s)?:\/\//i) == 0 ? url : ($settings.cdnRoot + url);
              },
              SLOTSMAP: {
                  "PRESHOW": "Pre-Show",
                  "PREGAME": "Pre-Game",
                  "INTERVAL": "Interval",
                  "INTERVAL2": "Second-Interval",
                  "HALFTIME": "Half-time",
                  "POSTSHOW": "Post-Show",
                  "POSTGAME": "Post-Game"
              }
          }
      },

      __reloadHref : window.location.href,
      reload : function() {
        window.location.href = this.__reloadHref;
      },
      isHome : function() {
        return window.location.href == this.__reloadHref;
      },

      storeUser: function() {
          if ( this.user ) {
              var json = JSON.stringify(this.user);
              window.localStorage.setItem('preo-app-user', json);
        
              if ( this.user.get('token') ) {
                  this.setSessionToken(this.user.get('token'));
              }
          } else {
              window.localStorage.removeItem('preo-app-user');
              this.setSessionToken(false);
              this.user = false;
          }
      },
    
      setSessionToken: function(token) {
          if ( token ) {
              window.localStorage.setItem('preo-app-token', token);
          } else {
              window.localStorage.removeItem('preo-app-token');
          }
      },
    
      getSessionToken: function() {
          var token = window.localStorage.getItem('preo-app-token');
          return token || this.apiKey;
      },
    
      setUser: function(user) {
          console.log("* Set User * ");
          if ( this.user ) {
              this.user.off(null, null, this);
          }
          if ( user ) {
              // Save to loca storage on any change
              this.user = user;
              this.user.on('all', this.storeUser, this);
          } else {
              this.user = false;
          }
          this.storeUser();

          this.trigger('user:changed');

      },

      logout: function(sameView) {
          this.setUser();
          this.trigger('user:logout');
          if ( !sameView )
              this.router.navigate('', true);
      },

      // Handle the view stack. 
      show: function(view, options, effect) {
          var fragment = Backbone.history.fragment;
          console.log("Showing " + fragment + " secure: " + view.secure);

          // if the view is secure make sure we have a user
          if ( view.secure === true && !_.isObject(this.user) ) {
              return this.router.navigate('login/' + fragment, {trigger: true, replace: true});
          }

          //if the current view is the same do nothing
          var top = _.last(this.viewsStack);
          if ( top && top.options.fragment == fragment ) return;
      
          // See if we are going back in the stack
          var popViewRef = this.viewsStack.length > 1 ? this.viewsStack[this.viewsStack.length - 2] : null;
          if ( popViewRef && popViewRef.options.fragment == fragment ) {
              this.popView();
        
          } else {
              this[options.stackMethod ? options.stackMethod : "pushView"](view, _.extend(options || {}, {fragment: fragment}), 
                  effect || (this.viewsStack.length == 0 ? this.fx.None : null)); // first view should not animate

          }
      },

      goBack: function() {
          var popViewRef = this.viewsStack.length > 1 ? this.viewsStack[this.viewsStack.length - 2] : null;
          if ( popViewRef ) {
              this.popView();
              this.router.navigate(popViewRef.options.fragment);
          }
      },
    
      addToBasket: function(item, mods) {
          // Check for external item
          if ( !!item.get('external') ) {
            this.router.addExternalItem(item);
            return;
          }


          // if the item has modifiers but we have not provied any show mod screen
          if ( item.get('modifiers').length > 0 && !mods ) {
              this.router.modifiers(item);
          } else if ( item.get('mealDeal') && !mods ) {
              this.router.mealdeals(item);
          } else {
              this.basket.addItem(item, mods);
          }
      },
    
    
      editExternalItem: function(menuItem) {
        this.router.editExternalItem(menuItem);
      },

      editBasketItem: function(basketItem) {
        var menuItem = basketItem.get("item");

        // Check for external item
        if ( !!menuItem.get('external') ) {
          this.router.editExternalItem(menuItem);
          return;
        }


        if ( menuItem.get('mealDeal') ) {
            this.router.mealdeals(basketItem);
        } else {
            this.router.modifiers(basketItem);
        }
      },
    
      editItemSelectedModifers: function(menuItem) {
          this.router.editItemSelectedModifers(menuItem);
      },


      editItemSelectedMealdeals: function(menuItem) {
          this.router.editItemSelectedMealdeals(menuItem);
      },
    
      startApp: function(callback) {
          var venue = window.Venue;
/*          var venueId = 34;
          var vColl = this.savedVenues = new VenueCollection([{id: venueId}]);
          vColl.refresh = function() {
            var data = {
                expand: 'offers,settings,events'
              };

            data.ids = venueId;

            this.fetch({
                data : data,
                update: false,
                background: true
            });

          };

          vColl.refresh();          

          //vColl.on('all', function() {
            console.log(vColl.models[0]);
            this.setCurrentVenue(vColl.models[0]);
            this.updateSettings(callback);
          //}, this);    */      
          if ( venue ) {
            venue = new Venue(venue);
            this.setCurrentVenue(venue);
            this.updateSettings(callback);         

            this.savedVenues = new VenueCollection([venue]);
          }
      },

      checkExitMessage: function() {
          if ( this.message ) {
              location.hash = 'message';
              this.router.navigate('#message');

          }

          return false;
      },

      updateSettings: function(callback) {

          // Get app settings from localstorage
/*          var latest = localStorage.getItem('preo-app-settings');
          if ( !!latest ) {

              // Extend app with stored settings
              _.extend(this, JSON.parse(latest));

              if ( this.checkExitMessage() ) { return; }
        
              // If we have cached settings callback
              if ( callback ) callback();
          }*/
      
          // Make a call for the latest settings
          var that = this;
          $.ajax({
              url: $settings.apiRoot + 'config/app',
              dataType: 'json',
              success: function(data) {
          
                  // Cache the settings
                  //localStorage.setItem('preo-app-settings', JSON.stringify(data) );
          
                  // Extend app with stored settings
                  _.extend(that, data);

                  that.checkExitMessage();
          
              },
              complete: function() {
          
                  //if ( !latest ) {
                      // first run so we waited to start app
                      if ( callback ) callback();
                  //}
          
              }
          });
      },

      ordersAvailable: function() {
          if ( this.orderWindow && this.currentEvent ) {
              console.log( new Date(this.currentEvent.eventDate - (this.orderWindow * 60 * 60 * 1000)) );
              return Date.now() > (this.currentEvent.eventDate - (this.orderWindow * 60 * 60 * 1000));
          } else {
              return true;
          }
      },
      messages: function() {
          if ( !this.ordersAvailable() ) {
              return "Orders open " + this.orderWindow + " hours prior to performance";
          }
      },



      setCurrentVenue: function(venue) {
          this.currentVenue = venue;
          this.sideBar.venueChange();

          // FIXME: This should be handled better
          delete this.deliverAddress;
          delete this.deliveryState;
          delete this.outletLocation;
          delete this.currentEvent;

          if ( this.__attributeTimeout ) clearTimeout(this.__attributeTimeout);
          this.__attributeTimeout = setTimeout(function() {
              // Set the selected venue attribute in a timeout to allow
              // the animation to end before the styles change causes reflow
              $('body').attr('selected-venue', venue && venue.get('id') || '');
          }, venue ? 0 : 400);
      },

      setCurrentOutlet: function(outlet) {
          if ( !outlet || (this.outlet && this.outlet.get('id') != outlet.get('id')) ) {
              // Outlet changed so clear the basket
              console.log('Outlet change: Basket clear');
              app.basket.reset([], {silent:true});
              delete app.basket.notes;
          }

          this.outlet = outlet;
      },
    
      setCurrentEvent: function(event) {
          this.currentEvent = event;
          if ( event && !event.slots ) {
              var slots = new Backbone.Collection();
              slots.url = $settings.apiRoot + 'events/' + event.id + '/slots';
              slots.fetch();
              event.slots = slots;
          }
      },

      withSpinner: function(doWork) {
        
          $('#spinner').show();
          _.defer(function() {
            try {
              doWork();
            } finally {
              $('#spinner').hide();
            }
          });
      }

    
  }, $settings.app); // Extend from global $keys to allow overriding of options
});

// Filename: models/menu
define('models/menu',[
	"underscore",
  "backbone"
], function(_, Backbone){
  var Model = Backbone.Model.extend({
  	urlRoot: $settings.apiRoot + "menus"
  });
  
  return Model;
});
// Filename: models/menu-collection
define('models/menu-collection',[
	"underscore",
  "backbone",
  "models/menu"
], function(_, Backbone, Menu){
  var Model = Backbone.Collection.extend({
  	url: $settings.apiRoot + "menus",
  	model: Menu
  });
  
  return Model;
});
// Filename: models/order
define('models/order',[
	"underscore",
  "backbone",
  "moment"
], function(_, Backbone, moment){

  var Model = Backbone.Model.extend({
  	urlRoot: $settings.apiRoot + "orders",

  	getPickup: function() {
  		var pt = this.get('pickupTime'),
  				ps = this.get('pickupSlot');

  		if ( !pt ) return;

  		var d = moment(pt);

  		return ps ? ps + " - " + d.format("ddd Do MMM") : d.format("h:mma ddd Do MMM")
  	},
  	
  	toJSON: function() {
  		var json = Backbone.Model.prototype.toJSON.apply(this, arguments);
  		json.pickupTimeString = this.getPickup();
  		
  		return json;
  	}
  });
  
  return Model;
});
// Filename: models/order-collection
define('models/order-collection',[
	"underscore",
  "backbone",
  "models/order"
], function(_, Backbone, Order){
  var Model = Backbone.Collection.extend({
  	url: $settings.apiRoot + "orders",
  	model: Order
  });
  
  return Model;
});
define('store',[
	'underscore',
	'backbone',
  "models/venue",
  "models/outlet-collection",
  "models/menu-collection",
  "models/menu",
  "models/card",
  "models/card-collection",
  "models/order",
  "models/order-collection",
  "models/hours-collection",
  "models/event-collection"
],

function(_, Backbone, Venue, OutletCollection, MenuCollection, Menu, Card, CardCollection, Order, OrderCollection, HoursCollection, EventCollection) {
	
	function findSection(id, list) {
		for ( var int = 0; list && int < list.length; int++) {
			var cat = list[int];
			if ( cat.id == id ) {
				return cat;
			} else {
				var found = findSection(id, cat.sections);
				if ( found ) return found;
			}
		}
		
		return null;
	};
	
	return function(options) {
		var venue = options.venue || new Venue({id: options.venueId});

		// create menu list
		var menus = new MenuCollection();
		// create order list
		var orders = new OrderCollection();
		
		var OutletMenu = Menu.extend({
			initialize: function(attr, options) {
				this.outletId = options.outletId;
			},
			load: function(background) {
				var outletMenu = this;
	      menus.fetch({
	        data: {outletId: outletMenu.outletId, expand: true},
	        success: function(model, resp, opts) {
	        	// Just use the first one returned
	        	var attr = model.at(0);
	        	if ( attr ) {
		        	attr.attributes.loadFailed = false;
		        	outletMenu.set(attr.attributes);
		          menus.shift();
		          menus.unshift(outletMenu);
		        } else {
		        	console.log('Outlet has no menu');
		        	outletMenu.set('loadFailed', true);
		        }
	        },
	        error: function() {
	        	console.log('Outlet menu load failed', arguments);
	        	outletMenu.set('loadFailed', true);
	        }
	      });
			}
		});
		
		return {
			getVenue: function() {
				return venue;
			},
			getOutlets: function() {
				return venue.outlets;
			},
			getOutlet: function(id) {
				return venue.outlets.get(id);
			},
			getOutletMenu: function(id) {
				var outlet = venue.outlets.get(id);
				if ( outlet.menu && !outlet.menu.get('loadFailed') ) {
					return outlet.menu;
				}

				outlet.menu = outlet.menu || new OutletMenu(null, {outletId: id});
				outlet.menu.load();

	      return outlet.menu;
			},
			getMenus: function() {
				return menus;
			},
			getMenu: function(id) {
				return menus.get(id);
			},
			getSection: function(id) {
				var found = false;
				menus.each(function(menu) {
					var sect = findSection(id, menu.get('sections'));
					found = found || sect;
				});
				
				return found;
			},
			getCards: function() {
				return new CardCollection(data.cards);
			},
			getCard: function(id) {
				return new Card();
			},

			getOrders: function(userId) {
				orders.fetch({ 
					data: {
						venueId: venue.get('id'),
						userId: userId
					}
				});
				return orders;
			},

			getLatestOrders: function(userId, limit) {
				orders.fetch({ 
					data: {
						venueId: venue.get('id'),
						userId: userId,
						limit: limit,
						orderBy: 'updated'
					}
				});
				return orders;
			},

			getOrder: function(id) {
				return orders.get(id);
			},

			getEvents: function() {
				return venue.events;
			},

			getEvent: function(id) {
				return venue.events.get(id);
			},
			
			load: function(options) {
				venue.load(options);
			}
		};
	};
	
});
/**
 * @license RequireJS text 2.0.3 Copyright (c) 2010-2012, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/requirejs/text for details
 */
/*jslint regexp: true */
/*global require: false, XMLHttpRequest: false, ActiveXObject: false,
  define: false, window: false, process: false, Packages: false,
  java: false, location: false */

define('plugins/text',['module'], function (module) {
    'use strict';

    var text, fs,
        progIds = ['Msxml2.XMLHTTP', 'Microsoft.XMLHTTP', 'Msxml2.XMLHTTP.4.0'],
        xmlRegExp = /^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im,
        bodyRegExp = /<body[^>]*>\s*([\s\S]+)\s*<\/body>/im,
        hasLocation = typeof location !== 'undefined' && location.href,
        defaultProtocol = hasLocation && location.protocol && location.protocol.replace(/\:/, ''),
        defaultHostName = hasLocation && location.hostname,
        defaultPort = hasLocation && (location.port || undefined),
        buildMap = [],
        masterConfig = (module.config && module.config()) || {};

    text = {
        version: '2.0.3',

        strip: function (content) {
            //Strips <?xml ...?> declarations so that external SVG and XML
            //documents can be added to a document without worry. Also, if the string
            //is an HTML document, only the part inside the body tag is returned.
            if (content) {
                content = content.replace(xmlRegExp, "");
                var matches = content.match(bodyRegExp);
                if (matches) {
                    content = matches[1];
                }
            } else {
                content = "";
            }
            return content;
        },

        jsEscape: function (content) {
            return content.replace(/(['\\])/g, '\\$1')
                .replace(/[\f]/g, "\\f")
                .replace(/[\b]/g, "\\b")
                .replace(/[\n]/g, "\\n")
                .replace(/[\t]/g, "\\t")
                .replace(/[\r]/g, "\\r")
                .replace(/[\u2028]/g, "\\u2028")
                .replace(/[\u2029]/g, "\\u2029");
        },

        createXhr: masterConfig.createXhr || function () {
            //Would love to dump the ActiveX crap in here. Need IE 6 to die first.
            var xhr, i, progId;
            if (typeof XMLHttpRequest !== "undefined") {
                return new XMLHttpRequest();
            } else if (typeof ActiveXObject !== "undefined") {
                for (i = 0; i < 3; i += 1) {
                    progId = progIds[i];
                    try {
                        xhr = new ActiveXObject(progId);
                    } catch (e) {}

                    if (xhr) {
                        progIds = [progId];  // so faster next time
                        break;
                    }
                }
            }

            return xhr;
        },

        /**
         * Parses a resource name into its component parts. Resource names
         * look like: module/name.ext!strip, where the !strip part is
         * optional.
         * @param {String} name the resource name
         * @returns {Object} with properties "moduleName", "ext" and "strip"
         * where strip is a boolean.
         */
        parseName: function (name) {
            var strip = false, index = name.indexOf("."),
                modName = name.substring(0, index),
                ext = name.substring(index + 1, name.length);

            index = ext.indexOf("!");
            if (index !== -1) {
                //Pull off the strip arg.
                strip = ext.substring(index + 1, ext.length);
                strip = strip === "strip";
                ext = ext.substring(0, index);
            }

            return {
                moduleName: modName,
                ext: ext,
                strip: strip
            };
        },

        xdRegExp: /^((\w+)\:)?\/\/([^\/\\]+)/,

        /**
         * Is an URL on another domain. Only works for browser use, returns
         * false in non-browser environments. Only used to know if an
         * optimized .js version of a text resource should be loaded
         * instead.
         * @param {String} url
         * @returns Boolean
         */
        useXhr: function (url, protocol, hostname, port) {
            var uProtocol, uHostName, uPort,
                match = text.xdRegExp.exec(url);
            if (!match) {
                return true;
            }
            uProtocol = match[2];
            uHostName = match[3];

            uHostName = uHostName.split(':');
            uPort = uHostName[1];
            uHostName = uHostName[0];

            return (!uProtocol || uProtocol === protocol) &&
                   (!uHostName || uHostName.toLowerCase() === hostname.toLowerCase()) &&
                   ((!uPort && !uHostName) || uPort === port);
        },

        finishLoad: function (name, strip, content, onLoad) {
            content = strip ? text.strip(content) : content;
            if (masterConfig.isBuild) {
                buildMap[name] = content;
            }
            onLoad(content);
        },

        load: function (name, req, onLoad, config) {
            //Name has format: some.module.filext!strip
            //The strip part is optional.
            //if strip is present, then that means only get the string contents
            //inside a body tag in an HTML string. For XML/SVG content it means
            //removing the <?xml ...?> declarations so the content can be inserted
            //into the current doc without problems.

            // Do not bother with the work if a build and text will
            // not be inlined.
            if (config.isBuild && !config.inlineText) {
                onLoad();
                return;
            }

            masterConfig.isBuild = config.isBuild;

            var parsed = text.parseName(name),
                nonStripName = parsed.moduleName + '.' + parsed.ext,
                url = req.toUrl(nonStripName),
                useXhr = (masterConfig.useXhr) ||
                         text.useXhr;

            //Load the text. Use XHR if possible and in a browser.
            if (!hasLocation || useXhr(url, defaultProtocol, defaultHostName, defaultPort)) {
                text.get(url, function (content) {
                    text.finishLoad(name, parsed.strip, content, onLoad);
                }, function (err) {
                    if (onLoad.error) {
                        onLoad.error(err);
                    }
                });
            } else {
                //Need to fetch the resource across domains. Assume
                //the resource has been optimized into a JS module. Fetch
                //by the module name + extension, but do not include the
                //!strip part to avoid file system issues.
                req([nonStripName], function (content) {
                    text.finishLoad(parsed.moduleName + '.' + parsed.ext,
                                    parsed.strip, content, onLoad);
                });
            }
        },

        write: function (pluginName, moduleName, write, config) {
            if (buildMap.hasOwnProperty(moduleName)) {
                var content = text.jsEscape(buildMap[moduleName]);
                write.asModule(pluginName + "!" + moduleName,
                               "define(function () { return '" +
                                   content +
                               "';});\n");
            }
        },

        writeFile: function (pluginName, moduleName, req, write, config) {
            var parsed = text.parseName(moduleName),
                nonStripName = parsed.moduleName + '.' + parsed.ext,
                //Use a '.js' file name so that it indicates it is a
                //script that can be loaded across domains.
                fileName = req.toUrl(parsed.moduleName + '.' +
                                     parsed.ext) + '.js';

            //Leverage own load() method to load plugin value, but only
            //write out values that do not have the strip argument,
            //to avoid any potential issues with ! in file names.
            text.load(nonStripName, req, function (value) {
                //Use own write() method to construct full module value.
                //But need to create shell that translates writeFile's
                //write() to the right interface.
                var textWrite = function (contents) {
                    return write(fileName, contents);
                };
                textWrite.asModule = function (moduleName, contents) {
                    return write.asModule(moduleName, fileName, contents);
                };

                text.write(pluginName, nonStripName, textWrite, config);
            }, config);
        }
    };

    if (masterConfig.env === 'node' || (!masterConfig.env &&
            typeof process !== "undefined" &&
            process.versions &&
            !!process.versions.node)) {
        //Using special require.nodeRequire, something added by r.js.
        fs = require.nodeRequire('fs');

        text.get = function (url, callback) {
            var file = fs.readFileSync(url, 'utf8');
            //Remove BOM (Byte Mark Order) from utf8 files if it is there.
            if (file.indexOf('\uFEFF') === 0) {
                file = file.substring(1);
            }
            callback(file);
        };
    } else if (masterConfig.env === 'xhr' || (!masterConfig.env &&
            text.createXhr())) {
        text.get = function (url, callback, errback) {
            var xhr = text.createXhr();
            xhr.open('GET', url, true);

            //Allow overrides specified in config
            if (masterConfig.onXhr) {
                masterConfig.onXhr(xhr, url);
            }

            xhr.onreadystatechange = function (evt) {
                var status, err;
                //Do not explicitly handle errors, those should be
                //visible via console output in the browser.
                if (xhr.readyState === 4) {
                    status = xhr.status;
                    if (status > 399 && status < 600) {
                        //An http 4xx or 5xx error. Signal an error.
                        err = new Error(url + ' HTTP status: ' + status);
                        err.xhr = xhr;
                        errback(err);
                    } else {
                        callback(xhr.responseText);
                    }
                }
            };
            xhr.send(null);
        };
    } else if (masterConfig.env === 'rhino' || (!masterConfig.env &&
            typeof Packages !== 'undefined' && typeof java !== 'undefined')) {
        //Why Java, why is this so awkward?
        text.get = function (url, callback) {
            var stringBuffer, line,
                encoding = "utf-8",
                file = new java.io.File(url),
                lineSeparator = java.lang.System.getProperty("line.separator"),
                input = new java.io.BufferedReader(new java.io.InputStreamReader(new java.io.FileInputStream(file), encoding)),
                content = '';
            try {
                stringBuffer = new java.lang.StringBuffer();
                line = input.readLine();

                // Byte Order Mark (BOM) - The Unicode Standard, version 3.0, page 324
                // http://www.unicode.org/faq/utf_bom.html

                // Note that when we use utf-8, the BOM should appear as "EF BB BF", but it doesn't due to this bug in the JDK:
                // http://bugs.sun.com/bugdatabase/view_bug.do?bug_id=4508058
                if (line && line.length() && line.charAt(0) === 0xfeff) {
                    // Eat the BOM, since we've already found the encoding on this file,
                    // and we plan to concatenating this buffer with others; the BOM should
                    // only appear at the top of a file.
                    line = line.substring(1);
                }

                stringBuffer.append(line);

                while ((line = input.readLine()) !== null) {
                    stringBuffer.append(lineSeparator);
                    stringBuffer.append(line);
                }
                //Make sure we return a JavaScript string and not a Java string.
                content = String(stringBuffer.toString()); //String
            } finally {
                input.close();
            }
            callback(content);
        };
    }

    return text;
});


define('plugins/text!templates/home.html',[],function () { return '<div class="home-view content no-scroll">\r\n    <div class="venuePageWrapper">\r\n        <div class="venuePageScroller" style="width: <%- venues.length * pageWidth + (hideAdd ? 0 : pageWidth) %>px">\r\n            <ul class="venuePages">\r\n                <!-- Saved venues will be injected here -->\r\n\r\n                <% if ( !hideAdd ) { %>\r\n\t\t\t\t<li class="venuePage addVenuePage" style="background: transparent url(images/home@2x.png) no-repeat center bottom; background-size: cover; -webkit-background-size: cover; width: <%- pageWidth %>px;">\r\n            <div class="app-index">\r\n                <form class="add-venue">\r\n                    <h1 id="venuehome-title"><%- _.tr("Add venue") %>...</h1>\r\n                    <div>\r\n                        <input type="text" class="venue-code" placeholder="<%- _.tr(\'Enter venue code\') %>"\r\n                            autocomplete="off" autocorrect="off" autocapitalize="characters" spellcheck="false">\r\n                        <a class="button add-button altr"><%- _.tr("Add") %></a>\r\n                        <input type="submit" class="" style="visibility: hidden"/>\r\n                    </div>\r\n                </form>\r\n            </div>\r\n\r\n            <div class="box-invite">\r\n                <p class="pTag" id="venuehome-invite-text"><%- _.tr("Invite your favourite venue to join") %> <span>my order app</span></p>\r\n                <div class="form">\r\n                    <form class="search-venue">\r\n                    <input type="text" class="venues-search" placeholder="<%- _.tr(\'Invite venue\') %>"\r\n                        autocomplete="off" autocorrect="off" spellcheck="false">\r\n                    <a class="plus-icon"></a>\r\n                    <input type="submit" class="" style="visibility: hidden"/>\r\n                    </form>\r\n                </div>\r\n                <!-- <p>Invited venues</p> -->\r\n            </div>\r\n\r\n        </li>\r\n                <% } %>\r\n            </ul>\r\n        </div>\r\n    </div>\r\n\t<ul class="appPagination">\r\n\r\n      <% if ( !hideAdd || (venues && venues.length > 1) ) { %>\r\n          <% _.each(venues, function(venue, idx) { %>\r\n        \t\t<li class="venuehome-pagination-dot"><a data-index="<%- idx %>"><span class="dot"></span></a></li>\r\n          <% }) %>\r\n      <% } %>\r\n\r\n      <% if ( !hideAdd ) { %>\r\n\t    <li class="venuehome-pagination-add"><a data-index="<%- venues.length %>"><span class="add"></span></a></li>\r\n      <% } %>\r\n    </ul>\r\n\r\n</div>\r\n\r\n<div id="swipeWrapper">\r\n    <div id="backgroundSwipe"></div>\r\n    <div id="contentSwip">\r\n        <img src="/web-orderages/swipe-hand.png" alt="" />\r\n        <p>\r\n            Swipe left and right to switch between venues            \r\n        </p>\r\n    </div>\r\n</div>\r\n';});


define('plugins/text!templates/header.html',[],function () { return '<% \r\n\tif ( typeof homepage != "undefined" ) {\r\n%>\r\n\r\n\t\t<header class="bar-title <%- homepage.className %>">\r\n\r\n\r\n\t\t<% \r\n\t\t\tif ( typeof left != "undefined" ) {\r\n\t\t%>\r\n\t\t\t\t\t<a class="button-prev back" id="app-view-back-btn">&nbsp;<%- $.os.android ? \'\' : left %></a>\r\n\t\t<%\r\n\t\t\t}\r\n\t\t%>\r\n\r\n\r\n\t\t\t<h1 class="title <%- homepage.classNameLogo %>" id="app-view-logo"></h1>\r\n\r\n\r\n\r\n\t\t<% \r\n\t\t\tif ( typeof right != "undefined" ) {\r\n\t\t%>\r\n\t\t\t\t\t\t<a <% if ( typeof homepage.classLink ) { %>href="#<%- homepage.classLink %>"<% } %> class="button-next next"><%- right %>&nbsp;</a>\r\n\t\t<%\r\n\t\t\t}\r\n\t\t%>\r\n\r\n\t\t</header>\r\n\r\n\t\t<header class="bar-footer <%- homepage.className %>">\r\n\r\n\t\t</header>\r\n\r\n<% \r\n\t\t} else if ( typeof options != "undefined" ) {\r\n%>\r\n\r\n\t\t<header class="bar-title <%- options.className %>">\r\n\t\t<% \r\n\t\t\tif ( typeof left != "undefined" ) {\r\n\t\t\t\tif ( left == \'settings\' ) {\r\n\t\t%>\r\n\t\t\t\t\t<a  class="button <%- $.os.android ? \'pull-right\' : \'\' %> appMenuBtn" data-asdMenuOpen="false"><span class="menu-ico"></span></a>\r\n\t\t<% \r\n\t\t\t\t} else {\r\n\t\t%>\r\n\t\t\t\t\t<a class="button-prev back" id="app-view-back-btn">&nbsp;<%- $.os.android ? \'\' : left %></a>\r\n\t\t<%\r\n\t\t\t\t}\r\n\t\t\t}\r\n\t\t%>\r\n\t\t\t<h1 class="title" id="app-view-title"><%- typeof venue != "undefined" && venue.settings && venue.settings.title || "Preoday" %></h1>\r\n\t\t<%\r\n\t\t\tif ( typeof right != "undefined" ) {\r\n\t\t\t\tif ( right == \'settings\' ) {\r\n\t\t%>\r\n\t\t\t\t\t<a class="button button-action appMenuBtn" data-asdMenuOpen="false"><span class="menu-ico"></span></a>\r\n\t\t<% \r\n\t\t\t\t} else {\r\n\t\t%>\r\n\t\t\t\t\t<a class="button button-next <%- right.className %>"> <%- right.text %> </a>\r\n\t\t<%\r\n\t\t\t\t}\r\n\t\t\t} else if ( typeof basket != "undefined" && basket.count() ) {\r\n\t\t%>\r\n\t\t\t\t<a href="#basket" class="button button-action"><span class="icon-basket"> </span><span class="basket-cnt"><%- basket.count() %></span></a>\r\n\t\t<%\r\n\t\t\t}\r\n\t\t%>\r\n\t\t</header>\r\n\t\t\r\n\t\t<header class="bar-footer <%- options.className %>">\r\n\t\t</header>\r\n\r\n\r\n<% \r\n\t\t} else {\r\n%>\r\n\t\t\t\r\n\t\t\t\r\n\t\t<header class="bar-title">\r\n\t\t<% \r\n\t\t\tif ( typeof left != "undefined" ) {\r\n\t\t\t\tif ( left == \'settings\' ) {\r\n\t\t%>\r\n\t\t\t\t\t<a class="button <%- $.os.android ? \'pull-right\' : \'\' %> appMenuBtn" data-asdMenuOpen="false"><span class="menu-ico"></span></a>\r\n\t\t<% \r\n\t\t\t\t} else {\r\n\t\t%>\r\n\t\t\t\t\t<a class="button-prev back" id="app-view-back-btn">&nbsp;<%- $.os.android ? \'\' : left %></a>\r\n\t\t<%\r\n\t\t\t\t}\r\n\t\t\t}\r\n\t\t%>\r\n\t\t\t\t\t<h1 class="title" id="app-view-title"><%- typeof venue != "undefined" && venue.settings && venue.settings.title || "Preoday" %></h1>\r\n\t\t<%\r\n\t\t\tif ( typeof right != "undefined" ) {\r\n\t\t\t\tif ( right == \'settings\' ) {\r\n\t\t%>\r\n\t\t\t\t\t<a class="button button-action appMenuBtn" data-asdMenuOpen="false"><span class="menu-ico"></span></a>\r\n\t\t<% \r\n\t\t\t\t} else {\r\n\t\t%>\r\n\t\t\t\t\t<a class="button button-action <%- right.className %>"> <%- right.text %> </a>\r\n\t\t<%\r\n\t\t\t\t}\r\n\t\t\t} else if ( typeof basket != "undefined" && basket.count() ) {\r\n\t\t%>\r\n\t\t\t\t<a href="#basket" class="button button-action"><span class="icon-basket"> </span><span class="basket-cnt"><%- basket.count() %></span></a>\r\n\t\t<%\r\n\t\t\t}\r\n\t\t%>\r\n\t\t</header>\r\n\t\t\r\n\t\t<header class="bar-footer">\r\n\t\t</header>\r\n\t\t\t\t\t\r\n<%\r\n\t\t}\r\n%>\r\n\r\n\r\n\r\n\r\n<!-- add price format -->\r\n\r\n<% if (( typeof basket != "undefined" && basket.count() ) && !(typeof canCheckout != "undefined" && canCheckout == false)){\r\n%>\r\n<header class="bar-footer footer-basket">\r\n\t\t<p class="basket basket-footer-total"><%- basket.count() %> <%- _.tr(\'Items\') %> = <%- format.price(basket.total()) %></p>\r\n\t\t\r\n<% if ( typeof txtcheckout != "undefined" ) { %><a href="#checkout" class="button btn-branding basket-footer-checkout-btn"><%- _.tr("Checkout") %></a><% } else { %><a href="#basket" class="button btn-branding basket-footer-basket-btn"><%- _.tr("Basket") %></a><% } %>\r\n\t\t \r\n\r\n</header>\r\n<%\r\n\t\t}\r\n\telse if ( typeof basket != "undefined" ) {\r\n\t\t\r\n }  \r\n%>\r\n\r\n\r\n<% if ( typeof message != "undefined" ) { %>\r\n<div class="bar-footer" style="text-align: center; padding: 10px 20px;"><%- message %></div>\r\n<% } %>\r\n\r\n<% if ( typeof venue != "undefined" && venue.demoFlag ) { %>\r\n\t<header class="bar-standard bar-demo bar-header-secondary">\r\n\t\t<% if ( typeof demoback != "undefined" ) { %>\t\t\t\t\r\n\t\t\t<a class="back coloured">\r\n\t\t\t\t<strong class="coloured"><%- _.tr("This app is currently in demo mode") %></strong>\r\n\t\t\t</a>\r\n\t\t<% } else { %>\r\n\t\t\t<a class="coloured" href="#demomode">\r\n\t\t\t\t<strong class="coloured"><%- _.tr("This app is currently in demo mode") %></strong>\r\n\t\t\t\t<span class="app-icon-chevron"></span>\r\n\t\t\t</a>\t\t\r\n\t\t<% } %>\r\n\t</header>\r\n<% } %>\r\n';});


define('plugins/text!templates/venueevents.html',[],function () { return '\t<div class="content-padded">\r\n\t\t<h2 id="venuehome-title">\r\n\r\n\t\t\t<% if (venue.settings && venue.settings.logo) { %>\r\n\t\t\t<img src="/web-order- format.img(venue.settings.logo) %>" alt="logo" />\r\n\t\t\t<% } else { %>\t\t\t\r\n\t\t\t<%- venue.settings && venue.settings.heading %>\r\n\t\t\t<% } %>\r\n\t\t</h2>\r\n\t\t<h3 id="venuehome-subtitle"><%- venue.settings && venue.settings.subHeading %><h3>\r\n\t</div>\r\n\r\n\t<% if ( venue.liveFlag <= 0 ) { %>\r\n\t\t<div class="indexScroller iscrollcontainer">\r\n\t\t\t<div class="inxscroller">\r\n\t\t\t\t<div class="asd">\r\n\t\t\t\t\t<a class="button disabled"><%- _.tr("Currently Offline") %></a>\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\r\n\t<% } else if ( venue.eventFlag > 0 ) { %>\r\n\r\n\t<div class="scroller-title"><%- _.tr("Select an event") %>:</div>\r\n\t<div class="indexScroller iscrollcontainer event-scroller" >\r\n\t\t<div class="inxscroller">\r\n\t\t\t<ul class="inxscroller-items">\r\n\t\t\t\t<% if ( data.length <= 0 ) { %>\r\n\t\t\t\t\t<li style="max-width:200px;" class="inxscroller-item">\r\n\t\t\t\t\t\t<div class="asd">\r\n\t\t\t\t\t\t\t<strong><%- _.tr("No current events") %></strong>\r\n\t\t\t\t\t\t\t<%- _.tr("Please check back later.") %>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t</li>\r\n\t\t\t\t<% } %>\r\n\t\t\t\t<% var counter=0; var breakFlag=0; var MAXITEMS = 9;\r\n\t\t\t\t_.each(data, function(event, idx) { \r\n\t\t\t\t\tif(counter<MAXITEMS){ %>\r\n\t\t\t\t\t<li style="width:200px;" class="inxscroller-item">\r\n\t\t\t\t\t\t<div class="asd">\r\n\t\t\t\t\t\t\t<strong><%- (event.name) %></strong>\r\n\t\t\t\t\t\t\t<%= format.eventDate(event.date) %>\r\n\t\t\t\t\t\t\t<a class="button event-select" data-event-idx="<%- idx %>"><%- _.tr("Select") %></a>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t</li>\r\n\t\t\t\t\t<% counter++; }\r\n\t\t\t\t\telse if(!breakFlag) { %>\r\n\t\t\t\t\t<li style="max-width:200px;" class="inxscroller-item">\r\n\t\t\t\t\t\t<div class="asd">\r\n\t\t\t\t\t\t\t<strong><%- _.tr("Future events") %></strong>\r\n\t\t\t\t\t\t\t<%- _.tr("View more listing to select your event.") %>\r\n\t\t\t\t\t\t\t<a class="button" href="#moreevents/<%- venue.id %>"><%- _.tr("View More") %></a>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t</li>\r\n\t\t\t\t\t<% breakFlag=1; \r\n\t\t\t\t\t}\r\n\t\t\t\t}); %>\r\n\t\t\t</ul>\r\n\t\t</div>\r\n\t</div>\r\n\r\n\t<% } else { %>\r\n\t\t<div class="indexScroller iscrollcontainer">\r\n\t\t\t<div class="asd">\r\n\t\t\t\t<a class="button event-select order-button-lg"><%- _.tr("Order Now") %></a>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t<% } %>\r\n\t\r\n\r\n';});


define('plugins/text!templates/venue-style.html',[],function () { return '\r\n.venuePage { width: <%-pageWidth%>px; }\r\n\r\n<%\r\n_.each(data, function(venue) { \r\n\tvar settings = venue.settings;\r\n\r\n\tif ( !settings ) return;\r\n%>\r\n\r\n.venue-<%-settings.venueId%>.venuePage {\r\n\tbackground: transparent url(<%- format.img(wallpaper(settings)) %>) no-repeat center top;\r\n\tbackground-size: cover;\r\n\tcolor:#<%-settings.textColour%>;\r\n} \r\n\r\n.venue-<%-settings.venueId%>.venuePage * {\r\n\tcolor:#<%-settings.textColour%>;\r\n}\r\n.venue-<%-settings.venueId%>.venuePage .asd a.button {\r\n\tcolor:#<%-settings.buttonTextColour%>;\r\n  border: #<%-settings.buttonColour%>; background: #<%-settings.buttonColour%>;\r\n} \r\n[selected-venue="<%-settings.venueId%>"] .bar-footer.footer-basket .button,\r\n[selected-venue="<%-settings.venueId%>"] .submit,\r\n[selected-venue="<%-settings.venueId%>"] .bar-footer .button{\r\n\tcolor:#<%-settings.button2TextColour%>;\r\n  border: #<%-settings.button2Colour%>;\r\n  background: #<%-settings.button2Colour%>;\r\n}\r\n[selected-venue="<%-settings.venueId%>"] .submit:active  {\r\n\tcolor:#<%-settings.button2TextColour%>;\r\n  background: #<%-settings.button2Colour%>;\r\n}\r\n\r\n[selected-venue="<%-settings.venueId%>"] .app-icon-add,\r\n[selected-venue="<%-settings.venueId%>"] .app-icon-chevron,\r\n[selected-venue="<%-settings.venueId%>"] #imagelightbox-close {\r\n\tcolor:#<%-settings.button3TextColour%>;\r\n\tborder: #<%-settings.button3Colour%>;\r\n\tbackground-color: #<%-settings.button3Colour%>;\r\n}\r\n\r\n[selected-venue="<%-settings.venueId%>"] .list li.list-selected::before {\r\n\tborder-color: #<%-settings.button3Colour%>;\r\n}\r\n\r\n[selected-venue="<%-settings.venueId%>"] .segmented-controller {\r\n\tbackground-color:#<%-settings.button2TextColour%>;\r\n  border-color: #<%-settings.button2Colour%>;\r\n  color: #<%-settings.button2Colour%>;\r\n}\r\n\r\n[selected-venue="<%-settings.venueId%>"] .segmented-controller li {\r\n  border-left-width: 0px;\r\n}\r\n\r\n[selected-venue="<%-settings.venueId%>"] .segmented-controller li > a {\r\n\tcolor:#<%-settings.button2Colour%>;\r\n}\r\n\r\n[selected-venue="<%-settings.venueId%>"] .segmented-controller li.active {\r\n  background: #<%-settings.button2Colour%>;\r\n}\r\n\r\n[selected-venue="<%-settings.venueId%>"] .segmented-controller li.active > a {\r\n\tcolor:#<%-settings.button2TextColour%>;\r\n}\r\n<% }); %>';});

// Filename: views/venue-style-view
define('views/venue-style-view',[
  'jquery',
  'underscore',
  'backbone',
  'plugins/text!templates/venue-style.html',
  'app'
], function($, _, Backbone, template, app){
  var View = Backbone.View.extend({
    tagName: 'style',
    initialize: function() {
      this.listenTo(this.collection, 'all', this.render);
    },
    render: function() {
      var width = $('#content').width();

      //var settings = this.model && this.model.get('settings');
      var compiledTemplate = _.template( template, {
        data : this.collection && this.collection.toJSON(),
        pageWidth: width,
        format: app.templateHelper.format,
        wallpaper: function(settings) {
          return settings.wallpaper || ('img/wallpapers/wall' + settings.wallpaperId + '.jpg');
        }
      });
      this.$el.html(compiledTemplate);

      return this;
    }
    
  });
  
  return View;
  
});

// Filename: views/venueevents-view
define('views/venueevents-view',[
  'jquery',
  'underscore',
  'backbone',
  'plugins/text!templates/venueevents.html',
  'plugins/text!templates/header.html',
  'plugins/text!templates/venue-style.html',
  'views/venue-style-view',
  'app'
], function ($, _, Backbone, template, tmplHeader, tmplStyle, VenueStyleView, app) {
    var View = Backbone.View.extend({
        parent :{},
        tagName: 'li',
        initialize: function (options) {
            this.listenTo(this.model, "change", this.render);
            this.parent = this.options.parent;
        },
        events: {
            'tap a.logout': function (e) { app.logout(true); this.render(); },
            'tap .retry': 'retry',
            'tap .event-select': 'selectEvent',
        },

        render: function () {
            console.log("render:VenueeventsView");

            this.allEvents = this.model.events && this.model.events.expandEvents();

            // Using Underscore we can compile our template with data
            var tData = {
                data: this.allEvents,
                venue: this.model.toJSON(),
                offers: this.model.offers.toJSON(),
                loadFailed: this.model.loadFailed,
                user: app.user || false,
                bracketStrip: function (text) {
                    return text ? text.replace(/\(.*\)/, '') : text;
                },
                format: app.templateHelper.format
            };
            var compiledTemplate = _.template(template, tData);
            // Append our compiled template to this Views "el"
            this.$el.prop('className', 'venueevents-view venuePage venue-' + this.model.get('id'));
            this.$el.html(compiledTemplate);

            // setTimeout hack to give dom time to layout
            setTimeout(_.bind(this.refreshScroller, this), 100);
        },

        refreshScroller: function () {
            var that = this;

            // iScroller
            if (this.indexScroller) {
                this.indexScroller.destroy();
            }

            var iScroller_Width = 115;

            // iScroller calculate width based on the logos
            var scrollItems = this.$el.find('.inxscroller-items'),
                scrollItems = scrollItems && scrollItems.find('.inxscroller-item');
            if (scrollItems && scrollItems.length > 0) {
                scrollItems.each(function () {
                    iScroller_Width += $(this).width();
                });
                this.$el.find('.inxscroller').width(iScroller_Width);
                console.log('created scroll')
                var wrap = this.$('.iscrollcontainer');
                this.indexScroller = new IScroll(wrap[0], {
                    snap: '.inxscroller-item',
                    scrollbars: false,
                    scrollX: true,
                    ScrollY: false,
                    momentum: false,
                    mouseWheel: true,
                    bindToWrapper: true
                });
     
                if (this.parent && this.parent.indexScroller) { 
                    this.indexScroller.on('beforeScrollStart', function () {
                        that.parent.indexScroller.disable()
                        return false
                    });

                    this.indexScroller.on('scrollEnd', function () {
                        that.parent.indexScroller.enable()
                        return false
                    });
                }
                
            
            }



        },

        retry: function () {
            document.location.reload(true)
        },

        selectEvent: function (e) {
            e.preventDefault();

            var eIdx = $(e.currentTarget).data("event-idx");
            var event = this.allEvents[eIdx];

            app.router.venueoutlet(this.model, event);
        },

        remove: function () {
            if (this.indexScroller) {
                this.indexScroller.destroy();
            }

            return Backbone.View.prototype.remove.apply(this, arguments);
        }

    });

    return View;
});

// Filename: views/home-view
define('views/home-view',[
  'jquery',
  'underscore',
  'backbone',
  'app',
  'plugins/text!templates/home.html',
  'plugins/text!templates/header.html',
  'views/venueevents-view',
  'models/venue-collection'
], function ($, _, Backbone, app, template, tmplHeader, VenueEventsView, VenueCollection) {
    var View = Backbone.View.extend({


        events: {
            'tap a': function (e) {
                $('input').blur();//fixing keyboard slidedown
            },
            'submit form.add-venue': 'addVenue',
            'tap .add-venue a': 'addVenue',
            'submit form.search-venue': 'searchVenue',
            'tap .search-venue a': 'searchVenue',
            'tap a[data-index]': 'scrollTap',
            'tap #swipeWrapper': 'hideSwipe',
            'click #swipeWrapper': 'hideSwipe',

        },

        initialize: function () {
            this.initChildViewStorage();

            this.listenTo(this.collection, 'add', function () {
                this.render(true);
            });

            this.listenTo(this.collection, 'remove reset', function () {
                this.render();
            });

            window.StatusBar && window.StatusBar.styleLightContent();
        },

        initChildViewStorage: function () {
            this._children = new Backbone.ChildViewContainer();
        },

        render: function (scroll) {
            var width = $('#content').width();

            console.log("render:HomeView");
            var compiledTemplate = _.template(template, {
                hideAdd: this.options.hideAdd,
                pageWidth: width,
                venues: this.collection && this.collection.toJSON()
            });
            this.$el.html(compiledTemplate);
            this.renderHeader();

            this.collection.each(this.renderVenue, this);

            if ( this.collection.length ) {
                this.renderOnload(scroll);
            }
        },

        renderHeader: function () {
            var data = {
                homepage: {
                    className: 'homepage', classNameLogo: 'white', classLink: 'venuefavorites'
                }
            };

            // Add the edit link if we have saved venues
            if (app.savedVenues && app.savedVenues.length > 0) data.right = _.tr('Edit');

            var compiledTemplate = _.template(tmplHeader, data);

            if (this.$("header")) {
                this.$("header").remove();
            }
            this.$(".content").before(compiledTemplate);
        },

        renderVenue: function (model) {
            var view = new VenueEventsView({
                model: model,
                parent:this
            });
            this._children.add(view);
            view.render();
            if (this.options.hideAdd) {
                this.$(".venuePages").append(view.el);
            } else {
                this.$(".addVenuePage").before(view.el);
            }
        },

        renderOnload: function (scroll) {
            function setActivePage(page) {
                $('.appPagination li a').removeClass('active');
                $('.appPagination li:nth-child(' + (page + 1) + ') a').addClass('active');
            }
            if (this.indexScroller && this.indexScroller.reset) {
                this.indexScroller.reset();

            } else {

                // Make sure we have something to scroll to because iscroll does not like and empty scroller
                if ( this.options.hideAdd && this._children.length <= 0 ) return;

                var wrap = this.$('.venuePageWrapper');
                this.indexScroller = new IScroll(wrap[0], {
                    snap: '.venuePage',
                    scrollbars: false,
                    scrollX: true,
                    scrollY: false,
                    mouseWheel: true,
                    snapThreshold: .5,
                    bounce: this._children.length > 1,
                    momentum: true,
                    deceleration: 0.008
                });

                if ( $.os.android ) {
                    // FIXME: This is a complete hack. Without it though
                    // The screen is blank on android devices.
                    // I've no idea why it works
                    var scr = this.indexScroller.scroller;
                    setTimeout(function() {
                        scr.style['-webkit-transition-duration'] = '';
                        scr.style['-webkit-transition-timing-function'] = '';
                    }, 0);
                }

                this.indexScroller.on('refresh', function () {
                    setActivePage(this.currentPage.pageX);
                });
                this.indexScroller.on('scrollEnd', function () {
                    setActivePage(this.currentPage.pageX);
                    app.lastHomeIdx = this.currentPage.pageX;
                });

            }
 
            var idxScroll = this.indexScroller;
            if ( idxScroll.pages.length > 1 ) {
                if (scroll) {
                    setTimeout(function() {
                        // Scroll to new page
                        console.log("Goto page: " + (idxScroll.pages.length - 2));
                        idxScroll.goToPage(idxScroll.pages.length - 2, 0, 500);//, IScroll.utils.ease.bounce);

                        if ( !window.localStorage.getItem('preo-app-swipeShown') ) {
                            this.$('#swipeWrapper').css({
                                opacity: 0,
                                display: 'block'
                            }).animate({
                                opacity: 1
                            });
                            window.localStorage.setItem('preo-app-swipeShown', true);
                        }
                    }, 50);
                } else if (!isNaN(app.lastHomeIdx)) {
                    // Scroll to last viewed
                    this.indexScroller.goToPage(app.lastHomeIdx, 0, 0);
                    setActivePage(app.lastHomeIdx);
                }
            }

        },
        hideSwipe: function() {
            this.$('#swipeWrapper').animate({
                opacity: 0
            }, function(){
                $(this).remove();    
            })
        },
        scrollTap: function (e) {
            e.preventDefault();
            var idx = $(e.currentTarget).data('index');
            this.indexScroller && this.indexScroller.goToPage(idx, 0);

        },
        disableIscroll: function () {
            this.indexScroller.disable()
        }, enableIscroll: function () {
            this.indexScroller.enable()
        },

        addVenue: function (e) {
            var view = this,
                code = this.$('.venue-code').val(),
                vc = new VenueCollection();

            vc.fetch({
                data: {
                    code: code,
                    expand: 'settings,offers,events',
                    live: 1,
                    limit: 1
                },
                success: function (collection, resp, options) {
                    //check collection.length
                    if (collection.length > 0) {
                        view.collection.add(collection.at(0));
                        console.log("Venue added new length: " + view.collection.length);
                    } else {
                        // alert
                        console.log("No venue found for search " + code);

                        function alertDismissed() {

                        }

                        navigator.notification.alert(
                            _.tr('No venue found for search') + ' ' + code,  // message
                            alertDismissed,         // callback
                            '',            // title
                            _.tr('OK')                  // buttonName
                        );


                    }

                },
                error: function () {
                    // alert

                    function alertDismissed() { }

                    navigator.notification.alert(
                        _.tr('Please try again...'),  // message
                        alertDismissed,         // callback
                        _.tr('Error'),            // title
                        _.tr('OK')                  // buttonName
                    );



                }

            })
            //Prevent page refreshing after form submit
            return false;
        },

        searchVenue: function (e) {

            console.log('*** SearchView ***')

            var search = this.$('.venues-search').val();
            app.router.navigate('#venuessearch/' + search, true);
            e.stopPropagation();
            e.preventDefault();
            return false;
        },

        remove: function () {
            this._children.apply("remove");
            this.initChildViewStorage();


            window.StatusBar && window.StatusBar.styleDefault();

            return Backbone.View.prototype.remove.apply(this, arguments);
        }


    });

    return View;

});


define('plugins/text!templates/addresslist.html',[],function () { return '<!-- Content -->\r\n<div class="content">\r\n    <div class="scroller">\r\n\r\n\r\n        <div class="content-padded view-header">\r\n            <h2 id="addresslist-title"><%- _.tr("Stored Addresses") %></h2>\r\n        </div>\r\n        <% if ( addresses.length > 0 ) { %>\r\n\r\n        <!-- Address -->\r\n        <ul class="list big-list">\r\n            <% _.each(addresses, function(item) { %>\r\n                <% if ( item.store != false ) { %>\r\n            <li>\r\n                <a href="#addressdetails/<%- item.id %>" class="addresslist-item">\r\n                    <%- item.address1 %>\r\n                    <span class="app-icon-chevron"></span>\r\n                </a>\r\n            </li>\r\n                <% } %>\r\n            <% }); %>\r\n        </ul>\r\n\r\n        <% } else { %>\r\n<div class="content-padded" id="addresslist-noaddress-text">\r\n      No stored address.\r\n</div>\r\n        <% } %>\r\n\r\n    </div>\r\n</div>\r\n<!-- /Content -->\r\n\r\n<div class="bar-footer bar-footer-actions">\r\n    <a href="#addressnew" class="button button-blue pull-right button-noborder" id="addresslist-add-btn"><%- _.tr("Add Address") %></a>\r\n</div>';});

// Filename: views/addresslist-view
define('views/addresslist-view',[
    'jquery',
    'underscore',
    'backbone',
    'plugins/text!templates/addresslist.html',
    'plugins/text!templates/header.html',
    'models/address',
    'models/address-collection',
    'app'
], function($, _, Backbone, template, tmplHeader, Address, AddressCollection, app){
    var View = Backbone.View.extend({
        initialize: function(){
        },
        render: function(){
            console.log("render:VenuecontactView");
            var compiledTemplate = _.template( template,{addresses: app.user.get('addresses').toJSON() } );
            // Append our compiled template to this Views "el"
            this.$el.html( compiledTemplate );
            this.renderHeader();
        },

        renderHeader : function() {
            // Using Underscore we can compile our template with data
            var compiledTemplate = _.template(tmplHeader, {
                left: _.tr('Back'),
                venue: app.currentVenue && app.currentVenue.toJSON()
            });
            // Append our compiled template to this Views "el"
            if ( this.$("header") ) {
                this.$("header").remove();
            }
            this.$(".content").before(compiledTemplate);
        }
    },
    {
        secure: true
    });

    return View;

});

define('plugins/text!templates/addressnew.html',[],function () { return '<!-- Content -->\r\n<div class="content">\r\n    <div class="scroller">\r\n        <div class="content-padded view-header">\r\n            <h2 id="addressnew-title"><%- title %></h2>\r\n        </div>\r\n        <form id="frmNewAddress">\r\n\r\n            <!-- Errors -->\r\n            <div id="addressnew-error" class="input-group">\r\n                <div class="input-row text-error error">\r\n                    <!-- Place Error Here -->\r\n                </div>\r\n            </div>\r\n\r\n            <!-- Address Fields -->\r\n            <div class="input-group">\r\n                <%= fields %>\r\n            </div>\r\n\r\n\r\n        </form>\r\n\r\n    <% if ( showSaveToggle ) { %>\r\n        <!-- Store Address option -->\r\n        <div class="content-padded">\r\n            <p id="addressnew-store-text"><%- _.tr("Store this address for future orders?") %></p>\r\n            <br>\r\n\r\n            <!-- Toggle On/Off -->\r\n            <div class="input-row">\r\n                <div class="toggle active" id="addressnew-store-btn">\r\n                    <div class="toggle-handle"></div>\r\n                </div>\r\n            </div>\r\n\r\n        </div>\r\n    <% } %>\r\n\r\n\r\n    </div>\r\n</div>\r\n<!-- /Content -->\r\n\r\n<!-- Add this address button -->\r\n<div class="bar-footer bar-footer-actions">\r\n    <a class="submit button button-blue button-noborder pull-right" id="addressnew-submit"><%- buttonText %></a>\r\n</div>';});


define('plugins/text!templates/addressfields.html',[],function () { return '<div class="input-row">\r\n    <label id="addressfield-address1-label"><%- _.tr("Address") %></label><input type="text" name="address1" value="<%- data.address1 %>"/>\r\n</div>\r\n\r\n<!-- Address 2 -->\r\n\r\n<div class="input-row">\r\n    <label></label><input type="text" name="address2" value="<%- data.address2 %>"/>\r\n</div>\r\n\r\n<!-- Address 3 -->\r\n\r\n<div class="input-row">\r\n    <label></label><input type="text" name="address3" value="<%- data.address3 %>"/>\r\n</div>\r\n\r\n<!-- Town/City -->\r\n\r\n<div class="input-row">\r\n    <label id="addressfield-town-label"><%- _.tr("Town/City") %></label><input type="text" name="city" value="<%- data.city %>"/>\r\n</div>\r\n\r\n<!-- County -->\r\n\r\n<div class="input-row">\r\n    <label id="addressfield-county-label"><%- _.tr("County") %></label>\r\n\r\n    <input type="text" name="county" value="<%- data.county %>"/>\r\n\r\n</div>\r\n\r\n<!-- Postcode -->\r\n\r\n<div class="input-row">\r\n    <label id="addressfield-postcode-label"><%- _.tr("Postcode") %></label><input type="text" name="postcode" value="<%- data.postcode %>"/>\r\n</div>';});

// Filename: views/addressnew-view
define('views/addressnew-view',[
    'jquery',
    'underscore',
    'backbone',
    'plugins/text!templates/addressnew.html',
    'plugins/text!templates/addressfields.html',
    'plugins/text!templates/header.html',
    'app'
], function($, _, Backbone, template, tmplFields, tmplHeader, app){
    var View = Backbone.View.extend({

        events: {
            "submit form": "save",
            "tap .submit": "save",
            'tap #addressnew-store-btn':'toggleSave'
        },

        render: function(){
            Backbone.Validation.bind(this);
            console.log("render:VenuecontactView");

            var modelJson = (this.model ? this.model.toJSON() : {});

            var compiledTemplate = _.template( template, {
                data: modelJson,
                showSaveToggle: this.options.showSaveToggle || false,
                fields: _.template( tmplFields, {data: modelJson } ),
                title: this.options.showSaveToggle ? _.tr("Enter New Delivery Address") : this.model && !!this.model.get('id') ? _.tr("Edit Address"): _.tr("Enter New Address"),
                buttonText: this.options.showSaveToggle ? _.tr("Order to this address") : this.model && !!this.model.get('id') ? _.tr("Update this address"): _.tr("Add this address")
            });

            this.$el.html( compiledTemplate );
            this.renderHeader();
        },

        renderHeader : function() {
            // Using Underscore we can compile our template with data
            var compiledTemplate = _.template(tmplHeader, {
                left: _.tr('Back'),
                venue: app.currentVenue && app.currentVenue.toJSON()
            });
            // Append our compiled template to this Views "el"
            if ( this.$("header") ) {
                this.$("header").remove();
            }
            this.$(".content").before(compiledTemplate);
        },

        save: function(e){
            e.preventDefault();

            var values = this.$("#frmNewAddress").serializeObject();
            this.model = this.model || new Address();

            if ( !this.model.set(values, {validate: true}) ) {
                return;
            }

            if ( this.saveState() ) {

                var that = this;
                this.model.save(null,{
                    success: function(model, resp, opts) {
                        that.saveSuccess(model);
                    },
                    error: function() {
                        $('#spinner').hide();

                    }
                });

            } else {
                this.model.set('id',Math.random().toString(36).slice(2));
                this.model.set('store',this.saveState());
                this.saveSuccess(this.model);
            }

        },
        saveSuccess: function(model){
            //what we do after model has been successfully saved
            app.user.get('addresses').add(model);
            app.storeUser();

            if (!app.user.get('addressSelected')){
                app.user.set('addressSelected',model);
            }

            window.history.back();
        },

        toggleSave: function () {
            $('#addressnew-store-btn').toggleClass('active');
        },

        saveState: function () {
            // Used to determine if we are saving this address.
            // If the toggle on/off save button exists on the form and user has set to off, we return false
            // otherwise if set to on we return true.
            // If toggle button is not found on page that means we are automatically saving, so true is returned. Steve
            return !($('#addressnew-store-btn').length && !$('#addressnew-store-btn').hasClass('active'));
        }

    });

    return View;

});

define('plugins/text!templates/addressdetails.html',[],function () { return '<!-- Content -->\r\n<div class="content">\r\n    <div class="scroller">\r\n        <div class="content-padded view-header">\r\n            <h2 id="addressdetails-title"><%- _.tr("Address Details") %></h2>\r\n        </div>\r\n        <div class="content-padded">\r\n\r\n            <!-- Address -->\r\n            <div class="box" id="addressdetails-line1">\r\n                <%- address.address1 %>\r\n            </div>\r\n            <div class="box" id="addressdetails-line2">\r\n                <%- address.address2 %>\r\n            </div>\r\n            <div class="box" id="addressdetails-line3">\r\n                <%- address.address3 %>\r\n            </div>\r\n\r\n            <!-- City -->\r\n            <div class="box" id="addressdetails-city">\r\n                <%- address.city %>\r\n            </div>\r\n\r\n            <!-- County -->\r\n            <div class="box" id="addressdetails-county">\r\n                <%- address.county %>\r\n            </div>\r\n\r\n            <!-- Postcode -->\r\n            <div class="box" id="addressdetails-postcode">\r\n                <%- address.postcode %>\r\n            </div>\r\n\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n<!-- Footer -->\r\n<div class="bar-footer bar-footer-actions">\r\n    <a href="#addressnew/<%- address.id %>" class="button pull-left"><%- _.tr("Edit") %></a>\r\n    <a id="address-delete" class="button button-grey pull-right"><%- _.tr("Delete") %></a>\r\n</div>';});

// Filename: views/addressdetails-view
define('views/addressdetails-view',[
    'jquery',
    'underscore',
    'backbone',
    'plugins/text!templates/addressdetails.html',
    'plugins/text!templates/header.html',
    'app'
], function($, _, Backbone, template, tmplHeader, app){
    var View = Backbone.View.extend({

        events: {
            "tap #address-delete": "deleteAddress"
        },
        render: function(){
            console.log("render:VenuecontactView");
            var compiledVars = {address: this.model.toJSON()};
            var compiledTemplate = _.template(template, compiledVars);
            this.$el.html( compiledTemplate );
            this.renderHeader();
        },
        renderHeader : function() {
            // Using Underscore we can compile our template with data
            var compiledTemplate = _.template(tmplHeader, {
                left: _.tr('Back'),
                venue: app.currentVenue && app.currentVenue.toJSON()
            });
            // Append our compiled template to this Views "el"
            if ( this.$("header") ) {
                this.$("header").remove();
            }
            this.$(".content").before(compiledTemplate);
        },
        deleteAddress: function(e) {

            e.preventDefault();
            var confirmMethod = navigator.notification && navigator.notification.confirm || function(msg, callback) {
                var r = window.confirm(msg);
                callback(r ? 1 : 2);
            };

            confirmMethod(
                'Continuing will permenantly remove the address.',
                _.bind(function(button) {
                    if ( button != 1 ) return;
                    $('#spinner').show();
                    this.model.destroy({
                        success: function() {
                            app.storeUser();
                            window.history.back();
                        },
                        error: function() {
                            $('#spinner').hide();
                            // failed
                        }
                    });

                }, this)
            );


        }
    });

    return View;

});

define('plugins/text!templates/invitedvenues.html',[],function () { return '<div class="content invitedvenues general-list">\r\n\t<div class="scroller">\r\n\t\t<div class="content-padded">\r\n\t\t\t<h2 class="coloured"><%- _.tr("Invited venues") %></h2>\r\n\t\t</div>\r\n\t\t\r\n\t\t\r\n\t\t<ul class="list">\r\n\t\t\t<li>\r\n\t\t\t\t\t<strong><%- _.tr("Burnley Bowl") %></strong>\r\n\t\t\t\t\t<span class="app-icon-add"></span>\r\n\t\t\t</li>\r\n\t\t\t<li>\r\n\t\t\t\t\t<strong><%- _.tr("Burnley Rugby Clu") %></strong>\r\n\t\t\t\t\t<span class="app-icon-add"></span>\r\n\t\t\t</li>\r\n\t\t\t<li class="fade-text">\r\n\t\t\t\t\t<strong><%- _.tr("Burnley Coffee Shop") %></strong>\r\n\t\t\t\t\t<span class="app-icon-dots"></span>\r\n\t\t\t</li>\r\n\t\t\t<li class="fade-text">\r\n\t\t\t\t\t<strong><%- _.tr("Burnley Pizza & Pasta") %></strong>\r\n\t\t\t\t\t<span class="app-icon-dots"></span>\r\n\t\t\t</li>\r\n\t\t\t<li class="fade-text">\r\n\t\t\t\t\t<strong><%- _.tr("Burnley Chip Shop") %></strong>\r\n\t\t\t\t\t<span class="app-icon-dots"></span>\r\n\t\t\t</li>\r\n\t\t</ul>\r\n\r\n\r\n\t</div>\r\n</div>\r\n\r\n\r\n\t\t\t\t\t';});

// Filename: views/invitevenue-view
define('views/invitedvenues-view',[
  'jquery',
  'underscore',
  'backbone',
  'plugins/text!templates/invitedvenues.html',
  'plugins/text!templates/header.html',
  'app'
], function($, _, Backbone, template, tmplHeader, app){
  var View = Backbone.View.extend({
  	
    render: function(){
    	console.log("render:InvitedvenuesView");
      var compiledTemplate = _.template( template );
      // Append our compiled template to this Views "el"
      this.$el.html( compiledTemplate );
      
			this.renderHeader();

      // TODO: allow loading about screen from external url
      // $('.external').load($settings.apiRoot  + 'config/about');
    },
    
		renderHeader : function() {
			// Using Underscore we can compile our template with data
			var compiledTemplate = _.template(tmplHeader, this.options.header || {});
			// Append our compiled template to this Views "el"
			if ( this.$("header") ) {
				this.$("header").remove();
			}
			this.$(".content").before(compiledTemplate);
		}
    
  });
  
  return View;
  
});


define('plugins/text!templates/venuedetails.html',[],function () { return '<div class="content venuedetails general-list">\r\n\t<div class="scroller">\r\n\t\t<div class="content-padded extra-padded">\r\n\t\t\t<h2 class="coloured" id="venuedetails-title"><%- _.tr("Invite your favourite venue to join") %> <span>my order app</span></h2>\r\n\r\n<br>\r\n<p><strong class="coloured" id="venuedetails-name-label"><%- _.tr("Venue name") %></strong><br>\r\n\t<span id="venuedetails-name"><%- data.name %></span></p>\r\n<br>\r\n<p><strong class="coloured" id="venuedetails-address-label"><%- _.tr("Venue address") %></strong><br>\r\n\t<span id="venuedetails-address"><%- data.address %></span></p>\r\n<br>\r\n<a class="invite-btn button"><%- _.tr("Invite") %></a>\r\n\r\n\t\t</div>\r\n\r\n\t</div>\r\n</div>\r\n\r\n\r\n\t\t\t\t\t';});

// Filename: views/venuedetails-view
define('views/venuedetails-view',[
  'jquery',
  'underscore',
  'backbone',
  'plugins/text!templates/venuedetails.html',
  'plugins/text!templates/header.html',
  'app'
], function($, _, Backbone, template, tmplHeader, app){
  var View = Backbone.View.extend({

  	events : {
	  	'tap .invite-btn' : 'InviteVenue'
  	},
  	
    render: function(){
    	console.log("render:VenuedetailsView");
      var compiledTemplate = _.template( template, {
	      data : this.model && this.model.toJSON()
      });
      
      // Append our compiled template to this Views "el"
      this.$el.html( compiledTemplate );
      
			this.renderHeader();

      // TODO: allow loading about screen from external url
      // $('.external').load($settings.apiRoot  + 'config/about');
    },
    
		renderHeader : function() {
			// Using Underscore we can compile our template with data
			var compiledTemplate = _.template(tmplHeader, this.options.header || {});
			// Append our compiled template to this Views "el"
			if ( this.$("header") ) {
				this.$("header").remove();
			}
			this.$(".content").before(compiledTemplate);
		},
		
		InviteVenue: function(e) {		
			$.ajax({
        type: 'POST',
        url: $settings.apiRoot + 'venues/invites',
        contentType: 'application/json',
        data: JSON.stringify({
					userId: app.user && app.user.get('id'),
					name: this.model.get('name'),
					capsuleId: this.model.get('id')
        }),
        success: function(data, status, xhr) {
					// alert
//					console.log('It worked: ' + data.name);
					
						function alertDismissed() {};
						navigator.notification.alert(
						    _.tr('Invitation was successful!'),
						    alertDismissed,         // callback
						    _.tr('Information'),            // title
						    _.tr('OK')                  // buttonName
						);

					
					app.router.navigate('', true);
        },
        error: function(xhr, errorType, error) {
					// alert
					console.log('invite failed');
        }
      });		
		}
		
		
    
  });
  
  return View;
  
});


define('plugins/text!templates/invitevenue.html',[],function () { return '<div class="content invitevenue general-list">\r\n\t<div class="scroller with-input">\r\n\t\t<div class="content-padded extra-padded">\r\n      <h2 class="coloured" id="invitevenue-title"><%- _.tr("Invite your favourite venue to join") %> <span>my order app</span></h2>\r\n\r\n<br>\r\n\r\n<form>\r\n\t<input type="text" class="name" placeholder="<%- _.tr(\'Enter venue name\') %>">\r\n\t<input type="text" class="email" placeholder="<%- _.tr(\'Enter venue email\') %>">\t\r\n\t\r\n</form>\r\n\r\n<br>\r\n\r\n<a class="invite-btn button"><%- _.tr("Invite") %></a>\r\n\r\n\t\t</div>\r\n\r\n\t</div>\r\n</div>\r\n\r\n\r\n\t\t\t\t\t';});

// Filename: views/invitevenue-view
define('views/invitevenue-view',[
  'jquery',
  'underscore',
  'backbone',
  'plugins/text!templates/invitevenue.html',
  'plugins/text!templates/header.html',
  'app'
], function($, _, Backbone, template, tmplHeader, app){
  var View = Backbone.View.extend({


  	events : {
			'tap a': function(e) {
				$('input').blur();//fixing keyboard slidedown
			},
	  	'tap .invite-btn' : 'InviteVenue'
  	},
  	
    render: function(){
    	console.log("render:InvitevenueView");
      var compiledTemplate = _.template( template );
      // Append our compiled template to this Views "el"
      this.$el.html( compiledTemplate );
      
			this.renderHeader();

      // TODO: allow loading about screen from external url
      // $('.external').load($settings.apiRoot  + 'config/about');
    },
    
		renderHeader : function() {
			// Using Underscore we can compile our template with data
			var compiledTemplate = _.template(tmplHeader, this.options.header || {});
			// Append our compiled template to this Views "el"
			if ( this.$("header") ) {
				this.$("header").remove();
			}
			this.$(".content").before(compiledTemplate);
		},
		
		InviteVenue: function(e) {


			var name = this.$('.name').val(),
					email = this.$('.email').val();
					
			$.ajax({
        type: 'POST',
        url: $settings.apiRoot + 'venues/invites',
        contentType: 'application/json',
        data: JSON.stringify({
					userId: app.user && app.user.get('id'),
					name: name,
					email: email
        }),
        success: function(data, status, xhr) {
					// alert
//					console.log('It worked: ' + data.name);
//  				navigator.notification.alert('thank you');

/*
navigator.notification.alert(
    'You are the winner!',  // message
    'Game Over',            // title
    'Done'                  // buttonName
);
*/

						function alertDismissed() {};
						navigator.notification.alert(
						    _.tr('Invitation was successful!'),
						    alertDismissed,         // callback
						    _.tr('Information'),            // title
						    _.tr('OK')                  // buttonName
						);

 
					app.router.navigate('', true);
        },
        error: function(xhr, errorType, error) {
					// alert
					console.log('invite failed');
        }
      });
		
		}
		
    
  });
  
  return View;
  
});


define('plugins/text!templates/venuessearch.html',[],function () { return '<div class="content venuessearch general-list">\r\n\t<div class="scroller">\r\n\t\t<div class="content-padded">\r\n\t\t\t<h2 class="coloured" id="venuesearch-title"><%- _.tr("Invite your favourite venue to join") %> <span>my order app</span></h2>\r\n\t\t</div>\r\n\t\t<ul class="list">\r\n\t\t\r\n\t\t\t<% _.each(data, function(venue) { %>\r\n\t\t\t<li>\r\n\t\t\t\t<a data-venue-id="<%- venue.id %>" class="tap-view-venue">\r\n\t\t\t\t\t<strong id="venuesearch-name"><%- venue.name %></strong>\r\n\t\t\t\t\t<span class="app-icon-chevron"></span>\r\n\t\t\t\t</a>\r\n\t\t\t</li>\r\n\t\t\t<% }) %>\t\t\t\r\n\t\t\t<li>\r\n\t\t\t\t<a class="coloured" href="#invitevenue">\r\n\t\t\t\t\t<strong class="coloured"  id="venuesearch-nothere-text"><%- _.tr("Not here? Add their email...") %></strong>\r\n\t\t\t\t\t<span class="app-icon-add"  id="venuesearch-add-btn"></span>\r\n\t\t\t\t</a>\r\n\t\t\t</li>\r\n\t\t</ul>\r\n\t</div>\r\n</div>\r\n\r\n\r\n\t\t\t\t\t';});

// Filename: views/venuessearch-view
define('views/venuessearch-view',[
  'jquery',
  'underscore',
  'backbone',
  'plugins/text!templates/venuessearch.html',
  'plugins/text!templates/header.html',
  'app'
], function($, _, Backbone, template, tmplHeader, app){
  var View = Backbone.View.extend({
  
  	events : {
	  	'tap .tap-view-venue' : 'showVenue'
  	},
  	
    render: function(){
    	console.log("render:VenuessearchView");
      var compiledTemplate = _.template( template, {
      	data: this.collection && this.collection.toJSON()	      
	    });
      // Append our compiled template to this Views "el"
      this.$el.html( compiledTemplate );
      
			this.renderHeader();

      // TODO: allow loading about screen from external url
      // $('.external').load($settings.apiRoot  + 'config/about');
    },
    
		renderHeader : function() {
			// Using Underscore we can compile our template with data
			var compiledTemplate = _.template(tmplHeader, this.options.header || {});
			// Append our compiled template to this Views "el"
			if ( this.$("header") ) {
				this.$("header").remove();
			}
			this.$(".content").before(compiledTemplate);
		},
		
		
		showVenue: function(e) {
			var id = $(e.currentTarget).data('venue-id');
			var venue = this.collection.get(id);
			app.router.venuedetails(venue);
		}
		
    
  });
  
  return View;
  
});


define('plugins/text!templates/venuefavorites.html',[],function () { return '<div class="content venuefavorites general-list">\r\n\t<div class="scroller">\r\n\t\t<div class="content-padded">\r\n\t\t\t<h2 class="coloured" id="venuefavorites-title"><%- _.tr("Edit favourite venues") %></h2>\r\n\t\t</div>\r\n\t\t<ul class="list sortable">\r\n\t\t<% _.each(data, function(venue) { %>\r\n\t\t\t<li data-venue-id="<%- venue.id %>">\r\n\t\t\t\t\t<span class="app-icon-reorder handle"></span>\r\n\t\t\t\t\t<strong id="venuefavorites-name"><%- venue.name %> [<%- venue.code %>]</strong>\r\n\t\t\t\t\t<span class="app-icon-remove" data-venue-id="<%- venue.id %>"></span>\r\n\t\t\t</li>\r\n\t\t<% }); %>\r\n\t\t</ul>\r\n\t\t<!--div class="content-padded">\r\n\t\t\t<div class="app-icon-add"></div>\r\n\t\t</div-->\r\n\t</div>\r\n</div>\r\n\r\n\r\n\t\t\t\t\t';});

// Filename: libs/bind-poly.js
define('libs/bindpoly',[], function(){
	if (!Function.prototype.bind) {
	  Function.prototype.bind = function (oThis) {
	    if (typeof this !== "function") {
	      // closest thing possible to the ECMAScript 5 internal IsCallable function
	      throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
	    }

	    var aArgs = Array.prototype.slice.call(arguments, 1), 
	        fToBind = this, 
	        fNOP = function () {},
	        fBound = function () {
	          return fToBind.apply(this instanceof fNOP && oThis
	                                 ? this
	                                 : oThis,
	                               aArgs.concat(Array.prototype.slice.call(arguments)));
	        };

	    fNOP.prototype = this.prototype;
	    fBound.prototype = new fNOP();

	    return fBound;
	  };

		console.log('No native bind method.');
	  return true;

	} else {
		console.log('Native bind method.');
		return false;
	}
});
/*
    Slip - swiping and reordering in lists of elements on touch screens, no fuss.

    Fires these events on list elements:

        • slip:swipe
            When swipe has been done and user has lifted finger off the screen.
            If you execute event.preventDefault() the element will be animated back to original position.
            Otherwise it will be animated off the list and set to display:none.

        • slip:beforeswipe
            Fired before first swipe movement starts.
            If you execute event.preventDefault() then element will not move at all.

        • slip:reorder
            Element has been dropped in new location. event.detail contains the location:
                • insertBefore: DOM node before which element has been dropped (null is the end of the list). Use with node.insertBefore().
                • spliceIndex: Index of element before which current element has been dropped, not counting the element iself.
                               For use with Array.splice() if the list is reflecting objects in some array.

        • slip:beforereorder
            When reordering movement starts.
            Element being reordered gets class `slip-reordering`.
            If you execute event.preventDefault() then element will not move at all.

        • slip:beforewait
            If you execute event.preventDefault() then reordering will begin immediately, blocking ability to scroll the page.

        • slip:tap
            When element was tapped without being swiped/reordered.


    Usage:

        CSS:
            You should set `user-select:none` (and WebKit prefixes, sigh) on list elements,
            otherwise unstoppable and glitchy text selection in iOS will get in the way.

            You should set `overflow-x: hidden` on the container or body to prevent horizontal scrollbar
            appearing when elements are swiped off the list.


        var list = document.querySelector('ul#slippylist');
        new Slip(list);

        list.addEventListener('slip:beforeswipe', function(e) {
            if (shouldNotSwipe(e.target)) e.preventDefault();
        });

        list.addEventListener('slip:swipe', function(e) {
            // e.target swiped
            if (thatWasSwipeToRemove) {
                e.target.parentNode.removeChild(e.target);
            } else {
                e.preventDefault(); // will animate back to original position
            }
        });

        list.addEventListener('slip:beforereorder', function(e) {
            if (shouldNotReorder(e.target)) e.preventDefault();
        });

        list.addEventListener('slip:reorder', function(e) {
            // e.target reordered.
            if (reorderedOK) {
                e.target.parentNode.insertBefore(e.target, e.detail.insertBefore);
            } else {
                e.preventDefault();
            }
        });

    Requires:
        • Touch events
        • CSS transforms
        • Function.bind()

    Caveats:
        • Elements must not change size while reordering or swiping takes place (otherwise it will be visually out of sync)
*/
/*!
    Slip.js 1.0

    © 2014 Kornel Lesiński <kornel@geekhood.net>. All rights reserved.

    Redistribution and use in source and binary forms, with or without modification,
    are permitted provided that the following conditions are met:

    1. Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.

    2. Redistributions in binary form must reproduce the above copyright notice, this list of conditions and
       the following disclaimer in the documentation and/or other materials provided with the distribution.

    THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES,
    INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
    DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
    SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
    SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
    WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE
    USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

window['Slip'] = (function(){
    'use strict';

    var damnYouChrome = /Chrome\/[34]/.test(navigator.userAgent); // For bugs that can't be programmatically detected :(
    var needsBodyHandlerHack = damnYouChrome; // Otherwise I _sometimes_ don't get any touchstart events and only clicks instead.
    var compositorDoesNotOrderLayers = damnYouChrome; // Looks like WebKit bug #61824, but iOS Safari doesn't have that problem.

    // -webkit-mess
    var testElement = document.createElement('div');

    var transitionPrefix = "webkitTransition" in testElement.style ? "webkitTransition" : "transition";
    var transformPrefix = "webkitTransform" in testElement.style ? "webkitTransform" : "transform";
    var transformProperty = transformPrefix === "webkitTransform" ? "-webkit-transform" : "transform";
    var userSelectPrefix = "webkitUserSelect" in testElement.style ? "webkitUserSelect" : "userSelect";

    testElement.style[transformPrefix] = 'translateZ(0)';
    var hwLayerMagic = testElement.style[transformPrefix] ? 'translateZ(0) ' : '';
    var hwTopLayerMagic = testElement.style[transformPrefix] ? 'translateZ(1px) ' : '';
    testElement = null;

    var globalInstances = 0;
    var attachedBodyHandlerHack = false;
    var nullHandler = function(){};

    function Slip(container, options) {
        if ('string' === typeof container) container = document.querySelector(container);
        if (!container || !container.addEventListener) throw new Error("Please specify DOM node to attach to");

        if (!this || this === window) return new Slip(container, options);

        this.options = options;

        // Functions used for as event handlers need usable `this` and must not change to be removable
        this.cancel = this.setState.bind(this, this.states.idle);
        this.onTouchStart = this.onTouchStart.bind(this);
        this.onTouchMove = this.onTouchMove.bind(this);
        this.onTouchEnd = this.onTouchEnd.bind(this);
        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);
        this.onMouseLeave = this.onMouseLeave.bind(this);
        this.onSelection = this.onSelection.bind(this);

        this.setState(this.states.idle);
        this.attach(container);
    }

    function getTransform(node) {
        var transform = node.style[transformPrefix];
        if (transform) {
            return {
                value:transform,
                original:transform,
            };
        }

        if (window.getComputedStyle) {
            var style = window.getComputedStyle(node).getPropertyValue(transformProperty);
            if (style && style !== 'none') return {value:style, original:''};
        }
        return {value:'', original:''};
    }

    // All functions in states are going to be executed in context of Slip object
    Slip.prototype = {

        container: null,
        options: {},
        state: null,

        target: null, // the tapped/swiped/reordered node with height and backed up styles

        usingTouch: false, // there's no good way to detect touchscreen preference other than receiving a touch event (really, trust me).
        mouseHandlersAttached: false,

        startPosition: null, // x,y,time where first touch began
        latestPosition: null, // x,y,time where the finger is currently
        previousPosition: null, // x,y,time where the finger was ~100ms ago (for velocity calculation)

        canPreventScrolling: false,

        states: {
            idle: function() {
                this.target = null;
                this.usingTouch = false;
                this.removeMouseHandlers();

                return {
                    allowTextSelection: true,
                };
            },

            undecided: function() {
                this.target.height = this.target.node.offsetHeight;
                this.target.node.style[transitionPrefix] = '';

                if (!this.dispatch(this.target.originalTarget, 'beforewait')) {
                    this.setState(this.states.reorder);
                } else {
                    var holdTimer = setTimeout(function(){
                        var move = this.getAbsoluteMovement();
                        if (this.canPreventScrolling && move.x < 15 && move.y < 25) {
                            if (this.dispatch(this.target.originalTarget, 'beforereorder')) {
                                this.setState(this.states.reorder);
                            }
                        }
                    }.bind(this), 300);
                }

                return {
                    leaveState: function() {
                        clearTimeout(holdTimer);
                    },

                    onMove: function() {
                        var move = this.getAbsoluteMovement();

                        if (move.x > 20 && move.y < Math.max(100, this.target.height)) {
                            if (this.dispatch(this.target.originalTarget, 'beforeswipe')) {
                                this.setState(this.states.swipe);
                                return false;
                            } else {
                                this.setState(this.states.idle);
                            }
                        }
                        if (move.y > 20) {
                            this.setState(this.states.idle);
                        }

                        // Chrome likes sideways scrolling :(
                        if (move.x > move.y*1.2) return false;
                    },

                    onLeave: function() {
                        this.setState(this.states.idle);
                    },

                    onEnd: function() {
                        var allowDefault = !this.dispatch(this.target.originalTarget, 'tap');
                        this.setState(this.states.idle);
                        return allowDefault;
                    },
                };
            },

            swipe: function() {
                var swipeSuccess = false;
                var container = this.container;

                container.className += ' slip-swiping-container';
                function removeClass() {
                    container.className = container.className.replace(/(?:^| )slip-swiping-container/,'');
                }

                this.target.height = this.target.node.offsetHeight;

                return {
                    leaveState: function() {
                        if (swipeSuccess) {
                            this.animateSwipe(function(target){
                                target.node.style[transformPrefix] = target.baseTransform.original;
                                target.node.style[transitionPrefix] = '';
                                if (this.dispatch(target.node, 'afterswipe')) {
                                    removeClass();
                                    return true;
                                } else {
                                    this.animateToZero(undefined, target);
                                }
                            }.bind(this));
                        } else {
                            this.animateToZero(removeClass);
                        }
                    },

                    onMove: function() {
                        var move = this.getTotalMovement();

                        if (Math.abs(move.y) < this.target.height+20) {
                            this.target.node.style[transformPrefix] = 'translate(' + move.x + 'px,0) ' + hwLayerMagic + this.target.baseTransform.value;
                            return false;
                        } else {
                            this.setState(this.states.idle);
                        }
                    },

                    onLeave: function() {
                        this.state.onEnd.call(this);
                    },

                    onEnd: function() {
                        var dx = this.latestPosition.x - this.previousPosition.x;
                        var dy = this.latestPosition.y - this.previousPosition.y;
                        var velocity = Math.sqrt(dx*dx + dy*dy) / (this.latestPosition.time - this.previousPosition.time + 1);

                        var move = this.getAbsoluteMovement();
                        var swiped = velocity > 0.6 && move.time > 110;

                        if (swiped) {
                            if (this.dispatch(this.target.node, 'swipe')) {
                                swipeSuccess = true; // can't animate here, leaveState overrides anim
                            }
                        }
                        this.setState(this.states.idle);
                        return !swiped;
                    },
                };
            },

            reorder: function() {
                this.target.height = this.target.node.offsetHeight;

                var mouseOutsideTimer;
                var zero = this.target.node.offsetTop + this.target.height/2;
                var otherNodes = []
                var nodes = this.container.childNodes;
                for(var i=0; i < nodes.length; i++) {
                    if (nodes[i].nodeType != 1 || nodes[i] === this.target.node) continue;
                    var t = nodes[i].offsetTop;
                    nodes[i].style[transitionPrefix] = transformProperty + ' 0.2s ease-in-out';
                    otherNodes.push({
                        node: nodes[i],
                        baseTransform: getTransform(nodes[i]),
                        pos: t + (t < zero ? nodes[i].offsetHeight : 0) - zero,
                    });
                }

                this.target.node.className += ' slip-reordering';
                this.target.node.style.zIndex = '99999';
                this.target.node.style[userSelectPrefix] = 'none';
                if (compositorDoesNotOrderLayers) {
                    // Chrome's compositor doesn't sort 2D layers
                    this.container.style.webkitTransformStyle = 'preserve-3d';
                }

                function setPosition() {
                    if (mouseOutsideTimer) {
                        // don't care where the mouse is as long as it moves
                        clearTimeout(mouseOutsideTimer); mouseOutsideTimer = null;
                    }

                    var move = this.getTotalMovement();
                    this.target.node.style[transformPrefix] = 'translate(0,' + move.y + 'px) ' + hwTopLayerMagic + this.target.baseTransform.value;

                    var height = this.target.height;
                    otherNodes.forEach(function(o){
                        var off = 0;
                        if (o.pos < 0 && move.y < 0 && o.pos > move.y) {
                            off = height;
                        }
                        else if (o.pos > 0 && move.y > 0 && o.pos < move.y) {
                            off = -height;
                        }
                        // FIXME: should change accelerated/non-accelerated state lazily
                        o.node.style[transformPrefix] = off ? 'translate(0,'+off+'px) ' + hwLayerMagic + o.baseTransform.value : o.baseTransform.original;
                    });
                    return false;
                }

                setPosition.call(this);

                return {
                    leaveState: function() {
                        if (mouseOutsideTimer) clearTimeout(mouseOutsideTimer);

                        if (compositorDoesNotOrderLayers) {
                            this.container.style.webkitTransformStyle = '';
                        }

                        this.target.node.className = this.target.node.className.replace(/(?:^| )slip-reordering/,'');
                        this.target.node.style[userSelectPrefix] = '';

                        this.animateToZero(function(target){
                            target.node.style.zIndex = '';
                        });
                        otherNodes.forEach(function(o){
                            o.node.style[transformPrefix] = o.baseTransform.original;
                            o.node.style[transitionPrefix] = ''; // FIXME: animate to new position
                        });
                    },

                    onMove: setPosition,

                    onLeave: function() {
                        // don't let element get stuck if mouse left the window
                        // but don't cancel immediately as it'd be annoying near window edges
                        if (mouseOutsideTimer) clearTimeout(mouseOutsideTimer);
                        mouseOutsideTimer = setTimeout(function(){
                            mouseOutsideTimer = null;
                            this.cancel();
                        }.bind(this), 700);
                    },

                    onEnd: function() {
                        var move = this.getTotalMovement();
                        if (move.y < 0) {
                            for(var i=0; i < otherNodes.length; i++) {
                                if (otherNodes[i].pos > move.y) {
                                    this.dispatch(this.target.node, 'reorder', {spliceIndex:i, insertBefore:otherNodes[i].node});
                                    break;
                                }
                            }
                        } else {
                            for(var i=otherNodes.length-1; i >= 0; i--) {
                                if (otherNodes[i].pos < move.y) {
                                    this.dispatch(this.target.node, 'reorder', {spliceIndex:i+1, insertBefore:otherNodes[i+1] ? otherNodes[i+1].node : null});
                                    break;
                                }
                            }
                        }
                        this.setState(this.states.idle);
                        return false;
                    },
                };
            },
        },

        attach: function(container) {
            globalInstances++;
            if (this.container) this.detach();

            // In some cases taps on list elements send *only* click events and no touch events. Spotted only in Chrome 32+
            // Having event listener on body seems to solve the issue (although AFAIK may disable smooth scrolling as a side-effect)
            if (!attachedBodyHandlerHack && needsBodyHandlerHack) {
                attachedBodyHandlerHack = true;
                document.body.addEventListener('touchstart', nullHandler, false);
            }

            this.container = container;
            this.otherNodes = [];

            // selection on iOS interferes with reordering
            document.addEventListener("selectionchange", this.onSelection, false);

            // cancel is called e.g. when iOS detects multitasking gesture
            this.container.addEventListener('touchcancel', this.cancel, false);
            this.container.addEventListener('touchstart', this.onTouchStart, false);
            this.container.addEventListener('touchmove', this.onTouchMove, false);
            this.container.addEventListener('touchend', this.onTouchEnd, false);
            this.container.addEventListener('mousedown', this.onMouseDown, false);
            // mousemove and mouseup are attached dynamically
        },

        detach: function() {
            this.cancel();

            this.container.removeEventListener('mousedown', this.onMouseDown, false);
            this.container.removeEventListener('touchend', this.onTouchEnd, false);
            this.container.removeEventListener('touchmove', this.onTouchMove, false);
            this.container.removeEventListener('touchstart', this.onTouchStart, false);
            this.container.removeEventListener('touchcancel', this.cancel, false);

            document.removeEventListener("selectionchange", this.onSelection, false);

            globalInstances--;
            if (!globalInstances && attachedBodyHandlerHack) {
                attachedBodyHandlerHack = false;
                document.body.removeEventListener('touchstart', nullHandler, false);
            }
        },

        setState: function(newStateCtor){
            if (this.state) {
                if (this.state.ctor === newStateCtor) return;
                if (this.state.leaveState) this.state.leaveState.call(this);
            }

            // Must be re-entrant in case ctor changes state
            var prevState = this.state;
            var nextState = newStateCtor.call(this);
            if (this.state === prevState) {
                nextState.ctor = newStateCtor;
                this.state = nextState;
            }
        },

        findTargetNode: function(targetNode) {
            while(targetNode && targetNode.parentNode !== this.container) {
                targetNode = targetNode.parentNode;
            }
            return targetNode;
        },

        onSelection: function(e) {
            var isRelated = e.target === document || this.findTargetNode(e);
            if (!isRelated) return;

            if (e.cancelable || e.defaultPrevented) {
                if (!this.state.allowTextSelection) {
                    e.preventDefault();
                }
            } else {
                // iOS doesn't allow selection to be prevented
                this.setState(this.states.idle);
            }
        },

        addMouseHandlers: function() {
            // unlike touch events, mousemove/up is not conveniently fired on the same element,
            // but I don't need to listen to unrelated events all the time
            if (!this.mouseHandlersAttached) {
                this.mouseHandlersAttached = true;
                document.documentElement.addEventListener('mouseleave', this.onMouseLeave, false);
                window.addEventListener('mousemove', this.onMouseMove, true);
                window.addEventListener('mouseup', this.onMouseUp, true);
                window.addEventListener('blur', this.cancel, false);
            }
        },

        removeMouseHandlers: function() {
            if (this.mouseHandlersAttached) {
                this.mouseHandlersAttached = false;
                document.documentElement.removeEventListener('mouseleave', this.onMouseLeave, false);
                window.removeEventListener('mousemove', this.onMouseMove, true);
                window.removeEventListener('mouseup', this.onMouseUp, true);
                window.removeEventListener('blur', this.cancel, false);
            }
        },

        onMouseLeave: function(e) {
            if (e.target === document.documentElement || e.relatedTarget === document.documentElement) {
                if (this.state.onLeave) {
                    this.state.onLeave.call(this);
                }
            }
        },

        onMouseDown: function(e) {
            if (this.usingTouch || e.button != 0 || !this.setTarget(e)) return;

            this.addMouseHandlers(); // mouseup, etc.

            this.canPreventScrolling = true; // or rather it doesn't apply to mouse

            this.startAtPosition({
                x: e.clientX,
                y: e.clientY,
                time: e.timeStamp,
            });
        },

        onTouchStart: function(e) {
            this.usingTouch = true;
            this.canPreventScrolling = true;

            // This implementation cares only about single touch
            if (e.touches.length > 1) {
                this.setState(this.states.idle);
                return;
            }

            if (!this.setTarget(e)) return;

            this.startAtPosition({
                x: e.touches[0].clientX,
                y: e.touches[0].clientY - window.scrollY,
                time: e.timeStamp,
            });
        },

        setTarget: function(e) {
            var targetNode = this.findTargetNode(e.target);
            if (!targetNode) {
                this.setState(this.states.idle);
                return false;
            }

            this.target = {
                originalTarget: e.target,
                node: targetNode,
                baseTransform: getTransform(targetNode),
            };
            return true;
        },

        startAtPosition: function(pos) {
            this.startPosition = this.previousPosition = this.latestPosition = pos;
            this.setState(this.states.undecided);
        },

        updatePosition: function(e, pos) {
            this.latestPosition = pos;

            if (this.state.onMove) {
                if (this.state.onMove.call(this) === false) {
                    e.preventDefault();
                }
            }

            // sample latestPosition 100ms for velocity
            if (this.latestPosition.time - this.previousPosition.time > 100) {
                this.previousPosition = this.latestPosition;
            }
        },

        onMouseMove: function(e) {
            this.updatePosition(e, {
                x: e.clientX,
                y: e.clientY,
                time: e.timeStamp,
            });
        },

        onTouchMove: function(e) {
            this.updatePosition(e, {
                x: e.touches[0].clientX,
                y: e.touches[0].clientY - window.scrollY,
                time: e.timeStamp,
            });

            // In Apple's touch model only the first move event after touchstart can prevent scrolling (and event.cancelable is broken)
            this.canPreventScrolling = false;
        },

        onMouseUp: function(e) {
            if (this.state.onEnd && false === this.state.onEnd.call(this)) {
                e.preventDefault();
            }
        },

        onTouchEnd: function(e) {
            if (e.touches.length > 1) {
                this.cancel();
            } else if (this.state.onEnd && false === this.state.onEnd.call(this)) {
                e.preventDefault();
            }
        },

        getTotalMovement: function() {
            return {
                x:this.latestPosition.x - this.startPosition.x,
                y:this.latestPosition.y - this.startPosition.y,
            };
        },

        getAbsoluteMovement: function() {
            return {
                x: Math.abs(this.latestPosition.x - this.startPosition.x),
                y: Math.abs(this.latestPosition.y - this.startPosition.y),
                time:this.latestPosition.time - this.startPosition.time,
            };
        },

        dispatch: function(targetNode, eventName, detail) {
            var event = document.createEvent('CustomEvent');
            if (event && event.initCustomEvent) {
                event.initCustomEvent('slip:' + eventName, true, true, detail);
            } else {
                event = document.createEvent('Event');
                event.initEvent('slip:' + eventName, true, true);
                event.detail = detail;
            }
            return targetNode.dispatchEvent(event);
        },

        getSiblings: function(target) {
            var siblings = [];
            var tmp = target.node.nextSibling;
            while(tmp) {
                if (tmp.nodeType == 1) siblings.push({
                    node: tmp,
                    baseTransform: getTransform(tmp),
                });
                tmp = tmp.nextSibling;
            }
            return siblings;
        },

        animateToZero: function(callback, target) {
            // save, because this.target/container could change during animation
            target = target || this.target;

            target.node.style[transitionPrefix] = transformProperty + ' 0.1s ease-out';
            target.node.style[transformPrefix] = 'translate(0,0) ' + hwLayerMagic + target.baseTransform.value;
            setTimeout(function(){
                target.node.style[transitionPrefix] = '';
                target.node.style[transformPrefix] = target.baseTransform.original;
                if (callback) callback.call(this, target);
            }.bind(this), 101);
        },

        animateSwipe: function(callback) {
            var target = this.target;
            var siblings = this.getSiblings(target);
            var emptySpaceTransform = 'translate(0,' + this.target.height + 'px) ' + hwLayerMagic + ' ';

            // FIXME: animate with real velocity
            target.node.style[transitionPrefix] = 'all 0.1s linear';
            target.node.style[transformPrefix] = ' translate(' + (this.getTotalMovement().x > 0 ? '' : '-') + '100%,0) ' + hwLayerMagic + target.baseTransform.value;

            setTimeout(function(){
                if (callback.call(this, target)) {
                    siblings.forEach(function(o){
                        o.node.style[transitionPrefix] = '';
                        o.node.style[transformPrefix] = emptySpaceTransform + o.baseTransform.value;
                    });
                    setTimeout(function(){
                        siblings.forEach(function(o){
                            o.node.style[transitionPrefix] = transformProperty + ' 0.1s ease-in-out';
                            o.node.style[transformPrefix] = 'translate(0,0) ' + hwLayerMagic + o.baseTransform.value;
                        });
                        setTimeout(function(){
                            siblings.forEach(function(o){
                                o.node.style[transitionPrefix] = '';
                                o.node.style[transformPrefix] = o.baseTransform.original;
                            });
                        },101);
                    }, 1);
                }
            }.bind(this), 101);
        },
    };

    // AMD
    if ('function' === typeof define && define.amd) {
        define('slip',[],function(){
            return Slip;
        });
    }
    return Slip;
})();


// Filename: views/venuefavorites-view
define('views/venuefavorites-view',[
  'jquery',
  'underscore',
  'backbone',
  'plugins/text!templates/venuefavorites.html',
  'plugins/text!templates/header.html',
  'app',
  'libs/bindpoly',
  'slip'
], function($, _, Backbone, template, tmplHeader, app, poly, Slip){
  var View = Backbone.View.extend({
  
  	events: {
	  	'tap .app-icon-remove': 'removeVenue'
  	},
  	
  	initialize: function() {
	  	this.listenTo(this.collection, 'remove', function(venue) {
		  	this.$('li[data-venue-id="' + venue.get('id') + '"]').remove();
	  	});

	  	var view = this;
	  	this.listenTo(this.$el, 'sortable:update', function(e, data) {
	  		var vId = $(data.item).data('venue-id'),
	  				venue = view.collection.get(vId);

	  		if ( venue ) {
		  		view.collection.remove(venue, {silent:true});
		  		view.collection.add(venue, {at: data.index});
		  	}

	  	}, this);
  	},
  	
    render: function(){
    	console.log("render:VenuefavoritesView");
      var compiledTemplate = _.template( template, {
	      data: this.collection && this.collection.toJSON()
      });
      // Append our compiled template to this Views "el"
      this.$el.html( compiledTemplate );
      
			this.renderHeader();

			_.each(this.$('.list.sortable'), function(list) {
				Slip(list);
				list.addEventListener('slip:beforewait', function(e) {
			    if ( $(e.target).hasClass('handle') ) {
			      e.preventDefault();
			    }
				});
				list.addEventListener('slip:beforeswipe', function(e) {
					e.preventDefault(); // won't move sideways if prevented
				});
				list.addEventListener('slip:reorder', function(e) {
					$(this).trigger('sortable:update', {
						item: e.target,
						index: e.detail.spliceIndex
					});
        	e.target.parentNode.insertBefore(e.target, e.detail.insertBefore);
				});
			});

    },
    
		renderHeader : function() {
			// Using Underscore we can compile our template with data
			var compiledTemplate = _.template(tmplHeader, this.options.header || {});
			// Append our compiled template to this Views "el"
			if ( this.$("header") ) {
				this.$("header").remove();
			}
			this.$(".content").before(compiledTemplate);
		},
		
		removeVenue: function(e) {
			var id = $(e.currentTarget).data('venue-id');
			this.collection.remove(this.collection.get(id));
			
			if ( this.collection.length <= 0 ) {
				app.goBack();
			}
		}
    
  });
  
  return View;
  
});


define('plugins/text!templates/venuecontact.html',[],function () { return '<!-- Content -->\r\n<div class="content">\r\n    <div class="scroller">\r\n\r\n        <div class="content-padded view-header">\r\n            <h2 id="venuecontact-title"><%- _.tr("Venue Contact Details") %></h2>\r\n        </div>\r\n\r\n        <div class="content-padded">\r\n            <!-- Address -->\r\n            <div class="box" id="venuecontact-address">\r\n                <%- data.address1 %> <br>\r\n                <%- data.address2 %> <br>\r\n                <%- data.address3 %>\r\n            </div>\r\n\r\n            <!-- City -->\r\n            <div class="box" id="venuecontact-city">\r\n                <%- data.city  %>\r\n            </div>\r\n\r\n            <!-- Postcode -->\r\n            <a class="box box-last" id="venuecontact-postcode" href="http://maps.apple.com/maps?daddr=<%- data.address1 %>,<%- data.city  %>&saddr=Current Location">\r\n                <%- data.postcode %>\r\n            </a>\r\n\r\n            <!-- Telephone Number -->\r\n            <a class="box plain-link" id="venuecontact-phone"  target="_system" href="tel:<%- data.settings.deliveryPhone %>">\r\n                <%- data.settings.deliveryPhone %>\r\n            </a>\r\n\r\n        </div>\r\n    </div>\r\n</div>\r\n<!-- /Content -->\r\n\r\n<div class="bar-footer bar-footer-actions">\r\n\r\n</div>';});

// Filename: models/settings
define('models/settings',[ "underscore", "backbone", "modelConfiguration"], function(_, Backbone, Configuration) {
	var Model = Backbone.Model.extend({

  	    urlRoot: Configuration.apiRoot + "settings"
    });

    return Model;
});
// Filename: models/settings-collection
define('models/settings-collection',[
    "underscore",
    "backbone",
    "models/settings"],
    function(_, Backbone, Settings){
        var Model = Backbone.Collection.extend({

            url: function() {
                return $settings.apiRoot + "venues/" + this.venueId + "/settings";
            },

            model: Settings
        });

        return Model;
});
// Filename: views/venuecontact-view
define('views/venuecontact-view',[
    'jquery',
    'underscore',
    'backbone',
    'plugins/text!templates/venuecontact.html',
    'plugins/text!templates/header.html',
    'app',
    'models/settings-collection'
], function($, _, Backbone, template, tmplHeader, app, settingsCollection){
    var View = Backbone.View.extend({

        events: {
        },

        initialize: function() {
        },

        render: function(){
            console.log("render:VenuecontactView");
            var compiledTemplate = _.template(template, {data: this.model.toJSON() });
            // Append our compiled template to this Views "el"
            this.$el.html( compiledTemplate);
            this.renderHeader();
        },

        renderHeader : function() {
            // Using Underscore we can compile our template with data
            var compiledTemplate = _.template(tmplHeader, {
                left: _.tr('Back'),
                venue: app.currentVenue && app.currentVenue.toJSON()
            });
            // Append our compiled template to this Views "el"
            if ( this.$("header") ) {
                this.$("header").remove();
            }
            this.$(".content").before(compiledTemplate);
        }
    });

    return View;

});
// Filename: views/settings-view
define('views/venue-view',[
  'jquery',
  'underscore',
  'backbone',
  'plugins/text!templates/home.html',
  'plugins/text!templates/header.html',
  'app'
], function($, _, Backbone, template, tmplHeader, app, VenueModel){
  var View = Backbone.View.extend({
    initialize : function() {
      this.outlets = this.menu.get('outlets');
      this.menu = app.store.getOutletMenu(this.outlets.at(0).get('id'));
      this.listenTo(this.menu, "reset", this.render);
    },
  	events: {
    	'tap .retry': 'retry'
  	},
  	
    render: function(){
    	console.log("render:HomeView");

      // Using Underscore we can compile our template with data
      var compiledTemplate = _.template( template, {
        menu: this.menu.toJSON(), 
        loadFailed: this.collection.loadFailed, 
        user: app.user || false
      });
      // Append our compiled template to this Views "el"
      this.$el.html( compiledTemplate );

			this.renderHeader();
    },
    
		renderHeader : function() {
			// Using Underscore we can compile our template with data
			var compiledTemplate = _.template(tmplHeader, this.options.header || {});
			// Append our compiled template to this Views "el"
			if ( this.$("header") ) {
				this.$("header").remove();
			}
			this.$(".content").before(compiledTemplate);
		},
		
		retry: function() {
			this.collection.load();
		}
  	
  });
  
  return View;
});


define('plugins/text!templates/outlet-location.html',[],function () { return '\r\n<div class="content outlet-location-page">\r\n<div class="scroller">\r\n\t<ul>\r\n\t<% _.each(selects, function(select, idx) { %>\r\n\t\t<% if ( idx == 0 ) { %>\r\n\t\t\t<li class="list-section-section list-section-modifier"><%- select.label || _.tr("Where would you like to pickup?") %></li>\r\n\t\t<% } else { %>\r\n\t\t\t<li class="list-section-section list-section-modifier"><%- select.label %></li>\r\n\t\t<% } %>\t\r\n\t\t<li>\r\n\t\t\t<ul name="outlet-location<%- idx %>" data-path-idx="<%- idx %>" class="list items">\t\t\t\r\n\t\t\t\t<% _.each(select.values, function(item) { %>\r\n\t\t\t\t\t<% if (select.value) { %>\t\t\t\r\n\t\t\t\t\t\t<% if ( item.id == select.value ) { %>\r\n\t\t\t\t\t\t<li data-item-id="<%- item.id %>" class="list-selected" > <%- item.name %> \r\n\t\t\t\t\t\t\t<span class="edit app-icon-edit"></span>\r\n\t\t\t\t\t\t</li>\r\n\t\t\t\t\t\t<% } %>\t\t\t\t\r\n\t\t\t\t\t<% } else {%>\t\r\n\t\t\t\t\t\t<% if ( item.selected ) { %>\r\n\t\t\t\t\t\t\t<li data-item-id="<%- item.id %>" class="list-selected" > <%- item.name %> \r\n\t\t\t\t\t\t\t\t<span class="edit app-icon-edit">Edit</span>\r\n\t\t\t\t\t\t\t</li>\t\t\r\n\t\t\t\t\t\t<% } else { %>\r\n\t\t\t\t\t\t\t<li data-item-id="<%- item.id %>"> <%- item.name %> </li>\t\t\r\n\t\t\t\t\t\t<% } %>\r\n\t\t\t\t\t<% } %>\r\n\t\t\t\t<% }); %>\t\t\r\n\t\t\t</ul>\t\t\r\n\t\t</li>\r\n\t<% }); %>\r\n\t\r\n\t<% if ( location && location.outletId ) { %>\r\n\t\t<a  href="#outlet/<%- location.outletId %>" class="button-block submit" style="margin: 0px 40px 20px"> <%- _.tr("Continue") %> </a>\r\n\t<% } %>\r\n\t</ul>\r\n</div>\r\n</div>';});

// Filename: views/settings-view
define('views/outlet-location-view',[
  'jquery',
  'underscore',
  'backbone',
  'plugins/text!templates/outlet-location.html',
  'plugins/text!templates/header.html',
  'app'
], function($, _, Backbone, template, tmplHeader, app){
  var View = Backbone.View.extend({

    initialize: function(options) {
      this.listenTo(this.collection, "reset", _.bind(this.render, this));
      if ( app.locationPath && app.locationPath[0] == this.collection.filter.root ) {
        this.path = app.locationPath;
      } else {        
        this.path = [this.collection.filter.root];
      }
    },
  	
  	events: {      
      "tap .submit": "selectOutlet",
      "tap li":"toggle"

  	},
  	
    render: function(){
    	console.log("render:OutletLocationView");

      var selects = [],
          location = false;
      for ( var idx=0; idx<this.path.length; idx++ ) {
        console.log('idx:'+idx);
        var path = this.path[idx],
            valid = false,
            select = {
              values: [],
              parent: path
            },
            selectedPath = this.path[idx + 1] || false;

        // Get all the children of the current path value
        var filtered = _.filter(this.collection ? this.collection.toJSON() : [], function(item) { return item.parent == path; });

        // Add each filtered item to the select.values collection
        // Expanding seat ranges if required
        
        _.each(filtered, function(item) {
          if ( item.seatStart && item.seatEnd) {
            // it's a range so expand
            for (var s = item.seatStart; s <= item.seatEnd; s++) {
                                            
              var seat = _.clone(item);
              seat.id = item.id + "-" + s;
              seat.name = s;

              //get the last selected value
              var last = this.path && this.path.length ? this.path.slice(-1)[0] : false;
              if (seat.selected && seat.id != last) {
                seat.selected =false;              
              }
              select.values.push(seat);

              if ( seat.id == selectedPath ) {
                select.value = selectedPath;
                valid = true;
                location = item;
              }
            }
          } else {
            select.values.push(item);

            if ( item.id == selectedPath ) {
              select.value = selectedPath;
              valid = true;
              location = item;
            }
          }
          // Set the label
          select.label = item.label;
        }, this);

        // Sort by name
        select.values.sort(function(lft, rgt) {
          return lft.name > rgt.name ? 1 : lft.name < rgt.name ? -1 : 0;
        });

        // Add to collection
        selects.push(select);
      
        // If we have selected a location with an outlet we can stop
        if ( !valid || (location && location.outletId) ) break;

      }
      console.log("selects:");
      console.log(selects);

      // Using Underscore we can compile our template with data
      var compiledTemplate = _.template( template, {
      	data: this.collection ? this.collection.toJSON() : [],
        selects: selects,
        location: location
      });


      // Append our compiled template to this Views "el"
      this.$el.html( compiledTemplate );

			this.renderHeader();   
      app.trigger('content:change');   
    },
    
		renderHeader : function() {
			// Using Underscore we can compile our template with data
			var compiledTemplate = _.template(tmplHeader, _.extend(this.options.header || {left: _.tr('Back')}, {
        message: app.messages()
      }));
			// Append our compiled template to this Views "el"
			if ( this.$("header") ) {
				this.$("header").remove();
			}
			this.$(".content").before(compiledTemplate);
		},

    toggle:function(e){
      var that = this;
      console.log('toggle',e.currentTarget)
      var target = e.currentTarget      
      var pathIdx = $($(target).parent()).data("path-idx");      
      var pathValue = String($(target).data("item-id"));            
      var itemId = pathValue.indexOf("-") > -1 ? pathValue.split("-")[0] : pathValue;
      item = this.collection.get(itemId);                        

      //if we're tapping a selected item we need to deselect everything on the same level and below
      var hid = false;
      _.each(this.path,function(el,index,array){
        if ($(target).data("item-id") == el){                    
            console.log("els:",el)
            that.path.length = pathIdx+1;
            hid = true;
            return false;
        }
      });
      if (!hid) {      
        this.path.length = pathIdx+1;
        this.path.push(pathValue);
        app.locationPath = this.path;
      } 
      
      // select the correct items
      this.collection.deselectAll()
      for ( var idx=0; idx<this.path.length; idx++ ) {
        var key = this.path[idx] && this.path[idx].split('-'); // Seats have a id-seatnum format
        ol = key && this.collection.get(key[0]);
        if ( ol ) {          
          ol.set("selected",true);
        }
      }    
      this.render();

    },

    selectOutlet: function() {

      // Get the path long name
      var pName = [],
          ol;
      for ( var idx=0; idx<this.path.length; idx++ ) {
        var key = this.path[idx] && this.path[idx].split('-'); // Seats have a id-seatnum format
        ol = key && this.collection.get(key[0]);
        if ( ol ) {
          pName.push(ol.get('name') + (key.length > 1 ? ' ' + key[1] : ''));
        }
      }
      app.deliverAddress = pName.join(' / ');
      app.outletLocation = ol;

    }
  	
  });
  
  return View;
});


define('plugins/text!templates/menus.html',[],function () { return '\r\n<div class="content">\r\n\t<ul class="list">\r\n\t\t<% _.each(data, function(item) { %>\r\n\t\t<li><a href="#menu/<%- item.id %>">\r\n\t\t\t<%- item.name %>\r\n\t\t\t<div><%- item.desc %></div>\r\n\t\t\t<span class="chevron"></span>\r\n\t\t</a></li> <% }); %>\r\n\t</ul>\r\n\r\n</div>';});

// Filename: views/menus-view
define('views/menus-view',[
  'jquery',
  'underscore',
  'backbone',
  'plugins/text!templates/menus.html',
  'plugins/text!templates/header.html',
  'app'
], function($, _, Backbone, template, tmplHeader, app){
  var View = Backbone.View.extend({

		initialize : function() {
			_.bindAll(this, "render");
			this.listenTo(this.collection, "reset", this.render);
		},

    render: function(){
    	console.log("render:MenusView");
      var compiledTemplate = _.template( template, {data: this.collection.toJSON()} );
      // Append our compiled template to this Views "el"
      this.$el.html( compiledTemplate );

			this.renderHeader();
    },

		renderHeader : function() {
			// Using Underscore we can compile our template with data
			var compiledTemplate = _.template(tmplHeader, this.options.header || {left: _.tr('Back')});
			// Append our compiled template to this Views "el"
			if ( this.$("header") ) {
				this.$("header").remove();
			}
			this.$(".content").before(compiledTemplate);
		}
  });

  return View;

});


define('plugins/text!templates/section.html',[],function () { return '<div class="content section-view">\r\n<div class="scroller">\r\n\r\n\r\n\t<div class="content-padded">\r\n\t\t<h2 id="outlet-title"><%- data.name %></h2>\r\n    <% if ( data.description ) { %>\r\n        <div class=\'description\'><%= data.description %></div>\r\n    <% } %>\r\n\t</div>\r\n\r\n\t\t<!-- Only show offers once the menu data has loaded -->\r\n    <% if ( offers.length > 0 && (data.items || data.sections) ) { %>\r\n    <ul class="list offers">\r\n        <% _.each(offers, function(offer) { %>\r\n        <li style="border:none;">\r\n        \t<span class="coloured"><%- _.tr("Offer") %>:</span>\r\n          <strong> <%- offer.name %></strong>\r\n          <div class="description"> <%- offer.description %></div>\r\n        <% }); %>\r\n        </li>\r\n    </ul>\r\n    <% }%>\r\n\t<ul class="list items">\r\n\t<% if ( !!data.loadFailed ) { %>\r\n\t\t<li>\r\n\t\t<%- _.tr("We could not load the latest menu.") %>\r\n\t\t<div class="description"><%- _.tr("Make sure you have a network connection and try again.") %></div>\r\n\t\t<div class="button-block retry" style="padding: 5px 10px;"><%- _.tr("Retry") %></div>\r\n\t\t</li>\r\n\t<% } %>\r\n\t</ul>\r\n</div>\r\n</div>\r\n';});


define('plugins/text!templates/section-title.html',[],function () { return '\r\n<% if ( data.collapse ) { %>\r\n\t<li class="menu-item list-section-collapse" data-section-id="<%= data.id %>">\r\n\t<span class="app-icon-chevron add"></span>\r\n<% } else { %>\r\n\t<li class="list-section-section" data-section-id="<%= data.id %>">\r\n<% } %>\r\n\r\n<%= data.name %>\r\n<% if ( data.description ) { %>\r\n   <div class=\'description\'><%= data.description %></div>\r\n<% } %>\r\n\r\n</li>\r\n';});


define('plugins/text!templates/section-item.html',[],function () { return '\r\n    <a href="#section/<%= data.id %>"><%= data.name %>\r\n    <span class="chevron"></span></a>\r\n';});

// Filename: views/section-item-view
define('views/section-item-view',[
  'jquery',
  'underscore',
  'backbone',
  'plugins/text!templates/section-item.html',
  'app'
], function($, _, Backbone, template, app){
  var View = Backbone.View.extend({
  	tagName: "li",

    render: function(){
    	console.log("render:SectionItemView");
      var compiledTemplate = _.template( template, {data: this.model || {}} );
      this.$el.html( compiledTemplate );
    }

  });
  return View;
});


/*
	By Osvaldas Valutis, www.osvaldas.info
	Available for use under the MIT License
*/

;( function( $, window, document, undefined )
{
	'use strict';

	var cssTransitionSupport = function()
		{
			var s = document.body || document.documentElement, s = s.style;
			if( s.WebkitTransition == '' ) return '-webkit-';
			if( s.MozTransition == '' ) return '-moz-';
			if( s.OTransition == '' ) return '-o-';
			if( s.transition == '' ) return '';
			return false;
		},

		isCssTransitionSupport = cssTransitionSupport() === false ? false : true,

		cssTransitionTranslateX = function( element, positionX, speed )
		{
			var options = {}, prefix = cssTransitionSupport();
			options[ prefix + 'transform' ]	 = 'translateX(' + positionX + ')';
			options[ prefix + 'transition' ] = prefix + 'transform ' + speed + 's linear';
			element.css( options );
		},

		hasTouch	= ( 'ontouchstart' in window ),
		hasPointers = window.navigator.pointerEnabled || window.navigator.msPointerEnabled,
		wasTouched	= function( event )
		{
			if( hasTouch )
				return true;

			if( !hasPointers || typeof event === 'undefined' || typeof event.pointerType === 'undefined' )
				return false;

			if( typeof event.MSPOINTER_TYPE_MOUSE !== 'undefined' )
			{
				if( event.MSPOINTER_TYPE_MOUSE != event.pointerType )
					return true;
			}
			else
				if( event.pointerType != 'mouse' )
					return true;

			return false;
		};

	$.fn.imageLightbox = function( options )
	{
		var options	   = $.extend(
						 {
						 	selector:		'id="imagelightbox"',
						 	allowedTypes:	'png|jpg|jpeg|gif',
						 	animationSpeed:	250,
						 	preloadNext:	true,
						 	enableKeyboard:	true,
						 	quitOnEnd:		false,
						 	quitOnImgClick: false,
						 	quitOnDocClick: true,
						 	onStart:		false,
						 	onEnd:			false,
						 	onLoadStart:	false,
						 	onLoadEnd:		false
						 },
						 options ),

			targets		= $([]),
			target		= $(),
			image		= $(),
			imageWidth	= 0,
			imageHeight = 0,
			swipeDiff	= 0,
			inProgress	= false,

			isTargetValid = function( element )
			{
				return $( element ).prop( 'tagName' ).toLowerCase() == 'a' && ( new RegExp( '\.(' + options.allowedTypes + ')$', 'i' ) ).test( $( element ).attr( 'href' ) );
			},

			setImage = function()
			{
				if( !image.length ) return true;

				var screenWidth	 = $( window ).width() * 0.8,
					screenHeight = $( window ).height() * 0.9,
					tmpImage 	 = new Image();

				tmpImage.src	= image.attr( 'src' );
				tmpImage.onload = function()
				{
					imageWidth	 = tmpImage.width;
					imageHeight	 = tmpImage.height;

					if( imageWidth > screenWidth || imageHeight > screenHeight )
					{
						var ratio	 = imageWidth / imageHeight > screenWidth / screenHeight ? imageWidth / screenWidth : imageHeight / screenHeight;
						imageWidth	/= ratio;
						imageHeight	/= ratio;
					}

					image.css(
					{
						'width':  imageWidth + 'px',
						'height': imageHeight + 'px',
						'top':    ( $( window ).height() - imageHeight ) / 2 + 'px',
						'left':   ( $( window ).width() - imageWidth ) / 2 + 'px'
					});
				};
			},

			loadImage = function( direction )
			{
				if( inProgress ) return false;

				direction = typeof direction === 'undefined' ? false : direction == 'left' ? 1 : -1;

				if( image.length )
				{
					if( direction !== false && ( targets.length < 2 || ( options.quitOnEnd === true && ( ( direction === -1 && targets.index( target ) == 0 ) || ( direction === 1 && targets.index( target ) == targets.length - 1 ) ) ) ) )
					{
						quitLightbox();
						return false;
					}
					var params = { 'opacity': 0 };
					if( isCssTransitionSupport ) cssTransitionTranslateX( image, ( 100 * direction ) - swipeDiff + 'px', options.animationSpeed / 1000 );
					else params.left = parseInt( image.css( 'left' ) ) + 100 * direction + 'px';
					image.animate( params, options.animationSpeed, function(){ removeImage(); });
					swipeDiff = 0;
				}

				inProgress = true;
				if( options.onLoadStart !== false ) options.onLoadStart();

				setTimeout( function()
				{

					var img = new Image()
					img.src = target.attr( 'href' );

					image = $( '<img ' + options.selector + ' />' )
					.attr( 'src', target.attr( 'href' ) )					

					img.onload = function(){
						image.appendTo( 'body' );
						setImage();

						var params = { 'opacity': 1 };

						image.css( 'opacity', 0 );
						if( isCssTransitionSupport )
						{
							cssTransitionTranslateX( image, -100 * direction + 'px', 0 );
							setTimeout( function(){ cssTransitionTranslateX( image, 0 + 'px', options.animationSpeed / 1000 ) }, 50 );
						}
						else
						{
							var imagePosLeft = parseInt( image.css( 'left' ) );
							params.left = imagePosLeft + 'px';
							image.css( 'left', imagePosLeft - 100 * direction + 'px' );
						}

						image.animate( params, options.animationSpeed, function()
						{
							inProgress = false;
							if( options.onLoadEnd !== false ) options.onLoadEnd();
						});
						if( options.preloadNext )
						{
							var nextTarget = targets.eq( targets.index( target ) + 1 );
							if( !nextTarget.length ) nextTarget = targets.eq( 0 );
							$( '<img />' ).attr( 'src', nextTarget.attr( 'href' ) ).load();
						}
					};

					img.onerror = function(){
						if( options.onLoadEnd !== false ) options.onLoadEnd();
					}

					var swipeStart	 = 0,
						swipeEnd	 = 0,
						imagePosLeft = 0;

					image.on( hasPointers ? 'pointerup MSPointerUp' : 'click', function( e )
					{
						e.preventDefault();
						if( options.quitOnImgClick )
						{
							quitLightbox();
							return false;
						}
						if( wasTouched( e.originalEvent ) ) return true;
					    var posX = ( e.pageX || e.originalEvent.pageX ) - e.target.offsetLeft;
						target = targets.eq( targets.index( target ) - ( imageWidth / 2 > posX ? 1 : -1 ) );
						if( !target.length ) target = targets.eq( imageWidth / 2 > posX ? targets.length : 0 );
						loadImage( imageWidth / 2 > posX ? 'left' : 'right' );
					})
					.on( 'touchstart pointerdown MSPointerDown', function( e )
					{
						if( !wasTouched( e.originalEvent ) || options.quitOnImgClick ) return true;
						if( isCssTransitionSupport ) imagePosLeft = parseInt( image.css( 'left' ) );
						swipeStart = e.originalEvent.pageX || e.originalEvent.touches[ 0 ].pageX;
					})
					.on( 'touchmove pointermove MSPointerMove', function( e )
					{
						if( !wasTouched( e.originalEvent ) || options.quitOnImgClick ) return true;
						e.preventDefault();
						swipeEnd = e.originalEvent.pageX || e.originalEvent.touches[ 0 ].pageX;
						swipeDiff = swipeStart - swipeEnd;
						if( isCssTransitionSupport ) cssTransitionTranslateX( image, -swipeDiff + 'px', 0 );
						else image.css( 'left', imagePosLeft - swipeDiff + 'px' );
					})
					.on( 'touchend touchcancel pointerup pointercancel MSPointerUp MSPointerCancel', function( e )
					{
						if( !wasTouched( e.originalEvent ) || options.quitOnImgClick ) return true;
						if( Math.abs( swipeDiff ) > 50 )
						{
							target = targets.eq( targets.index( target ) - ( swipeDiff < 0 ? 1 : -1 ) );
							if( !target.length ) target = targets.eq( swipeDiff < 0 ? targets.length : 0 );
							loadImage( swipeDiff > 0 ? 'right' : 'left' );	
						}
						else
						{
							if( isCssTransitionSupport ) cssTransitionTranslateX( image, 0 + 'px', options.animationSpeed / 1000 );
							else image.animate({ 'left': imagePosLeft + 'px' }, options.animationSpeed / 2 );
						}
					});

				}, options.animationSpeed + 100 );
			},

			removeImage = function()
			{
				if( !image.length ) return false;
				image.remove();
				image = $();
			},

			quitLightbox = function()
			{
				if( !image.length ) {
					if( options.onEnd !== false ) options.onEnd();
					return false;
				}
				image.animate({ 'opacity': 0 }, options.animationSpeed, function()
				{
					removeImage();
					inProgress = false;
					if( options.onEnd !== false ) options.onEnd();
				});
			};

		$( window ).on( 'resize', setImage );

		if( options.quitOnDocClick )
		{
			$( document ).on( hasTouch ? 'touchend' : 'click', function( e )
			{
				if( image.length && !$( e.target ).is( image ) ) quitLightbox();
			})
		}

		if( options.enableKeyboard )
		{
			$( document ).on( 'keyup', function( e )
			{
				if( !image.length ) return true;
				e.preventDefault();
				if( e.keyCode == 27 ) quitLightbox();
				if( e.keyCode == 37 || e.keyCode == 39 )
				{
					target = targets.eq( targets.index( target ) - ( e.keyCode == 37 ? 1 : -1 ) );
					if( !target.length ) target = targets.eq( e.keyCode == 37 ? targets.length : 0 );
					loadImage( e.keyCode == 37 ? 'left' : 'right' );
				}
			});
		}
		
		$( this.selector ).on( 'click', function( e )
		{
			if( !isTargetValid( this ) ) {
				return true;
			}
			e.preventDefault();
			if( inProgress ) { 
				return false;
			}
			inProgress = false;
			if( options.onStart !== false ) {
				options.onStart();
			}

			target = $( this );
			loadImage();
		});

		this.each( function()
		{
			if( !isTargetValid( this ) ) return true;
			targets = targets.add( $( this ) );
		});

		this.switchImageLightbox = function( index )
		{
			var tmpTarget = targets.eq( index );
			if( tmpTarget.length )
			{
				var currentIndex = targets.index( target );
				target = tmpTarget;
				loadImage( index < currentIndex ? 'left' : 'right' );
			}
			return this;
		};

		this.quitImageLightbox = function()
		{
			quitLightbox();
			return this;
		};

		return this;
	};
})( window.$, window, document );
define("libs/imagelightbox", function(){});


define('plugins/text!templates/menu-item.html',[],function () { return '\r\n\r\n<% if ( hasMods || isExternal ) { %>\t\r\n<div class="content-item">\r\n\t<span class="app-icon-chevron add"></span>\r\n\r\n\t<% if ( basketCount > 0 ) { %>\r\n\t\r\n\t\t<span class="asdcounter button"><%- basketCount %></span>\r\n\t\t<span class="app-icon-edit edit"></span>\r\n\t<% } %>\r\n\t\r\n\t<div class="description"><strong><%- item.name %></strong><% if ( item.description ) { %><br><%- item.description %> <% } %></div>\r\n\t\r\n\t<div class="content-info">\r\n\t\t<% if ( minPrice > 0 ) { %>\r\n\t\t<p>From: <%- format.price(minPrice) %></p>\r\n\t\t<% } %>\r\n\r\n\t\t<% if ( item.images && item.images.length ) { %>\r\n\t\t<span class="icon-images viewGallery"></span>\r\n\t\t<ul class="list-image-item">\r\n\t\t<% _.each(item.images, function(image) { %> \r\n\t\t    <li><a href="<%- window.$settings.cdnRoot + image.image %>" class="imageItem" data-imagelightbox="<%- item.id %>"><%- item.name %></a></li>\r\n\t\t<% }); %>\r\n\t\t</ul>\r\n\t\t<% } %>\r\n\t</div>\r\n</div>\r\n<!-- \t<span class="price"><span class="from">from</span><%- format.price(minPrice) %></span> -->\r\n<% } else if ( hasMeals ) { %>\t\r\n<div class="content-item">\r\n\t<span class="app-icon-chevron add"></span>\r\n\r\n\t<% if ( basketCount > 0 ) { %>\r\n\t\r\n\t\t<span class="asdcounter button"><%- basketCount %></span>\r\n\t\t<span class="app-icon-edit edit"></span>\r\n\t<% } %>\r\n\t\r\n\t<div class="description"><strong><span class="coloured"><%- _.tr("Meal Deal") %>:</span> <%- item.name %></strong><% if ( item.description ) { %><br><%- item.description %> <% } %></div>\r\n\r\n\t<div class="content-info">\r\n\t\t<p>From: <%- format.price(minPrice) %></p>\r\n\r\n\t\t<% if ( item.images && item.images.length ) { %>\r\n\t\t<span class="icon-images viewGallery"></span>\r\n\t\t<ul class="list-image-item">\r\n\t\t<% _.each(item.images, function(image) { %> \r\n\t\t    <li><a href="<%- window.$settings.cdnRoot + image.image %>" class="imageItem" data-imagelightbox="<%- item.id %>"><%- item.name %></a></li>\r\n\t\t<% }); %>\r\n\t\t</ul>\r\n\t\t<% } %>\r\n\t</div>\r\n</div>\r\n\r\n<% } else { %>\t\r\n<div class="content-item">\r\n\t<span class="app-icon-add add"></span>\r\n\r\n\t<div class="basket-items"></div>\r\n\t<strong><%- item.name %></strong>\r\n\t<div class="description"><%- item.description %></div>\r\n\t<div class="content-info">\r\n\t\t<p><%- format.price(item.price) %> </p>\r\n\t\t<% if ( item.images && item.images.length ) { %>\r\n\t\t<span class="icon-images viewGallery"></span>\r\n\t\t<ul class="list-image-item">\r\n\t\t<% _.each(item.images, function(image) { %> \r\n\t\t    <li><a href="<%- window.$settings.cdnRoot + image.image %>" class="imageItem" data-imagelightbox="<%- item.id %>"><%- item.name %></a></li>\r\n\t\t<% }); %>\r\n\t\t</ul>\r\n\t\t<% } %>\t\r\n\t</div>\r\n</div>\r\n\t\r\n\t\r\n<!-- \t<span class="price"><%- format.price(item.price) %></span> -->\r\n\r\n<% } %>\r\n\r\n<!-- \t<div class="description"><%- item.description %></div> -->\r\n\t\r\n\t\r\n<% if ( expand ) { %>\t\r\n\t</a>\r\n<% } %>\r\n';});


define('plugins/text!templates/basket-item.html',[],function () { return '\r\n<% if ( data.editable ) { %>\r\n\t<% if ( !data.external ) { %>\r\n\t<span class="app-icon-add add"></span>\r\n\t<% } %>\r\n\r\n\t<span class="badge edit"><%- _.tr("Change") %></span>\r\n\r\n\t<div><%- data.item.name %></div>\r\n\t<div class="description"><%- data.modsDescription %></div>\r\n\t<div><%- format.price(data.price) %></div>\r\n\r\n<% } %>\r\n\r\n<% if ( !data.external ) { %>\r\n\t<span class="app-icon-remove remove"></span>\r\n<% } %>\r\n\r\n<span class="asdcounter"><%- data.count %></span>\r\n';});

// Filename: views/basket-item-view
define('views/basket-item-view',[
  'jquery',
  'underscore',
  'backbone',
  'plugins/text!templates/basket-item.html',
  'app'
], function($, _, Backbone, template, app){
  var View = Backbone.View.extend({
  	tagName: "div",
  	className: "basket-item",
		events : {
			"tap .remove" : "clickRemove",
			"tap .edit" : "clickEdit",
			"tap .add" : "clickAdd"
		},
		initialize : function() {
			_.bindAll(this, "render");
			this.listenTo(this.model, "change", this.render);
			this.listenTo(this.model, "remove", this.remove);
		},

		clickAdd : function(e) {
			e.preventDefault();
	  	e.stopPropagation();
			this.model.incr();
		},
  	
		clickRemove: function(e) {
			e.preventDefault();
	  	e.stopPropagation();
			app.basket.removeItem(this.model);

			if(this.$el.find('.asdcounter').text()=="0"){
				this.$el.parents('li').removeClass('list-selected');
			}

		},
		
		clickEdit: function(e) {
			e.preventDefault();
	  	e.stopPropagation();
	  	
	  	app.editBasketItem(this.model);			
		},
		
    render: function(){
    	console.log("render:BasketItemView");
    	var data = this.model && this.model.toJSON() || {};
    	data.editable = this.options.editable;
    	data.external = data.item.external;

      var compiledTemplate = _.template( template, {data: data, format: app.templateHelper.format} );
      
      if ( !this._rendered ) {
      	console.log("BasketItem:First render");
      	this._rendered = true;

      	// if it's new fade it in
        this.$el.css({"opacity": 0});
	      this.$el.animate({"opacity": 1}, {
					duration: "slow"
				});

				app.trigger('basket-item:render', {el: this.el, model: this.model});
      }
      
      this.$el.html( compiledTemplate );
      
    },
		
		remove: function() {
			var that = this;
			this.$el.animate({"opacity": 0});
			setTimeout(function() {
				Backbone.View.prototype.remove.call(that, arguments);
			}, 400);
			
		}
  	
  });
  
  return View;
});


define('plugins/text!templates/modifier-item.html',[],function () { return '\t<span class="button add"> + </span>\r\n\t<span class="price"><%- format.price(modifier.price) %></span>\r\n\t<span><%- modifier.name %></span>\r\n\t<div class="description"><%- modifier.description %></div>\r\n\t<div class="basket-items"></div>\r\n';});

// Filename: views/modifier-item-view
define('views/modifier-item-view',[
  'jquery',
  'underscore',
  'backbone',
  'plugins/text!templates/modifier-item.html',
  'views/basket-item-view',
  'app'
], function($, _, Backbone, template, BasketItemView, app){
	var MenuItemView = Backbone.View.extend({
		tagName : "li"
	});
	
	_.extend(MenuItemView.prototype, {
		events : {
			"tap .add" : "clickAdd"
		},

		initialize : function() {
			_.bindAll(this, "render");
			this.initChildViewStorage();
		},
		
		initChildViewStorage: function() {
			this._children = new Backbone.ChildViewContainer();
		},

		clickAdd : function(e) {
			e.preventDefault();
	  	e.stopPropagation();
			app.addToBasket(this.model.get("item"), this.model.get("mods"));
		},
		
		attr : function(model) {
			return model ? model.toJSON() : null;
		},

		render : function() {
			console.log("render:ModifierItemView");
			var data = {
				item : this.attr(this.model.get('item')) || {},
				modifier : this.model.get('mods')[0],
				format: app.templateHelper.format
			};
			
			var compiledTemplate = _.template(template, data);
			this.$el.html(compiledTemplate);
			
			// add the basket items
			var item = this.model && app.basket.getBasketItem(this.model.get("item"), this.model.get("mods"));
			if (item) this.renderBasketItem(item);
			
		},
		
		renderBasketItem : function(model) {
			var view = new BasketItemView({
				model : model
			});
			this._children.add(view);
			this.$(".basket-items").append(view.el);
			view.render();
    	
		},
		
		remove: function(animate) {
			this._children.apply("remove");
			this.initChildViewStorage();
			
			if ( animate ) {
				var that = this;
				this.$el.animate({"opacity": 0});
				setTimeout(function() {
					console.log("anim complete");
					Backbone.View.prototype.remove.call(that, arguments);
				}, 400);
			} else {
				return Backbone.View.prototype.remove.apply(this, arguments);
			}
		}

	});

	return MenuItemView;
});

// Filename: models/basket-item
define('models/basket-item',[ "underscore", "backbone" ], function(_, Backbone) {

	var Model = Backbone.Model.extend({
		defaults: {
			count: 1
		},
		incr : function(count) {
			var cnt = this.get("count") + (count || 1);
			this.set('count',cnt);
			
			return cnt;
		},

		decr : function() {
			var cnt = this.get("count") - 1;
			if ( cnt < 0 ) cnt = 0;
			
			this.set('count',cnt);

			return cnt;
		},
		
		getPrice: function() {
			return (this.get('count') || 0) * this.getItemPrice();
		},
		
		getItemPrice: function() {
			var item = this.get('item'),
					mods = this.get('mods') || [],
					price = item.get('price') || 0;
			
			// add the mods
			return _.reduce(mods, function(memo, mod) {
				return memo + (mod.price || 0);
			}, price);
			
		},
		
		equal : function(other) {
			var otherItem = other && other.get("item"),
					otherMods = other && other.get("mods") || [];
			
			return this.match(otherItem, otherMods);
		},
		
		match : function(otherItem, otherMods) {
			var myItem = this.get("item"),
					myMods = this.get("mods") || [],
					equal = false;

			equal = otherItem && otherItem.get("id") === myItem.get("id");
			equal = equal && otherItem.get("plu") === myItem.get("plu");
			equal = equal && (otherMods || []).length === myMods.length;
			equal = equal && _.difference(myMods, otherMods).length == 0;

			return equal;
		},

		getDescription : function() {
			var item = this.get("item"),
					desc = item && item.get("name"),
					mods = this.getModsDescription();
			
			return desc + ( mods.length ? " - " + mods : "" ); 
		},
		
		getModsDescription : function() {
			// add options
			var modNames = _.map(this.get("mods") || [], function(mod) {
				return mod.name;
			});

			return modNames.join(", ");
		},
		
	  get: function (attr) {
	    if ( attr == 'price' ) {
	      return this.getPrice();
	    } else if ( attr == 'itemPrice' ) {
	    	return this.getItemPrice();
	    }
	    return Backbone.Model.prototype.get.apply(this, arguments);
	  },
		
		toJSON : function() {
			var json = Backbone.Model.prototype.toJSON.apply(this, arguments);
			json.item = json.item && json.item.toJSON();
			json.description = this.getDescription();
			json.modsDescription = this.getModsDescription();
			json.itemPrice = this.getItemPrice();
			json.price = json.itemPrice * (this.get('count') || 0);
			
			return json;
		},
		
		// return json for an order
		// strip out everything except id's
		// unless external item
		toOrderJSON : function() {
			var item = this.get('item'),
				mods = this.get('mods') || false,
				json = {i: item.get('id'), q: this.get('count')};

			if ( !item.get('external') ) {			
				if ( mods ) {
					json[item.get('mealDeal') ? 'md': 'm'] = _.pluck(mods, "id");
				}
			} else {
				// Add the overrides
				json.plu = item.get('plu');
				json.n = item.get('name');
				json.p = this.getItemPrice() * (this.get('count') || 0);
		
				if ( mods ) {
					var modJson = [];
					_.each(mods, function(modItem) {
						modJson.push({
							i: modItem.id,
							n: modItem.name,
							p: modItem.price
						});
					});

					json[item.get('mealDeal') ? 'md': 'm'] = modJson;
				}
			}
			
			return json;
		}
	});

	return Model;
});

// Filename: views/menu-item-view
define('views/menu-item-view',[
  'jquery',
  'underscore',
  'backbone',
  'libs/imagelightbox',
  'plugins/text!templates/menu-item.html',
  'views/basket-item-view',
  'views/modifier-item-view',
  'models/basket-item',
  'app'
], function($, _, Backbone, imagelightbox, template, BasketItemView, ModifierItemView, BasketItem, app){
	var MenuItemView = Backbone.View.extend({
		tagName : "li",
		className : "menu-item"
	});
	
	_.extend(MenuItemView.prototype, {
		events : {
			"tap .add" : "clickAdd",
			"tap .edit": "clickChange",
			"tap a": "click",
			"tap .content-item": "clickItem"
		},

		initialize : function(options) {
			_.bindAll(this, "render");
			this.listenTo(this.model, "basket:add", this.basketItemAdd);
			this.listenTo(this.model, "basket:remove", this.basketItemRemove);
			this.initChildViewStorage();
			
			if ( options.expand ) this.$el.addClass('open');
		},
		
		initChildViewStorage: function() {
			this._children = new Backbone.ChildViewContainer();
		},
		
		click : function(e) {
			e.preventDefault();
	  		e.stopPropagation();
			if ( this.model.hasSingleMod() ) {
				// expand the list
				this.$el.toggleClass("open");
				app.trigger('menu-item:toggle', {el: this.el, model: this.model});
			}
		},

		clickAdd : function(e) {
			e.preventDefault();
	  		e.stopPropagation();
			app.addToBasket(this.model);
		},

		clickItem : function(e) {
			e.preventDefault();
	  		e.stopPropagation();
	  		
	  		var $target = $(e.target);
			
			if ( !$target.is('.add') && !$target.is('.remove') && !$target.is('.basket-items') ) {
				this.$el.find('.imageItem').eq(0).trigger('click');
			}
		},
		
		clickChange : function(e) {
			e.preventDefault();
		  	e.stopPropagation();

			if ( this.model.get('external') > 0 ) {
				app.editExternalItem(this.model);
			} else if ( !this.model.get('mealDeal') ) {
				app.editItemSelectedModifers(this.model);
			} else {
				app.editItemSelectedMealdeals(this.model);
			}

			
		},
		
		attr : function(model) {
			return model ? model.toJSON() : null;
		},

		render : function() {
			console.log("render:MenuItemView");
			var data = {
				item : this.attr(this.model) || {},
				expand : this.model.hasSingleMod(),
				isExternal: !!this.model.get('external'),
				hasMods : (this.model.get('modifiers') || []).length,
				hasMeals : !!this.model.get('mealDeal'),
				minPrice : this.model.getMinPrice(),
				format: app.templateHelper.format
			};		
			
			
			var items = this.model && app.basket.findForMenuItem(this.model),
					itemCount = _.reduce(items, function(cnt, item) {
						return cnt + item.get('count');
					}, 0);
					
			data.basketCount = itemCount;

			if ( data.basketCount > 0 ) {
	  		this.$el.addClass('list-selected');
			}	else {
				this.$el.removeClass('list-selected');
			}
			var compiledTemplate = _.template(template, data);
			this.$el.html(compiledTemplate);

			
			if ( !data.hasMods && !data.hasMeals ) {
				// add the basket items
				_.forEach(items, this.renderBasketItem, this);
			}

			var instance = this.$el.find('.imageItem').imageLightbox(
			{
				quitOnDocClick:	false,
				onStart:        function(){
					$( '<button type="button" id="imagelightbox-close" title="Close"></button>' ).appendTo( 'body' ).on( 'click touchend', function(){ $( this ).remove(); instance.quitImageLightbox(); return false; });					
					$( '<div id="imagelightbox-overlay"></div>' ).appendTo( 'body' );
				},				
				onEnd:	 		function() { 
					$( '#imagelightbox-close' ).remove();
					$( '#imagelightbox-overlay' ).remove();
					$( '#imagelightbox-loading' ).remove();
				},				
				onLoadStart:	function() { 
					$( '<div id="imagelightbox-loading" class="spinner"><div class="wrap"><div class="inner"></div></div></div>' ).appendTo( 'body' );
				},
				onLoadEnd:		function() { 
					$( '#imagelightbox-loading' ).remove();
				}
			});	
			
			/*
			if ( this.model.hasSingleMod() ) {
				this.renderModifiers();
			} else {
				// add the basket items
				var items = this.model && app.basket.findForMenuItem(this.model);
				_.forEach(items, this.renderBasketItem, this);
			}
			*/
			
		},
		
		renderModifiers : function() {
			var mods = this.model.get("modifiers")[0].items;
			this.$(".basket-items").html("<ul class=\"modifiers\"></ul>");
			_.forEach(mods, function(mod) {
				var view = new ModifierItemView({
					model: new BasketItem({
						mods: [mod],
						item: this.model
					})
				});
				this._children.add(view);
				this.$(".basket-items ul").append(view.el);
				view.render();
				
			}, this);
		},
		
		renderBasketItem : function(model) {
			var view = new BasketItemView({
				model : model,
				editable : (this.model.get('modifiers') || []).length && !this.model.hasSingleMod()
			});
			this._children.add(view);
			this.$(".basket-items").append(view.el);
			view.render();
    	
		},
		
		remove: function(animate) {
			this._children.apply("remove");
			this.initChildViewStorage();
			
			if ( animate ) {
				var that = this;
				this.$el.animate({"opacity": 0});
				setTimeout(function() {
					console.log("anim complete");
					Backbone.View.prototype.remove.call(that, arguments);
				}, 400);
			} else {
				return Backbone.View.prototype.remove.apply(this, arguments);
			}
		},

		basketItemAdd: function(basketItem) {
			if ( (this.model.get('modifiers') || []).length || this.model.get('mealDeal') || this.model.get('external') ) {
				this.listenTo(basketItem, "change", this.render);
			}
			this.render();
		},

		basketItemRemove: function(basketItem) {
			this.$el.removeClass('list-selected');
		}

	});

	return MenuItemView;
});

// Filename: models/menu-item
define('models/menu-item',[
	"underscore",
  "backbone"
], function(_, Backbone){
  var Model = Backbone.Model.extend({
  	
  	urlRoot: $settings.apiRoot + "items",
  	
  	hasSingleMod : function() {
  		var mods = this.get("modifiers") || [];
  		return mods.length == 1 && mods[0].minChoices === 1 && mods[0].maxChoices === 1;
  	},
  	
  	/** Min price relative to modifiers */
  	getMinPrice : function() {
  		var price = this.get('price') || 0,
  				mods = this.get("modifiers") || [];
  		
  		// get lowest price for required modifier
  		var modPrice = 0;
  		if ( mods.length ) {
  			var prices = _.map(mods, function(mod) {
  				var min = 0;
	  			if ( mod.minChoices > 0 ) {
	  				console.log(mod.name);
	  				min = _.min(mod.items, function(item) {
	  					return item.price || 0;
	  				}).price || 0;
	  			}
	  			
	  			return min;
	  			
	  		});
  			
  			modPrice = _.max(prices);  			
  			
  		}
  		
  		return price + (modPrice || 0);
  	}
  });
  
  // Our module now returns our view
  return Model;
});
// Filename: models/menu-item-collection
define('models/menu-item-collection',[
	"underscore",
  "backbone",
  "models/menu-item"
], function(_, Backbone, MenuItem){
  var Model = Backbone.Collection.extend({
  	model: MenuItem
  });
  
  // Our module now returns our view
  return Model;
});
// Backbone.BabySitter, v0.0.4
// Copyright (c)2012 Derick Bailey, Muted Solutions, LLC.
// Distributed under MIT license
// http://github.com/marionettejs/backbone.babysitter
(function (root, factory) {
  if (typeof exports === 'object') {

    var underscore = require('underscore');
    var backbone = require('backbone');

    module.exports = factory(underscore, backbone);

  } else if (typeof define === 'function' && define.amd) {

    define('plugins/backbone.babysitter',['underscore', 'backbone'], factory);

  } 
}(this, function (_, Backbone) {
  "option strict";

  // Backbone.ChildViewContainer
  // ---------------------------
  //
  // Provide a container to store, retrieve and
  // shut down child views.
  
  Backbone.ChildViewContainer = (function(Backbone, _){
    
    // Container Constructor
    // ---------------------
  
    var Container = function(initialViews){
      this._views = {};
      this._indexByModel = {};
      this._indexByCollection = {};
      this._indexByCustom = {};
      this._updateLength();
  
      this._addInitialViews(initialViews);
    };
  
    // Container Methods
    // -----------------
  
    _.extend(Container.prototype, {
  
      // Add a view to this container. Stores the view
      // by `cid` and makes it searchable by the model
      // and/or collection of the view. Optionally specify
      // a custom key to store an retrieve the view.
      add: function(view, customIndex){
        var viewCid = view.cid;
  
        // store the view
        this._views[viewCid] = view;
  
        // index it by model
        if (view.model){
          this._indexByModel[view.model.cid] = viewCid;
        }
  
        // index it by collection
        if (view.collection){
          this._indexByCollection[view.collection.cid] = viewCid;
        }
  
        // index by custom
        if (customIndex){
          this._indexByCustom[customIndex] = viewCid;
        }
  
        this._updateLength();
      },
  
      // Find a view by the model that was attached to
      // it. Uses the model's `cid` to find it, and
      // retrieves the view by it's `cid` from the result
      findByModel: function(model){
        var viewCid = this._indexByModel[model.cid];
        return this.findByCid(viewCid);
      },
  
      // Find a view by the collection that was attached to
      // it. Uses the collection's `cid` to find it, and
      // retrieves the view by it's `cid` from the result
      findByCollection: function(col){
        var viewCid = this._indexByCollection[col.cid];
        return this.findByCid(viewCid);
      },
  
      // Find a view by a custom indexer.
      findByCustom: function(index){
        var viewCid = this._indexByCustom[index];
        return this.findByCid(viewCid);
      },
  
      // Find by index. This is not guaranteed to be a
      // stable index.
      findByIndex: function(index){
        return _.values(this._views)[index];
      },
  
      // retrieve a view by it's `cid` directly
      findByCid: function(cid){
        return this._views[cid];
      },
  
      // Remove a view
      remove: function(view){
        var viewCid = view.cid;
  
        // delete model index
        if (view.model){
          delete this._indexByModel[view.model.cid];
        }
  
        // delete collection index
        if (view.collection){
          delete this._indexByCollection[view.collection.cid];
        }
  
        // delete custom index
        var cust;
  
        for (var key in this._indexByCustom){
          if (this._indexByCustom.hasOwnProperty(key)){
            if (this._indexByCustom[key] === viewCid){
              cust = key;
              break;
            }
          }
        }
  
        if (cust){
          delete this._indexByCustom[cust];
        }
  
        // remove the view from the container
        delete this._views[viewCid];
  
        // update the length
        this._updateLength();
      },
  
      // Call a method on every view in the container,
      // passing parameters to the call method one at a
      // time, like `function.call`.
      call: function(method, args){
        args = Array.prototype.slice.call(arguments, 1);
        this.apply(method, args);
      },
  
      // Apply a method on every view in the container,
      // passing parameters to the call method one at a
      // time, like `function.apply`.
      apply: function(method, args){
        var view;
  
        // fix for IE < 9
        args = args || [];
  
        _.each(this._views, function(view, key){
          if (_.isFunction(view[method])){
            view[method].apply(view, args);
          }
        });
  
      },
  
      // Update the `.length` attribute on this container
      _updateLength: function(){
        this.length = _.size(this._views);
      },
  
      // set up an initial list of views
      _addInitialViews: function(views){
        if (!views){ return; }
  
        var view, i,
            length = views.length;
  
        for (i=0; i<length; i++){
          view = views[i];
          this.add(view);
        }
      }
    });
  
    // Borrowing this code from Backbone.Collection:
    // http://backbonejs.org/docs/backbone.html#section-106
    //
    // Mix in methods from Underscore, for iteration, and other
    // collection related features.
    var methods = ['forEach', 'each', 'map', 'find', 'detect', 'filter', 
      'select', 'reject', 'every', 'all', 'some', 'any', 'include', 
      'contains', 'invoke', 'toArray', 'first', 'initial', 'rest', 
      'last', 'without', 'isEmpty', 'pluck'];
  
    _.each(methods, function(method) {
      Container.prototype[method] = function() {
        var views = _.values(this._views);
        var args = [views].concat(_.toArray(arguments));
        return _[method].apply(_, args);
      };
    });
  
    // return the public API
    return Container;
  })(Backbone, _);
  
  return Backbone.ChildViewContainer; 

}));

// Filename: views/home-view
define('views/section-view',[
  'jquery',
  'underscore',
  'backbone',
  'app',
  'plugins/text!templates/section.html',
  'plugins/text!templates/section-title.html',
  'plugins/text!templates/header.html',
  'views/section-item-view',
  'views/menu-item-view',
  "models/menu-item-collection",
  "plugins/backbone.babysitter"
], function($, _, Backbone, app, template, tmplTitle, tmplHeader, SectionItemView, MenuItemView, MenuItemCollection){
	  var View = Backbone.View.extend({

		destructionPolicy : 'neverPush',

		initialize: function() {
			if ( this.model && this.model instanceof Backbone.Model ) {
				this.listenTo(this.model, "change", this.render, this);
			}

			this.listenTo(app.basket, "all", this.renderHeader, this);
			this.initChildViewStorage();

		},

  	events: {
    	'tap .retry': 'retry',
    	'tap .list-section-collapse .add': 'sectionTap'

  	},

		initChildViewStorage: function() {
			this._children = new Backbone.ChildViewContainer();
		},

		render : function() {
			console.log("render:SectionView");

			// Filter the offers to only those that are visible
			var offers = this.options.offers && this.options.offers.toJSON() || [],
					offers = _.filter(offers, function(offer) {
						return offer.visible !== 0;
					});


			var data = {
				data : this.model && this.model instanceof Backbone.Model ? this.model.toJSON() : this.model || {},
				offers: offers,
				basket : app.basket
			};

			var compiledTemplate = _.template(template, data);
			this.$el.html(compiledTemplate);

			this.renderHeader();

			var items = new MenuItemCollection(data.data.items);
			var cats = data.data.sections;
			items && items.forEach(this.renderItem, this);
			cats && cats.forEach(this.renderSection, this);
		},

		renderHeader : function() {
			var compiledTemplate = _.template(tmplHeader, _.extend(this.options.header || {left: _.tr("Menu"), basket: app.basket}, {
        message: app.messages()
			}));
			if ( this.$("header") ) {
				this.$("header").remove();
			}
			this.$(".content").before(compiledTemplate);
		},

		renderSection : function(model) {
			// only render if we have children
			if ( _.isEmpty(model.sections) && _.isEmpty(model.items) ) return;

			this.$(".items").append(_.template(tmplTitle, {data: model}));
			if ( !model.collapse ) {
				// render child sections
				_.forEach(model.sections, function(cat) {
					var view = new SectionItemView({
						model : cat
					});

					this._children.add(view);
					view.render();
					this.$(".items").append(view.el);
				}, this);

				// render items
				new MenuItemCollection(model.items).forEach(this.renderItem, this);
			}
		},

		renderItem : function(model) {
			// Don't render items that are not visible
      if ( !_.isUndefined(model.get("visible")) && !model.get("visible")) return;

			var view = new MenuItemView({
				model : model
			});
			this._children.add(view);
			view.render();
			this.$(".items").append(view.el);
		},

		remove: function() {
			this._children.apply("remove");
			this.initChildViewStorage();

			return Backbone.View.prototype.remove.apply(this, arguments);
		},




		retry: function() {
			if ( this.model.load ) this.model.load();
		},
		sectionTap: function(e) {
			e.preventDefault();
            e.stopPropagation();
			var section = $(e.currentTarget).parent('li').data("section-id");
			app.router.navigate("section/" + section, true);
		}

	});

	return View;
});


define('plugins/text!templates/basket.html',[],function () { return '<div class="content">\r\n\t<div class="scroller with-input">\r\n\t\t<div class="content-padded">\r\n\t\t\t<h2 id="basket-title"><%- _.tr("Order Summary") %></h2>\r\n\r\n      <!-- If \'deliverable\' is allowed, show the toggle button to expose the choice to the user -->\r\n      <% if ( deliverable ) { %>\r\n\t\t\t\t<ul class="segmented-controller">\r\n\t\t\t\t\t<li class="<%- deliveryState ? "" : "active"%>">\r\n\t\t\t\t\t\t<a data-type="PICKUP"><%- _.tr("Collection") %></a>\r\n\t\t\t\t\t</li>\r\n\t\t\t\t\t<li class="<%- deliveryState ? "active" : "" %>">\r\n\t\t\t\t\t\t<a data-type="DELIVERY"><%- _.tr("Delivery") %></a>\r\n\t\t\t\t\t</li>\r\n\t\t\t\t</ul>\r\n\t\t\t\t<% if ( venue && venue.settings && venue.settings.deliveryZone ) { %>\r\n\t\t\t\t\t<div class="delivery-area" style="display: <%= deliveryState ? \'block\' : \'none\' %>">\r\n\t\t\t\t\t\t<%- _.tr("Delivery Area") %>: <%- venue.settings.deliveryZone %>\r\n\t\t\t\t\t</div>\r\n      \t<%}%>\r\n\t\t\t<%}%>\r\n\r\n\t\t</div>\r\n\r\n\r\n        <!-- If the loading has failed, do not show the general basket -->\r\n<% if ( loadFailed ) { %>\r\n\t<div style="margin: 20px; text-align: center;"><%- _.tr("Could not load basket. Please make sure you have a network connection and try again.") %></div>\r\n<% } else { %>\r\n\r\n\t<ul class="list">\r\n\t<% if ( event ) { %>\r\n\r\n\t\t<li class="list-section-section"><%- _.tr("Event") %></li>\r\n\t\t<li>\r\n\t\t\t<strong><%- event.name %></strong>\r\n\t\t\t<p><%= format.eventDateBasket(event.date) %></p>\r\n\t\t</li>\r\n\r\n\t<% } %>\r\n\r\n\t\t\t<li class="list-section-section" id="basket-subtitle"><%- _.tr("Order") %></li>\r\n\t\t\t\r\n<% _.each(items, function(item) { %>\r\n\t<li>\r\n\t\t\t\t\t<strong class="basket-order-itemname"><%- item.description %></strong>\r\n\t\t\t\t\t<p class="basket-order-itemprice"><%- format.price(item.price) %></p>\r\n\t\t\t\t\t<span class="asdcounter small single basket-order-itemtotal"><%- item.count %></span>\r\n\t\t\t \t</li>\r\n\t\t\t<% }); %>\r\n\r\n\t\t\t<% if ( deliveryState ) { %>\r\n\t\t\t<!-- Minimum Delivery Value Text -->\r\n\t\t\t<!-- Conditional: show if total order value is less than the minimum order value set by the venue -->\r\n\t\t\t\t<% if ( deliveryDifference > 0 ) { %>\r\n\t\t\t\t\t<div class="basket-minimum-delivery-order-text content-padded">\r\n\t\t\t\t\t\t<p class="text-error"><%- _.tr("Add %s to meet the minimum delivery order value", [format.price(deliveryDifference)]) %></p>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t<% } %>\r\n\r\n\t\t\t<% } else if ( orderDifference > 0 ) { %>\r\n\t\t\t\t<div class="basket-minimum-order-text content-padded">\r\n\t\t\t\t\t<p class="text-error"><%- _.tr("Add %s to meet the minimum collection order value", [format.price(orderDifference)]) %></p>\r\n\t\t\t\t</div>\r\n<% } %>\r\n\r\n<% if ( discounts && discounts.length ) { %>\r\n\t<li class="list-section-section clear"><%- _.tr("Discounts") %></li>\r\n\t<% _.each(discounts, function(discount) { %>\r\n    <li class=\'offer\'>\r\n        <strong> <%- discount.name %></strong>\r\n        <p>- <%- format.price(discount.discount) %></p>\r\n    </li>\r\n\t<% }); %>\r\n\r\n<% } %>\r\n\r\n\t\t  <% if ( fees && fees.length > 0 ) { %>\r\n\t\t    <li class="list-section-section clear"><%- _.tr("Fees") %></li>\r\n\t\t    <% _.each(fees, function(fee) { %>\r\n\t\t\t    <li class=\'fees\'>\r\n\t\t\t        <strong> <%- fee.name %></strong>\r\n\t\t\t        <p><%- format.price(fee.amount) %></p>\r\n\t\t\t    </li>\r\n\t\t    <% }); %>\r\n\t\t  <% } %>\r\n\r\n\t<li class="list-section-section clear"><%- _.tr("Special Requests") %></li>\r\n\t<textarea class="notes" name="notes" rows="4" \r\n\t\tplaceholder="<%- _.tr(\'If you have any food allergies or special instructions for us, please use this area to let us know.\') %>"\r\n\t><%- notes %></textarea>\r\n\r\n\t</ul>\r\n\r\n\t\t<div class="content-padded">\r\n\r\n\t\t\t<a class="empty-basket button btn-grey"><%- _.tr("EMPTY BASKET") %></a>\r\n\t\t</div>\r\n\r\n<% } %>\r\n\r\n</div>\r\n</div>\r\n';});


define('plugins/text!templates/basket-edit.html',[],function () { return '<div class="bar-page-title"><%- _.tr("Order Summary") %></div>\r\n\r\n<div class="content basket-edit-view">\r\n<div class="scroller">\r\n\t<ul class="list items">\r\n\t</ul>\r\n\r\n\t<div style="margin: 5px 5px 10px 5px;">\r\n  \t<a class="button-block checkout" href="#checkout"><%- _.tr("Go to checkout") %></a>\r\n\t</div>\r\n</div>\r\n</div>';});

// Filename: views/basket-view
define('views/basket-view',[
  'jquery',
  'underscore',
  'backbone',
  'plugins/text!templates/basket.html',
  'plugins/text!templates/basket-edit.html',
  'plugins/text!templates/header.html',
  'views/menu-item-view',
  'app'
], function($, _, Backbone, template, tmplEdit, tmplHeader, MenuItemView, app){
  var View = Backbone.View.extend({

		initialize: function() {
			this.initChildViewStorage();
			this.listenTo(this.model, "remove", _.debounce(this.render, 100));
			this.listenTo(this.model, "total:change", this.render);

		},

		initChildViewStorage: function() {
			this._children = new Backbone.ChildViewContainer();
		},

  	events: {
        "tap .segmented-controller a": "toggleOrderType",
        "tap .edit": "toggle",
        "tap .empty-basket": "emptyBasket",
        "change [name=\"notes\"]": "notesChange",
        'tap a': function(e) {
            $('textarea').blur();//fixing keyboard slidedown
        },
  	},

        /**   getCostDetails
         *
         *    This function will return all the delivery and order values, as well as the total. Refactored upwards
         *    as these values are used both in the view render and the header render stages.
         *
         */
        getCostDetails: function () {
            var settings = app.store.getVenue().get('settings') || {};

            var details = _.pick(this.model.memTotal, ['fee','fees','discount','discounts','loadFailed']);

            details.total = this.model && this.model.total() || 0;

            var totalLessFees = details.total - (details.fee || 0);

            details.deliveryCharge = settings.deliveryCharge || 0;
            details.deliveryOrderMin = settings.deliveryOrderMin || 0;
            details.deliveryDifference = Math.max(0, details.deliveryOrderMin - totalLessFees);

            details.orderMin = settings.orderMin || 0;
            details.orderDifference = Math.max(0, details.orderMin - totalLessFees);

            return details;
        },

    render: function(){
    	console.log("render:BasketView - Edit " + this.edit);

    	var data = {
                deliveryState: app.deliveryState || false,
    			items: this.model ? this.model.toJSON() : {},
				venue: app.currentVenue && app.currentVenue.toJSON(),
				event: app.currentEvent || false,
                deliverable: app.currentVenue && app.currentVenue.get('deliverFlag') || false,
    			count: this.model ? this.model.count() : 0,
    			discounts: false,
    			loadFailed: false,
    			loadingTotal: this.model && this.model.loadingTotal,
    			format: app.templateHelper.format,
                ordersAvailable: app.ordersAvailable(),
                notes: $('#notes').length ? $('#notes').val() : [],
                fees: false,
    			ordersAvailable: app.ordersAvailable(),
    			notes: this.model && this.model.notes || ""
    	};
        
        _.extend(data, this.getCostDetails());

    	if ( this.edit === true ) {
    		var compiledTemplate = _.template( tmplEdit, data );
	      this.$el.html( compiledTemplate );

	      // get unique list of items in basket
	      var items = this.model.map(function(model) {
	      	return model.get('item');
	      });
	      items = _.uniq(items, false, function(bItem) {
	      	return bItem.get('id');
	      });

				_.each(items, this.renderItem, this);
    	} else {
    		var compiledTemplate = _.template( template, data );
	      this.$el.html( compiledTemplate );
    	}

			this.renderHeader();

	  	// FIXME: This shouldn't be needed. Issue is that render destroys the scroll container
	  	// Tell the app that our content changed so it resets the scroller
	  	app.trigger('content:change');
    },

		renderHeader : function() {
            /** If the current order (delivery or standard order) is below the required minimum
             *  price, we cannot show the checkout button. We use double !! to typecast null to false.*/
            var costDetails = this.getCostDetails();
            var isDelivery = !!(app.deliveryState);

            if (isDelivery){
                this.options.header.canCheckout = !(costDetails.deliveryDifference > 0);
            }else{
                this.options.header.canCheckout = !(costDetails.orderDifference > 0);
            }

            /** Now we just compile the template as per normal **/
			var compiledTemplate = _.template(tmplHeader, this.options.header || {});
			if ( this.$("header") ) {
				this.$("header").remove();
			}
			this.$(".content").before(compiledTemplate);
    },

		renderItem : function(menuItem) {
			console.log("Render basket item as menu item", menuItem);
			var view = new MenuItemView({
				model : menuItem,
				expand : true
			});
			this._children.add(view);
			this.$(".items").append(view.el);
			view.render();
		},

		removeItem: function(model) {
			// see if that was the last in the basket
			var item = model.get('item');
			if ( _.isEmpty(this.model.findForMenuItem(item)) ) {
				var view = this._children.findByModel(item);
				if ( view ) view.remove(true);
			}
		},

    toggle: function() {
    	this.edit = !this.edit;
    	this.render();
    	app.trigger('view:toggle', this);
    },

    emptyBasket: function() {
	  	this.model.removeAll();
    },

    remove: function() {
			this._children.apply("remove");
			this.initChildViewStorage();

      return Backbone.View.prototype.remove.apply(this, arguments);
        },
        toggleOrderType: function (e){
            var target = $(e.currentTarget),
                parent = target.parent('li');

            // If already active return
            if ( parent.hasClass('active') ) return;

            // Toggle active class
            $('.segmented-controller li').removeClass('active');
            parent.addClass('active');

            // Get the order type
            var type = target.data('type');
            var isDelivery = (type === "DELIVERY");

            // set app.deliveryState
            app.deliveryState = isDelivery;

            // Show/Hide delivery area text
            $('.delivery-area').toggle(isDelivery);

            var that = this;
            app.basket.checkDiscount(app.store.getVenue(), {}, type, function(){
                that.render();
            });


        },

        notesChange: function(e) {
            this.model.notes = $(e.target).val();
        }
    });

  return View;

});


define('plugins/text!templates/basket-modifiers.html',[],function () { return '<div class="bar-footer footer-basket">\r\n\t\t<p class="basket"><%- _.tr("Total") %> = <span class="price"><%= format.price(data.price) %></span></p>\r\n\t\t<a class="add-basket button altr"><%- _.tr("Done") %></a>\r\n</div>\r\n\r\n<div class="content mealdeal-view">\r\n<div class="scroller">\r\n\t<div class="content-padded">\r\n\t\t<h2><%- data.item.name %></h2>\r\n\t</div>\r\n\t\r\n\t\r\n\t<ul>\r\n\t<% _.each(data.item.modifiers, function(mod) { %>\r\n\t\t<li class="list-section-section list-section-modifier"><%- mod.description || mod.name %></li>\r\n\t\t<li class="menu-item open">\r\n\t\t<div class="basket-items">\r\n\t\t<ul class="list modifiers modifier-items-<%= mod.id %>">\r\n\t\t</ul>\r\n\t\t</div>\r\n\t\t</li>\r\n\t<% }); %>\r\n\t\r\n\t\r\n\r\n\r\n\t\r\n\t</ul>\r\n\t\r\n\t\t\r\n</div>\r\n<!-- \t<ul class="table-view"> -->\r\n<!--\r\n\t<% _.each(data.item.modifiers, function(mod) { %>\r\n\t\t<li class="table-view-cell menu-item open"><%- mod.description || mod.name %>\r\n\t\t<div class="basket-items">\r\n\t\t<ul class="table-view modifiers modifier-items-<%= mod.id %>">\r\n\t\t</ul>\r\n\t\t</div>\r\n\t\t</li>\r\n\t<% }); %>\r\n-->\r\n\t\r\n\t\r\n<!--\r\n\t\t<li class="table-view-cell">\r\n\t\tQTY:\r\n\r\n\t\t\t<span class="button qty add"> + </span>\r\n\t\t\t<input type="text" name="qty" value="<%= data.count || 1 %>"  readonly="readonly">\r\n\t\t\t<span class="button qty remove"> - </span>\r\n\t\t</li>\r\n-->\r\n\t\r\n\t\r\n<!-- \t</ul> -->\r\n\r\n</div>';});


define('plugins/text!templates/basket-modifier-item.html',[],function () { return '\r\n\t<% if ( multiple ) { %>\r\n\t<%- item.name %> <span class="price inline2 <%- selected ? "checked" : "" %>"> <%- item.price > 0 && format.price(item.price, "+ ") || \'\' %></span>\r\n\t<span class="app-icon-add-empty <%- selected ? "checked" : "" %>"></span>\r\n\t<% } else { %>\r\n\t<%- item.name %> <span class="price inline2"> <%- item.price > 0 && format.price(item.price, "+ ") || \'\' %></span>\r\n\t\t<% if ( selected ) { %>\r\n\t\t\t<span class="change app-icon-edit"></span>\r\n\t\t<% } else { %>\r\n\t\t\t<span class="app-icon-add-empty"></span>\r\n\t\t<% } %>\r\n\t<% } %>\r\n';});

// Filename: views/basket-modifier-item-view
define('views/basket-modifier-item-view',[
  'jquery',
  'underscore',
  'backbone',
  'plugins/text!templates/basket-modifier-item.html',
  'views/basket-item-view',
  'app'
], function($, _, Backbone, template, BasketModifierItemView, app){
	var View = Backbone.View.extend({
		tagName : "li",
		
		events : {
			"tap": "toggle"			
		},
		
		initialize: function() {
			this.listenTo(this.model, "change:selected", this.render);
		},
		
		toggle: function(e) {
			e.preventDefault();
	  	e.stopPropagation();
			this.model.set('selected', !this.model.get('selected'));
		},
		
		render : function() {
			console.log("render:BasketModifierItemView");
			var data = {
				item : this.model.get('item'),
				selected : this.model.get('selected'),
				multiple : this.model.get('multiple'),
				format: app.templateHelper.format
			};

			if ( !data.multiple ) {
				this.$el[data.selected ? 'addClass' : 'removeClass']('list-selected');
			}
			
			var compiledTemplate = _.template(template, data);
			this.$el.html(compiledTemplate);

		}

	});

	return View;
});

// Filename: views/basket-modifiers-view
define('views/basket-modifiers-view',[
  'jquery',
  'underscore',
  'backbone',
  'plugins/text!templates/basket-modifiers.html',
  'plugins/text!templates/header.html',
  'models/basket-item',
  'views/basket-modifier-item-view',
  'app'
], function($, _, Backbone, template, tmplHeader, BasketItem, BasketModifierItemView, app){
  var View = Backbone.View.extend({
  	
  	className: "modifier-select-view",
  	
  	events: {
  		'tap .qty.add' : 'clickIncr',
    	'tap .qty.remove' : 'clickDecr',
    	'tap .add-basket' : 'clickAddBasket'
  	},
		
  	initialize: function(options) {
  		if ( options.item && options.item instanceof BasketItem ) {
  			this.model = new BasketItem({
  				item: options.item.get('item'),
  				count: options.item.get('count'),
  				mods: (options.item.get('mods') || []).slice(),
  				update: true
  			});
  		} else {
  			this.model = new BasketItem({item: options.item});
  		}
			this.initChildViewStorage();
			
			this.listenTo(this.model, "change", function() {
				this.$('.bar-footer .price').html(app.templateHelper.format.price(this.model.getPrice()));
			}, this);
			
			this.listenTo(this.model, "change:count", function() {
				this.$('input[name="qty"]').attr('value', this.model.get('count'));
			}, this);
		},
		
		initChildViewStorage: function() {
			this._children = new Backbone.ChildViewContainer();
    },
		
		clickIncr: function(e) {
			e.preventDefault();
	  	e.stopPropagation();
			
	  	this.model.incr();
		},
		
		clickDecr: function(e) {
			e.preventDefault();
	  	e.stopPropagation();
			
	  	this.model.decr();
		},
		
		clickAddBasket: function(e) {
			e.preventDefault();
	  	e.stopPropagation();

	  	// Validate min max choices
	  	var modItems = this.model.get('mods');
	  	var menuItem = this.model.get('item');
	  	var modifiers = menuItem.get('modifiers');
	  	var valid = true;
	  	_.each(modifiers, function(modifier) {
	  		if ( modifier.minChoices > 0 || modifier.maxChoices > 0 ) {
	  			// get the selected mods for this modifier
	  			var selected = _.where(modItems, {modifierId: modifier.id});

	  			if ( modifier.minChoices > 0 && selected.length < modifier.minChoices ) {
	  				navigator.notification.alert(modifier.name + ': ' + _.tr('Please choose at least') + ' ' +  modifier.minChoices);
	  				valid = false;
	  			}

	  			if ( modifier.maxChoices > 0 && selected.length > modifier.maxChoices ) {
	  				navigator.notification.alert(modifier.name + ': ' + _.tr('You can choose at most') + ' ' +  modifier.maxChoices);
	  				valid = false;
	  			}
	  		}
	  	});

	  	if ( !valid ) return;

	  	
	  	if ( this.model.get('update') ) {
	  		this.options.item.set({
	  			count: this.model.get('count'),
	  			mods: this.model.get('mods')
	  		});

	  		if ( this.model.get('count') < 1 ) {
	  			app.basket.removeItem(this.options.item);
	  		}
	  	} else {
	  		app.basket.addItem(this.model.get('item'), this.model.get('mods'), this.model.get('count'));
	  	}
	  	window.history.back();
		},
    
		renderHeader : function() {
			// Using Underscore we can compile our template with data
			var compiledTemplate = _.template(tmplHeader, {
					left: _.tr("Cancel"),
					venue: app.currentVenue && app.currentVenue.toJSON()
				});
			// Append our compiled template to this Views "el"
			if ( this.$("header") ) {
				this.$("header").remove();
			}
			this.$(".content").before(compiledTemplate);
		},
  	
    render: function(){
    	console.log("render:BasketModifiersView");
      var compiledTemplate = _.template( template, {
      	data: this.model.toJSON(),
  			format: app.templateHelper.format
  		});
      // Append our compiled template to this Views "el"
      this.$el.html( compiledTemplate );
      
			this.renderHeader();
		
			// add the basket items
			var mod = this.model.get('item').get('modifiers');
			_.each(mod, this.renderModifierItem, this);
			
		},
		
		renderModifierItem : function(model) {
			console.log("*** Render mod item");
			var thus = this,
					multiple = model.maxChoices != 1;

			thus.$(".modifier-items-" + model.id).html("");
			_.each(model.items, function(item) {
				var itemModel = new Backbone.Model({
					id : item.id,
					item : item,
					selected : _.some(thus.model.get('mods'), function(mod) {return mod.id == item.id;}),
					modifierId: item.modifierId,	
					multiple : multiple
				});
				thus.listenTo(itemModel, "change:selected", thus.selectChange);
				var view = new BasketModifierItemView({model : itemModel});
				thus._children.add(view);
				if ( !multiple && itemModel.get('selected') ) {					
					thus.$(".modifier-items-" + model.id).addClass('list-collapse');
				}
				thus.$(".modifier-items-" + model.id).append(view.el);
				view.render();
			}, this);	  	
		},
		
		selectChange: function(model) {
			console.log("*** select change");
			var thus = this,
					modId = model.get('id');
			// if we are selected make sure it's in mod collection
			if ( model.get('selected') ) {
				// If we are not allowed multiple deselect others
				if ( !model.get('multiple') ) {
					// go through child views deselect any from same modifier
					thus._children.each(function(childView) {
						var child = childView.model;
						if ( child.get('modifierId') === model.get('modifierId') &&
										child.get('id') != modId ) {
							child.set('selected', false);
						}
					});
					thus.$(".modifier-items-" + model.get('modifierId')).addClass('list-collapse');

				}

				var mods = this.model.get('mods') || [];
				var found = _.find(mods, function(mod) {
					return mod.id == modId;
				});
				
				if ( !found ) mods.push(model.get('item'));
				this.model.trigger('change', this.model);
			} else {

				thus.$(".modifier-items-" + model.get('modifierId')).removeClass('list-collapse');
				var mods = this.model.get('mods') || [];
				mods = _.reject(mods, function(mod) {
					return mod.id == modId;
				});
			}
			
			this.model.set('mods', mods);
				
		},
		
		remove: function(animate) {
			this._children.apply("remove");
			this.initChildViewStorage();
			
			return Backbone.View.prototype.remove.apply(this, arguments);
		}

  });
  
  return View;
  
});


define('plugins/text!templates/basket-mealdeals.html',[],function () { return '<div class="bar-footer footer-basket">\r\n\t\t<p class="basket"><%- _.tr("Meal Deal") %> = <span class="price"><%= format.price(data.price) %></span></p>\r\n\t\t<a class="add-basket button altr"><%- _.tr("Done") %></a>\r\n</div>\r\n\t\t\r\n\r\n<div class="content mealdeal-view">\r\n\t<div class="scroller">\r\n\t\t<div class="content-padded">\r\n\t\t\t<h2>\r\n\t\t\t\t<%- _.tr("Meal Deal") %> \r\n\t\t\t\t<% var counter=1; _.each(data.item.mealDealSections, function(mod) { %>\r\n\t\t\t\t<span class="mealdealnm mealdeal-title-<%= mod.id %>" ><%- counter %></span> \r\n\t\t\t\t<% counter++}); %>\r\n\t\t\t</h2>\r\n\t\t</div>\r\n\t\t\r\n<ul>\r\n\t<% var counter=1; _.each(data.item.mealDealSections, function(mod) { %>\r\n\t\t<li class="list-section-section list-section-mealdeal"><span class="mealdealnm mealdeal-title-<%= mod.id %>"><%- counter %></span> <%- mod.name %></li>\r\n\t\t<li class="menu-item open">\r\n\t\t<div class="basket-items">\r\n\t\t<ul class="list mealdeals mealdeal-items-<%= mod.id %>">\r\n\t\t</ul>\r\n\t\t</div>\r\n\t\t</li>\r\n\t<% counter++}); %>\r\n</ul>\t\r\n\t\t\r\n\t\t\r\n\t\t\r\n\t</div>\r\n</div>';});


define('plugins/text!templates/basket-mealdeal-item.html',[],function () { return '\r\n\t<%- item.name %> <span class="price inline2"> <%- item.price > 0 && format.price(item.price, "+ ") || \'\' %></span>\r\n\t<% if ( multiple ) { %>\r\n\t<span class="app-icon-add-empty <%- selected ? "checked" : "" %>"></span>\r\n\t<% } else { %>\r\n\t\t<% if ( selected ) { %>\r\n\t\t\t<span class="change app-icon-edit"></span>\r\n\t\t<% } else { %>\r\n\t\t\t<span class="app-icon-add-empty"></span>\r\n\t\t<% } %>\r\n\t<% } %>\r\n';});

// Filename: views/basket-mealdeal-item-view
define('views/basket-mealdeal-item-view',[
  'jquery',
  'underscore',
  'backbone',
  'plugins/text!templates/basket-mealdeal-item.html',
  'views/basket-item-view',
  'app'
], function($, _, Backbone, template, BasketMealDealSectionItemView, app){
	var View = Backbone.View.extend({
		tagName : "li",
		
		events : {
			"tap": "toggle"			
		},
		
		initialize: function() {
			this.listenTo(this.model, "change:selected", this.render);
		},
		
		toggle: function(e) {
			e.preventDefault();
	  	e.stopPropagation();
			this.model.set('selected', !this.model.get('selected'));
		},
		
		render : function() {
			console.log("render:BasketMealDealSectionItemView");
			var data = {
				item : this.model.get('item'),
				selected : this.model.get('selected'),
				multiple : this.model.get('multiple'),
				format: app.templateHelper.format
			};

			if ( !data.multiple ) {
				this.$el[data.selected ? 'addClass' : 'removeClass']('list-selected');
			}
			
			var compiledTemplate = _.template(template, data);
			this.$el.html(compiledTemplate);

		}

	});

	return View;
});

// Filename: views/basket-mealdeals-view
define('views/basket-mealdeals-view',[
  'jquery',
  'underscore',
  'backbone',
  'plugins/text!templates/basket-mealdeals.html',
  'plugins/text!templates/header.html',
  'models/basket-item',
  'views/basket-mealdeal-item-view',
  'app'
], function($, _, Backbone, template, tmplHeader, BasketItem, BasketMealDealSectionItemView, app){
  var View = Backbone.View.extend({
  	
  	className: "mealdeal-select-view",
  	
  	events: {
  		'tap .qty.add' : 'clickIncr',
    	'tap .qty.remove' : 'clickDecr',
    	'tap .add-basket' : 'clickAddBasket'
  	},
		
  	initialize: function(options) {
  		if ( options.item && options.item instanceof BasketItem ) {
  			this.model = new BasketItem({
  				item: options.item.get('item'),
  				count: options.item.get('count'),
  				mods: (options.item.get('mods') || []).slice(),
  				update: true
  			});
  		} else {
  			this.model = new BasketItem({item: options.item});
  		}
			this.initChildViewStorage();
			
			this.listenTo(this.model, "change", function() {
				this.$('.bar-footer .price').html(app.templateHelper.format.price(this.model.getPrice()));
			}, this);
			
			this.listenTo(this.model, "change:count", function() {
				this.$('input[name="qty"]').attr('value', this.model.get('count'));
			}, this);
		},
		
		initChildViewStorage: function() {
			this._children = new Backbone.ChildViewContainer();
    },
		
		clickIncr: function(e) {
			e.preventDefault();
	  	e.stopPropagation();
			
	  	this.model.incr();
		},
		
		clickDecr: function(e) {
			e.preventDefault();
	  	e.stopPropagation();
			
	  	this.model.decr();
		},
		
		clickAddBasket: function(e) {
			e.preventDefault();
	  	e.stopPropagation();

	  	// Validate min max choices
	  	var modItems = this.model.get('mods');
	  	var menuItem = this.model.get('item');
	  	var mealDealSections = menuItem.get('mealDealSections');
	  	var valid = true;
	  	_.each(mealDealSections, function(mealDealSection) {
	  		if ( mealDealSection.minChoices > 0 || mealDealSection.maxChoices > 0 ) {
	  			// get the selected mods for this mealDealSection
	  			var selected = _.where(modItems, {sectionId: mealDealSection.id});

	  			if ( mealDealSection.minChoices > 0 && selected.length < mealDealSection.minChoices ) {
	  				navigator.notification.alert(mealDealSection.name + ': ' + _.tr('Please choose at least') + ' ' + mealDealSection.minChoices);
	  				valid = false;
	  			}

	  			if ( mealDealSection.maxChoices > 0 && selected.length > mealDealSection.maxChoices ) {
	  				navigator.notification.alert(mealDealSection.name + ': ' + _.tr('You can choose at most') + ' ' +  mealDealSection.maxChoices);
	  				valid = false;
	  			}
	  		}
	  	});

	  	if ( !valid ) return;

	  	
	  	if ( this.model.get('update') ) {
	  		this.options.item.set({
	  			count: this.model.get('count'),
	  			mods: this.model.get('mods')
	  		});

	  		if ( this.model.get('count') < 1 ) {
	  			app.basket.removeItem(this.options.item);
	  		}
	  	} else {
	  		app.basket.addItem(this.model.get('item'), this.model.get('mods'), this.model.get('count'));
	  	}
	  	window.history.back();
		},
    
		renderHeader : function() {
			// Using Underscore we can compile our template with data
			var compiledTemplate = _.template(tmplHeader, {
					left: _.tr("Cancel"),
					venue: app.currentVenue && app.currentVenue.toJSON()
				});
			// Append our compiled template to this Views "el"
			if ( this.$("header") ) {
				this.$("header").remove();
			}
			this.$(".content").before(compiledTemplate);
		},
  	
    render: function(){
    	console.log("render:BasketMealDealSectionsView");
      var compiledTemplate = _.template( template, {
      	data: this.model.toJSON(),
  			format: app.templateHelper.format
  		});
      // Append our compiled template to this Views "el"
      this.$el.html( compiledTemplate );
      
			this.renderHeader();
		
			// add the basket items
			var mod = this.model.get('item').get('mealDealSections');
			_.each(mod, this.renderMealDealSectionItem, this);
			
		},
		
		renderMealDealSectionItem : function(model) {
			var thus = this,
					multiple = model.maxChoices != 1;

			thus.$(".mealdeal-items-" + model.id).html("");
			_.each(model.items, function(item) {
				var itemModel = new Backbone.Model({
					id : item.id,
					item : item,
					selected : _.some(thus.model.get('mods'), function(mod) {return mod.id == item.id;}),
					mealDealSectionId: item.sectionId,	
					multiple : multiple
				});
				thus.listenTo(itemModel, "change:selected", thus.selectChange);
				var view = new BasketMealDealSectionItemView({model : itemModel});
				thus._children.add(view);
				if ( !multiple && itemModel.get('selected') ) {					
					thus.$(".mealdeal-items-" + model.id).addClass('list-collapse');					
					thus.$(".mealdeal-title-" + model.id).addClass('non');					
				}
								
				thus.$(".mealdeal-items-" + model.id).append(view.el);
				view.render();
			}, this);	  	
		},
		
		selectChange: function(model) {
			var thus = this,
					modId = model.get('id');
			// if we are selected make sure it's in mod collection
			if ( model.get('selected') ) {
				// If we are not allowed multiple deselect others
				if ( !model.get('multiple') ) {
					// go through child views deselect any from same mealDealSection
					thus._children.each(function(childView) {
						var child = childView.model;
						if ( child.get('mealDealSectionId') === model.get('mealDealSectionId') &&
										child.get('id') != modId ) {
							child.set('selected', false);
						}
					});
					thus.$(".mealdeal-items-" + model.get('mealDealSectionId')).addClass('list-collapse');
					thus.$(".mealdeal-title-" + model.get('mealDealSectionId')).addClass('non');
				}

				var mods = this.model.get('mods') || [];
				var found = _.find(mods, function(mod) {
					return mod.id == modId;
				});
				
				if ( !found ) mods.push(model.get('item'));
				this.model.trigger('change', this.model);
			} else {

				thus.$(".mealdeal-items-" + model.get('mealDealSectionId')).removeClass('list-collapse');
				thus.$(".mealdeal-title-" + model.get('mealDealSectionId')).removeClass('non');
				var mods = this.model.get('mods') || [];
				mods = _.reject(mods, function(mod) {
					return mod.id == modId;
				});
			}
			
			this.model.set('mods', mods);
				
		},
		
		remove: function(animate) {
			this._children.apply("remove");
			this.initChildViewStorage();
			
			return Backbone.View.prototype.remove.apply(this, arguments);
		}

  });
  
  return View;
  
});


define('plugins/text!templates/cards.html',[],function () { return '<div class="bar-footer footer-basket">\r\n\t<a href="#card-new" class=" new button altr" id="cards-addnew-btn"><%- _.tr("Add Card") %></a>\r\n</div>\r\n\r\n\r\n<div class="content general-list">\r\n\t<div class="scroller">\r\n\t<div class="content-padded" style="padding-bottom:10px;">\r\n\t\t<h2 id="storedcards-title"><%- _.tr("Stored Cards") %></h2>\r\n\t</div>\r\n\r\n\r\n<% if ( data.length < 1 ) { %>\r\n\t<ul class="list" style="margin-top: 10px; background: white">\r\n\t\t<li style="padding-right:20px;" id="storedcards-nocards-text"><%- _.tr("No stored cards, please add a card.") %></li>\r\n\t</ul>\r\n\r\n\r\n\r\n\r\n<% } else { %>\r\n\t<ul class="list" style="margin-top: 10px; background: white" id="storedcards-list">\r\n\t<% _.each(data, function(item) { %>\r\n        <% if ( item.store != false ) { %>\r\n            <li><a href="#card-detail/<%- item.id %>">\r\n                <span  class="icon-card-<%- item.type.toLowerCase() %>"></span> <span class="storedcards-list-number">**** <%- item.number %></span></a>\r\n                <span class="app-icon-chevron"></span>\r\n            </li>\r\n        <% } %>\r\n\t<% }); %>\r\n\t</ul>\r\n\r\n<% } %>\r\n\r\n\r\n\t</div>\r\n</div>\r\n</div>';});

// Filename: views/cards-view
define('views/cards-view',[
  'jquery',
  'underscore',
  'backbone',
  'plugins/text!templates/cards.html',
  'plugins/text!templates/header.html',
  'app'
], function($, _, Backbone, template, tmplHeader, app){
  var View = Backbone.View.extend({
  	
    render: function(){
    	console.log("render:CardView");
      var compiledTemplate = _.template( template, {data: this.collection.toJSON()} );
      // Append our compiled template to this Views "el"
      this.$el.html( compiledTemplate );
      
			this.renderHeader();
    },
    
		renderHeader : function() {
			// Using Underscore we can compile our template with data
			var compiledTemplate = _.template(tmplHeader, {
				left: _.tr('Back'),
				venue: app.currentVenue && app.currentVenue.toJSON()
			});
			// Append our compiled template to this Views "el"
			if ( this.$("header") ) {
				this.$("header").remove();
			}
			this.$(".content").before(compiledTemplate);
		}
  }, {
  	secure: true
  });
  
  return View;
  
});


define('plugins/text!templates/card-detail.html',[],function () { return '<% if ( !!data.id ) { %>\r\n\r\n<div class="bar-footer footer-basket">\r\n\t\t<a class="delete button altr" id="card-footer-delete"><%- _.tr("Delete") %></a>\r\n</div>\r\n\r\n<% } else { %>\r\n\r\n<div class="bar-footer footer-basket">\r\n\t\t<a class="submit button altr" id="card-footer-save"><%- _.tr("Save") %></a>\r\n</div>\r\n\r\n<% } %>\r\n\r\n\r\n<div class="content with-input">\r\n\t<div class="content-padded" style="padding-bottom:10px;">\r\n\t\t<h2 id="card-title"><%- title %></h2>\r\n\t</div>\r\n\r\n\r\n\t<form id="frmCard">\r\n\t\t<div id="payment-error" class="input-group" style="display: none;border-bottom:none">\r\n\t\t\t<div class="input-row text-error error" style="padding: 10px;border-bottom:none;">\r\n\r\n\t\t\t</div>\r\n\t\t</div>\r\n\r\n<% if ( !!data.id ) { %>\r\n\r\n\r\n\t\t<div class="input-group">\r\n\t\t\t<div class="input-row">\r\n\t\t\t\t<label><%- _.tr("Name") %></label> <span><%- data.name %></span>\r\n\t\t\t</div>\r\n\t\t\t<div class="input-row">\r\n\t\t\t\t<label><%- _.tr("Card #") %></label> <span id="card-data-number"> **** **** **** <%- data.number %></span>\r\n\t\t\t</div>\r\n\t\t\t<div class="input-row">\r\n\t\t\t\t<label><%- _.tr("Exp. Date") %></label> <span><%- data.expMonth %> / <%- data.expYear %></span>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</form>\r\n\r\n\r\n</div>\r\n\r\n<% } else { %>\r\n\r\n\t\t<div class="input-group">\r\n<%= fields %>\r\n\t\t</div>\r\n\t\t<input type="submit" class="" style="visibility: hidden"/>\r\n\r\n<% } %>\r\n\r\n\r\n\t</form>\r\n\r\n    <% if ( showSaveToggle ) { %>\r\n\r\n        <!-- Store Address option -->\r\n        <div class="content-padded" style="margin-top: -30px;">\r\n            <p id="card-store-text"><%- _.tr("Store this card for future purchases?") %></p>\r\n            <br>\r\n\r\n            <!-- Toggle On/Off -->\r\n            <div class="input-row">\r\n                <div class="toggle active" id="card-store-btn">\r\n                    <div class="toggle-handle"></div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n\r\n    <% } %>\r\n\r\n\r\n</div>';});


define('plugins/text!templates/card-fields.html',[],function () { return '\r\n\r\n<div class="input-row">\r\n    <label id="card-fields-name-label"><%- _.tr("Name") %></label> <input id="card-fields-name-field" type="text" name="name" autocorrect="off" autocapitalize="words" placeholder="<%- _.tr("Name on Card") %>" value="<% print(data && data.name ? data.name : \'\') %>">\r\n</div>\r\n<div class="input-row">\r\n    <label id="card-fields-number-label"><%- _.tr("Card #") %></label> <input id="card-fields-number-field" type="<% print($.os.android ? \'number\' : \'text\') %>" pattern="\\d*" name="number" placeholder="<%- _.tr("Credit Card Number") %>">\r\n</div>\r\n<div class="input-row">\r\n    <label id="card-fields-ccv-label"><%- _.tr("CCV") %></label> <input id="card-fields-ccv-field" type="<% print($.os.android ? \'number\' : \'text\') %>" pattern="\\d*" name="cvc" placeholder="<%- _.tr("Card Security Code") %>">\r\n</div>\r\n<div class="input-row">\r\n    <label id="card-fields-exp-label"><%- _.tr("Exp. Date") %></label>\r\n    <div style="float: right; width: 65%; padding-top: 3px">\r\n        <input id="card-fields-exp-mm-field" type="<% print($.os.android ? \'number\' : \'text\') %>" pattern="\\d*" name="exp_month" placeholder="<%- _.tr("MM") %>" style="width: 30%; background: #e6e6e6; margin: 2px; padding: 0px 5px; border-bottom-color: #fff; height: 33px;">\r\n        <input id="card-fields-exp-yy-field" type="<% print($.os.android ? \'number\' : \'text\') %>" pattern="\\d*" name="exp_year" placeholder="<%- _.tr("YY") %>" style="width: 30%; background: #e6e6e6; margin: 2px; padding: 0px 5px; height: 33px;">\r\n    </div>\r\n</div>\r\n';});

// Filename: views/card-detail-view
define('views/card-detail-view',[
    'jquery',
    'underscore',
    'backbone',
    'stripe',
    'plugins/text!templates/card-detail.html',
    'plugins/text!templates/card-fields.html',
    'plugins/text!templates/header.html',
    'models/card',
    'app'
], function ($, _, Backbone, Stripe, template, tmplFields, tmplHeader, Card, app) {
    var View = Backbone.View.extend({

        initialize: function () {
            Backbone.Validation.bind(this);
        },

        events: {
            "submit form": "save",
            "tap .submit": "save",
            "tap .delete": "deleteCard",
            "tap #card-store-btn": "toggleSave"
        },

        render: function () {
            console.log("render:CardDetailView");

            Backbone.Validation.bind(this);

            var modelJson = (this.model ? this.model.toJSON() : {});
            var compiledTemplate = _.template(template, {
                data: modelJson,
                showSaveToggle: this.options.showSaveToggle || false,
                fields: _.template(tmplFields, {data: modelJson}),
                title: this.model && !!this.model.get('id') ? _.tr("Card Details") : _.tr("New Card")
            });

            // Append our compiled template to this Views "el"
            this.$el.html(compiledTemplate);
            this.renderHeader();
            this.$("input[name=name]").focus();
        },

        renderHeader: function () {
            // Using Underscore we can compile our template with data
            /*
             var compiledTemplate = _.template(tmplHeader, {left: "Back", right: this.model.get('id') ?
             {className: "delete btn-red", text: "Delete"} : {className: "submit", text: "Save"}});
             */
            var compiledTemplate = _.template(tmplHeader, {left: _.tr("Back"), venue: app.currentVenue && app.currentVenue.toJSON()});

            // Append our compiled template to this Views "el"
            if (this.$("header")) {
                this.$("header").remove();
            }
            this.$(".content").before(compiledTemplate);
        },

        save: function (e) {

            e.preventDefault();
            $('#payment-error').hide();

            var values = this.$("#frmCard").serializeObject();

            



            // FIXME: Hack to get around demo mode
            if ( app.currentVenue && app.currentVenue.get('demoFlag') ) {
                // if no card details are entered
                if ( !(values.number && values.number.length) ) {
                    // CArds are ignored in demo mode so just add some dummy data
                    this.saveSuccess(new Card({
                        name: 'DEMO',
                        type: 'VISA',
                        number: '1234'
                    }));
                    return;
                }
            }





            

            this.model = this.model || new Card();
            if (!this.model.set(values, {validate: true})) {
                return;
            }

            var saveState = this.saveState();
            $('#spinner').show();
            that = this;

            // Validate and tokenize card
            Stripe.setPublishableKey(app.stripeKey);
            Stripe.createToken(values, function (status, resp) {
                if (resp.error) {
                    $('#spinner').hide();
                    $('#payment-error .error').html(resp.error.message);
                    $('#payment-error').show();
                    console.log(resp.error);

                } else {

                   var newCard =  new Card({
                        userId: app.user.get('id'),
                        venueId: app.currentVenue.get('id'),
                        //provider: 'Stripe',
                        token: resp.id,
                        name: resp.card.name,
                        type: resp.card.type,
                        expMonth: resp.card.exp_month,
                        expYear: resp.card.exp_year,
                        number: resp.card.last4,
                        store: saveState

                    });

                    if ( saveState){
                        newCard.save({}, {
                                success: function (model, resp, opts) {
                                    that.saveSuccess(model);
                                },
                                error: function () {
                                    $('#spinner').hide();
                                    $('#payment-error .error').html(_.tr('Failed to save card.'));
                                    $('#payment-error').show();
                                },
                                // this should stop validation of server result
                                forceUpdate: true
                            });
                    } else {
                        newCard.set('id',Math.random().toString(36).slice(2));
                        newCard.set('store',saveState);
                        that.saveSuccess(newCard);
                    }

                }
            });
        },
        saveSuccess: function(model){
            //what we do after model has been successfully saved
            $('#spinner').hide();
            app.user.get('paymentMethods').add(model);
            // FIXME: WE shouldn't need to do this.
            app.storeUser();

            // if app.user.selectedMethod (Selected Payment Method) is not already set
            // then assign this model
            if (!app.user.get('selectedMethod')) app.user.set('selectedMethod', model);

            window.history.back();

        },
        deleteCard: function (e) {
            e.preventDefault();

            var confirmMethod = navigator.notification && navigator.notification.confirm || function (msg, callback) {
                var r = window.confirm(msg);
                callback(r ? 1 : 2);
            };

            confirmMethod(
                _.tr('Continuing will permenantly remove the selected card.'),
                _.bind(function (button) {
                    if (button != 1) return;

                    $('#spinner').show();

                    this.model.destroy({
                        success: function (deletedCard) {
                            if (app.user.get('selectedMethod') === deletedCard) {
                                app.user.unset('selectedMethod');
                            }
                            // FIXME: WE shouldn't need to do this.
                            app.storeUser();
                            window.history.back();
                        },
                        error: function () {
                            $('#spinner').hide();
                            $('#payment-error .error').html(_.tr('Delete failed.'));
                            $('#payment-error').show();
                        }
                    });

                }, this)
            );


        },

        remove: function () {
            console.log("destroy:CardDetailView");
            Backbone.Validation.unbind(this);
            return Backbone.View.prototype.remove.apply(this, arguments);
        },

        toggleSave: function () {
            $('#card-store-btn').toggleClass('active');
        },

        saveState: function () {
            // Used to determine if we are saving this card.
            // If the toggle on/off save button exists on the form and user has set to off, we return false
            // otherwise if set to on we return true.
            // If toggle button is not found on page that means we are automatically saving, so true is returned. Steve
            return !($('#card-store-btn').length && !$('#card-store-btn').hasClass('active'));
        }

    });

    return View;

});


define('plugins/text!templates/card-select.html',[],function () { return '<div class="bar-footer footer-basket">\r\n\t<a href="#checkoutcardnew" class=" new button altr"><%- _.tr("New Card") %></a>\r\n</div>\r\n\r\n<div class="content general-list">\r\n<div class="scroller">\r\n\r\n\t<div class="content-padded" style="padding-bottom:10px;">\r\n\t\t<h2><%- _.tr("Select payment method") %></h2>\r\n\t</div>\r\n\t\r\n\t\r\n\t\r\n\t<ul class="list" style="margin-top: 10px; background: white">\r\n\t\t<% _.each(data, function(item) { %>\r\n\t\t<li data-item-id="<%- item.id %>">\r\n\t\t\t<a>\r\n\t\t\t<span  class="icon-card-<%- item.type.toLowerCase() %>"></span>\r\n\t\t\t**** **** **** <%- item.number %>\r\n\t\t\t<span class="app-icon-chevron"></span>\r\n\t\t\t</a>\r\n\t\t</li> \r\n\t\t<% }); %>\r\n\t</ul>\r\n\t\r\n\r\n</div>\r\n</div>\r\n';});

// Filename: views/cards-select-view
define('views/card-select-view',[
  'jquery',
  'underscore',
  'backbone',
  'plugins/text!templates/card-select.html',
  'plugins/text!templates/header.html',
  'app'
], function($, _, Backbone, template, tmplHeader, app){
  var View = Backbone.View.extend({
  	
  	events: {
  		"tap li" : "select"
  	},
  	
  	select: function(e) {
			e.preventDefault();
	  	e.stopPropagation();
	  	
	  	var id = $(e.target).closest('li').attr("data-item-id"),
	  			method = this.model.get("paymentMethods").get(id);

	  	console.log('Select...', method);
	  	this.model.set('selectedMethod', method);
	  	
	  	this.$('.icon-check').removeClass('checked');
	  	
	  	this.$('li[data-item-id="' + id + '"] .icon-check').addClass('checked');
	  	
  		window.history.back();
  		
  	},
  	
    render: function(){
    	console.log("render:CardSelectView");
      var compiledTemplate = _.template( template, {
      		data: this.model.get('paymentMethods').toJSON()
      	});
      // Append our compiled template to this Views "el"
      this.$el.html( compiledTemplate );
      
      if (this.model.get('selectedMethod')) {
      	this.$('li[data-item-id="' + this.model.get('selectedMethod').get('id') + '"] .icon-check').addClass('checked');
      }
      
			this.renderHeader();
    },
    
		renderHeader : function() {
			// Using Underscore we can compile our template with data
			var compiledTemplate = _.template(tmplHeader, {left: _.tr('Back')});
			// Append our compiled template to this Views "el"
			if ( this.$("header") ) {
				this.$("header").remove();
			}
			this.$(".content").before(compiledTemplate);
		}
		
		
  }, {
  	secure: true
  });
  
  return View;
  
});


define('plugins/text!templates/login.html',[],function () { return '<div class="content general-list">\r\n\t<div class="scroller with-input">\r\n\t\t<div class="content-padded" style="padding-bottom:10px;">\r\n\t\t\t<h2 id="login-title"><%- _.tr("Login") %></h2>\r\n\t\t</div>\r\n\r\n\r\n\t<form>\r\n\t\t\r\n\t\t<div class="input-group">\r\n\t\t\t<div class="input-row">\r\n\t\t\t\t<label id="login-email-label"><%- _.tr("Email") %></label><input type="email" name="username" id="login-email-field" />\r\n\t\t\t</div>\r\n\r\n\t\t\t<div class="input-row">\r\n\t\t\t\t<label id="login-password-label"><%- _.tr("Password") %></label><input type="password" name="password" id="login-password-field" />\r\n\t\t\t</div>\r\n\t\t</div>\r\n\r\n\t\t<div style="margin-bottom:10px;text-align:center;"><br>\r\n\t\t\t<a class="submit button-blue" id="account-login-button"><%- _.tr("Login") %></a><br><br>\r\n\t\t\t<a class="small toggle-forgot"><%- _.tr("Forgot password?") %></a>\r\n\t\t</div>\r\n\r\n\r\n\t<ul class="list">\r\n\t\t<li>\r\n\t\t\t<a class="toggle-state" style="text-align:left;text-decoration:none;">\r\n\t\t\t\t<strong id="login-signup-title"><%- _.tr("Don\'t yet have an account?") %></strong>\r\n\t\t\t\t<p id="login-signup-sbutitle"><%- _.tr("Sign up here") %></p>\r\n\t\t\t\t<span class="app-icon-chevron" id="login-signup-chevron"></span>\r\n\t\t\t</a>\r\n\t\t</li>\r\n\t</ul>\r\n\r\n\r\n\t\t\r\n\t\t<input type="submit" class="" style="visibility: hidden"/>\r\n\r\n\t</form>\r\n\r\n\t</div>\r\n</div>';});


define('plugins/text!templates/account-create.html',[],function () { return '<div class="content general-list">\r\n\t<div class="scroller with-input">\r\n  <div class="scroller">\r\n\r\n    <ul class="list">\r\n      <li>\r\n        <a class="toggle-state" style="text-align:left;text-decoration:none;" id="account-create-login-button">\r\n          <strong id="account-create-login-title"><%- _.tr("Already have an account") %></strong>\r\n          <p id="account-create-login-subtitle"><%- _.tr("Sign in here") %></p>\r\n          <span class="app-icon-chevron" id="account-create-login-caret"></span>\r\n        </a>\r\n      </li>\r\n    </ul>\r\n\r\n\t\t<div class="content-padded" style="padding-bottom:10px;">\r\n      <h2 id="account-create-title"><%- _.tr("Create Account") %></h2>\r\n\t\t</div>\r\n\r\n    <!-- Form fields -->\r\n\t<form>\r\n\t\t<div class="input-group">\r\n\r\n        <!-- First name -->\r\n\t\t\t<div class="input-row">\r\n          <label id="account-create-firstname-label"><%- _.tr("First Name") %></label> <input type="text" name="firstName" autocorrect="off" autocapitalize="words" id="account-create-firstname-field" />\r\n\t\t\t</div>\r\n\r\n        <!-- Last name -->\r\n\t\t\t<div class="input-row">\r\n          <label id="account-create-lastname-label"><%- _.tr("Last Name") %></label> <input type="text" name="lastName" autocorrect="off" autocapitalize="words" id="account-create-lastname-field" />\r\n\t\t\t</div>\r\n\t\t\t<% if ( settings.showExternalId ) { %>\r\n\t\t\t<div class="input-row">\r\n\t\t\t\t<label><%- settings.showExternalId %></label> <input type="text" name="externalId" autocorrect="off" />\r\n\t\t\t</div>\r\n\t\t\t<% } %>\r\n\r\n        <!-- Email -->\r\n\t\t\t<div class="input-row">\r\n          <label id="account-create-email-label"><%- _.tr("Email") %></label>\r\n          <input type="email" name="email" id="account-create-email-field" />\r\n\t\t\t</div>\r\n\r\n        <!-- Phone -->\r\n\t\t\t<!--div class="input-row">\r\n          <label id="account-create-phone-label">Mobile No.</label> <input type="phone" name="phone" id="account-create-phone-field" />\r\n\t\t\t</div -->\r\n\t\t\t\r\n        <!-- Password -->\r\n        <div class="input-row">\r\n          <label id="account-create-password-label"><%- _.tr("Password") %></label>\r\n          <input type="password" name="password" id="account-create-password-field" />\r\n        </div>\r\n\t\t\t\r\n        <!-- Loyalty toggle -->\r\n\t   \t<div class="input-row" style="padding:10px;">\r\n\t\t\t\t<div style="float: left; margin-right:15px; margin-bottom:20px;">\r\n            <div class="toggle active" data-toggle-for="optinLoyalty" id="account-create-toggle-1-btn">\r\n\t\t\t\t\t\t<div class="toggle-handle"></div>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</div>\r\n\t\t\t\t<input type="hidden" name="optinLoyalty" value="1"/>\r\n          <span id="account-create-toggle-1-text">\r\n          \t<%- _.tr("Please switch-off this box if you do not wish to be contacted regarding loyalty programmes") %>\r\n          </span>\r\n\t\t\t</div>\r\n\r\n        <!-- Discount toggle -->\r\n\t   \t<div class="input-row" style="padding:10px;">\r\n\t\t\t\t<div style="float: left; margin-right:15px; margin-bottom:20px;">\r\n            <div class="toggle active" data-toggle-for="optinOffers" id="account-create-toggle-2-btn">\r\n\t\t\t\t\t\t<div class="toggle-handle"></div>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</div>\r\n\t\t\t\t<input type="hidden" name="optinOffers" value="1"/>\r\n          <span id="account-create-toggle-2-text">\r\n          \t<%- _.tr("Please switch-off this box if you do not want more information about discounts and special offers") %>\r\n          </span>\r\n\t\t\t</div>\r\n\r\n        <!-- Marketing toggle -->\r\n\t   \t<div class="input-row" style="padding:10px;">\r\n\t\t\t\t<div style="float: left; margin-right:15px; margin-bottom:20px;">\r\n            <div class="toggle" data-toggle-for="optinOther" id="account-create-toggle-3-btn">\r\n\t\t\t\t\t\t<div class="toggle-handle"></div>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</div>\r\n\t\t\t\t<input type="hidden" name="optinOther" value="0"/>\r\n          <span id="account-create-toggle-3-text">\r\n          \t<%- _.tr("Please switch-on this box if you are happy to receive newsletters, research and marketing emails") %>\r\n          </span>\r\n\t\t\t</div>\r\n\r\n\t\t</div>\r\n\r\n    <!-- Actions -->\r\n\t\t<div style="margin-bottom:10px;text-align:center;"><a class="submit button-blue" id="account-create-create"><%- _.tr("Create Account") %></a></div>\r\n\t\r\n    <!-- Terms -->\r\n    <p class="terms" id="account-create-tcs-area">\r\n\t\t\t<%- _.tr("By continuing, you accept the") %><br>\r\n\t\t\t<a href="http://api.preoday.com/terms/terms.html" target="_blank" id="account-create-tcs-link-terms"><%- _.tr("Terms and Conditions") %></a> <%- _.tr("and") %>\r\n\t\t\t<a href="http://api.preoday.com/terms/privacy.html" target="_blank" id="account-create-tcs-link-privacy"><%- _.tr("Privacy Policy") %></a>\r\n\t\t</p>\r\n\t\t\r\n      <input type="submit" class="" style="visibility: hidden"/>\r\n\r\n    </form>\r\n\t\t\r\n    <!-- Footer branding -->\r\n    <header class="bar-footer"></header>\r\n\t\t\r\n</div>\r\n</div>';});


define('plugins/text!templates/login-forgot.html',[],function () { return '<div class="content">\r\n\t<div class="content-padded">\r\n\t\t<h2 id="forgotpassword-title"><%- _.tr("Forgot Password") %></h2>\r\n\t</div>\r\n\t<form style="margin: 15px">\r\n\t<div style="margin-bottom: 10px;" id="forgotpassword-text">\r\n\t\t<%- _.tr("Please enter your email address below and we will send you instructions on how to reset your password.") %>\r\n\t</div>\r\n\t\t<div class="input-group">\r\n\t\t\t<div class="input-row">\r\n\t\t\t\t<label id="forgotpassword-email-label"><%- _.tr("Email") %></label><input type="email" name="email" id="forgotpassword-email-field" />\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t\t\r\n\t\t<a class="button-block submit" id="forgotpassword-submit"><%- _.tr("Send Reset Email") %></a>\r\n\r\n\t\t<a class="toggle-forgot"><%- _.tr("Back to login") %></a>\r\n\t\t<a class="toggle-state" style="padding: 20px 0px"><%- _.tr("Don\'t yet have an account?") %></a>\r\n\t\t\r\n\t\t<input type="submit" class="" style="visibility: hidden"/>\r\n\r\n\t</form>\r\n\r\n</div>';});

// Filename: models/user
define('models/user',[
  "jquery",
  "underscore",
  "backbone",
  "models/card-collection",
  "models/address-collection",
  "modelConfiguration"
], function($, _, Backbone, CardCollection, AddressCollection, Configuration, Validation){
  var Model = Backbone.Model.extend({
  	urlRoot: Configuration.apiRoot + "users",
  	
  	defaults: {
  		paymentMethods: new CardCollection(),
        addresses: new AddressCollection()
  	},
  	
  	validation : {
			name : {
				required : true
			},

            /** firstName and lastName validation
             *
             *  This function will return regex used to validate partially against international names.
             *  This includes all names expressible in ASCII Latin, as well as those characters in the
             *  Latin Extended A block (U+0100 - U+017F) including, Latin, Czech, Dutch, Polish and
             *  Turkish characters. Latin Extended B (U+0180 - U+024F) is also supported, including the
             *  Africa alphabet, Pan-Nigerian, Americanist, Khoisan, Pinyin and Romanian symbols. Commas,
             *  periods, hyphens and spaces are allowed.
             *
             */
            firstName: {
                minLength: 1,
                maxLength: 35,
                pattern: /^([\u0180-\u024F\u0100-\u017Fa-zA-Z'\-., ])+$/
            },
            lastName: {
                minLength: 1,
                maxLength: 35,
                pattern: /^([\u0180-\u024F\u0100-\u017Fa-zA-Z'\-., ])+$/
            },

			email : {
				required : true,
				pattern : "email"
			},
			password : {
				required : true
			},
            phone: {
                // Number is optional but if given make sure it's 
                // between minLength and maxLength and matches the pattern
                fn: function(value, attr, model) {
                  var minLength = 7;
                  var maxLength = 20;
                  if ( !(_.isNull(value) || _.isUndefined(value)) ) {
                    if ( value.trim().length < minLength || value.trim().length > maxLength ) {
                      return attr + ' must be between ' + minLength + ' and ' + maxLength + ' characters';
                    }
                    var pattern = /^[+]?[\d\(\)\.\- ]*$/;
                    if ( !value.toString().match(pattern) ) {
                      return attr + ' must be a valid phone number';
                    }
                  }
                }
            }

		},
  	
  	parse: function(response) {
  		response.paymentMethods = new CardCollection(response.paymentMethods, {parse: true});
  		response.selectedMethod = response.paymentMethods.first();
        response.addresses = new AddressCollection(response.addresses);
        response.addressSelected = response.addresses.first();
  		return response;
  	},
  	
  	toJSON: function() {
  		var json = Backbone.Model.prototype.toJSON.apply(this, arguments);
  		json.paymentMethods = json.paymentMethods ? json.paymentMethods.toJSON() : undefined;
        json.addresses = json.addresses ? json.addresses.toJSON() : undefined;
  		
  		return json;
  	},

    toExternalJSON: function() {
      // Only send name email and phone
      return _.pick(this.attributes, 'id', 'firstName', 'lastName', 'email', 'phone');
    }
  	
  }, {
  	// Static auth method
  	auth: function(attrs, options) {  		
  		// It's a complete hack using save here.
  		// We do it so the response is parsed and set back on the model.
  		new this().save({}, _.extend({
	  			url: $settings.apiRoot + "users/auth",
	  			data: $.param(attrs), // pass attributes here so the password is not set on the User object
	  			wait: true
	  		}, options)
  		);
  	},
  	
  	create: function(attrs, options) {
  		new this().save({}, _.extend({
	  			attrs: attrs, // pass attributes here so the password is not set on the User object
	  			wait: true
	  		}, options)
  		);
  	},

    forgot: function(attrs, options) {
      $.ajax(_.defaults(options || {}, {
        type: 'POST',
        url: $settings.apiRoot + "users/auth/forgot",
        data: $.param(attrs)
      }));
    }
  });
  
  return Model;
});
// Filename: models/credential
define('models/credential',[
	"underscore",
  "backbone"
], function(_, Backbone){
  var Model = Backbone.Model.extend({
  	urlRoot: $settings.apiRoot + "users",
  	
  	validation : {
			username : {
				required : true,
				pattern : "email"
			},
			password : {
				required : true
			}
  	}
  });
  
  return Model;
});
/*! iScroll v5.1.1 ~ (c) 2008-2014 Matteo Spinelli ~ http://cubiq.org/license */
(function (window, document, Math) {
var rAF = window.requestAnimationFrame	||
	window.webkitRequestAnimationFrame	||
	window.mozRequestAnimationFrame		||
	window.oRequestAnimationFrame		||
	window.msRequestAnimationFrame		||
	function (callback) { window.setTimeout(callback, 1000 / 60); };

var utils = (function () {
	var me = {};

	var _elementStyle = document.createElement('div').style;
	var _vendor = (function () {
		var vendors = ['t', 'webkitT', 'MozT', 'msT', 'OT'],
			transform,
			i = 0,
			l = vendors.length;

		for ( ; i < l; i++ ) {
			transform = vendors[i] + 'ransform';
			if ( transform in _elementStyle ) return vendors[i].substr(0, vendors[i].length-1);
		}

		return false;
	})();

	function _prefixStyle (style) {
		if ( _vendor === false ) return false;
		if ( _vendor === '' ) return style;
		return _vendor + style.charAt(0).toUpperCase() + style.substr(1);
	}

	me.getTime = Date.now || function getTime () { return new Date().getTime(); };

	me.extend = function (target, obj) {
		for ( var i in obj ) {
			target[i] = obj[i];
		}
	};

	me.addEvent = function (el, type, fn, capture) {
		el.addEventListener(type, fn, !!capture);
	};

	me.removeEvent = function (el, type, fn, capture) {
		el.removeEventListener(type, fn, !!capture);
	};

	me.momentum = function (current, start, time, lowerMargin, wrapperSize, deceleration) {
		var distance = current - start,
			speed = Math.abs(distance) / time,
			destination,
			duration;

		deceleration = deceleration === undefined ? 0.0006 : deceleration;

		destination = current + ( speed * speed ) / ( 2 * deceleration ) * ( distance < 0 ? -1 : 1 );
		duration = speed / deceleration;

		if ( destination < lowerMargin ) {
			destination = wrapperSize ? lowerMargin - ( wrapperSize / 2.5 * ( speed / 8 ) ) : lowerMargin;
			distance = Math.abs(destination - current);
			duration = distance / speed;
		} else if ( destination > 0 ) {
			destination = wrapperSize ? wrapperSize / 2.5 * ( speed / 8 ) : 0;
			distance = Math.abs(current) + destination;
			duration = distance / speed;
		}

		return {
			destination: Math.round(destination),
			duration: duration
		};
	};

	var _transform = _prefixStyle('transform');

	me.extend(me, {
		hasTransform: _transform !== false,
		hasPerspective: _prefixStyle('perspective') in _elementStyle,
		hasTouch: 'ontouchstart' in window,
		hasPointer: navigator.msPointerEnabled,
		hasTransition: _prefixStyle('transition') in _elementStyle
	});

	// This should find all Android browsers lower than build 535.19 (both stock browser and webview)
	me.isBadAndroid = /Android /.test(window.navigator.appVersion) && !(/Chrome\/\d/.test(window.navigator.appVersion));

	me.extend(me.style = {}, {
		transform: _transform,
		transitionTimingFunction: _prefixStyle('transitionTimingFunction'),
		transitionDuration: _prefixStyle('transitionDuration'),
		transitionDelay: _prefixStyle('transitionDelay'),
		transformOrigin: _prefixStyle('transformOrigin')
	});

	me.hasClass = function (e, c) {
		var re = new RegExp("(^|\\s)" + c + "(\\s|$)");
		return re.test(e.className);
	};

	me.addClass = function (e, c) {
		if ( me.hasClass(e, c) ) {
			return;
		}

		var newclass = e.className.split(' ');
		newclass.push(c);
		e.className = newclass.join(' ');
	};

	me.removeClass = function (e, c) {
		if ( !me.hasClass(e, c) ) {
			return;
		}

		var re = new RegExp("(^|\\s)" + c + "(\\s|$)", 'g');
		e.className = e.className.replace(re, ' ');
	};

	me.offset = function (el) {
		var left = -el.offsetLeft,
			top = -el.offsetTop;

		// jshint -W084
		while (el = el.offsetParent) {
			left -= el.offsetLeft;
			top -= el.offsetTop;
		}
		// jshint +W084

		return {
			left: left,
			top: top
		};
	};

	me.preventDefaultException = function (el, exceptions) {
		for ( var i in exceptions ) {
			if ( exceptions[i].test(el[i]) ) {
				return true;
			}
		}

		return false;
	};

	me.extend(me.eventType = {}, {
		touchstart: 1,
		touchmove: 1,
		touchend: 1,

		mousedown: 2,
		mousemove: 2,
		mouseup: 2,

		MSPointerDown: 3,
		MSPointerMove: 3,
		MSPointerUp: 3
	});

	me.extend(me.ease = {}, {
		quadratic: {
			style: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
			fn: function (k) {
				return k * ( 2 - k );
			}
		},
		circular: {
			style: 'cubic-bezier(0.1, 0.57, 0.1, 1)',	// Not properly "circular" but this looks better, it should be (0.075, 0.82, 0.165, 1)
			fn: function (k) {
				return Math.sqrt( 1 - ( --k * k ) );
			}
		},
		back: {
			style: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
			fn: function (k) {
				var b = 4;
				return ( k = k - 1 ) * k * ( ( b + 1 ) * k + b ) + 1;
			}
		},
		bounce: {
			style: '',
			fn: function (k) {
				if ( ( k /= 1 ) < ( 1 / 2.75 ) ) {
					return 7.5625 * k * k;
				} else if ( k < ( 2 / 2.75 ) ) {
					return 7.5625 * ( k -= ( 1.5 / 2.75 ) ) * k + 0.75;
				} else if ( k < ( 2.5 / 2.75 ) ) {
					return 7.5625 * ( k -= ( 2.25 / 2.75 ) ) * k + 0.9375;
				} else {
					return 7.5625 * ( k -= ( 2.625 / 2.75 ) ) * k + 0.984375;
				}
			}
		},
		elastic: {
			style: '',
			fn: function (k) {
				var f = 0.22,
					e = 0.4;

				if ( k === 0 ) { return 0; }
				if ( k == 1 ) { return 1; }

				return ( e * Math.pow( 2, - 10 * k ) * Math.sin( ( k - f / 4 ) * ( 2 * Math.PI ) / f ) + 1 );
			}
		}
	});

	me.tap = function (e, eventName) {
		var ev = document.createEvent('Event');
		ev.initEvent(eventName, true, true);
		ev.pageX = e.pageX;
		ev.pageY = e.pageY;
		e.target.dispatchEvent(ev);
	};

	me.click = function (e) {
		var target = e.target,
			ev;

		if ( !(/(SELECT|INPUT|TEXTAREA)/i).test(target.tagName) ) {
			ev = document.createEvent('MouseEvents');
			ev.initMouseEvent('click', true, true, e.view, 1,
				target.screenX, target.screenY, target.clientX, target.clientY,
				e.ctrlKey, e.altKey, e.shiftKey, e.metaKey,
				0, null);

			ev._constructed = true;
			target.dispatchEvent(ev);
		}
	};

	return me;
})();

function IScroll (el, options) {
	this.wrapper = typeof el == 'string' ? document.querySelector(el) : el;
	this.scroller = this.wrapper.children[0];
	this.scrollerStyle = this.scroller.style;		// cache style for better performance

	this.options = {

		resizeScrollbars: true,

		mouseWheelSpeed: 20,

		snapThreshold: 0.334,

// INSERT POINT: OPTIONS 

		startX: 0,
		startY: 0,
		scrollY: true,
		directionLockThreshold: 5,
		momentum: true,

		bounce: true,
		bounceTime: 600,
		bounceEasing: '',

		preventDefault: true,
		preventDefaultException: { tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT)$/ },

		HWCompositing: true,
		useTransition: true,
		useTransform: true
	};

	for ( var i in options ) {
		this.options[i] = options[i];
	}

	// Normalize options
	this.translateZ = this.options.HWCompositing && utils.hasPerspective ? ' translateZ(0)' : '';

	this.options.useTransition = utils.hasTransition && this.options.useTransition;
	this.options.useTransform = utils.hasTransform && this.options.useTransform;

	this.options.eventPassthrough = this.options.eventPassthrough === true ? 'vertical' : this.options.eventPassthrough;
	this.options.preventDefault = !this.options.eventPassthrough && this.options.preventDefault;

	// If you want eventPassthrough I have to lock one of the axes
	this.options.scrollY = this.options.eventPassthrough == 'vertical' ? false : this.options.scrollY;
	this.options.scrollX = this.options.eventPassthrough == 'horizontal' ? false : this.options.scrollX;

	// With eventPassthrough we also need lockDirection mechanism
	this.options.freeScroll = this.options.freeScroll && !this.options.eventPassthrough;
	this.options.directionLockThreshold = this.options.eventPassthrough ? 0 : this.options.directionLockThreshold;

	this.options.bounceEasing = typeof this.options.bounceEasing == 'string' ? utils.ease[this.options.bounceEasing] || utils.ease.circular : this.options.bounceEasing;

	this.options.resizePolling = this.options.resizePolling === undefined ? 60 : this.options.resizePolling;

	if ( this.options.tap === true ) {
		this.options.tap = 'tap';
	}

	if ( this.options.shrinkScrollbars == 'scale' ) {
		this.options.useTransition = false;
	}

	this.options.invertWheelDirection = this.options.invertWheelDirection ? -1 : 1;

// INSERT POINT: NORMALIZATION

	// Some defaults	
	this.x = 0;
	this.y = 0;
	this.directionX = 0;
	this.directionY = 0;
	this._events = {};

// INSERT POINT: DEFAULTS

	this._init();
	this.refresh();

	this.scrollTo(this.options.startX, this.options.startY);
	this.enable();
}

IScroll.prototype = {
	version: '5.1.1',

	_init: function () {
		this._initEvents();

		if ( this.options.scrollbars || this.options.indicators ) {
			this._initIndicators();
		}

		if ( this.options.mouseWheel ) {
			this._initWheel();
		}

		if ( this.options.snap ) {
			this._initSnap();
		}

		if ( this.options.keyBindings ) {
			this._initKeys();
		}

// INSERT POINT: _init

	},

	destroy: function () {
		this._initEvents(true);

		this._execEvent('destroy');
	},

	_transitionEnd: function (e) {
		if ( e.target != this.scroller || !this.isInTransition ) {
			return;
		}

		this._transitionTime();
		if ( !this.resetPosition(this.options.bounceTime) ) {
			this.isInTransition = false;
			this._execEvent('scrollEnd');
		}
	},

	_start: function (e) {
		// React to left mouse button only
		if ( utils.eventType[e.type] != 1 ) {
			if ( e.button !== 0 ) {
				return;
			}
		}

		if ( !this.enabled || (this.initiated && utils.eventType[e.type] !== this.initiated) ) {
			return;
		}

		if ( this.options.preventDefault && !utils.isBadAndroid && !utils.preventDefaultException(e.target, this.options.preventDefaultException) ) {
			e.preventDefault();
		}

		var point = e.touches ? e.touches[0] : e,
			pos;

		this.initiated	= utils.eventType[e.type];
		this.moved		= false;
		this.distX		= 0;
		this.distY		= 0;
		this.directionX = 0;
		this.directionY = 0;
		this.directionLocked = 0;

		this._transitionTime();

		this.startTime = utils.getTime();

		if ( this.options.useTransition && this.isInTransition ) {
			this.isInTransition = false;
			pos = this.getComputedPosition();
			this._translate(Math.round(pos.x), Math.round(pos.y));
			this._execEvent('scrollEnd');
		} else if ( !this.options.useTransition && this.isAnimating ) {
			this.isAnimating = false;
			this._execEvent('scrollEnd');
		}

		this.startX    = this.x;
		this.startY    = this.y;
		this.absStartX = this.x;
		this.absStartY = this.y;
		this.pointX    = point.pageX;
		this.pointY    = point.pageY;

		this._execEvent('beforeScrollStart');
	},

	_move: function (e) {
		if ( !this.enabled || utils.eventType[e.type] !== this.initiated ) {
			return;
		}

		if ( this.options.preventDefault ) {	// increases performance on Android? TODO: check!
			e.preventDefault();
		}

		var point		= e.touches ? e.touches[0] : e,
			deltaX		= point.pageX - this.pointX,
			deltaY		= point.pageY - this.pointY,
			timestamp	= utils.getTime(),
			newX, newY,
			absDistX, absDistY;

		this.pointX		= point.pageX;
		this.pointY		= point.pageY;

		this.distX		+= deltaX;
		this.distY		+= deltaY;
		absDistX		= Math.abs(this.distX);
		absDistY		= Math.abs(this.distY);

		// We need to move at least 10 pixels for the scrolling to initiate
		if ( timestamp - this.endTime > 300 && (absDistX < 10 && absDistY < 10) ) {
			return;
		}

		// If you are scrolling in one direction lock the other
		if ( !this.directionLocked && !this.options.freeScroll ) {
			if ( absDistX > absDistY + this.options.directionLockThreshold ) {
				this.directionLocked = 'h';		// lock horizontally
			} else if ( absDistY >= absDistX + this.options.directionLockThreshold ) {
				this.directionLocked = 'v';		// lock vertically
			} else {
				this.directionLocked = 'n';		// no lock
			}
		}

		if ( this.directionLocked == 'h' ) {
			if ( this.options.eventPassthrough == 'vertical' ) {
				e.preventDefault();
			} else if ( this.options.eventPassthrough == 'horizontal' ) {
				this.initiated = false;
				return;
			}

			deltaY = 0;
		} else if ( this.directionLocked == 'v' ) {
			if ( this.options.eventPassthrough == 'horizontal' ) {
				e.preventDefault();
			} else if ( this.options.eventPassthrough == 'vertical' ) {
				this.initiated = false;
				return;
			}

			deltaX = 0;
		}

		deltaX = this.hasHorizontalScroll ? deltaX : 0;
		deltaY = this.hasVerticalScroll ? deltaY : 0;

		newX = this.x + deltaX;
		newY = this.y + deltaY;

		// Slow down if outside of the boundaries
		if ( newX > 0 || newX < this.maxScrollX ) {
			newX = this.options.bounce ? this.x + deltaX / 3 : newX > 0 ? 0 : this.maxScrollX;
		}
		if ( newY > 0 || newY < this.maxScrollY ) {
			newY = this.options.bounce ? this.y + deltaY / 3 : newY > 0 ? 0 : this.maxScrollY;
		}

		this.directionX = deltaX > 0 ? -1 : deltaX < 0 ? 1 : 0;
		this.directionY = deltaY > 0 ? -1 : deltaY < 0 ? 1 : 0;

		if ( !this.moved ) {
			this._execEvent('scrollStart');
		}

		this.moved = true;

		this._translate(newX, newY);

/* REPLACE START: _move */

		if ( timestamp - this.startTime > 300 ) {
			this.startTime = timestamp;
			this.startX = this.x;
			this.startY = this.y;
		}

/* REPLACE END: _move */

	},

	_end: function (e) {
		if ( !this.enabled || utils.eventType[e.type] !== this.initiated ) {
			return;
		}

		if ( this.options.preventDefault && !utils.preventDefaultException(e.target, this.options.preventDefaultException) ) {
			e.preventDefault();
		}

		var point = e.changedTouches ? e.changedTouches[0] : e,
			momentumX,
			momentumY,
			duration = utils.getTime() - this.startTime,
			newX = Math.round(this.x),
			newY = Math.round(this.y),
			distanceX = Math.abs(newX - this.startX),
			distanceY = Math.abs(newY - this.startY),
			time = 0,
			easing = '';

		this.isInTransition = 0;
		this.initiated = 0;
		this.endTime = utils.getTime();

		// reset if we are outside of the boundaries
		if ( this.resetPosition(this.options.bounceTime) ) {
			return;
		}

		this.scrollTo(newX, newY);	// ensures that the last position is rounded

		// we scrolled less than 10 pixels
		if ( !this.moved ) {
			if ( this.options.tap ) {
				utils.tap(e, this.options.tap);
			}

			if ( this.options.click ) {
				utils.click(e);
			}

			this._execEvent('scrollCancel');
			return;
		}

		if ( this._events.flick && duration < 200 && distanceX < 100 && distanceY < 100 ) {
			this._execEvent('flick');
			return;
		}

		// start momentum animation if needed
		if ( this.options.momentum && duration < 300 ) {
			momentumX = this.hasHorizontalScroll ? utils.momentum(this.x, this.startX, duration, this.maxScrollX, this.options.bounce ? this.wrapperWidth : 0, this.options.deceleration) : { destination: newX, duration: 0 };
			momentumY = this.hasVerticalScroll ? utils.momentum(this.y, this.startY, duration, this.maxScrollY, this.options.bounce ? this.wrapperHeight : 0, this.options.deceleration) : { destination: newY, duration: 0 };
			newX = momentumX.destination;
			newY = momentumY.destination;
			time = Math.max(momentumX.duration, momentumY.duration);
			this.isInTransition = 1;
		}


		if ( this.options.snap ) {
			var snap = this._nearestSnap(newX, newY);
			this.currentPage = snap;
			time = this.options.snapSpeed || Math.max(
					Math.max(
						Math.min(Math.abs(newX - snap.x), 1000),
						Math.min(Math.abs(newY - snap.y), 1000)
					), 300);
			newX = snap.x;
			newY = snap.y;

			this.directionX = 0;
			this.directionY = 0;
			easing = this.options.bounceEasing;
		}

// INSERT POINT: _end

		if ( newX != this.x || newY != this.y ) {
			// change easing function when scroller goes out of the boundaries
			if ( newX > 0 || newX < this.maxScrollX || newY > 0 || newY < this.maxScrollY ) {
				easing = utils.ease.quadratic;
			}

			this.scrollTo(newX, newY, time, easing);
			return;
		}

		this._execEvent('scrollEnd');
	},

	_resize: function () {
		var that = this;

		clearTimeout(this.resizeTimeout);

		this.resizeTimeout = setTimeout(function () {
			that.refresh();
		}, this.options.resizePolling);
	},

	resetPosition: function (time) {
		var x = this.x,
			y = this.y;

		time = time || 0;

		if ( !this.hasHorizontalScroll || this.x > 0 ) {
			x = 0;
		} else if ( this.x < this.maxScrollX ) {
			x = this.maxScrollX;
		}

		if ( !this.hasVerticalScroll || this.y > 0 ) {
			y = 0;
		} else if ( this.y < this.maxScrollY ) {
			y = this.maxScrollY;
		}

		if ( x == this.x && y == this.y ) {
			return false;
		}

		this.scrollTo(x, y, time, this.options.bounceEasing);

		return true;
	},

	disable: function () {
		this.enabled = false;
	},

	enable: function () {
		this.enabled = true;
	},

	refresh: function () {
		var rf = this.wrapper.offsetHeight;		// Force reflow

		this.wrapperWidth	= this.wrapper.clientWidth;
		this.wrapperHeight	= this.wrapper.clientHeight;

/* REPLACE START: refresh */

		this.scrollerWidth	= this.scroller.offsetWidth;
		this.scrollerHeight	= this.scroller.offsetHeight;

		this.maxScrollX		= this.wrapperWidth - this.scrollerWidth;
		this.maxScrollY		= this.wrapperHeight - this.scrollerHeight;

/* REPLACE END: refresh */

		this.hasHorizontalScroll	= this.options.scrollX && this.maxScrollX < 0;
		this.hasVerticalScroll		= this.options.scrollY && this.maxScrollY < 0;

		if ( !this.hasHorizontalScroll ) {
			this.maxScrollX = 0;
			this.scrollerWidth = this.wrapperWidth;
		}

		if ( !this.hasVerticalScroll ) {
			this.maxScrollY = 0;
			this.scrollerHeight = this.wrapperHeight;
		}

		this.endTime = 0;
		this.directionX = 0;
		this.directionY = 0;

		this.wrapperOffset = utils.offset(this.wrapper);

		this._execEvent('refresh');

		this.resetPosition();

// INSERT POINT: _refresh

	},

	on: function (type, fn) {
		if ( !this._events[type] ) {
			this._events[type] = [];
		}

		this._events[type].push(fn);
	},

	off: function (type, fn) {
		if ( !this._events[type] ) {
			return;
		}

		var index = this._events[type].indexOf(fn);

		if ( index > -1 ) {
			this._events[type].splice(index, 1);
		}
	},

	_execEvent: function (type) {
		if ( !this._events[type] ) {
			return;
		}

		var i = 0,
			l = this._events[type].length;

		if ( !l ) {
			return;
		}

		for ( ; i < l; i++ ) {
			this._events[type][i].apply(this, [].slice.call(arguments, 1));
		}
	},

	scrollBy: function (x, y, time, easing) {
		x = this.x + x;
		y = this.y + y;
		time = time || 0;

		this.scrollTo(x, y, time, easing);
	},

	scrollTo: function (x, y, time, easing) {
		easing = easing || utils.ease.circular;

		this.isInTransition = this.options.useTransition && time > 0;

		if ( !time || (this.options.useTransition && easing.style) ) {
			this._transitionTimingFunction(easing.style);
			this._transitionTime(time);
			this._translate(x, y);
		} else {
			this._animate(x, y, time, easing.fn);
		}
	},

	scrollToElement: function (el, time, offsetX, offsetY, easing) {
		el = el.nodeType ? el : this.scroller.querySelector(el);

		if ( !el ) {
			return;
		}

		var pos = utils.offset(el);

		pos.left -= this.wrapperOffset.left;
		pos.top  -= this.wrapperOffset.top;

		// if offsetX/Y are true we center the element to the screen
		if ( offsetX === true ) {
			offsetX = Math.round(el.offsetWidth / 2 - this.wrapper.offsetWidth / 2);
		}
		if ( offsetY === true ) {
			offsetY = Math.round(el.offsetHeight / 2 - this.wrapper.offsetHeight / 2);
		}

		pos.left -= offsetX || 0;
		pos.top  -= offsetY || 0;

		pos.left = pos.left > 0 ? 0 : pos.left < this.maxScrollX ? this.maxScrollX : pos.left;
		pos.top  = pos.top  > 0 ? 0 : pos.top  < this.maxScrollY ? this.maxScrollY : pos.top;

		time = time === undefined || time === null || time === 'auto' ? Math.max(Math.abs(this.x-pos.left), Math.abs(this.y-pos.top)) : time;

		this.scrollTo(pos.left, pos.top, time, easing);
	},

	_transitionTime: function (time) {
		time = time || 0;

		this.scrollerStyle[utils.style.transitionDuration] = time + 'ms';

		if ( !time && utils.isBadAndroid ) {
			this.scrollerStyle[utils.style.transitionDuration] = '0.001s';
		}


		if ( this.indicators ) {
			for ( var i = this.indicators.length; i--; ) {
				this.indicators[i].transitionTime(time);
			}
		}


// INSERT POINT: _transitionTime

	},

	_transitionTimingFunction: function (easing) {
		this.scrollerStyle[utils.style.transitionTimingFunction] = easing;


		if ( this.indicators ) {
			for ( var i = this.indicators.length; i--; ) {
				this.indicators[i].transitionTimingFunction(easing);
			}
		}


// INSERT POINT: _transitionTimingFunction

	},

	_translate: function (x, y) {
		if ( this.options.useTransform ) {

/* REPLACE START: _translate */

			this.scrollerStyle[utils.style.transform] = 'translate(' + x + 'px,' + y + 'px)' + this.translateZ;

/* REPLACE END: _translate */

		} else {
			x = Math.round(x);
			y = Math.round(y);
			this.scrollerStyle.left = x + 'px';
			this.scrollerStyle.top = y + 'px';
		}

		this.x = x;
		this.y = y;


	if ( this.indicators ) {
		for ( var i = this.indicators.length; i--; ) {
			this.indicators[i].updatePosition();
		}
	}


// INSERT POINT: _translate

	},

	_initEvents: function (remove) {
		var eventType = remove ? utils.removeEvent : utils.addEvent,
			target = this.options.bindToWrapper ? this.wrapper : window;

		eventType(window, 'orientationchange', this);
		eventType(window, 'resize', this);

		if ( this.options.click ) {
			eventType(this.wrapper, 'click', this, true);
		}

		if ( !this.options.disableMouse ) {
			eventType(this.wrapper, 'mousedown', this);
			eventType(target, 'mousemove', this);
			eventType(target, 'mousecancel', this);
			eventType(target, 'mouseup', this);
		}

		if ( utils.hasPointer && !this.options.disablePointer ) {
			eventType(this.wrapper, 'MSPointerDown', this);
			eventType(target, 'MSPointerMove', this);
			eventType(target, 'MSPointerCancel', this);
			eventType(target, 'MSPointerUp', this);
		}

		if ( utils.hasTouch && !this.options.disableTouch ) {
			eventType(this.wrapper, 'touchstart', this);
			eventType(target, 'touchmove', this);
			eventType(target, 'touchcancel', this);
			eventType(target, 'touchend', this);
		}

		eventType(this.scroller, 'transitionend', this);
		eventType(this.scroller, 'webkitTransitionEnd', this);
		eventType(this.scroller, 'oTransitionEnd', this);
		eventType(this.scroller, 'MSTransitionEnd', this);
	},

	getComputedPosition: function () {
		var matrix = window.getComputedStyle(this.scroller, null),
			x, y;

		if ( this.options.useTransform ) {
			matrix = matrix[utils.style.transform].split(')')[0].split(', ');
			x = +(matrix[12] || matrix[4]);
			y = +(matrix[13] || matrix[5]);
		} else {
			x = +matrix.left.replace(/[^-\d.]/g, '');
			y = +matrix.top.replace(/[^-\d.]/g, '');
		}

		return { x: x, y: y };
	},

	_initIndicators: function () {
		var interactive = this.options.interactiveScrollbars,
			customStyle = typeof this.options.scrollbars != 'string',
			indicators = [],
			indicator;

		var that = this;

		this.indicators = [];

		if ( this.options.scrollbars ) {
			// Vertical scrollbar
			if ( this.options.scrollY ) {
				indicator = {
					el: createDefaultScrollbar('v', interactive, this.options.scrollbars),
					interactive: interactive,
					defaultScrollbars: true,
					customStyle: customStyle,
					resize: this.options.resizeScrollbars,
					shrink: this.options.shrinkScrollbars,
					fade: this.options.fadeScrollbars,
					listenX: false
				};

				this.wrapper.appendChild(indicator.el);
				indicators.push(indicator);
			}

			// Horizontal scrollbar
			if ( this.options.scrollX ) {
				indicator = {
					el: createDefaultScrollbar('h', interactive, this.options.scrollbars),
					interactive: interactive,
					defaultScrollbars: true,
					customStyle: customStyle,
					resize: this.options.resizeScrollbars,
					shrink: this.options.shrinkScrollbars,
					fade: this.options.fadeScrollbars,
					listenY: false
				};

				this.wrapper.appendChild(indicator.el);
				indicators.push(indicator);
			}
		}

		if ( this.options.indicators ) {
			// TODO: check concat compatibility
			indicators = indicators.concat(this.options.indicators);
		}

		for ( var i = indicators.length; i--; ) {
			this.indicators.push( new Indicator(this, indicators[i]) );
		}

		// TODO: check if we can use array.map (wide compatibility and performance issues)
		function _indicatorsMap (fn) {
			for ( var i = that.indicators.length; i--; ) {
				fn.call(that.indicators[i]);
			}
		}

		if ( this.options.fadeScrollbars ) {
			this.on('scrollEnd', function () {
				_indicatorsMap(function () {
					this.fade();
				});
			});

			this.on('scrollCancel', function () {
				_indicatorsMap(function () {
					this.fade();
				});
			});

			this.on('scrollStart', function () {
				_indicatorsMap(function () {
					this.fade(1);
				});
			});

			this.on('beforeScrollStart', function () {
				_indicatorsMap(function () {
					this.fade(1, true);
				});
			});
		}


		this.on('refresh', function () {
			_indicatorsMap(function () {
				this.refresh();
			});
		});

		this.on('destroy', function () {
			_indicatorsMap(function () {
				this.destroy();
			});

			delete this.indicators;
		});
	},

	_initWheel: function () {
		utils.addEvent(this.wrapper, 'wheel', this);
		utils.addEvent(this.wrapper, 'mousewheel', this);
		utils.addEvent(this.wrapper, 'DOMMouseScroll', this);

		this.on('destroy', function () {
			utils.removeEvent(this.wrapper, 'wheel', this);
			utils.removeEvent(this.wrapper, 'mousewheel', this);
			utils.removeEvent(this.wrapper, 'DOMMouseScroll', this);
		});
	},

	_wheel: function (e) {
		if ( !this.enabled ) {
			return;
		}

		e.preventDefault();
		e.stopPropagation();

		var wheelDeltaX, wheelDeltaY,
			newX, newY,
			that = this;

		if ( this.wheelTimeout === undefined ) {
			that._execEvent('scrollStart');
		}

		// Execute the scrollEnd event after 400ms the wheel stopped scrolling
		clearTimeout(this.wheelTimeout);
		this.wheelTimeout = setTimeout(function () {
			that._execEvent('scrollEnd');
			that.wheelTimeout = undefined;
		}, 400);

		if ( 'deltaX' in e ) {
			wheelDeltaX = -e.deltaX;
			wheelDeltaY = -e.deltaY;
		} else if ( 'wheelDeltaX' in e ) {
			wheelDeltaX = e.wheelDeltaX / 120 * this.options.mouseWheelSpeed;
			wheelDeltaY = e.wheelDeltaY / 120 * this.options.mouseWheelSpeed;
		} else if ( 'wheelDelta' in e ) {
			wheelDeltaX = wheelDeltaY = e.wheelDelta / 120 * this.options.mouseWheelSpeed;
		} else if ( 'detail' in e ) {
			wheelDeltaX = wheelDeltaY = -e.detail / 3 * this.options.mouseWheelSpeed;
		} else {
			return;
		}

		wheelDeltaX *= this.options.invertWheelDirection;
		wheelDeltaY *= this.options.invertWheelDirection;

		if ( !this.hasVerticalScroll ) {
			wheelDeltaX = wheelDeltaY;
			wheelDeltaY = 0;
		}

		if ( this.options.snap ) {
			newX = this.currentPage.pageX;
			newY = this.currentPage.pageY;

			if ( wheelDeltaX > 0 ) {
				newX--;
			} else if ( wheelDeltaX < 0 ) {
				newX++;
			}

			if ( wheelDeltaY > 0 ) {
				newY--;
			} else if ( wheelDeltaY < 0 ) {
				newY++;
			}

			this.goToPage(newX, newY);

			return;
		}

		newX = this.x + Math.round(this.hasHorizontalScroll ? wheelDeltaX : 0);
		newY = this.y + Math.round(this.hasVerticalScroll ? wheelDeltaY : 0);

		if ( newX > 0 ) {
			newX = 0;
		} else if ( newX < this.maxScrollX ) {
			newX = this.maxScrollX;
		}

		if ( newY > 0 ) {
			newY = 0;
		} else if ( newY < this.maxScrollY ) {
			newY = this.maxScrollY;
		}

		this.scrollTo(newX, newY, 0);

// INSERT POINT: _wheel
	},

	_initSnap: function () {
		this.currentPage = {};

		if ( typeof this.options.snap == 'string' ) {
			this.options.snap = this.scroller.querySelectorAll(this.options.snap);
		}

		this.on('refresh', function () {
			var i = 0, l,
				m = 0, n,
				cx, cy,
				x = 0, y,
				stepX = this.options.snapStepX || this.wrapperWidth,
				stepY = this.options.snapStepY || this.wrapperHeight,
				el;

			this.pages = [];

			if ( !this.wrapperWidth || !this.wrapperHeight || !this.scrollerWidth || !this.scrollerHeight ) {
				return;
			}

			if ( this.options.snap === true ) {
				cx = Math.round( stepX / 2 );
				cy = Math.round( stepY / 2 );

				while ( x > -this.scrollerWidth ) {
					this.pages[i] = [];
					l = 0;
					y = 0;

					while ( y > -this.scrollerHeight ) {
						this.pages[i][l] = {
							x: Math.max(x, this.maxScrollX),
							y: Math.max(y, this.maxScrollY),
							width: stepX,
							height: stepY,
							cx: x - cx,
							cy: y - cy
						};

						y -= stepY;
						l++;
					}

					x -= stepX;
					i++;
				}
			} else {
				el = this.options.snap;
				l = el.length;
				n = -1;

				for ( ; i < l; i++ ) {
					if ( i === 0 || el[i].offsetLeft <= el[i-1].offsetLeft ) {
						m = 0;
						n++;
					}

					if ( !this.pages[m] ) {
						this.pages[m] = [];
					}

					x = Math.max(-el[i].offsetLeft, this.maxScrollX);
					y = Math.max(-el[i].offsetTop, this.maxScrollY);
					cx = x - Math.round(el[i].offsetWidth / 2);
					cy = y - Math.round(el[i].offsetHeight / 2);

					this.pages[m][n] = {
						x: x,
						y: y,
						width: el[i].offsetWidth,
						height: el[i].offsetHeight,
						cx: cx,
						cy: cy
					};

					if ( x > this.maxScrollX ) {
						m++;
					}
				}
			}

			this.goToPage(this.currentPage.pageX || 0, this.currentPage.pageY || 0, 0);

			// Update snap threshold if needed
			if ( this.options.snapThreshold % 1 === 0 ) {
				this.snapThresholdX = this.options.snapThreshold;
				this.snapThresholdY = this.options.snapThreshold;
			} else {
				this.snapThresholdX = Math.round(this.pages[this.currentPage.pageX][this.currentPage.pageY].width * this.options.snapThreshold);
				this.snapThresholdY = Math.round(this.pages[this.currentPage.pageX][this.currentPage.pageY].height * this.options.snapThreshold);
			}
		});

		this.on('flick', function () {
			var time = this.options.snapSpeed || Math.max(
					Math.max(
						Math.min(Math.abs(this.x - this.startX), 1000),
						Math.min(Math.abs(this.y - this.startY), 1000)
					), 300);

			this.goToPage(
				this.currentPage.pageX + this.directionX,
				this.currentPage.pageY + this.directionY,
				time
			);
		});
	},

	_nearestSnap: function (x, y) {
		if ( !this.pages.length ) {
			return { x: 0, y: 0, pageX: 0, pageY: 0 };
		}

		var i = 0,
			l = this.pages.length,
			m = 0;

		// Check if we exceeded the snap threshold
		if ( Math.abs(x - this.absStartX) < this.snapThresholdX &&
			Math.abs(y - this.absStartY) < this.snapThresholdY ) {
			return this.currentPage;
		}

		if ( x > 0 ) {
			x = 0;
		} else if ( x < this.maxScrollX ) {
			x = this.maxScrollX;
		}

		if ( y > 0 ) {
			y = 0;
		} else if ( y < this.maxScrollY ) {
			y = this.maxScrollY;
		}

		for ( ; i < l; i++ ) {
			if ( x >= this.pages[i][0].cx ) {
				x = this.pages[i][0].x;
				break;
			}
		}

		l = this.pages[i].length;

		for ( ; m < l; m++ ) {
			if ( y >= this.pages[0][m].cy ) {
				y = this.pages[0][m].y;
				break;
			}
		}

		if ( i == this.currentPage.pageX ) {
			i += this.directionX;

			if ( i < 0 ) {
				i = 0;
			} else if ( i >= this.pages.length ) {
				i = this.pages.length - 1;
			}

			x = this.pages[i][0].x;
		}

		if ( m == this.currentPage.pageY ) {
			m += this.directionY;

			if ( m < 0 ) {
				m = 0;
			} else if ( m >= this.pages[0].length ) {
				m = this.pages[0].length - 1;
			}

			y = this.pages[0][m].y;
		}

		return {
			x: x,
			y: y,
			pageX: i,
			pageY: m
		};
	},

	goToPage: function (x, y, time, easing) {

    if (!this.pages || this.pages.length === 0) {
      console.warn('[IScroll.goToPage] Can\'t got to page, page count is 0');
      return;
    }

    easing = easing || this.options.bounceEasing;

		if ( x >= this.pages.length ) {
			x = this.pages.length - 1;
		} else if ( x < 0 ) {
			x = 0;
		}

		if ( y >= this.pages[x].length ) {
			y = this.pages[x].length - 1;
		} else if ( y < 0 ) {
			y = 0;
		}

		var posX = this.pages[x][y].x,
			posY = this.pages[x][y].y;

		time = time === undefined ? this.options.snapSpeed || Math.max(
			Math.max(
				Math.min(Math.abs(posX - this.x), 1000),
				Math.min(Math.abs(posY - this.y), 1000)
			), 300) : time;

		this.currentPage = {
			x: posX,
			y: posY,
			pageX: x,
			pageY: y
		};

		this.scrollTo(posX, posY, time, easing);
	},

	next: function (time, easing) {
		var x = this.currentPage.pageX,
			y = this.currentPage.pageY;

		x++;

		if ( x >= this.pages.length && this.hasVerticalScroll ) {
			x = 0;
			y++;
		}

		this.goToPage(x, y, time, easing);
	},

	prev: function (time, easing) {
		var x = this.currentPage.pageX,
			y = this.currentPage.pageY;

		x--;

		if ( x < 0 && this.hasVerticalScroll ) {
			x = 0;
			y--;
		}

		this.goToPage(x, y, time, easing);
	},

	_initKeys: function (e) {
		// default key bindings
		var keys = {
			pageUp: 33,
			pageDown: 34,
			end: 35,
			home: 36,
			left: 37,
			up: 38,
			right: 39,
			down: 40
		};
		var i;

		// if you give me characters I give you keycode
		if ( typeof this.options.keyBindings == 'object' ) {
			for ( i in this.options.keyBindings ) {
				if ( typeof this.options.keyBindings[i] == 'string' ) {
					this.options.keyBindings[i] = this.options.keyBindings[i].toUpperCase().charCodeAt(0);
				}
			}
		} else {
			this.options.keyBindings = {};
		}

		for ( i in keys ) {
			this.options.keyBindings[i] = this.options.keyBindings[i] || keys[i];
		}

		utils.addEvent(window, 'keydown', this);

		this.on('destroy', function () {
			utils.removeEvent(window, 'keydown', this);
		});
	},

	_key: function (e) {
		if ( !this.enabled ) {
			return;
		}

		var snap = this.options.snap,	// we are using this alot, better to cache it
			newX = snap ? this.currentPage.pageX : this.x,
			newY = snap ? this.currentPage.pageY : this.y,
			now = utils.getTime(),
			prevTime = this.keyTime || 0,
			acceleration = 0.250,
			pos;

		if ( this.options.useTransition && this.isInTransition ) {
			pos = this.getComputedPosition();

			this._translate(Math.round(pos.x), Math.round(pos.y));
			this.isInTransition = false;
		}

		this.keyAcceleration = now - prevTime < 200 ? Math.min(this.keyAcceleration + acceleration, 50) : 0;

		switch ( e.keyCode ) {
			case this.options.keyBindings.pageUp:
				if ( this.hasHorizontalScroll && !this.hasVerticalScroll ) {
					newX += snap ? 1 : this.wrapperWidth;
				} else {
					newY += snap ? 1 : this.wrapperHeight;
				}
				break;
			case this.options.keyBindings.pageDown:
				if ( this.hasHorizontalScroll && !this.hasVerticalScroll ) {
					newX -= snap ? 1 : this.wrapperWidth;
				} else {
					newY -= snap ? 1 : this.wrapperHeight;
				}
				break;
			case this.options.keyBindings.end:
				newX = snap ? this.pages.length-1 : this.maxScrollX;
				newY = snap ? this.pages[0].length-1 : this.maxScrollY;
				break;
			case this.options.keyBindings.home:
				newX = 0;
				newY = 0;
				break;
			case this.options.keyBindings.left:
				newX += snap ? -1 : 5 + this.keyAcceleration>>0;
				break;
			case this.options.keyBindings.up:
				newY += snap ? 1 : 5 + this.keyAcceleration>>0;
				break;
			case this.options.keyBindings.right:
				newX -= snap ? -1 : 5 + this.keyAcceleration>>0;
				break;
			case this.options.keyBindings.down:
				newY -= snap ? 1 : 5 + this.keyAcceleration>>0;
				break;
			default:
				return;
		}

		if ( snap ) {
			this.goToPage(newX, newY);
			return;
		}

		if ( newX > 0 ) {
			newX = 0;
			this.keyAcceleration = 0;
		} else if ( newX < this.maxScrollX ) {
			newX = this.maxScrollX;
			this.keyAcceleration = 0;
		}

		if ( newY > 0 ) {
			newY = 0;
			this.keyAcceleration = 0;
		} else if ( newY < this.maxScrollY ) {
			newY = this.maxScrollY;
			this.keyAcceleration = 0;
		}

		this.scrollTo(newX, newY, 0);

		this.keyTime = now;
	},

	_animate: function (destX, destY, duration, easingFn) {
		var that = this,
			startX = this.x,
			startY = this.y,
			startTime = utils.getTime(),
			destTime = startTime + duration;

		function step () {
			var now = utils.getTime(),
				newX, newY,
				easing;

			if ( now >= destTime ) {
				that.isAnimating = false;
				that._translate(destX, destY);

				if ( !that.resetPosition(that.options.bounceTime) ) {
					that._execEvent('scrollEnd');
				}

				return;
			}

			now = ( now - startTime ) / duration;
			easing = easingFn(now);
			newX = ( destX - startX ) * easing + startX;
			newY = ( destY - startY ) * easing + startY;
			that._translate(newX, newY);

			if ( that.isAnimating ) {
				rAF(step);
			}
		}

		this.isAnimating = true;
		step();
	},
	handleEvent: function (e) {
		switch ( e.type ) {
			case 'touchstart':
			case 'MSPointerDown':
			case 'mousedown':
				this._start(e);
				break;
			case 'touchmove':
			case 'MSPointerMove':
			case 'mousemove':
				this._move(e);
				break;
			case 'touchend':
			case 'MSPointerUp':
			case 'mouseup':
			case 'touchcancel':
			case 'MSPointerCancel':
			case 'mousecancel':
				this._end(e);
				break;
			case 'orientationchange':
			case 'resize':
				this._resize();
				break;
			case 'transitionend':
			case 'webkitTransitionEnd':
			case 'oTransitionEnd':
			case 'MSTransitionEnd':
				this._transitionEnd(e);
				break;
			case 'wheel':
			case 'DOMMouseScroll':
			case 'mousewheel':
				this._wheel(e);
				break;
			case 'keydown':
				this._key(e);
				break;
			case 'click':
				if ( !e._constructed ) {
					e.preventDefault();
					e.stopPropagation();
				}
				break;
		}
	}
};
function createDefaultScrollbar (direction, interactive, type) {
	var scrollbar = document.createElement('div'),
		indicator = document.createElement('div');

	if ( type === true ) {
		scrollbar.style.cssText = 'position:absolute;z-index:9999';
		indicator.style.cssText = '-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;position:absolute;background:rgba(0,0,0,0.5);border:1px solid rgba(255,255,255,0.9);border-radius:3px';
	}

	indicator.className = 'iScrollIndicator';

	if ( direction == 'h' ) {
		if ( type === true ) {
			scrollbar.style.cssText += ';height:7px;left:2px;right:2px;bottom:0';
			indicator.style.height = '100%';
		}
		scrollbar.className = 'iScrollHorizontalScrollbar';
	} else {
		if ( type === true ) {
			scrollbar.style.cssText += ';width:7px;bottom:2px;top:2px;right:1px';
			indicator.style.width = '100%';
		}
		scrollbar.className = 'iScrollVerticalScrollbar';
	}

	scrollbar.style.cssText += ';overflow:hidden';

	if ( !interactive ) {
		scrollbar.style.pointerEvents = 'none';
	}

	scrollbar.appendChild(indicator);

	return scrollbar;
}

function Indicator (scroller, options) {
	this.wrapper = typeof options.el == 'string' ? document.querySelector(options.el) : options.el;
	this.wrapperStyle = this.wrapper.style;
	this.indicator = this.wrapper.children[0];
	this.indicatorStyle = this.indicator.style;
	this.scroller = scroller;

	this.options = {
		listenX: true,
		listenY: true,
		interactive: false,
		resize: true,
		defaultScrollbars: false,
		shrink: false,
		fade: false,
		speedRatioX: 0,
		speedRatioY: 0
	};

	for ( var i in options ) {
		this.options[i] = options[i];
	}

	this.sizeRatioX = 1;
	this.sizeRatioY = 1;
	this.maxPosX = 0;
	this.maxPosY = 0;

	if ( this.options.interactive ) {
		if ( !this.options.disableTouch ) {
			utils.addEvent(this.indicator, 'touchstart', this);
			utils.addEvent(window, 'touchend', this);
		}
		if ( !this.options.disablePointer ) {
			utils.addEvent(this.indicator, 'MSPointerDown', this);
			utils.addEvent(window, 'MSPointerUp', this);
		}
		if ( !this.options.disableMouse ) {
			utils.addEvent(this.indicator, 'mousedown', this);
			utils.addEvent(window, 'mouseup', this);
		}
	}

	if ( this.options.fade ) {
		this.wrapperStyle[utils.style.transform] = this.scroller.translateZ;
		this.wrapperStyle[utils.style.transitionDuration] = utils.isBadAndroid ? '0.001s' : '0ms';
		this.wrapperStyle.opacity = '0';
	}
}

Indicator.prototype = {
	handleEvent: function (e) {
		switch ( e.type ) {
			case 'touchstart':
			case 'MSPointerDown':
			case 'mousedown':
				this._start(e);
				break;
			case 'touchmove':
			case 'MSPointerMove':
			case 'mousemove':
				this._move(e);
				break;
			case 'touchend':
			case 'MSPointerUp':
			case 'mouseup':
			case 'touchcancel':
			case 'MSPointerCancel':
			case 'mousecancel':
				this._end(e);
				break;
		}
	},

	destroy: function () {
		if ( this.options.interactive ) {
			utils.removeEvent(this.indicator, 'touchstart', this);
			utils.removeEvent(this.indicator, 'MSPointerDown', this);
			utils.removeEvent(this.indicator, 'mousedown', this);

			utils.removeEvent(window, 'touchmove', this);
			utils.removeEvent(window, 'MSPointerMove', this);
			utils.removeEvent(window, 'mousemove', this);

			utils.removeEvent(window, 'touchend', this);
			utils.removeEvent(window, 'MSPointerUp', this);
			utils.removeEvent(window, 'mouseup', this);
		}

		if ( this.options.defaultScrollbars ) {
			this.wrapper.parentNode.removeChild(this.wrapper);
		}
	},

	_start: function (e) {
		var point = e.touches ? e.touches[0] : e;

		e.preventDefault();
		e.stopPropagation();

		this.transitionTime();

		this.initiated = true;
		this.moved = false;
		this.lastPointX	= point.pageX;
		this.lastPointY	= point.pageY;

		this.startTime	= utils.getTime();

		if ( !this.options.disableTouch ) {
			utils.addEvent(window, 'touchmove', this);
		}
		if ( !this.options.disablePointer ) {
			utils.addEvent(window, 'MSPointerMove', this);
		}
		if ( !this.options.disableMouse ) {
			utils.addEvent(window, 'mousemove', this);
		}

		this.scroller._execEvent('beforeScrollStart');
	},

	_move: function (e) {
		var point = e.touches ? e.touches[0] : e,
			deltaX, deltaY,
			newX, newY,
			timestamp = utils.getTime();

		if ( !this.moved ) {
			this.scroller._execEvent('scrollStart');
		}

		this.moved = true;

		deltaX = point.pageX - this.lastPointX;
		this.lastPointX = point.pageX;

		deltaY = point.pageY - this.lastPointY;
		this.lastPointY = point.pageY;

		newX = this.x + deltaX;
		newY = this.y + deltaY;

		this._pos(newX, newY);

// INSERT POINT: indicator._move

		e.preventDefault();
		e.stopPropagation();
	},

	_end: function (e) {
		if ( !this.initiated ) {
			return;
		}

		this.initiated = false;

		e.preventDefault();
		e.stopPropagation();

		utils.removeEvent(window, 'touchmove', this);
		utils.removeEvent(window, 'MSPointerMove', this);
		utils.removeEvent(window, 'mousemove', this);

		if ( this.scroller.options.snap ) {
			var snap = this.scroller._nearestSnap(this.scroller.x, this.scroller.y);

			var time = this.options.snapSpeed || Math.max(
					Math.max(
						Math.min(Math.abs(this.scroller.x - snap.x), 1000),
						Math.min(Math.abs(this.scroller.y - snap.y), 1000)
					), 300);

			if ( this.scroller.x != snap.x || this.scroller.y != snap.y ) {
				this.scroller.directionX = 0;
				this.scroller.directionY = 0;
				this.scroller.currentPage = snap;
				this.scroller.scrollTo(snap.x, snap.y, time, this.scroller.options.bounceEasing);
			}
		}

		if ( this.moved ) {
			this.scroller._execEvent('scrollEnd');
		}
	},

	transitionTime: function (time) {
		time = time || 0;
		this.indicatorStyle[utils.style.transitionDuration] = time + 'ms';

		if ( !time && utils.isBadAndroid ) {
			this.indicatorStyle[utils.style.transitionDuration] = '0.001s';
		}
	},

	transitionTimingFunction: function (easing) {
		this.indicatorStyle[utils.style.transitionTimingFunction] = easing;
	},

	refresh: function () {
		this.transitionTime();

		if ( this.options.listenX && !this.options.listenY ) {
			this.indicatorStyle.display = this.scroller.hasHorizontalScroll ? 'block' : 'none';
		} else if ( this.options.listenY && !this.options.listenX ) {
			this.indicatorStyle.display = this.scroller.hasVerticalScroll ? 'block' : 'none';
		} else {
			this.indicatorStyle.display = this.scroller.hasHorizontalScroll || this.scroller.hasVerticalScroll ? 'block' : 'none';
		}

		if ( this.scroller.hasHorizontalScroll && this.scroller.hasVerticalScroll ) {
			utils.addClass(this.wrapper, 'iScrollBothScrollbars');
			utils.removeClass(this.wrapper, 'iScrollLoneScrollbar');

			if ( this.options.defaultScrollbars && this.options.customStyle ) {
				if ( this.options.listenX ) {
					this.wrapper.style.right = '8px';
				} else {
					this.wrapper.style.bottom = '8px';
				}
			}
		} else {
			utils.removeClass(this.wrapper, 'iScrollBothScrollbars');
			utils.addClass(this.wrapper, 'iScrollLoneScrollbar');

			if ( this.options.defaultScrollbars && this.options.customStyle ) {
				if ( this.options.listenX ) {
					this.wrapper.style.right = '2px';
				} else {
					this.wrapper.style.bottom = '2px';
				}
			}
		}

		var r = this.wrapper.offsetHeight;	// force refresh

		if ( this.options.listenX ) {
			this.wrapperWidth = this.wrapper.clientWidth;
			if ( this.options.resize ) {
				this.indicatorWidth = Math.max(Math.round(this.wrapperWidth * this.wrapperWidth / (this.scroller.scrollerWidth || this.wrapperWidth || 1)), 8);
				this.indicatorStyle.width = this.indicatorWidth + 'px';
			} else {
				this.indicatorWidth = this.indicator.clientWidth;
			}

			this.maxPosX = this.wrapperWidth - this.indicatorWidth;

			if ( this.options.shrink == 'clip' ) {
				this.minBoundaryX = -this.indicatorWidth + 8;
				this.maxBoundaryX = this.wrapperWidth - 8;
			} else {
				this.minBoundaryX = 0;
				this.maxBoundaryX = this.maxPosX;
			}

			this.sizeRatioX = this.options.speedRatioX || (this.scroller.maxScrollX && (this.maxPosX / this.scroller.maxScrollX));	
		}

		if ( this.options.listenY ) {
			this.wrapperHeight = this.wrapper.clientHeight;
			if ( this.options.resize ) {
				this.indicatorHeight = Math.max(Math.round(this.wrapperHeight * this.wrapperHeight / (this.scroller.scrollerHeight || this.wrapperHeight || 1)), 8);
				this.indicatorStyle.height = this.indicatorHeight + 'px';
			} else {
				this.indicatorHeight = this.indicator.clientHeight;
			}

			this.maxPosY = this.wrapperHeight - this.indicatorHeight;

			if ( this.options.shrink == 'clip' ) {
				this.minBoundaryY = -this.indicatorHeight + 8;
				this.maxBoundaryY = this.wrapperHeight - 8;
			} else {
				this.minBoundaryY = 0;
				this.maxBoundaryY = this.maxPosY;
			}

			this.maxPosY = this.wrapperHeight - this.indicatorHeight;
			this.sizeRatioY = this.options.speedRatioY || (this.scroller.maxScrollY && (this.maxPosY / this.scroller.maxScrollY));
		}

		this.updatePosition();
	},

	updatePosition: function () {
		var x = this.options.listenX && Math.round(this.sizeRatioX * this.scroller.x) || 0,
			y = this.options.listenY && Math.round(this.sizeRatioY * this.scroller.y) || 0;

		if ( !this.options.ignoreBoundaries ) {
			if ( x < this.minBoundaryX ) {
				if ( this.options.shrink == 'scale' ) {
					this.width = Math.max(this.indicatorWidth + x, 8);
					this.indicatorStyle.width = this.width + 'px';
				}
				x = this.minBoundaryX;
			} else if ( x > this.maxBoundaryX ) {
				if ( this.options.shrink == 'scale' ) {
					this.width = Math.max(this.indicatorWidth - (x - this.maxPosX), 8);
					this.indicatorStyle.width = this.width + 'px';
					x = this.maxPosX + this.indicatorWidth - this.width;
				} else {
					x = this.maxBoundaryX;
				}
			} else if ( this.options.shrink == 'scale' && this.width != this.indicatorWidth ) {
				this.width = this.indicatorWidth;
				this.indicatorStyle.width = this.width + 'px';
			}

			if ( y < this.minBoundaryY ) {
				if ( this.options.shrink == 'scale' ) {
					this.height = Math.max(this.indicatorHeight + y * 3, 8);
					this.indicatorStyle.height = this.height + 'px';
				}
				y = this.minBoundaryY;
			} else if ( y > this.maxBoundaryY ) {
				if ( this.options.shrink == 'scale' ) {
					this.height = Math.max(this.indicatorHeight - (y - this.maxPosY) * 3, 8);
					this.indicatorStyle.height = this.height + 'px';
					y = this.maxPosY + this.indicatorHeight - this.height;
				} else {
					y = this.maxBoundaryY;
				}
			} else if ( this.options.shrink == 'scale' && this.height != this.indicatorHeight ) {
				this.height = this.indicatorHeight;
				this.indicatorStyle.height = this.height + 'px';
			}
		}

		this.x = x;
		this.y = y;

		if ( this.scroller.options.useTransform ) {
			this.indicatorStyle[utils.style.transform] = 'translate(' + x + 'px,' + y + 'px)' + this.scroller.translateZ;
		} else {
			this.indicatorStyle.left = x + 'px';
			this.indicatorStyle.top = y + 'px';
		}
	},

	_pos: function (x, y) {
		if ( x < 0 ) {
			x = 0;
		} else if ( x > this.maxPosX ) {
			x = this.maxPosX;
		}

		if ( y < 0 ) {
			y = 0;
		} else if ( y > this.maxPosY ) {
			y = this.maxPosY;
		}

		x = this.options.listenX ? Math.round(x / this.sizeRatioX) : this.scroller.x;
		y = this.options.listenY ? Math.round(y / this.sizeRatioY) : this.scroller.y;

		this.scroller.scrollTo(x, y);
	},

	fade: function (val, hold) {
		if ( hold && !this.visible ) {
			return;
		}

		clearTimeout(this.fadeTimeout);
		this.fadeTimeout = null;

		var time = val ? 250 : 500,
			delay = val ? 0 : 300;

		val = val ? '1' : '0';

		this.wrapperStyle[utils.style.transitionDuration] = time + 'ms';

		this.fadeTimeout = setTimeout((function (val) {
			this.wrapperStyle.opacity = val;
			this.visible = +val;
		}).bind(this, val), delay);
	}
};

IScroll.utils = utils;

if ( typeof module != 'undefined' && module.exports ) {
	module.exports = IScroll;
} else {
	window.IScroll = IScroll;
}

})(window, document, Math);
define("iscroll", (function (global) {
    return function () {
        var ret, fn;
        return ret || global.iScroll;
    };
}(this)));

// Filename: views/cards-view
define('views/login-view',[
  'jquery',
  'underscore',
  'backbone',
  'plugins/text!templates/login.html',
  'plugins/text!templates/account-create.html',
  'plugins/text!templates/login-forgot.html',
  'plugins/text!templates/header.html',
  'models/user',
  'models/credential',
  'app',
  'iscroll'
], function($, _, Backbone, template, tmplCreate, tmplForgot, tmplHeader, User, Credential, app, iScroll){

	var STATE = {
		LOGIN: 'login',
		CREATE: 'create',
		FORGOT: 'forgot'
	}

	var EmailModel = Backbone.Model.extend({
		validation : {
			email : {
				required : true,
				pattern : "email"
			}
		}
	});

  var View = Backbone.View.extend({
  	
  	events: {
  		"submit form" : "submit",
  		"tap .submit" : "submit",
  		"tap .toggle-state" : "toggleCreate",
  		"tap .toggle-forgot" : "toggleForgot",
			"tap .toggle": "toggle"  		
  	},

  	initialize: function() {    	
    	this.state = this.options.state || STATE.CREATE;
    	this.callback = _.bind(function(user) {
    		try {
	    		// Run passed in callback if needed
	    		this.options.callback && this.options.callback(user);
	    	} finally {
				if ( this.options.redirect ) {
					app.popView(app.fx.None);
					app.router.navigate(this.options.redirect, {trigger: true, replace: true});
				} else {
		  			window.history.back();
				}
			}
    	}, this);
  	},
  	
    render: function(){
    	console.log("render:LoginView");
    	Backbone.Validation.unbind(this);

    	var renderTemplate; 
    	switch ( this.state ) {
    		case STATE.FORGOT:
	    		this.model = new EmailModel();
	    		renderTemplate = tmplForgot;
	    		break;
    		case STATE.LOGIN:
	    		this.model = new Credential();
	    		renderTemplate = template;
	    		break;
	    	default:
	    		this.model = new User();
	    		renderTemplate = tmplCreate;
	    		break;
    	}
    	
    	Backbone.Validation.bind(this);
  		compiledTemplate = _.template( renderTemplate, {
  			redirect: this.options.redirect,
  			settings: $settings
  		} );

      // Append our compiled template to this Views "el"
      this.$el.html( compiledTemplate );
      
			this.renderHeader();

    },
    
		renderHeader : function() {
			// Using Underscore we can compile our template with data
			var compiledTemplate = _.template(tmplHeader, {
				left: _.tr('Back'),
				venue: app.currentVenue && app.currentVenue.toJSON()
			});
			// Append our compiled template to this Views "el"
			if ( this.$("header") ) {
				this.$("header").remove();
			}
			this.$(".content").before(compiledTemplate);
		},

		toggleState: function(toggleState, defaultState) {
			this.state = this.state === toggleState ? defaultState : toggleState;

			// Hide and show around render to force paint on IOS 5.1
			// Shows blank if keyboard shown and toggle called
			this.$el.hide();

			// Redner the new state
			this.render();

			// Show new content
			this.$el.show();

    	app.trigger('view:toggle', this);
		},
		
		toggleCreate: function(e) {
			e.preventDefault();
			this.toggleState(STATE.CREATE, STATE.LOGIN);
		},
		
		toggleForgot: function(e) {
			e.preventDefault();
			this.toggleState(STATE.FORGOT, STATE.LOGIN);

		},
		
		submit: function(e) {
			e.preventDefault();

			var data = this.$('form').serializeObject();
			if ( data.externalId ) {
				data.venueUser = {
					venueId: app.venueId,
					externalId: data.externalId
				}
				delete data.externalId;
			}
			if ( this.model.set(data, {validate: true}) ) {
				return this[this.state].apply(this, arguments);
			}
		},
		
		create: function() {
			app.trigger('user:create-attempt');
			// grab the user password
			var callback = this.callback;
			
			// try to create the new user
			User.create(this.model.toJSON(), {
				success: function(model, resp, options) {
					app.setUser(model);
					
					callback(model);

					app.trigger('user:create-success');
				},
				error: function(model, resp, options) {
					if ( resp.status == 409 ) {
						navigator.notification.alert(_.tr('A user with that email already exists'));
						app.trigger('user:create-denied');
					} else {
						navigator.notification.alert(_.tr('Oops. Something went wrong. Please try again.'));
						app.trigger('user:create-error');
					}
				}
						

				
			});
			
		},
		
				
    toggle: function(e) {
    	var toggle = $(e.currentTarget);
    	var name = toggle.data('toggle-for');
      // change this to set on model then have change listener toggle class
      var cBox = $("input[name='" + name + "']");
      var value = cBox.attr('value');
      value = value > 0 ? 0 : 1;
      cBox.attr('value',value);
      toggle.toggleClass('active', value > 0);
    },

		
		login: function() {
			app.trigger('user:login-attempt');
			// grab the user password
			var callback = this.callback;
			
			User.auth(this.model.toJSON(), {
				success: function(model, resp, options) {
					app.setUser(model);

					callback(model);

					app.trigger('user:login-success');
				},
				error: function(model, resp, options) {
					if ( resp.status == 401 ) {
						navigator.notification.alert(_.tr('Incorrect username or password'));
						app.trigger('user:login-denied');
					} else {
						navigator.notification.alert(_.tr('Oops. Somthing went wrong. Please try again.'));
						app.trigger('user:login-error');
					}
				}
			});
			
		},
		
		forgot: function() {
			app.trigger('user:forgot-attempt');

			var loginView = this;
			User.forgot(this.model.toJSON(), {
				success: function() {
					navigator.notification.alert(_.tr('Please check your email for further instructions on how to reset your password.'), function() {
						loginView.toggleState(STATE.FORGOT, STATE.LOGIN);
						app.trigger('user:forgot-success');
					}, 'Success');
				},
				error: function(xhr, errorType, error) {
					if ( xhr.status == 404 ) {
						navigator.notification.alert(_.tr("Sorry. We can't find that email address."));
						app.trigger('user:forgot-404');
					} else {
						navigator.notification.alert(_.tr('Oops. Somthing went wrong. Please try again.'));
						app.trigger('user:forgot-error');
					}
				}
			})
		}
  });
  
  return View;
  
});


define('plugins/text!templates/account.html',[],function () { return '<div class="bar-page-title"><%- _.tr("Profile") %></div>\r\n<div class="content with-input">\r\n\r\n\t<form id="frmProfile" style="margin: 10px;">\r\n\t\t<!--label>Profile</label-->\r\n\t\t<div class="input-group">\r\n\t\t\t<div class="input-row">\r\n\t\t\t\t<label id="account-profile-firstname-label"><%- _.tr("First Name") %></label> <input type="text" name="firstname" id="account-profile-firstname-field" autocorrect="off" autocapitalize="words" value="<%- data.firstname %>" readonly/>\r\n\t\t\t</div>\r\n\t\t\t<div class="input-row">\r\n\t\t\t\t<label id="account-profile-lastname-label"><%- _.tr("Last Name") %></label> <input type="text" name="name" id="account-profile-lastname-field" autocorrect="off" autocapitalize="words" value="<%- data.lastname %>" readonly/>\r\n\t\t\t</div>\r\n\t\t\t<div class="input-row">\r\n\t\t\t\t<label id="account-profile-email-label"><%- _.tr("Email") %></label> <input type="text" id="account-profile-email-field" value="<%- data.username %>" readonly />\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t\t<!--label>Login Details</label-->\r\n\t\t<div class="input-group">\r\n\t\t\t<div class="input-row" id="account-profile-settings">\r\n\t\t\t\t<label><%- settings.showExternalId %></label> <input type="text" name="externalId" autocorrect="off" value="<%- venueData.externalId %>" />\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t\t\r\n\t\t<a class="button-block submit" id="account-profile-update"><%- _.tr("Update") %></a>\r\n\t\t\r\n\t\t<input type="submit" class="" style="visibility: hidden"/>\r\n\t\t\r\n\t</form>\r\n\t\r\n</div>';});

// Filename: views/account-view
define('views/account-view',[
  'jquery',
  'underscore',
  'backbone',
  'plugins/text!templates/account.html',
  'plugins/text!templates/header.html',
  'models/user',
  'app'
], function($, _, Backbone, template, tmplHeader, User, app){
  var View = Backbone.View.extend({

    initialize: function(options) {
      this.listenTo(this.model.venueUser, 'sync', this.render);
    },

  	events: {
  		"submit form" : "save",
  		"tap .submit" : "save"
  	},
  	
    render: function(){
    	console.log("render:AccountView");
      var compiledTemplate = _.template( template, {
        data: this.model.user.toJSON(),
        venueData: this.model.venueUser.toJSON(),
        settings: $settings
      });
      // Append our compiled template to this Views "el"
      this.$el.html( compiledTemplate );
      
			this.renderHeader();
    },
    
		renderHeader : function() {
			// Using Underscore we can compile our template with data
			var compiledTemplate = _.template(tmplHeader, {left: _.tr('Cancel'),
				
				venue: app.currentVenue && app.currentVenue.toJSON()
			});
			// Append our compiled template to this Views "el"
			if ( this.$("header") ) {
				this.$("header").remove();
			}
			this.$(".content").before(compiledTemplate);
		},
		
		save: function() {
      $('#spinner').show();

      var values = this.$("#frmProfile").serializeObject();
      this.model.venueUser.save({'externalId': values.externalId}, {
        success: function(model, resp, opts) {
          $('#spinner').hide();
          window.history.back();
        },
        error: function() {
          $('#spinner').hide();
          navigator.notification.alert(_.tr('Failed to save details'));
        }
      });

		}
    
  });
  
  return View;
  
});


define('plugins/text!templates/checkout.html',[],function () { return '<div class="bar-footer footer-basket">\r\n\t\t<a class="checkout button btn-branding"><%- _.tr("Place Order") %></a>\r\n</div>\r\n\r\n<div class="content general-list checkout-view">\r\n<div class="scroller with-input">\r\n\t<div class="content-padded" style="padding-botttom:0;margin-bottom:0;">\r\n\t\t<h2><%- _.tr("Checkout") %></h2>\r\n\r\n    <form class="order-style">\r\n    \r\n\t\t<label style="display:block;"><%- _.tr("Amount to pay") %></label>\r\n\t\t<span class="order-style-orderno" style="margin-bottom:0;"><%- format.price(total) %></span>\r\n\r\n   <br>\r\n\r\n<% if ( pickupSlots ) { %>\r\n   <br>\r\n\t\t<label style="display:block;"><%- _.tr("Pickup Time") %></label>\r\n\t\t<div class="select-full">\r\n\t\t\t<select name="pickupSlot">\r\n\t\t\t\t<% _.each(pickupSlots, function(slot) { %>\r\n\t\t\t\t\t<option value="<%- slot.collectionslot %>" <%= slot.collectionslot == pickupSlot ? "SELECTED" : ""%>><%- format.SLOTSMAP[slot.collectionslot] %></option>\r\n\t\t\t\t<% }); %>\r\n\t\t\t</select>\r\n\t\t</div>\r\n\r\n<% } else if ( pickups && pickups.length > 0 ) { %>\r\n   <br>\r\n\t<div style="min-height: 70px;">\r\n\r\n          <% if ( deliveryState ) { %>\r\n          <label><%- _.tr("Delivery Time") %></label>\r\n          <% }else{ %>\r\n\t\t<label><%- _.tr("Pickup Time") %></label>\r\n          <% } %>\r\n\r\n\t\t<div class="select-left">\r\n\t\t\t<select name="pickupDay">\r\n\t\t\t\t<% _.each(pickups, function(pickup) { %>\r\n\t\t\t\t\t<option value="<%= pickup.value %>" <%= pickup.value == pickupDay ? "SELECTED" : ""%>><%= pickup.name\t %></option>\r\n\t\t\t\t<% }); %>\r\n\t\t\t</select>\r\n\t\t</div>\r\n\r\n\t\t<div class="select-right">\r\n\t\t\t<select name="pickupTime">\r\n\t\t\t\t<% _.each(pickups && pickups[0] && pickups[0].slots, function(slot) { %>\r\n\t\t\t\t<option <%= slot == pickupTime ? "SELECTED" : ""%>><%= slot %></option>\r\n\t\t\t\t<% }); %>\r\n\t\t\t</select>\r\n\t\t</div>\r\n\t</div>\r\n\r\n<% } %>\r\n\r\n<% if ( deliverAddress ) { %>\r\n<br>\r\n\t\t<label style="display:block;"><%- _.tr("Location") %></label>\r\n\t\t<div>\r\n\t\t<%- deliverAddress %>\r\n\t\t</div>\r\n\r\n<% } %>\r\n    \r\n        <% if ( deliveryState ) { %>\r\n        <!-- Location -->\r\n   <br>\r\n        <label class="label-block-gap" id="checkout-location-label"><%- _.tr("Delivery Location") %></label>\r\n        <div class="">\r\n          <ul class="list list-textleft">\r\n            <li>\r\n              <a href="#checkoutaddresslist">\r\n                <span id="checkout-location-address"><%- deliverTo.address1 %></span>\r\n                <span class="app-icon-chevron checkout-location-chevron"></span>\r\n              </a>\r\n            </li>\r\n          </ul>\r\n        </div>\r\n\r\n        <% } %>\r\n        <BR>\r\n\t\t<label><%- _.tr("Payment Method") %></label>\r\n\t\t\r\n\t<!--\t\t</div> -->\r\n\r\n\t\t<div id="payment-error" class="input-group" style="display: none;">\r\n\t\t\t<div class="input-row text-error error" style="padding: 10px;">\r\n\t\t\t\t\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t\t\r\n<% if ( !selectedMethod ) { %>\r\n\t\r\n\t\t<div class="input-group">\r\n\t<%=\tfields %>\r\n\t   \t<div class="input-row">\r\n\t\t\t\t<label><%- _.tr("Store Card") %></label>\r\n\t\t\t\t<div style="float: right; width: 65%; padding: 5px 0">\r\n\t\t\t\t\t<div class="toggle active">\r\n\t\t\t\t\t\t<div class="toggle-handle"></div>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</div>\r\n\t\t\t\t<input type="checkbox" name="store" value="true" checked="true" style="display: none;"/>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t\r\n<%  } %>\r\n\r\n<% if ( paymentMethods && paymentMethods.length > 0  ) { %>\r\n\t\t<ul class="list payment-methods">\r\n\t\t\t<li>\r\n\r\n        <a href="#card-select" style="text-decoration: none;">\r\n\t\t\t<% if ( selectedMethod ) { %>\r\n\t\t\t\t<span  class="icon-card-<%- selectedMethod.type.toLowerCase() %>"></span> **** **** **** <%- selectedMethod.number %>\r\n\t\t\t<% } else { %>\r\n\t\t\t\t\t<%- _.tr("Choose existing card") %>\r\n\t\t\t<% } %>\r\n          <span class="app-icon-chevron"></span>\r\n        </a>\r\n\t\t\t\r\n\t\t\t</li>\r\n\t\t</ul>\r\n<% } %>\r\n\r\n<% if ( notes ) { %>\r\n\t\t<label style="display:block;"><%- _.tr("Special Requests") %></label>\r\n\t\t<div> <%- notes %> </div>\r\n<% } %>\r\n\t</form>\r\n\r\n</div>\r\n</div>\r\n\r\n</div>';});

// Filename: views/account-view
define('views/checkout-view',[
  'jquery',
  'underscore',
  'backbone',
  'stripe',
  'plugins/text!templates/checkout.html',
  'plugins/text!templates/card-fields.html',
  'plugins/text!templates/header.html',
  'models/order',
  'models/card',
  'models/hours-collection',
  'app'
], function($, _, Backbone, Stripe, template, tmplFields, tmplHeader, Order, Card, HoursCollection, app){
  var View = Backbone.View.extend({

    destructionPolicy : 'auto',
    defaultLeadTime: 30,
    defaultCollectInterval: 15,

    initialize: function() {
      this.listenTo(this.model.user, 'change:selectedMethod', this.changeMethod, this);
      this.listenTo(this.model.user, 'change:addressSelected', this.changeDeliverTo, this);

      //Make sure we have a stripekey
      if ( !app.stripeKey ) {
      	app.updateSettings();
      };

        //Now get all the times for the order type
        this.pickups = app.deliveryState ? this.getSlotTimes("delivery") : this.getSlotTimes("pickup");

      if (app.currentEvent && app.currentEvent.slots) {
	      this.slots = app.currentEvent.slots;
      }
      
    },

    events: {
      "tap .toggle": "toggle",
      "tap .checkout": "placeOrder",
      "change [name=\"pickupSlots\"]": "changePickupSlots",
      "change [name=\"pickupDay\"]": "changePickupDay",
      "change [name=\"pickupTime\"]": "changePickupTime"
    },

      /** getSlotTimes
       *
       *  This function will return the "slot times", or the times upon which
       *  a customer can choose to have the order placed. Note that this varies depending
       *  on the day and the type of the order.
       *
       * @param type (either "pickup" or "delivery")
       * @returns {*}
       */
    getSlotTimes: function(type){

        if (!~["delivery", "pickup"].indexOf(type)){
            throw new Error("Please ensure the type is either 'pickup' or 'delivery'.");
        }

        // Check the basket for item times
        var itemPickup = app.basket.itemPickupTime();
        if ( itemPickup ) {
          return [HoursCollection.createPickup(itemPickup)];
        }

        // If the venue has opening hours
        this.hours = this.model && this.model.venue && this.model.venue.hours;
        if (this.hours && this.hours.length){
            var settings = this.model.venue.get('settings');
            var increment = settings && settings.collectInterval || this.defaultCollectInterval

            if (type == "pickup"){
                var lead = settings && settings.leadTime || this.defaultLeadTime;
            }else{
                var lead = settings && settings.deliveryLeadTime || this.defaultLeadTime;
            }

            //See if any items have lead times
            lead = app.basket.minLeadTime(lead);
            var minPickupTime = app.basket.minPickupTime(this.hours);
            
            // Make sure the minPickupTime > ( now + lead )
            minPickupTime = Math.max(minPickupTime, Date.now() + (lead * 60 * 1000));
            
            return this.hours.getTimes(4, increment, lead, new Date(minPickupTime), type);
        }
    },

    render: function(){
      var basket = this.model.basket;
      var data = {
        pickups: this.pickups,
        pickupDay: this.selectedDay || false,
        pickupTime: this.selectedTime || false,
        pickupSlots: this.slots && this.slots.toJSON() || false,
        pickupSlot: this.selectedSlot,
        deliverAddress: app.deliverAddress,
        deliveryState: app.deliveryState,
        deliverTo: this.model.user.get('addressSelected') ? this.model.user.get('addressSelected').toJSON() : [],
        items: basket.toJSON(),
        count: basket.count(),
        total: basket.total(),
        paymentMethods: this.model.user.get("paymentMethods") || false,
        selectedMethod: this.model.user.get("selectedMethod") && this.model.user.get("selectedMethod").toJSON(),
        format: app.templateHelper.format,
        fields: _.template( tmplFields, {data: {name: this.model.user.get('name')}} ),
        notes: basket.notes || false
      };

      var compiledTemplate = _.template( template, data );
      // Append our compiled template to this Views "el"
      this.$el.html( compiledTemplate );

      this.renderHeader();
    },

    renderHeader : function() {
      // Using Underscore we can compile our template with data
      var compiledTemplate = _.template(tmplHeader, this.options.header || {});
      // Append our compiled template to this Views "el"
      if ( this.$("header") ) {
        this.$("header").remove();
      }
      this.$(".content").before(compiledTemplate);
    },
    
    changeMethod: function(method) {
      this.render();
    },

    changeDeliverTo: function() {
      this.render();
    },

    changePickupDay: function(e) {
      var value = $(e.target).val();
      var selected = _.find(this.pickups, function(p) { return p.value === value; });

      var times = $('[name="pickupTime"]')[0];
      times.options.length = 0;
      _.each(selected.slots, function(slot) {
        times.options[times.options.length] = new Option(slot);
      });

      this.selectedDay = value;

    },

    changePickupTime: function(e) {
      this.selectedTime = $(e.target).val();
    },
    
    changePickupSlots: function(e) {
      this.selectedSlot = $(e.target).val();
    },    
    
    toggle: function(e) {
      // change this to set on model then have change listener toggle class
      var cBox = $("input[name='store']");
      cBox.prop('checked', !cBox.prop('checked'));
      $(e.currentTarget).toggleClass('active', cBox.prop('checked'));
    },
    
    placeOrder: function(e) {
      var checkout = this;

      $('#spinner').show();
      $('#payment-error').hide();
      $('nav.bar-footer').hide();
			$('input').blur();//fixing keyboard slidedown

      app.trigger('checkout:attempt');
      
      // convert basket to order
      var orderItems = this.model.basket.map(function(item) {
        return item.toOrderJSON();
      }, this);
      
      var pm = this.model.user.get("selectedMethod");
      
      // serialize form
      var values = this.$("form").serializeObject();

      var pickupTime;
      if ( app.currentEvent && app.currentEvent.slots ) {
        pickupTime = app.currentEvent.date || null;
        this.selectedSlot = values.pickupSlot;
      } else {
        pickupTime = this.pickups && values.pickupDay && values.pickupTime &&
                (values.pickupDay + 'T' + values.pickupTime + ':00.000');
      }
        checkout.processOrder(orderItems, pm, pickupTime);

    },
      stringifyAddr: function(address){
          // Clean address was requested for admin-orders dev.
          // Below fn will create clean comma delimited address string from address fields.
          var required = ['address1','address2','address3','city','county'];
          var formattedAddr = _.reduce(required, function(memo, obj){
              var peice = address && ( (address.get && address.get(obj)) || address[obj] );
              if ( peice && peice.length ) {
                memo.push(peice);
              }
              return memo;
            }, []);
          return formattedAddr.join(', ');

      },
    processOrder: function(orderItems, pm, pickup) {
      var order = new Order();


      //if it's a stored card send the card ID
      //else send the complete object without an ID
      if ( pm && (pm.get('store') == false ) ){
          var pmSend = pm.toJSON();
          delete pmSend['id'];
      } else {
          var pmSend = pm.toOrderJSON();
      }
      
      app.lastOrder = order;

      // Decide order type
      var orderType, address, postcode;
      if ( app.deliveryState ) {
        // Delivery order
        var addressSelected = app.user.get('addressSelected');
        address = addressSelected && this.stringifyAddr(addressSelected);
        postcode = addressSelected && addressSelected.get('postcode');
        orderType = 'DELIVERY';

      } else {
        // Seat or pickup
        orderType = app.outletLocation && app.outletLocation.get('toSeatFlag') ? 'SEAT' : 'PICKUP';
        address = app.deliverAddress;
        postcode = null;

      }

      order.save({
        v: app.outlet.get('venueId'),
        o: app.outlet.get('id'),
        u: app.user.get('id'),
        ot: orderType,
        da: address,
        dp: postcode,
        i: orderItems,
        t: this.model.basket.total(),
        pm: pmSend || [],
        pt: pickup,
        ph: app.user && app.user.get('phone'),
        e: app.currentEvent && app.currentEvent.id,
        ps: this.selectedSlot,
        n: this.model && this.model.basket && this.model.basket.notes || ""
      }, {
        success: function(order) {

          $('#spinner').hide();
          app.trigger('checkout:success', order);
          app.router.navigate("order-success", true);
          app.user.fetch({background: true});
            app.user.get('addresses').clearUnsaved();
            app.user.get('paymentMethods').clearUnsaved();

        },
        error: function(order, httpReq, options) {
          $('#spinner').hide();
          console.log("** Failure " + httpReq.status + " **");
          var resp = $.parseJSON(httpReq.response);
          app.trigger('checkout:error', order, resp);
          var message = "Something went wrong. Please try again."
          if ( httpReq.status == 0 ) {
            message = _.tr("We couldn't process your request. Please make sure you have a network connection and try again.")

          } else if ( httpReq.status == 409 ) {
            // 409 is a conflict meaning menu changed need to clear basket
            app.basket.removeAll();
            navigator.notification.alert(_.tr("It looks like the venue has changed their menu. We've had to clear your basket."),
              function() {
                // go back
                window.history.back();
              }, 'Error');
            return;

          } else if ( httpReq.status == 402 ) {
            // 402 is payment failure
            message = resp && resp.error && resp.error.message || _.tr("Payment failed. Please try again.");

          }
          $('#payment-error').show();
          $('#payment-error .error').html(message);
          $('nav.bar-footer').show();
        }
      });
    }
    
  }, {
    // Checkout should only be visible to logged in user
    secure: true
  });
  
  return View;
  
});


define('plugins/text!templates/checkout-address-list.html',[],function () { return '<!-- Content -->\r\n<div class="content">\r\n    <div class="scroller">\r\n        <div class="content-padded view-header">\r\n            <h2 id="addresslist-title"><%- _.tr("Select Delivery Address") %></h2>\r\n        </div>\r\n\r\n        <!-- Stored Address List -->\r\n        <ul class="list big-list">\r\n            <% _.each(addresses, function(item) { %>\r\n            <li data-item-id="<%- item.id %>">\r\n                <a>\r\n                    <span class="addresslist-address"><%- item.address1 %></span>\r\n                    <span class="app-icon-chevron"></span>\r\n                </a>\r\n            </li>\r\n            <% }); %>\r\n\r\n        </ul>\r\n\r\n        <!-- If no stored addresses\r\n        <div class="content-padded">\r\n            No stored address.\r\n        </div>\r\n        -->\r\n\r\n    </div>\r\n</div>\r\n<!-- /Content -->\r\n\r\n<div class="bar-footer bar-footer-actions">\r\n    <a href="#checkoutaddressnew" class="button button-blue button-noborder pull-right" id="addresslist-add-btn"><%- _.tr("Add Address") %></a>\r\n</div>';});

// Filename: views/addresslist-view
define('views/checkout-address-list-view',[
    'jquery',
    'underscore',
    'backbone',
    'plugins/text!templates/checkout-address-list.html',
    'plugins/text!templates/header.html',
    'models/address',
    'models/address-collection',
    'app'
], function($, _, Backbone, template, tmplHeader, Address, AddressCollection, app){
    var View = Backbone.View.extend({
            events: {
                "tap li": "select"
            },
            initialize: function(){
            },
            render: function(){
                console.log("render:CheckoutAddressList");
                var compiledTemplate = _.template( template,{addresses: app.user.get('addresses').toJSON() } );
                // Append our compiled template to this Views "el"
                this.$el.html( compiledTemplate );
                this.renderHeader();
            },

            renderHeader : function() {
                // Using Underscore we can compile our template with data
                var compiledTemplate = _.template(tmplHeader, {
                    left: _.tr('Back'),
                    venue: app.currentVenue && app.currentVenue.toJSON()
                });
                // Append our compiled template to this Views "el"
                if ( this.$("header") ) {
                    this.$("header").remove();
                }
                this.$(".content").before(compiledTemplate);
            },
            select: function(e){
                // get clicked model
                var addressId = $(e.target).closest('li').attr("data-item-id");
                var thisModel = this.collection.get(addressId);
                // set selected address
                app.user.set('addressSelected',thisModel);
                // return to previous screen
                window.history.back();
            }
        },
        {
            secure: true
        });

    return View;

});

define('plugins/text!templates/orders.html',[],function () { return '<div class="content general-list">\r\n\t<div class="scroller">\r\n\t\t<div class="content-padded">\r\n\t\t\t<h2 id="previousorders-title"><%- _.tr("Previous Orders") %></h2>\r\n\t\t</div>\r\n\t\t<ul class="list">\r\n\t\t<% _.each(data, function(item) { %>\r\n\t\t\t<li>\r\n\t\t\t\t<a href="#order-detail/<%- item.id %>">\r\n\t\t\t\t\t<strong <%= item.status == \'REJECTED\' && \'class="text-error"\' %>>#<%- item.id %> <%- item.status %></strong>\r\n\t\t\t\t\t<p <%= item.status == \'REJECTED\' && \'class="text-error"\' %> >\r\n\t\t\t\t\t\t<%= format.orderListDate(item.created) %> / <%- format.price(item.total) %>\r\n\t\t\t\t\t</p>\r\n\t\t\t\t\t<span class="app-icon-chevron"></span>\r\n\t\t\t\t</a>\r\n\t\t\t</li>\r\n\t\t<% }); %>\r\n\t\t</ul>\t\t\r\n\t</div>\r\n</div>\r\n\r\n\r\n\t\t\t\t\t\r\n';});

// Filename: views/orders-view
define('views/orders-view',[
  'jquery',
  'underscore',
  'backbone',
  'moment',
  'plugins/text!templates/orders.html',
  'plugins/text!templates/header.html',
  'app'
], function($, _, Backbone, moment, template, tmplHeader, app){
  var View = Backbone.View.extend({

    initialize: function() {
      _.bindAll(this, "render");
      this.listenTo(this.collection, "reset", this.render);
    },
  	
    render: function(){
    	console.log("render:OrdersView");
      var compiledTemplate = _.template( template, {
        data: this.collection.toJSON(),
        format: app.templateHelper.format,
        moment: moment
      });
      // Append our compiled template to this Views "el"
      this.$el.html( compiledTemplate );
      
			this.renderHeader();

      // FIXME: This shouldn't be needed. Issue is that render destroys the scroll container
      // Tell the app that our content changed so it resets the scroller
      app.trigger('content:change');
    },
    
		renderHeader : function() {
			// Using Underscore we can compile our template with data
			var compiledTemplate = _.template(tmplHeader, {
				left: _.tr('Back'),
				venue: app.currentVenue && app.currentVenue.toJSON()
			});
			// Append our compiled template to this Views "el"
			if ( this.$("header") ) {
				this.$("header").remove();
			}
			this.$(".content").before(compiledTemplate);
		}
  }, {
  	secure: true
  });
  
  return View;
  
});


define('plugins/text!templates/order-detail.html',[],function () { return '<% if ( !hideDone ) { %>\r\n<div class="bar-footer footer-basket">\r\n\t <a class="submit button"><%- _.tr("RETURN TO HOME") %></a>\r\n</div>\r\n<% } %>\r\n\r\n\r\n<div class="content general-list">\r\n\t<div class="scroller">\r\n\t\t\t<% if ( data.status === \'PENDING\' ) { %>\r\n\t\t\t\t<div class="orderConfirmation">\r\n\t\t\t\t\t<div class="box box-text-center">\r\n\t\t\t\t\t\t<h1 class="coloured" id="confirmation-title"><%- _.tr("Thank you.") %></h1>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t\t<div class="box box-text-center" id="confirmation-text">\r\n\t\t\t\t\t\t<p><%- _.tr("Your order has been submitted, payment pending. You will receive a confirmation in a few minutes.") %></p>\r\n\t\t\t\t\t\t<br>\r\n\t\t\t\t\t\t<p><%- _.tr("If you have any queries or need to amend your order, please call us on:") %></p>\r\n\t\t\t\t\t\t<h1>\r\n\t\t\t\t\t\t\t<a class="coloured" id="confirmation-venuenumber"><%- venuePhone %></a>\r\n\t\t\t\t\t\t</h1>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</div>\r\n\r\n\t\t\t\t<form class="order-style">\r\n\r\n\t\t\t<% } else if ( data.status === \'REJECTED\' ) { %>\r\n\r\n\t\t\t\t<form class="order-style">\r\n\r\n\t\t\t\t\t<h2 id="orderconf-title" class="text-error"><%- _.tr("ORDER WAS REJECTED") %></h2>\r\n\t\t\t\t\t<p><label id="orderconf-number-label"><%- _.tr("Order No.") %></label><br>\r\n\t\t\t\t\t<span class="order-style-orderno" id="orderconf-number"><span>#<%- data.id %></span><br><%- user.get(\'name\') %></span></p>\r\n\r\n\t\t\t<% } else { %>\r\n\r\n\t\t\t\t<form class="order-style">\r\n\r\n\t\t\t\t\t<h2 id="orderconf-title"><%- _.tr("Thank you!") %></h2>\r\n\t\t\t\t\t<p><label id="orderconf-number-label"><%- _.tr("Order No.") %></label><br>\r\n\t\t\t\t\t<span class="order-style-orderno" id="orderconf-number"><span>#<%- data.id %></span><br><%- user.get(\'name\') %></span></p>\r\n\t\t\t\t\t<p><label id="orderconf-code-label"><%- _.tr("Confirmation Code") %></label><br>\r\n\t\t\t\t\t<span class="order-style-code" id="orderconf-code"><%- data.verificationCode %></span></p>\r\n\r\n\t\t\t<% } %>\r\n\r\n\t\t\t<% if ( data.type === \'PICKUP\' ) { %>\r\n\t\t\t\t<p style="display:block;">\r\n\t\t\t\t\t<label id="orderconf-time-label"><%- _.tr("Collection Time") %></label>\r\n\t\t\t\t\t<span class="order-style-subtitle" id="orderconf-time">\r\n\t\t\t\t\t<% if ( data.pickupSlot ) { %>\r\n\t\t\t\t\t\t<%- format.SLOTSMAP[data.pickupSlot] %>\r\n\t\t\t\t\t<% } else { %>\r\n\t\t\t\t\t\t<%= format.orderPickupTime(data.pickupTime) %>\r\n\t\t\t\t\t<% } %>\r\n\t\t\t\t\t\t<%- format.orderPickupDate(data.pickupTime) %>\r\n\t\t\t\t\t</span>\r\n\t\t\t\t</p>\r\n\t\t\t\t<% if ( outlet && outlet.location ) { %>\r\n\t\t\t\t\t<p><label style="display:block;" id="orderconf-location-label"><%- _.tr("Collection Location") %></label>\r\n\t\t\t\t\t<span class="order-style-subtitle" id="orderconf-location"><%- outlet.location %></span></p>\r\n\t\t\t\t<% } %>\r\n\r\n\t\t\t<% } else { %>\r\n\r\n\t\t\t\t<p style="display:block;">\r\n\t\t\t\t\t<label id="orderconf-time-label"><%- _.tr("Delivery Time") %></label>\r\n\t\t\t\t\t<span class="order-style-subtitle" id="orderconf-time">\r\n\t\t\t\t\t\t<%= format.orderPickupTime(data.pickupTime) %>\r\n\t\t\t\t\t\t<%- format.orderPickupDate(data.pickupTime) %>\r\n\t\t\t\t\t</span>\r\n\t\t\t\t</p>\r\n\r\n\r\n\t\t\t\t<% if ( data.address ) { %>\r\n\t\t\t\t\t<p style="display:block;">\r\n\t\t\t\t\t\t<label id="orderconf-address-label"><%- _.tr("Delivery Address") %></label>\r\n\t\t\t\t\t\t<span class="order-style-subtitle" id="orderconf-address"><%- data.address %></span>\r\n\t\t\t\t\t</p>\r\n\t\t\t\t<% } %>\r\n\r\n\t\t\t<% } %>\r\n\t\t\t<p><label style="display:block;"><%- _.tr("Order Total") %></label>\r\n\t\t\t<span class="order-style-orderno"> <%- format.price(data.total || 0) %> </span></p>\r\n\r\n\t\t\t<p><label style="display:block;"><%- _.tr("Order Details") %></label></p>\r\n\t\t\t<ul class="list order-detail">\r\n\t\t\t<% _.each(data.items, function(item) { %>\r\n\t\t\t\t<li>\r\n\t\t\t\t\t<% if (item ) { %>\r\n\t\t\t\t\t\t<strong><%- item.name %></strong>\r\n\t\t\t\t\t\t<% if ( item.modifiers.length > 0) {%>\r\n\t\t\t\t\t\t\t<div class="description"><%- mapNames(item.modifiers) %></div>\r\n\t\t\t\t\t\t<% } else if (item.mealDealItems.length > 0) {%>\r\n\t\t\t\t\t\t\t<div class="description"><%- mapNames(item.mealDealItems) %></div>\r\n\t\t\t\t\t\t<% } %>           \r\n\t\t\t\t\t<% } %>\r\n\t\t\t\t\t<span class="asdcounter small single"><%- item.qty %></span>\r\n\t\t\t\t</li>\r\n\t\t\t<% }); %>\r\n\r\n\t\t\t</ul>\r\n\t\t</form>\r\n\t</div>\r\n</div>\r\n';});

// Filename order-detail-view
define('views/order-detail-view',[
  'jquery',
  'underscore',
  'backbone',
    'plugins/text!templates/order-detail.html',
  'plugins/text!templates/header.html',
  'app'
], function ($, _, Backbone, tmpl, tmplHeader, app) {
  var View = Backbone.View.extend({

    events: {
      'tap .submit': 'done'
    },

    render: function(){

      console.log("render:order-detail-view");
      var outlet = app.store.getOutlet(this.model.get('outletId'));
      var compiledTemplate = _.template(tmpl, {
          data: this.model ? this.model.toJSON() : {},
          hideDone: this.options.hideDone,
          user: app.user || false,
          format: app.templateHelper.format,
          outlet: outlet && outlet.toJSON(),
          venuePhone: app.savedVenues.get(this.model.toJSON().venueId) &&
              app.savedVenues.get(this.model.toJSON().venueId).toJSON().settings.deliveryPhone || '-',
          mapNames: function(items) {
            var names = _.map(items || [], function(item) {
              return item.name;
            });

            return names.join(", ");
          }
        }
      );

      // Append our compiled template to this Views "el"
      this.$el.html( compiledTemplate );
      this.renderHeader();
    },
    
    renderHeader : function() {
      // Using Underscore we can compile our template with data
      var compiledTemplate = _.template(tmplHeader, this.options.header || {});
      // Append our compiled template to this Views "el"
      if ( this.$("header") ) {
        this.$("header").remove();
      }
      this.$(".content").before(compiledTemplate);
    },

    done: function(e) { 
      app.basket.reset([], {silent:true});
      delete app.basket.notes;
      app.router.navigate("", true);
    }


  });

  return View;
});


define('plugins/text!templates/message.html',[],function () { return '\r\n<div class="content about" style="\r\n    text-align: center;\r\n    padding: 20px;\r\n">\r\n<div class="scroller">\r\n\r\n\t<div class="external">\r\n\t<h1><%= msg.title %></h1>\r\n\t<p><%= msg.message %></p>\r\n\t</div>\r\n\r\n<% if ( msg.link ) { %>\r\n\t<a class="button button-block submit link" style="margin-top: 30px;"><%- msg.linkLabel || _.tr("Open") %></a>\r\n<% } %>\r\n\r\n<% if ( !msg.disable ) { %>\r\n\t<a class="button button-block submit done" style="margin-top: 30px;"><%- _.tr("OK") %></a>\r\n<% } %>\r\n\r\n</div>\r\n</div>';});

// Filename: views/about-view
define('views/message-view',[
  'jquery',
  'underscore',
  'backbone',
  'plugins/text!templates/message.html',
  'plugins/text!templates/header.html',
  'app'
], function($, _, Backbone, template, tmplHeader, app){
  var View = Backbone.View.extend({
    
    events: {
      "tap .link" : function() { window.open(this.model.link, '_external'); },
      "tap .done" : function() { app.router.navigate("", true); }
    },
  	
    render: function(){
    	console.log("render:AboutView");
      var compiledTemplate = _.template( template, {msg: this.model} );
      // Append our compiled template to this Views "el"
      this.$el.html( compiledTemplate );
      
			this.renderHeader();

    },
    
		renderHeader : function() {
			// Using Underscore we can compile our template with data
			var compiledTemplate = _.template(tmplHeader, {});
			// Append our compiled template to this Views "el"
			if ( this.$("header") ) {
				this.$("header").remove();
			}
			this.$(".content").before(compiledTemplate);
		}
    
  });
  
  return View;
  
});


define('plugins/text!templates/about.html',[],function () { return '<div class="content about" style="text-align: center;">\r\n<div class="scroller" style="padding: 20px;">\r\n\t<div class="external">\r\n\t<h1 id="about-title"><% print($settings.appName) %></h1>\r\n\t</div>\r\n\t<p id="about-powered" style="margin-top: 10px;">\r\n\tpowered by <a href="http://www.preoday.com" target="_system" id="about-powered-link">preoday</a>\r\n\t</p>\r\n\t<p id="about-version">v<% print($settings.version) %></p>\r\n</div>\r\n</div>';});

// Filename: views/about-view
define('views/about-view',[
  'jquery',
  'underscore',
  'backbone',
  'plugins/text!templates/about.html',
  'plugins/text!templates/header.html',
  'app'
], function($, _, Backbone, template, tmplHeader, app){
  var View = Backbone.View.extend({
  	
    render: function(){
    	console.log("render:AboutView");
      var compiledTemplate = _.template( template );
      // Append our compiled template to this Views "el"
      this.$el.html( compiledTemplate );
      
			this.renderHeader();

      // TODO: allow loading about screen from external url
      // $('.external').load($settings.apiRoot  + 'config/about');
    },
    
		renderHeader : function() {
			// Using Underscore we can compile our template with data
			var compiledTemplate = _.template(tmplHeader, {
				left: _.tr('Back'),
				venue: app.currentVenue && app.currentVenue.toJSON()
			});
			// Append our compiled template to this Views "el"
			if ( this.$("header") ) {
				this.$("header").remove();
			}
			this.$(".content").before(compiledTemplate);
		}
    
  });
  
  return View;
  
});


define('plugins/text!templates/demomode.html',[],function () { return '<div class="content">\r\n\t<div class="scroller">\r\n\t\t<div class="content-padded">\r\n\t\t\t<h2 style="padding-bottom:10px;"><%- _.tr("Demo Mode") %></h2>\r\n\t\t\t<p style="padding:5px;font-size:16px;"><%- _.tr("This app is currently running in demo mode which means the venue owner has not yet activated this app to accept live transactions.") %></p>\r\n\t\t\t<p style="padding:5px;font-size:16px;"><%- _.tr("If you are the venue owner, you will need to connect your Stripe account in order to begin accepting payments and move your app from demo mode to live.") %></p>\r\n\t\t</div>\r\n\t</div>\r\n</div>';});

// Filename: views/demomode-view
define('views/demomode-view',[
  'jquery',
  'underscore',
  'backbone',
  'plugins/text!templates/demomode.html',
  'plugins/text!templates/header.html',
  'app'
], function($, _, Backbone, template, tmplHeader, app){
  var View = Backbone.View.extend({
  	
    render: function(){
    	console.log("render:DemomodeView");
      var compiledTemplate = _.template( template );
      // Append our compiled template to this Views "el"
      this.$el.html( compiledTemplate );
      
			this.renderHeader();

      // TODO: allow loading about screen from external url
      // $('.external').load($settings.apiRoot  + 'config/about');
    },
    
		renderHeader : function() {
			// Using Underscore we can compile our template with data
			var compiledTemplate = _.template(tmplHeader, {
				left: _.tr('Back'),
        demoback: "back",
				venue: app.currentVenue && app.currentVenue.toJSON() 
			});
			// Append our compiled template to this Views "el"
			if ( this.$("header") ) {
				this.$("header").remove();
			}
			this.$(".content").before(compiledTemplate);
		}
    
  });
  
  return View;
  
});


define('plugins/text!templates/event-detail.html',[],function () { return '<div class="bar-page-title"><%- _.tr("Choose Performance") %></div>\r\n<div class="content">\r\n<div class="scroller">\r\n\r\n\t<ul class="list">\r\n\r\n\t\t<li style="padding: 10px; background: white;">\r\n\t\t\t<h2><%- event.name %></h2>\r\n\t\t\t<div class="description"><%- event.description %></div>\r\n\t\t</li>\r\n\r\n\t\t<% _.each(recurrences, function(item) { %>\r\n\t\t\t<li><a class="event-date" data-date="<%- item %>">\r\n\t\t\t\t<%= format.medium(item) %>\r\n\t\t\t\t<span class="chevron"></span>\r\n\t\t\t</a></li>\r\n\t\t<% }); %>\r\n\r\n\t</ul>\r\n</div>\r\n</div>';});

// Filename: views/event-detail-view
define('views/event-detail-view',[
  'jquery',
  'underscore',
  'backbone',
  'moment',
  'plugins/text!templates/event-detail.html',
  'plugins/text!templates/header.html',
  'app'
], function($, _, Backbone, moment, template, tmplHeader, app){
  var View = Backbone.View.extend({

    events: {
      "tap .event-date": "dateClick"
    },
  	
    render: function(){
    	console.log("render:EventDetailView");
      
      // Only get the next month worth of dates
      var maxDate = new Date();
      maxDate.setMonth(maxDate.getMonth() + 1);

      var compiledTemplate = _.template( template, {
        event: this.model.toJSON(),
        recurrences: this.model.getRecurrences(new Date(), maxDate),
        format: {
          medium: function(date) {
            return moment(date).format('HHmm dddd<br>Do MMMM YYYY');
          }
        }
      });
      // Append our compiled template to this Views "el"
      this.$el.html( compiledTemplate );
      
			this.renderHeader();
    },
    
		renderHeader : function() {
			// Using Underscore we can compile our template with data
			var compiledTemplate = _.template(tmplHeader, {left: _.tr('Back')});
			// Append our compiled template to this Views "el"
			if ( this.$("header") ) {
				this.$("header").remove();
			}
			this.$(".content").before(compiledTemplate);
		},

    dateClick: function(e) {
      e.preventDefault();
      var eventDate = $(e.currentTarget).data("date");

      app.currentEvent = {
        event: this.model,
        eventDate: eventDate
      }

      // go to seat selection
      var rootLocation = this.model.get('outletLocationId');
      app.router.navigate('venue/' + this.model.get('venueId') + '/outlet-location' + (rootLocation ? '/' + rootLocation : ""), {
        trigger: true
      });

    }
  });
  
  return View;
  
});


define('plugins/text!templates/userprofile.html',[],function () { return '<div class="content">\r\n\t<div class="scroller with-input">\r\n\r\n\t\t<div class="content-padded">\r\n\t\t\t<h2 id="userprofile-title"><%- _.tr("User Profile") %></h2>\r\n\t\t</div>\r\n\r\n    <form class="input-group" style="border-bottom:none;">\r\n      <!--div class="input-row">\r\n        <label>User Id</label>\r\n        <label><%- user.id %></label>\r\n      </div-->\r\n      <div class="input-row">\r\n\t\t\t\t<label id="userprofile-firstname-label"><%- _.tr("First Name") %></label>\r\n\t\t\t\t<input id="userprofile-firstname-field" type="text" name="firstName" value="<%- user.firstName %>" autocorrect="off" autocapitalize="words"/>\r\n      </div>\r\n      <div class="input-row">\r\n\t\t\t\t<label id="userprofile-lastname-label"><%- _.tr("Last Name") %></label>\r\n\t\t\t\t<input id="userprofile-lastname-field"type="text" name="lastName" value="<%- user.lastName %>" autocorrect="off" autocapitalize="words"/>\r\n      </div>\r\n      <div class="input-row">\r\n          <label id="userprofile-phone-label"><%- _.tr("Mobile Num") %></label>\r\n          <input id="userprofile-phone-field"type="text" name="phone" value="<%- user.phone %>" autocorrect="off"/>\r\n      </div>\r\n\r\n      <div class="input-row">\r\n        <label id="userprofile-email-label"><%- _.tr("Email") %></label>\r\n        <label id="userprofile-email-field" style="color:#999;"><%- user.email %></label>\r\n      </div>\r\n      \r\n\t   \t<div class="input-row" style="padding:10px;">\r\n\t\t\t\t<div style="float: left; margin-right:15px; margin-bottom:20px;">\r\n\t\t\t\t\t<div class="toggle<% if ( !user.optinLoyalty <= 0 ) { %> active<% } %>" data-toggle-for="optinLoyalty" id="userprofile-toggle-loyalty-btn">\r\n\t\t\t\t\t\t<div class="toggle-handle"></div>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</div>\r\n\t\t\t\t<input type="hidden" name="optinLoyalty" value="<%-user.optinLoyalty || 0 %>"  />\r\n\t\t\t\t<span id="userprofile-toggle-loyalty-text"><%- _.tr("Please switch-off this box if you do not wish to be contacted regarding loyalty programmes") %></span>\r\n\t\t\t</div>\r\n\r\n\t   \t<div class="input-row" style="padding:10px;">\r\n\t\t\t\t<div style="float: left; margin-right:15px; margin-bottom:20px;">\r\n\t\t\t\t\t<div class="toggle<% if ( !user.optinOffers <= 0 ) { %> active<% } %>" data-toggle-for="optinOffers" id="userprofile-toggle-offers-btn">\r\n\t\t\t\t\t\t<div class="toggle-handle"></div>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</div>\r\n\t\t\t\t<input type="hidden" name="optinOffers" value="<%-user.optinOffers || 0 %>"/>\r\n\t\t\t\t<span id="userprofile-toggle-offers-text"><%- _.tr("Please switch-off this box if you do not want more information about discounts and special offers") %></span>\r\n\t\t\t</div>\r\n\r\n\t   \t<div class="input-row" style="padding:10px;">\r\n\t\t\t\t<div style="float: left; margin-right:15px; margin-bottom:20px;">\r\n\t\t\t\t\t<div class="toggle<% if ( !user.optinOther <= 0 ) { %> active<% } %>" data-toggle-for="optinOther" id="userprofile-toggle-other-btn">\r\n\t\t\t\t\t\t<div class="toggle-handle"></div>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</div>\r\n\t\t\t\t<input type="hidden" name="optinOther" value="<%-user.optinOther || 0 %>"/>\r\n\t\t\t\t<span id="userprofile-toggle-other-text"><%- _.tr("Please switch-on this box if you are happy to receive newsletters, research and marketing emails") %></span>\r\n\t\t\t</div>\r\n            \r\n\t\t\t<div style="margin-bottom:10px;text-align:center;"><a class="submit button-blue" id="userprofile-update"><%- _.tr("Update Profile") %></a></div>\r\n    </form>\r\n\r\n\t</div>\r\n</div>';});

// Filename: views/about-view
define('views/userprofile-view',[
  'jquery',
  'underscore',
  'backbone',
  'plugins/text!templates/userprofile.html',
  'plugins/text!templates/header.html',
  'models/user',
  'app'
], function($, _, Backbone, template, tmplHeader, User, app){
  var View = Backbone.View.extend({


  	events: {
  		"submit form" : "submit",
  		"tap .submit" : "submit",
			"tap .toggle": "toggle"
  	},

		
    toggle: function(e) {
    	var toggle = $(e.currentTarget);
    	var name = toggle.data('toggle-for');
      // change this to set on model then have change listener toggle class
      var cBox = $("input[name='" + name + "']");
      var value = cBox.attr('value');
      value = value > 0 ? 0 : 1;
      cBox.attr('value',value);
      toggle.toggleClass('active', value > 0);
    },


    render: function(){
    	console.log("render:UserprofileView");
        Backbone.Validation.bind(this);
      // Using Underscore we can compile our template with data
      var compiledTemplate = _.template( template, {
      	user: this.model ? this.model.toJSON() : {}
      });
      // Append our compiled template to this Views "el"
      this.$el.html( compiledTemplate );

			this.renderHeader();
    },
    	
    
		renderHeader : function() {
			// Using Underscore we can compile our template with data
			var compiledTemplate = _.template(tmplHeader, this.options.header || {});
			// Append our compiled template to this Views "el"
			if ( this.$("header") ) {
				this.$("header").remove();
			}
			this.$(".content").before(compiledTemplate);
		},
		    
		submit: function(e) {
			e.preventDefault();
			app.trigger('user:change-attempt');

			var view = this,
				form_data = this.$('form').serializeObject();

			this.model.save(
				form_data, {
					patch: true,
					success: function() { 
						view.render(true);					
						function alertDismissed() {};
						navigator.notification.alert(
						    _.tr('Profile Updated'),
						    alertDismissed,         // callback
						    _.tr('Information'),            // title
						    _.tr('OK')                  // buttonName
						);

						app.trigger('user:change-success');
					},
					error: function(){ 
						view.render(true);					
						function alertDismissed() {};
						navigator.notification.alert(
						    _.tr('Please check your details'),
						    alertDismissed,         // callback
						    _.tr('Information'),            // title
						    _.tr('OK')                  // buttonName
						);
						app.trigger('user:change-error');
					}
				}
			);


		
	},

  });
  
  return View;
  
});


define('plugins/text!templates/moreevents.html',[],function () { return '<div class="content moreevents-view">\r\n\r\n\t<div class="scroller">\r\n\r\n\r\n\t<div class="content-padded">\r\n\t\t<h2><%- _.tr("Events Calendar") %></h2>\r\n\r\n\t</div>\r\n  <ul class="list">\r\n\t\t<% _.each(data, function(event, idx) { %>\r\n     <li>\r\n    \t<strong><%- (event.name) %></strong>\r\n    \t<p><%= format.eventDate(event.date) %></p>\r\n\t    <span class="app-icon-chevron event-select" data-event-idx="<%- idx %>"></span>\r\n    </li>\r\n\t\t<% }); %>\r\n  </ul>\r\n\r\n\t</div>\r\n</div>\r\n\r\n\r\n\r\n';});

// Filename: views/moreevents-view
define('views/moreevents-view',[
  'jquery',
  'underscore',
  'backbone',
  'plugins/text!templates/moreevents.html',
  'plugins/text!templates/header.html',
  'app'
], function($, _, Backbone, template, tmplHeader, app){
  var View = Backbone.View.extend({
    initialize : function(options) {
      this.listenTo(this.model, "change", this.render);
    },
  	events: {
			'tap a.logout': function(e) { app.logout(true); this.render(); },
    	'tap .retry': 'retry',
    	'tap .event-select': 'selectEvent',
  	},
  	
    render: function(){
    	console.log("render:MoreeventsView");

      var events = this.model.events;
      this.allEvents = events && events.expandEvents();

      // Using Underscore we can compile our template with data
      var tData = {
        data: this.allEvents,
        venue: this.model.toJSON(),
        outlet: this.model.outlets.at(0) || {},
        offers: this.model.offers.toJSON(),
        loadFailed: this.model.loadFailed, 
        user: app.user || false,
        format: app.templateHelper.format
      };
      var compiledTemplate = _.template( template, tData);
      // Append our compiled template to this Views "el"
      this.$el.html( compiledTemplate );

			this.renderHeader();
    },
    
		renderHeader : function() {
			// Using Underscore we can compile our template with data
			var compiledTemplate = _.template(tmplHeader, this.options.header || {});
			// Append our compiled template to this Views "el"
			if ( this.$("header") ) {
				this.$("header").remove();
			}
			this.$(".content").before(compiledTemplate);


		},
			
		retry: function() {
      document.location.reload(true)
		},
		
		selectEvent: function(e) {
      e.preventDefault();

      var eIdx = $(e.currentTarget).data("event-idx");
      var event = this.allEvents[eIdx];

      app.setCurrentEvent(event);


      app.router.venueoutlet(this.model);
		}
  	
  });
  
  return View;
});


define('plugins/text!templates/item-selected-modifiers.html',[],function () { return '<div class="bar-footer footer-basket">\r\n\t\t<a class="back button altr"><%- _.tr("Done") %></a>\r\n</div>\r\n\r\n<div class="content mealdeal-view">\r\n<div class="scroller">\r\n\t<div class="content-padded">\r\n\t\t<h2><%- _.tr("Change Order") %></h2>\r\n\t</div>\r\n\r\n\t<ul class="list basket-items">\r\n\t<li class="list-section-section"><%- _.tr("Change/duplicate/remove item") %>:</li>\r\n\t</ul>\r\n\r\n</div>\r\n</div>';});

// Filename: views/item-selected-modifiers
define('views/item-selected-modifiers-view',[
  'jquery',
  'underscore',
  'backbone',
  'views/basket-item-view',
  'plugins/text!templates/item-selected-modifiers.html',
  'plugins/text!templates/header.html',
  'app'
], function($, _, Backbone, BasketItemView, template, tmplHeader, app){
  var View = Backbone.View.extend({

		initialize : function(options) {
			this.initChildViewStorage();
		},
		
		initChildViewStorage: function() {
			this._children = new Backbone.ChildViewContainer();
		},
  	
    render: function(){
    	console.log("render:AboutView");
    	
      var compiledTemplate = _.template( template );
      // Append our compiled template to this Views "el"
      this.$el.html( compiledTemplate );

				// add the basket items
			_.forEach(this.collection, this.renderBasketItem, this);

			this.renderHeader();

			
		},
		
		renderBasketItem : function(model) {
			var item = model.get('item'),
				modifiers = item.get('modifiers') || [],
				editable = modifiers.length || item.get('external');

			var view = new BasketItemView({
				tagName: 'li',
				model : model,
				editable : editable
			});
			this._children.add(view);
			var div = this.$(".basket-items");
			div.append(view.el);
			view.render();
    	
		},
    
		renderHeader : function() {
			// Using Underscore we can compile our template with data
			var compiledTemplate = _.template(tmplHeader, {
				left: _.tr('Back'),
				venue: app.currentVenue && app.currentVenue.toJSON()
			});
			// Append our compiled template to this Views "el"
			if ( this.$("header") ) {
				this.$("header").remove();
			}
			this.$(".content").before(compiledTemplate);
		},
		
		clickAdd : function(e) {
			e.preventDefault();
	  	e.stopPropagation();
			var idx = $(e.currentTarget).data("idx"),
					basketItem = this.collection[idx];
			app.addToBasket(basketItem.get("item"), basketItem.get("mods"));
		}
    
  });
  
  return View;
  
});


define('plugins/text!templates/item-selected-mealdeals.html',[],function () { return '<div class="bar-footer footer-basket">\r\n\t\t<a class="back button altr"><%- _.tr("Done") %></a>\r\n</div>\r\n\r\n<div class="content mealdeal-view">\r\n<div class="scroller">\r\n\t<div class="content-padded">\r\n\t\t<h2><%- _.tr("Change Order") %></h2>\r\n\t</div>\r\n\r\n\t<ul class="list basket-items">\r\n\t<li class="list-section-section"><%- _.tr("Change/duplicate/remove item") %>:</li>\r\n\t</ul>\r\n\r\n</div>\r\n</div>';});

// Filename: views/item-selected-mealdeals
define('views/item-selected-mealdeals-view',[
  'jquery',
  'underscore',
  'backbone',
  'views/basket-item-view',
  'plugins/text!templates/item-selected-mealdeals.html',
  'plugins/text!templates/header.html',
  'app'
], function($, _, Backbone, BasketItemView, template, tmplHeader, app){
  var View = Backbone.View.extend({

		initialize : function(options) {
			this.initChildViewStorage();
		},
		
		initChildViewStorage: function() {
			this._children = new Backbone.ChildViewContainer();
		},
  	
    render: function(){
    	console.log("render:item-selected-mealdealsView");
    	
      var compiledTemplate = _.template( template );
      // Append our compiled template to this Views "el"
      this.$el.html( compiledTemplate );

				// add the basket items
			_.forEach(this.collection, this.renderBasketItem, this);

			this.renderHeader();

			
		},
		
		renderBasketItem : function(model) {
			var view = new BasketItemView({
				tagName: 'li',
				model : model,
				editable : !!model.get('item').get('mealDeal')
			});
			this._children.add(view);
			var div = this.$(".basket-items");
			div.append(view.el);
			view.render();
    	
		},
    
		renderHeader : function() {
			// Using Underscore we can compile our template with data
			var compiledTemplate = _.template(tmplHeader, {
				left: _.tr('Back'),
				venue: app.currentVenue && app.currentVenue.toJSON()
			});
			// Append our compiled template to this Views "el"
			if ( this.$("header") ) {
				this.$("header").remove();
			}
			this.$(".content").before(compiledTemplate);
		},
		
		clickAdd : function(e) {
			e.preventDefault();
	  	e.stopPropagation();
			var idx = $(e.currentTarget).data("idx"),
					basketItem = this.collection[idx];
			app.addToBasket(basketItem.get("item"), basketItem.get("mods"));
		}
    
  });
  
  return View;
  
});


define('plugins/text!templates/checkout-update-mobile.html',[],function () { return '<!-- Content -->\r\n<div class="content">\r\n    <div class="scroller">\r\n        <div class="content-padded view-header">\r\n            <h2 class="coloured" id="updatemobile-title"><%- _.tr("Please update your account information") %></h2>\r\n        </div>\r\n        <div class="box box-last">\r\n            <div class="content-padded">\r\n                <p id="updatemobile-subtext"><%- _.tr("Please add a mobile phone number to your account so that we can call you if there\'s a problem with your delivery.") %></p>\r\n            </div>\r\n        </div>\r\n        <form id="addMobileNumber">\r\n\r\n            <!-- Errors -->\r\n            <div id="addMobileNumber-error" class="input-group input-error">\r\n                <div class="input-row text-error error">\r\n\r\n                    <!-- Place Error Here -->\r\n\r\n                </div>\r\n            </div>\r\n\r\n            <!-- Mobile Number Input -->\r\n            <div class="input-group">\r\n\r\n                <div class="input-row">\r\n                    <label id="updatemobile-number-label"><%- _.tr("Mobile No.") %></label><input type="text" name="phone" value="" id="updatemobile-number-field" />\r\n                </div>\r\n\r\n            </div>\r\n\r\n      <input type="submit" class="" style="visibility: hidden"/>\r\n\r\n        </form>\r\n\r\n    </div>\r\n</div>\r\n<!-- /Content -->\r\n\r\n<!-- Submit button -->\r\n<div class="bar-footer bar-footer-actions">\r\n    <a class="submit button button-blue button-noborder pull-right" id="updatemobile-submit-btn"><%- _.tr("Submit") %></a>\r\n</div>';});

// Filename: views/updatemodel-view
define('views/checkout-update-mobile-view',[
    'jquery',
    'underscore',
    'backbone',
    'plugins/text!templates/checkout-update-mobile.html',
    'plugins/text!templates/header.html',
    'models/user',
    'app'
], function($, _, Backbone, template, tmplHeader, User, app){

    var View = Backbone.View.extend({
        model: new User(),
        events: {
            "submit form" : "validate",
            "tap .submit.button":"validate"
        },
        render: function(){
            // Bind Validation to view at render
            Backbone.Validation.bind(this);
            var compiledTemplate = _.template( template,{});
            // Append our compiled template to this Views "el"
            this.$el.html( compiledTemplate );
            this.renderHeader();
        },
        renderHeader : function() {
            // Using Underscore we can compile our template with data
            var compiledTemplate = _.template(tmplHeader, {
                left: _.tr('Back'),
                venue: app.currentVenue && app.currentVenue.toJSON()
            });
            // Append our compiled template to this Views "el"
            if ( this.$("header") ) {
                this.$("header").remove();
            }
            this.$(".content").before(compiledTemplate);
        },
        validate: function(e){
            e.preventDefault();

            formData = this.$("form").serializeObject();
            
            // Set the phone number and validate
            if ( this.model.set(formData, {validate: true}) ) {
                this.saveMobile(formData);
            }
        },
        saveMobile: function(formData){
            // Save phone number if validation passes
            app.user.save(formData, {
                patch: true,
                success: function(){
                    // go to next screen
                    console.log('saveMobile:success');
                    window.history.back();
                },
                error: function(){
                    navigator.notification.alert(_.tr("We were unable to update your mobile phone number."),
                        function() {
                            // window.history.back();
                            console.log('saveMobile:error');
                        }, 'Error');
                }
            });
        }
    },{
        secure: true
    });

    return View;

});

define('plugins/text!templates/external-item.html',[],function () { return '<!doctype html>\r\n<title> Redirecting.. </title>\r\n<form class="hidden-form" targets="externalFrame" method="POST" action="<%- externalUrl %>">\r\n\t<input type="hidden" name="returnUrl" value="<%- returnUrl %>">\r\n\t<input type="hidden" name="cancelUrl" value="<%- cancelUrl %>">\r\n\t<input type="hidden" name="action" value="<%- action %>">\r\n\t<input type="hidden" name="venueId" value="<%- venueId %>">\r\n\t<input type="hidden" name="user" value="<%- JSON.stringify(user) %>">\r\n\t<input type="hidden" name="item" value="<%- JSON.stringify(item) %>">\r\n\t<input type="hidden" name="basket" value="<%- JSON.stringify(basket) %>">\r\n</form>\r\n<script>\r\n\tdocument.querySelector(\'.hidden-form\').submit();\r\n</script>\r\n';});

// Filename: views/external-item-view
define('views/external-item-view',[
  'jquery',
  'underscore',
  'backbone',
  'models/menu-item',
  'plugins/text!templates/external-item.html',
  'app'
], function($, _, Backbone, MenuItem, template, app){
  var View = Backbone.View.extend({
  	
    render: function() {
    	console.log("render:ExternalItemView");

      var menuItem = this.model;
      var existing = app.basket.findForMenuItemId(menuItem.get('id'));

      // tojson the existing items in the basket
      var basketItems = _.map(existing, function(basketItem) {
        return {
          item: basketItem.get('item').toJSON(),
          mods: basketItem.get('mods')
        };
      });

      // Get the return url
      var origin = location.origin;
      if ( origin.indexOf('file') == 0 ) {
        origin = 'http://return';
      }

      var data = {
        externalUrl: menuItem.get('url'),
        returnUrl: origin + '/return.html',
        cancelUrl: origin + '/return.html',
        action: this.options.action || 'ADD',
        venueId: app.currentVenue.get('id'),
        user: app.user && app.user.toExternalJSON(),
        item: menuItem.toJSON(),
        basket: {items: basketItems}
      }

      var compiledTemplate = _.template( template, data );
      var win = window.open('data:text/html;charset=utf-8,' + encodeURIComponent( compiledTemplate ),
                      '_blank', 'location=no,toolbar=no,disallowoverscroll=yes');

      win.addEventListener('loadstart', function(e) {
        console.log('** INAPPBROWSER ', e.url);
        if ( e.url.indexOf(data.returnUrl) == 0 ) {
          win.close();
          var jsonString = e.url.substring(data.returnUrl.length + '?basket='.length);
          if ( jsonString && jsonString.length ) {
            app.withSpinner(function() {
              var newBasket = JSON.parse(decodeURIComponent(jsonString));
              console.log('External basket: ', newBasket);

              // Remove any existing items
              var existing = app.basket.findForMenuItemId(menuItem.get('id'));
              _.each(existing, function(basketItem) {
                app.basket.removeItem(basketItem);
              });

              // Add any items returned
              var basketItem;
              _.each(newBasket.items, function(newBasketItem) {
                // Create a new menu item
                var item = _.defaults(
                  _.pick(newBasketItem.item, 'plu', 'name', 'description', 'price', 'pickupTime'),
                  menuItem.attributes
                );
                item = new MenuItem(item);

                // Forward change events to the original menuItem
                _.each(['add','remove','change','basket:add','basket:remove'], function(eventName) {
                  item.on(eventName, function(evt) {
                    var args = Array.prototype.slice.apply(arguments);
                    args.unshift(eventName);
                    menuItem.trigger.apply(menuItem, args);
                  });
                });

                // Add to basket
                basketItem = app.basket.addItem(item, newBasketItem.mods);
              });

/*
              if ( newBasket.items.length ) {
                // Tell the menu item that it's been added to the basket
                menuItem.trigger('basket:add', basketItem, app.basket);
              } else {
                // Tell the menu item that it's been removed from the basket
                menuItem.trigger("basket:remove", menuItem, app.basket);
              } */

            });
          }
        }
      });

    }

  }, {
    // External items only be visible to logged in user
    secure: true
  });
  
  return View;
  
});

// Filename: models/outlet-location
define('models/outlet-location',[
	"underscore",
  "backbone"
], function(_, Backbone){

  var Model = Backbone.Model.extend({
  });
  
  return Model;
});
// Filename: models/outletLocation-collection
define('models/outlet-location-collection',[
	"underscore",
  "backbone",
  "models/outlet-location"
], function(_, Backbone, OutletLocation){
  var Model = Backbone.Collection.extend({
  	url: function() {
      return $settings.apiRoot + "venues/" + this.venueId + "/outletlocations";
    },
  	model: OutletLocation,
  	initialize: function(models, options) {
      options = options || {};
      this.venueId = options.venueId;
      this.filter = options.filter;

  	},
  	load: function(options) {
      options = options || {};
  		this.loadFailed = false;
  		this.fetch(_.extend(options, {
  			// Copy of this.filter with missing values removed
				data: _(this.filter).reduce(function(a,v,k){ 
              if(v){ a[k]=v; } 
              return a; 
            },{}),
				error: function(model, resp) {
          if ( !options.background ) {
  			    model.loadFailed = true;
  			    model.reset([]);
          }
				}
			
			}));
  	},
    deselectAll:function(){      
      this.forEach(function(model, index) {
        model.set("selected",false);
      });         
    } 
  
  });
  return Model;
});

// Filename: models/venue-user
define('models/venue-user',[ "underscore", "backbone" ], function(_, Backbone) {
	var Model = Backbone.Model.extend({
  	url: function() {
  		return $settings.apiRoot + "users/" + this.userId + "/venueuser/" + this.venueId
  	},
  	initialize: function(values, options) {
  		this.userId = options.userId;
  		this.venueId = options.venueId;
  	}
  });

  return Model;
});
// Filename: models/basket
define('models/basket',[
  "jquery",
	"underscore",
  "backbone",
  "models/basket-item"
], function($, _, Backbone, BasketItem){


  var Basket = Backbone.Collection.extend({
  	model: BasketItem,

    initialize: function() {
      var b = this;
      this.on('add remove', function() {
        delete b.memTotal;
      });
    },

  	addItem: function(item, mods, count) {

  		var exist = this.getBasketItem(item, mods);

  		console.log("Adding item: " + item.id, "Exists: " + exist);

  		// if it exists increment
  		if ( !exist ) {
  			exist = new BasketItem({count: count || 1, item: item, mods: mods});
  			this.add(exist);
    		item.trigger("basket:add", exist, this);
  		} else {
  			exist.incr(count);
  			this.trigger('add', exist, this);
  		}

      // Return the basket item
      return exist;

  	},

  	removeItem: function(item /* BasketItem */) {
  		// if it exists decrement
  		if ( item && item.decr() === 0 ) {
  			this.remove(item);
        var menuItem = item.get('item');
    		menuItem.trigger("basket:remove", menuItem, this);
  		} else {
        this.trigger('remove', item, this);
  		}

  	},

    removeAll: function() {
    	var collection = this;
      while ( collection.length > 0) {
        var item = collection.pop();
        item.set('cnt', 0);
        var menuItem = item.get('item');
        menuItem.trigger("basket:remove", menuItem, this);
      }
    },

  	/** Find the basket item matching the given item and mods */
  	getBasketItem: function(item, mods) {
  		return this.find(function(bItem) {
  			return bItem.match(item, mods);
  		});
  	},

  	/** Return all basket items for the given menu-item */
  	findForMenuItem: function(menuItem) {
  		var id = menuItem.get('id');
  		return this.findForMenuItemId(id);
  	},

    findForMenuItemId: function(id) {
      return this.filter(function(bItem) {
        return bItem.get('item').get('id') === id;
      });
    },

  	count: function() {
			var t = this.reduce(function(memo, item) {
				return memo + item.get("count");
			}, 0);

			return t;
  	},

    minLeadTime: function(defaultLead) {
      var t = this.reduce(function(memo, bItem) {
        // Return the longest lead time of all basket items
        var item = bItem.get("item");
        return Math.max(memo, (item.get("leadTime") || defaultLead));
      }, 0);

      return t;
    },

    minPickupTime: function(hours) {
      var now = Date.now();
      var t = this.reduce(function(memo, bItem) {
        // Return the longest lead time of all basket items
        var item = bItem.get("item"),
            leadDays = item.get("leadDays"),
            leadDaysTime = item.get("leadDaysTime") || 0;
        if ( leadDays > 0 ) {
          var s = new Date(),
              day = s.getDay()+1; // Javascript day is zero based

          // Get todays closing time
          var close = hours.getCloseTime(day);
          if ( close ) {
            var closeSplit = close.split(':');
            s.setHours(closeSplit[0], closeSplit[1], 0, 0);
            s.setMinutes(s.getMinutes() - leadDaysTime);
            // Make sure we are within days lead time
            if ( now > s.getTime() ) {
              close = false;
            }
          }

          if ( !close ) {
            // role the date to the next business day
            for ( i=0; i<7; i++ ) {
              // try next day
              s.setDate(s.getDate() + 1);
              close = hours.getCloseTime(s.getDay()+1);
              if ( close ) break;
            }
          }

          // roll by leadDays
          s.setDate(s.getDate() + leadDays);
          // Normailise the hour/minutes/seconds..
          s.setHours(0,0,0,0);

          return Math.max(memo, s.getTime());
        } else {
          return memo;
        }
      }, now);

      return t;
    },

    itemPickupTime: function() {
      // Return the min item time in the basket
      var t = this.reduce(function(min, bItem) {
        var item = bItem.get("item"),
            iPickup = item.get('pickupTime');

        if ( !iPickup ) {
          return min;
        } else {
          return (min && min < iPickup) ? min : iPickup;
        }
      }, null);

      return t && new Date(t);
    },

  	total: function() {
      if ( this.memTotal ) return this.memTotal.total;

			var t = this.reduce(function(memo, item) {
				return memo + item.get("price");
			}, 0);

			return Math.round(parseFloat(t) * Math.pow(10, 2)) / Math.pow(10, 2);
  	},

    checkDiscount: function(venue, options, ot, f) {
      var basket = this;
      $.ajax(_.defaults(options || {}, {
        type: 'POST',
        url: $settings.apiRoot + "orders/basket",
        data: JSON.stringify({
          v: venue.get('id'),
          ot: ot,
          i: this.map(function(item) {
              return item.toOrderJSON();
            }, this)
        }),
        contentType: 'application/json',
        success: function(data, status, xhr) {
          basket.loadingTotal = false;
          basket.memTotal = data;
          basket.trigger('total:change', data);
          if (typeof f !== "undefined"){
              f();
          }
        },
        error: function(xhr, errorType, error) {
          basket.loadingTotal = false;
          basket.memTotal = {discount: '???', total: '???', loadFailed: true};
          basket.trigger('total:change', basket.memTotal);
        }
      }));
    }

  });

  // Our module now returns our view
  return Basket;
});
define('router',[
  // Application.
  "app",
  "store",
  "views/home-view",
    "views/addresslist-view",
    "views/addressnew-view",
    "views/addressdetails-view",
  "views/venueevents-view",
  "views/invitedvenues-view",
  "views/venuedetails-view",
  "views/invitevenue-view",
  "views/venuessearch-view",
  "views/venuefavorites-view",
    "views/venuecontact-view",
  "views/venue-view",
  "views/outlet-location-view",
  "views/menus-view",
  "views/section-view",
  "views/basket-view",
  "views/basket-modifiers-view",
  "views/basket-mealdeals-view",
  "views/cards-view",
  "views/card-detail-view",
  "views/card-select-view",
  "views/login-view",
  "views/account-view",
  "views/checkout-view",
    "views/checkout-address-list-view",
  "views/orders-view",
  "views/order-detail-view",
  "views/message-view",
  "views/about-view",
  "views/demomode-view",
  "views/event-detail-view",
  "views/userprofile-view",
  "views/moreevents-view",
  "views/item-selected-modifiers-view",
  "views/item-selected-mealdeals-view",
    "views/checkout-update-mobile-view",
    "views/external-item-view",
  "models/menu",
  "models/menu-item",
  "models/user",
  "models/card",
    "models/address",
  "models/outlet-location-collection",
  "models/venue-user",
    "models/venue-collection",
    "models/venue",
    "models/basket",
    "models/address-collection",
    'models/settings-collection'
],

    function (app, Store, HomeView, AddresslistView, AddressnewView, AddressdetailsView, VenueeventsView, InvitedvenuesView, 
      VenuedetailsView, InvitevenueView, VenuessearchView, VenuefavoritesView, VenuecontactView, VenueView, OutletLocationView, 
      MenusView, SectionView, BasketView, BasketModifiersView, BasketMealdealsView, CardsView, CardDetailView, CardSelectView, 
      LoginView, AccountView, CheckoutView, CheckoutAddressListView, OrdersView, OrderDetailView, MessageView, AboutView, 
      DemomodeView, EventDetailView, UserprofileView, MoreeventsView, ItemSelectedModifiersView, ItemSelectedMealdealsView, 
      UpdateMobileView, ExternalItemView, Menu, MenuItem, User, Card, Address, OutletLocationCollection, VenueUser, VenueCollection, 
      venue, Basket, AddressCollection, settingsCollection) {

  // Defining the application router, you can attach sub routers here.
  var Router = Backbone.Router.extend({
            initialize: function () {
                this.bind('all', function (route) {
                  // store last route
                  lastRoute = window.location.hash.split('#')[1];
                });
            },
    routes: {
      "": "index",
                "addresslist": "addresslist",
                "addressnew(/:id)": "addressnew",
                "addressdetails/:id": "addressdetails",
      "venueevents(/:venueId)": "venueevents",
      "invitevenue": "invitevenue",
      "invitedvenues": "invitedvenues",
      "venuedetails": "venuedetails",
      "venuessearch(/:search)": "venuessearch",
      "venuefavorites": "venuefavorites",
                "venuecontact/:id": "venuecontact",
      "venue/:id": "venue",
      "venue/:id/outlet-location(/:root)": "outletLocation",
      "menus": "menus",
      "menu/:id": "menu",
      "outlet/:id": "outlet",
      "section/:id": "section",
      "modifiers/:itemId": "modifiers",
      "item-selected-modifiers(/:id)": "editItemSelectedModifers",
      "mealdeals/:itemId": "mealdeals",
      "item-selected-mealdeals(/:id)": "editItemSelectedMealdeals",
      "basket": "basket",
      "cards": "cards",
      "card-new": "cardNew",
      "card-detail/:id": "cardDetail",
      "card-select": "cardSelect",
      "event-detail/:id": "eventDetail",
      "login(/:redirect)": "login",
      "account(/:redirect)": "account",
      "checkout": "checkout",
                "checkoutaddresslist": "checkoutaddresslist",
                "checkoutaddressnew": "checkoutaddressnew",
                "checkoutcardnew": "checkoutcardnew",
      "order-success": "orderSuccess",
      "order-detail(/:id)": "orderDetail",
      "orders": "orders",
      "about": "about",
      "demomode": "demomode",
      "userprofile": "userprofile",
      "moreevents/:venueId": "moreevents",
      "message": "message",
                "updatemobile": "updatemobile",
      "external/:itemId": "external",
      "*notFound": "notFound"
    },


    index: function() {
      console.log("show:HomeView");
      //app.setCurrentVenue();

      var venue = app.currentVenue;

      if ( venue ) {
/*        if ( app.basket ) {
          if ( app.viewsStack.length > 1 ) {
            var ref = app.viewsStack[ app.viewsStack.length - 2 ];
            ref.instance = null;
          }
          app.basket = new Basket();
        }*/

        var outlet = venue.get('outlets')[0];
        app.router.navigate("outlet/" + outlet.id, true);                

      }

    },

            addresslist: function () {
                console.log("show:AddresslistView");
                app.show(AddresslistView, { collection: app.user.get('addresses') }, app.fx.None);
            },

            addressnew: function (addressId) {
                console.log("show:AddressnewView");
                if (addressId && !app.user.get('addresses').get(addressId)) {
                    app.router.navigate('#addressnew');
                }
                app.show(AddressnewView, {model: addressId ? app.user.get('addresses').get(addressId) : new Address({ userId: app.user.get('id'), id: addressId })  });
            },

            addressdetails: function (addressId) {
                console.log("show:AddressdetailsView");
                if (addressId && !app.user.get('addresses').get(addressId)) {
                    window.history.back();
                } else {
                    app.show(AddressdetailsView, { model: app.user.get('addresses').get(addressId) });
                }
            },

    venueevents: function(venueId) {
      console.log("show:VenueeventsView");
      app.store = new Store({venueId: venueId});
      app.store.load()//{success: function() {
      app.setCurrentVenue(app.store.getVenue());
	      app.show(VenueeventsView, {
	        model: app.currentVenue,
	        header: {left: _.tr('Venues'), options: {className: 'invert'}, right: "settings"}
	     	});
    },

    venueoutlet: function(venue, event, callback) {
      console.log("Get outlet for venue");
      app.store = new Store(venue instanceof Backbone.Model ? {venue: venue} : {venueId: venue});
      app.setCurrentVenue(app.store.getVenue());
      app.setCurrentEvent(event);
      app.store.load({
        venue: app.store.getVenue(),
        success: function(venue) {
          // If we have multiple outlets go to outletlocation
/*          if ( venue.outlets.length > 1 || venue.get('toSeatFlag') ) {
            // go to seat selection
            var rootLocation = app.currentEvent && app.currentEvent.outletLocationId;
            app.router.navigate('venue/' + venue.get('id') + '/outlet-location' + (rootLocation ? '/' + rootLocation : ""), true);

          } else {*/

            if (callback && typeof callback === 'function'){
              callback(venue.outlets);
            }

          //}
        },
        error: function(venue, resp, options) {
          console.log('error app store');
          // Alert the user
          navigator.notification.alert(
            _.tr('We could not load the latest menu. Make sure you have a network connection and try again.'),
                            function () {
                            },         // callback
            _.tr('Network error')      // buttonName
          );
        }});
    },

    venuefavorites: function() {
    	console.log("show:VenuefavoritesView");
      app.show(VenuefavoritesView, {
        collection: app.savedVenues,
        header: {homepage: {className: 'homepage-alt', classNameLogo: 'colour'}, left: _.tr('Home') }
     	});
    },

            venuecontact: function (venueId) {
                console.log("show:VenuecontactView");
                app.show(VenuecontactView, { model: app.store.getVenue() }, app.fx.None);
            },

    venuessearch: function(search) {
    	console.log("show:VenuessearchView");

    	// Do the search
    	var coll = new Backbone.Collection();
    	coll.fetch({
	    	url: $settings.apiRoot + 'venues/invites/search',
	    	data: {
		    	name: search
	    	},
	    	success: function() {

		      app.show(VenuessearchView, {
		        collection: coll,
		        header: {homepage: {className: 'homepage-alt', classNameLogo: 'colour'}, left: _.tr('Back') }
		     	});

	    	},
	    	error: function() {
		    	// alert
		    	console.log('search failed');
	    	}
    	});
    },

    invitedvenues: function() {
    	console.log("show:InvitedvenuesView");
      app.show(InvitedvenuesView, {
        model: app.currentVenue,
        header: {homepage: {className: 'homepage-alt', classNameLogo: 'colour'}, left: _.tr('Home') }
     	});
    },

    invitevenue: function() {
    	console.log("show:InvitevenueView");
      app.show(InvitevenueView, {
        model: app.currentVenue,
        header: {homepage: {className: 'homepage-alt', classNameLogo: 'colour'}, left: _.tr('Back') }
     	});
    },

    venuedetails: function(venue) {
    	console.log("show:VenuedetailsView");
			this.navigate('#venuedetails');
      app.show(VenuedetailsView, {
        model: venue,
        header: {homepage: {className: 'homepage-alt', classNameLogo: 'colour'}, left: _.tr('Back') }
     	});
    },

    userprofile: function() {
    	console.log("show:UserprofileView");
    	app.show(UserprofileView, {
    		model: app.user,
        header: {
        	left: _.tr('Back'),
        	venue: app.currentVenue && app.currentVenue.toJSON()
        }
    	}, app.fx.None);
    },


    venue: function(id) {
      console.log("show:VenueView");
      app.show(VenueView, {
        collection: app.store.getVenue(id),
        header: {left: _.tr('Events'), right: "settings"},
        stackMethod: "replaceAll"
      });
    },

    outletLocation: function(venueId, rootId) {
    	console.log("show:outletLocationView");
      var olCollection = new OutletLocationCollection(null, {
        venueId: venueId,
        filter: {root: rootId}
      });

      olCollection.load();

    	app.show(OutletLocationView, {
        collection: olCollection,
        header: {
          left: _.tr('Home'),
          right: "settings",
          venue: app.currentVenue && app.currentVenue.toJSON()
        }
    	});
    },

    menus: function() {
    	console.log("show:MenusView");
    	app.show(MenusView, {
    		collection: app.store.getMenus(),
    		header: {
                        right: "settings"
    			//basket: app.basket
    		},
    		stackMethod: "replaceAll"
    	});
    },

    outlet: function(id) {
    	console.log("show:OutletView");

      app.setCurrentOutlet(app.store.getOutlet(id));

      var defaultMenu = app.store.getOutletMenu(id);
    	app.show(SectionView, {
    		model: defaultMenu,
        offers: app.currentVenue && app.currentVenue.offers,
    		header: {
    			left: _.tr('Venue'),
    			right: "settings",
    			basket: app.basket,
    			format: app.templateHelper.format,
    			venue: app.currentVenue && app.currentVenue.toJSON()
    		}
    	});
    },

    menu: function(id) {
      console.log("show:MenuView");
      var model = app.store.getMenu(id);
      // TODO: Remove this hack to stop menu loading more than once
      if (model && model.get('sections').length <= 0) model.fetch();
      app.show(SectionView, {
        model: model,
        header: {
          left: _.tr('Seat'),
          basket: app.basket,
    			format: app.templateHelper.format
        }
      });
    },

    section: function(id) {
    	console.log("show:SectionView");
    	app.show(SectionView, {
        model: app.store.getSection(id),
        header: {
          left: _.tr('Back'),
          right: "",
          basket: app.basket,
          format: app.templateHelper.format,
          venue: app.currentVenue && app.currentVenue.toJSON()
        }
      });
    },

    basket: function() {
      console.log("show:BasketView");

                //If the venue has offers calc any discounts.
                if ((app.currentVenue.offers && app.currentVenue.offers.length > 0)) {
        app.basket.loadingTotal = true;
      }

                var str = (app.deliveryState === true) ? "DELIVERY" : "PICKUP";
                app.basket.checkDiscount(app.store.getVenue(), {}, str, function(){
      app.show(BasketView, {
        model: app.basket,
        header: {
          left: _.tr('Back'),
          right: "settings",
          txtcheckout: "Checkout",
          basket: app.basket,
    			format: app.templateHelper.format,
    			venue: app.currentVenue && app.currentVenue.toJSON()
        }
      });
                });


    },

    modifiers: function(item, mods) {
    	console.log("show:BasketModifiersView");
    	if ( item instanceof Backbone.Model ) {
	    	this.navigate("modifiers/" + (item.get('item') ? item.get('item').get('id') : item.get('id')), {replace: false});
	    	app.show(BasketModifiersView, {item: item}, app.fx.Stack);
    	} else {
    		item = new MenuItem({id: item});
    		item.fetch({
    			success: function() {
    	    	app.show(BasketModifiersView, {item: item}, app.fx.Stack);
    			}
    		});
    	}
    },


    mealdeals: function(item, mods) {
    	console.log("show:BasketMealdealsView");
    	if ( item instanceof Backbone.Model ) {
	    	this.navigate("mealdeals/" + (item.get('item') ? item.get('item').get('id') : item.get('id')), {replace: false});
	    	app.show(BasketMealdealsView, {item: item}, app.fx.Stack);
    	} else {
    		item = new MenuItem({id: item});
    		item.fetch({
    			success: function() {
    	    	app.show(BasketMealdealsView, {item: item}, app.fx.Stack);
    			}
    		});
    	}
    },

    eventDetail: function(id) {
      console.log("show:EventDetailView");
      app.show(EventDetailView, {model: app.store.getEvent(id)});
    },

    editItemSelectedModifers: function( menuItem ) {
	  	var items;

      if ( menuItem instanceof Backbone.Model ) {
        items = app.basket.findForMenuItem(menuItem);
      	this.navigate("item-selected-modifiers/" + menuItem.get('id'), {replace: false});
      } else {
        items = app.basket.findForMenuItemId(menuItem);
      }
    	app.show(ItemSelectedModifiersView, {
	    	collection: items
    	}, app.fx.Stack);
    },

    editItemSelectedMealdeals: function( menuItem ) {
	  	var items;

      if ( menuItem instanceof Backbone.Model ) {
        items = app.basket.findForMenuItem(menuItem);
      	this.navigate("item-selected-mealdeals/" + menuItem.get('id'), {replace: false});
      } else {
        items = app.basket.findForMenuItemId(menuItem);
      }
    	app.show(ItemSelectedMealdealsView, {
	    	collection: items
    	}, app.fx.Stack);
    },


    cards: function() {
    	console.log("show:CardsView");
    	app.show(CardsView, {collection: app.user.get('paymentMethods')}, app.fx.None);
    },

    cardNew: function() {
    	console.log("show:CardDetailView");
    	app.show(CardDetailView, {model: new Card({userId: app.user.get('id'), name: app.user.get('name')})});
    },

    cardDetail: function(id) {
    	console.log("show:CardDetailView");
    	app.show(CardDetailView, {model: app.user.get('paymentMethods').get(id)});
    },

    cardSelect: function() {
    	console.log("show:CardSelectView");
    	app.show(CardSelectView, {model: app.user});
    },

    login: function(options) {
    	console.log("show:LoginView");

      if ( !_.isObject(options) ) {
        options = {
          redirect : options
        }
      }

      _.defaults(options, {
        animation: options.redirect ? app.fx.Stack : app.fx.None,
        navigate: false
      });

      if ( options.navigate ) {
        this.navigate('#login/' + Backbone.history.fragment);
      }

    	app.show(LoginView, options, options.animation);
    },

    account: function(redirect) {
    	console.log("show:AccountView");
      var model = new VenueUser({}, {
        venueId: $settings.app.venueId,
        userId: app.user.get('id')
      });

      model.fetch();

    	app.show(AccountView, {
        model: {
          user: app.user || new User(),
          venueUser: model
        },
        redirect: redirect
      }, redirect && app.fx.None);
    },

    checkout: function() {
                if (!app.user) {
                    console.log('triggered');
                    // must check if user is logged in before checkout render
                    lastRoute != 'login' ? this.navigate('#login', true) : window.history.back();
                }
                else if (app.deliveryState && !app.user.get('phone')) {
                    // redirect before checkout if no mobile number is set
                    lastRoute != 'updatemobile' ? this.navigate('#updatemobile', true) : window.history.back();
                }
                else if (app.deliveryState && !app.user.get('addresses').length) {
                    // redirect before checkout if this is a delivery order and no delivery address is set
                    lastRoute != 'checkoutaddressnew' ? this.navigate('#checkoutaddressnew', true) : window.history.back();
                }
                else if (!app.user.get('paymentMethods').length || !app.user.get('selectedMethod')) {
                    // redirect before checkout if no payment method is set
                    lastRoute != 'checkoutcardnew' ? this.navigate('#checkoutcardnew', true) : window.history.back();
                }
                else {
                    // all requirements met, proceed to checkout
    	app.show(CheckoutView, {
        model: {
          venue: app.store.getVenue(),
          outlet: app.outlet,
    			basket: app.basket,
    			user: app.user
    		},
        header: {
          left: _.tr('Cancel'),
					venue: app.currentVenue && app.currentVenue.toJSON()
        }
    	});
                }
    },

            checkoutaddresslist: function () {
                console.log("show:CheckoutAddressListView");
                app.show(CheckoutAddressListView, { collection: app.user.get('addresses') }, app.fx.None);
            },

            checkoutaddressnew: function () {
                console.log("show:CheckoutAddressNewView");
                app.show(AddressnewView, {model: new Address({ userId: app.user.get('id')}), showSaveToggle: true });
            },
            checkoutcardnew: function () {
                console.log("show:CardDetailView");
                app.show(CardDetailView, {model: new Card({userId: app.user.get('id'), name: app.user.get('name')}), showSaveToggle: true});
            },
    orders: function() {
      console.log("show:OrdersView");
      app.show(OrdersView, {
        collection: app.store.getLatestOrders(app.user.get('id'), 20)
      }, app.fx.None);
    },

    orderDetail: function(id) {
    	console.log("show:OrderView");
    	app.show(OrderDetailView, {
    		model: !!id ? app.store.getOrder(id) : app.lastOrder,
        header: !!id && {
        	left: _.tr('Back'),
					venue: app.currentVenue && app.currentVenue.toJSON()
        },
        hideDone: true
    	}, !id && app.fx.Stack);

    },

    orderSuccess: function() {
      console.log("show:OrderSuccessView");
      app.show(OrderDetailView, {
        model: app.lastOrder,

        header: {
					venue: app.currentVenue && app.currentVenue.toJSON()
        },
        stackMethod: 'replaceAll',
        replaceLength: app.viewsStack.length -1
      }, app.fx.Stack);

    },

    about: function() {
    	console.log("show:AboutView");
    	app.show(AboutView, {}, app.fx.None );

    },

    addExternalItem: function(menuItem) {
      console.log("add external item");

      var view = new ExternalItemView({
        model: menuItem
      });

      
      if ( ExternalItemView.secure === true && !_.isObject(app.user) ) {
        // Make sure we have a logged in ueser
        this.login({
          navigate: true,
          animation: app.fx.Stack,
          callback: function(user) {
            if ( user ) {
              view.render();
            }
          }
        });
      } else {
        // We don't app.show here because this
        // view renders in inAppBrowser
        view.render();        
      }


    },

    editExternalItem: function(menuItem) {
      console.log("edit external item");

      // We don't app.show here because this
      // view renders in inAppBrowser
      new ExternalItemView({
        model: menuItem,
        action: 'EDIT'
      }).render();

    },

    demomode: function() {
    	console.log("show:DemomodeView");
    	app.show(DemomodeView, {});
    },

    moreevents: function(venueId) {
      console.log("show:MoreeventsView");
      app.store = new Store({venueId: venueId});
      app.store.load()//{success: function() {
      app.setCurrentVenue(app.store.getVenue());
	      app.show(MoreeventsView, {
	        model: app.currentVenue,
	        header: {
		        left: _.tr('Events'), right: "settings",
						venue: app.currentVenue && app.currentVenue.toJSON()
					}
	     	});
    },


    message: function() {
      console.log("show:MessageView");
      app.show(MessageView, {
        model: app.message,
        stackMethod: 'replaceAll',
        replaceLength: app.viewsStack.length -1
      }, app.fx.None);
    },

    notFound: function(route) {
    	console.log("404: Route " + route + " not found.");
    	window.history.back();
            },
            updatemobile: function () {
                console.log("show:UpdateMobile View");
                app.show(UpdateMobileView, {});
    }
  });

  return Router;

});


define('plugins/text!templates/sidebar.html',[],function () { return '<div class="bar-title">\r\n    <h1 class="title"><%- venue && venue.name %></h1>\r\n</div>\r\n<ul class="list">\r\n    <% if ( user ) { %>\r\n    <li>\r\n        <a href="#venuecontact/<%- venue && venue.id %>" class="menu-item-venuecontact"><%- _.tr("Venue Contact Details") %><span class="menu-icons venuecontact"></span></a>\r\n    </li>\r\n    <li>\r\n        <a href="#orders" class="menu-item-orders"><%- _.tr("Previous Orders") %> <span class="menu-icons prevorders"></span></a>\r\n    </li>\r\n    <li>\r\n        <a href="#userprofile" class="menu-item-userprofile"><%- user.name %> <span class="menu-icons user"></span></a>\r\n    </li>\r\n    <li>\r\n        <a href="#cards" class="menu-item-cards"><%- _.tr("Stored Cards") %> <span class="menu-icons storedcards"></span></a>\r\n    </li>\r\n    <li>\r\n        <a href="#addresslist" class="menu-item-addresslist"><%- _.tr("Delivery Addresses") %><span class="menu-icons mystoredaddresses"></span></a>\r\n    </li>\r\n    \r\n    <li>\r\n        <a href="#about" class="menu-item-about"><%- _.tr("About") %> <span class="menu-icons about"></span></a>\r\n    </li>\r\n    <li>\r\n        <a class="logout" class="menu-item-logout"><%- _.tr("Logout") %> <span class="menu-icons logout"></span></a>\r\n    </li>\r\n    <%\r\n    } else {\r\n    %>\r\n    <li>\r\n        <a href="#login" class="menu-item-login"><%- _.tr("Login") %> <span class="menu-icons login"></span></a>\r\n    </li>\r\n    <li>\r\n        <a href="#about" class="menu-item-about"><%- _.tr("About") %> <span class="menu-icons about"></span></a>\r\n    </li>\r\n    <% } %>\r\n</ul>\r\n<div class="bar-footer menu"></div>\r\n';});

// Filename: views/sidebar-view
define('views/sidebar-view',[
  'jquery',
  'underscore',
  'backbone',
  'plugins/text!templates/sidebar.html',
  'plugins/text!templates/header.html',
  'app'
], function($, _, Backbone, template, tmplHeader, app){

	function isOpen() {
		return $('.appMenuBtn').attr('data-asdMenuOpen') == "true"
	}
	function touchClose(e) {
		e.stopPropagation(); 
		e.preventDefault();
		asdMenu(true);
		return false;
	}
	
	function asdMenu(asdMenuClose) {
			var
				appMenuBtn = $('.appMenuBtn'),
				appMenu = $('#appMenu'),
				appElem = $('header, .bar-footer:not(.menu), .content');
			if (!isOpen() && !asdMenuClose) {
				$('.content').one('touchstart MSPointerDown pointerdown', touchClose);
				if ($.browser.ie) {
					appMenu.anim({ visibility: 'visible'}, 0.4, 'ease-in');
					appMenu.anim({ right: '0'}, 0.4, 'ease-in');
					appElem.anim({ left: '-260px'}, 0.4, 'ease-in');
				} else {
					appMenu.anim({ visibility: 'visible'}, 0.4, 'ease-in');
					appMenu.anim({ translateX: '-260px'}, 0.4, 'ease-in');
					appElem.anim({ translateX: '-260px'}, 0.4, 'ease-in');
				}
				appMenuBtn.attr('data-asdMenuOpen', "true");
			} else {
				$('.content').off('touchstart MSPointerDown pointerdown', touchClose);
				if ($.browser.ie) {
					appMenu.anim({ visibility: 'visible'}, 0.4, 'ease-in');
					appMenu.anim({ right: '-260px'}, 0.4, 'ease-in');
					appElem.anim({ left: '0'}, 0.4, 'ease-in');
				} else {
					appMenu.anim({ translateX: '0'}, 0.4, 'ease-in');
					appElem.anim({ translateX: '0px'}, 0.4, 'ease-out');				
				}
				appMenuBtn.attr('data-asdMenuOpen', "false");
			}

		};


  var View = Backbone.View.extend({
		el : ".appMenu",
  	events: {
			'tap .logout': function(e) { app.logout(true); this.render(); },
			'tap .list li': function(e) { asdMenu(); }
  	},
  	
		initialize: function() {
	    
	    $(document).on("tap", ".appMenuBtn", function(event) {
				asdMenu();
				return false;
			});
			
			this.listenTo(app, 'user:create-success user:login-success user:logout user:change-success', this.render);
			
		},
		venueChange: function() {
			if ( this.currentView ) {
				this.stopListening(this.currentVenue);
			}
			this.currentVenue = app.currentVenue;
			if (this.currentVenue) {
				this.listenTo(app.currentVenue, 'change', this.render);
			}
			this.render();

		},
  	
    render: function(){
    	console.log("render:SidebarView");
			// Render side bar
      var compiledTemplate = _.template( template, { 
      	user: app.user ? app.user.toJSON() : false,
      	venue: app.currentVenue && app.currentVenue.toJSON()
      });
			this.$el.html( compiledTemplate );
    },

    toggle: function(closeMenu) {
    	asdMenu(closeMenu);
    },

    isOpen: function() {
    	return isOpen();
    }
      	
  });
  
  return View;
});


define('plugins/text!templates/colLeft.html',[],function () { return '<% if (settings && settings.logo){ %>\r\n<img src="/web-order- format.img(settings.logo) %>" alt="" id="logoVenue" onError="this.parentElement.removeChild(this);" />\r\n<% } %>\r\n<% if ( hoursVerify ) { %>\r\n<div class="itemLeft firstItem">\r\n    <h3 class="titleAddressVenue"><%- _.tr(\'Opening Times\') %></h6>\r\n    <% _.each(hours, function(item){ %>\r\n        <% _.each(item, function(hour, key){ %>\r\n            <% if (key == 0) { %>\r\n                <p class="address complete">\r\n                    <span class="day"><%- getDayAsString(hour.day) %></span>\r\n                    <span class="hour"><%- formatHour(hour.open) %>-<%- formatHour(hour.close) %></span> \r\n                </p>\r\n            <% } else { %>\r\n                <p class="address"><span class="hour"><%- formatHour(hour.open) %>-<%- formatHour(hour.close) %></span></p>\r\n            <% }%>\r\n        <% }); %>\r\n    <% }); %>\r\n</div>\r\n<% } %>\r\n<% if ( address.one || address.two || address.three) { %>\r\n<div class="itemLeft <%- (!hoursVerify ? \'firstItem\' : \'\') %>" id="blockAddress">\r\n    <h3 class="titleAddressVenue"><%- _.tr(\'Address\') %></h6>\r\n    <% if ( address.one ) { %>\r\n    <p><%- address.one %></p>\r\n    <% } %>\r\n    <% if ( address.two ) { %>\r\n    <p><%- address.two %></p>\r\n    <% } %>\r\n    <% if ( address.three ) { %>\r\n    <p><%- address.three %></p>\r\n    <% } %>\r\n</div>\r\n<% } %>\r\n\r\n<% if (settings && settings.deliveryPhone ) { %>\r\n<div class="itemLeft">\r\n    <h3 class="titleAddressVenue"><%- _.tr("Telephone") %></h6>\r\n    <p><%- settings.deliveryPhone %></p>\r\n</div>\r\n<% } %>\r\n\r\n<% if (settings && settings.deliveryPhone ) { %>\r\n<div class="itemLeft lastItem">\r\n    <h3 class="titleAddressVenue"><%- _.tr("Delivery Zone") %></h6>\r\n    <p><%- settings.deliveryZone %></p>\r\n</div>\r\n<% } %>';});


define('plugins/text!templates/colRight.html',[],function () { return '<div class="advertising">\r\n    <h3>Got a smart phone?</h3>\r\n    <p class="bold">Download our app and order direct from your phone!</p>\r\n    <img src="/web-order/images/myorderapp.png" alt="My order app" />\r\n    <p class="code">Our shotcode: <span class="code"><%- venue.attributes.code %></span></p>\r\n</div>';});

// Backbone.Validation v0.7.1
//
// Copyright (c) 2011-2012 Thomas Pedersen
// Distributed under MIT License
//
// Documentation and full license available at:
// http://thedersen.com/projects/backbone-validation
Backbone.Validation = (function(_){
  'use strict';

  // Default options
  // ---------------

  var defaultOptions = {
    forceUpdate: false,
    selector: 'name',
    labelFormatter: 'sentenceCase',
    valid: Function.prototype,
    invalid: Function.prototype
  };


  // Helper functions
  // ----------------

  // Formatting functions used for formatting error messages
  var formatFunctions = {
    // Uses the configured label formatter to format the attribute name
    // to make it more readable for the user
    formatLabel: function(attrName, model) {
      return defaultLabelFormatters[defaultOptions.labelFormatter](attrName, model);
    },

    // Replaces nummeric placeholders like {0} in a string with arguments
    // passed to the function
    format: function() {
      var args = Array.prototype.slice.call(arguments),
          text = args.shift();
      return text.replace(/\{(\d+)\}/g, function(match, number) {
        return typeof args[number] !== 'undefined' ? args[number] : match;
      });
    }
  };

  // Flattens an object
  // eg:
  //
  //     var o = {
  //       address: {
  //         street: 'Street',
  //         zip: 1234
  //       }
  //     };
  //
  // becomes:
  //
  //     var o = {
  //       'address.street': 'Street',
  //       'address.zip': 1234
  //     };
  var flatten = function (obj, into, prefix) {
    into = into || {};
    prefix = prefix || '';

    _.each(obj, function(val, key) {
      if(obj.hasOwnProperty(key)) {
        if (val && typeof val === 'object' && !(val instanceof Date || val instanceof RegExp)) {
          flatten(val, into, prefix + key + '.');
        }
        else {
          into[prefix + key] = val;
        }
      }
    });

    return into;
  };

  // Validation
  // ----------

  var Validation = (function(){

    // Returns an object with undefined properties for all
    // attributes on the model that has defined one or more
    // validation rules.
    var getValidatedAttrs = function(model) {
      return _.reduce(_.keys(model.validation || {}), function(memo, key) {
        memo[key] = void 0;
        return memo;
      }, {});
    };

    // Looks on the model for validations for a specified
    // attribute. Returns an array of any validators defined,
    // or an empty array if none is defined.
    var getValidators = function(model, attr) {
      var attrValidationSet = model.validation ? model.validation[attr] || {} : {};

      // If the validator is a function or a string, wrap it in a function validator
      if (_.isFunction(attrValidationSet) || _.isString(attrValidationSet)) {
        attrValidationSet = {
          fn: attrValidationSet
        };
      }

      // Stick the validator object into an array
      if(!_.isArray(attrValidationSet)) {
        attrValidationSet = [attrValidationSet];
      }

      // Reduces the array of validators into a new array with objects
      // with a validation method to call, the value to validate against
      // and the specified error message, if any
      return _.reduce(attrValidationSet, function(memo, attrValidation) {
        _.each(_.without(_.keys(attrValidation), 'msg'), function(validator) {
          memo.push({
            fn: defaultValidators[validator],
            val: attrValidation[validator],
            msg: attrValidation.msg
          });
        });
        return memo;
      }, []);
    };

    // Validates an attribute against all validators defined
    // for that attribute. If one or more errors are found,
    // the first error message is returned.
    // If the attribute is valid, an empty string is returned.
    var validateAttr = function(model, attr, value, computed) {
      // Reduces the array of validators to an error message by
      // applying all the validators and returning the first error
      // message, if any.
      return _.reduce(getValidators(model, attr), function(memo, validator){
        // Pass the format functions plus the default
        // validators as the context to the validator
        var ctx = _.extend({}, formatFunctions, defaultValidators),
            result = validator.fn.call(ctx, value, attr, validator.val, model, computed);

        if(result === false || memo === false) {
          return false;
        }
        if (result && !memo) {
          return validator.msg || result;
        }
        return memo;
      }, '');
    };

    // Loops through the model's attributes and validates them all.
    // Returns and object containing names of invalid attributes
    // as well as error messages.
    var validateModel = function(model, attrs) {
      var error,
          invalidAttrs = {},
          isValid = true,
          computed = _.clone(attrs),
          flattened = flatten(attrs);

      _.each(flattened, function(val, attr) {
        error = validateAttr(model, attr, val, computed);
        if (error) {
          invalidAttrs[attr] = error;
          isValid = false;
        }
      });

      return {
        invalidAttrs: invalidAttrs,
        isValid: isValid
      };
    };

    // Contains the methods that are mixed in on the model when binding
    var mixin = function(view, options) {
      return {

        // Check whether or not a value passes validation
        // without updating the model
        preValidate: function(attr, value) {
          return validateAttr(this, attr, value, _.extend({}, this.attributes));
        },

        // Check to see if an attribute, an array of attributes or the
        // entire model is valid. Passing true will force a validation
        // of the model.
        isValid: function(option) {
          var flattened = flatten(this.attributes);

          if(_.isString(option)){
            return !validateAttr(this, option, flattened[option], _.extend({}, this.attributes));
          }
          if(_.isArray(option)){
            return _.reduce(option, function(memo, attr) {
              return memo && !validateAttr(this, attr, flattened[attr], _.extend({}, this.attributes));
            }, true, this);
          }
          if(option === true) {
            this.validate();
          }
          return this.validation ? this._isValid : true;
        },

        // This is called by Backbone when it needs to perform validation.
        // You can call it manually without any parameters to validate the
        // entire model.
        validate: function(attrs, setOptions){
          var model = this,
              validateAll = !attrs,
              opt = _.extend({}, options, setOptions),
              validatedAttrs = getValidatedAttrs(model),
              allAttrs = _.extend({}, validatedAttrs, model.attributes, attrs),
              changedAttrs = flatten(attrs || allAttrs),

              result = validateModel(model, allAttrs);

          model._isValid = result.isValid;

          // After validation is performed, loop through all changed attributes
          // and call the valid callbacks so the view is updated.
          _.each(validatedAttrs, function(val, attr){
            var invalid = result.invalidAttrs.hasOwnProperty(attr);
            if(!invalid){
              opt.valid(view, attr, opt.selector);
            }
          });

          // After validation is performed, loop through all changed attributes
          // and call the invalid callback so the view is updated.
          _.each(validatedAttrs, function(val, attr){
            var invalid = result.invalidAttrs.hasOwnProperty(attr),
                changed = changedAttrs.hasOwnProperty(attr);

            if(invalid && (changed || validateAll)){
              opt.invalid(view, attr, result.invalidAttrs[attr], opt.selector);
            }
          });

          // Trigger validated events.
          // Need to defer this so the model is actually updated before
          // the event is triggered.
          _.defer(function() {
            model.trigger('validated', model._isValid, model, result.invalidAttrs);
            model.trigger('validated:' + (model._isValid ? 'valid' : 'invalid'), model, result.invalidAttrs);
          });

          // Return any error messages to Backbone, unless the forceUpdate flag is set.
          // Then we do not return anything and fools Backbone to believe the validation was
          // a success. That way Backbone will update the model regardless.
          if (!opt.forceUpdate && _.intersection(_.keys(result.invalidAttrs), _.keys(changedAttrs)).length > 0) {
            return result.invalidAttrs;
          }
        }
      };
    };

    // Helper to mix in validation on a model
    var bindModel = function(view, model, options) {
      _.extend(model, mixin(view, options));
    };

    // Removes the methods added to a model
    var unbindModel = function(model) {
      delete model.validate;
      delete model.preValidate;
      delete model.isValid;
    };

    // Mix in validation on a model whenever a model is
    // added to a collection
    var collectionAdd = function(model) {
      bindModel(this.view, model, this.options);
    };

    // Remove validation from a model whenever a model is
    // removed from a collection
    var collectionRemove = function(model) {
      unbindModel(model);
    };

    // Returns the public methods on Backbone.Validation
    return {

      // Current version of the library
      version: '0.7.1',

      // Called to configure the default options
      configure: function(options) {
        _.extend(defaultOptions, options);
      },

      // Hooks up validation on a view with a model
      // or collection
      bind: function(view, options) {
        var model = view.model,
            collection = view.collection;

        options = _.extend({}, defaultOptions, defaultCallbacks, options);

        if(typeof model === 'undefined' && typeof collection === 'undefined'){
          throw 'Before you execute the binding your view must have a model or a collection.\n' +
                'See http://thedersen.com/projects/backbone-validation/#using-form-model-validation for more information.';
        }

        if(model) {
          bindModel(view, model, options);
        }
        else if(collection) {
          collection.each(function(model){
            bindModel(view, model, options);
          });
          collection.bind('add', collectionAdd, {view: view, options: options});
          collection.bind('remove', collectionRemove);
        }
      },

      // Removes validation from a view with a model
      // or collection
      unbind: function(view) {
        var model = view.model,
            collection = view.collection;

        if(model) {
          unbindModel(view.model);
        }
        if(collection) {
          collection.each(function(model){
            unbindModel(model);
          });
          collection.unbind('add', collectionAdd);
          collection.unbind('remove', collectionRemove);
        }
      },

      // Used to extend the Backbone.Model.prototype
      // with validation
      mixin: mixin(null, defaultOptions)
    };
  }());


  // Callbacks
  // ---------

  var defaultCallbacks = Validation.callbacks = {

    // Gets called when a previously invalid field in the
    // view becomes valid. Removes any error message.
    // Should be overridden with custom functionality.
    valid: function(view, attr, selector) {
      view.$('[' + selector + '~="' + attr + '"]')
          .removeClass('invalid')
          .removeAttr('data-error');
    },

    // Gets called when a field in the view becomes invalid.
    // Adds a error message.
    // Should be overridden with custom functionality.
    invalid: function(view, attr, error, selector) {
      view.$('[' + selector + '~="' + attr + '"]')
          .addClass('invalid')
          .attr('data-error', error);
    }
  };


  // Patterns
  // --------

  var defaultPatterns = Validation.patterns = {
    // Matches any digit(s) (i.e. 0-9)
    digits: /^\d+$/,

    // Matched any number (e.g. 100.000)
    number: /^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/,

    // Matches a valid email address (e.g. mail@example.com)
    email: /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i,

    // Mathes any valid url (e.g. http://www.xample.com)
    url: /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i
  };


  // Error messages
  // --------------

  // Error message for the build in validators.
  // {x} gets swapped out with arguments form the validator.
  var defaultMessages = Validation.messages = {
    required: '{0} is required',
    acceptance: '{0} must be accepted',
    min: '{0} must be greater than or equal to {1}',
    max: '{0} must be less than or equal to {1}',
    range: '{0} must be between {1} and {2}',
    length: '{0} must be {1} characters',
    minLength: '{0} must be at least {1} characters',
    maxLength: '{0} must be at most {1} characters',
    rangeLength: '{0} must be between {1} and {2} characters',
    oneOf: '{0} must be one of: {1}',
    equalTo: '{0} must be the same as {1}',
    pattern: '{0} must be a valid {1}'
  };

  // Label formatters
  // ----------------

  // Label formatters are used to convert the attribute name
  // to a more human friendly label when using the built in
  // error messages.
  // Configure which one to use with a call to
  //
  //     Backbone.Validation.configure({
  //       labelFormatter: 'label'
  //     });
  var defaultLabelFormatters = Validation.labelFormatters = {

    // Returns the attribute name with applying any formatting
    none: function(attrName) {
      return attrName;
    },

    // Converts attributeName or attribute_name to Attribute name
    sentenceCase: function(attrName) {
      return attrName.replace(/(?:^\w|[A-Z]|\b\w)/g, function(match, index) {
        return index === 0 ? match.toUpperCase() : ' ' + match.toLowerCase();
      }).replace('_', ' ');
    },

    // Looks for a label configured on the model and returns it
    //
    //      var Model = Backbone.Model.extend({
    //        validation: {
    //          someAttribute: {
    //            required: true
    //          }
    //        },
    //
    //        labels: {
    //          someAttribute: 'Custom label'
    //        }
    //      });
    label: function(attrName, model) {
      return (model.labels && model.labels[attrName]) || defaultLabelFormatters.sentenceCase(attrName, model);
    }
  };


  // Built in validators
  // -------------------

  var defaultValidators = Validation.validators = (function(){
    // Use native trim when defined
    var trim = String.prototype.trim ?
      function(text) {
        return text === null ? '' : String.prototype.trim.call(text);
      } :
      function(text) {
        var trimLeft = /^\s+/,
            trimRight = /\s+$/;

        return text === null ? '' : text.toString().replace(trimLeft, '').replace(trimRight, '');
      };

    // Determines whether or not a value is a number
    var isNumber = function(value){
      return _.isNumber(value) || (_.isString(value) && value.match(defaultPatterns.number));
    };

    // Determines whether or not not a value is empty
    var hasValue = function(value) {
      return !(_.isNull(value) || _.isUndefined(value) || (_.isString(value) && trim(value) === ''));
    };

    return {
      // Function validator
      // Lets you implement a custom function used for validation
      fn: function(value, attr, fn, model, computed) {
        if(_.isString(fn)){
          fn = model[fn];
        }
        return fn.call(model, value, attr, computed);
      },

      // Required validator
      // Validates if the attribute is required or not
      required: function(value, attr, required, model, computed) {
        var isRequired = _.isFunction(required) ? required.call(model, value, attr, computed) : required;
        if(!isRequired && !hasValue(value)) {
          return false; // overrides all other validators
        }
        if (isRequired && !hasValue(value)) {
          return this.format(defaultMessages.required, this.formatLabel(attr, model));
        }
      },

      // Acceptance validator
      // Validates that something has to be accepted, e.g. terms of use
      // `true` or 'true' are valid
      acceptance: function(value, attr, accept, model) {
        if(value !== 'true' && (!_.isBoolean(value) || value === false)) {
          return this.format(defaultMessages.acceptance, this.formatLabel(attr, model));
        }
      },

      // Min validator
      // Validates that the value has to be a number and equal to or greater than
      // the min value specified
      min: function(value, attr, minValue, model) {
        if (!isNumber(value) || value < minValue) {
          return this.format(defaultMessages.min, this.formatLabel(attr, model), minValue);
        }
      },

      // Max validator
      // Validates that the value has to be a number and equal to or less than
      // the max value specified
      max: function(value, attr, maxValue, model) {
        if (!isNumber(value) || value > maxValue) {
          return this.format(defaultMessages.max, this.formatLabel(attr, model), maxValue);
        }
      },

      // Range validator
      // Validates that the value has to be a number and equal to or between
      // the two numbers specified
      range: function(value, attr, range, model) {
        if(!isNumber(value) || value < range[0] || value > range[1]) {
          return this.format(defaultMessages.range, this.formatLabel(attr, model), range[0], range[1]);
        }
      },

      // Length validator
      // Validates that the value has to be a string with length equal to
      // the length value specified
      length: function(value, attr, length, model) {
        if (!hasValue(value) || trim(value).length !== length) {
          return this.format(defaultMessages.length, this.formatLabel(attr, model), length);
        }
      },

      // Min length validator
      // Validates that the value has to be a string with length equal to or greater than
      // the min length value specified
      minLength: function(value, attr, minLength, model) {
        if (!hasValue(value) || trim(value).length < minLength) {
          return this.format(defaultMessages.minLength, this.formatLabel(attr, model), minLength);
        }
      },

      // Max length validator
      // Validates that the value has to be a string with length equal to or less than
      // the max length value specified
      maxLength: function(value, attr, maxLength, model) {
        if (!hasValue(value) || trim(value).length > maxLength) {
          return this.format(defaultMessages.maxLength, this.formatLabel(attr, model), maxLength);
        }
      },

      // Range length validator
      // Validates that the value has to be a string and equal to or between
      // the two numbers specified
      rangeLength: function(value, attr, range, model) {
        if(!hasValue(value) || trim(value).length < range[0] || trim(value).length > range[1]) {
          return this.format(defaultMessages.rangeLength, this.formatLabel(attr, model), range[0], range[1]);
        }
      },

      // One of validator
      // Validates that the value has to be equal to one of the elements in
      // the specified array. Case sensitive matching
      oneOf: function(value, attr, values, model) {
        if(!_.include(values, value)){
          return this.format(defaultMessages.oneOf, this.formatLabel(attr, model), values.join(', '));
        }
      },

      // Equal to validator
      // Validates that the value has to be equal to the value of the attribute
      // with the name specified
      equalTo: function(value, attr, equalTo, model, computed) {
        if(value !== computed[equalTo]) {
          return this.format(defaultMessages.equalTo, this.formatLabel(attr, model), this.formatLabel(equalTo, model));
        }
      },

      // Pattern validator
      // Validates that the value has to match the pattern specified.
      // Can be a regular expression or the name of one of the built in patterns
      pattern: function(value, attr, pattern, model) {
        if (!hasValue(value) || !value.toString().match(defaultPatterns[pattern] || pattern)) {
          return this.format(defaultMessages.pattern, this.formatLabel(attr, model), pattern);
        }
      }
    };
  }());

  return Validation;
}(_));
define("plugins/backbone-validation", function(){});

// Extend zepto/jQuery to serialize a form to an object map
$.fn.serializeObject = function() {
	var o = {};
	var a = this.serializeArray();
	$.each(a, function() {
		if (o[this.name] !== undefined) {
			if (!o[this.name].push) {
				o[this.name] = [ o[this.name] ];
			}
			o[this.name].push(this.value || '');
		} else {
			o[this.name] = this.value || '';
		}
	});
	return o;
};
define("plugins/serialize-object", function(){});

require([
  "jquery",
  "backbone",
  "touchscroll",
  // Application.
  "app",
  "store",
  "router",
  "models/basket",
  "models/user",
  "models/venue",
  "models/venue-collection",
  'models/hours-collection',
  "views/sidebar-view",
  "views/venue-style-view",
  "plugins/text!templates/colLeft.html",
  "plugins/text!templates/colRight.html",
  "plugins/backbone-validation",
  "plugins/serialize-object",
],

function($, Backbone, touchscroll, app, Store, Router, Basket, User, Venue, VenueCollection, HoursCollection, SidebarView, VenueStyleView, templateColLeft, templateColRight, BackboneValidation, SerializeObject) {

  var TIMEOUT_MILLIS = app.sessionTimeout || 20 * 60 * 1000; // 20 minutes


    // alias remove as detach if using zepto
    $.fn.detach = $.fn.detach || $.fn.remove;

    // Clean up events because zepto $el.remove() doesn't
    var viewRemove = Backbone.View.prototype.remove;
    Backbone.View.prototype.remove = (function() {
        console.log("View.remove(" + this.cid + ")");
        this.undelegateEvents();
        
        return viewRemove.apply(this, arguments);
    });

        // Validation
    _.extend(Backbone.Validation.callbacks, {
        valid : function(view, attr, selector) {
            view.$('[' + selector + '~="' + attr + '"]')
                .removeClass('invalid')
                .removeAttr('data-error');
        },
        invalid : function(view, attr, error, selector) {
            view.$('[' + selector + '~="' + attr + '"]')
                .addClass('invalid')
                .attr('data-error', error);
        }
    });

  // All navigation that is relative should be passed through the navigate
  // method, to be processed by the router. If the link has a `data-bypass`
  // attribute, bypass the delegation completely.
  $(document).on("tap", "a:not([data-bypass])", function(evt) {
    // Get the absolute anchor href.
    var href = $(this).attr("href");

    // If the href exists and is a hash route, run it through Backbone.
    if (href && href.indexOf("#") === 0) {
      // Stop the default event to ensure the link will not cause a page
      // refresh.
      evt.preventDefault();

      // `Backbone.history.navigate` is sufficient for all Routers and will
      // trigger the correct events. The Router's internal `navigate` method
      // calls this anyways.  The fragment is sliced from the root.
      Backbone.history.navigate(href, true);
      
    } else if ( href ) {
      app.trigger('link-click', href);
      // Stop the default event to ensure the link will not cause a page
      // refresh.
      evt.preventDefault();
      var target = $(this).attr("target");
        window.open(href, target || "_blank", "location=no");
    }
  });
  
  $(document).on("tap", ".back", function(event) {
    if ( app.viewsStack.length > 0 ) {
        window.history.back();
    } else {
        console.log("WARN: Trying to pop from an empty stack");
    }
    return false;
  });
  
  $(document).on("doubleTap", "header", function(event) {
    window.location.href = window.location.pathname;
  });

  $.ajaxSettings.headers = {'preo-appid': $settings.appName + ' (' + $settings.version + ')'};
  
  $(document).on('ajaxBeforeSend', function(e, xhr, options){
    console.log(options.url);
    
    xhr.setRequestHeader("Authorization", "PreoDay " + app.getSessionToken());

    if ( app.currentVenue ) {
      xhr.setRequestHeader('preo-venueid', app.currentVenue.get('id'));
    }   
  });

  var activeAjax = 0;
  $(document).on('ajaxSend', function(event, xhr, options) {
    if ( options && !options.background && activeAjax++ >= 0) {
      $('#spinner').show();
    }
  }).on('ajaxComplete', function(event, xhr, options) {
    if ( options && !options.background && --activeAjax <= 0 ) {
      $('#spinner').hide();
    }
  }).on('ajaxError', function(event, xhr, options, error) {
    // Only log out if this is not an auth request
    if ( xhr.status == 401 && options.url.indexOf('/auth') < 0 ) {
      if ( app.apiKey != app.getSessionToken() ) {
        app.logout();
      } else {
        // Invlalid api token
        navigator.notification.alert(_.tr('The server has denied access. Please ensure you have the latest version of the app.'),
          function(){}, '');
      }
    }
  });

  if ( ('ontouchstart' in window) ||
       (navigator.maxTouchPoints > 0) ||
       (navigator.msMaxTouchPoints > 0) ) {

    // FIXME: We may not need this with new zepto touch in 1.1.3

    // Simplified hack for ghost clicks after zepto tap events 
    // https://developers.google.com/mobile/articles/fast_buttons#ghost
    // Simple because we don't bother trying to work out where the tap is
    // just cancel all click events unless it's a input type submit so forms still work on enter.
    window.addEventListener('click', function (e) { 
        if ( "submit" === e.target.type || "checkbox" === e.target.type  ) return; 
        e.stopPropagation(); 
        e.preventDefault(); 
    });
    
  } else {
    // handle tap events on desktop
    $(function() {
      return $('body').bind('click', function(e) {
        e.stopPropagation(); e.preventDefault();
        return $(e.target).trigger('tap');
      });
    });

  }
  
  $('#spinner').on('mousedown', function(e) {e.stopPropagation(); e.preventDefault();});
  
    // Set up a basket on the app namespace
    app.basket = new Basket();

  app.basket.on('all', function(eventName, model) {
    try {
      if ( _.contains(['add', 'remove'], eventName) ) {
        app.tracker && app.tracker.trackEvent(app.tracker.noop, app.tracker.noop, "ui-action", "basket-event", eventName, 1);
      }
    } catch (e) {console.log(e);}
  });

  app.on('all', function(eventName, eventData) {
    try {
      if ( !app.tracker ) return;

      switch (eventName) {
        case 'view:toggle':
          app.tracker.trackEvent(app.tracker.noop, app.tracker.noop, "ui-action", "view-toggle", Backbone.history.getFragment(), 1);
          break;
        case 'checkout:attempt':
          app.tracker.trackEvent(app.tracker.noop, app.tracker.noop, "ui-action", "checkout", "attempt", 1);
          break;
        case 'checkout:success':
        case 'checkout:error':
          var order = eventData,
              label = eventName.split(':');
          app.tracker.trackEvent(app.tracker.noop, app.tracker.noop, "ui-action", label[0], label[1], (order && order.get('t')) || 0);
          break;
        case 'payment:token-created':
        case 'payment:token-error':
        case 'user:create-attempt':
        case 'user:create-success':
        case 'user:create-denied':
        case 'user:create-error':
        case 'user:change-attempt':
        case 'user:change-success':
        case 'user:change-error':
        case 'user:login-attempt':
        case 'user:login-success':
        case 'user:login-denied':
        case 'user:login-error':
        case 'user:logout':
          var label = eventName.split(':');
          app.tracker.trackEvent(app.tracker.noop, app.tracker.noop, "ui-action", label[0], label[1], 1);
          break;
        case 'link-click':
          app.tracker.trackEvent(app.tracker.noop, app.tracker.noop, "ui-action", 'link-click', eventData, 1);

      }
    } catch (e) {console.log(e);}
  });



  // Define your master router on the application namespace and trigger all
  // navigation from this instance.
  app.router = new Router();
  
  app.router.on("route", function() {
    try {
        console.log("Router:route");
        var url= Backbone.history.getFragment();
      app.tracker && app.tracker.trackPage(app.tracker.noop, app.tracker.noop, "/" + url);
    } catch (e) {console.log(e);}
  });
  
  // clear loadind div once first screen loads
  app.once("viewChanged", function() {
    $('#load').remove();
    console.log('Hide splash');

    if ( navigator.splashscreen ) {
      setTimeout(navigator.splashscreen.hide, 1500);
    }
  });

  function resetScroller(startY) {
/*
    if ( app.scroller ) {
      // Use previous scroll position if startY not defined
      startY = _.isNumber(startY) ? startY : app.scroller.y;
      app.scroller.destroy();
    }*/
    console.log("reseting scroller");
    console.log($('.content'));
/*    var scrollTarget = _.last($('.content'));
    if ( !$(scrollTarget).hasClass('no-scroll') ) {

      // Create the scroller
      app.scroller = new IScroll(scrollTarget,{
        bounce: $.os.ios,
        scrollbars: false,
        useTransition: !$.os.ios, // Set to false to fix https://github.com/cubiq/iscroll/issues/532
        startY: _.isNumber(startY) ? startY : 0 // Set our startY to the saved scroll position
      });

      app.scroller.on('scrollEnd', function scrollEnd() {
        // Save the new scroll position on the view
        app.activeView.scrollPosition = this.y;
      });
   
    }*/
  }

  if ( !touchscroll.available ) {
    console.log("No overflow scrolling touch");

    var scrollerRefresh = _.debounce(function() {
      setTimeout(function() {
        console.log('Scroller:Refresh');
        //app.scroller.refresh();
      });
    }, 300);

    var scrollerReset = _.debounce(function() {
      setTimeout(function() {
        console.log('Scroller:Reset');
        //resetScroller();
        if (app.scroller){
            app.scroller.destroy();
        }
      });
    }, 300);

    var history = [];

    $(window).on('hashchange', function() {
      history.push(window.location.hash.split('#')[1]);
    });    

    app.on("viewChanged", function() {
        console.log("ViewChanged");
      // Don't call debounced version here and pass the startY from the new active view
      //resetScroller(app.activeView && app.activeView.scrollPosition || 0);
      // FIXME: We do this because the screll container is destroyed in most view render calls
      app.activeView &&
          app.activeView.model && 
          app.activeView.model.listenTo &&
          app.activeView.listenTo(app.activeView.model, 'change', scrollerReset);

      var _scrollTop = true;

      if (app.activeView.options.fragment.indexOf('outlet') != -1) {
          var $elem = $('header.bar-footer.footer-basket');
          positionFooter($elem);        

          if ( history.length > 1 ) {
            var previous = history[history.length - 2];
            
            if ( previous && (previous.indexOf('mealdeals') != -1 || previous.indexOf('modifiers') != -1) ) {
              _scrollTop = false;
            }
          }
      }

      /* Hack to force repaint. Android on the XPERIA Miro (And maybe others) does not seem to paint on history back */
      var oh = document.getElementById('content').offsetHeight;

      if (_scrollTop ){
        $(window).scrollTop(0);
      }

      var $body = $('body');
      if ( !$body.hasClass('android') && !$body.hasClass('wp8') && !$body.hasClass('ios') && !$body.hasClass('ios7') ) {
        setTimeout(function(){
          var heightColLeft = $('.col-left').height(),
              heightColRight = $('.col-right').height(),
              $content = $('#container');

          if ( heightColLeft > heightColRight ) {
            $content.css('min-height', heightColLeft);
          } else {
            $content.css('min-height', heightColRight);
          }             
        }, 1500)
      }

    });

    $(window).resize(scrollerReset);

    app.on('content:change view:toggle', function() {
      // Call reset scroller with the startY set to 0
      // so we don't set the scroll pos from last render
      setTimeout(function() {
        console.log('Scroller:Reset(change or toggle)');
        //resetScroller(0);
      });
    });

    app.on('basket-item:render menu-item:toggle', scrollerRefresh);

  } else {
    console.log("Overflow scrolling touch");
    // Reset overflow scroll because keyboard borks it on IOS
    function resetScroll() {
      var content = $(".content");
      console.log('Resize event');
      content.css('overflow', 'hidden');
      setTimeout(function() {
        content.css('overflow', '');
      }, 750);
    }

    $(window).resize(resetScroll);

    // Android seems to still need this as scroll does not reset on dom change
    if ( $.os.android ) {
      app.on('basket-item:render menu-item:toggle', resetScroll);
    }
  }


  // Add android class
  if ( $.os.android ) {
    $('body').addClass('android');
    app.on("viewChanged", function() {
      // Hide keyboard when the view changes. Android only.
      if ( window.SoftKeyboard && window.SoftKeyboard.hide ) {
        window.SoftKeyboard.hide();
      }
    });

  } else if ( $.os.ios ) {
    $('body').addClass('ios');
    if ( parseInt($.os.version, 10)  >= 7 ) { // os.version is a String
      $('body').addClass('ios7');
    }

  } else if ( $.browser.ie ) {
    $('body').addClass('wp8');
  }


  var populateHours = function( hours ) {
    var lastOrder = null;
    var hoursNew = {};
    console.log('caiu no populate hours');
    for (var i = 0, len = hours.length; i < len; i++) {
        var hour = hours[i];

        if ( lastOrder ) {
            if ( lastOrder.day + 1 == hour.day && lastOrder.open == hour.open && lastOrder.close == hour.close ) {
                for (var j = i, len = hours.length; j < len; j--) {
                    if ( lastOrder.day + 1 == hours[j].day && lastOrder.open == hour.open && lastOrder.close == hour.close ) {
                        hoursNew[lastOrder.id].push(hours[j]);
                        i = j;
                    } else {
                        lastOrder = null;
                        break;
                    }
                };                
            } else {
                lastOrder = null;
                hoursNew[hour.id] = [hour];
            }
        } else {
            hoursNew[hour.id] = [hour];
        }

        lastOrder = hour;
    };

    var hoursResult = [];
    $.each(hoursNew, function(key, hour){
        var obj = {};
        if ( hour.length > 1 ) {
            obj.text = getDayAsString(hour[0].day) + '-' + getDayAsString(hour[hour.length - 1].day);
        } else {
            obj.text = getDayAsString(hour[0].day);
        }

        obj.open = hour[0].open;
        obj.close = hour[0].close;

        hoursResult.push(obj);
    })

    return hoursResult;
  };

  var getDayAsString = function(day){
    var result = '';
    switch(day){
        case 1:
            result = _.tr('Mon');
            break;
        case 2:
            result = _.tr('Tue');
            break;
        case 3:
            result = _.tr('Wed');
            break;
        case 4:
            result = _.tr('Thu');
            break;
        case 5:
            result = _.tr('Fri');
            break;
        case 6:
            result = _.tr('Sat');
            break;
        case 7:
            result = _.tr('Sun');
            break;
    }

    return result;
  };

  var positionFooter = function($elem){
    var $topBar = $('#topBar');
    var top = $(window).scrollTop() + $(window).height() - parseInt($topBar.css('margin-bottom')) - parseInt($topBar.css('margin-top')) - $topBar.height() - $elem.height();
    var heightContent = $('.content').height();

    if ( top >= heightContent ) {
      $elem.animate({
        top:  + (heightContent - $elem.height()) + 'px'
      }, 0);
    } else {
      $elem.animate({
        top: top + 'px'
      }, 0);      
    }
  }    

  var startApp = function() {

    console.log("Starting App");

    // Venue styles
    app.styleView = new VenueStyleView({
      collection : app.savedVenues
    });

    app.styleView.render();
    $('head').append(app.styleView.el);

    app.router.venueoutlet(app.currentVenue, null, function(outlets){
        $('#nameVenue').text(app.currentVenue.get('name'));

        var description = app.currentVenue.get('description');
        if ( description ) {
            $('#descriptionVenue').text(app.currentVenue.get('description'));
        } else {
            $('#descriptionVenue').remove();
        }

        var settings = app.currentVenue.get('settings');
        var hours = app.currentVenue.get('hours');
        var type = "pickup";
        
        //hours = populateHours(hours);
        hours = _.groupBy(hours, 'day');

        var address = {
            one: app.currentVenue.get('address1'),
            two: app.currentVenue.get('address2'),
            three: app.currentVenue.get('address3')
        };
    
        var compiledTemplate = _.template(templateColLeft, {
            address: address,
            settings: settings,
            hours: hours,
            hoursVerify: (hours && hours instanceof Object && Object.keys(hours).length > 0),
            getDayAsString: getDayAsString,
            formatHour: function( hour ){
              return hour.substring(0, 5);
            },
            format: app.templateHelper.format
        });    
            console.log(app.currentVenue);
        var compiledTemplateRight = _.template(templateColRight, {
            venue: app.currentVenue
        });    
        
        $('.col-left').html(compiledTemplate);       
        $('.col-right').html(compiledTemplateRight);       
        $('#container').show(); 
        $('#topBar').show(); 
        if ( settings ) {
            $('.titleAddressVenue, .titleVenue').css('color', '#' + settings.button3Colour)
        }

        if (!app.currentVenue.get('demoFlag')){
          $('#content').addClass('noDemoFlag');
        }

        var outlet = outlets.at(0);
        Backbone.history.start({ pushState: false, root: $settings.root });
        app.router.navigate("outlet/" + outlet.get('id'), true);      

        $(window).on("resize scroll",function(e){
          var $elem = $('header.bar-footer.footer-basket');
          positionFooter($elem);

          var scrollTop = $(window).scrollTop();
          if (scrollTop > 90 && scrollTop < 140) {
            $('.col-left, .col-right').css('top', scrollTop - 90)
          } else if (scrollTop > 140) {
            $('.col-left, .col-right').css('top', scrollTop - 140)
          } else {
            $('.col-left, .col-right').css('top', scrollTop)
          }
        });

        $('body').on('DOMNodeInserted', function (e) {        
          var $elem = $(e.target);
          if ( $elem.hasClass('bar-footer footer-basket') && $elem.is('header') ) {
            positionFooter($elem);
          }
        });
    });

  };
  // Start the app once the device is ready
  window.addEventListener('deviceready', function deviceReady() {
    if ( window.plugins ) {
      if ( window.plugins.webviewcolor ) {
        window.plugins.webviewcolor.change('#000000');
      }

      if ( $settings.ANALYTICS_CODE && $settings.ANALYTICS_CODE.length > 0 && window.plugins.gaPlugin ) {
        app.tracker = window.plugins.gaPlugin;
        app.tracker.noop = function() {};
        app.tracker.init(app.tracker.noop, app.tracker.noop, $settings.ANALYTICS_CODE, 10);
        window.addEventListener('unload', function() {
          app.tracker.exit(app.tracker.noop, app.tracker.noop);
        });
      }
    }

    if ( window.StatusBar ) {
      window.StatusBar.overlaysWebView(true);
      if ( $.browser.ie ) {
        window.StatusBar.hide();
      }
    }

    document.addEventListener("backbutton", function() {
      // If the spinner is visible ignore back button
      if ( $('#spinner').css('display') != 'none' ) return;

      // Close the side bar if open
      if ( app.sideBar && app.sideBar.isOpen() ) {
        app.sideBar.toggle(true);
        return;
      }

      if ( app.viewsStack.length > 1 ) {
        app.goBack();
      } else {
        navigator.app.exitApp();
      }
    }, false);

    if ( window.PushNotification ) {
      var handleIncomingPush = function(event) {
        if(event.message) {
          console.log("Incoming push: " + event.message)
          navigator.notification.alert(event.message, function(){}, 'Update');
        } else {
          console.log("No incoming message")
        }
      }
      // Registration callback
      var onRegistration = function(event) {
        if (!event.error) {
          console.log("Reg Success: " + event.pushID)
        } else {
          console.log(event.error)
        }
      }

      console.log('Register for push');
      PushNotification.registerForNotificationTypes(PushNotification.notificationType.badge |
          PushNotification.notificationType.sound | PushNotification.notificationType.alert);
      PushNotification.enablePush();

      // Get any incoming push from device ready open
      PushNotification.getIncoming(handleIncomingPush);

      // Register for any urban airship events
      document.addEventListener("urbanairship.registration", onRegistration, false);
      document.addEventListener("urbanairship.push", handleIncomingPush, false);
      
      // Handle resume
      document.addEventListener("resume", function() {
        console.log("Device resume!");

        PushNotification.resetBadge();
        PushNotification.getIncoming(handleIncomingPush);

        // Reregister for urbanairship events if they were removed in pause event
        document.addEventListener("urbanairship.registration", onRegistration, false)
        document.addEventListener("urbanairship.push", handleIncomingPush, false)
      }, false);


      // Handle pause
      document.addEventListener("pause", function() {
        console.log("Device pause!")
       
        // Remove urbanairship events. Important on android to not receive push in the background.
        document.removeEventListener("urbanairship.registration", onRegistration, false)
        document.removeEventListener("urbanairship.push", handleIncomingPush, false)
      }, false);

      // Listen to the apps user and set alias as needed
      app.on('user:changed', function() {
        var u = app.user,
            uId = u && u.get('id'),
            alias = uId ? app.pushAliasPrefix + uId : 'nil';

        console.log('Set push alias: ' + alias);
        PushNotification.setAlias(alias, function(alias) {
          console.log('Alias set: ' + alias);
        });
      });
    }

    document.addEventListener("pause", function() {
      console.log("Device pause!")
      app._pausedAt = Date.now();
    }, false);

    // Reload venue on resume
    document.addEventListener("resume", function() {
      console.log("Resuming app ** Reload outlets");

      // Check timeout
      if ( app._pausedAt && app._pausedAt + TIMEOUT_MILLIS <= Date.now() ) {
        if ( !app.isHome() ) {
          app.withSpinner(function() {
            navigator.notification.alert(_.tr("Your session has timed out."),
              function() {
                delete app._pausedAt;
                app.reload();
              },
              _.tr("Warning")
            );
          });

          return;
        }
      }

      app.store && app.store.load({background: true});

      app.savedVenues && app.savedVenues.refresh();
    }, false);

      app.sideBar = new SidebarView();      
    app.startApp(startApp);
      
  });
  
  // put the app in the global scope
  window.app = app;

/*document.body.addEventListener('touchmove',function(e){
       if(!$(e.target).hasClass("scrollable")) {
         e.preventDefault();
       }
   });  
*/  
});

define("main", function(){});

// Set the require.js configuration for your application.
require.config({

  // Initialize the application with the main application file.
  deps: ["main"],

  paths: {
    // JavaScript folders.
    libs: "../scripts/libs",
    plugins: "../scripts/plugins",
    templates: "../scripts/views",

    // Libraries.
    jquery: "../scripts/libs/zepto-1.1.3-patched",
    underscore: "../scripts/libs/lodash",
    backbone: "../scripts/libs/backbone",
    effects: "../scripts/libs/backstack/effects",
    StackNavigator: "../scripts/libs/backstack/StackNavigator",
    iscroll: "../scripts/libs/iscroll-5.1.1",
    stripe: "../scripts/libs/stripe.min",
    moment: "../scripts/libs/moment/moment",
    accounting: "../scripts/libs/accounting",
    slip: "../scripts/libs/slip",
    modelConfiguration: "../scripts/models/modelConfiguration"
  },

  shim: {
  	jquery: {
  		exports: "Zepto"
  	},  
    // Backbone library depends on underscore and jQuery.
    backbone: {
      deps: ["underscore", "jquery"],
      exports: "Backbone"
    },

    stripe: {
      exports: "Stripe"
    },

    iscroll: {
      exports: "iScroll"
    },

    slip: {
      exports: "slip"
    },

    "plugins/backbone-validation": ["backbone"],
    "plugins/serialize-object": ["jquery"]
  }

});

define("config", function(){});

}());