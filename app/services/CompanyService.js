angular
  .module('CompanyService', ['firebase'])
  .factory('CompanyService', ['$firebaseObject', function($firebaseObject) {

    return function(companyId) {
      var ref = new Firebase("https://socialocean.firebaseio.com/companies/").child(companyId);
      // create an instance of User (the new operator is required)
      return new $firebaseObject(ref);
    }

  }
]);