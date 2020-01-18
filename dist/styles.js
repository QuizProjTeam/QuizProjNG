(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["styles"],{

/***/ "./node_modules/raw-loader/index.js!./node_modules/postcss-loader/lib/index.js?!./src/app/styles/bookblock/bookblock.css":
/*!**********************************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./node_modules/postcss-loader/lib??embedded!./src/app/styles/bookblock/bookblock.css ***!
  \**********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".bb-bookblock {\n\twidth: 400px;\n\theight: 300px;\n\tmargin: 0 auto;\n\tposition: relative;\n\tz-index: 100;\n\t-webkit-perspective: 1300px;\n\tperspective: 1300px;\n\t-webkit-backface-visibility: hidden;\n\tbackface-visibility: hidden;\n}\n\n.bb-page {\n\tposition: absolute;\n\t-webkit-transform-style: preserve-3d;\n\ttransform-style: preserve-3d;\n\ttransition-property: -webkit-transform;\n\ttransition-property: transform;\n\ttransition-property: transform, -webkit-transform;\n}\n\n.bb-vertical .bb-page {\n\twidth: 50%;\n\theight: 100%;\n\tleft: 50%;\n\t-webkit-transform-origin: left center;\n\ttransform-origin: left center;\n}\n\n.bb-horizontal .bb-page {\n\twidth: 100%;\n\theight: 50%;\n\ttop: 50%;\n\t-webkit-transform-origin: center top;\n\ttransform-origin: center top;\n}\n\n.bb-page > div,\n.bb-outer,\n.bb-content,\n.bb-inner {\n\tposition: absolute;\n\theight: 100%;\n\twidth: 100%;\n\ttop: 0;\n\tleft: 0;\n\t-webkit-backface-visibility: hidden;\n\tbackface-visibility: hidden;\n}\n\n.bb-vertical .bb-content {\n\twidth: 200%;\n}\n\n.bb-horizontal .bb-content {\n\theight: 200%;\n}\n\n.bb-page > div {\n\twidth: 100%;\n\t-webkit-transform-style: preserve-3d;\n\ttransform-style: preserve-3d;\n}\n\n.bb-vertical .bb-back {\n\t-webkit-transform: rotateY(-180deg);\n\ttransform: rotateY(-180deg);\n}\n\n.bb-horizontal .bb-back {\n\t-webkit-transform: rotateX(-180deg);\n\ttransform: rotateX(-180deg);\n}\n\n.bb-outer {\n\twidth: 100%;\n\toverflow: hidden;\n\tz-index: 999;\n}\n\n.bb-overlay, \n.bb-flipoverlay {\n\tbackground-color: rgba(0, 0, 0, 0.7);\n\tposition: absolute;\n\ttop: 0;\n\tleft: 0;\n\twidth: 100%;\n\theight: 100%;\n\topacity: 0;\n}\n\n.bb-flipoverlay {\n\tbackground-color: rgba(0, 0, 0, 0.2);\n}\n\n.bb-bookblock.bb-vertical > div.bb-page:first-child,\n.bb-bookblock.bb-vertical > div.bb-page:first-child .bb-back {\n\t-webkit-transform: rotateY(180deg);\n\ttransform: rotateY(180deg);\n}\n\n.bb-bookblock.bb-horizontal > div.bb-page:first-child,\n.bb-bookblock.bb-horizontal > div.bb-page:first-child .bb-back {\n\t-webkit-transform: rotateX(180deg);\n\ttransform: rotateX(180deg);\n}\n\n/* Content display */\n\n.bb-content {\n\tbackground: #fff;\n}\n\n.bb-vertical .bb-front .bb-content {\n\tleft: -100%;\n}\n\n.bb-horizontal .bb-front .bb-content {\n\ttop: -100%;\n}\n\n/* Flipping classes */\n\n.bb-vertical .bb-flip-next,\n.bb-vertical .bb-flip-initial {\n\t-webkit-transform: rotateY(-180deg);\n\ttransform: rotateY(-180deg);\n}\n\n.bb-vertical .bb-flip-prev {\n\t-webkit-transform: rotateY(0deg);\n\ttransform: rotateY(0deg);\n}\n\n.bb-horizontal .bb-flip-next,\n.bb-horizontal .bb-flip-initial {\n\t-webkit-transform: rotateX(180deg);\n\ttransform: rotateX(180deg);\n}\n\n.bb-horizontal .bb-flip-prev {\n\t-webkit-transform: rotateX(0deg);\n\ttransform: rotateX(0deg);\n}\n\n.bb-vertical .bb-flip-next-end {\n\t-webkit-transform: rotateY(-15deg);\n\ttransform: rotateY(-15deg);\n}\n\n.bb-vertical .bb-flip-prev-end {\n\t-webkit-transform: rotateY(-165deg);\n\ttransform: rotateY(-165deg);\n}\n\n.bb-horizontal .bb-flip-next-end {\n\t-webkit-transform: rotateX(15deg);\n\ttransform: rotateX(15deg);\n}\n\n.bb-horizontal .bb-flip-prev-end {\n\t-webkit-transform: rotateX(165deg);\n\ttransform: rotateX(165deg);\n}\n\n.bb-item {\n\twidth: 100%;\n\theight: 100%;\n\tposition: absolute;\n\ttop: 0;\n\tleft: 0;\n\tdisplay: none;\n\tbackground: #fff;\n}\n\n/* No JS */\n\n.no-js .bb-bookblock, \n.no-js ul.bb-custom-grid li {\n\twidth: auto;\n\theight: auto;\n}\n\n.no-js .bb-item {\n\tdisplay: block;\n\tposition: relative;\n}"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./node_modules/postcss-loader/lib/index.js?!./src/assets/css/demo4.css":
/*!********************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./node_modules/postcss-loader/lib??embedded!./src/assets/css/demo4.css ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".bb-custom-wrapper {\n\twidth: 100%;\n\theight: 100%;\n\tposition: relative;\n}\n\n.bb-custom-wrapper .bb-bookblock {\n\twidth: 100%;\n\theight: 100%;\n\t-webkit-perspective: 2000px;\n\tperspective: 2000px;\n}\n\n.bb-custom-side {\n\twidth: 50%;\n\tfloat: left;\n\theight: 100%;\n\toverflow: hidden;\n\tbackground: #fff;\n\t/* Centering with flexbox */\n\tdisplay: flex;\n\tflex-direction: row;\n\tflex-wrap: wrap;\n\tjustify-content: center;\n\talign-items: center;\n}\n\n.bb-custom-firstpage h1 {\n\tfont-size: 2.625em;\n\tline-height: 1.3;\n\tmargin: 0;\n\tfont-weight: 300;\n\tbackground: #fff;\n}\n\n.bb-custom-firstpage h1 span {\n\tdisplay: block;\n\tfont-size: 60%;\n\topacity: 0.3;\n\tpadding: 0 0 0.6em 0.1em;\n}\n\n.bb-custom-firstpage {\n\ttext-align: center;\n\tpadding-top: 15%;\n\twidth: 50%;\n\tfloat: left;\n\theight: 100%;\n}\n\n.bb-custom-side p {\n\tpadding: 8%;\n\tfont-size: 1.8em;\n\tfont-weight: 300;\n}\n\n.bb-custom-wrapper h3 {\n\tfont-size: 1.4em;\n\tfont-weight: 300;\n\tmargin: 0.4em 0 1em;\n}\n\n.bb-custom-wrapper > nav {\n\twidth: 100%;\n\theight: 40px;\n\tmargin: 1em auto 0;\n\tposition: fixed;\n\tbottom: 20px;\n\tz-index: 1000;\n\ttext-align: center;\n}\n\n.bb-custom-wrapper > nav a {\n\tdisplay: inline-block;\n\twidth: 40px;\n\theight: 40px;\n\ttext-align: center;\n\tborder-radius: 2px;\n\tbackground: #1baede;\n\tcolor: #fff;\n\tfont-size: 0;\n\tmargin: 2px;\n}\n\n.bb-custom-wrapper > nav a:hover {\n\topacity: 0.6;\n}\n\n.bb-custom-icon:before {\n\tfont-family: 'arrows';\n\tspeak: none;\n\tfont-style: normal;\n\tfont-weight: normal;\n\tfont-variant: normal;\n\ttext-transform: none;\n\tline-height: 1;\n\tfont-size: 30px;\n\tline-height: 40px;\n\tdisplay: block;\n\t-webkit-font-smoothing: antialiased;\n}\n\n.bb-custom-icon-first:before,\n.bb-custom-icon-last:before {\n\tcontent: \"\\e002\";\n}\n\n.bb-custom-icon-arrow-left:before,\n.bb-custom-icon-arrow-right:before {\n\tcontent: \"\\e003\";\n}\n\n.bb-custom-icon-arrow-left:before,\n.bb-custom-icon-first:before {\n\t-webkit-transform: rotate(180deg);\n\ttransform: rotate(180deg);\n}\n\n/* No JS */\n\n.no-js .bb-custom-wrapper {\n\theight: auto;\n}\n\n.no-js .bb-custom-content {\n\theight: 470px;\n}\n\n@media screen and (max-width: 61.75em){\n\t.bb-custom-side {\n\t\tfont-size: 70%;\n\t}\n}\n\n@media screen and (max-width: 33em){\n\t.bb-custom-side {\n\t\tfont-size: 60%;\n\t}\n}\n\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./node_modules/postcss-loader/lib/index.js?!./src/styles.css":
/*!**********************************************************************************************!*\
  !*** ./node_modules/raw-loader!./node_modules/postcss-loader/lib??embedded!./src/styles.css ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./node_modules/style-loader/lib/addStyles.js":
/*!****************************************************!*\
  !*** ./node_modules/style-loader/lib/addStyles.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getTarget = function (target) {
  return document.querySelector(target);
};

var getElement = (function (fn) {
	var memo = {};

	return function(target) {
                // If passing function in options, then use it for resolve "head" element.
                // Useful for Shadow Root style i.e
                // {
                //   insertInto: function () { return document.querySelector("#foo").shadowRoot }
                // }
                if (typeof target === 'function') {
                        return target();
                }
                if (typeof memo[target] === "undefined") {
			var styleTarget = getTarget.call(this, target);
			// Special case to return head of iframe instead of iframe itself
			if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[target] = styleTarget;
		}
		return memo[target]
	};
})();

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(/*! ./urls */ "./node_modules/style-loader/lib/urls.js");

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
        if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertInto + " " + options.insertAt.before);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),

