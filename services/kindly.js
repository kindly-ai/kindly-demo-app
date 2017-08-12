var axios = require('axios');

/**
 * Kindly Service Class
 * Wrapper, export and initializer
 */

class Kindly {
    constructor(props) {
        // console.log(props);
    }

    /**
     * Reply to chatmessage object
     * params(data)
     * data: {message: String, user_id: String}
     */

    reply(data) {
        console.log("KINDLY HANDLE MESSAGE");
        console.log(data);

        axios
        .post(
            'http://192.168.1.3:3000/app/webhooks',
            {
                api_key: "BfjMxRtJWZD49PWcgU2A77LUwivBC4rjzXoFVwP9Fy4hzjGFMdxwToL1InsRhUta",
                user_id: data.user_id,
                message: data.message,
            }
        )
    }
};

module.exports = new Kindly({
    API_KEY: process.env.KINDLY_API_KEY,
});
