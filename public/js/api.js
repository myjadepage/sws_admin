/**
 * 
 * form ----> json 만들기($(f).serializeObject())
 * 
 */
$.fn.serializeObject = function() {
    var obj = null;
    try {
        if (this[0].tagName && this[0].tagName.toUpperCase() == "FORM") {
            var arr = this.serializeArray();
            if (arr) {
                obj = {};
                jQuery.each(arr, function() {
                    obj[this.name] = this.value;
                });
            } //if ( arr ) {
        }
    } catch (e) {
        alert(e.message);
    } finally {}

    return obj;
};

/**
 * 
 * 메뉴 : 상품관리
 * 
 * 
 */

//  상품공급업체
function supplySelect() {
    $.ajax({
        url: '/supply', //json 불러오기 router이용해서 불러옴
        dataType: 'json',
        success: function(data) {
            $('select[name="sellerId"]').empty();
            $('select[name="sellerId"]').append('<option  value="" selected="true">상품공급업체 선택</option>');
            $('select[name="sellerId"]').prop('selectedIndex', 0);
            $.each(data, function(key, entry) {
                $('select[name="sellerId"]').append($('<option></option>').attr('value', key).text(entry.name));
            })
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log('Error: ' + textStatus + ' - ' + errorThrown);
            alert("상품공급업체 불러 올 수 없습니다.");
        }
    });
}

//아이콘등록하기
function setIcons() {
    $.ajax({
        type: "POST",
        dataType: "json",
        url: "/goodsIcons",

        error: function(request, status, error) {
            alert(request.responseText)
        },
        success: function(data) {
            var f = document.Frm;
            var icons = new Array();

            if (data) {
                for (var i = 0; i < data.list.length; i++) {
                    var checked = (data.list[i].checked ? data.list[i].checked.toString().toNumeric() : -1);
                    icons[data.list[i].code.toString().toNumeric()] = {
                        img: data.list[i].icon.trim(),
                        checked: checked
                    };
                }
            }

            $(f.iconURL).each(function() {
                var code = this.value.toNumeric();

                if (icons[code] && icons[code].img) {
                    this.disabled = false;
                    if (icons[code].checked > -1) {
                        this.checked = (icons[code].checked ? true : false);
                    }

                    var $parent = $('#icon_' + code).parent();
                    console.log($parent); //"<label><img id="icon_1" src="/img/ico_pro_sale.gif"></label>"

                    $parent.children().remove();

                    $('<img id="icon_' + code + '" src="' + icons[code].img + '" />')


                } else {
                    this.disabled = true;
                    $('icon_' + code).attr('src', '/img/blank.gif').css({
                        width: 1,
                        height: 1
                    });
                }
            });
        }
    });
}


function addProduct() {
    $.ajax({
        type: "POST",
        dataType: "json",
        // url: "https://api.shallwe.link/v1/products/",
        data: {

        },
        error: function(request, status, error) {
            alert(request.responseText)
        },
        success: function(data) {}

    });
}

function getBrand() {
    $.ajax({
            method: "get",
            // url: "https://api.shallwe.link/v1/brands/",
            url: "/brands/",
            contentType: "json"
        })
        .done(function(data) {
            console.log(data.jsonData.brands[0].brandSysId);
            $select = $('select[name="brandSysId"]');
            $select.empty();
            $select.append('<option  value="" selected="true">브랜드 선택</option>');
            $select.prop('selectedIndex', 0);
            $.each(data.jsonData.brands, function(key, entry) {
                $select.append($('<option></option>')
                    .attr('value', entry.brandSysId)
                    .attr('data-sellerSysId', entry.sellerSysId)
                    .text(entry.name));
            })
        })
        .fail(function(request, status, error) {
            msg = request.status + "<br>" + request.responseText + "<br>" + error;
            console.log(msg);
            alert("브랜드를 불러올 수 없습니다.");
        })
}

function getCategory() {
    var categoryLevel = 1;
    var parentSysId = 0;
    $.ajax({
            method: "get",
            url: `/categories/:${categoryLevel}`,
            contentType: "json",
            data: {
                parentSysId: parentSysId
            }
        })
        .done(function(data) {
            console.log(data.jsonData.categories[0]);
            // $select = $('select[name="category1"]');
            $select = $('select[name="cate_1"]');
            $select.empty();
            $select.append('<option  value="" selected="true">1차카테고리 선택</option>');
            $select.prop('selectedIndex', 0);
            $.each(data.jsonData.categories, function(key, entry) {
                var feeRate = entry.feeRate * 100;
                $select.append($('<option></option>')
                    .attr('value', entry.categorySysId)
                    .attr('data-parentSysId', entry.parentSysId)
                    .text(entry.name + ' [ ' + feeRate + ' % ]'));
            })
        })
        .fail(function(request, status, error) {
            msg = request.status + "<br>" + request.responseText + "<br>" + error;
            console.log(msg);
            alert("카테고리를 불러올 수 없습니다.");
        })
}