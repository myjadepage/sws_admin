var path = require('path');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('management/index', {
        path: '/management/'
    });
});

router.get('/review_list', function(req, res, next) {
    res.render('management/review_list', {
        path: '/management/'
    });
});

router.get('/qna_list', function(req, res, next) {
    res.render('management/qna_list', {
        path: '/management/'
    });
});

router.get('/faq_list', function(req, res, next) {
    res.render('management/faq_list', {
        path: '/management/'
    });
});


router.get('/faq_reg', function(req, res, next) {
    res.render('management/faq_reg', {
        path: '/management/'
    });
});

router.get('/inquiry_list', function(req, res, next) {
    res.render('management/inquiry_list', {
        path: '/management/'
    });
});

router.get('/inquiry_detail', function(req, res, next) {
    res.render('management/inquiry_detail', {
        path: '/management/'
    });
});

router.get('/board_manage', function(req, res, next) {
    res.render('management/board_manage', {
        path: '/management/'
    });
});

router.get('/board_manage_reg', function(req, res, next) {
    res.render('management/board_manage_reg');
});

router.get('/coupon_list', function(req, res, next) {
    res.render('management/coupon_list', {
        path: '/management/'
    });
});

router.get('/coupon_goods_reg', function(req, res, next) {
    res.render('management/coupon_goods_reg', {
        path: '/management/'
    });
});



module.exports = router;