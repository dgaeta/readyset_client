angular
    .module('so.auth.login')
    .controller('SoAuthLoginController', ['$scope', '$rootScope', '$http', '$cookies', '$state', SoAuthLoginController]);


function SoAuthLoginController($scope, $rootScope, $http, $cookies, $state, AuthService, $cookieStore)  {

    $scope.email = '';
    $scope.password = '';

    $scope.success = '';
    $scope.api_domain =  "http://127.0.0.1:8040"

    $scope.login = function() {
        console.log($scope.email);
        console.log($scope.password);

        var url = $scope.api_domain + "/users/signin";
        var auth_string = String($scope.email) + ':' + String($scope.password)
        var auth_cred = btoa(auth_string)

        $http.get(url, {
            headers: {'Authorization': 'Basic ' + auth_cred }
        }).then(
            function(value) {
                console.log(value);

                data = value['data'];

                if(data['status'] == "success"){
                    $cookies.put('token', value['data']['token']);
                    $cookies.put('user', JSON.stringify(value['data']['user']));
                    $rootScope.user = value['data']['user'];
                    $rootScope.user_type = data['user']['user_type'];
                    $cookies.put('user_type', data['user']['user_type']);
                    
                    if (data['user']['user_type'] == "company") {
                        $state.go('profile.company')
                    };

                    if (data['user']['user_type'] == "investor") {
                        $state.go('profile.investor')
                    };

                    console.log("no user_type param received from server");
                   
                    
                                        
                    
                }
            }, 
            function(value) {
                console.log(value);
            }
        );


    }



}