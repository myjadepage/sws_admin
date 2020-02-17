var path = require('path');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('member/index', {
        path: '/member/',
        name: '/',
        title: ''
    });
});

router.get('/config_member', function(req, res, next) {
    res.render('member/config_member', {
        path: '/member/',
        name: 'config_member',
        title: ''
    });
});

router.get('/member_list', function(req, res, next) {
    res.render('member/member_list', {
        path: '/member/',
        name: 'member_list',
        title: ''
    });
});

router.get('/member_delete', function(req, res, next) {
    res.render('member/member_delete', {
        path: '/member/',
        name: 'member_delete',
        title: ''
    });
});


router.get('/member_buy_list', function(req, res, next) {
    res.render('member/member_buy_list', {
        path: '/member/',
        name: 'member_buy_list',
        title: ''
    });
});

router.get('/member_mailing', function(req, res, next) {
    res.render('member/member_mailing', {
        path: '/member/',
        name: 'member_mailing',
        title: ''
    });
});


module.exports = router;