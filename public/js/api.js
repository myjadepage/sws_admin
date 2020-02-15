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
        url: "http://192.168.1.40:3000/api/v1/preferences/productIcons",
        dataType: "json",
        error: function(request, status, error) {
            alert(request.responseText)
        },
        success: function(data) {
            console.log("아이콘이미지불러오기", data);
            // var f = document.Frm;
            // var icons = new Array();

            // if (data) {
            //     for (var i = 0; i < data.list.length; i++) {
            //         var checked = (data.list[i].checked ? data.list[i].checked.toString().toNumeric() : -1);
            //         icons[data.list[i].code.toString().toNumeric()] = {
            //             img: data.list[i].icon.trim(),
            //             checked: checked
            //         };
            //     }
            // }

            // $(f.iconURL).each(function() {
            //     var code = this.value.toNumeric();

            //     if (icons[code] && icons[code].img) {
            //         this.disabled = false;
            //         if (icons[code].checked > -1) {
            //             this.checked = (icons[code].checked ? true : false);
            //         }

            //         var $parent = $('#icon_' + code).parent();
            //         console.log($parent); //"<label><img id="icon_1" src="/img/ico_pro_sale.gif"></label>"

            //         $parent.children().remove();

            //         $('<img id="icon_' + code + '" src="' + icons[code].img + '" />')


            //     } else {
            //         this.disabled = true;
            //         $('icon_' + code).attr('src', '/img/blank.gif').css({
            //             width: 1,
            //             height: 1
            //         });
            //     }
            // });
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
            url: "http://192.168.1.40:3000/api/v1/brands",
            contentType: 'application/json',
            dataType: 'json'
        })
        .done(function(data) {
            console.log("brands", data.jsonData);
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


var category = {}
category.getCate1 = function() {
    $.ajax({
            url: "http://192.168.1.40:3000/api/v1/categories/1",
            dataType: 'json',
        })
        .done(function(data) {
            $select = $('select[name="category1"]');
            $select.empty();
            $select.append('<option  value="" selected="true">1차카테고리 선택</option>');
            $select.prop('selectedIndex', 0);
            $.each(data.jsonData.categories, function(key, entry) {
                $select.append($('<option></option>')
                    .attr('value', entry.categorySysId)
                    .attr('data-parentSysId', entry.parentSysId)
                    .attr('data-categoryLevel', entry.categoryLevel)
                    .attr('data-feeRate', entry.feeRate)
                    .text(entry.name + ' [ ' + entry.feeRate * 100 + ' % ]'));
            })
            category.getCate2();
        })
        .fail(function(request, status, error) {
            msg = request.status + "<br>" + request.responseText + "<br>" + error;
            console.log(msg);
            alert("카테고리를 불러올 수 없습니다.");
        })
}

category.getCate2 = function() {
    $('select[name="category1"]').on('change', function() {
        if ($('select[name="category1"] option:selected').attr('value') != "") {
            var parentSysId = $('select[name="category1"] option:selected').attr('data-parentSysId');
            var categoryLevel = $('select[name="category1"] option:selected').attr('data-categoryLevel');
            var categorySysId = $('select[name="category1"] option:selected').val();

            var url;
            if (parentSysId == 0) {
                url = "http://192.168.1.40:3000/api/v1/categories/2";
            } else {
                url = `http://192.168.1.40:3000/api/v1/categories/2/nodes/${categorySysId}`
            }
            console.log("2url", url);
            $.ajax({
                    url: url,
                    dataType: 'json'
                })
                .done(function(data) {
                    console.log(data);
                    $select = $('select[name="category2"]');
                    $select.empty();
                    $select.append('<option  value="" selected="true">2차카테고리 선택</option>');
                    $select.prop('selectedIndex', 0);
                    $.each(data.jsonData.categories, function(key, entry) {
                        $select.append($('<option></option>')
                            .attr('value', entry.categorySysId)
                            .attr('data-parentSysId', entry.parentSysId)
                            .attr('data-categoryLevel', entry.categoryLevel)
                            .attr('data-feeRate', entry.feeRate)
                            .text(entry.name + ' [ ' + entry.feeRate * 100 + ' % ]'));
                    })
                    category.getCate3();
                })
                .fail(function(request, status, error) {
                    msg = request.status + "<br>" + request.responseText + "<br>" + error;
                    console.log(msg);
                    alert("카테고리를 불러올 수 없습니다.");
                })
        } else {
            $('select[name="category2"],select[name="category3"],select[name="category4"],select[name="category5"]').empty();
            $('select[name="category2"]').append('<option  value="" selected="true">2차카테고리 선택</option>');
            $('select[name="category3"]').append('<option  value="" selected="true">3차카테고리 선택</option>');
            $('select[name="category4"]').append('<option  value="" selected="true">4차카테고리 선택</option>');
            $('select[name="category5"]').append('<option  value="" selected="true">5차카테고리 선택</option>');
        }
    })
}

category.getCate3 = function() {
    $('select[name="category2"]').on('change', function() {
        if ($('select[name="category2"] option:selected').attr('value') != "") {
            var parentSysId = $('select[name="category2"] option:selected').attr('data-parentSysId');
            // var categoryLevel = $('select[name="category2"] option:selected').attr('data-categoryLevel');
            var categorySysId = $('select[name="category2"] option:selected').val();



            var url;
            if (parentSysId == 0) {
                url = "http://192.168.1.40:3000/api/v1/categories/3";
            } else {
                url = `http://192.168.1.40:3000/api/v1/categories/3/nodes/${categorySysId}`
            }
            $.ajax({
                    url: url,
                    dataType: 'json'
                })
                .done(function(data) {
                    console.log(data);
                    $select = $('select[name="category3"]');
                    $select.empty();
                    $select.append('<option  value="" selected="true">3차카테고리 선택</option>');
                    $select.prop('selectedIndex', 0);
                    $.each(data.jsonData.categories, function(key, entry) {
                        $select.append($('<option></option>')
                            .attr('value', entry.categorySysId)
                            .attr('data-parentSysId', entry.parentSysId)
                            .attr('data-categoryLevel', entry.categoryLevel)
                            .attr('data-feeRate', entry.feeRate)
                            .text(entry.name + ' [ ' + entry.feeRate * 100 + ' % ]'));
                    })
                    category.getCate4();
                })
                .fail(function(request, status, error) {
                    msg = request.status + "<br>" + request.responseText + "<br>" + error;
                    console.log(msg);
                    alert("카테고리를 불러올 수 없습니다.");
                })
        } else {
            $('select[name="category3"],select[name="category4"],select[name="category5"]').empty();
            $('select[name="category3"]').append('<option  value="" selected="true">3차카테고리 선택</option>');
            $('select[name="category4"]').append('<option  value="" selected="true">4차카테고리 선택</option>');
            $('select[name="category5"]').append('<option  value="" selected="true">5차카테고리 선택</option>');
        }
    })
}

category.getCate4 = function() {
    $('select[name="category3"]').on('change', function() {
        if ($('select[name="category3"] option:selected').attr('value') != "") {
            var parentSysId = $('select[name="category3"] option:selected').attr('data-parentSysId');
            // var categoryLevel = $('select[name="category3"] option:selected').attr('data-categoryLevel');
            var categorySysId = $('select[name="category3"] option:selected').val();


            var url;
            if (parentSysId == 0) {
                url = "http://192.168.1.40:3000/api/v1/categories/4";
            } else {
                url = `http://192.168.1.40:3000/api/v1/categories/4/nodes/${categorySysId}`
            }
            $.ajax({
                    url: url,
                    dataType: 'json'
                })
                .done(function(data) {
                    console.log(data);
                    $select = $('select[name="category4"]');
                    $select.empty();
                    $select.append('<option  value="" selected="true">4차카테고리 선택</option>');
                    $select.prop('selectedIndex', 0);
                    $.each(data.jsonData.categories, function(key, entry) {
                        $select.append($('<option></option>')
                            .attr('value', entry.categorySysId)
                            .attr('data-parentSysId', entry.parentSysId)
                            .attr('data-categoryLevel', entry.categoryLevel)
                            .attr('data-feeRate', entry.feeRate)
                            .text(entry.name + ' [ ' + entry.feeRate * 100 + ' % ]'));
                    })
                    category.getCate5();
                })
                .fail(function(request, status, error) {
                    msg = request.status + "<br>" + request.responseText + "<br>" + error;
                    console.log(msg);
                    alert("카테고리를 불러올 수 없습니다.");
                })
        } else {
            $('select[name="category4"],select[name="category5"]').empty();
            $('select[name="category4"]').append('<option  value="" selected="true">4차카테고리 선택</option>');
            $('select[name="category5"]').append('<option  value="" selected="true">5차카테고리 선택</option>');
        }
    })
}

category.getCate5 = function() {
    $('select[name="category4"]').on('change', function() {
        if ($('select[name="category4"] option:selected').attr('value') != "") {
            var parentSysId = $('select[name="category4"] option:selected').attr('data-parentSysId');
            // var categoryLevel = $('select[name="category4"] option:selected').attr('data-categoryLevel');
            var categorySysId = $('select[name="category4"] option:selected').val();


            var url;
            if (parentSysId == 0) {
                url = "http://192.168.1.40:3000/api/v1/categories/5";
            } else {
                url = `http://192.168.1.40:3000/api/v1/categories/5/nodes/${categorySysId}`
            }
            $.ajax({
                    url: url,
                    dataType: 'json'
                })
                .done(function(data) {
                    console.log(data);
                    $select = $('select[name="category5"]');
                    $select.empty();
                    $select.append('<option  value="" selected="true">5차카테고리 선택</option>');
                    $select.prop('selectedIndex', 0);
                    $.each(data.jsonData.categories, function(key, entry) {
                        $select.append($('<option></option>')
                            .attr('value', entry.categorySysId)
                            .attr('data-parentSysId', entry.parentSysId)
                            .attr('data-categoryLevel', entry.categoryLevel)
                            .attr('data-feeRate', entry.feeRate)
                            .text(entry.name + ' [ ' + entry.feeRate * 100 + ' % ]'));
                    })
                })
                .fail(function(request, status, error) {
                    msg = request.status + "<br>" + request.responseText + "<br>" + error;
                    console.log(msg);
                    alert("카테고리를 불러올 수 없습니다.");
                })
        } else {
            $('select[name="category5"]').empty();
            $('select[name="category5"]').append('<option  value="" selected="true">5차카테고리 선택</option>');
        }
    })
}


function getProductNotices() {
    $.ajax({
            url: "http://192.168.1.40:3000/api/v1/preferences/productNotices",
            contentType: "json"
        })
        .done(function(data) {
            $('select[name="productNotice"]').empty();
            $('select[name="productNotice"]').append('<option  value="" selected="true">등록할 상품의 상품군을 선택하세요</option>');
            $('select[name="productNotice"]').prop('selectedIndex', 0);
            $.each(data.jsonData.productNotices, function(key, entry) {
                $('select[name="productNotice"]').append($('<option></option>')
                    .attr('value', entry.prdtNoticeBaseSysId)
                    .text(entry.groupName));
            })
        })
        .fail(function(request, status, error) {
            msg = request.status + "<br>" + request.responseText + "<br>" + error;
            console.log(msg);
            alert("카테고리를 불러올 수 없습니다.");
        })
}

$('select[name="productNotice"]').on('change', function() {
    var prdtNoticeBaseSysId = $(this).val();
    console.log("prdtNoticeBaseSysId", prdtNoticeBaseSysId);
    $.ajax({
            url: `http://192.168.1.40:3000/api/v1/preferences/productNoticeDetails/${prdtNoticeBaseSysId}`,
            dataType: "json"
        })
        .done(function(data) {
            $('#tb_notify tbody tr').remove();
            var htmls = cellHtmls['tb_notify'];
            var $table = $('#tb_notify');
            var $tr = $('<tr />');

            $.each(data.jsonData.productDetailNotices, function(key, entry) {
                htmls += `<tr><td><span class="numbering"></span></td>`;
                htmls += '<td><input type="checkbox" name="cbNotify "></td>';
                htmls += `<td><input type="text" name="item" class="text_input" value="${entry.item}" data-prdtNoticeDetailSysId="${entry.prdtNoticeDetailSysId}" style="width:90%;" maxlength="100"></td>`;
                htmls += `<td class="last"><textarea name="content" rows="2" class="text_input" onKeyUp="checkTextLen(this, 2000)">${entry.content}</textarea></td></tr>`;
            });
            $table.append(htmls);
        })
        .fail(function(request, status, error) {
            msg = request.status + "<br>" + request.responseText + "<br>" + error;
            console.log(msg);
            alert("카테고리를 불러올 수 없습니다.");
        })
})