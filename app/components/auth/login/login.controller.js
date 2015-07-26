angular
    .module('so.auth.login')
    .controller('SoAuthLoginController', SoAuthLoginController);


function SoAuthLoginController($scope, AuthService) {

    console.log(AuthService.$getAuth());

    $scope.email = '';
    $scope.password = '';
    
    $scope.err = null;
    $scope.errObject = null;

    $scope.succes = '';

    $scope.login = function() {
        AuthService.$authWithPassword({
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