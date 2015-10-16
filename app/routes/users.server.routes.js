var users = require('../../app/controllers/users.server.controller');
var passport = require('passport');
// var core = require('../controllers/core.server.controller');
//var core = require('../controllers/core.server.controller');
var nodemailer = require("nodemailer");

/*-----------------SMPT----------------------------------*/

var smtpTransport = nodemailer.createTransport("SMTP",{
    service: "Gmail",
    auth: {
        user: "test128892@gmail.com",
        pass: "test?1992"
    }
});

/*------------------SMTP End-----------------------------*/

    // var index = function(req, res){
    //     res.render('index.ejs');
    // };

module.exports = function(app){
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

    app.route('/test')
        .get(users.renderSignIn)

    app.route('/product/:product_id') 
        .get(users.renderProductId)
           // _id : req.params.product_id
    
    app.route('/about')
        .get(users.renderAbout)

    // addede .post(core.sendMail);
    app.route('/contact')//.post(core.sendMail);
        .get(users.renderContact)

    app.route('/reserve/:product_id')
        .get(users.renderReserve)

    app.route('/testimonial')
        .get(users.renderTestimonial)

     app.route('/admin')
          .get(users.renderAdmin)

    app.route('/cart')
        .get(users.renderCart)

    app.route('/messageCandles')
        .get(users.renderMessageCandles) 

    app.route('/pearlJewelry')
        .get(users.renderPearlJewelry)

    app.route('/preciousStones')
        .get(users.renderPreciousStones) 

    app.route('/statementNecklaces')
        .get(users.renderStatementNecklaces) 

    app.route('/customNecklace')
        .get(users.renderCustomNecklace)

    app.route('/social')
        .get(users.renderSocial)

    app.route('/signup')
        .get(users.renderSignup)
        .post(users.signup);
    
    app.route('/signin')
        .get(users.renderSignin)
        .post(passport.authenticate('local', {
            successRedirect: '/admin',
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

    // app.get('/send',function(req,res){
    //         var mailOptions={
    //             to : req.query.to,
    //             subject : req.query.subject,
    //             text : req.query.text ,
    //         }
    //     if(req.query.to && req.query.subject && req.query.text ){
    //     console.log(mailOptions);
    //     smtpTransport.sendMail(mailOptions, function(error, response){
    //         if(error){
    //             console.log(error);
    //             res.end("error");
    //         }else{
    //             console.log("Message sent: " + response.message);
    //             res.end("sent");
    //         }
    //         });
    //     }

    // });

    app.get('/send',function(req,res){
            var pixel = req.query.url;
            var fullPath = req.query.file
            //console.log(fullPath.split(/(\\|\/)/g).pop())
            if(req.query.to && req.query.subject && req.query.text ){
            if(fullPath){
                    var mailOptions={
                        to : req.query.to,
                        subject : req.query.subject,
                        text : req.query.text,
                        attachments: [
                                       {
                                        fileName: req.query.file.split(/(\\|\/)/g).pop(),
                                        contents: new Buffer(pixel.split("base64,")[1], "base64")
                                        }
                                    ]
                    }
            }else{
                    var mailOptions={
                        to : req.query.to,
                        subject : req.query.subject,
                        text : req.query.text
                    }
            }

       
        console.log(mailOptions);
        smtpTransport.sendMail(mailOptions, function(error, response){
            if(error){
                console.log(error);
                res.end("error");
            }else{
                console.log("Message sent: " + response.message);
                res.end("sent");
            }
            });
        }

    });
};