/***/ "./node_modules/style-loader/lib/urls.js":
/*!***********************************************!*\
  !*** ./node_modules/style-loader/lib/urls.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),

/***/ "./src/app/styles/bookblock/bookblock.css":
/*!************************************************!*\
  !*** ./src/app/styles/bookblock/bookblock.css ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../node_modules/raw-loader!../../../../node_modules/postcss-loader/lib??embedded!./bookblock.css */ "./node_modules/raw-loader/index.js!./node_modules/postcss-loader/lib/index.js?!./src/app/styles/bookblock/bookblock.css");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./src/assets/css/demo4.css":
/*!**********************************!*\
  !*** ./src/assets/css/demo4.css ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../node_modules/raw-loader!../../../node_modules/postcss-loader/lib??embedded!./demo4.css */ "./node_modules/raw-loader/index.js!./node_modules/postcss-loader/lib/index.js?!./src/assets/css/demo4.css");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./src/styles.css":
/*!************************!*\
  !*** ./src/styles.css ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../node_modules/raw-loader!../node_modules/postcss-loader/lib??embedded!./styles.css */ "./node_modules/raw-loader/index.js!./node_modules/postcss-loader/lib/index.js?!./src/styles.css");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ 2:
/*!**************************************************************************************************!*\
  !*** multi ./src/styles.css ./src/app/styles/bookblock/bookblock.css ./src/assets/css/demo4.css ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! C:\VSCode\YTQuiz\src\styles.css */"./src/styles.css");
__webpack_require__(/*! C:\VSCode\YTQuiz\src\app\styles\bookblock\bookblock.css */"./src/app/styles/bookblock/bookblock.css");
module.exports = __webpack_require__(/*! C:\VSCode\YTQuiz\src\assets\css\demo4.css */"./src/assets/css/demo4.css");


/***/ })

},[[2,"runtime"]]]);
//# sourceMappingURL=styles.js.map