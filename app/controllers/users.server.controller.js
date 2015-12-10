// working

var User = require('mongoose').model('User');
var Product = require('../models/product');
var passport = require('passport');

var getErrorMessage = function(err){
    var message = '';

    if (err.code){
        switch(err.code){
            case 11000:
            case 11001:
                message = 'Username already exists';
                break;
            default:
                message = 'Something went wrong';
        }
    }
    else{
        for(var errName in err.errors){
            if (err.errors[errName].message){
                message = err.errors[errName].message;
            }
        }
    }
    return message;
};

exports.saveOAuthUserProfile = function(req, profile, done){
    User.findOne({
        provider: profile.provider,
        providerId: profile.providerId
    }, function(err, user){
        if (err) {
            return done(err);
        }else{
            if (!user){
                var possibleUsername = profile.username || ((profile.email) ? profile.email.split('@')[0] : '');
                User.findUniqueUsername(possibleUsername, null, function(availableUsername){
                    profile.username = availableUsername;
                    user = new User(profile);
                    user.save(function (err){
                        if (err) {
                            var message = _this.getErrorMessage(err);
                            req.flash('error', message);
                            return res.redirect('/signup');
                        }
                        return done(err, user);
                    });
                });
            }else{
                return done(err, user);
            }
        }
    });
};


exports.renderSignin = function(req, res, next){
    if (!req.user){
        res.render('signin', {
            title: 'The Victoria Blake Collection',
            messages: req.flash('error') || req.flash('info')
            });
    }
    else{
        return res.redirect('/');
    }
};

exports.renderSignup = function(req, res, next){
    if (!req.user){
        res.render('signup', {
            title: 'The Victoria Blake Collection',
            messages: req.flash('error') 
        });
    }
    else{
        return res.redirect('/');
    }
};
exports.renderProduct = function(req, res, next){
       // console.log('render Product is was called')
        res.render('product',{
            title: 'The Victoria Blake Collection',
            userFullName: req.user ? req.user.fullName : ''
           // userFullName: req.user ? req.user.fullName : '' 
        });
       
};

// update product
exports.saveEditProduct = function (req, res){
    console.log(req.params.productId) 

    Product.update({_id: req.params.productId},{
    // text: req.body.product.text  ,
    // name : req.body.product.name   ,
    // price : req.body.product.price  ,
    // amount : req.body.product.amount   ,
    // category : req.body.product.category   
    }, function(err, num, raw){
        if (err) {
            res.send(err);
        } else {
            //res.json(num);
            //console.log("ID is" + req.params.productId + "YAY!")
            //res.redirect("/products");
        };
    });

};

exports.renderTakeForm = function(req,res,next){
    res.render('takeform')
}

exports.renderProductId = function(req, res, next){
     <!--//console.log('id was found' + req.product ? req.product._id:'');-->
     Product.findOne({_id: req.query.p}, function(err, product) {

        if (err) {
            res.send(err);
        } else {
            res.render('test', {
                product: product, 
                title:'The Victoria Blake Collection', 
                userFullName: req.user ? req.user.fullName : '',
                variable: product.available
            });
                 
        }   
     })
};

exports.renderAdminEdit = function(req, res, next){
     <!--//console.log('id was found' + req.product ? req.product._id:'');-->
     Product.findOne({_id: req.query.p}, function(err, product) {

        if (err) {
            res.send(err);
        } else {
            res.render('edit', {
                product: product, 
                title:'The Victoria Blake Collection', 
                userFullName: req.user ? req.user.fullName : ''
            });
                 
        }   
     })
};


