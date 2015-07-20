angular.module('productService', [])

	// super simple service
	// each function returns a promise object 
	.factory('Products', ['$http',function($http) {
		return {
			get : function() {
				return $http.get('/api/products');
			},
			create : function(productData) {
				return $http.post('/api/products', productData);
			},
			delete : function(id) {
				return $http.delete('/api/products/' + id);
			},

		}
	}]);