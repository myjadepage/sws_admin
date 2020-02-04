var path = require('path');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('member/index', {
        path: '/member/'
    });
});

router.get('/config_member', function(req, res, next) {
    res.render('member/config_member', {
        path: '/member/'
    });
});

router.get('/member_list', function(req, res, next) {
    res.render('member/member_list', {
        path: '/member/'
    });
});

router.get('/member_delete', function(req, res, next) {
    res.render('member/member_delete', {
        path: '/member/'
    });
});


router.get('/member_buy_list', function(req, res, next) {
    res.render('member/member_buy_list', {
        path: '/member/'
    });
});

router.get('/member_mailing', function(req, res, next) {
    res.render('member/member_mailing', {
        path: '/member/'
    });
});


module.exports = router;