var mongoose = require('mongoose');
var Schema = mongoose.Schema

let chatmessageSchema = Schema(
    {
        chat_id: String,
        message: String,
        from_bot: Boolean,
    },
    {
        collection: 'chatmessage',
    }
);

module.exports = mongoose.model('ChatMessage', chatmessageSchema);
