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

router.post('/goodsIcons', function(req, res) {
    var filePath = path.join(__dirname, '../public/data/goodsIcons.json');
    var file = fs.readFileSync(filePath, 'utf8');
    var result = JSON.parse(file);
    res.send(result);
})

router.get('/brands', function(req, res, next) {
    res.json({
        "jsonData": {
            "brands": [{
                    "brandSysId": 1,
                    "brandCode": "B000001",
                    "name": "A브랜드",
                    "sellerSysId": 2
                },
                {
                    "brandSysId": 2,
                    "brandCode": "B000002",
                    "name": "B브랜드",
                    "sellerSysId": 3
                }
            ]
        }
    });
})
router.get('/categories/:categoryLevel', function(req, res, next) {
    var categoryLevel = req.params.categoryLevel;
    var parentSysId = req.params.parentSysId;
    res.json({
        "categoryLevel": categoryLevel,
        "jsonData": {
            "categories": [{
                    "categorySysId": 1,
                    "categoryCode": "CG00000001",
                    "name": "OUTER",
                    "feeRate": 0.2,
                    "isHide": false,
                    "topDesignHTML": "",
                    "isApplyChildCategory": false,
                    "parentSysId": parentSysId
                },
                {
                    "categorySysId": 2,
                    "categoryCode": "CG00000003",
                    "name": "TOP",
                    "feeRate": 0.3,
                    "isHide": false,
                    "topDesignHTML": "",
                    "isApplyChildCategory": false,
                    "parentSysId": parentSysId
                }
            ]
        }
    });
})

//------------------------->제이슨 가짜정보만들기

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        path: '/'
    });
});

module.exports = router;