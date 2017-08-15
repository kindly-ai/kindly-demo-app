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
        axios.post(process.env.KINDLY_API_HOST + '/api/v1/send', {
            api_key:        this.api_key,
            user_id:        data.user_id,
            message:        data.message,
            exchange_id:    data.exchange_id,
        }).catch((error) => {
            console.trace(error);
        });
    }
};

module.exports = new Kindly({
    API_KEY: process.env.KINDLY_API_KEY,
});
