var sws = {};
sws.common = {
    regex: {
        // 영어 숫자만
        _ENG_NUM: /^[A-Za-z0-9+]*$/,
        _EMAIL: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    },
    _e(id) {
        // 객체 #####
        return document.getElementById(id);
    },
    _es(id) {
        // 객체 스타일 #####
        return document.getElementById(id).style;
    },
    _ee(id, name) {
        // 하위(TagName) 객체 ####
        var parent = (typeof(id) == 'string' ? document.getElementById(id) : id);
        if (parent) return parent.getElementsByTagName(name);
        else return [];
    },
    _pe(obj, name, css) {
        // 부모 객체 ######
        var result = null;
        var parent = obj.parentNode;
        while (parent) {
            if (parent.tagName.toLowerCase() == name && (!css || parent.className == css)) {
                result = parent;
                break;
            }
            parent = parent.parentNode;
        }
        return result;
    },
    addEvent(obj, type, listener) {
        // 이벤트 추가 #####
        if (window.addEventListener) obj.addEventListener(type, listener, false);
        else obj.attachEvent('on' + type, listener);
    },
    blockKey(e) {
        // 키 관련 함수 ##########
        var e = window.event || e;
        if (window.event) {
            e.returnValue = false;
        } else {
            if (e.which != 8) e.preventDefault(); // 8 : Back Space
        }
    },
    blockEnter(e) {
        var e = window.event || e;
        if (window.event) {
            if (e.keyCode == 13) e.returnValue = false;
        } else {
            if (e.which == 13) e.preventDefault();
        }
    },
    blockNotNumberAndSign(e) {
        var e = window.event || e;
        if (window.event) {
            //console.log("e.keyCode=" + e.keyCode);
            if (e.keyCode != 43 && e.keyCode != 45) {
                if (e.keyCode < 48 || e.keyCode > 57) e.returnValue = false;
            }
        } else {
            //console.log("e.which=" + e.which);
            if (e.which != 8 && e.which != 43 && e.which != 45 && (e.which < 48 || e.which > 57)) {
                e.preventDefault(); // 8 : Back Space
            }
        }
    },
    blockNotNumber(e) {
        var e = window.event || e;
        if (window.event) {
            if (e.keyCode < 48 || e.keyCode > 57) {
                e.returnValue = false;
            }
        } else {
            if (e.which != 8 && (e.which < 48 || e.which > 57)) {
                e.preventDefault(); // 8 : Back Space
            }
        }
    },
    telNumber(e) {
        var e = window.event || e;
        //alert(e.keyCode);
        if (window.event) {
            if (e.keyCode < 48 || e.keyCode > 57) //키보드 상단 숫자
            {
                if (e.keyCode < 96 || e.keyCode > 105) //키보드 오른쪽 숫자
                {
                    if (e.keyCode == 189 || e.keyCode == 109 || e.keyCode == 8) // - 기호
                    {

                    } else {
                        e.returnValue = false;
                    }
                }
            }
        } else {
            //alert("11");
            if (e.which != 8 && (e.which < 48 || e.which > 57)) e.preventDefault(); // 8 : Back Space
        }
    },
    onEnter(e, callBack) {
        var e = window.event || e;
        var keyCode = (window.event ? e.keyCode : e.which);
        if (keyCode == 13) {
            if (window.event) {
                e.returnValue = false;
            } else {
                e.preventDefault();
            }
            callBack();
        }
    },
    getBrowser() {
        // 브라우져 정보 #############
        var ua = navigator.userAgent.toLowerCase();
        var match = [] ||
            /(chrome)[ \/]([\w.]+)/.exec(ua) ||
            /(webkit)[ \/]([\w.]+)/.exec(ua) ||
            /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(ua) ||
            /(msie) ([\w.]+)/.exec(ua) ||
            /(trident)(?:.*rv:([\w.]+))?/.exec(ua) ||
            ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua);
        var browser = {};
        if (match[1]) {
            browser[match[1]] = true;
            browser.version = parseFloat(match[2]);
        }
        if (browser.chrome) {
            browser.webkit = true;
        } else if (browser.webkit) {
            browser.safari = true;
        } else if (browser.trident && browser.version) {
            browser.msie = true;
        }
        return browser;
    },
    getOffset(obj) {
        // 객체 Offset 가져오기 #############
        var _x = 0,
            _y = 0;

        while (obj && obj.tagName.toLowerCase() != 'body' && !isNaN(obj.offsetLeft) && !isNaN(obj.offsetTop)) {
            _x += obj.offsetLeft - obj.scrollLeft;
            _y += obj.offsetTop - obj.scrollTop;
            obj = obj.offsetParent;
        }
        return { left: _x, top: _y };
    },
    isEmpty(obj) {
        // 공백 확인 #####
        return (obj === '' ? true : false);
    },
    isArray(obj) {
        // 배열 확인 ##############
        try {
            return /^\s?function Array()/.test(obj.constructor.toString());
        } catch (e) {
            return false;
        }
    },
    isNumeric(value) {
        // 숫자 확인 ############
        var compare = value;
        if (isNaN(compare) || value.replace(/ /g, '') == '') compare = '0';
        return (value == compare ? true : false);
    },
    isDate(value) {
        // 날자 확인 ##########
        var arr = value.split('-');
        if (arr.length != 3) return false;
        var year = arr[0];
        var month = arr[1];
        var day = arr[2];
        var date = new Date(year + '/' + month + '/' + day + ' 8:0:0');
        if (isNaN(date)) return false;
        return ((date.getFullYear().toString() == year) && (date.getMonth() == parseInt(month, 10) - 1) && (date.getDate() == parseInt(day, 10)) ? true : false);
    },
    isExistEng(value) {
        // 영문 포함 확인 ##########
        return /[a-zA-Z]/.test(value);
    },
    isExistNum(value) {
        // 숫자 포함 확인 ######
        return /[0-9]/.test(value);
    },
    isExistKor(value) {
        // 한글 포함 확인 ########
        return / [ㄱ - ㅎ가 - 힣] /.test(value);
    },
    checkCbAll(cbList, checked, callback) {
        // 체크박스 전체선택 ###########
        if (cbList) {
            if (typeof(cbList.length) == 'undefined') {
                if (!cbList.disabled) cbList.checked = checked;
            } else {
                for (var i = 0; i < cbList.length; i++) {
                    if (cbList[i].type.toUpperCase() == 'CHECKBOX') {
                        if (cbList[i].value.stripspace() != '' && !cbList[i].disabled) {
                            cbList[i].checked = checked;
                        }
                    }
                }
            }
        }
    },
    unCheckCbAll(cbListAll, checked) {
        // 전체선택 체크박스 해제 ######
        if (cbListAll) {
            if (!checked) {
                cbListAll.checked = checked;
            }
        }
    },
    getRadio(obj) {
        // Radio(CheckBox) 설정값 가져오기 #####
        var value = '';
        if (obj) {
            if (typeof(obj.length) == 'undefined') {
                if (obj.checked) {
                    value = obj.value;
                }
            } else {
                for (var i = 0; i < obj.length; i++) {
                    if (obj[i].checked) {
                        value = obj[i].value;
                        break;
                    }
                }
            }
        }
        return value;
    },
    setRadio(obj, value) {
        // Radio 설정하기 ########
        if (obj) {
            if (typeof(obj.length) == 'undefined') {
                if (obj.value == value) {
                    obj.checked = true;
                }
            } else {
                for (var i = 0; i < obj.length; i++) {
                    if (obj[i].value == value) {
                        obj[i].checked = true;
                        break;
                    }
                }
            }
        }
    },
    setRadioDisabled(obj, value, disabled) {
        if (obj) {
            if (typeof(obj.length) == 'undefined') {
                if (obj.value == value) {
                    obj.disabled = disabled;
                }
            } else {
                for (var i = 0; i < obj.length; i++) {
                    if (obj[i].value == value) {
                        obj[i].disabled = disabled;
                        break;
                    }
                }
            }
        }
    },
    setRadioDisabled(obj, value, disabled) {
        // Radio Disabled 설정하기 ########
        if (obj) {
            if (typeof(obj.length) == 'undefined') {
                if (obj.value == value) {
                    obj.disabled = disabled;
                }
            } else {
                for (var i = 0; i < obj.length; i++) {
                    if (obj[i].value == value) {
                        obj[i].disabled = disabled;
                        break;
                    }
                }
            }
        }
    },
    setRadioDisabledAll(obj, disabled) {
        // Form Disabled 전체 설정하기 ######
        var i;
        if (obj) {
            if (typeof(obj.length) == 'undefined') {
                obj.disabled = disabled;
            } else {
                for (var i = 0; i < obj.length; i++) {
                    obj[i].disabled = disabled;
                }
            }
        }
    },
    getSelect(obj) {
        // Select 설정값 가져오기 ########
        var value = '';
        var idx = obj.selectedIndex;

        if (idx >= 0) {
            value = obj.options[idx].value;
        }

        return value;
    },
    getSelectIndex(obj, value) {
        var index = -1;
        var nodes = obj.childNodes;
        for (var i = 0; i < nodes.length; i++) {
            if (nodes[i].value.toString() == value.toString()) {
                index = i;
                break;
            }
        }
        return index;
    },
    addSelectGroup(obj, text) {
        // Select Optgroup 추가 #######
        var optgroup = document.createElement('optgroup');
        optgroup.label = text;
        obj.appendChild(optgroup);
        return optgroup;
    },
    addSelectOption(obj, text, value, stock) {
        // Select Option 추가 #####
        if (typeof(value) == 'undefined') value = '';
        var option = document.createElement('option');
        option.innerHTML = text;
        option.value = value;
        obj.appendChild(option);
        return option;
    },
    removeSelectOption(obj, index) {
        // Select Option 삭제 #######
        obj.remove(index);
    },
    removeSelectOptionAll(obj) {
        // Select Option 전체삭제 #########
        var nodes = obj.childNodes;
        for (var i = nodes.length - 1; i >= 0; i--) {
            obj.removeChild(nodes[i]);
        }
    },
    addInput(f, type, name, value) {
        // Input 추가 #####
        var input = document.createElement('input');
        input.type = type;
        input.name = name;
        input.value = value;
        f.appendChild(input);
    },
    removeInput(f, type, name, target) {
        // Input 제거 ##########
        var index = 0;
        if (typeof(target) == 'undefined') target = -1;
        var inputs = f.getElementsByTagName('input');
        if (inputs) {
            for (var i = inputs.length - 1; i >= 0; i--) {
                if (inputs[i].type == type && inputs[i].name == name) ++index;
            }
            for (var i = inputs.length - 1; i >= 0; i--) {
                if (inputs[i].type == type && inputs[i].name == name) {
                    --index;
                    if (target < 0) f.removeChild(inputs[i]);
                    else if (index == target) {
                        f.removeChild(inputs[i]);
                        break;
                    }
                }
            }
        }
    },
    goNextFocus(obj, limit, next) {
        // 입력 문자길이 확인후 다음항목으로 포커스 옮기기 ######
        if (obj.value.stripspace().length >= limit) {
            next.focus();
        }
    },
    checkMixEngNum(value) {
        // 영문/숫자 혼용 확인 ######
        return (isExistEng(value) && isExistNum(value) ? true : false);
    },
    checkSpecialChar(value) {
        // 특수문자 확인 ########
        var schr = '`~!@#$%^&*_+=|\\[]{}:;,<.>/?\'"';
        for (var i = 0; i < schr.length; i++) {
            if (value.indexOf(schr.substr(i, 1)) != -1) return true;
        }
        return false;
    },
    checkTextLen(obj, limit) {
        // 텍스트 길이 확인 (일반) ######
        if (obj.value.length > limit) {
            alert('1~' + limit + '자까지 입력이 가능합니다.');
            obj.value = obj.value.substring(0, limit);
            obj.focus();
            return false;
        }
        return true;
    },
    checkTextLenByte(obj, limit) {
        // 텍스트 길이 확인 (Byte) ######
        var bytes = 0;
        var value = obj.value;

        for (var i = 0; i < value.length; i++) {
            ++bytes;
            if ((value.charCodeAt(i) < 0) || (value.charCodeAt(i) > 127)) ++bytes;

            if (bytes > limit) {
                alert('1~' + (limit / 2) + '자의 한글, 또는 2~' + limit + '자의 영문, 숫자, 문장기호로 입력이 가능합니다.');
                obj.value = value.substring(0, i);
                obj.focus();
                return false;
            }
        }
        return true;
    },
    getTextByte(value) {
        // 텍스트 Byte 길이 가져오기 #######
        var bytes = 0;

        for (var i = 0; i < value.length; i++) {
            if (escape(value.charAt(i)).length >= 4) {
                bytes += 2;
            } else if (escape(value.charAt(i)) != '%0D') {
                ++bytes;
            }
        }
        return bytes;
    },
    splitKor(chr) {
        // 한글 분리 ############
        var kors = new Array();
        kors[0] = 'ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ'; // 19 초성
        kors[1] = 'ㅏㅐㅑㅒㅓㅔㅕㅖㅗㅘㅙㅚㅛㅜㅝㅞㅟㅠㅡㅢㅣ'; //21 중성
        kors[2] = ' ㄱㄲㄳㄴㄵㄶㄷㄹㄺㄻㄼㄽㄾㄿㅀㅁㅂㅄㅅㅆㅇㅈㅊㅋㅌㅍㅎ'; //28 종성    
        var result = new Array();
        for (var i = 0; i < chr.length; i++) {
            var ca = chr.charCodeAt(i);
            var hc1 = ca - 0xAC00;
            var hc2 = hc1 % 588;

            var chc = new Array();
            chc[0] = parseInt(hc1 / 588); // 초
            chc[1] = parseInt(hc2 / 28); // 중
            chc[2] = hc2 % 28; // 종

            for (var s = 0; s < chc.length; s++) {
                result.push(kors[s].charAt(chc[s]).replace(/ /g, ''));
            }
        }
        return result;
    },
    getPostChar(value, p1, p2) { // 은/는, 이/가, 을/를, 과/와
        // 한글 조사 판별 #######
        if (!value) return;
        var a = splitKor(value[value.length - 1]);
        return (a[a.length - 1].trim() ? p1 : p2);
    },
    checkFileName(obj) {
        // 파일명 확인 #######
        var result = false;
        if (obj.value.stripspace() != '') {
            var fidx = obj.value.lastIndexOf('\\') + 1;
            var filename = obj.value.substr(fidx, obj.value.length);
            result = isExistKor(filename);
        }
        if (result) {
            alert('파일명을 반드시 영문 또는 숫자로 해주세요.');
            obj.focus();
            return false;
        }
        return true;
    },
    getFileExt(value) {
        // 파일 확장자 ##########
        if (value != '') {
            var fidx = value.lastIndexOf('\\') + 1;
            var filename = value.substr(fidx, value.length);
            var eidx = filename.lastIndexOf('.') + 1;

            return filename.substr(eidx, filename.length);
        }
    },
    checkFileExt(obj, exts, errMsg) {
        // 파일확장자 확인 ########
        var arrExt = exts.toLowerCase().split(',');
        var result = false;

        if (obj.value.stripspace() != '') {
            var ext = getFileExt(obj.value).toLowerCase();

            for (var i = 0; i < arrExt.length; i++) {
                if (arrExt[i].trim() == ext) result = true;
            }
        }

        if (!result) {
            alert(errMsg);
            obj.focus();
            return false;
        }
        return true;
    },
    setFloor(num, p) {
        // 내림 ##################################################
        // num: 대상 숫자, p: 대상 자리수
        if (!p) p = 0;
        return Math.floor(num * Math.pow(10, p)) / Math.pow(10, p);
    },
    setRound(num, p) {
        // 반올림 ##################################################
        // num: 대상 숫자, p: 대상 자리수
        if (!p) p = 0;
        return Math.round(num * Math.pow(10, p)) / Math.pow(10, p);
    },
    setCeil(num, p) {
        // 올림 ##################################################
        // num: 대상 숫자, p: 대상 자리수
        if (!p) p = 0;
        return Math.ceil(num * Math.pow(10, p)) / Math.pow(10, p);
    },
    stripCharFromNum(value, dec) {
        // 숫자 문자열에서 문자열 제거 ######
        var result = '';
        for (var i = 0; i < value.length; i++) {
            var chr = value.charAt(i);
            switch (chr) {
                case '-':
                    if (i == 0) result += '-';
                    break;
                case '.':
                    if (dec && result.indexOf('.') < 0) result += '.';
                    break;
                default:
                    if ('1234567890'.indexOf(chr) > -1) result += chr;
            }
        }
        return result;
    },
    stripCharFromNumAndSign(value, dec) {
        var result = '';
        for (var i = 0; i < value.length; i++) {
            var chr = value.charAt(i);
            switch (chr) {
                case '-':
                    if (i == 0) result += '-';
                    break;
                case '+':
                    if (i == 0) result += '+';
                    break;
                case '.':
                    if (dec && result.indexOf('.') < 0) result += '.';
                    break;
                default:
                    if ('1234567890'.indexOf(chr) > -1) result += chr;
            }
        }
        return result;
    },
    stripComma(num) {
        // 콤마(,) 제거 #######
        return num.replace(/,/g, '');
    },
    formatComma(num, p) {
        // 숫자 3자리수마다 콤마(,) 찍기 ########
        if (!p) p = 0; //소숫점 이하 자리수
        var re = /(-?\d+)(\d{3}[,.])/;

        var nums = num.toString().toNumeric().toString().split('.');
        nums[0] += '.';

        while (re.test(nums[0])) {
            nums[0] = nums[0].replace(re, '$1,$2');
        }

        if (nums.length > 1) {
            if (nums[1].length > p) {
                nums[1] = nums[1].substr(0, p);
            }
            return nums.join('');
        } else return nums[0].split('.')[0];
    },
    setRoundZero(num, p) {
        // 강제 소수점 이하 0채우기 ##################################################
        // num: 대상 숫자, p: 출력을 원하는 소수점자리수
        var nums = stripComma(num.toString()).split('.');

        if (nums.length <= 1) {
            num = nums[0] + '.';
            for (var i = 0; i < p; i++) {
                num += '0';
            }
        } else num = setRound(num, p);

        return num;
    },
    checkRound(num, p) {
        // 소수점 이하 자리수 확인 ##################################################
        // num: 대상 숫자, p: 희망 소수점 이하자리수
        var nums = num.toString().toNumeric().toString().split('.');
        if (nums.length > 1 && nums[1].length > p) return false;
        else return true;
    },
    removePreZero(num) {
        // 숫자 문자열에서 '0' 시작문자 제거 #####
        if (num == '0') return num;

        for (var i = 0; i < num.length; i++) {
            if (num.substr(i, 1) != '0') break;
        }

        return num.substr(i, num.length - i);
    },
    onlyInt(obj) {
        // 숫자(INT)입력 확인 ##########
        if (obj.disabled) return false;

        var num = obj.value.stripspace();
        if (num == '') return false;

        if (!/^-?[\d]+$/.test(num)) {
            num = stripCharFromNum(num, 0);
            obj.blur();
            obj.focus();
        }
        num = stripCharFromNum(num, 0);

        obj.value = num;
    },
    onlyFloat(obj, p) {
        // 숫자(FLOAT)입력 확인 #########
        if (obj.disabled) return false;
        if (!p) p = 0; //소숫점 이하 자리수

        var num = obj.value.stripspace();
        if (num == '') return false;

        if (!/^-?[\d\.]+$/.test(num)) {
            num = stripCharFromNum(num, 1);
            obj.blur();
            obj.focus();
        }
        var nums = stripCharFromNum(num, 1).split('.');

        obj.value = (nums.length > 1 ? nums[0] + '.' + (p ? nums[1].substr(0, p) : nums[1]) : nums[0]);
    },
    toCurrency(obj) {
        // 통화형태로 변환 #########
        if (obj.disabled) return false;

        var num = obj.value.stripspace();
        if (num == '') return false;

        if (!/^-?[\d]+$/.test(stripComma(num))) {
            num = stripCharFromNum(num, 0);
            obj.blur();
            obj.focus();
        }

        obj.value = formatComma(removePreZero(stripCharFromNum(stripComma(num), 0)));
    },
    toCurrencyAndSign(obj) {
        if (obj.disabled) return false;

        var num = obj.value.stripspace();
        if (num == '') return false;

        if (!/^(-|\+)?[\d]+$/.test(stripComma(num))) {
            num = stripCharFromNumAndSign(num, 0);
            obj.blur();
            obj.focus();
        }

        // + 신호를 가지고 있는지 조사
        var plusSign = "";
        var plusRe = /^[+]/;
        if (plusRe.test(num)) {
            plusSign = "+";
        }

        if (plusSign == "+") {
            obj.value = plusSign + formatComma(removePreZero(stripCharFromNum(stripComma(num.slice(1)), 0)));
        } else {
            obj.value = formatComma(removePreZero(stripCharFromNum(stripComma(num), 0)));
        }
        //obj.value = num;

    },
    toPhoneNumber(obj) {
        // 전화번호,팩스,휴대폰번호 형태로 변환 (하이픈 추가)
        if (obj.disabled) return false;

        var num = obj.value.stripspace();
        if (num == '') return false;

        if (num.length >= 11) {
            obj.value = obj.value.substring(0, 11).replace(/^(01[016789]{1}|02|0[3-9]{1}[0-9]{1})-?([0-9]{3,4})-?([0-9]{4})$/, "$1-$2-$3");
        } else {
            obj.value = obj.value.replace(/^(01[016789]{1}|02|0[3-9]{1}[0-9]{1})-?([0-9]{3,4})-?([0-9]{4})$/, "$1-$2-$3");
        }
    },
    fn_betweenDate(startDate, endDate, interval) {

        var result = -999;

        if (!isDate(startDate) || !isDate(endDate)) {
            return result;
        }

        var sdateArray = startDate.split("-");
        var edateArray = endDate.split("-");
        var stDate = new Date(sdateArray[0], Number(sdateArray[1]) - 1, sdateArray[2]);
        var endDate = new Date(edateArray[0], Number(edateArray[1]) - 1, edateArray[2]);

        // 날짜 차이 알아 내기 
        var diff = endDate - stDate;
        var currDay = 24 * 60 * 60 * 1000; // 시 * 분 * 초 * 밀리세컨
        var currMonth = currDay * 30; // 월 만듬
        var currYear = currMonth * 12; // 년 만듬       

        switch (interval) {
            case 'd':
                result = parseInt(diff / currDay);
                break;
            case 'm':
                result = parseInt(diff / currMonth);
                break;
            case 'y':
                result = parseInt(diff / currYear);
                break;
            default:
                result = -999;
        }

        return result;
    },
    leadingZeros(n, digits) {
        var zero = '';
        n = n.toString();

        if (n.length < digits) {
            for (i = 0; i < digits - n.length; i++)
                zero += '0';
        }
        return zero + n;
    },
    existy(x) {
        return x != null;
    },
    truthy(x) {
        return (x !== false) && existy(x);
    },
    chkSearchWord(sword, kornum, engnum, type) {
        //검색어 글자수 체크
        //sword 검색어
        //kornum 한글 최소/최대
        //engnum 영문 최소/최대
        //type min/max
        var msg = "",
            typeStr = (type === "min") ? "이상" : "이하";

        if (sword === null || sword === "" || sword === undefined) {
            msg = "검색어를 입력해 주세요.";
            return msg;
        }

        var arrsword = sword.split(' ');
        if (arrsword.length > 0) {

            var chkpass = false,
                chkfail = false,
                lang = "";

            for (var i = 0; i < arrsword.length; i++) {
                var word = arrsword[i];

                if (isExistEng(word)) {
                    lang = "영문";
                    //영문 체크
                    if (type === "min") {
                        if (word.length < engnum) {
                            chkfail = true;
                        } else {
                            chkpass = true;
                        }
                    } else if (type === "max") {
                        if (word.length > engnum) {
                            chkfail = true;
                        } else {
                            chkpass = true;
                        }
                    }
                } else if (isExistKor(word)) {
                    lang = "한글";
                    //한글 체크
                    if (type === "min") {
                        if (word.length < kornum) {
                            chkfail = true;
                        } else {
                            chkpass = true;
                        }
                    } else if (type === "max") {
                        if (word.length > kornum) {
                            chkfail = true;
                        } else {
                            chkpass = true;
                        }
                    }
                } else {}
            }

            if (!chkpass) {
                msg = lang + engnum + "자 " + typeStr + " 검색해 주세요.";
            }
        }

        return msg;
    },
    getParam(paramName) {
        //url 파라미터 값 가져오기
        var returnVal;
        var url = location.href;

        //get 파라미터 값을 가져올 수 있는 ? 를 기점으로 slice 한 후 split 으로 나눔
        var parameters = (url.slice(url.indexOf('?') + 1, url.length)).split('&');

        //나누어진 값의 비교를 통해 paramName 으로 요청된 데이터의 값만 return
        for (var i = 0; i < parameters.length; i++) {
            var varName = parameters[i].split('=')[0];
            if (varName.toUpperCase() == paramName.toUpperCase()) {
                returnVal = parameters[i].split('=')[1];
                return decodeURIComponent(returnVal);
            }
        }
    },
    onClickLogo() {
        location.href = '/';
    },
    gotoUrl(url) {
        // 페이지 이동 ######
        if (url.stripspace() != '') {
            location.href = url;
        }
    },
    initSummernote($summernote, imagePassCallback, imageFailCallback, getMallNoFunction, options) {
        let width = 768;
        let height = 300;
        let lang = 'ko-KR';
        let placeholder = '';
        let noHideDimmed = false;
        let imageFileSize = 1024;
        let useVideo = false;
        const insertList = ['link', 'picture'];
        let toolbar = [];

        if (options) {
            width = options.width || width;
            height = options.height || height;
            lang = options.lang || lang;
            placeholder = options.placeholder || placeholder;
            toolbar = options.toolbar || toolbar;
            noHideDimmed = options.noHideDimmed || noHideDimmed;
            imageFileSize = options.imageFileSize || imageFileSize;
            useVideo = options.useVideo || useVideo;
        }

        if (useVideo) {
            insertList.push('video');
        }

        toolbar = [
            ['fontsize', ['fontsize']],
            ['style', ['bold', 'italic', 'underline', 'strikethrough', 'clear']],
            ['color', ['color']],
            ['para', ['paragraph']],
            ['height', ['height']],
            ['picture', insertList],
            // ['insert', insertList],
            ['misc', ['codeview']]
        ];

        $summernote.summernote({
            width,
            height,
            minHeight: 120,
            lang,
            placeholder,
            toolbar,
            callbacks: {}
        });
    }

}



