var path = require('path');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('order/index', {
        path: '/order/'
    });
});

router.get('/order_list', function(req, res, next) {
    res.render('order/order_list', {
        path: '/order/'
    });
});

router.get('/consult_list', function(req, res, next) {
    res.render('order/consult_list', {
        path: '/order/'
    });
});

router.get('/consult_detail', function(req, res, next) {
    res.render('order/consult_detail', {
        path: '/order/'
    });
});


router.get('/invoice', function(req, res, next) {
    res.render('order/invoice', {
        path: '/order/'
    });
});

router.get('/tax_list', function(req, res, next) {
    res.render('order/tax_list', {
        path: '/order/'
    });
});

router.get('/cashreceipt_list', function(req, res, next) {
    res.render('order/cashreceipt_list', {
        path: '/order/'
    });
});

module.exports = router;