// service
angular
    .module('so')
    .service('userRef', ["$firebaseArray"], userRef);

function userRef($firebaseArray) {
  this.logError = function(msg) {
    /* */
  };

  var ref = new Firebase("https://socialocean.firebaseio.com/Users");
}