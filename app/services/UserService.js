angular
  .module('UserService', ['firebase'])
  .factory('UserService', ['$firebaseObject', function($firebaseObject) {

    return function(userId) {
      var ref = new Firebase("https://socialocean.firebaseio.com/users/").child(userId);
      // create an instance of User (the new operator is required)
      return new $firebaseObject(ref);
    }

  }
]);