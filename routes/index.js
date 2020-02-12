var path = require('path');
var express = require('express');
var router = express.Router();
var fs = require('fs');
var multer = require('multer');

//제이슨 가짜정보만들기
//상품공급업체
router.get('/supply', function(req, res) {
    var filePath = path.join(__dirname, '../public/data/supply.json');
    var file = fs.readFileSync(filePath, 'utf8');
    var result = JSON.parse(file);
    res.send(result);
})

router.post('/upload', function(req, res) {
    var filePath = path.join(__dirname, '/upload');
    var file = fs.readFileSync(filePath, 'utf8');
    var result = JSON.parse(file);
    res.send(result);
})



router.post('/file', function(req, res) {
    var upload = multer({ storage: storage }).single('bigImage');
    upload(req, res, function(err) {
        if (err) {
            return res.end("Error uploading file.");
        }
        res.end("File is uploaded");
    });
})
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        fs.mkdir('./uploads', function(err) {
            if (err) {
                console.log(err.stack)
            } else {
                callback(null, './uploads');
            }
        })
    },
    filename: function(req, file, cb) {
        callback(null, file.fieldname + '-' + Date.now());
    }
});

// var upload = function(req, res) {
//     var deferred = Q.defer();
//     var storage = multer.diskStorage({

//         destination: function(req, file, cb) {
//             cb(null, imagePath);
//         },

//         filename: function(req, file, cb) {
//             file.uploadedFile = {
//                 name: req.params.filename,
//                 ext: file.mimetype.split('/')[1]
//             };
//             cb(null, file.uploadedFile.name + '.' + file.upload.ext);
//         }
//     });
//     var upload = multer({ storage: storage }).single('file');
//     upload(req, res, function(err) {
//         if (err) deferred.reject();
//         else deferred.resolve(req.file.uploadedFile);
//     });
//     return deferred.promise;
// }

//------------------------->제이슨 가짜정보만들기

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        path: '/'
    });
});

module.exports = router;