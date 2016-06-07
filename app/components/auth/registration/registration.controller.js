angular
    .module('so.auth.registration')
    .controller('SoAuthRegistrationController', ['$scope', '$rootScope','$http', '$cookies', '$state',  SoAuthRegistrationController]);

function SoAuthRegistrationController($scope, $rootScope, $http, $cookies, $state) {

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

    $scope.api_domain = "http://104.197.111.36";
    $scope.url_prefix = "http://104.197.111.36:8040";




    $scope.investorClicked = function() {
        $scope.investor = true;
        $scope.company = false;
    }

    $scope.companyClicked = function() {
        $scope.investor = false;
        $scope.company = true;

    }


    $scope.register_investor = function() {

        var url = $scope.url_prefix + "/users/add";
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
                'primary_role': $scope.primary_role,
                'website': $scope.website,
                'headline': $scope.headline,
                'email': $scope.email,
                'password': $scope.password,
                'num_jobs': 0,
                'num_investments': 0,
                'num_boards':0,
                'profile_pic': '',
                'additional_photos': '[]'
             }
        })
        .then(function(response) {
            console.log(response);

            if(response['data']['status'] == "success" || response['data']['status'] == 200){
                sessionStorage.setItem('user_type', 'investor');
                sessionStorage.setItem('email', $scope.email);
                sessionStorage.setItem('firstname', $scope.firstname);
                sessionStorage.setItem('lastname', $scope.lastname);
                sessionStorage.setItem('token', response['data']['token']);
                sessionStorage.setItem('city', $scope.city);
                sessionStorage.setItem('state', $scope.state);
                sessionStorage.setItem('primary_role', $scope.primary_role);
                sessionStorage.setItem('website', $scope.website);
                sessionStorage.setItem('headline', $scope.headline);
                sessionStorage.setItem('num_jobs', 0);
                sessionStorage.setItem('num_boards', 0);
                sessionStorage.setItem('num_investments', 0);

                $rootScope.user_type = response['data']['user']['user_type'];
                $state.go('profile.investor');
            }
        }, 
        function(response) {
            // failure
            console.log(response);
            
        });
    }


    $scope.register_company = function() {

        var url = $scope.url_prefix + "/users/add";
        //var auth_string = String($scope.token) + ':' + String('unused');
        //var auth_cred = btoa(auth_string);

        $http({
            url: url,
            method: "POST",
            //headers: {'Authorization': 'Basic ' + auth_cred },
            data: { 
                'user_type': 'company',
                'city': $scope.city,
                'state': $scope.state,
                'website': $scope.website,
                'headline': $scope.headline,
                'email': $scope.email,
                'password': $scope.password,
                'company_name': $scope.company_name,
                'founders': $scope.founders,
                'industry': $scope.industry,
                'deals': '{}',
                'board_members': '[]',
                'investors': '[]',
                'employees': '[]',
                'documents': '[]',
                'funding_rounds': '[]',
                'profile_pic': '',
                'additional_photos': '[]'
             }
        })
        .then(function(response) {
            console.log(response);

            if(response['data']['status'] == "success" || response['data']['status'] == 200){
                sessionStorage.setItem('user_type', 'company');
                sessionStorage.setItem('email', $scope.email);
                sessionStorage.setItem('headline', $scope.headline);
                sessionStorage.setItem('token', response['data']['token']);
                sessionStorage.setItem('city', $scope.city);
                sessionStorage.setItem('state', $scope.state);
                sessionStorage.setItem('website', $scope.website);
                
                sessionStorage.setItem('company_name', $scope.company_name);
                sessionStorage.setItem('industry', $scope.industry);
                sessionStorage.setItem('founders', $scope.founders);
                sessionStorage.setItem('employess', '[]');
                sessionStorage.setItem('investors', '[]');
                sessionStorage.setItem('funding_rounds', '[]');


                $rootScope.token = response['data']['token'];
                $rootScope.user = response['data']['user'];
                console.log(response['data']['user']);
                sessionStorage.setItem('deals', '{}');

                sessionStorage.setItem('user', JSON.stringify(response['data']['user']));

                $rootScope.user_type = response['data']['user']['user_type'];
                $state.go('profile.company');


            }
        }, 
        function(response) {
            // failure
            console.log(response);
            
        });
    }


}