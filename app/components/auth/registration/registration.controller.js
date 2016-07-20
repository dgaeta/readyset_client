angular
    .module('so.auth.registration')
    .controller('SoAuthRegistrationController', ['$scope', '$rootScope','$http', '$cookies', '$state',  SoAuthRegistrationController]);

function SoAuthRegistrationController($scope, $rootScope, $http, $cookies, $state) {

    $scope.url_prefix = "http://104.198.195.243/api";
    //$scope.url_prefix = "http://localhost:8040";

    $scope.company = false;
    $scope.investor = false;

    // For investor
    $scope.firstname = '';
    $scope.lastname = '';
    $scope.primary_role = '';
    $scope.headline = '';

    // For Company 
    $scope.company_name = '';
    $scope.founders = '';
    $scope.industry = '';

    // Shared
    $scope.city = '';
    $scope.state = '';
    $scope.website = '';
    $scope.email = '';
    $scope.password = '';

    




    $scope.investorClicked = function() {
        $scope.investor = true;
        $scope.company = false;
    }

    $scope.companyClicked = function() {
        $scope.investor = false;
        $scope.company = true;

    }


    $scope.register_investor = function() {

        var url = $scope.url_prefix + "/users/add_investor";
        //var auth_string = String($scope.token) + ':' + String('unused');
        //var auth_cred = btoa(auth_string);

        $http({
            url: url,
            method: "POST",
            //headers: {'Authorization': 'Basic ' + auth_cred },
            data: { 
                'user_type': 'investor',
                'firstname' : $scope.firstname,
                'lastname' : $scope.lastname,
                'city': $scope.city,
                'state': $scope.state,
                'email': $scope.email,
                'password': $scope.password
             }
        })
        .then(function(response) {
            console.log(response);

            if(response['data']['status'] == "success" || response['data']['status'] == 200){
                sessionStorage.setItem('user_type', 'investor');
                sessionStorage.setItem('email', $scope.email);
                sessionStorage.setItem('user', JSON.stringify(response['data']['user']));
                sessionStorage.setItem('investor_struct', JSON.stringify(response['data']['investor_struct']));
                sessionStorage.setItem('token', response['data']['token']);
        
                $state.go('profile.investor');
            }
        }, 
        function(response) {
            // failure
            console.log(response);
            
        });
    }


    $scope.register_company = function() {

        var url = $scope.url_prefix + "/users/add_company";
        //var auth_string = String($scope.token) + ':' + String('unused');
        //var auth_cred = btoa(auth_string);

        $http({
            url: url,
            method: "POST",
            //headers: {'Authorization': 'Basic ' + auth_cred },
            data: { 
                'user_type': 'company',
                'headquarters_city': $scope.city,
                'headquarters_state': $scope.state,
                'company_description': $scope.headline,
                'email': $scope.email,
                'password': $scope.password,
                'company_name': $scope.company_name,
                'website': '',
                'founders': '',
                'industry': '',
                'profile_pic': ''
             }
        })
        .then(function(response) {
            console.log(response);

            if(response['data']['status'] == "success" || response['data']['status'] == 200){
                console.log(response['data']['user']);
                $rootScope.token = response['data']['token'];
                $rootScope.user_type = response['data']['user']['user_type'];

                sessionStorage.setItem('token', response['data']['token']);
                sessionStorage.setItem('user_type', 'company');
                sessionStorage.setItem('user', JSON.stringify(response['data']['user']));
                sessionStorage.setItem('company_struct', JSON.stringify(response['data']['company_struct']));

                $state.go('profile.company');


            }
        }, 
        function(response) {
            // failure
            console.log(response);
            
        });
    }


}