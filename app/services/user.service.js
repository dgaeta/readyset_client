angular
	.module('UserService', ['firebase'])
  	.factory('UserService', ['$firebaseObject', '$rootScope', function($firebaseObject, $rootScope) {

    	var token = ""; 

		return {
			token: token,
			setToken: function(value) {token = value; console.log("token has been set"); }
		
		}

  	}
]);