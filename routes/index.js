var express = require('express');
var models = require('../models');
var router = express.Router();

router.post('/kindly/webhooks', function(req, res) {
    console.log(req.body);
    res.json({});
});
router.get('/chatmessages', function(req, res) {
    models.ChatMessage.find({}, function(err, chatmessages) {
        res.json(chatmessages);
    });
});
router.post('/chatmessage', function(req, res) {
    res.json({});

    let chatmessage = new models.ChatMessage({
        chat_id: req.body.chat_id,
        message: req.body.message,
        from_bot: false,
    });
    chatmessage.save();

    let chatmessage_reply = new models.ChatMessage({
        chat_id: req.body.chat_id,
        message: "This is a reply to the very silly message '" + req.body.message + "' from some user",
        from_bot: true,
    });
    chatmessage_reply.save();
});

module.exports = router;
