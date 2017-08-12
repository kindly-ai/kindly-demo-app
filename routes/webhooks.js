var express = require('express');
var models = require('../models');
var router = express.Router();

router.post('/kindly/webhooks', function(req, res) {
    console.log(req.body);
    res.json({});
});

module.exports = router;
