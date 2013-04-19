// Generated by CoffeeScript 1.6.2
(function() {
  var $, $d, $w, Animation, Callbacks, Deferred, Math, NAMESPACE, Psyborg, Psyence, VERSION, ajax, camelCase, clearInterval, clearTimeout, contains, createDiv, createUID, cssHeight, cssLeft, cssOpacity, cssTop, cssWidth, d, dE, each, extend, global, grep, hasnt, hasntAddEventListener, hasntPosStyle, inArray, int, isAndroid, isAndroid21, isAndroid22, isAndroid23, isAndroid3, isAndroid4, isArray, isChrome, isEmptyObject, isFunction, isIE, isIE10, isIE6, isIE7, isIE8, isIE9, isMobileChrome, isMobileIE, isMobileSafari, isMobileWebkit, isMoz, isNaN, isNumeric, isOpera, isPlainObject, isSafari, isSafari4, isSafari5, isSafari6, isString, isTouchable, isWebkit, ltAndroid21, ltAndroid22, ltAndroid23, ltAndroid3, ltIE6, ltIE7, ltIE8, ltIE9, ltSafari4, ltSafari5, map, noop, proxy, setInterval, setTimeout, supportCSS3, trim, w, window, _inArray,
    __slice = [].slice;

  window = this;

  
(function (window) {

		// This library re-implements setTimeout, setInterval, clearTimeout, clearInterval for iOS6.
		// iOS6 suffers from a bug that kills timers that are created while a page is scrolling.
		// This library fixes that problem by recreating timers after scrolling finishes (with interval correction).
		// This code is free to use by anyone (MIT, blabla).
		// Author: rkorving@wizcorp.jp

		if (!/OS 6_0.+like 0S X/i.test(window.navigator.userAgent)) {
			return;
		}

		var timeouts = {};
		var intervals = {};
		var orgSetTimeout = window.setTimeout;
		var orgSetInterval = window.setInterval;
		var orgClearTimeout = window.clearTimeout;
		var orgClearInterval = window.clearInterval;


		function createTimer(set, map, args) {
				var id, cb = args[0], repeat = (set === orgSetInterval);

				function callback() {
						if (cb) {
								cb.apply(window, arguments);

								if (!repeat) {
										delete map[id];
										cb = null;
								}
						}
				}

				args[0] = callback;

				id = set.apply(window, args);

				map[id] = { args: args, created: Date.now(), cb: cb, id: id };

				return id;
		}


		function resetTimer(set, clear, map, virtualId, correctInterval) {
				var timer = map[virtualId];

				if (!timer) {
						return;
				}

				var repeat = (set === orgSetInterval);

				// cleanup

				clear(timer.id);

				// reduce the interval (arg 1 in the args array)

				if (!repeat) {
						var interval = timer.args[1];

						var reduction = Date.now() - timer.created;
						if (reduction < 0) {
								reduction = 0;
						}

						interval -= reduction;
						if (interval < 0) {
								interval = 0;
						}

						timer.args[1] = interval;
				}

				// recreate

				function callback() {
						if (timer.cb) {
								timer.cb.apply(window, arguments);
								if (!repeat) {
										delete map[virtualId];
										timer.cb = null;
								}
						}
				}

				timer.args[0] = callback;
				timer.created = Date.now();
				timer.id = set.apply(window, timer.args);
		}


		window.setTimeout = function () {
				return createTimer(orgSetTimeout, timeouts, arguments);
		};


		window.setInterval = function () {
				return createTimer(orgSetInterval, intervals, arguments);
		};

		window.clearTimeout = function (id) {
				var timer = timeouts[id];

				if (timer) {
						delete timeouts[id];
						orgClearTimeout(timer.id);
				}
		};

		window.clearInterval = function (id) {
				var timer = intervals[id];

				if (timer) {
						delete intervals[id];
						orgClearInterval(timer.id);
				}
		};

		window.addEventListener('scroll', function () {
				// recreate the timers using adjusted intervals
				// we cannot know how long the scroll-freeze lasted, so we cannot take that into account

				var virtualId;

				for (virtualId in timeouts) {
						resetTimer(orgSetTimeout, orgClearTimeout, timeouts, virtualId);
				}

				for (virtualId in intervals) {
						resetTimer(orgSetInterval, orgClearInterval, intervals, virtualId);
				}
		});

}(window));
;

  
/*!
 * Bez v1.0.10-g5ae0136
 * http://github.com/rdallasgray/bez
 *
 * A plugin to convert CSS3 cubic-bezier co-ordinates to jQuery-compatible easing functions
 *
 * With thanks to Nikolay Nemshilov for clarification on the cubic-bezier maths
 * See http://st-on-it.blogspot.com/2011/05/calculating-cubic-bezier-function.html
 *
 * Copyright 2011 Robert Dallas Gray. All rights reserved.
 * Provided under the FreeBSD license: https://github.com/rdallasgray/bez/blob/master/LICENSE.txt
*/jQuery.extend({bez:function(a){var b="bez_"+$.makeArray(arguments).join("_").replace(".","p");if(typeof jQuery.easing[b]!="function"){var c=function(a,b){var c=[null,null],d=[null,null],e=[null,null],f=function(f,g){return e[g]=3*a[g],d[g]=3*(b[g]-a[g])-e[g],c[g]=1-e[g]-d[g],f*(e[g]+f*(d[g]+f*c[g]))},g=function(a){return e[0]+a*(2*d[0]+3*c[0]*a)},h=function(a){var b=a,c=0,d;while(++c<14){d=f(b,0)-a;if(Math.abs(d)<.001)break;b-=d/g(b)}return b};return function(a){return f(h(a),1)}};jQuery.easing[b]=function(b,d,e,f,g){return f*c([a[0],a[1]],[a[2],a[3]])(d/g)+e}}return b}});
;

  'use strict';

  if (!this.jQuery) {
    throw new ReferenceError('jQuery is not defind');
  }

  NAMESPACE = 'Psyborg';

  VERSION = '0.1.0';

  global = this;

  Math = global.Math;

  setTimeout = global.setTimeout;

  clearTimeout = global.clearTimeout;

  setInterval = global.setInterval;

  clearInterval = global.clearInterval;

  isNaN = global.isNaN;

  $ = global.jQuery;

  Deferred = $.Deferred;

  Animation = $.Animation;

  Callbacks = $.Callbacks;

  noop = $.noop;

  extend = $.extend;

  ajax = $.ajax;

  proxy = $.proxy;

  each = $.each;

  map = $.map;

  grep = $.grep;

  trim = $.trim;

  camelCase = $.camelCase;

  contains = $.contains;

  _inArray = $.inArray;

  isPlainObject = $.isPlainObject;

  isEmptyObject = $.isEmptyObject;

  isNumeric = $.isNumeric;

  isArray = $.isArray;

  isFunction = $.isFunction;

  w = global;

  d = w.document;

  dE = d.documentElement;

  $w = $(w);

  $d = $(d);

  hasnt = function(property) {
    return property === void 0;
  };

  hasntAddEventListener = hasnt(w.addEventListener);

  hasntPosStyle = hasnt(dE.style.posTop);

  isTouchable = !hasnt(w.ontouchstart) || !!w.navigator.msPointerEnabled;

  isIE = !!d.uniqueID;

  ltIE6 = hasntAddEventListener && hasnt(dE.style.maxHeight);

  ltIE7 = hasntAddEventListener && hasnt(d.querySelectorAll);

  ltIE8 = hasntAddEventListener && hasnt(d.getElementsByClassName);

  ltIE9 = isIE && hasnt(w.Worker);

  isIE6 = isIE && ltIE6;

  isIE7 = isIE && ltIE7 && !ltIE6;

  isIE8 = isIE && ltIE8 && !ltIE7;

  isIE9 = isIE && ltIE9 && !ltIE8;

  isIE10 = isIE && !ltIE9;

  isMoz = !!w.sidebar;

  isOpera = !!w.opera;

  isWebkit = !d.uniqueID && !isOpera && !isMoz && !!w.localStorage;

  isChrome = isWebkit && !hasnt(d.webkitHidden);

  isSafari = isWebkit && !isChrome && !isTouchable;

  ltSafari4 = isSafari && hasnt(w.matchMedia);

  ltSafari5 = isSafari && hasnt(w.FileReader);

  isSafari4 = isSafari && ltSafari4;

  isSafari5 = isSafari && ltSafari5 && !ltSafari4;

  isSafari6 = isSafari && !ltSafari5;

  isMobileIE = isTouchable && isIE10;

  isMobileWebkit = isTouchable && isWebkit;

  isMobileChrome = isMobileWebkit && isChrome;

  isAndroid = isMobileWebkit && hasnt(w.EventSource);

  ltAndroid21 = isAndroid && hasnt(w.onhashchange);

  ltAndroid22 = isAndroid && hasnt(w.Blob);

  ltAndroid23 = isAndroid && hasnt(w.FileReader);

  ltAndroid3 = isAndroid && hasnt(w.ArrayBuffer);

  isAndroid21 = isAndroid && ltAndroid21;

  isAndroid22 = isAndroid && ltAndroid22 && !ltAndroid21;

  isAndroid23 = isAndroid && ltAndroid23 && !ltAndroid22;

  isAndroid3 = isAndroid && ltAndroid3 && !ltAndroid23;

  isAndroid4 = isAndroid && !ltAndroid3;

  isMobileSafari = isMobileWebkit && !isAndroid && !isMobileChrome;

  createUID = function() {
    return parseInt(new Date().valueOf() + setTimeout(noop, 0), 10).valueOf().toString(16);
  };

  createDiv = function() {
    var classNames, div;

    classNames = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    div = d.createElement('div');
    div.className = classNames.join(' ');
    return div;
  };

  inArray = function(array, needle) {
    var item, _i, _len;

    for (_i = 0, _len = array.length; _i < _len; _i++) {
      item = array[_i];
      if (item === needle) {
        return true;
      }
    }
    return false;
  };

  isString = function(string) {
    return string === String(string);
  };

  int = function(numericObject) {
    return parseInt(numericObject, 10) || 0;
  };

  cssTop = (function() {
    var name, unit;

    if (!hasntPosStyle) {
      name = 'posTop';
      unit = 0;
    } else {
      name = 'top';
      unit = 'px';
    }
    return function($elem, val) {
      return $elem[0].style[name] = val + unit;
    };
  })();

  cssLeft = (function() {
    var name, unit;

    if (!hasntPosStyle) {
      name = 'posLeft';
      unit = 0;
    } else {
      name = 'left';
      unit = 'px';
    }
    return function($elem, val) {
      return $elem[0].style[name] = val + unit;
    };
  })();

  cssWidth = (function() {
    var name, unit;

    if (!hasntPosStyle) {
      name = 'posWidth';
      unit = 0;
    } else {
      name = 'width';
      unit = 'px';
    }
    return function($elem, val) {
      return $elem[0].style[name] = val + unit;
    };
  })();

  cssHeight = (function() {
    var name, unit;

    if (!hasntPosStyle) {
      name = 'posHeight';
      unit = 0;
    } else {
      name = 'height';
      unit = 'px';
    }
    return function($elem, val) {
      return $elem[0].style[name] = val + unit;
    };
  })();

  cssOpacity = (function() {
    return function($elem, val) {
      if (ltIE8) {
        return $elem[0].style.filter = "filter:alpha(Opcity=" + (val * 100) + ")";
      } else {
        return $elem[0].style.opacity = val;
      }
    };
  })();

  supportCSS3 = (function() {
    var cssProp, cssProps, cssStyleDeclaration, eventName, eventProps, i, method, p, pattern, patterns, prefix, requestAnimationFrameMethods, result, venderPrefix, _i, _j, _k, _l, _len, _len1, _len2, _len3, _len4, _len5, _len6, _len7, _m, _n, _o, _p, _ref;

    result = {};
    cssStyleDeclaration = createDiv().style;
    venderPrefix = ['Webkit', 'Moz', 'O', 'Ms', ''];
    cssProps = ['Transform', 'Transition', 'Animation'];
    eventProps = ['TransitionEnd', 'AnimationStart', 'AnimationIteration', 'AnimationEnd'];
    requestAnimationFrameMethods = ['RequestAnimationFrame', 'CancelAnimationFrame', 'Performance'];
    _ref = cssProps.concat(eventProps, requestAnimationFrameMethods);
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      p = _ref[_i];
      result[p] = null;
    }
    for (_j = 0, _len1 = venderPrefix.length; _j < _len1; _j++) {
      prefix = venderPrefix[_j];
      for (_k = 0, _len2 = cssProps.length; _k < _len2; _k++) {
        cssProp = cssProps[_k];
        patterns = [prefix + cssProp, prefix.toUpperCase() + cssProp, prefix.toLowerCase() + cssProp, prefix.toLowerCase() + cssProp.toLowerCase()];
        for (_l = 0, _len3 = patterns.length; _l < _len3; _l++) {
          pattern = patterns[_l];
          if (cssStyleDeclaration[pattern] !== void 0) {
            result[cssProp] = pattern;
          }
        }
      }
      for (_m = 0, _len4 = eventProps.length; _m < _len4; _m++) {
        eventName = eventProps[_m];
        patterns = [prefix + eventName, prefix.toUpperCase() + eventName, prefix.toLowerCase() + eventName, prefix.toLowerCase() + eventName.toLowerCase()];
        for (i = _n = 0, _len5 = patterns.length; _n < _len5; i = ++_n) {
          pattern = patterns[i];
          if (w['on' + pattern] !== void 0) {
            result[eventName] = pattern;
          }
        }
      }
      for (_o = 0, _len6 = requestAnimationFrameMethods.length; _o < _len6; _o++) {
        method = requestAnimationFrameMethods[_o];
        patterns = [prefix + method, prefix.toUpperCase() + method, prefix.toLowerCase() + method, prefix.toLowerCase() + method.toLowerCase()];
        for (_p = 0, _len7 = patterns.length; _p < _len7; _p++) {
          pattern = patterns[_p];
          if (w[pattern] !== void 0) {
            result[method] = pattern;
          }
        }
      }
    }
    result['PerformanceNow'] = result.Performance && isFunction(result.Performance.now);
    return result;
  })();

  Psyence = (function() {
    var _floor, _max, _min, _random;

    _random = Math.random;

    _max = Math.max;

    _min = Math.min;

    _floor = Math.floor;

    Psyence.random = function(from, to) {
      var array, length, max, min, newArray;

      if (isNumeric(from)) {
        if (!isNumeric(to)) {
          to = from;
          from = 0;
        }
        min = _min(from, to);
        max = _max(from, to) + 1;
        return _floor(_random() * (max - min) + min);
      } else if (isArray(from)) {
        array = from;
        newArray = [];
        while (length = array.length) {
          newArray = newArray.concat(array.splice(this.random(length)));
        }
        return newArray;
      }
      return 0;
    };

    function Psyence() {
      throw new TypeError('object is not a function');
    }

    return Psyence;

  })();

  Psyborg = (function() {
    var getPositionState;

    getPositionState = function($target) {
      var position;

      position = $target.css('position');
      if (position === void 0 || position === null || position === '' || position === 'static') {
        return 'relative';
      } else {
        return position;
      }
    };

    Psyborg.prototype.uid = null;

    Psyborg.prototype.$ = null;

    Psyborg.prototype.$ctn = null;

    Psyborg.prototype.$wrp = null;

    Psyborg.prototype.$bg = null;

    Psyborg.prototype.$hit = null;

    Psyborg.prototype._width = 0;

    Psyborg.prototype._height = 0;

    Psyborg.prototype._top = 0;

    Psyborg.prototype._left = 0;

    Psyborg.prototype._zIndex = 0;

    Psyborg.prototype._zoom = 1;

    Psyborg.prototype._opacity = 1;

    Psyborg.prototype._x = 0;

    Psyborg.prototype._y = 0;

    Psyborg.prototype._rotate = 0;

    Psyborg.prototype._scaleX = 1;

    Psyborg.prototype._scaleY = 1;

    Psyborg.prototype._colorR = 0;

    Psyborg.prototype._colorG = 0;

    Psyborg.prototype._colorB = 0;

    Psyborg.prototype._colorA = 0;

    Psyborg.prototype._backgroundImage = null;

    Psyborg.prototype._position = null;

    function Psyborg(jQueryObjectOrSelectors, jQueryORDocumentContext) {
      var $bg, $ctn, $hit, $wrp, bgClass, className, coreClass, ctnClass, hitClass, uid, wrpClass;

      if (!(this instanceof Psyborg)) {
        return new Psyborg(jQueryObjectOrSelectors, jQueryORDocumentContext);
      }
      uid = createUID();
      className = "" + NAMESPACE + " _" + NAMESPACE + uid;
      this.uid = uid;
      this.$ = $(jQueryObjectOrSelectors, jQueryORDocumentContext);
      this.setPropertiesByComputedValues(this.$);
      coreClass = "_" + NAMESPACE + "_core";
      this.$.addClass([className, coreClass].join(' '));
      this.$.css({
        position: 'absolute',
        zIndex: 1
      });
      ctnClass = "_" + NAMESPACE + "_container";
      $ctn = $(createDiv(className, ctnClass));
      this.$.wrap($ctn);
      this.$ctn = this.$.parent();
      this.$ctn.css({
        position: this._position
      });
      wrpClass = "_" + NAMESPACE + "_wrapper";
      $wrp = $(createDiv(className, wrpClass));
      this.$ctn.wrapInner($wrp);
      this.$wrp = this.$ctn.children();
      bgClass = "_" + NAMESPACE + "_background";
      $bg = $(createDiv(className, bgClass));
      $bg.appendTo(this.$wrp);
      this.$bg = $bg;
      hitClass = "_" + NAMESPACE + "_hitarea";
      $hit = $(createDiv(className, hitClass));
      $hit.insertBefore(this.$wrp);
      this.$hit = $hit;
      this.update();
    }

    Psyborg.prototype.setPropertiesByComputedValues = function($origin) {
      this._width = $origin.width();
      this._height = $origin.height();
      this._top = int($origin.css({
        position: 'top'
      }));
      this._left = int($origin.css({
        position: 'left'
      }));
      this._zIndex = int($origin.css('z-index'));
      this._zoom = int($origin.css('zoom'));
      this._opacity = parseFloat($origin.css('opacity'));
      this._position = getPositionState(this.$);
      return this;
    };

    Psyborg.prototype.update = function() {
      this.$.css({
        width: this._width,
        height: this._height,
        top: this._top,
        left: this._left,
        zIndex: this._zIndex,
        zoom: this._zoom
      });
      return this;
    };

    Psyborg.prototype.x = function(x, setRelative) {
      var setX;

      if (x == null) {
        return _x;
      } else {
        setX = parseFloat(x);
        if (setRelative) {
          setX += this.x();
        }
        this._x = setX;
        this.update();
        return this;
      }
    };

    Psyborg.prototype.trace = function() {
      this.$.css({
        backgroundColor: 'rgba(  0, 255,   0, 0.2)'
      });
      this.$ctn.css({
        backgroundColor: 'rgba(  0,   0, 255, 0.2)'
      });
      this.$wrp.css({
        backgroundColor: 'rgba(255, 255, 255, 0.2)'
      });
      this.$bg.css({
        backgroundColor: 'rgba(  0,   0,   0, 0.2)'
      });
      this.$hit.css({
        backgroundColor: 'rgba(255,   0,   0, 0.2)'
      });
      return this;
    };

    return Psyborg;

  })();

  $[NAMESPACE] = Psyborg;

}).call(this);

/*
//@ sourceMappingURL=psyborg.map
*/
