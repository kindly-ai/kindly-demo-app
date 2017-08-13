const webpack = require('webpack');
const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = {
    output: {
        path: path.join(__dirname, 'dist', 'prod')
    },
    plugins: [
        new Dotenv({path: "./.env.prod"}),
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                warnings: false
            }
        })
    ]
}
