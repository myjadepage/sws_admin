var path = require('path');
var express = require('express');
var router = express.Router();
var fs = require('fs');


//제이슨 가짜정보만들기
//상품공급업체
router.get('/supply', function(req, res) {
    var filePath = path.join(__dirname, '../public/data/supply.json');
    var file = fs.readFileSync(filePath, 'utf8');
    var result = JSON.parse(file);
    res.send(result);
})


//------------------------->제이슨 가짜정보만들기

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        path: '/'
    });
});

module.exports = router;