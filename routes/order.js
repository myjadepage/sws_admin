var path = require('path');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('order/index', {
        path: '/order/',
        name: '/',
        title: '주문/매출관리'
    });
});

router.get('/order_list', function(req, res, next) {
    res.render('order/order_list', {
        path: '/order/',
        name: 'order_list',
        title: '전체주문'
    });
});

router.get('/consult_list', function(req, res, next) {
    res.render('order/consult_list', {
        path: '/order/',
        name: 'consult_list',
        title: ''
    });
});

router.get('/consult_detail', function(req, res, next) {
    res.render('order/consult_detail', {
        path: '/order/',
        name: 'consult_detail',
        title: ''
    });
});


router.get('/invoice', function(req, res, next) {
    res.render('order/invoice', {
        path: '/order/',
        name: 'invoice',
        title: ''
    });
});

router.get('/tax_list', function(req, res, next) {
    res.render('order/tax_list', {
        path: '/order/',
        name: 'tax_list',
        title: ''
    });
});

router.get('/cashreceipt_list', function(req, res, next) {
    res.render('order/cashreceipt_list', {
        path: '/order/',
        name: 'cashreceipt_list',
        title: ''
    });
});

module.exports = router;