angular
    .module('so.auth.login')
    .controller('SoAuthLoginController', ['$scope', '$http', '$cookies', '$state',SoAuthLoginController]);


function SoAuthLoginController($scope, $http, $cookies, $state, AuthService, $cookieStore)  {


    $scope.password = '';
    
    $scope.err = null;
    $scope.errObject = null;

    $scope.success = '';
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
                    console.log(value);

                    // Assign user values.
                    // AuthService.setToken(value['data']['token']);
                    // UserService.setToken(value['data']['token']);
                    // UserService.setDevices(value['data']['devices']);
                    // UserService.setDeviceCount(value['data']['device_count']);
                    // UserService.setEmail(value['data']['email'])

                    var token = $cookies.get(value['data']['token']);
                    console.log(value['data']['devices'])
                    var devices = $cookies.get(value['data']['devices']);
                    var deviceCount = $cookies.get(value['data']['device_count']);
                    var email = $cookies.get(value['data']['email']);

                    if (token) {
                        console.log("logged in");
                    } 
                    else {
                        console.log("no user data in cookies.");
                        console.log("attepting to create user data cookies.");

                        $cookies.put('token', value['data']['token']);
                        console.log("token cookie set.");

                        $cookies.put('devices', JSON.stringify(value['data']['devices']));
                        console.log("devices cookie set.");

                        $cookies.put('device_count', value['data']['device_count']);
                        console.log("device count set.");

                        $cookies.put('email', value['data']['email']);
                        console.log("email set.");

                        console.log("user data cookies created successfully.");
                    };

                    
                    $state.go('profile.devices');
                }
            }, 
            function(value) {
                console.log(value);
            }
        );


    }



}