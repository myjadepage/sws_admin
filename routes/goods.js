var path = require('path');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('goods/index', {
        path: '/goods/',
        name: '/',
        title: '상품관리'
    });
});

router.get('/category', function(req, res, next) {
    res.render('goods/category', {
        path: '/goods/',
        name: 'category',
        title: '카테고리관리'
    });
});

router.get('/goods_reg', function(req, res, next) {
    res.render('goods/goods_reg', {
        path: '/goods/',
        name: 'goods_reg',
        title: '상품등록'
    });
});

router.get('/goods_icon_pop', function(req, res, next) {
    res.render('goods/goods_icon_pop', {
        path: '/goods/',
        name: 'goods_icon_pop',
        title: '아이콘관리'
    });
});


router.get('/goods_list', function(req, res, next) {
    res.render('goods/goods_list', {
        path: '/goods/',
        name: 'goods_list',
        title: '상품목록'
    });
});

router.get('/goods_sort', function(req, res, next) {
    res.render('goods/goods_sort', {
        path: '/goods/',
        name: 'goods_sort',
        title: '상품진열설정'
    });
});

router.get('/trash_list', function(req, res, next) {
    res.render('goods/trash_list', {
        path: '/goods/',
        name: 'trash_list',
        title: '상품휴지통'
    });
});

router.get('/brand_list', function(req, res, next) {
    res.render('goods/brand_list', {
        path: '/goods/',
        name: 'brand_list',
        title: '브랜드관리'
    });
});

router.get('/brand_reg', function(req, res, next) {
    res.render('goods/brand_reg', {
        path: '/goods/',
        name: 'brand_reg',
        title: '브랜드관리'
    });
});

router.get('/marketing', function(req, res, next) {
    res.render('goods/marketing', {
        path: '/goods/',
        name: 'marketing',
        title: '상품연동관리'
    });
});


router.get('/excel_down', function(req, res, next) {
    res.render('goods/excel_down', {
        path: '/goods/',
        name: 'excel_down',
        title: '상품정보다운로드'
    });
});

router.get('/excel_regist', function(req, res, next) {
    res.render('goods/excel_regist', {
        path: '/goods/',
        name: 'excel_regist',
        title: '상품정보일괄등록'
    });
});

module.exports = router;