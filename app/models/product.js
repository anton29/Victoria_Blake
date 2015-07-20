// working doing anything ??

var mongoose = require('mongoose');

// module.exports = mongoose.model('Product', {
// 	text : {type : String, default: ''}
// });

// was changed
var Product = mongoose.Schema({

	text: { 
		type: String,
		default : ''
	},
	
	name : {
		type: String,
		default : 'this is being used'
	},

	price : {
		type: Number,
		default : 0
	},

	photo : { 
		type : String
	},

	category : {
		type : String,
		default: ''
	}

});

module.exports = mongoose.model('Product', Product);