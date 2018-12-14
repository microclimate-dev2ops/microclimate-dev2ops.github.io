/**
 * AnchorJS - v4.1.1 - 2018-07-01
 * https://github.com/bryanbraun/anchorjs
 * Copyright (c) 2018 Bryan Braun; Licensed MIT
 */
!function(A,e){"use strict";"function"==typeof define&&define.amd?define([],e):"object"==typeof module&&module.exports?module.exports=e():(A.AnchorJS=e(),A.anchors=new A.AnchorJS)}(this,function(){"use strict";return function(A){function d(A){A.icon=A.hasOwnProperty("icon")?A.icon:"",A.visible=A.hasOwnProperty("visible")?A.visible:"hover",A.placement=A.hasOwnProperty("placement")?A.placement:"right",A.ariaLabel=A.hasOwnProperty("ariaLabel")?A.ariaLabel:"Anchor",A.class=A.hasOwnProperty("class")?A.class:"",A.truncate=A.hasOwnProperty("truncate")?Math.floor(A.truncate):64}function f(A){var e;if("string"==typeof A||A instanceof String)e=[].slice.call(document.querySelectorAll(A));else{if(!(Array.isArray(A)||A instanceof NodeList))throw new Error("The selector provided to AnchorJS was invalid.");e=[].slice.call(A)}return e}this.options=A||{},this.elements=[],d(this.options),this.isTouchDevice=function(){return!!("ontouchstart"in window||window.DocumentTouch&&document instanceof DocumentTouch)},this.add=function(A){var e,t,i,n,o,s,r,a,c,h,l,u=[];if(d(this.options),"touch"===(l=this.options.visible)&&(l=this.isTouchDevice()?"always":"hover"),A||(A="h2, h3, h4, h5, h6"),0===(e=f(A)).length)return this;for(function(){if(null===document.head.querySelector("style.anchorjs")){var A,e=document.createElement("style");e.className="anchorjs",e.appendChild(document.createTextNode("")),void 0===(A=document.head.querySelector('[rel="stylesheet"], style'))?document.head.appendChild(e):document.head.insertBefore(e,A),e.sheet.insertRule(" .anchorjs-link {   opacity: 0;   text-decoration: none;   -webkit-font-smoothing: antialiased;   -moz-osx-font-smoothing: grayscale; }",e.sheet.cssRules.length),e.sheet.insertRule(" *:hover > .anchorjs-link, .anchorjs-link:focus  {   opacity: 1; }",e.sheet.cssRules.length),e.sheet.insertRule(" [data-anchorjs-icon]::after {   content: attr(data-anchorjs-icon); }",e.sheet.cssRules.length),e.sheet.insertRule(' @font-face {   font-family: "anchorjs-icons";   src: url(data:n/a;base64,AAEAAAALAIAAAwAwT1MvMg8yG2cAAAE4AAAAYGNtYXDp3gC3AAABpAAAAExnYXNwAAAAEAAAA9wAAAAIZ2x5ZlQCcfwAAAH4AAABCGhlYWQHFvHyAAAAvAAAADZoaGVhBnACFwAAAPQAAAAkaG10eASAADEAAAGYAAAADGxvY2EACACEAAAB8AAAAAhtYXhwAAYAVwAAARgAAAAgbmFtZQGOH9cAAAMAAAAAunBvc3QAAwAAAAADvAAAACAAAQAAAAEAAHzE2p9fDzz1AAkEAAAAAADRecUWAAAAANQA6R8AAAAAAoACwAAAAAgAAgAAAAAAAAABAAADwP/AAAACgAAA/9MCrQABAAAAAAAAAAAAAAAAAAAAAwABAAAAAwBVAAIAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAMCQAGQAAUAAAKZAswAAACPApkCzAAAAesAMwEJAAAAAAAAAAAAAAAAAAAAARAAAAAAAAAAAAAAAAAAAAAAQAAg//0DwP/AAEADwABAAAAAAQAAAAAAAAAAAAAAIAAAAAAAAAIAAAACgAAxAAAAAwAAAAMAAAAcAAEAAwAAABwAAwABAAAAHAAEADAAAAAIAAgAAgAAACDpy//9//8AAAAg6cv//f///+EWNwADAAEAAAAAAAAAAAAAAAAACACEAAEAAAAAAAAAAAAAAAAxAAACAAQARAKAAsAAKwBUAAABIiYnJjQ3NzY2MzIWFxYUBwcGIicmNDc3NjQnJiYjIgYHBwYUFxYUBwYGIwciJicmNDc3NjIXFhQHBwYUFxYWMzI2Nzc2NCcmNDc2MhcWFAcHBgYjARQGDAUtLXoWOR8fORYtLTgKGwoKCjgaGg0gEhIgDXoaGgkJBQwHdR85Fi0tOAobCgoKOBoaDSASEiANehoaCQkKGwotLXoWOR8BMwUFLYEuehYXFxYugC44CQkKGwo4GkoaDQ0NDXoaShoKGwoFBe8XFi6ALjgJCQobCjgaShoNDQ0NehpKGgobCgoKLYEuehYXAAAADACWAAEAAAAAAAEACAAAAAEAAAAAAAIAAwAIAAEAAAAAAAMACAAAAAEAAAAAAAQACAAAAAEAAAAAAAUAAQALAAEAAAAAAAYACAAAAAMAAQQJAAEAEAAMAAMAAQQJAAIABgAcAAMAAQQJAAMAEAAMAAMAAQQJAAQAEAAMAAMAAQQJAAUAAgAiAAMAAQQJAAYAEAAMYW5jaG9yanM0MDBAAGEAbgBjAGgAbwByAGoAcwA0ADAAMABAAAAAAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAH//wAP) format("truetype"); }',e.sheet.cssRules.length)}}(),t=document.querySelectorAll("[id]"),i=[].map.call(t,function(A){return A.id}),o=0;o<e.length;o++)if(this.hasAnchorJSLink(e[o]))u.push(o);else{if(e[o].hasAttribute("id"))n=e[o].getAttribute("id");else if(e[o].hasAttribute("data-anchor-id"))n=e[o].getAttribute("data-anchor-id");else{for(c=a=this.urlify(e[o].textContent),r=0;void 0!==s&&(c=a+"-"+r),r+=1,-1!==(s=i.indexOf(c)););s=void 0,i.push(c),e[o].setAttribute("id",c),n=c}n.replace(/-/g," "),(h=document.createElement("a")).className="anchorjs-link "+this.options.class,h.href="#"+n,h.setAttribute("aria-label",this.options.ariaLabel),h.setAttribute("data-anchorjs-icon",this.options.icon),"always"===l&&(h.style.opacity="1"),""===this.options.icon&&(h.style.font="1em/1 anchorjs-icons","left"===this.options.placement&&(h.style.lineHeight="inherit")),"left"===this.options.placement?(h.style.position="absolute",h.style.marginLeft="-1em",h.style.paddingRight="0.5em",e[o].insertBefore(h,e[o].firstChild)):(h.style.paddingLeft="0.375em",e[o].appendChild(h))}for(o=0;o<u.length;o++)e.splice(u[o]-o,1);return this.elements=this.elements.concat(e),this},this.remove=function(A){for(var e,t,i=f(A),n=0;n<i.length;n++)(t=i[n].querySelector(".anchorjs-link"))&&(-1!==(e=this.elements.indexOf(i[n]))&&this.elements.splice(e,1),i[n].removeChild(t));return this},this.removeAll=function(){this.remove(this.elements)},this.urlify=function(A){return this.options.truncate||d(this.options),A.trim().replace(/\'/gi,"").replace(/[& +$,:;=?@"#{}|^~[`%!'<>\]\.\/\(\)\*\\\n\t\b\v]/g,"-").replace(/-{2,}/g,"-").substring(0,this.options.truncate).replace(/^-+|-+$/gm,"").toLowerCase()},this.hasAnchorJSLink=function(A){var e=A.firstChild&&-1<(" "+A.firstChild.className+" ").indexOf(" anchorjs-link "),t=A.lastChild&&-1<(" "+A.lastChild.className+" ").indexOf(" anchorjs-link ");return e||t||!1}}});
$(document).foundation();