sws.popup = function(sURL, sWindowName, w, h, sScroll) {
    const x = (screen.width - w) / 2;
    const y = (screen.height - h) / 2;

    if (sScroll == null) {
        sScroll = 'no';
    }
    if (screen.width == 800 && screen.height == 600) {
        sScroll = 'yes';
    }

    let sOption = '';
    sOption = `${sOption}toolbar=no, channelmode=no, location=no, directories=no, menubar=no`;
    sOption = `${sOption}, top=${y}, left=${x}, scrollbars=${sScroll}, width=${w}, height=${h}, resizable=no`;
    const win = window.open(sURL, sWindowName, sOption);

    try {
        win.moveTo(x, y);
        win.focus();
    } catch (e) {}

    return win;
};

sws.scrollTop = function() {
    $('div').animate({
        scrollTop: 0
    });
};
sws.MM_openModal = function(theURL, obj, features) {
    window.showModalDialog(theURL, obj, features);
};

// 즐겨찾기 추가 ##################################################
// 예) <a href="javascript:;" onClick="addFavorites('홈페이지', 'http://www.homepage.com'); return false;">즐겨찾기 등록</a>
sws.addFavorites = function(title, url) {
    if (window.sidebar && window.sidebar.addPanel) { // Firefox
        window.sidebar.addPanel(title, url, '');
    } else if (window.opera && window.print) { // Opera
        var obj = document.createElement('a');
        obj.setAttribute('href', url);
        obj.setAttribute('title', title);
        obj.setAttribute('rel', 'sidebar');
        obj.click();
    } else if (document.all) { // Internet Explorer
        window.external.AddFavorite(url, title);
    } else {
        alert("이용하시는 웹 브라우저에서는 지원되지 않는 기능입니다.\n\nCtrl+D 키를 누르시면 즐겨찾기에 추가하실 수 있습니다.");
        return true;
    }
}


