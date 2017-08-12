var express = require('express');
var models = require('../models');
var router = express.Router();

router.post('/', function(req, res) {
    console.log("RESPONSE FROM KINDLY WEBHOOK");
    console.log(req.body);
    res.json({});
});

module.exports = router;