$(document).keydown(function(e) {
	if (e.keyCode == 27) {
		if ($('.videoContainer').length) {
			$('.videoContainer').fadeOut(500, function() { $(this).remove(); });
		}
	}
});

function trackVideoPlay(file) {
	window.bluemixAnalytics.trackEvent("Custom Event",{
	    productTitle: digitalData.page.pageInfo.productTitle,
	    category: digitalData.page.pageInfo.analytics.category,
	    action: "View video",
	    customName1: "source",
	    customValue1: "Landing page",
	    objectType: "Video",
	    object: file
    });
}


function trackDownload(file) {
	window.bluemixAnalytics.trackEvent("Downloaded Hybrid Solution",{
	    productTitle: digitalData.page.pageInfo.productTitle,
	    category: digitalData.page.pageInfo.analytics.category,
	    productVersion: "latest",
	    customName2: "fileName",
	    customName1: "source",
	    customValue1: "Landing page",
	    customValue2: file
    });
}

$(document).ready(function(){
    // $.ajax({
    //     url: 'https://api.github.ibm.com/repos/dev-ex/microclimate/tags?access_token=f5fb332a281a15d8165db037b318ac837eff96a2', // The URL to the API. You can get this by clicking on "Show CURL example" from an API profile
    //     type: 'GET', // The HTTP Method
    //     data: {}, // Additional parameters here
    //     dataType: 'json',
    //     success: function(data) { console.log(JSON.stringify(data)); },
    //     error: function(err) { console.log(err); },
    //     beforeSend: function(xhr) {
    //     // xhr.setRequestHeader("X-Mashape-Authorization", "YOUR-MASHAPE-KEY"); // Enter here your Mashape key
    //     }
    // });

    $(".trackdownload").on("click", function(e) {
        var file=$(this).attr('href');
        trackDownload(file);
    });

    // track embeded video play
    $(".embeded-video").on('play',function(){
        var file =  $(this).children("source").attr("src");
        trackVideoPlay(file);   
    });

    // track intro video play
    $("video").on('play',function(){
        var file =  $(this).attr("src");
        trackVideoPlay(file);   
    });
    
    $(".showVideo").on("click", function(e) {
        e.preventDefault();
        var file = $(this).data("video");
        trackVideoPlay(file);
        
        var htmlTemplate = '<div class="videoContainer"><div class="videoPlayer"><div style="display: block; padding-top:56%; width: 100%;">'
                + '</div><button class="closeBtn">X</button><video class="video-iframe" width="100%" height="100%" autobuffer controls autoplay>'
                + '<source id="mp4" src="'
                + file
                + '" type="video/mp4">'
                + '</video></div><div/>';
        $player = $(htmlTemplate);
        $player.find('.closeBtn').on(
                'click',
                function() {
                    $(this).off().closest(
                            '.videoContainer')
                            .fadeOut(500, function() { $(this).remove(); });
                });
        $player.appendTo('body').addClass(
                'dark-bg').fadeIn();
        return false;

    });
    
    
});
$(document).ready(function(){
$("a.newslink").click(function(e){
	   e.preventDefault();
	   $(".newslink").each(function( index ) {
		   $(this).removeClass("active-link");
	   });
	   $(this).addClass("active-link");
	   $( "#newscontent" ).load($(this).attr("href")+ " div#newscontent" );
	});
});

