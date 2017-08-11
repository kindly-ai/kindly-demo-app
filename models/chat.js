var mongoose = require('mongoose');
var Schema = mongoose.Schema

let chatSchema = Schema(
    {
        
    },
    {
        collection: 'chat',
    }
);

module.exports = mongoose.model('Chat', chatSchema);
