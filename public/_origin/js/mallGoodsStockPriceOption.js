// 추가구성상품
var goodsStockPriceOption = (function(global){
	var option = {
		items : [],
		group : []
	};
	var _ = global._;

	var FSEP = '^';
	
	option.set = function(groups, items) {
		option.group = groups;
		option.items = items;
	};
	
	option.stringify = function() {
		return JSON.stringify(option);
	};
	
	option.import = function(obj, callback) {
		if (! _.isArray(obj)) { throw "is not array" };
		if (obj.length < 1) { throw "옵션 항목은 1개 이상입니다." };
		
		var group_title_prefixs = [];
		option.group = [];
		
		var tmpItems = [];
		for (var i=0; i<obj.length; i++) {
			var groupName = obj[i].groupName.trim();
			var groupValue = obj[i].groupValue.trim();
			var groupWidth = obj[i].groupWidth; 
			
			if (groupName == "") { throw { "reason" : "옵션명을 입력해주세요." }; }
			if (groupValue == "") { throw { "reason" : "옵션값을 입력해주세요." }; }
			
			option.group.push({"name":groupName, "width":groupWidth});
			//console.log("import key=" + groupName + ", value=" + groupValue);
			
			var units = groupValue.split(',');
			if (i == 0) {
				for (var idx=0; idx<units.length; idx++) {
					
					var unit = units[idx].trim();
					if (unit == "") continue;
					
					var tmpItem = {
						"optionTxt" : groupName + FSEP + unit
					}
					
					tmpItems.push(tmpItem);
				}
				
				if (tmpItems.length == 0) {
					throw { "reason" : "첫번째 옵션값을 추출할 수 없습니다. \n정확히 입력해주세요." };
				}
				
			} else if (0 < i) {
				// 두번째 옵션 처리
				var nTmpItems = [];
				
				for (var j=0; j<tmpItems.length; j++) {
					
					var exists = false;
					for (var idx=0; idx<units.length; idx++) {
						var unit = units[idx].trim();
						if (unit == "") continue;
						
						var nTmpItem = {
							"optionTxt" : tmpItems[j]["optionTxt"] + FSEP + groupName + FSEP + unit
						}
						
						nTmpItems.push(nTmpItem);
						exists = true;
					}
					
					if (! exists) {
						throw { "reason" : "두번째 옵션값을 추출할 수 없습니다. \n정확히 입력해주세요." };
					}
				}
				
				tmpItems = nTmpItems;
			}
		}

		// 옵션명이 정확하게 두단어인지 판별
		if (obj.length != 1 && option.group[0].name === option.group[1].name) {
			throw { "reason" : "옵션명이 중복됩니다." };
		}
		
		// options 의 items 와 머지 한다.
		// 기준은 지금꺼 에다가 
		for (var i=0; i<tmpItems.length; i++) {
			var tmpItem = tmpItems[i];
			var optionTxt = tmpItem.optionTxt;
			
			var row = _.findWhere(option.items, {optionTxt:optionTxt});
		
			if (! existy(row)) {
				console.log("! existy");
			}
			
			if (existy(row)) {
				tmpItem.price = row.price;
				tmpItem.quantity = row.quantity;
			} else {
				tmpItem.price = 0;
				tmpItem.quantity = 0;
			}
			
			tmpItem.options = optionTxt.split(FSEP);
		}
		
		option.items = tmpItems;
		callback(option);
	};
	
	return option;
})(this);