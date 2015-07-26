angular
    .module('AuthService', ['firebase'])
    .factory('AuthService', ['$firebaseAuth', function($firebaseAuth) {
        var ref = new Firebase("https://socialocean.firebaseio.com");
        return $firebaseAuth(ref);
    }]);