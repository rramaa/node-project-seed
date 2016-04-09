var express = require('express'),
    path = require('path'),
    morgan = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    hbs = require('express-hbs'),
    validator = require('express-validator'),
    middleware = require('./middleware'),
    helpers = require('./helpers'),
    routes = require('./routes'),
    app = express();
require('dotenv').config({path: path.join(__dirname,"../.env")});//Environment dependent configurations

// view engine setup
app.engine('hbs', hbs.express3({
    partialsDir: path.join(__dirname, 'views/partials')
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
helpers.registerSiteHelpers(hbs);

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use(validator());



// Static assets
app.use('/vendors', express.static(path.join(__dirname, '../bower_components')));
app.use('/shared', express.static(path.join(__dirname, '../shared')));
app.use('/images', express.static(path.join(__dirname, '../client/assets/images')));
if (typeof process.env.NODE_ENV === "undefined" || process.env.NODE_ENV == 'development') {
    app.use('/js', express.static(path.join(__dirname, '../dev/scripts')));
    app.use('/css', express.static(path.join(__dirname, '../dev/css')));
} else {
    app.use('/js', express.static(path.join(__dirname, '../dist/scripts')));
    app.use('/css', express.static(path.join(__dirname, '../dist/css')));
}
app.use('/', routes);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('The resource you are looking for does not exists');
    err.status = 404;
    next(err);
});

/// error handlers


if (process.env.NODE_ENV == 'development') {
    // development error handler
    // will print stacktrace
    if (app.get('env') === 'development') {
        app.use(function(err, req, res, next) {
            if (err.status != 404) {
                console.log('request error dev', err ? err.message : err, err ? err.stack : '');
            }
            res.status(err.status || 500);
            res.render('error', {
                message: err.message,
                title: "Error " + err.status,
                error: err,
                homeUrl: process.env.HOME_URL + ":" + process.env.PORT
            });
        });
    }
} else {
    // production error handler
    // no stacktraces leaked to user
    app.use(function(err, req, res, next) {
        console.log('request error prod', err ? err.message : err, err ? err.stack : '');
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: {}
        });
    });
}
module.exports = app;
