/**
 *	Rollover v1.2
 *
 *	@author		HanSeungho landboy@gmail.com
 *	@copyright	Copyright (c) HanSeungho
 * @brief			<img src="rollover.gif" oversrc="rollover_o.gif"> (oversrc : rollover 이미지)
 *
 *	작성일 :			2007-07-15
 *	최종수정일 :	2010-11-25
 **/

function Rollover() {
	this.arrImage = new Array();
	this.arrPreload = new Array();

	this.init = function() {
		var i, len = document.images.length;
		var obj, oversrc;

		for(i = 0; i < len; i++) {
			obj = document.images[i];
			oversrc = obj.getAttribute('oversrc');

			if (oversrc) {
				if (!obj.getAttribute('outstop')) obj.setAttribute('outstop', '0');
				obj.onmouseover = new Function("this.src='"+oversrc+"'");
				obj.onmouseout = new Function("if (this.getAttribute('outstop') == '0') this.src='"+obj.src+"'");
				obj.onerror = new Function("return false;");
				this.arrImage[this.arrImage.length] = oversrc;
			}
		}

		this.preload();
	}

	this.preload = function() {
		for (var i=0, len=this.arrImage.length; i<len; i++) {
			this.arrPreload[i] = new Image();
			this.arrPreload[i].src = this.arrImage[i];
		}
	}
}

function runRollover() {
	var objRollover = new Rollover();
	objRollover.init();
}

if (window.addEventListener) window.addEventListener('load', runRollover, false);
else window.attachEvent('onload', runRollover);
