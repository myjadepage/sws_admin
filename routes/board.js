var path = require('path');
var express = require('express');
var router = express.Router();

router.get('/list', function(req, res, next) {
    res.render('board/list');
});

router.get('/write', function(req, res, next) {
    res.render('board/write');
});


module.exports = router;