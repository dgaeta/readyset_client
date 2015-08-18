angular
    .module('so.auth.registration')
    .controller('SoAuthRegistrationController', SoAuthRegistrationController);

function SoAuthRegistrationController($scope, AuthService, InvestorService, UserService) {

    $scope.email = '';
    $scope.password = '';
    $scope.name = '';
    $scope.branch = '';

    $scope.err = null;
    $scope.errObject = null;

    $scope.succes = '';

    AuthService.$onAuth(function(authData) {
      $scope.authData = authData;
      console.log("Hellooooo out there");
      console.log(authData);
    });

    $scope.register = function() {

        console.log("Registering");
        var ref = new Firebase("https://<YOUR-FIREBASE-APP>.firebaseio.com");


        var userType = localStorage.getItem('userType');
        console.log(userType);

        AuthService.$createUser({
            email: $scope.email,
            password: $scope.password
        }).then(function(userData) {

            console.log('creation successfull');

            if (userType == "Investor") {
                var investor = InvestorService(userData.uid);

                console.log(investor);

                investor.name = $scope.name;
                investor.branch = $scope.branch;
                investor.email = $scope.email;

                investor.$save().then(function(ref) {
                    console.log(ref);
                    $scope.succes = "User created with id " + userData.uid;
                    var authData = ref.getAuth();
                }).catch(function(error) {
                    $scope.err = "Error creating user details";
                    $scope.errObject = error;
                });
            } else{
                var user = UserService(userData.uid);

                console.log(user);

                user.name = $scope.name;
                user.branch = $scope.branch;

                user.$save().then(function(ref) {
                    console.log(ref);
                    $scope.succes = "User created with id " + userData.uid;
                }).catch(function(error) {
                    $scope.err = "Error creating user details";
                    $scope.errObject = error;
                });
            };

            

        }).catch(function(error) {
            $scope.err = "Error creating user";
            $scope.errObject = error;
        })
    }


}