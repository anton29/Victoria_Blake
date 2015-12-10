process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var mongoose = require('./config/mongoose');
var express = require('./config/express');
var passport = require('./config/passport');
var db = mongoose();
var app = express();
var passport = passport();


require('./app/routes.js')(app);

  // Handle 404
  app.use(function(req, res) {
      res.status(400);
     res.render('404.ejs');
  });
  
  //Handle 500
  app.use(function(error, req, res, next) {
      res.status(500);
     res.render('500.ejs');
  });
app  = require('http').createServer(app);
app.listen(8080, function(err) {
        console.log(err, app.address());
});
// app.listen(8080);
module.exports = app;

console.log('server is running on localhost:8080');