/*!
  * Simple-Jekyll-Search v1.6.3 (https://github.com/christian-fei/Simple-Jekyll-Search)
  * Copyright 2015-2018, Christian Fei
  * Licensed under the MIT License.
  */

(function(){
/* globals ActiveXObject:false */

'use strict'

var _$JSONLoader_2 = {
  load: load
}

function load (location, callback) {
  var xhr = getXHR()
  xhr.open('GET', location, true)
  xhr.onreadystatechange = createStateChangeListener(xhr, callback)
  xhr.send()
}

function createStateChangeListener (xhr, callback) {
  return function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      try {
        callback(null, JSON.parse(xhr.responseText))
      } catch (err) {
        callback(err, null)
      }
    }
  }
}

function getXHR () {
  return window.XMLHttpRequest ? new window.XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP')
}

'use strict'

var _$OptionsValidator_3 = function OptionsValidator (params) {
  if (!validateParams(params)) {
    throw new Error('-- OptionsValidator: required options missing')
  }

  if (!(this instanceof OptionsValidator)) {
    return new OptionsValidator(params)
  }

  var requiredOptions = params.required

  this.getRequiredOptions = function () {
    return requiredOptions
  }

  this.validate = function (parameters) {
    var errors = []
    requiredOptions.forEach(function (requiredOptionName) {
      if (typeof parameters[requiredOptionName] === 'undefined') {
        errors.push(requiredOptionName)
      }
    })
    return errors
  }

  function validateParams (params) {
    if (!params) {
      return false
    }
    return typeof params.required !== 'undefined' && params.required instanceof Array
  }
}

