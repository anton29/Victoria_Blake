var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('mongoose').model('User');

module.exports = function(){
    passport.use(new LocalStrategy(function(username, password, done){ //register the Strategy with passport.use
            //console.log(user)
            console.log(username)
        User.findOne({
            username: username
        }, function(err, user){
            if(err){
                return done(err);
            }
            if (!user){
                return done(null, false, {
                    message: 'Unknown user'
                });
            }
            if(username !== "admin"){
                return done(null,false, {
                    message: 'Unknown user'
                });
            }
            if (!user.authenticate(password)) {
                return done(null, false, {
                    message: 'Invalid password'
                });
            }
            
            return done(null, user);
        });
    }));
};