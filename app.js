const debug = require('debug')('kindly-app-js:server');
const http = require('http');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const config = require('./webpack.config.js');
const mongoose = require('mongoose');

/**
 * Start app
 */

const app = express();
const port = (process.env.PORT || 5000);
app.set('port', port);
const server = http.createServer(app);
server.listen(port);

/**
 * Connect to MongoDB
 */

mongoose.connect(process.env.MONGODB_URI, {
    useMongoClient: true,
    reconnectTries: 10000,
});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongodb[error]'));
db.on('timeout', console.error.bind(console, 'mongodb[timeout]'));

/**
 * Start webpack
 */

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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/**
 * WebSocket connections
 */

const io = require('socket.io')(server);
io.on('connection', function(socket){
    // console.log(socket);
    // console.log("LOLz");
});

// Make io accessible to our router
app.use(function(req, res, next){
    req.io = io;
    next();
});

/**
 * Include API routes
 */

app.use('/', require('./routes/index'));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

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

server.on('error', function (error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
        console.error(bind + ' requires elevated privileges');
        process.exit(1);
        break;
        case 'EADDRINUSE':
        console.error(bind + ' is already in use');
        process.exit(1);
        break;
        default:
        throw error;
    }
});
server.on('listening', function () {
    var addr = server.address();
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    debug('Listening on ' + bind);
});
