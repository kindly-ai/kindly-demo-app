/**
 * Kindly Service Class
 * Wrapper, export and initializer
 */

class Kindly {
    constructor(props) {
        console.log(props);
    }

    /**
     * Reply to chatmessage object
     * params(data)
     * data: {message: String, user_id: String}
     */

    reply(data) {
        console.log("KINDLY HANDLE MESSAGE");
        console.log(data);
        // return new Promise((fulfill, reject) => {
        //     fulfill({message: "LOL!"});
        // });
    }
};

module.exports = new Kindly({
    API_KEY: process.env.KINDLY_API_KEY,
});
