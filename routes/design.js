var path = require('path');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('design/index', {
        path: '/design/'
    });
});

router.get('/site', function(req, res, next) {
    res.render('design/site', {
        path: '/design/'
    });
});

router.get('/topper', function(req, res, next) {
    res.render('design/topper', {
        path: '/design/'
    });
});

router.get('/footer', function(req, res, next) {
    res.render('design/footer', {
        path: '/design/'
    });
});

router.get('/main', function(req, res, next) {
    res.render('design/main', {
        path: '/design/'
    });
});

router.get('/main_style', function(req, res, next) {
    res.render('design/main_style', {
        path: '/design/'
    });
});

router.get('/main_style_reg', function(req, res, next) {
    res.render('design/main_style_reg', {
        path: '/design/'
    });
});

router.get('/banner', function(req, res, next) {
    res.render('design/banner', {
        path: '/design/'
    });
});

router.get('/event_list', function(req, res, next) {
    res.render('design/event_list', {
        path: '/design/'
    });
});

router.get('/event_reg', function(req, res, next) {
    res.render('design/event_reg', {
        path: '/design/'
    });
});

router.get('/leftmenu', function(req, res, next) {
    res.render('design/leftmenu', {
        path: '/design/'
    });
});

router.get('/leftmenu_reg', function(req, res, next) {
    res.render('design/leftmenu_reg', {
        path: '/design/'
    });
});

router.get('/pagemaker', function(req, res, next) {
    res.render('design/pagemaker', {
        path: '/design/'
    });
});

router.get('/mail_form', function(req, res, next) {
    res.render('design/mail_form', {
        path: '/design/'
    });
});

router.get('/popup', function(req, res, next) {
    res.render('design/popup', {
        path: '/design/'
    });
});

router.get('/popup_reg', function(req, res, next) {
    res.render('design/popup_reg', {
        path: '/design/'
    });
});

module.exports = router;