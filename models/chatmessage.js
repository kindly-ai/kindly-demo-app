var mongoose = require('mongoose');
var Schema = mongoose.Schema

let chatmessageSchema = Schema(
    {
        chat_id: String,
        message: String,
    },
    {
        collection: 'chatmessage',
    }
);

module.exports = mongoose.model('ChatMessage', chatmessageSchema);
