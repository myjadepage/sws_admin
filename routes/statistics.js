var path = require('path');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('statistics/index', {
        path: '/statistics/'
    });
});

router.get('/sale_total', function(req, res, next) {
    res.render('statistics/sale_total', {
        path: '/statistics/'
    });
});

router.get('/sale_goods', function(req, res, next) {
    res.render('statistics/sale_goods', {
        path: '/statistics/'
    });
});

router.get('/sale_member', function(req, res, next) {
    res.render('statistics/sale_member', {
        path: '/statistics/'
    });
});


router.get('/member_gender', function(req, res, next) {
    res.render('statistics/member_gender', {
        path: '/statistics/'
    });
});

router.get('/member_age', function(req, res, next) {
    res.render('statistics/member_age', {
        path: '/statistics/'
    });
});


router.get('/member_area', function(req, res, next) {
    res.render('statistics/member_area', {
        path: '/statistics/'
    });
});

router.get('/visit_count', function(req, res, next) {
    res.render('statistics/visit_count', {
        path: '/statistics/'
    });
});

router.get('/visit_fromsite', function(req, res, next) {
    res.render('statistics/visit_fromsite', {
        path: '/statistics/'
    });
});


router.get('/goods_total', function(req, res, next) {
    res.render('statistics/goods_total', {
        path: '/statistics/'
    });
});


router.get('/goods_wish', function(req, res, next) {
    res.render('statistics/goods_wish', {
        path: '/statistics/'
    });
});


router.get('/goods_marks', function(req, res, next) {
    res.render('statistics/goods_marks', {
        path: '/statistics/'
    });
});
router.get('/marketing_useCmoney', function(req, res, next) {
    res.render('statistics/marketing_useCmoney', {
        path: '/statistics/'
    });
});


module.exports = router;