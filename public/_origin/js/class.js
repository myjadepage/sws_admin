/**
 *	colorpicker v2.0
 *
 *	@author		HanSeungho landboy@gmail.com
 *	@copyright	Copyright (c) HanSeungho
 *
 *	작성일 :			2008-08-01
 *	최종수정일 :	2010-11-26
 **/

var colorpicker = {
	isMSIE: (navigator.userAgent.toLowerCase().indexOf("msie") != -1),

	obj: null,

	path: ".",

	width: 214,
	height: 318,

	callback: null,
	target: '',

	registEvent: function(type, listener) {
		if (window.addEventListener)
			document.addEventListener(type, listener, false);
		else
			document.attachEvent('on'+type, listener);
	},

	unregistEvent: function(type, listener) {
		if (window.removeEventListener)
			document.removeEventListener(type, listener, false);
		else
			document.detachEvent('on'+type, listener);
	},

	pick: function (color) {
		this.callback(this.target, color.toUpperCase());
		this.hide();
	},

	checkLayer: function () {
		if (!this.obj) {
			objDiv = document.createElement('DIV');
			objDiv.style.position = "absolute";
			objDiv.style.left = objDiv.style.top = "0px";
			objDiv.style.zIndex = 100;
			objDiv.style.display = "none";

				objIfrm = document.createElement("IFRAME");
				objIfrm.src = this.path+"/body.html";
				objIfrm.setAttribute("scrolling", "no");
				objIfrm.setAttribute("frameBorder", "0");
				objIfrm.setAttribute("marginWidth", "0");
				objIfrm.setAttribute("marginHeight", "0");
				objIfrm.style.width = this.width+'px';
				objIfrm.style.height = this.height+'px';

			objDiv.appendChild(objIfrm);

			document.body.appendChild(objDiv);

			this.obj = objDiv;
		}
	},

	show: function (x, y) {
		this.checkLayer();

		this.obj.style.left = x+"px";
		this.obj.style.top = y+"px";
		this.obj.style.display = "";

		setTimeout(function () { colorpicker.registEvent('click', colorpicker.hide) }, 100);
	},

	hide: function () {
		colorpicker.unregistEvent('click', colorpicker.hide);
		colorpicker.obj.style.display = "none";
	},

	init: function () {
		var path = null;

		var scripts = document.getElementsByTagName('script');
		for (var i=0; i<scripts.length; i++) {
			if (typeof (scripts[i].src) == 'string') {
				if (scripts[i].src.indexOf('colorpicker/class.js') != -1) {
					path = scripts[i].src;
					break;
				}
			}
		}

		if (path) this.path = path.substring(0, path.lastIndexOf('/'));
	},

	open: function (e, callback, target) {
		var self = this;
		var e = window.event || e;
		var stdBody = (document.documentElement || document.body);

		if (document.getElementById(target).disabled) return;

		this.callback = callback;
		this.target = target;

		var x = (this.isMSIE ? parseInt(document.body.scrollLeft, 10) + parseInt(e.clientX, 10) : parseInt(e.pageX, 10));
		if ((parseInt(stdBody.scrollWidth, 10) - x) <= this.width) x -= this.width;
		var y = (this.isMSIE ? parseInt(e.clientY, 10) + parseInt(document.body.scrollTop, 10) : parseInt(e.pageY, 10));
		if (this.isMSIE && parseInt(document.body.scrollTop, 10) == 0) y += parseInt(document.documentElement.scrollTop, 10);

		setTimeout(function () { self.show(x, y) }, 100);
	}
}

colorpicker.init();