//update ===========================================================
// exports.updateProduct = function (req, res){
//     //res.send("product updated");
//     Product.update({_id: req.params.productId}, {
//         amount: 0;
//     }, function(err, num, raw){
//         if (err) {
//             res.send(err);
//         } else {
//             console.log("successfully updated");
//             res.json(num);
//         };
//     });
// };
//==================================================================
 exports.renderSignIn = function(req,res){
        res.render('signIn',
        {title: 'The Victoria Blake Collection',
        userFullName: req.user ? req.user.fullName : ''})
 };

 exports.renderCameo = function(req, res, next){
    Product.find({category:"cameo"}, function(err, result){

        if (err) {
            res.send(err);
        } else {

                res.render('cameo', {
                product: result, 
                title:'The Victoria Blake Collection', 
                userFullName: req.user ? req.user.fullName : ''
            });
                 
        } 
         console.log(result); // output all records
    });
};

 exports.renderPreciousStones = function(req, res, next){
    Product.find({category:"preciousStones"}, function(err, result){

        if (err) {
            res.send(err);
        } else {

                res.render('preciousStones', {
                product: result, 
                title:'The Victoria Blake Collection', 
                userFullName: req.user ? req.user.fullName : ''
            });
                 
        } 
         console.log(result); // output all records
    });
};

 exports.renderPearlJewelry = function(req, res, next){
    Product.find({category:"pearlJewelry"}, function(err, result){

        if (err) {
            res.send(err);
        } else {

                res.render('pearlJewelry', {
                product: result, 
                title:'The Victoria Blake Collection', 
                userFullName: req.user ? req.user.fullName : ''
            });
                 
        } 
         console.log(result); // output all records
    });
};

 exports.renderStatementNecklaces = function(req, res, next){
    Product.find({category:"cameo"}, function(err, result){

        if (err) {
            res.send(err);
        } else {

                res.render('cameo', {
                product: result, 
                title:'The Victoria Blake Collection', 
                userFullName: req.user ? req.user.fullName : ''
            });
                 
        } 
         console.log(result); // output all records
    });
};

exports.renderCustomNecklace = function(req,res){
    res.render('customNecklace',
        {
            title: 'The Victoria Blake Collection',
            userFullName: req.user ? req.user.fullName : ''
        })
};

// exports.renderTest= function(req,res,next){
//     console.log('render Product Id was called')
//     res.render('test')
// };

exports.renderAbout = function(req, res){
    res.render('about', 
        {title: 'The Victoria Blake Collection',
        userFullName: req.user ? req.user.fullName : ''})
};

exports.renderContact = function(req, res){
    res.render('contact', 
        {title: 'The Victoria Blake Collection', 
        userFullName: req.user ? req.user.fullName : ''})
};

exports.renderReserve = function(req, res){
     Product.findOne({_id: req.query.p}, function(err, product) {

        if (err) {
            res.send(err);
        } else {
            res.render('reserve', {
                product: product, 
                title:'The Victoria Blake Collection', 
                userFullName: req.user ? req.user.fullName : ''
            });
                 
        }   
     })
};


exports.renderTestimonial = function(req, res){
    res.render('testimonial', 
        {title: 'The Victoria Blake Collection', 
        userFullName: req.user ? req.user.fullName : ''})
};

// exports.renderAdmin = function(req,res){
//     res.render('admin',
//         {title: 'The Victoria Blake Collection',
//         userFullName: req.user ? req.user.fullName : ''})
// };

// exports.renderCart = function(req, res) {
//     res.render('cart', 
//         {title: 'The Victoria Blake Collection',
//         userFullName: req.user ? req.user.fullName : ''})
// };

exports.renderSocial = function(req,res){
    res.render('social',
        {
            title: 'The Victoria Blake Collection',
            userFullName: req.user ? req.user.fullName : ''
        })
        
};

exports.signin = function(req, res, next){
    if (!req.password || !req.user ) {
        res.render('signin', {
            title: 'The Victoria Blake Collection',
            messages: req.flash('error')
        });
        return res.redirect('/');
    }
            
        
};

exports.signup = function(req, res, next){
    if (!req.user) {
        var user = new User(req.body);
        var message = null;
        
        user.provider = 'local';
        user.save(function(err){
            if (err) {
                var message = getErrorMessage(err);
                req.flash('error', message);
                return res.redirect('/signup');
            }
            req.login(user, function(err){
                if (err) return next(err);
                return res.redirect('/');
            });
        });
    }
    else{
        return res.redirect('/');
    }
};

exports.signout = function(req, res){
    req.logout();
    res.redirect('/');
};


exports.create = function(req, res, next){
    var user = new User(req.body);
    user.save(function(err){
        if (err){
            return next(err);
        }
        else{
            res.json(user);
        }
        return(-1);
    });
};

exports.list = function(req, res, next){
    User.find({}, function(err, users){
        if(err){
        return next(err);
        }
        else{
            res.json(users);
        }
    });
};

exports.read = function(req, res){
    res.json(req.user);
};

exports.userByID = function(req, res, next, ID){
  User.findOne({
    _id: ID
  }, function(err, user){
    if (err){
        return next(err);
    }
    else{
        req.user = user;
        next();
    }
  });
};


exports.update = function(req, res, next){
    User.findByIdAndUpdate(req.user.id, req.body, function(err, user){
        if (err) {
           return next(err);
        }
        else{
            res.json(user);
        }
    });
};


exports.delete = function(req, res, next){
    req.user.remove(function(err){
        if(err){
            return next(err);
        }
        else{
            res.json(req.user);
        }
    })
};