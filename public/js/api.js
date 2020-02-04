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
            $('select[name="goodsDealer"]').empty();
            $('select[name="goodsDealer"]').append('<option  value="" selected="true">상품공급업체 선택</option>');
            $('select[name="goodsDealer"]').prop('selectedIndex', 0);
            $.each(data, function(key, entry) {
                $('select[name="goodsDealer"]').append($('<option></option>').attr('value', key).text(entry.name));
            })
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log('Error: ' + textStatus + ' - ' + errorThrown);
            alert("상품공급업체 불러 올 수 없습니다.");
        }
    });
}