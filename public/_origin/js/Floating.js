/**
 *	Floating v1.2.1
 *
 *	@author		HanSeungho landboy@gmail.com
 *	@copyright	Copyright (c) HanSeungho
 *
 *	작성일 :			2008-08-01
 *	최종수정일 :	2013-11-20
 **/

function Floating() {
	this.guide = null;										// 플로팅 기준객체
	this.item = null;										// 플로팅 객체
	this.timer = null;										// 타임 객체

	this.side = 1;											// 위치 (기준객체 오른쪽[1], 왼쪽[-1])
	this.speed = 5;										// 미끄러지는속도 : 작을수록 빠름
	this.time = 10;											// 빠르기 : 작을수록 부드러움
	this.isMove = true;									// 이동여부
	this.isResize = true;

	this.initTop;												// 초기 TOP 위치 : 설정시 해당위치에서 marginTop 위치로 미끄러져 온다. 예) -1000

	this.bodyMargin = { left : 0, top : 0 };		// BODY MARGIN

	this.guideTop;

	this.left;
	this.top;

	this.fixTop;

	this.marginSide;
	this.marginTop;
	this.marginBottom;

	this.init = function() {
		var self = this;

		if (this.item) {
			this.fixTop = (typeof this.fixTop == "undefined" ? -1 : parseInt(this.fixTop, 10));

			this.marginSide = (typeof this.marginSide == "undefined" ? 0 : parseInt(this.marginSide, 10));
			this.marginTop = (typeof this.marginTop == "undefined" ? 0 : parseInt(this.marginTop, 10));
			this.marginBottom = (typeof this.marginBottom == "undefined" ? 0 : parseInt(this.marginBottom, 10));

			if (this.guide) {
				this.guideTop = this.getOffset(this.guide).top;

				this.left = ((this.side>0 ? parseInt(this.guide.clientWidth, 10) : parseInt(this.item.clientWidth, 10)) * this.side) + (this.marginSide * this.side);
				this.top = this.guideTop + this.marginTop;

				this.item.style.left = (this.getOffset(this.guide).left + this.left) + "px";
				this.item.style.top = (typeof this.initTop == "undefined" ? this.top : this.initTop) + "px";
				this.item.style.visibility = "visible";

				this.addEvent(window, 'resize', function() { self.resize(); });

				setTimeout(function () {
					self.resize();
				}, 50);
			}
			else {
				this.top = this.getOffset(this.item).top + this.marginTop;

				this.item.style.marginLeft = this.marginSide + "px";
				this.item.style.top = (typeof this.initTop == "undefined" ? this.top : this.initTop) + "px";

				this.item.style.visibility = "visible";
			}
		}
	}

	this.run = function() {
		var self = this;

		if (!this.item) return;

		var floatingHeight = this.item.offsetHeight;

		var floatingTop = (this.item.style.top ? parseInt(this.item.style.top, 10) : this.item.offsetTop);
		var docTop = (document.documentElement.scrollTop || document.body.scrollTop) + this.top;
		if (this.fixTop > -1) {
			docTop -= (this.top - this.fixTop);
			if (this.guideTop > docTop) docTop = this.guideTop + this.marginTop;
		}
		var moveTop = Math.ceil(Math.abs(floatingTop - docTop) / this.speed);

		var limitBottom = document.body.scrollHeight - this.marginBottom;

		if (floatingTop < docTop) {
			floatingTop = ((floatingTop + moveTop + floatingHeight)<limitBottom ? floatingTop+moveTop : limitBottom-floatingHeight);
		}
		else {
			floatingTop -= moveTop;
		}
		this.item.style.top = floatingTop + "px";

		if (this.isMove) this.timer = setTimeout(function () { self.run() }, this.time);
	}

	this.move = function() {
		if (this.isMove) {
			this.isMove = false;
			clearTimeout(this.timer);
			this.item.style.top = this.top + "px";
		}
		else {
			this.isMove = true;
			this.run();
		}
	}

	this.resize = function() {
		if (this.item && this.isResize) {
			//this.left = parseInt(this.guide.clientWidth, 10) + this.marginSide;
			this.item.style.left = (this.getOffset(this.guide).left + this.left) + "px";
		}
	}

	this.reset = function (left, top) {
		this.isResize = false;
		this.marginSide = left - (this.getOffset(this.guide).left + (this.side>0 ? parseInt(this.guide.clientWidth, 10) : 0));
		this.top = top;
		this.item.style.left = left + "px";
		this.item.style.top = top + "px";
	}

	this.getOffset = function(obj) {
		var objOffset = { left : 0, top : 0 };
		var objOffsetParent = obj.offsetParent;

		objOffset.left = parseInt(obj.offsetLeft, 10);
		objOffset.top = parseInt(obj.offsetTop, 10);

		while (objOffsetParent) {
			objOffset.left += parseInt(objOffsetParent.offsetLeft, 10);
			objOffset.top += parseInt(objOffsetParent.offsetTop, 10);

			objOffsetParent = objOffsetParent.offsetParent;
		}

		return objOffset;
	}

	this.addEvent = function(obj, evt, exec) {
		if (window.attachEvent) obj.attachEvent('on'+evt, exec);
		else if (window.addEventListener) obj.addEventListener(evt, exec, false);
		else obj['on'+evt] = exec;
	}
}
