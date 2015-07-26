angular
    .module('so.auth.registration')
    .controller('SoAuthRegistrationController', SoAuthRegistrationController);

function SoAuthRegistrationController($scope, AuthService, CompanyService) {

    $scope.email = '';
    $scope.password = '';
    $scope.name = '';
    $scope.branch = '';

    $scope.err = null;
    $scope.errObject = null;

    $scope.succes = '';

    $scope.register = function() {

        console.log("Registering");

        AuthService.$createUser({
            email: $scope.email,
            password: $scope.password
        }).then(function(userData) {

            console.log('creation successfull');

            var company = CompanyService(userData.uid);

            console.log(company);

            company.name = $scope.name;
            company.branch = $scope.branch;

            company.$save().then(function(ref) {
                console.log(ref);
                $scope.succes = "User created with id " + userData.uid;
            }).catch(function(error) {
                $scope.err = "Error creating user details";
                $scope.errObject = error;
            });

        }).catch(function(error) {
            $scope.err = "Error creating user";
            $scope.errObject = error;
        })
    }


}