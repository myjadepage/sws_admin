var mallstore = (function(global){
	var ms = {"order":null, "cache":{}, "tcache":{}};
	
	var loglevel = {"debug":"black", "info":"blue", "error":"red"};
	var _ = global._;
	var logger = global.console || {log:function(){}};
	
	ms.log = function(type, msg) {
		if (_.has(loglevel, type) === -1) return;
		logger.log("%c[mallstorelog][" + type + "]", 'color:'+loglevel[type]+'; font-weight:bold', msg);
	};
	
	ms.debug = function(msg) {
		ms.log("debug", msg);
	};
	ms.info = function(msg) {
		ms.log("info", msg);
	};
	ms.error = function(msg) {
		ms.log("error", msg);
	};
	
	ms.getCache = function(key) {
		if (_.has(ms.cache, key)) return  ms.cache[key];
		return null;
	}
	ms.setCache = function(key, val) {
		ms.cache[key] = val;
	}
	
	ms.setTimedCache = function(key, val, expire_second) {
		var expire = _.now() + (expire_second * 1000);
		ms.tcache[key] = [expire, val];
	}
	
	ms.getTimedCache = function(key) {
		if (! _.has(ms.tcache, key)) return null;
		
		var expire = ms.tcache[key][0];
		if (expire < _.now()) {
			delete(ms.tcache[key]);
			return null;
		}
		
		return  ms.tcache[key][1];
	}
	
	return ms;
})(this);