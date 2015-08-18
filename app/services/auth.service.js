angular
    .module('AuthService', ['firebase'])
    .factory('AuthService', ['$firebaseAuth', function($firebaseAuth) {
        var ref = new Firebase("https://escape-app.firebaseio.com/");
        return $firebaseAuth(ref);
    }]);