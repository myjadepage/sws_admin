var path = require('path');
var express = require('express');
var router = express.Router();
var fs = require('fs');
var multer = require('multer');

fs.readdir('uploads', function(error) {
    if (error) {
        console.error('uploads 폴더가 없어 폴더를 생성합니다.');
        fs.mkdirSync('uploads');
    }
});
var upload = multer({
    storage: multer.diskStorage({
        destination(req, file, cb) {
            cb(null, 'uploads/');

        },
        filename(req, file, cb) {
            var ext = path.extname(file.originalname);
            cb(null, path.basename(file.originalname, ext) + new Date().valueOf() + ext);
        }
    }),
    limits: { fileSize: 5 * 1024 * 1024 },
});
router.post('/upload', upload.single('img'), function(req, res) {
    console.log(req.file);
    res.json({ url: `/upload/${req.file.filename}` });
});






router.get('/', function(req, res, next) {
    res.render('setup/index', {
        path: '/setup/',
        name: '/',
        title: '환경설정'
    });
});

router.get('/config_manager', function(req, res, next) {
    res.render('setup/config_manager', {
        path: '/setup/',
        name: 'config_manager',
        title: '상점환경설정'
    });
});

router.get('/config_site', function(req, res, next) {
    res.render('setup/config_site', {
        path: '/setup/',
        name: 'config_site',
        title: '사이트환경설정'
    });
});

router.get('/config_dealer', function(req, res, next) {
    res.render('setup/config_dealer', {
        path: '/setup/',
        name: 'config_dealer',
        title: '판매자 승인환경설정'
    });
});

router.get('/config_vocab', function(req, res, next) {
    res.render('setup/config_vocab', {
        path: '/setup/',
        name: 'config_vocab',
        title: '어휘설정'
    });
});

router.get('/config_delivery', function(req, res, next) {
    res.render('setup/config_delivery', {
        path: '/setup/',
        name: 'config_delivery',
        title: '배송설정'
    });
});

router.get('/config_discount', function(req, res, next) {
    res.render('setup/config_discount', {
        path: '/setup/',
        name: 'config_discount',
        title: '할인액부담설정'
    });
});

router.get('/member_level', function(req, res, next) {
    res.render('setup/member_level', {
        path: '/setup/',
        name: 'member_level',
        title: '회원등급관리'
    });
});

router.get('/member_level_reg', function(req, res, next) {
    res.render('setup/member_level_reg', {
        path: '/setup/',
        name: 'member_level',
        title: '회원등급관리'
    });
});


router.get('/config_cmoney', function(req, res, next) {
    res.render('setup/config_cmoney', {
        path: '/setup/',
        name: 'config_cmoney',
        title: '적립금 설정'
    });
});

router.get('/notify_tpl', function(req, res, next) {
    res.render('setup/notify_tpl', {
        path: '/setup/',
        name: 'notify_tpl',
        title: '상품정보고시관리'
    });
});

router.get('/notify_tpl_reg', function(req, res, next) {
    res.render('setup/notify_tpl_reg', {
        path: '/setup/',
        name: 'notify_tpl',
        title: '상품정보고시관리'
    });
});

router.get('/manager_list', function(req, res, next) {
    res.render('setup/manager_list', {
        path: '/setup/',
        name: 'manager_list',
        title: '부운영자관리'
    });
});

router.get('/manager_reg', function(req, res, next) {
    res.render('setup/manager_reg', {
        path: '/setup/',
        name: 'manager_list',
        title: '부운영자관리'
    });
});

router.get('/config_policy', function(req, res, next) {
    res.render('setup/config_policy', {
        path: '/setup/',
        name: 'config_policy',
        title: '상점운영정책'
    });
});

router.get('/config_policy_reg/:id', function(req, res, next) {
    var id = req.params.id;
    res.render('setup/config_policy_reg', {
        path: '/setup/',
        name: 'config_policy_reg/' + id,
        title: '상점운영정책',
        id: id

    });
});

router.get('/config_terms_history/:code', function(req, res, next) {
    var code = req.params.code;
    res.render('setup/config_terms_history', {
        path: '/setup/',
        name: 'config_terms_history/' + code,
        title: '회원이용약관',
        code: code
    });
});

router.get('/config_terms_history_reg', function(req, res, next) {
    res.render('setup/config_terms_history_reg', {
        path: '/setup/',
        name: 'config_terms_history',
        title: '상점운영정책'
    });
});

router.get('/config_terms_history_reg/:code', function(req, res, next) {
    var code = req.params.code;
    res.render('setup/config_terms_history_reg', {
        path: '/setup/',
        name: 'config_terms_history_reg/' + code,
        title: '회원이용약관',
        code: code
    });
});


router.get('/config_pay', function(req, res, next) {
    res.render('setup/config_pay', {
        path: '/setup/',
        name: 'config_pay',
        title: '결제정보설정'
    });
});

router.get('/config_pay_online', function(req, res, next) {
    res.render('setup/config_pay_online', {
        path: '/setup/',
        name: 'config_pay_online',
        title: '온라인입금계좌'
    });
});

router.get('/config_kakaopay', function(req, res, next) {
    res.render('setup/config_kakaopay', {
        path: '/setup/',
        name: 'config_kakaopay',
        title: '카카오페이 결제정보설정'
    });
});

router.get('/config_payco', function(req, res, next) {
    res.render('setup/config_payco', {
        path: '/setup/',
        name: 'config_payco',
        title: 'PAYCO 결제정보설정'
    });
});



module.exports = router;