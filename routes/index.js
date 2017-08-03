var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('index', { title: 'Demo' });
});

router.post('/kindly/webhooks', function(req, res) {
    console.log(req.body);
    res.json({});
});

module.exports = router;
