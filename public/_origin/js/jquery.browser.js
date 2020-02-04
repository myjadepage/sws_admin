/*!
 * jQuery Browser Plugin v0.0.2
 * https://github.com/gabceb/jquery-browser-plugin
 *
 * Original jquery-browser code Copyright 2005, 2013 jQuery Foundation, Inc. and other contributors
 * http://jquery.org/license
 *
 * New functionality Copyright 2013 Gabriel Cebrian
 * https://github.com/gabceb/jquery-browser-plugin/wiki/Authors
 *
 * Released under the MIT license
 *
 * Date: 2013-07-29T17:23:27-07:00
 */

(function( jQuery, window, undefined ) {
"use strict";
 
var matched, browser;
 
jQuery.uaMatch = function( ua ) {
  ua = ua.toLowerCase();
 
	var match = /(chrome)[ \/]([\w.]+)/.exec( ua ) ||
		/(webkit)[ \/]([\w.]+)/.exec( ua ) ||
		/(opera)(?:.*version|)[ \/]([\w.]+)/.exec( ua ) ||
		/(msie) ([\w.]+)/.exec( ua ) ||
		/(trident)(?:.*rv:([\w.]+))?/.exec(ua) ||
		ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec( ua ) ||
		[];

	var platform_match = /(ipad)/.exec( ua ) ||
		/(iphone)/.exec( ua ) ||
		/(android)/.exec( ua ) ||
		[];
 
	return {
		browser: match[ 1 ] || "",
		version: match[ 2 ] || "0",
		platform: platform_match[0] || ""
	};
};
 
matched = jQuery.uaMatch( window.navigator.userAgent );
browser = {};

if ( matched.browser ) {
	browser[ matched.browser ] = true;
	browser.version = matched.version;
}

if ( matched.platform) {
	browser[ matched.platform ] = true
}
 
// Chrome is Webkit, but Webkit is also Safari, IE11~.
if ( browser.chrome ) {
	browser.webkit = true;
}
else if ( browser.webkit ) {
	browser.safari = true;
}
else if ( browser.trident && browser.version ) {
	browser.msie = true;
}
 
jQuery.browser = browser;
 
})( jQuery, window );