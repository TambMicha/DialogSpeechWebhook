var express 		= require('express'),
	path 			= require('path'),
	logger 			= require('morgan'),
	bodyParser 		= require('body-parser'),
//	mongoose 		= require('mongoose'),
	expressSession 	= require('express-session');

/// Database
// require('./config/database')(mongoose);

function handleError(req, res, statusCode, message){
	res.status(statusCode);
	res.json(message);
}

/// Routes
var indexRoute = require('./routes/index');
var dialogflowRoute = require('./routes/dialogflow')

var app = express();
app.use(express.static(path.join(__dirname, 'public')));

/// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json({
	limit: "200mb"
}));
app.use(bodyParser.urlencoded({ extended: false, limit: "200mb" }));

app.use(expressSession({secret: "tamspeechook", saveUninitialized: true, resave: false}));

// Assign route address to route location
app.use('/', indexRoute);
app.use('/webhook', dialogflowRoute)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
	app.use(function(err, req, res, next) {
		res.status(err.status || 500);
		res.render('AppError', {
			title: 'Error - Something went wrong',
			pageTitle: 'Error - Something went wrong',
			message: err.message,
			error: err
		});
	});
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	res.render('appError', {
		title: 'Error - Something went wrong',
		pageTitle: 'Error - Something went wrong',
		message: err.message,
		error: err
	});
});

module.exports = app;