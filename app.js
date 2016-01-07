var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var expressSession = require('express-session');
var flash = require('connect-flash');
var app = express();
var exphbs  = require('express-handlebars');
var hbs = exphbs.create({});
var initializePassport = require('./passport/index');
var routes = require('./routes/index')(passport);
var JexiaClient = require('jexia-sdk-js').JexiaClient;
var jexiaClientConfig = require('./config/jexia');

// Create a new jexia client for this app
var client = new JexiaClient(jexiaClientConfig).then(function(dataApp) {
    app.set('views', path.join(__dirname, 'views'));
    app.engine('handlebars', exphbs({defaultLayout: 'main'}));
    app.set('view engine', 'handlebars');
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(expressSession({
        secret: 'thesecretkey',
        resave: true,
        saveUninitialized: true
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(flash());

    initializePassport(passport, dataApp);

    app.use('/', routes);

    // 404
    app.use(function(req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    if (app.get('env') === 'development') {
        app.use(function(err, req, res, next) {
            res.status(err.status || 500);
            res.render('error', {
                message: err.message,
                error: err
            });
        });
    }

    // Start the server
    var port = process.env.PORT || 3000;
    app.listen(port, function () {
        console.log("Listening on port " + port);
    });
});
