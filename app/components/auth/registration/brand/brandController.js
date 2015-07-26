angular
    .module('so.auth.registration.brand')
    .controller('BrandController', BrandController);


function BrandController($scope, Auth, $firebaseObject) {

    $scope.email = '';
    $scope.password = '';
    $scope.name = '';
    $scope.branch = '';

    $scope.err = null;
    $scope.errObject = null;

    $scope.succes = '';

    $scope.register = function() {
        Auth.$createUser({
            email: $scope.email,
            password: $scope.password
        }).then(function(userData) {

            var ref = new Firebase('https://socialocean.firebaseio.com/companies/' + userData.uid);
            var company = $firebaseObject(ref);

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