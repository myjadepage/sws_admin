var path = require('path');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('mim/index', {
        path: '/mim/',
        name: '/',
        title: ''
    });
});

router.get('/dealer_regist_list', function(req, res, next) {
    res.render('mim/dealer_regist_list', {
        path: '/mim/',
        name: 'dealer_regist_list',
        title: ''
    });
});

router.get('/dealer_list', function(req, res, next) {
    res.render('mim/dealer_list', {
        path: '/mim/',
        name: 'dealer_list',
        title: ''
    });
});

router.get('/dealer_detail', function(req, res, next) {
    res.render('mim/dealer_detail', {
        path: '/mim/',
        name: 'dealer_detail',
        title: ''
    });
});

router.get('/dealer_secession_list', function(req, res, next) {
    res.render('mim/dealer_secession_list', {
        path: '/mim/',
        name: 'dealer_secession_list',
        title: ''
    });
});


router.get('/dealer_qna_list', function(req, res, next) {
    res.render('mim/dealer_qna_list', {
        path: '/mim/',
        name: 'dealer_qna_list',
        title: ''
    });
});

router.get('/dealer_qna_reg', function(req, res, next) {
    res.render('mim/dealer_qna_reg', {
        path: '/mim/',
        name: 'dealer_qna_reg',
        title: ''

    });
});

router.get('/goods_list', function(req, res, next) {
    res.render('mim/goods_list', {
        path: '/mim/',
        name: 'goods_list',
        title: ''
    });
});

router.get('/goods_edit', function(req, res, next) {
    res.render('mim/goods_edit', {
        path: '/mim/',
        name: 'goods_edit',
        title: ''
    });
});

router.get('/brand_list', function(req, res, next) {
    res.render('mim/brand_list', {
        path: '/mim/',
        name: 'brand_list',
        title: ''
    });
});

router.get('/brand_reg', function(req, res, next) {
    res.render('mim/brand_reg', {
        path: '/mim/',
        name: 'brand_reg',
        title: ''
    });
});

router.get('/event_list', function(req, res, next) {
    res.render('mim/event_list', {
        path: '/mim/',
        name: 'event_list',
        title: ''
    });
});

module.exports = router;