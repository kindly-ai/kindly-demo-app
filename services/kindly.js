var axios = require('axios');

/**
 * Kindly Service Class
 * Wrapper, export and initializer
 */

class Kindly {
    constructor(props) {
        this.api_key = props.API_KEY;
    }

    /**
     * Reply to chatmessage object
     * params(data)
     * data: {message: String, user_id: String}
     */

    reply(data) {
        axios.post(process.env.KINDLY_WEBHOOK_URL, {
            api_key: this.api_key,
            user_id: data.user_id,
            message: data.message,
        });
    }
};

module.exports = new Kindly({
    API_KEY: process.env.KINDLY_API_KEY,
});
