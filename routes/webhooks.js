var express = require('express');
var models = require('../models');
var router = express.Router();

router.post('/', function(req, res) {
    res.json({});
    
    let reply = new models.ChatMessage({
        chat_id: req.body.user_id,
        message: req.body.message,
        from_bot: true,
    });
    reply.save();

    req.io.sockets.emit('chatmessage', reply);
});

module.exports = router;
