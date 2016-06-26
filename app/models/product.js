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
	},

	available : {
		type: Boolean,
		default: 'true'
	},

	inCart : {
		type: Boolean,
		default: 'false'
	}

});

module.exports = mongoose.model('Product', Product);