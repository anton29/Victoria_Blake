var users = require('../../app/controllers/users.server.controller');
var passport = require('passport');
// var core = require('../controllers/core.server.controller');
//var core = require('../controllers/core.server.controller');
var nodemailer = require("nodemailer");
var bodyParser = require('body-parser');
var fs = require('fs');
var getUri = require('get-uri');
//var urlencodedParser = bodyParser.urlencoded({ extended: false });

/*-----------------SMPT----------------------------------*/

var smtpTransport = nodemailer.createTransport("SMTP",{
    service: "Gmail",
    auth: {
        user: "test128892@gmail.com",
        pass: "test?1992"
    }
});

/*------------------SMTP End-----------------------------*/


module.exports = function(app){
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

/*
    app.route('/users')
        .post(users.create)     //post to create
        .get(users.list);       //get to find the list of users

    app.route('/users/:userId')
        .get(users.read)        //get single user by id //app.route('/users/:userId').get(users.read);
        .put(users.update)      //update single user by id //app.route('/users/:userId').put(users.update);
        .delete(users.delete);  //delete single user by id //app.route('/users/:userId').delete(users.delete);
    
    app.param('userId', users.userByID); //to get single user by id
*/

    app.route('/product')
       // console.log("route /product was called")
        // .get(product.render);
        .get(users.renderProduct)

    // app.route('/test')
    //     //console.log("product Id  route was called")
    //     .get(users.renderTest)

    // app.route('/test')
    //     .get(users.renderSignIn)

    app.route('/product/:product_id') 
        .get(users.renderProductId)
           // _id : req.params.product_id

    app.route('/admin/:product_id')
        .get(users.renderAdminEdit)
    
    app.route('/about')
        .get(users.renderAbout)

    // addede .post(core.sendMail);
    app.route('/contact')//.post(core.sendMail);
        .get(users.renderContact)

    app.route('/reserve/:product_id')
        .get(users.renderReserve)

    app.route('/testimonial')
        .get(users.renderTestimonial)

     // app.route('/admin')
     //      .get(users.renderAdmin)

    var isAuthenticated = function (req, res, next) {
        if (req.isAuthenticated() && req.user.username === "admin")
            return next();
            res.redirect('/');
    }

    app.get('/admin', isAuthenticated, function(req, res, product){
            res.render('admin', { user: req.user,
                title: 'The Victoria Blake Collection',
                userFullName: req.user ? req.user.fullName : '',
                product: product });
    });




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

    app.post('/send', function (req, res) {
            var pixel = req.body.uri;
            var fullPath = req.body.file
            if(req.body.email){
            if(fullPath){
                    var mailOptions={
                        //to : "griblake@gmail.com",
                        to:"abr8892@yahoo.com",
                        subject : "Custom Item request from: " + req.body.email,
                        text :  "Name: "    + req.body.fn +" " + req.body.fn + '\n' +
                                "Description: " + req.body.Description + '\n' +
                                "phone: "   + req.body.phone +'\n' +
                                "email: "   + req.body.email,
                        // html: 'Name: "'+req.body.fn+ " " + req.body.ln + '\n'+
                        //     '" Embedded image: <img src="'+pixel+'"/>',
                        attachments: [
                                       {
                                        fileName: req.body.file,
                                        contents: new Buffer(pixel.split("base64,")[1], "base64")
                                        }
                                    ]
                    }
            }else{
                    var mailOptions={
                        to: "griblake@gmail.com",
                        subject : "Custom Item request from: " + req.body.email,
                        text :  "Name: "    + req.body.fn +" " + req.body.fn + '\n' +
                                "Description: " + req.body.Description + '\n' +
                                "phone: "   + req.body.phone +'\n' +
                                "email: "   + req.body.email +'\n' +
                                req.body.fn + " did not provide a picture"
                    }
            }

       
        console.log(mailOptions);
        smtpTransport.sendMail(mailOptions, function(error, response){
            if(error){
                console.log(error);
                res.end("error");
            }else{
                console.log("Message sent: " + response.message);
                //res.end("sent");
                res.redirect("/");
            }
            });
        }

    });

    var Product = require('../models/product');

    app.post('/updateProduct', function (req, res){
 
        Product.update({_id: req.body.id},{
            text: req.body.text  ,
            name : req.body.name   ,
            price : req.body.price  ,
            amount : req.body.amount   ,
            category : req.body.category,
            available: req.body.available   
        }, function(err, num, raw){
            if (err) {
                res.send(err);
            } else {
                res.redirect("/admin");
            };
        });

    });

       app.post('/lock', function (req, res){
        console.log("called")
        Product.update({_id: req.body.id},{
            available: "false" 
 
        }, function(err, num, raw){
            if (err) {
                res.send(err);
            } else {
                res.redirect("/admin");
            };
        });

    });

    // app.post('/lock',function (req, res){

    //     Product.findOne({_id: req.query.p}, function(err, product) {

    //     }

    //     console.log(req.body.id)
    //     console.log(req.product.name)
    //     Product.update({id: req.body.id},{
    //         available: "false"
    //     }, function(err, num, raw){
    //         if(err){
    //             res.send(err);
    //         } else {
    //             res.redirect("/")
    //         };
    //     });
    // });

    // app.post('/lock', function(req,res){
    //     var x = "false"
    //     Product.findOne({_id: req.body.id}, function(err,product){
    //         console.log(product.available)
    //         Product.update({id: product._id},{
    //             available: x
    //             // available: "false"

    //         }, function(err, num, raw){
    //             if(err){
    //                 res.send(err);
    //             }else{
    //                 res.redirect("/product")
    //             };
    //         });
    //     });
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