'use strict';

function fuzzysearch (needle, haystack) {
  var tlen = haystack.length;
  var qlen = needle.length;
  if (qlen > tlen) {
    return false;
  }
  if (qlen === tlen) {
    return needle === haystack;
  }
  outer: for (var i = 0, j = 0; i < qlen; i++) {
    var nch = needle.charCodeAt(i);
    while (j < tlen) {
      if (haystack.charCodeAt(j++) === nch) {
        continue outer;
      }
    }
    return false;
  }
  return true;
}

var _$fuzzysearch_1 = fuzzysearch;

'use strict'

/* removed: var _$fuzzysearch_1 = require('fuzzysearch') */;

var _$FuzzySearchStrategy_5 = new FuzzySearchStrategy()

function FuzzySearchStrategy () {
  this.matches = function (string, crit) {
    return _$fuzzysearch_1(crit.toLowerCase(), string.toLowerCase())
  }
}

'use strict'

var _$LiteralSearchStrategy_6 = new LiteralSearchStrategy()

function LiteralSearchStrategy () {
  this.matches = function (str, crit) {
    if (typeof str !== 'string') {
      return false
    }
    str = str.trim()
    return str.toLowerCase().indexOf(crit.toLowerCase()) >= 0
  }
}

'use strict'

var _$Repository_4 = {
  put: put,
  clear: clear,
  search: search,
  setOptions: setOptions
}

/* removed: var _$FuzzySearchStrategy_5 = require('./SearchStrategies/FuzzySearchStrategy') */;
/* removed: var _$LiteralSearchStrategy_6 = require('./SearchStrategies/LiteralSearchStrategy') */;

function NoSort () {
  return 0
}

var data = []
var opt = {}

opt.fuzzy = false
opt.limit = 10
opt.searchStrategy = opt.fuzzy ? _$FuzzySearchStrategy_5 : _$LiteralSearchStrategy_6
opt.sort = NoSort

function put (data) {
  if (isObject(data)) {
    return addObject(data)
  }
  if (isArray(data)) {
    return addArray(data)
  }
  return undefined
}
function clear () {
  data.length = 0
  return data
}

function isObject (obj) {
  return Boolean(obj) && Object.prototype.toString.call(obj) === '[object Object]'
}

function isArray (obj) {
  return Boolean(obj) && Object.prototype.toString.call(obj) === '[object Array]'
}

function addObject (_data) {
  data.push(_data)
  return data
}

function addArray (_data) {
  var added = []
  clear()
  for (var i = 0, len = _data.length; i < len; i++) {
    if (isObject(_data[i])) {
      added.push(addObject(_data[i]))
    }
  }
  return added
}

function search (crit) {
  if (!crit) {
    return []
  }
  return findMatches(data, crit, opt.searchStrategy, opt).sort(opt.sort)
}

function setOptions (_opt) {
  opt = _opt || {}

  opt.fuzzy = _opt.fuzzy || false
  opt.limit = _opt.limit || 10
  opt.searchStrategy = _opt.fuzzy ? _$FuzzySearchStrategy_5 : _$LiteralSearchStrategy_6
  opt.sort = _opt.sort || NoSort
}

function findMatches (data, crit, strategy, opt) {
  var matches = []
  for (var i = 0; i < data.length && matches.length < opt.limit; i++) {
    var match = findMatchesInObject(data[i], crit, strategy, opt)
    if (match) {
      matches.push(match)
    }
  }
  return matches
}

function findMatchesInObject (obj, crit, strategy, opt) {
  for (var key in obj) {
    if (!isExcluded(obj[key], opt.exclude) && strategy.matches(obj[key], crit)) {
      return obj
    }
  }
}

function isExcluded (term, excludedTerms) {
  var excluded = false
  excludedTerms = excludedTerms || []
  for (var i = 0, len = excludedTerms.length; i < len; i++) {
    var excludedTerm = excludedTerms[i]
    if (!excluded && new RegExp(term).test(excludedTerm)) {
      excluded = true
    }
  }
  return excluded
}

'use strict'

var _$Templater_7 = {
  compile: compile,
  setOptions: __setOptions_7
}

var options = {}
options.pattern = /\{(.*?)\}/g
options.template = ''
options.middleware = function () {}

