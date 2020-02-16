var path = require('path');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('member/index', {
        path: '/member/',
        name: 'board_manage_reg',
        title: ''
    });
});

router.get('/config_member', function(req, res, next) {
    res.render('member/config_member', {
        path: '/member/',
        name: 'board_manage_reg',
        title: ''
    });
});

router.get('/member_list', function(req, res, next) {
    res.render('member/member_list', {
        path: '/member/',
        name: 'board_manage_reg',
        title: ''
    });
});

router.get('/member_delete', function(req, res, next) {
    res.render('member/member_delete', {
        path: '/member/',
        name: 'board_manage_reg',
        title: ''
    });
});


router.get('/member_buy_list', function(req, res, next) {
    res.render('member/member_buy_list', {
        path: '/member/',
        name: 'board_manage_reg',
        title: ''
    });
});

router.get('/member_mailing', function(req, res, next) {
    res.render('member/member_mailing', {
        path: '/member/',
        name: 'board_manage_reg',
        title: ''
    });
});


module.exports = router;