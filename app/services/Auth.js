angular
    .module('Auth', ['firebase'])
    .factory('Auth', ['$firebaseAuth', function($firebaseAuth) {
        var ref = new Firebase("https://socialocean.firebaseio.com");
        return $firebaseAuth(ref);
    }]);