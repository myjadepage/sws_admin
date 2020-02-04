// 쿠키 설정하기 ##################################################
function setCookie(name, value, expiredays) {
	var value = name+"="+escape(value)+"; path=/;";
	if (typeof(expiredays) != "undefined") {
		var todayDate = new Date();
		todayDate.setDate(todayDate.getDate()+expiredays);
		value += " expires="+todayDate.toGMTString()+";";
	}
	document.cookie = value;
}

// 쿠키 가져오기 ##################################################
function getCookie(name) {
	var strArg = new String(name+"=");
	var nArgLen, nCookieLen, nEnd;
	var i = 0, j;

	nArgLen = strArg.length;
	nCookieLen = document.cookie.length;

	if (nCookieLen > 0) {
		while (i < nCookieLen) {
			j = i + nArgLen;
			if (document.cookie.substring(i, j) == strArg) {
				nEnd = document.cookie.indexOf (";", j);
				if (nEnd == -1) nEnd = document.cookie.length;
				return unescape(document.cookie.substring(j, nEnd));
			}

			i = document.cookie.indexOf(" ", i) + 1;
			if (i == 0) break;
		}
	}
	return("");
}
