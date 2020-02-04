/* ezpop */
var ezpop = {
	workPop: null,

	_e: function (id) {
		return document.getElementById(id);
	},

	getOffset: function (obj) {
		var offset = { left : 0, top : 0 };
		var offsetParent = obj.offsetParent;

		offset.left = obj.offsetLeft;
		offset.top = obj.offsetTop;

		while (offsetParent) {
			offset.left += offsetParent.offsetLeft;
			offset.top += offsetParent.offsetTop;

			offsetParent = offsetParent.offsetParent;
		}

		return offset;
	},

	registEvent: function (type, listener) {
		if (window.addEventListener) document.addEventListener(type, listener, false);
		else document.attachEvent('on'+type, listener);
	},

	unregistEvent: function (type, listener) {
		if (window.removeEventListener) document.removeEventListener(type, listener, false);
		else document.detachEvent('on'+type, listener);
	},

	checker: function (obj) {
		return (typeof (obj) == "function" ? false : true);
	},

	show: function (id, element) {
		this.hide();

		var pop = this._e(id);

		if (pop) {
			var offset = this.getOffset(element);

			pop.style.left = (offset.left+((element.offsetWidth - pop.offsetWidth) / 2))+'px';
			pop.style.top = (offset.top + element.offsetHeight)+'px';
			pop.style.visibility = "visible";

			this.workPop = pop;
			this.registEvent('click', ezpop.hide);
		}
	},

	hide: function () {
		ezpop.unregistEvent('click', ezpop.hide);

		if (ezpop.workPop) {
			ezpop.workPop.style.visibility = "hidden";
			ezpop.workPop = null;
		}
	}
}

/* ezpop member */
ezpop.member = {
	id: 'Ezpop_Member',
	menus: [],

	value: null,

	bind: function (key, title, listener) {
		if (typeof (key) == 'string' && ezpop.checker(this[key])) {
			this.menus[key] = title;
			this[key] = listener;
		}
	},

	open: function (e) {
		var self = this;
		var e = window.event || e;
		var element = (e.srcElement ? e.srcElement : e.target);
		var value = element.getAttribute('ezi');

		if (value != null && value.toString().toNumeric() > 0) {
			if (!ezpop._e(this.id)) this.create();
			this.value = value;

			setTimeout(function () { ezpop.show(self.id, element) }, 100);
		}

		return false;
	},

	handler: function (element) {
		this[element.getAttribute('ez').toString()](this.value);
	},

	create: function () {
		var self = this;

		var pop = document.createElement('div');
		with (pop) {
			id = this.id;
			with (style) {
				position = "absolute";
				left = top = "0px";
				zIndex = 1000;
				visibility = "hidden";
				backgroundColor = "#FFF"
			}
		}
			var border = document.createElement("div");
			with (border.style) {
				border = "1px solid #BDBCE5";
				padding = "1px";
				overflow = "hidden";
			}

			for (var key in this.menus) {
				try {
					var box = document.createElement("div");
					with (box) {
						with (style) {
							border = "1px solid #FFF";
							padding = "3px 5px 2px";
							fontSize = "11px";
							fontFamily = "dotum";
							cursor = "pointer";
						}
						setAttribute('ez', key);
						onclick = function () { self.handler(this) };
						onmouseover = function () {
							this.style.backgroundColor = "#E7E7FF";
							this.style.border = "1px solid #CDCCEE";
						};
						onmouseout = function () {
							this.style.backgroundColor = "#FFF";
							this.style.border = "1px solid #FFF";
						};
						innerHTML = this.menus[key];
					}
					border.appendChild(box);
				}
				catch (e) { }
			}

		if (border.hasChildNodes()) {
			pop.appendChild(border);

			document.body.appendChild(pop);
		}
		box = border = pop = null;
	}
}
