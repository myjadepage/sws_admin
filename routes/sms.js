var path = require('path');
var express = require('express');
var router = express.Router();

router.get('/config', function(req, res, next) {
    res.render('sms/config', {
        path: '/management/'
    });
});

router.get('/ment_manage', function(req, res, next) {
    res.render('sms/ment_manage', {
        path: '/management/'
    });
});

router.get('/emoticon_manage', function(req, res, next) {
    res.render('sms/emoticon_manage', {
        path: '/management/'
    });
});

router.get('/emoticon_manage_reg', function(req, res, next) {
    res.render('sms/emoticon_manage_reg', {
        path: '/management/'
    });
});


module.exports = router;