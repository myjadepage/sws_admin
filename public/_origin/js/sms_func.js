function getSmsByte(value, maxByte) {
	var i, len;
	var byteSize = 0;
	var endPos = -1;

	for (i=0, len=value.length; i<len; i++) {
		if (escape(value.charAt(i)).length >= 4) {
			byteSize += 2;
		}
		else if (escape(value.charAt(i)) != '%0D') {
			++byteSize;
		}

		if (byteSize > maxByte && endPos < 0) endPos = i;
	}

	return { size: byteSize, pos: endPos };
}

function checkSmsContent(obj) {
	var value = obj.value;
	var byteInfo = getSmsByte(value, 80);

	$(obj).parent().parent().find('input[name="bytes"]').val(byteInfo.size);

	if (byteInfo.size > 80) {
		alert("최대 80byte 까지 입력이 가능합니다");
		obj.value = value.substring(0, byteInfo.pos);
		$(obj).parent().parent().find('input[name="bytes"]').val(getSmsByte(obj.value, 80).size);
	}
}

function switchSmsLayer(e, id) {
	var $obj = $('#'+id);

	if ($obj.css('display') == 'none') {
		var e = window.event || e;
		var $target = $(e.target || e.srcElement).parent();
		var offset = $target.offset();

		$obj.css({
			left: (offset.left + $target.width() + 20),
			top: (offset.top - 100),
			display: 'block'
		});
	}
	else {
		$obj.css({display: 'none'});
	}
}

function insSmsChr(value) {
	var f = document.Frm;
	f.content.value = f.content.value + value;
	checkSmsMessage(f.content);
}
