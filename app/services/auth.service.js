angular
    .module('AuthService', ['firebase'])
    .factory('AuthService', ['$firebaseAuth', function() {
        var currentUser;
        var token; 
        var authData = null;

    	return {
    		getAuth: function() { return authData;},
    		setToken: function(data) { token = data; authData = token;},
    		getToken: function() { return token;},
    		setUser: function(data) { currentUser = data;}, 
    		getUser: function() {return currentUser;}, 

    	}
    }]);