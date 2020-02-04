var path = require('path');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('mim/index', {
        path: '/mim/'
    });
});

router.get('/dealer_regist_list', function(req, res, next) {
    res.render('mim/dealer_regist_list', {
        path: '/mim/'
    });
});

router.get('/dealer_list', function(req, res, next) {
    res.render('mim/dealer_list', {
        path: '/mim/'
    });
});

router.get('/dealer_detail', function(req, res, next) {
    res.render('mim/dealer_detail', {
        path: '/mim/'
    });
});

router.get('/dealer_secession_list', function(req, res, next) {
    res.render('mim/dealer_secession_list', {
        path: '/mim/'
    });
});


router.get('/dealer_qna_list', function(req, res, next) {
    res.render('mim/dealer_qna_list', {
        path: '/mim/'
    });
});

router.get('/dealer_qna_reg', function(req, res, next) {
    res.render('mim/dealer_qna_reg');
});

router.get('/goods_list', function(req, res, next) {
    res.render('mim/goods_list', {
        path: '/mim/'
    });
});

router.get('/goods_edit', function(req, res, next) {
    res.render('mim/goods_edit', {
        path: '/mim/'
    });
});

router.get('/brand_list', function(req, res, next) {
    res.render('mim/brand_list');
});

router.get('/brand_reg', function(req, res, next) {
    res.render('mim/brand_reg', {
        path: '/mim/'
    });
});

router.get('/event_list', function(req, res, next) {
    res.render('mim/event_list', {
        path: '/mim/'
    });
});

module.exports = router;