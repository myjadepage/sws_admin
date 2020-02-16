var path = require('path');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('account/index', {
        path: '/account/',
        name: '/',
        title: ''

    });
});

router.get('/account', function(req, res, next) {
    res.render('account/account', {
        path: '/account/',
        name: 'account',
        title: ''
    });
});


router.get('/dealer_account', function(req, res, next) {
    res.render('account/dealer_account', {
        path: '/account/',
        name: 'dealer_account',
        title: ''
    });
});


module.exports = router;