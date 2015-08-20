angular
    .module('FireRefService', ['firebase'])
    .factory('FireRefService', ['$firebaseAuth', function($firebaseAuth) {
        var ref = new Firebase("https://escape-app.firebaseio.com/");
        return ref;
    }]);