const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const config = require('./webpack.config.js');
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, {
    useMongoClient: true,
    reconnectTries: 10000,
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongodb[error]'));
db.on('timeout', console.error.bind(console, 'mongodb[timeout]'));

var app = express();

const isDeveloping = process.env.NODE_ENV !== 'production';
if (isDeveloping) {
    const compiler = webpack(config);
    const middleware = webpackMiddleware(compiler, {
        publicPath: config.output.publicPath,
        contentBase: 'src',
        stats: {
            colors:         true,
            hash:           false,
            timings:        true,
            chunks:         false,
            chunkModules:   false,
            modules:        false,
        }
    });

    app.use(middleware);
    app.get('/', function response(req, res) {
        res.write(middleware.fileSystem.readFileSync(path.join(__dirname, 'dist/index.html')));
        res.end();
    });
} else {
    app.use(express.static(__dirname + '/dist'));
    app.get('/', function response(req, res) {
        res.sendFile(path.join(__dirname, 'dist/index.html'));
    });
}

// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', require('./routes/index'));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
