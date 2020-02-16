var path = require('path');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('statistics/index', {
        path: '/statistics/',
        name: '/',
        title: ''
    });
});

router.get('/sale_total', function(req, res, next) {
    res.render('statistics/sale_total', {
        path: '/statistics/',
        name: 'sale_total',
        title: ''
    });
});

router.get('/sale_goods', function(req, res, next) {
    res.render('statistics/sale_goods', {
        path: '/statistics/',
        name: 'sale_goods',
        title: ''
    });
});

router.get('/sale_member', function(req, res, next) {
    res.render('statistics/sale_member', {
        path: '/statistics/',
        name: 'sale_member',
        title: ''
    });
});


router.get('/member_gender', function(req, res, next) {
    res.render('statistics/member_gender', {
        path: '/statistics/',
        name: 'member_gender',
        title: ''
    });
});

router.get('/member_age', function(req, res, next) {
    res.render('statistics/member_age', {
        path: '/statistics/',
        name: 'member_age',
        title: ''
    });
});


router.get('/member_area', function(req, res, next) {
    res.render('statistics/member_area', {
        path: '/statistics/',
        name: 'member_area',
        title: ''
    });
});

router.get('/visit_count', function(req, res, next) {
    res.render('statistics/visit_count', {
        path: '/statistics/',
        name: 'visit_count',
        title: ''
    });
});

router.get('/visit_fromsite', function(req, res, next) {
    res.render('statistics/visit_fromsite', {
        path: '/statistics/',
        name: 'visit_fromsite',
        title: ''
    });
});


router.get('/goods_total', function(req, res, next) {
    res.render('statistics/goods_total', {
        path: '/statistics/',
        name: 'goods_total',
        title: ''
    });
});


router.get('/goods_wish', function(req, res, next) {
    res.render('statistics/goods_wish', {
        path: '/statistics/',
        name: 'goods_wish',
        title: ''
    });
});


router.get('/goods_marks', function(req, res, next) {
    res.render('statistics/goods_marks', {
        path: '/statistics/',
        name: 'goods_marks',
        title: ''
    });
});
router.get('/marketing_useCmoney', function(req, res, next) {
    res.render('statistics/marketing_useCmoney', {
        path: '/statistics/',
        name: 'marketing_useCmoney',
        title: ''
    });
});


module.exports = router;