/**
 * parameter들을 포함하여 opener에 있는 callback function을 호출함
 */
sws.callbackOpener = function(callbackFunc) {
    if (callbackFunc) {
        const argus = [].slice.call(arguments).slice(1, arguments.length);
        const tokens = callbackFunc.split('\.');
        let obj = window.opener;
        for (let i = 0; i < tokens.length - 1; i++) {
            if (obj[tokens[i]]) {
                obj = obj[tokens[i]];
            } else {
                return;
            }
        }
        const that = obj;
        obj[tokens[tokens.length - 1]].apply(that, argus);
    }
};

// Trim 함수 ##################################################
// Ex) str = "    테 스트   ".trim(); => str = "테 스트";
String.prototype.trim = function() {
    return this.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g, '');
}

// 문자열 공백제거 함수 ##################################################
// Ex) str = "    테 스   트   ".stripspace(); => str = "테스트";
String.prototype.stripspace = function() {
    return this.replace(/ /g, '');
}

// 전체 문자열 바꾸기 함수 ##################################################
// Ex) str = "a테스트bcd테스트efg".replaceAll("테스트", ""); => str = "abcdefg";
String.prototype.replaceAll = function(a, b) {
    var s = this;
    if (navigator.userAgent.toLowerCase().indexOf('msie') != -1)
        return s.replace(new RegExp(a, 'gi'), b);
    else
        return s.split(a).join(b);
}

// 숫자변환 함수 ##################################################
// Ex) str = "a테스트bcd테스트efg".replaceAll("테스트", ""); => str = "abcdefg";
String.prototype.toNumeric = function() {
    var s = this;
    s = (typeof s == 'undefined' ? '0' : s.toString().replace(/,/g, ''));
    if (isNaN(s) || s.replace(/ /g, '') == '') return 0;
    else return parseFloat(s);
}