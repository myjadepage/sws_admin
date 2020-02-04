/**
 *	cateTree v1.0
 *
 *	@author		HanSeungho landboy@gmail.com
 *	@copyright	Copyright (c) HanSeungho
 *
 *	작성일 :			2011-01-15
 *	최종수정일 :	2012-03-12
 **/

cateTree.popupMenu = {
	id: "CateTree_PopupMenu",
	menus: [],

	no: 0,
	depth: 0,

	checker: function (obj) {
		return (typeof (obj) == "function" ? false : true);
	},

	bind: function (key, title, listener) {
		if (typeof (key) == 'string' && this.checker(this[key])) {
			this.menus[key] = title;
			this[key] = listener;
		}
	},

	open: function (e) {
		e = e || window.event;
		var target = e.target || e.srcElement;

		var node = cateTree._pe(target, 'li');
		cateTree.popupMenu.no = node.getAttribute('no').toString().toNumeric();
		cateTree.popupMenu.depth = node.getAttribute('depth').toString().toNumeric();

		if (!cateTree._e(cateTree.popupMenu.id)) cateTree.popupMenu.create();

		if (cateTree._e(cateTree.popupMenu.id)) {
			var coords = cateTree.getMouseCoords(e);

			setTimeout(function () { cateTree.popupMenu.show(coords) }, 100);
			return false;
		}
	},

	show: function (coords) {
		var pop = cateTree._e(cateTree.popupMenu.id);
		pop.style.left = coords.x+'px';
		pop.style.top = coords.y+'px';
		pop.style.display = "block";

		cateTree.registEvent('click', cateTree.popupMenu.hide);
		cateTree.registEvent('contextmenu', cateTree.popupMenu.hide);
	},

	hide: function () {
		cateTree.unregistEvent('click', cateTree.popupMenu.hide);
		cateTree.unregistEvent('contextmenu', cateTree.popupMenu.hide);

		var pop = cateTree._e(cateTree.popupMenu.id);
		if (pop) pop.style.display = "none";
	},

	handler: function (element) {
		this[element.getAttribute('key').toString()](this.no, this.depth);
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
				display = "none";
				backgroundColor = "#FFF"
			}
		}
			var border = document.createElement("div");
			with (border) {
				style.border = "1px solid #BDBCE5";
				style.padding = "1px";
				style.overflow = "hidden";
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
						setAttribute('key', key);
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
