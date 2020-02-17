var path = require('path');
var express = require('express');
var router = express.Router();

router.get('/config', function(req, res, next) {
    res.render('sms/config', {
        path: '/management/',
        name: 'config',
        title: '환경설정'
    });
});

router.get('/ment_manage', function(req, res, next) {
    res.render('sms/ment_manage', {
        path: '/management/',
        name: 'ment_manage',
        title: '환경설정'
    });
});

router.get('/emoticon_manage', function(req, res, next) {
    res.render('sms/emoticon_manage', {
        path: '/management/',
        name: 'emoticon_manage',
        title: '환경설정'
    });
});

router.get('/emoticon_manage_reg', function(req, res, next) {
    res.render('sms/emoticon_manage_reg', {
        path: '/management/',
        name: 'emoticon_manage',
        title: '환경설정'
    });
});


module.exports = router;