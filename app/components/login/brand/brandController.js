angular
    .module('so.auth.login.brand')
    .controller('LoginBrandController', LoginBrandController);


function LoginBrandController($scope, Auth) {

    $scope.email = '';
    $scope.password = '';
    
    $scope.err = null;
    $scope.errObject = null;

    $scope.succes = '';

    $scope.login = function() {
        Auth.$authWithPassword({
            email: $scope.email,
            password: $scope.password
        }).then(function(authData) {
            console.log("Logged in as:", authData.uid);
            $scope.succes = 'logged in as ' + authData.uid;
        }).catch(function(error) {
            $scope.err = "Error creating user";
            $scope.errObject = error;
        })
    }


}