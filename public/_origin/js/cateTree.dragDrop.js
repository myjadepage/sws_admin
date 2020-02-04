/**
 *	cateTree v1.0
 *
 *	@author		HanSeungho landboy@gmail.com
 *	@copyright	Copyright (c) HanSeungho
 *
 *	작성일 :			2011-01-15
 *	최종수정일 :	2012-03-12
 **/

cateTree.dragDrop = {
	source: null,
	helper: null,
	timer: null,

	confirmApplyMove: null,

	cancelEvent: function() {
		return false;
	},

	cancelSelectionEvent: function() {
		if (!cateTree.dragDrop.helper) return true;
		return false;
	},

	init: function () {
		var dragHelper = document.body.appendChild(document.createElement('div'));
		dragHelper.id = "cateTreeDragHelper";
		with (dragHelper.style) {
			display = "none";
			position = "absolute";
			padding = "3px";
			border = "1px solid #777";
			backgroundColor = "#F0F0F0";
			color = "#333";
			fontWeight = "bold";
			fontFamily = "dotum";
			fontSize = "12px";
			if (cateTree.isMSIE) filter = "alpha(opacity=90)";
			else opacity = "0.9";
		}

		document.documentElement.onselectstart = cateTree.dragDrop.cancelSelectionEvent;
		document.documentElement.ondragstart = cateTree.dragDrop.cancelEvent;

		cateTree.wrap.onmousedown = cateTree.dragDrop.down;
		cateTree.wrap.onmousemove = cateTree.dragDrop.move;
		document.documentElement.onmouseup = cateTree.dragDrop.up;
	},

	cloneHelper: function() {
		if (cateTree.dragDrop.source) {
			var text = cateTree._ee(cateTree.dragDrop.source, 'a')[0].innerHTML;

			cateTree.dragDrop.helper = cateTree._e('cateTreeDragHelper');
			cateTree.dragDrop.helper.innerHTML = text;
			cateTree.dragDrop.helper.style.display = "";
		}
	},

	clear: function (target) {
		clearTimeout(cateTree.dragDrop.timer);

		var dragHelper = cateTree._e('cateTreeDragHelper');
		if (dragHelper) {
			if (dragHelper.hasChildNodes()) dragHelper.removeChild(dragHelper.firstChild);
			dragHelper.style.display = "none";
		}
		cateTree.dragDrop.source = null;
		cateTree.dragDrop.helper = null;

		if (target && target.nodeName.toLowerCase() == 'a') {
			target.style.color = "";
			target.style.background = "none";
		}
	},

	move: function(e) {
		e = e || window.event;
		var target = e.target || e.srcElement;
		var mousePos = cateTree.getMouseCoords(e);

		if (cateTree.dragDrop.helper) {
			if (target.nodeName.toLowerCase() == 'a') {
				if (cateTree._pe(target, 'li').className == 'stair') {
					target.style.height = "6px";
					target.style.background = "url("+cateTree.template.arrow+") no-repeat";
				}
				else {
					target.style.color = "#FFF";
					target.style.background = "#000";
				}
			}
			cateTree.dragDrop.helper.style.display = "";
			cateTree.dragDrop.helper.style.top = (mousePos.y+10)+'px';
			cateTree.dragDrop.helper.style.left = (mousePos.x+10)+'px';
		}
		return false;
	},

	down: function(e) {
		cateTree.dragDrop.source = null;
		cateTree.dragDrop.helper = null;

		e = e || window.event;
		var target = e.target || e.srcElement;
		var button = e.button || e.which;

		if (button != 1) {
			cateTree.dragDrop.clear();
			return false;
		}

		var mousePos = cateTree.getMouseCoords(e);

		if (target.nodeName.toLowerCase() == 'a' && target.getAttribute('id')) {
			cateTree.dragDrop.source = cateTree._pe(target, 'li');

			if (cateTree.dragDrop.source) {
				var dragHelper = cateTree._e('cateTreeDragHelper');
				dragHelper.style.top = (mousePos.y+10)+'px';
				dragHelper.style.left = (mousePos.x+10)+'px';

				cateTree.dragDrop.timer = setTimeout(function () {
					cateTree.dragDrop.cloneHelper();
				}, 300);
			}
		}
		return false;
	},

	up: function(e) {
		e = e || window.event;
		var target = e.target || e.srcElement;

		clearTimeout(cateTree.dragDrop.timer);

		if (cateTree.dragDrop.helper) {
			var dropDst = null;

			if (target.nodeName.toLowerCase() == 'a') {
				dropDst = cateTree._pe(target, 'li');
			}

			if (dropDst) {
				var no = cateTree.dragDrop.source.getAttribute('no');
				var code = cateTree.dragDrop.source.getAttribute('code');
				var parent = 0;
				var next = 0;
				var previous = 0;
				var invalid = 0;

				if (dropDst.className == 'stair') {
					var nodeParent = cateTree._pe(dropDst, 'li');
					if (nodeParent) parent = nodeParent.getAttribute('no');
					var nextNode = dropDst.nextSibling;
					if (nextNode && nextNode.getAttribute('no') != null) next = nextNode.getAttribute('no');
					var previousNode = dropDst.previousSibling;
					if (previousNode && previousNode.getAttribute('no') != null) previous = previousNode.getAttribute('no');

					if (no == next || no == previous || (nodeParent && code == nodeParent.getAttribute('code').toString().substr(0, code.length)))
						invalid = 1;
				}
				else {
					parent = dropDst.getAttribute('no');

					if (code == dropDst.getAttribute('code').toString().substr(0, code.length))
						invalid = 1;
				}

				if (!invalid) {
					cateTree.dragDrop.clear(target);
					cateTree.dragDrop.take(no, parent, next);
				}
			}
		}

		cateTree.dragDrop.clear(target);
		return false;
	},

	take: function (no, parent, next) {
		var allow = true;
		if (this.confirmApplyMove) allow = this.confirmApplyMove();

		if (allow) {
			cateTree.loading.show();

			new Ajax('POST', "category_edit.ajax.asp", { mode: "MOVE", cate: no, parent: parent, next: next }, function (r) {
				var objJson = JSON.parse(r.responseText);
				if (objJson != false) {
					var no = objJson.cate;
					var depth = objJson.depth;
					var parent = objJson.parent;
					var next = objJson.next;
					var msg = objJson.msg;

					if (no > 0) {
						cateTree.dragDrop.adjustNode(no, parent, next, depth);
					}
					else if (msg) {
						alert(msg);
					}
				}
				objJson = null;

				if (cateTree.selected.no == no && cateTree._e('cate_'+no)) {
					cateTree.linkageSelect(no);
				}
				else {
					cateTree.selected.no = 0;
					cateTree.selected.code = null;

					cateTree.linkageSelect(0);
				}
				cateTree.loading.hide();
			});
		}
	},

	adjustNode: function(no, parent, next, depth) {
		var node = cateTree._pe(cateTree._e('cate_'+no), 'li');
		var srcSection = cateTree._pe(node, 'ul');

		var nodeParent = (parent ? cateTree._pe(cateTree._e('cate_'+parent), 'li') : cateTree.wrap);

		srcSection.removeChild(node.nextSibling);

		var trgSections = cateTree._ee(nodeParent, 'ul');
		if (trgSections.length > 0) {
			var nextNode = null;
			if (next) nextNode = cateTree._pe(cateTree._e('cate_'+next), 'li')
			else {
				var childNode = trgSections[0].firstChild;
				while (childNode) {
					if (childNode && childNode.nodeName.toLowerCase() == 'li') nextNode = childNode;
					childNode = childNode.nextSibling;
				}
			}

			trgSections[0].insertBefore(node, nextNode);
			trgSections[0].insertBefore(cateTree.makeStair(), nextNode);

			node.setAttribute('code', cateTree.getCode(nodeParent.getAttribute('code'), no));
			node.setAttribute('depth', depth.toString());

			var folder = node.firstChild;
			if (depth<cateTree.maxDepth) {
				folder.src = (cateTree._ee(node, 'ul').length>0 ? cateTree.template.node_open : cateTree.template.node);
				folder.style.cursor = "pointer";
			}
			else {
				var childSections = cateTree._ee(node, 'ul');
				if (childSections.length > 0) node.removeChild(childSections[0]);

				folder.src = cateTree.template.leaf;
				folder.style.cursor = "default";
			}

			cateTree.hidding(no, parent);

			this.adjustChildNodes(node);

			cateTree.clearAStyle(trgSections[0]);
		}
		else {
			srcSection.removeChild(node);
		}

		cateTree.clearAStyle(srcSection);
	},

	adjustChildNodes: function (nodeParent) {
		var depth = nodeParent.getAttribute('depth').toString().toNumeric()+1;

		var sections = cateTree._ee(nodeParent, 'ul');
		if (sections.length > 0) {
			var node = sections[0].firstChild;
			while (node) {
				var no = node.getAttribute('no');

				if (no != null) {
					node.setAttribute('code', cateTree.getCode(nodeParent.getAttribute('code'), no));
					node.setAttribute('depth', depth.toString());

					var folder = node.firstChild;
					if (depth<cateTree.maxDepth) {
						folder.src = (cateTree._ee(node, 'ul').length>0 ? cateTree.template.node_open : cateTree.template.node);
						folder.style.cursor = "pointer";

						this.adjustChildNodes(node);
					}
					else {
						var childSections = cateTree._ee(node, 'ul');
						if (childSections.length > 0) node.removeChild(childSections[0]);

						folder.src = cateTree.template.leaf;
						folder.style.cursor = "default";
					}
				}

				node = node.nextSibling;
			}
		}
	}
}
