angular
  .module('InvestorService', ['firebase'])
  .factory('InvestorService', ['$firebaseObject', function($firebaseObject) {

    return function(investorId) {
      var ref = new Firebase("https://escape-app.firebaseio.com/investors/").child(investorId);
      // create an instance of User (the new operator is required)
      return new $firebaseObject(ref);
    }

  }
]);