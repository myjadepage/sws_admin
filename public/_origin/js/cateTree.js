/**
 *	cateTree v1.0
 *
 *	@author		HanSeungho landboy@gmail.com
 *	@copyright	Copyright (c) HanSeungho
 *
 *	작성일 :			2011-01-15
 *	최종수정일 :	2013-05-29
 **/

/* cateTree */
var cateTree = {
	isMSIE: (navigator.userAgent.toLowerCase().indexOf("msie") != -1),
	HIDDEN: { ME: 1, PARENT: 2 },
	CODE_DELIMITER: "_",

	wrap: null,

	maxDepth: 0,
	manage: 0,

	template: {
		'branch': "/images/tree_branch.gif",
		'branch_last': "/images/tree_branch_last.gif",
		'node': "/images/tree_node.gif",
		'node_end': "/images/tree_node_end.gif",
		'node_open': "/images/tree_node_open.gif",
		'node_open_end': "/images/tree_node_open_end.gif",
		'leaf': "/images/tree_leaf.gif",
		'leaf_end': "/images/tree_leaf_end.gif",
		'add': "/images/tree_add.gif",
		'arrow': "/images/tree_arrow.gif",
		'regist': "/images/icon_cate_regist.gif",
		'show': "/images/icon_cate_show.gif",
		'hide': "/images/icon_cate_hide.gif",
		'loading': "/images/loadingC32.gif"
	},

	stairHeight: 4,

	selected: { no: 0, code: null },

	linkageSelect: null,
	linkageRegist: null,

	init: function (wrap, maxDepth, manage) {
		this.wrap = wrap;
		if (maxDepth) this.maxDepth = maxDepth;
		if (manage) this.manage = manage;

		var path = null;
		var scripts = document.getElementsByTagName('script');
		for (var i=0; i<scripts.length; i++) {
			if (typeof (scripts[i].src) == 'string') {
				if (scripts[i].src.indexOf('tree/cateTree.js') != -1) {
					path = scripts[i].src.substring(0, scripts[i].src.lastIndexOf('/'));
					break;
				}
			}
		}
		if (path) {
			for (var key in this.template) {
				this.template[key] = path + this.template[key];
			}
		}
	},

	_e: function(id) {
		return document.getElementById(id);
	},

	_ee: function (id, name) {
		var parent = (typeof (id) == 'string' ? document.getElementById(id) : id);
		if (parent) return parent.getElementsByTagName(name);
		else return [];
	},

	_pe: function(obj, tag) {
		var result = null;

		if (obj) {
			var parent = obj.parentNode;
			while (parent) {
				if (parent.nodeName.toLowerCase() == tag) {
					result = parent;
					break;
				}
				parent = parent.parentNode;
			}
		}

		return result;
	},

	registEvent: function (type, listener) {
		if (window.addEventListener) document.addEventListener(type, listener, false);
		else document.attachEvent('on'+type, listener);
	},

	unregistEvent: function (type, listener) {
		if (window.removeEventListener) document.removeEventListener(type, listener, false);
		else document.detachEvent('on'+type, listener);
	},

	getMouseCoords: function(e) {
		if (e.pageX || e.pageY) {
			return { x: e.pageX, y: e.pageY };
		}
		else {
			return {
				x: e.clientX+document.body.scrollLeft+document.documentElement.scrollLeft,
				y: e.clientY+document.body.scrollTop+document.documentElement.scrollTop
			};
		}
	},

	getOffset: function (obj) {
		var offset = { left : 0, top : 0 };

		if (obj) {
			var parent = obj.offsetParent;

			offset.left = parseInt(obj.offsetLeft, 10);
			offset.top = parseInt(obj.offsetTop, 10);

			while (parent) {
				if (this.isMSIE) {
					offset.left += parseInt(parent.offsetLeft, 10)+(isNaN(parseInt(parent.currentStyle.borderLeftWidth, 10))?0:parseInt(parent.currentStyle.borderLeftWidth, 10));
					offset.top += parseInt(parent.offsetTop, 10)+(isNaN(parseInt(parent.currentStyle.borderTopWidth, 10))?0:parseInt(parent.currentStyle.borderTopWidth, 10));
				}
				else {
					offset.left += parseInt(parent.offsetLeft, 10);
					offset.top += parseInt(parent.offsetTop, 10);
				}
				parent = parent.offsetParent;
			}
		}

		return offset;
	},

	getCode: function (code, no) {
		if (code == null) code = this.CODE_DELIMITER;
		return code+no+this.CODE_DELIMITER;
	},

	fold: function (folder) {
		if (!folder.src.match(/tree_leaf/)) {
			var node = this._pe(folder, 'li');
			var childSections = this._ee(node, 'ul');
			if (childSections.length > 0) {
				node.removeChild(childSections[0]);
				folder.src = (node.getAttribute('end') != null ? this.template.node_end : this.template.node);
			}
			else {
				this.loading.show();
				this.gets(node);
				this.loading.hide();
			}
		}
	},

	select: function (obj) {
		var nowNo = this.selected.no;
		var newNo = obj.id.split('_')[1].toNumeric();

		var selectedElement = this._e('cate_'+nowNo);
		if (selectedElement) selectedElement.className = "";

		var node = this._pe(obj, 'li');

		this.selected.no = newNo;
		this.selected.code = node.getAttribute('code');

		obj.className = "selected";

		this.fold(node.firstChild);

		if (this.linkageSelect && nowNo != newNo) this.linkageSelect(this.selected.no);
	},

	hide: function (obj) {
		var node = this._pe(obj, 'li');
		var no = node.getAttribute('no');

		if (obj.style.cursor == 'default') {
			return false;
		}

		this.loading.show();

		new Ajax('POST', "category_edit.ajax.asp", { mode: "HIDDEN", cate: no }, function (r) {
			var objJson = JSON.parse(r.responseText);
			if (objJson != false) {
				var no = objJson.cate;
				var hidden = objJson.hidden.toString().toNumeric();

				obj.src = (hidden ? cateTree.template.hide : cateTree.template.show);

				cateTree.hidding(no);

				if (cateTree.throwHide) cateTree.throwHide(no, hidden);
			}
			objJson = null;

			cateTree.loading.hide();
		});
	},

	hidding: function (no, parent) {
		var img = this._e('hidden_'+no);

		if (typeof (parent) != 'undefined') {
			var hidden = (
				parent && (this._e('hidden_'+parent).src.match(/icon_cate_hide/) || this._e('hidden_'+parent).style.cursor == 'default') ? 1 : 0
			);

			if (this.isMSIE) img.style.filter = "alpha(opacity="+(hidden ? "40" : "100")+")";
			else img.style.opacity = (hidden ? "0.4" : "1");
			img.style.cursor = (hidden ? "default" : "pointer");
		}

		var hidden = (img.src.match(/icon_cate_hide/) || img.style.cursor=='default' ? 1 : 0);

		var childSections = this._ee(this._pe(img, 'li'), 'ul');
		if (childSections.length > 0) {
			var childNode = childSections[0].firstChild;
			while (childNode) {
				var childNo = childNode.getAttribute('no');
				if (childNo != null) {
					if (this.isMSIE) this._e('hidden_'+childNo).style.filter = "alpha(opacity="+(hidden ? "40" : "100")+")";
					else this._e('hidden_'+childNo).style.opacity = (hidden ? "0.4" : "1");
					this._e('hidden_'+childNo).style.cursor = (hidden ? "default" : "pointer");

					this.hidding(childNo);
				}

				childNode = childNode.nextSibling;
			}
		}
	},

	regist: function (parent) {
		if (this.linkageRegist) {
			if (this.selected.no) {
				var selectedElement = this._e('cate_'+this.selected.no);
				if (selectedElement) selectedElement.className = "";

				this.selected.no = 0;
				this.selected.code = null;
			}

			this.linkageRegist(parent);
		}
	},

	print: function (target, no) {
		if (typeof (target) == 'undefined') target = "";

		this.loading.show();

		var wrap = this.wrap;

		switch (target) {
		case 'total':		break;
		case 'child':
			var node = this._pe(this._e('cate_'+no), 'li');
			if (this._ee(node, 'ul').length) cateTree.fold(this._ee(node, 'img')[0]);
			target = 'total';
			wrap = node;
		break;
		case 'choice':
			target = this.selected.code;
		default:
			var child = this.wrap.firstChild;
			if (child) this.wrap.removeChild(child);
			break;
		}

		this.gets(wrap, target);

		setTimeout(function () {
			cateTree.loading.hide();
		}, 300);
	},

	add: function (args) {
		var parent = args.parent;
		var element = (parent ? this._pe(this._e('cate_'+parent), 'li') : this.wrap);

		var hiddenParent = (
			parent && (this._e('hidden_'+parent).src.match(/icon_cate_hide/) || this._e('hidden_'+parent).style.cursor == 'default') ? 1 : 0
		);

		var no = args.no;
		var code = this.getCode(element.getAttribute('code'), no);
		var name = args.name.trim();
		var depth = args.depth.toString().toNumeric();

		var hidden = 0;
		if (args.hidden.toString().toNumeric()) hidden |= this.HIDDEN.ME;
		if (hiddenParent) hidden |= this.HIDDEN.PARENT;

		var selectedElement = this._e('cate_'+this.selected.no);
		if (selectedElement) selectedElement.className = "";

		var node = this.makeNode(
			no, code, parent, name, depth, hidden, 1
		);
		if (!node) return;

		var sections = this._ee(element, 'ul');
		if (sections.length > 0) {
			var nextNode = null;

			var tempNode = sections[0].firstChild;
			while (tempNode) {
				if (tempNode && tempNode.nodeName.toLowerCase() == 'li') nextNode = tempNode;
				tempNode = tempNode.nextSibling;
			}

			if (nextNode) {
				sections[0].insertBefore(node, nextNode);
				sections[0].insertBefore(this.makeStair(), nextNode);
			}
		}

		this.selected.no = no;
		this.selected.code = code;
	},

	edit: function (args) {
		if (this._e('cate_'+args.no)) {
			this._e('cate_'+args.no).innerHTML = args.name;
			this._e('hidden_'+args.no).src = (args.hidden ? this.template.hide : this.template.show);
			this.hidding(args.no);
		}
	},

	remove: function (no) {
		var node = this._pe(this._e('cate_'+no), 'li');
		if (node) {
			var section = this._pe(node, 'ul');
			section.removeChild(node.nextSibling);
			section.removeChild(node);
		}
	},

	gets: function (element, target) {
		var parent = 0;

		if (element.getAttribute('no') != null) {
			parent = element.getAttribute('no').toString().toNumeric();
		}

		var wrap = this._ee(element, 'ul');
		if (wrap.length) {
			var nodes = this._ee(wrap[0], 'li');
			for (var i=0; i<nodes.length; i++) {
				if (nodes[i].getAttribute('no') != null) {
					var code = nodes[i].getAttribute('code');
					var depth = nodes[i].getAttribute('depth').toString().toNumeric();
					var child = nodes[i].getAttribute('child').toString().toNumeric();

					if (child && depth < this.maxDepth && (target=='total' || (target && code==target.substr(0, code.length))))
						this.gets(nodes[i], target);
				}
			}
		}
		else {
			new Ajax('GET', "/common/ajax/category.ajax.asp", { parent: parent }, function (r) {
				var objJson = JSON.parse(r.responseText);

				var section = document.createElement('ul');
				with (section.style) {
					listStyle = "none outside";
					margin = "0 0 4px 15px";
					padding = "0";
					background = "url("+cateTree.template.branch+") repeat-y";
				}
				section.appendChild(cateTree.makeStair());

				if (objJson != false) {
					var depth = objJson.depth;
					var hiddenParent = (
						cateTree.manage && parent && (cateTree._e('hidden_'+parent).src.match(/icon_cate_hide/) || cateTree._e('hidden_'+parent).style.cursor == 'default') ? 1 : 0
					);

					if (objJson.list) {
						for (var i=0, len=objJson.list.length; i<len; i++) {
							var no = objJson.list[i].cate;
							var code = cateTree.getCode(element.getAttribute('code'), no);
							var name = objJson.list[i].name.trim();
							var selected = (code == cateTree.selected.code || code == target ? 1 : 0);
							var child = (objJson.list[i].child.toString().toNumeric()>0 ? 1 : 0);
							var last = (i < (len - 1) ? 0 : 1);

							var hidden = 0;
							if (typeof (objJson.list[i].hidden) != 'undefined') {
								if (objJson.list[i].hidden.toString().toNumeric()) hidden |= cateTree.HIDDEN.ME;
								if (hiddenParent) hidden |= cateTree.HIDDEN.PARENT;
							}

							var node = cateTree.makeNode(
								no, code, parent, name, depth, hidden, selected, child, last
							);
							if (!node) return;

							section.appendChild(node);

							if (child && depth < cateTree.maxDepth && (target=='total' || (target && code==target.substr(0, code.length) && code != target))) {
								cateTree.gets(node, target);
							}

							if (cateTree.manage || i < (len - 1)) {
								section.appendChild(cateTree.makeStair());
							}
						}
					}
				}
				objJson = null;

				if (cateTree.manage) {
					var node = document.createElement('li');
						var img = document.createElement('img');
						img.src = cateTree.template.add;
						img.className = "node";
						img.style.verticalAlign = "middle";
						node.appendChild(img);

						var img = document.createElement('img');
						img.src = cateTree.template.regist;
						img.onclick = function () { cateTree.regist(parent); return false; }
						with (img.style) {
							verticalAlign = "middle";
							cursor = "pointer";
						}
						node.appendChild(img);

					section.appendChild(node);
				}
				else if (element.getAttribute('end') != null) {
					section.className = "last";
					with (section.style) {
						margin = "0";
						paddingLeft = "15px";
						background = "url("+cateTree.template.branch_last+") repeat-y";
					}
				}

				element.appendChild(section);

				var nodeParent = cateTree._pe(section, 'li');
				if (nodeParent) {
					cateTree._ee(nodeParent, 'img')[0].src = (nodeParent.getAttribute('end') ? cateTree.template.node_open_end : cateTree.template.node_open);
				}
			});
		}
	},

	makeNode: function (no, code, parent, name, depth, hidden, selected, child, last) {
		if (typeof (child) == 'undefined') child = 0;
		if (typeof (last) == 'undefined') last = 0;

		if (this._e('cate_'+no)) return null;

		var node = document.createElement('li');
		node.setAttribute('no', no);
		node.setAttribute('code', code);
		node.setAttribute('depth', depth);
		node.setAttribute('child', child);
		with (node.style) {
			whiteSpace = "nowrap";
			margin = "0";
			padding = "0";
		}
			var img = document.createElement('img');
			if (this.manage) {
				if (depth<this.maxDepth) {
					img.src = this.template.node;
					img.style.cursor = "pointer";
				}
				else {
					img.src = this.template.leaf;
				}
			}
			else {
				if (last) {
					if (child) {
						img.src = this.template.node_end;
						img.style.cursor = "pointer";
					}
					else img.src = this.template.leaf_end;

					node.setAttribute('end', 1);
				}
				else {
					if (child) {
						img.src = this.template.node;
						img.style.cursor = "pointer";
					}
					else img.src = this.template.leaf;
				}
			}
			img.onclick = function () { cateTree.fold(this) }
			img.className = "node";
			img.style.verticalAlign = "middle";
			node.appendChild(img);

			var a = document.createElement('a');
			a.id = 'cate_'+no;
			a.href = "javascript:;";
			a.onclick = function () { cateTree.select(this); return false; }
			if (cateTree.popupMenu) {
				a.oncontextmenu = cateTree.popupMenu.open;
			}
			a.onmouseout = function () { this.style.color = ""; this.style.background = "none"; }
			if (selected) a.className = "selected";
			a.innerHTML = name;
			node.appendChild(a);

			if (this.manage) {
				var img = document.createElement('img');
				img.id = 'hidden_'+no
				img.src = (hidden & this.HIDDEN.ME ? this.template.hide : this.template.show);
				img.onclick = function () { cateTree.hide(this) }
				img.className = "hidden";
				with (img.style) {
					verticalAlign = "middle";
					marginLeft = "3px";
					cursor = "pointer";
				}
				if (hidden & this.HIDDEN.PARENT) {
					if (this.isMSIE) img.style.filter = "alpha(opacity=40)";
					else img.style.opacity = "0.4";
					img.style.cursor = "default";
				}
				node.appendChild(img);
			}

		return node;
	},

	makeStair: function () {
		var li = document.createElement('li');
		li.className = "stair";
		with (li.style) {
			lineHeight = "1px";
			fontSize = "1px";
			marginTop = "0";
		}
			var a = document.createElement('a');
			a.onmouseout = function () { this.style.background = "none"; this.style.height = cateTree.stairHeight+'px'; }
			a.innerHTML = "&nbsp;";
			with (a.style) {
				display = "block";
				marginLeft = "15px";
				lineHeight = "1px";
				fontSize = "1px";
				height = this.stairHeight+'px';
			}
			li.appendChild(a);
		return li;
	},

	clearAStyle: function (section) {
		var nodes = cateTree._ee(section, 'li');
		for (var i=0; i<nodes.length; i++) {
			var a = cateTree._ee(nodes[i], 'a')[0];
			if (a) {
				a.style.color = "";
				a.style.background = "none";
			}
		}
	}
}

