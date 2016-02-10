angular
    .module('so.auth.login')
    .controller('SoAuthLoginController', SoAuthLoginController);


function SoAuthLoginController($scope, $state, $http, AuthService)  {


    $scope.email = '';
    $scope.password = '';
    
    $scope.err = null;
    $scope.errObject = null;

    $scope.succes = '';
    $scope.api_domain =  "http://127.0.0.1:8040"

    $scope.login = function() {
        console.log($scope.email);
        console.log($scope.password);

        var url = $scope.api_domain + "/users/signin";
        var auth_string = String($scope.email) + ':' + String($scope.password)
        console.log(auth_string)
        var auth_cred = btoa(auth_string)
        console.log(auth_cred)

        $http.get(url, {
            headers: {'Authorization': 'Basic ' + auth_cred }
        }).then(
            function(value) {
                console.log(value);

                if(value['data']['status'] == "success"){
                    AuthService.setToken(value['data']['token']);
                    console.log("logged in with token " + String(AuthService.getToken()));
                    $state.go('soProfile');
                }
            }, 
            function(value) {
                console.log(value);
            }
        );


    }


}