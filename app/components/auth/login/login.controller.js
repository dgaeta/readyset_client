angular
    .module('so.auth.login')
    .controller('SoAuthLoginController', ['$scope', '$rootScope', '$http', '$cookies', '$state', SoAuthLoginController]);


function SoAuthLoginController($scope, $rootScope, $http, $cookies, $state, AuthService, $cookieStore)  {

    $scope.url_prefix = "104.198.195.243/api";

    $scope.email = "";
    $scope.password = "";

    $scope.submit_pressed = false;
    $scope.no_email_entered;

    $scope.success = '';
    $scope.err = null;
    $scope.errObject = null;
    $scope.alerts = [];

    
    $scope.addAlert = function() {
        $scope.alerts.push({msg: 'Another alert!'});
    };

    $scope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1);
    };

    $scope.login = function() {
        console.log($scope.email);
        console.log($scope.password);

        if ($scope.email == "" && $scope.password == "") {
            $scope.alerts.push({type: 'danger', msg: 'Opps, can you enter your email and password?'});
            $scope.submit_pressed = false;
            return;
        };

        if ($scope.email == "") {
            $scope.alerts.push({type: 'danger', msg: 'Opps, can you enter your email?'});
            $scope.submit_pressed = false;
            return;
        };

        if ($scope.password == "") {
            $scope.alerts.push({type: 'danger', msg: 'Opps, can you enter your password?'});
            $scope.submit_pressed = false;
            return;
        };

        var url = $scope.url_prefix + "/users/signin";
        var auth_string = String($scope.email) + ':' + String($scope.password);
        var auth_cred = btoa(auth_string);

        console.log(url);

        $http.get(url, {
            headers: {'Authorization': 'Basic ' + auth_cred }
        }).then(
            function(value) {
                console.log(value);

                data = value['data'];

                if(data['status'] == "success"){
                    sessionStorage.setItem('token', value['data']['token']);
                    sessionStorage.setItem('user', JSON.stringify(value['data']['user']));
                    sessionStorage.setItem('user_type', data['user']['user_type']);

                    
                    if (data['user']['user_type'] == "company") {
                        sessionStorage.setItem('company_struct', JSON.stringify(data['company_struct']));
                        $state.go('profile.company');
                    };

                    if (data['user']['user_type'] == "investor") {
                         sessionStorage.setItem('investor_struct', JSON.stringify(data['investor_struct']));
                        $state.go('profile.investor');
                    };

                    console.log("no user_type param received from server");
                   
                    
                                        
                    
                }
            }, 
            function(value) {
                $scope.submit_pressed = false;
                $scope.alerts.push({type: 'danger', msg: "Opps, your email and password don't match our records."}); 
                console.log(value);
            }
        );


    }



}