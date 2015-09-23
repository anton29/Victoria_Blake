var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;
var Product = mongoose.Schema({

	// _id: {
	// 	type : ObjectId,
	// },
	text: { 
		type: String,
		default : ''
	},
	
	name : {
		type: String,
		default : ''
	},

	price : {
		type: Number,
		default : 0
	},

	amount : {
		type: Number,
		default : 1
	},

	photo : { 
		type : String
	},

	category : {
		type : String,
		default: ''
	}

});
var Product = mongoose.model('Product', Product);
//var name12345 = Product.collection.findOne({name: 'name12345'})

// var document = ({ 
// 							//'_id': ObjectId("2599dagdsdadadsdsads"),
//  							'name'   : 'name12345',
//  							'price'  : 10,
//  							'amount' :  1,
//  							'photo'  : 'img/stones.png',
//  							'category' : 'demo'}) ;

 // Product.collection.insert({ 
 // 							//'_id': ObjectId("25"),
 // 							'name'   : 'A123',
 // 							'price'  : 10,
 // 							'amount' :  1,
 // 							'photo'  : 'img/stones.png',
 // 							'category' : 'demo'}
 // 							,{$set:{name: {$exists : true }}}, { upsert: true })

  // Product.collection.insert({ 

 	// 						//'_id': ObjectId("25"),
 	// 						'name'   : 'precious Stones demo Item',
 	// 						'price'  :  0,
 	// 						'amount' :  1,
 	// 						'photo'  : 'img/stones.png',
 	// 						'category' : 'preciousStones'}) 
// Product.collection.update(
//    { "name" : { $exists : true } },
//    document,
//    {
//      upsert: true,
//    }
// )



module.exports = mongoose.model('Product', Product);