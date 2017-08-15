var express = require('express');
var models = require('../models');
var router = express.Router();

router.post('/', function(req, res) {
    res.json({});

    let reply = new models.ChatMessage({
        chat_id: req.body.user_id,
        message: req.body.message,
        from_bot: true,
        buttons: req.body.buttons,
    });
    reply.save();

    req.io.sockets.emit('chatmessage-' + reply.chat_id, reply);
});

module.exports = router;
