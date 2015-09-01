process.env.NODE_ENV = process.env.NODE_ENV || 'development';

//This is not needed
//var express  = require('express');
// var appv      = express(); 								// create our app w/ express
// var mongoose = require('mongoose'); 
// var database = require('./config/database'); 			// load the database config
// var morgan   = require('morgan');
// var bodyParser = require('body-parser');
// var methodOverride = require('method-override');


var mongoose1 = require('./config/mongoose');
var express1 = require('./config/express');
var passport = require('./config/passport');

var db = mongoose1();
var app = express1();
var passport = passport();


// This is not needed
// appv.use(morgan('dev')); // log every request to the console
// appv.use(bodyParser.urlencoded({'extended':'true'})); // parse application/x-www-form-urlencoded
// appv.use(bodyParser.json()); // parse application/json
// appv.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
// appv.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request




// routes ======================================================================
// API routes
require('./app/routes.js')(app);

app.listen(8080);
module.exports = app;

console.log('server is running on localhost:8080');
