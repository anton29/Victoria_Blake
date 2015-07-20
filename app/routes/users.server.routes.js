var users = require('../../app/controllers/users.server.controller');
var product = require('../../app/controllers/product.server.controller');
var passport = require('passport');






module.exports = function(app){
    //app.set('views', __dirname + 'app/views');
    //app.set('view engine', 'ejs');  
    // app.engine('html', require('ejs').renderFile);
    // app.route('/product')
    //     .get('/product', function (req, res)
    // {
    //     res.render('product.html');
    // });


    app.route('/users')
        .post(users.create)     //post to create
        .get(users.list);       //get to find the list of users

    app.route('/users/:userId')
        .get(users.read)        //get single user by id //app.route('/users/:userId').get(users.read);
        .put(users.update)      //update single user by id //app.route('/users/:userId').put(users.update);
        .delete(users.delete);  //delete single user by id //app.route('/users/:userId').delete(users.delete);
    
    app.param('userId', users.userByID); //to get single user by id
    
    app.route('/product')
       // console.log("route /product was called")
        // .get(product.render);
        .get(users.renderProduct)

    app.route('/test')
        //console.log("product Id  route was called")
        .get(users.renderTest)

    app.route('/product/:product_id') 
        .get(users.renderProductId)
           // _id : req.params.product_id
    
    app.route('/about')
        .get(users.renderAbout)

    app.route('/contact')
        .get(users.renderContact)

    app.route('/testimonial')
        .get(users.renderTestimonial)

    app.route('/admin')
        .get(users.renderAdmin)

    app.route('/cart')
        .get(users.renderCart)

    app.route('/signup')
        .get(users.renderSignup)
        .post(users.signup);
    
    app.route('/signin')
        .get(users.renderSignin)
        .post(passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/signin',
            failureFlash: true
        }));
        
    app.get('/signout', users.signout);
    
    app.get('/oauth/facebook', passport.authenticate('facebook', {  //starts the authentication process
        failureRedirect: '/signin'
    }));
    
    app.get('/oauth/facebook/callback', passport.authenticate('facebook', { //finishes the authentication process
        failureRedirect: '/signin',
        successRedirect: '/'
    }));
    
        app.get('/oauth/google', passport.authenticate('google', {  //starts the authentication process
        failureRedirect: '/signin',
        scope:[
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email'
        ]
    }));
    
    app.get('/oauth2callback', passport.authenticate('google', { //finishes the authentication process
        failureRedirect: '/signin',
        successRedirect: '/'
    }));
};

