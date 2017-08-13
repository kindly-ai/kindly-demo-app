var express = require('express');
var models = require('../models');
var router = express.Router();
var kindly = require('../services/kindly');

router.get('/chatmessages', function(req, res) {
    models.ChatMessage.find({}, function(err, chatmessages) {
        res.json(chatmessages);
    });
});

router.post('/chatmessage', function(req, res) {
    res.json({});

    /**
     * Application specific message-handling
     */

    let chatmessage = new models.ChatMessage({
        chat_id: req.body.chat_id,
        message: req.body.message,
        from_bot: false,
    });
    chatmessage.save();
    req.io.sockets.emit('chatmessage', chatmessage);

    /**
     * Get reply from Kindly
     */

    kindly.reply({
        user_id: chatmessage.chat_id,
        exchange_id: req.body.exchange_id,
        message: chatmessage.message,
    });
});

module.exports = router;