/* cateTree loading */
cateTree.loading = {
	show: function () {
		var loading = cateTree._e('cateTreeLoading');
		if (!loading) loading = cateTree.loading.make();

		var offset = cateTree.getOffset(cateTree.wrap);
		with (loading.style) {
			left = offset.left+'px';
			top = offset.top+'px';
			width = cateTree.wrap.offsetWidth+'px';
			height = cateTree.wrap.offsetHeight+'px';
			display = "block";
		}
	},

	hide: function () {
		var loading = cateTree._e('cateTreeLoading');
		if (!loading) loading = cateTree.loading.make();

		loading.style.display = "none";
	},

	make: function () {
		var loading = document.body.appendChild(document.createElement('div'));
		loading.id = "cateTreeLoading";
		with (loading.style) {
			display = "none";
			position = "absolute";
			backgroundColor = "#FFF";
			if (cateTree.isMSIE) filter = "alpha(opacity=50)";
			else opacity = "0.5";
		}
			var div = document.createElement('div');
			with (div.style) {
				position = "absolute";
				top = "5px";
				right = "5px";
			}
				var img = document.createElement('img');
				img.src = cateTree.template.loading;
				img.alt = "loading..";
				img.title = "loading..";
			div.appendChild(img);
		loading.appendChild(div);

		return loading;
	}
}
