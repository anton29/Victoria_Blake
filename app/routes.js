var Product = require('./models/product');

function getProducts(res){
	Product.find(function(err, products) {

			// if there is an error retrieving, send the error. nothing after res.send(err) will execute
			if (err)
				res.send(err)

			res.json(products); // return all products in JSON format
		});
};

module.exports = function(app) {

	// api ---------------------------------------------------------------------
	// get all products
	app.get('/api/products', function(req, res) {

		// use mongoose to get all products in the database
		getProducts(res);
	});

	// create product and send back all products after creation
	app.post('/api/products', function(req, res) {

		// create a product, information comes from AJAX request from Angular

		//name was added

		Product.create({
			text : req.body.text,
			name : req.body.name,
			price : req.body.price,
			photo : req.body.photo,
			done : false
		}, function(err, product) {
			if (err)
				res.send(err);

			// get and return all the products after you create another
			getProducts(res);
		});

	});

	// delete a product
	app.delete('/api/products/:product_id', function(req, res) {
		Product.remove({
			_id : req.params.product_id
		}, function(err, product) {
			if (err)
				res.send(err);

			getProducts(res);
		});
	});

	app.get('/api/product/:product_id', function (req, res){
		Product.find({_id: req.params.product_id},function (err, products) {
			res.json(products);
		});
});



	// application -------------------------------------------------------------
	// app.get('*', function(req, res) {
	// 	res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
	// });
};