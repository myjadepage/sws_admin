var path = require('path');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('design/index', {
        path: '/design/',
        name: '/',
        title: ''
    });
});

router.get('/site', function(req, res, next) {
    res.render('design/site', {
        path: '/design/',
        name: 'site',
        title: ''
    });
});

router.get('/topper', function(req, res, next) {
    res.render('design/topper', {
        path: '/design/',
        name: 'topper',
        title: ''
    });
});

router.get('/footer', function(req, res, next) {
    res.render('design/footer', {
        path: '/design/',
        name: 'footer',
        title: ''
    });
});

router.get('/main', function(req, res, next) {
    res.render('design/main', {
        path: '/design/',
        name: 'main',
        title: ''
    });
});

router.get('/main_style', function(req, res, next) {
    res.render('design/main_style', {
        path: '/design/',
        name: 'main_style',
        title: ''
    });
});

router.get('/main_style_reg', function(req, res, next) {
    res.render('design/main_style_reg', {
        path: '/design/',
        name: 'main_style_reg',
        title: ''
    });
});

router.get('/banner', function(req, res, next) {
    res.render('design/banner', {
        path: '/design/',
        name: 'banner',
        title: ''
    });
});

router.get('/event_list', function(req, res, next) {
    res.render('design/event_list', {
        path: '/design/',
        name: 'event_list',
        title: ''
    });
});

router.get('/event_reg', function(req, res, next) {
    res.render('design/event_reg', {
        path: '/design/',
        name: 'event_reg',
        title: ''
    });
});

router.get('/leftmenu', function(req, res, next) {
    res.render('design/leftmenu', {
        path: '/design/',
        name: 'leftmenu',
        title: ''
    });
});

router.get('/leftmenu_reg', function(req, res, next) {
    res.render('design/leftmenu_reg', {
        path: '/design/',
        name: 'leftmenu_reg',
        title: ''
    });
});

router.get('/pagemaker', function(req, res, next) {
    res.render('design/pagemaker', {
        path: '/design/',
        name: 'pagemaker',
        title: ''
    });
});

router.get('/mail_form', function(req, res, next) {
    res.render('design/mail_form', {
        path: '/design/',
        name: 'mail_form',
        title: ''
    });
});

router.get('/popup', function(req, res, next) {
    res.render('design/popup', {
        path: '/design/',
        name: 'popup',
        title: ''
    });
});

router.get('/popup_reg', function(req, res, next) {
    res.render('design/popup_reg', {
        path: '/design/',
        name: 'popup_reg',
        title: ''
    });
});

module.exports = router;