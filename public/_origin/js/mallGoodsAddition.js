// 추가구성상품 Wrapper
var GoodsAdditionArray = function() {
	var additions = [];

	this.addAddition = function(obj) {
		if (! (obj instanceof GoodsAddition)) {
			throw "type exception";
		}
		additions.push(obj);
	}

	this.getStringifyValue = function() {
		var arrParam = new Array();
		for (var i = 0 ; i < additions.length ; i++) {
			var addition = additions[i].getProperties();
			var items = [];
			
			var additionItems = additions[i].getItems();
			for (var j = 0 ; j < additionItems.length ; j++) {
				items.push(additionItems[j].getProperties());
			}
			addition.items = items;

			arrParam.push(addition);
		}

		return JSON.stringify(arrParam);
	}
}

// 추가구성상품
var GoodsAddition = function(obj) {
	var defaults = {
		"idx" : 0
		, "name" : ""
	};
	var params = obj;
	var properties = null;
	var items = [];
	
	this.set = function(key, value) {
		properties[key] = value;
		return this;
	};
	this.getProperties = function() {
		return properties;
	}
	
	this.idx = function(idx) {
		return this.set("idx", idx);
	};
	this.name = function(name) {
		return this.set("name", name);
	};
	
	this.addItem = function(obj) {
		if (! (obj instanceof GoodsAdditionItem)) {
			throw "type exception";
		}
		items.push(obj);
	};
	this.getItems = function() {
		return items;
	}
	
	this.toString = function() {
		mallstore.debug(properties);
		for (var i=0; i<items.length; i++) {
			items[i].toString();
		}
	};
	
	this.toHex = function(str) {
		var hex = '';
		for(var i=0;i<str.length;i++) {
			hex += ''+str.charCodeAt(i).toString(16);
		}
		return hex;
	};
	
	(function () {
		if (! _.isObject(params)) params = {};
		properties = _.defaults(params, defaults);
    }.call(this));
}

// 추가구성상품 아이템
var GoodsAdditionItem = function(obj) {
	var defaults = {
		"idx" : 0
		, "addIdx" : 0
		, "name" : ""
		, "price" : 0
		, "originalPrice" : 0
		, "stock" : 0
		, "quantity" : 0
		, "soldOut" : "F"
		, "isDisplay" : "T"
		, "sort" : 0
	};
	var params = obj;
	var properties = null;
	
	this.set = function(key, value) {
		properties[key] = value;
		return this;
	};
	this.getProperties = function() {
		return properties;
	};
	
	this.idx = function(idx) {
		return this.set("idx", idx);
	};
	this.addIdx = function(addIdx) {
		return this.set("addIdx", addIdx);
	};
	this.name = function(name) {
		return this.set("name", name);
	};
	this.price = function(price) {
		return this.set("price", price);
	};
	this.originalPrice = function(originalPrice) {
		return this.set("originalPrice", originalPrice);
	};
	this.stock = function(stock) {
		return this.set("stock", stock);
	};
	this.quantity = function(quantity) {
		return this.set("quantity", quantity);
	};
	this.soldOut = function(soldOut) {
		return this.set("soldOut", soldOut);
	};
	this.isDisplay = function(isDisplay) {
		return this.set("isDisplay", isDisplay);
	};
	this.sort = function(sort) {
		return this.set("sort", sort);
	};
	
	this.toString = function() {
		mallstore.debug(properties);
	};
	
	(function () {
		if (! _.isObject(params)) params = {};
		properties = _.defaults(params, defaults);
	}.call(this));
}






