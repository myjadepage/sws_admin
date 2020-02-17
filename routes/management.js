var path = require('path');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('management/index', {
        path: '/management/',
        name: '/',
        title: ''
    });
});

router.get('/review_list', function(req, res, next) {
    res.render('management/review_list', {
        path: '/management/',
        name: 'review_list',
        title: ''
    });
});

router.get('/qna_list', function(req, res, next) {
    res.render('management/qna_list', {
        path: '/management/',
        name: 'qna_list',
        title: ''
    });
});

router.get('/faq_list', function(req, res, next) {
    res.render('management/faq_list', {
        path: '/management/',
        name: 'faq_list',
        title: ''
    });
});


router.get('/faq_reg', function(req, res, next) {
    res.render('management/faq_reg', {
        path: '/management/',
        name: 'faq_list',
        title: ''
    });
});

router.get('/inquiry_list', function(req, res, next) {
    res.render('management/inquiry_list', {
        path: '/management/',
        name: 'inquiry_list',
        title: ''
    });
});

router.get('/inquiry_detail', function(req, res, next) {
    res.render('management/inquiry_detail', {
        path: '/management/',
        name: 'inquiry_list',
        title: ''
    });
});

router.get('/board_manage', function(req, res, next) {
    res.render('management/board_manage', {
        path: '/management/',
        name: 'board_manage',
        title: '게시판 통합관리'
    });
});

router.get('/board_manage_reg', function(req, res, next) {
    res.render('management/board_manage_reg', {
        path: '/management/',
        name: 'board_manage',
        title: '게시판 통합관리'

    });
});

router.get('/coupon_list', function(req, res, next) {
    res.render('management/coupon_list', {
        path: '/management/',
        name: 'coupon_list',
        title: '상품쿠폰관리'
    });
});

router.get('/coupon_goods_reg', function(req, res, next) {
    res.render('management/coupon_goods_reg', {
        path: '/management/',
        name: 'coupon_list',
        title: '쿠폰관리'
    });
});



module.exports = router;