function __setOptions_7 (_options) {
  options.pattern = _options.pattern || options.pattern
  options.template = _options.template || options.template
  if (typeof _options.middleware === 'function') {
    options.middleware = _options.middleware
  }
}

function compile (data) {
  return options.template.replace(options.pattern, function (match, prop) {
    var value = options.middleware(prop, data[prop], options.template)
    if (typeof value !== 'undefined') {
      return value
    }
    return data[prop] || match
  })
}

'use strict'

var _$utils_9 = {
  merge: merge,
  isJSON: isJSON
}

function merge (defaultParams, mergeParams) {
  var mergedOptions = {}
  for (var option in defaultParams) {
    if (Object.prototype.hasOwnProperty.call(defaultParams, option)) {
      mergedOptions[option] = defaultParams[option]
      if (typeof mergeParams[option] !== 'undefined') {
        mergedOptions[option] = mergeParams[option]
      }
    }
  }
  return mergedOptions
}

function isJSON (json) {
  try {
    if (json instanceof Object && JSON.parse(JSON.stringify(json))) {
      return true
    }
    return false
  } catch (err) {
    return false
  }
}

var _$src_8 = {};
(function (window) {
  'use strict'

  var options = {
    searchInput: null,
    resultsContainer: null,
    json: [],
    success: Function.prototype,
    searchResultTemplate: '<li><a href="{url}" title="{desc}">{title}</a></li>',
    templateMiddleware: Function.prototype,
    sortMiddleware: function () {
      return 0
    },
    noResultsText: 'No results found',
    limit: 10,
    fuzzy: false,
    exclude: []
  }

  var requiredOptions = ['searchInput', 'resultsContainer', 'json']

  /* removed: var _$Templater_7 = require('./Templater') */;
  /* removed: var _$Repository_4 = require('./Repository') */;
  /* removed: var _$JSONLoader_2 = require('./JSONLoader') */;
  var optionsValidator = _$OptionsValidator_3({
    required: requiredOptions
  })
  /* removed: var _$utils_9 = require('./utils') */;

  /*
    Public API
  */
  window.SimpleJekyllSearch = function (_options) {
    var errors = optionsValidator.validate(_options)
    if (errors.length > 0) {
      throwError('You must specify the following required options: ' + requiredOptions)
    }

    options = _$utils_9.merge(options, _options)

    _$Templater_7.setOptions({
      template: options.searchResultTemplate,
      middleware: options.templateMiddleware
    })

    _$Repository_4.setOptions({
      fuzzy: options.fuzzy,
      limit: options.limit,
      sort: options.sortMiddleware
    })

    if (_$utils_9.isJSON(options.json)) {
      initWithJSON(options.json)
    } else {
      initWithURL(options.json)
    }

    return {
      search: search
    }
  }

  // For backwards compatibility
  window.SimpleJekyllSearch.init = window.SimpleJekyllSearch

  if (typeof window.SimpleJekyllSearchInit === 'function') {
    window.SimpleJekyllSearchInit.call(this, window.SimpleJekyllSearch)
  }

  function initWithJSON (json) {
    options.success(json)
    _$Repository_4.put(json)
    registerInput()
  }

  function initWithURL (url) {
    _$JSONLoader_2.load(url, function (err, json) {
      if (err) {
        throwError('failed to get JSON (' + url + ')')
      }
      initWithJSON(json)
    })
  }

  function emptyResultsContainer () {
    options.resultsContainer.innerHTML = ''
  }

  function appendToResultsContainer (text) {
    options.resultsContainer.innerHTML += text
  }

  function registerInput () {
    options.searchInput.addEventListener('keyup', function (e) {
      if (isWhitelistedKey(e.which)) {
        emptyResultsContainer()
        search(e.target.value)
      }
    })
  }

  function search (query) {
    if (isValidQuery(query)) {
      emptyResultsContainer()
      render(_$Repository_4.search(query))
    }
  }

  function render (results) {
    var len = results.length
    if (len === 0) {
      return appendToResultsContainer(options.noResultsText)
    }
    for (var i = 0; i < len; i++) {
      appendToResultsContainer(_$Templater_7.compile(results[i]))
    }
  }

  function isValidQuery (query) {
    return query && query.length > 0
  }

  function isWhitelistedKey (key) {
    return [13, 16, 20, 37, 38, 39, 40, 91].indexOf(key) === -1
  }

  function throwError (message) {
    throw new Error('SimpleJekyllSearch --- ' + message)
  }
})(window)

}());
