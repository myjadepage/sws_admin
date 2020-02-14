 //<![CDATA[ 테이블 Row 추가/삭제
 var cellHtmls = new Array();

 // 카테고리 테이블 추가
 cellHtmls['tb_category'] = new Array();
 cellHtmls['tb_category'][0] = {
     html: '<input type="hidden" name="cate" value="#CODE#" /><input type="radio" name="cateDefault" onClick="cateDefaultCms(this)" />'
 };
 cellHtmls['tb_category'][1] = {
     html: '#CATEGORY#',
     css: 'txt'
 };
 cellHtmls['tb_category'][2] = {
     html: '<button type="button" class="btn btn-sm btn-danger" onClick="delCate(this)">삭제</button>'
 };

 // 이미지추가
 cellHtmls['tb_img_etc'] = new Array();
 cellHtmls['tb_img_etc'][0] = {
     html: '<span class="numbering"></span>.'
 };
 cellHtmls['tb_img_etc'][1] = {
     html: '<input type="checkbox" name="cbImgEtc"><input type="hidden" name="imgIdx" />'
 };
 cellHtmls['tb_img_etc'][2] = {
     html: '<input type="file" name="imgEtc"  onKeyPress="blockKey(event)" onKeyDown="blockKey(event)" />'
 };
 cellHtmls['tb_img_etc'][3] = {
     html: ''
 };

 // 상품정보고시
 cellHtmls['tb_notify'] = new Array();
 cellHtmls['tb_notify'][0] = {
     html: '<span class="numbering"></span>'
 };
 cellHtmls['tb_notify'][1] = {
     html: '<input type="checkbox" name="cbNotify" />'
 };
 cellHtmls['tb_notify'][2] = {
     html: '<input type="text" name="item" class="text_input" style="width:90%;" maxlength="100" />'
 };
 cellHtmls['tb_notify'][3] = {
     html: '<textarea name="content" rows="2" class="text_input" onKeyUp="checkTextLen(this, 2000)"></textarea>',
     css: 'last'
 };

 function addRow(tbId, replacements, htmlKey) {
     var $table = $('#' + tbId);
     console.log("$table", $table);
     var headSize = ($table.attr('head') ? $table.attr('head').toString().toNumeric() : 0);
     var maxSize = ($table.attr('max') ? $table.attr('max').toString().toNumeric() : 0);
     var rowSize = $('tr', $table).length;

     if (maxSize > 0 && (rowSize - headSize) >= maxSize) {
         alert("더 이상 추가할 수 없습니다.\n\n최대 " + maxSize + "개까지 추가할 수 있습니다.");
         return false;
     }

     var htmls = cellHtmls[(htmlKey ? htmlKey : tbId)];

     var $tr = $('<tr />');
     for (i = 0; i < htmls.length; i++) {
         var html = htmls[i].html;
         if (replacements) {
             for (var key in replacements) {
                 html = html.replaceAll(key, replacements[key]);
             }
         }
         $('<td' + (htmls[i].css ? ' class="' + htmls[i].css + '"' : '') + ' />').html(html).appendTo($tr);
     }
     $table.append($tr);
     numbering(tbId);
     return true;
 }

 function delRow(obj, tbId) {
     var $table = null;
     if (typeof(tbId) == 'undefined') {
         $table = $(obj).parents('table').first();
         tbId = $table.attr('id');
     } else {
         $table = $('#' + tbId);
     }

     var headSize = ($table.attr('head') ? $table.attr('head').toString().toNumeric() : 0);
     var noBlank = ($table.attr('noBlank') ? $table.attr('noBlank').toString().toNumeric() : 0);

     $(obj).parents('tr').first().remove();
     numbering(tbId);
     if (noBlank && ($('tr', $table).length - headSize) < 1) addRow(tbId);
     return true;
 }

 function delRowList(tbId) {
     var f = document.Frm;
     var $table = $('#' + tbId);
     var $cb = null;
     switch (tbId) {
         case 'tb_img_etc':
             $cb = $(f.cbImgEtc);
             break;
         case 'tb_notify':
             $cb = $(f.cbNotify);
             break;
     }

     var headSize = ($table.attr('head') ? $table.attr('head').toString().toNumeric() : 0);
     var noBlank = ($table.attr('noBlank') ? $table.attr('noBlank').toString().toNumeric() : 0);
     var checker = 0;
     $cb.each(function() {
         if (this.checked) ++checker;
     });
     if (checker <= 0) {
         alert("삭제할 항목을 선택해주세요.");
         return;
     }
     $cb.each(function() {
         if (this.checked) {
             $(this).parents('tr').first().remove();
         }
     });
     numbering(tbId);
     if (noBlank && ($('tr', $table).length - headSize) < 1) addRow(tbId);
     return true;
 }

 function numbering(tbId) {
     $('span.numbering', $('#' + tbId)).each(function(index) {
         $(this).text(index + 1);
     });
 }
 //]]>



 //  <!------------------------- 2.상품분류 -->
 //<![CDATA[ 카테고리 설정
 category.getCate1();

 // 카테고리 처리
 function addCate() {
     var f = document.Frm;
     var cate = categorySysId = parentSysId = categoryLevel = 0;
     var category = '';

     for (var i = 1; i <= 5; i++) {
         var objOption = f['category' + i].options[f['category' + i].selectedIndex];
         console.log("i", i);
         console.log("objOption", objOption);
         console.log("parentSysId", parentSysId);

         cate = objOption.value.toNumeric();
         categorySysId = objOption.value.toNumeric();
         parentSysId = objOption.getAttribute('data-parentSysId');
         categoryLevel = objOption.getAttribute('data-categoryLevel');
         category += (category ? ' > ' : '') + objOption.text;
     }
     if (f.cate == 0) {
         alert("카테고리를 선택해 주세요.");
         f.category.focus();
         return false;
     }
     if (4 > parentSysId) {
         console.log("진입");
         alert("나머지 카테고리를 선택해 주세요.");
         return false;
     }

     if (f.cate) {
         if (typeof(f.cate.length) == 'undefined') {
             if (f.cate.value == cate.toString()) {
                 alert("이미 추가된 상품분류 입니다.");
                 return false;
             }
         } else {
             for (var i = 0; i < f.cate.length; i++) {
                 if (f.cate[i].value == cate.toString()) {
                     alert("이미 추가된 상품분류 입니다.");
                     return false;
                 }
             }
         }
     }

     if (addRow('tb_category', {
             '#CODE#': categorySysId,
             '#CATEGORY#': category
         })) {
         setCateDefault();
     }
 }

 function delCate(obj) {
     if (delRow(obj) == true) {
         setCateDefault();
     }
 }

 function setCateDefault() {
     var f = document.Frm;
     if (f.cateDefault) {
         if (typeof(f.cateDefault.length) == 'undefined') {
             f.cateDefault.checked = true;
         } else if (getRadio(f.cateDefault) == '') {
             f.cateDefault[0].checked = true;
         }
     }
 }

 //]]>



 //  <!------------------------- 3.브랜드 -->

 getBrand(); //브랜드 불러오기api



 //  <!------------------------- 4.상품아이콘 -->
 setIcons();

 // 상품아이콘 등록/수정 오픈
 function openIcon() {
     openPopup("/goods/goods_icon_pop", "Icon", 498, 500, "scrollbars=1");
 }


 //  <!------------------------- 5.상품이미지 -->
 //이미지 자동등록 radio button
 function changeImgRegAuto(obj) {
     if (obj.checked) {
         $('.imgManuals').hide();
     } else {
         $('.imgManuals').show();
     }
 }


 //큰이미지 등록
 $('#bigImage').on('change', function() {
     var fileInput = document.getElementById("bigImage");
     var file = fileInput.files[0];
     const data = new FormData();
     data.append('file', file);
     console.log("이미지", file)
     $.ajax({
             url: "/file",
             type: "post",
             enctype: 'multipart/form-data',
             processData: false,
             contentType: false,
             cache: false,
             data: data
         })
         .done(function(data) {
             console.log("성공", data);
         })
         .fail(function(request, status, error) {
             msg = request.status + "<br>" + request.responseText + "<br>" + error;
             console.log(msg);
             alert("이미지 저장 실패");
         })
 });
 //다른이미지 등록


 //  <!------------------------- 6.재고설정 -->

 // 재고설정 확인
 function checkStock() {
     var f = document.Frm;
     var optionKind = sws.common.getRadio(f.optionKind);

     if (sws.common.getRadio(f.stockTypeCode) == '1') {
         f.stockQty.readOnly = false;
         f.stockQty.disabled = true;
         f.stockQty.style.backgroundColor = "#e0e0e0";
     } else if ($.inArray(optionKind, ['201', '202']) > -1) {
         f.stockQty.readOnly = true;
         f.stockQty.disabled = false;
         f.stockQty.style.backgroundColor = "#e0e0e0";
         if (optionKind == '201') {
             f.stockQty.value = f['optTotalQuantity201'].value;
         } else {
             f.stockQty.value = f['optTotalQuantity202'].value;
         }
     } else {
         f.stockQty.readOnly = false;
         f.stockQty.disabled = false;
         f.stockQty.style.backgroundColor = "";
     }
 }


 //  <!------------------------- 7.진열설정 -->


 //  <!------------------------- 8.시중가격 -->

 //<![CDATA[
 // 가격 계산시 절사단위
 var priceRoundUnit = '-1'.toNumeric();

 //  <!------------------------- 10.수수료설정 -->

 // 수수료 설정 확인
 function checkFeeType() {
     var f = document.Frm;
     if (sws.common.getRadio(f.feeTypeCode) != "2") { // 카테고리 또는 입점업체 수수료로 설정한 경우
         checkPriceSplit("1");

         if (typeof(f.cate) == 'undefined') {
             f.feeRate.value = 0;
         } else if (typeof(f.cate.length) == 'undefined') {
             f.feeRate.value = f.cate.getAttribute('data-feeRate');
         } else {
             f.feeRate.value = f.cate[0].getAttribute('data-feeRate');
         }
         calcPrice();
     }
 }


 //  <!------------------------- 11.가격 -->

 // 가격입력 : 기준 설정
 function checkPriceSplit(code) {
     var f = document.Frm;

     console.log("code", code);

     if (code == "1") { // 공급가 기준
         f.supplyPrice.style.backgroundColor = '';
         f.feeRate.style.backgroundColor = "#e0e0e0";
         f.supplyPrice.readOnly = false;
         f.feeRate.readOnly = true;
         sws.common.setRadio(f.priceTypeCode, "1");
     } else { // 수수료 기준
         if (sws.common.getRadio(f.feeTypeCode) != "2") {
             sws.common.setRadio(f.priceTypeCode, "1");
             alert("수수료 설정이 상품별 수수료 설정일 경우에만 선택이 가능합니다.");
             return false;
         }

         f.supplyPrice.style.backgroundColor = "#e0e0e0";
         f.feeRate.style.backgroundColor = '';
         f.supplyPrice.readOnly = true;
         f.feeRate.readOnly = false;
     }
 }

 // 가격입력 : 계산
 function calcPrice(caller) {
     var f = document.Frm;

     if (typeof(caller) == 'undefined') caller = f.price;

     var price = f.price.value.toNumeric();
     var feeRate = f.feeRate.value.toNumeric();
     var supplyPrice = f.supplyPrice.value.toNumeric();

     if (feeRate > 100) {
         alert("수수료는 100% 이하로 설정하셔야 됩니다.");
         feeRate = 100;
         f.feeRate.value = feeRate;
     }

     if (sws.common.getRadio(f.priceTypeCode) == '1') { // 공급가 기준 경우
         if (sws.common.getRadio(f.feeTypeCode) != 1) { // 카테고리 또는 입점업체 수수료 설정
             // 판매가 입력 경우
             if (caller.name == 'price') {
                 supplyPrice = sws.common.setRound(price - (price * feeRate / 100), priceRoundUnit);
                 f.supplyPrice.value = formatComma(supplyPrice);
             }
             // 공급가 입력 경우
             else if (feeRate == 100) {
                 f.price.value = 0;
                 f.supplyPrice.value = 0;
             } else {
                 price = sws.common.setRound(supplyPrice / (100 - feeRate) * 100, priceRoundUnit);
                 f.price.value = formatComma(price);
             }
         } else { // 상품별 수수료 설정
             feeRate = (price == 0 ? 0 : 100 - (supplyPrice / price * 100));
             f.feeRate.value = sws.common.setRound(feeRate, 2);
         }
     } else { // 수수료 기준 경우
         supplyPrice = sws.common.setRound(price * (100 - feeRate) / 100, priceRoundUnit);
         f.supplyPrice.value = formatComma(supplyPrice);
     }
 }

 // 절사단위 확인
 function checkPriceRound(obj) {
     var f = document.Frm;
     if (typeof(f.cate) == 'undefined') return false;

     var value = obj.value.toNumeric();
     if (value != sws.common.setRound(value, priceRoundUnit)) {
         obj.value = formatComma(setRound(value, priceRoundUnit));
         calcPrice(obj);
     }
 }
 //]]>



 //  <!------------------------- 12.적립금 -->

 // 정책 설정
 function setPolicy() {
     var f = document.Frm;

     if (f.dealerNo.value.toNumeric() > 0) {
         if ($(f.cmoneyPolicy).is(':radio')) {
             sws.common.setRadioDisabled(f.cmoneyPolicy, '128', false);
         }

         sws.common.setRadioDisabled(f.deliveryMethod, '920', false);
     } else {
         if ($(f.cmoneyPolicy).is(':radio')) {
             sws.common.setRadioDisabled(f.cmoneyPolicy, '128', true);

             if (sws.common.getRadio(f.cmoneyPolicy) == '128') {
                 sws.common.setRadio(f.cmoneyPolicy, '256');
             }
         }

         sws.common.setRadioDisabled(f.deliveryMethod, '920', true);

         if (sws.common.getRadio(f.deliveryMethod) == '920') {
             sws.common.setRadio(f.deliveryMethod, '990');
         }
     }
 }


 // 적립금정책 확인
 function checkCmoneyPolicy() {
     var f = document.Frm;

     if ($('input[name="cmoneyPolicy"]').length > 0) {
         $('input[name="cmoneyPolicy"]').first().parent().parent().find('input:text, select').prop('disabled', true);

         switch (sws.common.getRadio(f.cmoneyPolicy)) {
             case '6':
                 f.cmoneyPolicyPrice.disabled = false;
                 f.cmoneyPercent.disabled = false;
                 break;
             case '8':
                 f.cmoneyMoney.disabled = false;
                 break;
         }
     }
 }


 //  <!------------------------- 13.원산지 -->
 //  <!------------------------- 14.상품정보고시 -->
 getProductNotices();
 //  $('#addProduct').on('click', function() {
 //      $('#tb_notify tbody').append(
 //          '<tr><td><span class="numbering"></span></td>' +
 //          '<td><input type="checkbox" name="cbNotify "></td>' +
 //          '<td><input type="text" name="item" class="text_input" style="width:90%;" maxlength="100"></td>' +
 //          '<td class="last"><textarea name="content" rows="2" class="text_input" onKeyUp="checkTextLen(this, 2000)"></textarea></td></tr>'
 //      )
 //  })




 //  <!-------------------------- 16.배송비 -->

 // 배송료설정 확인
 function checkDeliveryMethod() {
     var f = document.Frm;
     f.debitAmountoptional.disabled = true;
     f.debitAmountoptional.style.backgroundColor = "#e0e0e0";
     f.debitfreeMinAmountoptional.disabled = true;
     f.debitfreeMinAmountoptional.style.backgroundColor = "#e0e0e0";
     f.prepaymentAmountoptional.disabled = true;
     f.prepaymentAmountoptional.style.backgroundColor = "#e0e0e0";
     f.prepayfreeMinAmountoptional.disabled = true;
     f.prepayfreeMinAmountoptional.style.backgroundColor = "#e0e0e0";

     switch (sws.common.getRadio(f.deliveryPriceTypeCode)) {
         case "3":
             f.prepaymentAmountoptional.disabled = false;
             f.prepaymentAmountoptional.style.backgroundColor = "";
             f.prepayfreeMinAmountoptional.disabled = false;
             f.prepayfreeMinAmountoptional.style.backgroundColor = "";
             break;
         case "2":
             f.debitAmountoptional.disabled = false;
             f.debitAmountoptional.style.backgroundColor = "";
             f.debitfreeMinAmountoptional.disabled = false;
             f.debitfreeMinAmountoptional.style.backgroundColor = "";
             break;
     }
 }



 //  <!------------------------- 17.상품옵션 -->
 //상품옵션
 function checkOptionKind() {
     var f = document.Frm;
     var kind = $('input[name="optionKind"]:checked', f).val();

     $('input[name="optionKind"]', f).each(function() {
         if (!sws.common.isEmpty(this)) {
             var $container = $('.option_' + this.value);
             if (this.value == kind) $container.show().find(':input').prop('disabled', false);
             else $container.hide().find(':input').prop('disabled', true);
         }
     });

     switch (kind) {
         case '201':
         case '202':
             sws.common.setRadio(f.stock, '1');
             sws.common.setRadioDisabled(f.stock, '0', true);
             break;
         default:
             setRadioDisabled(f.stock, '0', false);
             break;
     }

     checkStock();
 }




 //<![CDATA[
 var maxRowOpt = '10'.toNumeric();

 var cellHtmlOpts = new Array();

 cellHtmlOpts['100'] = new Array();
 cellHtmlOpts['100'][0] = {
     html: '<input type="hidden" name="optNo#OPTION_KIND#" /><input type="checkbox" name="cbOpt#OPTION_KIND#" />'
 };
 cellHtmlOpts['100'][1] = {
     html: '<input type="text" name="optName#OPTION_KIND#" class="text_input" style="width: 90%;" maxlength="50" />'
 };
 cellHtmlOpts['100'][2] = {
     html: '<textarea rows="3" name="optItem#OPTION_KIND#" class="text_input"></textarea>',
     css: 'txt'
 };
 cellHtmlOpts['100'][3] = {
     html: '<span>0</span>자',
     css: 'size'
 };

 cellHtmlOpts['201'] = new Array();
 cellHtmlOpts['201'][0] = {
     html: '<input type="text" name="optItem#OPTION_KIND#" class="text_input" maxlength="100" />'
 };
 cellHtmlOpts['201'][1] = {
     html: '<input type="text" name="optPrice#OPTION_KIND#" class="text_input" onKeyUp="toCurrency(this)" />'
 };
 cellHtmlOpts['201'][2] = {
     html: '<input type="text" name="optQuantity#OPTION_KIND#" maxlength="7" class="text_input" onKeyUp="onlyInt(this);calcTotalQuantity();" />'
 };
 cellHtmlOpts['201'][3] = {
     html: '<input type="hidden" name="optSoldout#OPTION_KIND#" /><input type="checkbox" name="cbOptSoldout" onClick="checkOptionSoldout(this)" />'
 };
 cellHtmlOpts['201'][4] = {
     html: '<button type="button" onClick="delRowOpt(\'#OPTION_KIND#\', this);"><img src="../imgs/button/btn_minus.gif" alt="옵션항목 삭제" /></button>' +
         ' <button type="button" onClick="addRowOpt(\'#OPTION_KIND#\', this);"><img src="../imgs/button/btn_plus.gif" alt="옵션항목 추가" /></button>',
     css: 'btns'
 };

 function addRowOpt(kind, obj) {
     var $table = $('#tb_option_' + kind),
         $tbody = $table.children('tbody');
     var maxRow = ($table.attr('max') ? $table.attr('max').toNumeric() : maxRowOpt);

     if (maxRow <= $tbody.children().length) {
         alert("더 이상 추가할 수 없습니다.\n\n최대 " + maxRow + "개까지 추가할 수 있습니다.");
         return false;
     }

     var cellHtmls = cellHtmlOpts[kind];

     var $row = $('<tr />');
     for (i = 0; i < cellHtmls.length; i++) {
         var $cell = $('<td />').html(cellHtmls[i].html.replaceAll('#OPTION_KIND#', kind)).appendTo($row);
         if (cellHtmls[i].css) $cell.addClass(cellHtmls[i].css);
     }

     switch (kind) {
         case '100':
             $tbody.append($row);
             break;
         case '201':
             if (obj) {
                 $(obj).closest('tr').after($row);
             } else if ($tbody.children().length > 0) {
                 $tbody.children(':first-child').before($row);
             } else {
                 $tbody.append($row);
             }
             break;
     }
 }

 function delRowOpt(kind, obj) {
     var $tbody = $('#tb_option_' + kind).children('tbody');

     if (obj) {
         $(obj).closest('tr').remove();
     } else {
         var $cb = $('input[name="cbOpt' + kind + '"]:checked');

         if ($cb.length <= 0) {
             alert("삭제할 옵션을 선택해주세요.");
             return false;
         }

         $cb.each(function() {
             $(this).parent().parent().remove();
         });

         $('input[name="cbOptAll' + kind + '"]').prop('checked', false);
     }

     if ($tbody.children().length == 0) {
         addRowOpt(kind);
     }

     switch (kind) {
         case '201':
             calcTotalQuantity();
             break;
     }
     return false;
 }
 //]]>

 //<![CDATA[
 function checkOptionKind() {
     var f = document.Frm;
     var kind = $('input[name="optionKind"]:checked', f).val();

     $('input[name="optionKind"]', f).each(function() {
         if (!sws.common.isEmpty(this)) {
             var $container = $('.option_' + this.value);
             if (this.value == kind) $container.show().find(':input').prop('disabled', false);
             else $container.hide().find(':input').prop('disabled', true);
         }
     });

     switch (kind) {
         case '201':
         case '202':
             sws.common.setRadio(f.stock, '1');
             sws.common.setRadioDisabled(f.stock, '0', true);
             break;
         default:
             sws.common.setRadioDisabled(f.stock, '0', false);
             break;
     }

     checkStock();
 }

 function checkOptionItem(obj, col, row) {
     var f = document.Frm;

     if (event.keyCode == 9) return;

     if (sws.common.isEmpty(f.optItem1[row])) {
         alert("먼저 옵션항목을 입력해 주세요.");
         obj.value = "";
         f.optItem1[row].focus();
         return false;
     }

     if (col > 0) {
         if (sws.common.isEmpty(f.optItem2[col])) {
             alert("먼저 옵션항목을 입력해 주세요.");
             obj.value = "";
             f.optItem2[col].focus();
             return false;
         }
     }

     return true;
 }

 function checkOptionSoldout(obj) {
     $(obj).parent().find('input[name^="optSoldout"]').val(obj.checked ? 1 : 0);
 }

 function calcTotalQuantity() {
     var f = document.Frm;
     var totalQuantity = 0;
     var kind = sws.common.getRadio(f.optionKind);

     switch (kind) {
         case '201':
             $('input[name="optQuantity201"]').each(function() {
                 totalQuantity += (sws.common.isEmpty(this) ? 0 : this.value.toNumeric());
             });
             break;
         case '202':
             for (var row = 0; row < 10; row++) {
                 for (var col = 0; col < 10; col++) {
                     totalQuantity += $('input[name="optQuantity_' + col + '_' + row + '"]').val().toNumeric();
                 }
             }
             break;
     }

     f['optTotalQuantity' + kind].value = (totalQuantity > 0 ? formatComma(totalQuantity) : '');
     f.quantity.value = f['optTotalQuantity' + kind].value;
 }

 function validOption() {
     var f = document.Frm;
     var optionDelimiter = 'ː';

     switch (sws.common.getRadio(f.optionKind)) {
         case '100':
             var invalid = false;
             $('textarea[name="optItem100"]', f).each(function() {
                 var objOptName = $(this).parent().prev().children('input')[0];

                 if (sws.common.isEmpty(objOptName)) {
                     alert("옵션명을 입력해 주세요.");
                     objOptName.focus();
                     invalid = true;
                     return false;
                 }

                 if (sws.common.isEmpty(this)) {
                     alert("옵션항목을 입력해 주세요.");
                     this.focus();
                     invalid = true;
                     return false;
                 }

                 if (this.value.indexOf(optionDelimiter) >= 0) {
                     alert("\"" + optionDelimiter + "\" 문자는 옵션항목에 사용할 수 없습니다.");
                     this.focus();
                     invalid = true;
                     return false;
                 }

                 var arrValue = this.value.split(';');

                 for (var i = 0; i < arrValue.length; i++) {
                     var arrItem = arrValue[i].split('^');

                     if (arrItem.length > 3) {
                         alert("옵션항목을 정확히 입력해 주세요.\n\n예) 옵션항목,옵션항목^옵션가격,옵션항목^옵션가격^품절");
                         this.focus();
                         invalid = true;
                         return false;
                     }

                     switch (arrItem.length) {
                         case 3:
                             if (arrItem[2] != '품절') {
                                 alert("각 옵션항목의 마지막자리에는 \"품절\" 정보만 입력할 수 있습니다.");
                                 this.focus();
                                 invalid = true;
                                 return false;
                             }
                         case 2:
                             if (arrItem[1] != '품절' && !isNumeric(arrItem[1])) {
                                 alert("옵션가격은 숫자만 입력이 가능합니다.");
                                 this.focus();
                                 invalid = true;
                                 return false;
                             }
                         case 1:
                     }

                     if (i == 0 && arrItem.length > 1 && arrItem[1].toNumeric() != 0) {
                         alert("첫번째 옵션항목은 옵션가격을 입력하지 않거나 \"0\" 이어야 합니다. (기본값)");
                         this.focus();
                         invalid = true;
                         return false;
                     }

                     if (arrItem[0].length > 100) {
                         alert("옵션항목은 항목당 최대 100자까지 입력할 수 있습니다.(품절 문자 포함)");
                         this.focus();
                         invalid = true;
                         return false;
                     }
                 }
             });
             if (invalid) return false;
             break;
         case '201':
             var objOptName = f['optName201'];

             if (sws.common.isEmpty(objOptName)) {
                 alert("옵션명을 입력해 주세요.");
                 objOptName.focus();
                 return false;
             }

             var invalid = false;
             $('input[name="optItem201"]', f).each(function() {
                 if (sws.common.isEmpty(this)) {
                     alert("옵션항목을 입력해 주세요.");
                     this.focus();
                     invalid = true;
                     return false;
                 }
             });
             if (invalid) return false;
             break;
         case '202':
             var arrOptItem = new Array(f.optItem1, f.optItem2);
             var arrMaxExistItem = new Array(-1, -1);

             if (sws.common.isEmpty(arrOptItem[0][0])) {
                 alert("옵션항목을 입력해 주세요.");
                 arrOptItem[0][0].focus();
                 return false;
             }

             for (var i = 0; i < 2; i++) {
                 for (var s = 9; s >= 0; s--) {
                     if (!sws.common.isEmpty(arrOptItem[i][s])) {
                         arrMaxExistItem[i] = s;
                         break;
                     }
                 }
             }

             for (var i = 0; i < 2; i++) {
                 for (var s = 0; s <= arrMaxExistItem[i]; s++) {
                     if (sws.common.isEmpty(arrOptItem[i][s])) {
                         alert("옵션항목을 입력해 주세요.");
                         arrOptItem[i][s].focus();
                         return false;
                     }

                     if (arrOptItem[i][s].value.indexOf(optionDelimiter) >= 0) {
                         alert("\"" + optionDelimiter + "\" 문자는 옵션항목에 사용할 수 없습니다.");
                         arrOptItem[i][s].focus();
                         return false;
                     }
                 }
             }
             break;
         case '300':
             var objOptName = f['optName300'];

             if (sws.common.isEmpty(objOptName)) {
                 alert("옵션내용을 입력해 주세요.");
                 objOptName.focus();
                 return false;
             }
             break;
     }

     return true;
 }

 $(function() {
     var MAX_SIZE = 2000;

     $('#tb_option_100').find('textarea').on({
         keydown: function(e) {
             if (e.which == 13) {
                 e.preventDefault();
             }
         },
         keyup: function() {
             if ($(this).val().length > MAX_SIZE) {
                 alert("옵션항목은 최대 " + MAX_SIZE + "자 까지 입력할 수 있습니다.");
                 $(this).val(function(i, val) {
                     return val.substring(0, MAX_SIZE);
                 });
             }
             $(this).parent().next().children().text($(this).val().length);
         }
     });
     checkOptionKind();
 });
 //]]>




 //  <!------------------------- 18.추가구성 -->

 //<![CDATA[ 추가구성
 function checkUseAddition() {
     var f = document.Frm;
     if (sws.common.getRadio(f.useAddition).toNumeric() > 0) {
         $('.addition_usable div').show();
         $('.addition_container').show();
     } else {
         $('.addition_usable div').hide();
         $('.addition_container').hide();
     }
 }

 function cbAdtAll() {
     $('input[name="cbAdt"]').prop('checked', true);
 }

 function checkCbAdt(obj) {
     switch (obj.name) {
         case 'cbAdtStock':
             var $quantity = $(obj).parent().find('input:text');
             if (obj.checked) {
                 $quantity.prop('readonly', false).removeClass('limitless').val('').focus();
             } else {
                 $quantity.val('무제한').addClass('limitless').prop('readonly', true);
             }
             break;
     }
     $(obj).parent().find('input:hidden').val(obj.checked ? obj.value : '');
 }

 function validAddition() {
     var f = document.Frm;
     var invalid = false;

     if (sws.common.getRadio(f.useAddition).toNumeric() > 0) {
         $('input[name="adtNo"]').each(function() {
             var $addition = $(this).closest('.addition');
             var $adtName = $('input[name="adtName"]', $addition);
             var adtNo = this.value;

             if (sws.common.isEmpty($adtName[0])) {
                 alert("추가구성 이름을 입력해 주세요.");
                 $adtName.focus();
                 invalid = true;
                 return false;
             }

             $('input[name="adtItemIdx' + adtNo + '"]').each(function() {
                 var $tr = $(this).closest('tr'),
                     $adtItem = $('input[name="adtItem' + adtNo + '"]', $tr),
                     $adtPrice = $('input[name="adtPrice' + adtNo + '"]', $tr);

                 if (sws.common.isEmpty($adtItem[0])) {
                     alert("추가구성 항목을 입력해 주세요.");
                     $adtItem.focus();
                     invalid = true;
                     return false;
                 }
             });
             if (invalid) {
                 return false;
             }
         });
     }
     return (invalid ? false : true);
 }

 //]]>

 //<![CDATA[
 // 테이블 추가하기
 var maxStRowAdt = 5;
 var maxRowAdt = '10'.toNumeric();

 var htmlAdt = '<div class="addition">' +
     '<dl class="addition_title">' +
     '<dt>추가구성 이름</dt>' +
     '<dd>' +
     '<input type="checkbox" name="cbAdt" /> <input type="text" name="adtName" class="text_input" maxlength="50" />' +
     '</dd>' +
     '</dl>' +
     '<table summary="추가 구성 폼 테이블 입니다." max="999" class="addition_list">' +
     '<caption>상품 재고(단일)옵션 폼 테이블</caption>' +
     '<colgroup>' +
     '<col width="*" />' +
     '<col width="15%" />' +
     '<col width="10%" />' +
     '<col width="8%" />' +
     '<col width="8%" />' +
     '<col width="100" />' +
     '</colgroup>' +
     '<thead>' +
     '<tr>' +
     '<th>추가구성 항목</th>' +
     '<th>추가금액</th>' +
     '<th>재고수량</th>' +
     '<th>품절여부</th>' +
     '<th>숨김여부</th>' +
     '<th></th>' +
     '</tr>' +
     '</thead>' +
     '<tbody>' +
     '<tr>' +
     '<td><input type="hidden" name="adtItemIdx#NO#" value="" /><input type="text" name="adtItem#NO#" value="" class="text_input" maxlength="100" /></td>' +
     '<td><input type="text" name="adtPrice#NO#" value="" class="text_input" onKeyUp="toCurrency(this)" /></td>' +
     '<td><input type="hidden" name="adtStock#NO#" value="" /><input type="checkbox" name="cbAdtStock" value="1" onClick="checkCbAdt(this)" />' +
     '<input type="text" name="adtQuantity#NO#" value="무제한" maxlength="7" class="text_input limitless" style="width:65%" onKeyPress="blockNotNumber(event)" onKeyUp="toCurrency(this)" readonly="readonly" /></td>' +
     '<td><input type="hidden" name="adtSoldout#NO#" value="" /><input type="checkbox" name="cbAdtSoldout#NO#" value="2" onClick="checkCbAdt(this)" /></td>' +
     '<td><input type="hidden" name="adtHidden#NO#" value="" /><input type="checkbox" name="cbAdtHidden#NO#" value="1" onClick="checkCbAdt(this)" /></td>' +
     '<td class="btn_center"><button type="button" class="btn btn-sm btn-default" onClick="addRowAdt(this);"><i class="xi-plus-min"></i><span class="ir_pm">추가구성 추가</span></button>' +
     ' <button type="button" class="btn btn-sm btn-danger" onClick="delRowAdt(this);"><i class="xi-minus-min"></i><span class="ir_pm">추가구성 삭제</span></button></td>' +
     '</tr>' +
     '</tbody>' +
     '</table>' +
     '</div>';

 var cellHtmlAdtItem = new Array();
 cellHtmlAdtItem[0] = {
     html: '<input type="hidden" name="adtItemIdx#NO#" value="" /><input type="text" name="adtItem#NO#" value="" class="text_input" maxlength="100" />'
 };
 cellHtmlAdtItem[1] = {
     html: '<input type="text" name="adtPrice#NO#" value="" class="text_input" onKeyUp="toCurrency(this)" />'
 };
 cellHtmlAdtItem[2] = {
     html: '<input type="hidden" name="adtStock#NO#" value="" /><input type="checkbox" name="cbAdtStock" value="1" onClick="checkCbAdt(this)" />' +
         '<input type="text" name="adtQuantity#NO#" value="무제한" maxlength="7" class="text_input limitless" style="width:65%" readonly="readonly" />'
 };
 cellHtmlAdtItem[3] = {
     html: '<input type="hidden" name="adtSoldout#NO#" value="" /><input type="checkbox" name="cbAdtSoldout#NO#" value="2" onClick="checkCbAdt(this)" />'
 };
 cellHtmlAdtItem[4] = {
     html: '<input type="hidden" name="adtHidden#NO#" value="" /><input type="checkbox" name="cbAdtHidden#NO#" value="1" onClick="checkCbAdt(this)" />'
 };
 cellHtmlAdtItem[5] = {
     html: '<button type="button" class="btn btn-sm btn-default" onClick="addRowAdt(this);"><i class="xi-plus-min"></i><span class="ir_pm">추가구성 추가</span></button>' +
         ' <button type="button" class="btn btn-sm btn-danger" onClick="delRowAdt(this);"><i class="xi-minus-min"></i><span class="ir_pm">추가구성 삭제</span></button>',
     css: 'btn_center'
 };

 function addAddition() {
     var adtNo = ($('input[name="adtNo"]').length > 0 ? $('input[name="adtNo"]:last').val() : '0').toNumeric() + 1;
     $('.addition_container').children()
         .append(htmlAdt.replaceAll('#NO#', adtNo)).children('.addition:last')
         .find('.additions_opener').trigger('click').end();
 }

 function delAddition() {
     var $cb = $('input[name="cbAdt"]:checked');
     if ($cb.length <= 0) {
         alert("삭제할 추가구성을 선택해주세요.");
         return false;
     }
     $cb.each(function() {
         $(this).closest('.addition').remove();
     });
 }

 function addRowAdt(obj) {
     var $table = $(obj).closest('table.addition_list'),
         $tbody = $table.find('tbody:last');
     var maxRow = ($table.attr('max') ? $table.attr('max').toNumeric() : maxRowAdt);

     if (maxRow <= $tbody.children().length) {
         alert("더 이상 추가할 수 없습니다.\n\n최대 " + maxRow + "개까지 추가할 수 있습니다.");
         return false;
     }

     var adtNo = $table.closest('.addition').find('input[name="adtNo"]').val();

     var $row = $('<tr />');
     for (i = 0; i < cellHtmlAdtItem.length; i++) {
         var $cell = $('<td />').html(cellHtmlAdtItem[i].html.replaceAll('#NO#', adtNo)).appendTo($row);
         if (cellHtmlAdtItem[i].css) $cell.addClass(cellHtmlAdtItem[i].css);
     }

     if ($(obj).attr('first')) {
         if ($tbody.children().length > 0) {
             $tbody.children(':first-child').before($row);
         } else {
             $tbody.append($row);
         }
     } else {
         $(obj).closest('tr').after($row);
     }

     switchOpenerAdt($table);
 }

 function delRowAdt(obj) {
     var $table = $(obj).closest('table.addition_list');

     $(obj).closest('tr').remove();

     if ($table.find('tbody:last').children().length == 0) {
         addRowAdt($table.find('thead:last button')[0]);
     }

     switchOpenerAdt($table);
 }

 function switchOpenerAdt($table) {
     var $opener = $table.next();
     if ($table.find('tbody:last').children().length > maxStRowAdt) {
         $opener.prop('disabled', false);
     } else {
         if (!$opener.data('scrolled')) {
             $opener.trigger('click');
         }
         $opener.prop('disabled', true);
     }
 }
 //]]>



 //  <!------------------------- 마지막.필수항목체크 -->

 //<![CDATA[
 function validSubmit() {
     var f = document.Frm;
     if (typeof(f.category1) == 'undefined') {
         alert("카테고리를 선택해 주세요.");
         f.category1.focus();
         return false;
     }
     if (sws.common.isEmpty(f.name.value)) {
         alert("상품명을 입력해 주세요.");
         f.name.focus();
         return false;
     }
     // 이미지 관련 : 시작
     if (!f.isImgAuto.checked) {
         if (sws.common.isEmpty(f.bigImage.value)) {
             alert("큰이미지를 선택해 주세요.");
             f.bigImage.focus();
             return false;
         }
         if (sws.common.isEmpty(f.midImage.value)) {
             alert("중간이미지를 선택해 주세요.");
             f.midImage.focus();
             return false;
         } else {
             if (!sws.common.checkFileExt(f.midImage, "jpg,gif", "이미지(jpg, gif) 파일만 선택해 주세요.")) {
                 f.midImage.focus();
                 return false;
             }
         }
         if (sws.common.isEmpty(f.smallImage.value)) {
             alert("작은이미지를 선택해 주세요.");
             f.smallImage.focus();
             return false;
         } else {
             if (!sws.common.checkFileExt(f.smallImage, "jpg,gif", "이미지(jpg, gif) 파일만 선택해 주세요. ")) {
                 f.smallImage.focus();
                 return false;
             }
         }
     }
     if (sws.common.isEmpty(f.bigImage.value)) {
         alert("큰 이미지를 선택해 주세요.");
         f.bigImage.focus();
         return false;
     } else {
         if (!sws.common.checkFileExt(f.bigImage, "jpg,gif", "이미지(jpg, gif) 파일만 선택해 주세요.")) {
             f.bigImage.focus();
             return false;
         }
     }
     if (f.cbImgEtc.length == "undefined") {
         if (!sws.common.isEmpty(f.cbImgEtc.value)) {
             if (!sws.common.checkFileExt(f.cbImgEtc, "jpg,gif", "이미지(jpg, gif) 파일만 선택해 주세요.")) {
                 return false;
             }
         }
     } else {
         for (var i = 0; i < f.cbImgEtc.length; i++) {
             if (!sws.common.isEmpty(f.cbImgEtc[i].value)) {
                 if (!sws.common.checkFileExt(f.cbImgEtc[i], "jpg,gif", "이미지(jpg, gif) 파일만 선택해 주세요.")) {
                     return false;
                 }
             }
         }
     }
     if (!f.stockQty.disabled && f.stockQty.value.toNumeric() >= '1000000'.toNumeric()) {
         alert("재고 수량은 1,000,000 미만으로 설정이 가능합니다.");
         f.stockQty.focus();
         return false;
     }

     if (sws.common.isEmpty(f.price)) {
         alert("판매가격을 입력해 주세요.");
         f.price.focus();
         return false;
     }

     if (f.feeRate.value.toNumeric() < 0) {
         alert("수수료율을 0 이상으로 설정해 주세요.");
         f.feeRate.focus();
         return false;
     }

     if (sws.common.isEmpty(f.supplyPrice)) {
         alert("공급가격을 입력해 주세요.");
         f.supplyPrice.focus();
         return false;
     }
     if ($('input[name="pointTypeCode"]').length > 0) {
         switch (sws.common.getRadio(f.pointTypeCode)) {
             case '5':
                 if (f.pointRate.value.toNumeric() <= 0) {
                     alert("적립률을 입력해 주세요.");
                     f.pointRate.focus();
                     return false;
                 }

                 if (f.pointRate.value.toNumeric() > 100) {
                     alert("100% 이하로 입력해 주세요.");
                     f.pointRate.value = "100";
                     f.pointRate.focus();
                     return false;
                 }

                 if (!sws.common.isEmpty(f.pointRate) && !sws.common.checkRound(f.pointRate.value, 2)) {
                     alert("소수점 2자리수 이상은 불가능합니다.");
                     f.pointRate.focus();
                     return false;
                 }
                 break;
             case '6':
                 if (f.point.value.toNumeric() <= 0) {
                     alert("적립금을 입력해 주세요.");
                     f.point.focus();
                     return false;
                 }
                 break;
         }
     }
     var checker = 0;
     if (f.cbNotify) {
         if (typeof(f.cbNotify.length) == 'undefined') {
             if (!sws.common.isEmpty(f.item) && !sws.common.isEmpty(f.content)) ++checker;
         } else {
             for (var i = 0; i < f.cbNotify.length; i++) {
                 if (!sws.common.isEmpty(f.item[i]) && !sws.common.isEmpty(f.content[i])) ++checker;
             }
         }
     }
     if (checker == 0) {
         alert("상품정보고시를 입력해 주세요.");
         //  return false;
     }

     if (sws.common.isEmpty(f.detailDescription)) {
         alert("상품의 상세정보를 입력해 주세요.");
         //  return false;
     }

     switch (sws.common.getRadio(f.deliveryPriceTypeCode)) {
         case '2':
             if (sws.common.isEmpty(f.debitAmountoptional)) {
                 alert("착불금액을 입력해 주세요.");
                 f.debitAmountoptional.focus();
                 return false;
             }
             break;
         case '3':
             if (sws.common.isEmpty(f.prepaymentAmountoptional)) {
                 alert("선불금액을 적어주세요");
                 f.prepaymentAmountoptional.focus();
                 return false;
             }
             break;
     }

     if (!validOption()) return false;
     if (!validAddition()) return false;



     if (confirm("등록하시겠습니까?")) {
         console.log($(f).serializeObject());
     }
 }
 //]]>