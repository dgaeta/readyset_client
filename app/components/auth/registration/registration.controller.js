angular
    .module('so.auth.registration')
    .controller('SoAuthRegistrationController', ['$scope', '$rootScope','$http', '$cookies', '$state',  SoAuthRegistrationController]);

function SoAuthRegistrationController($scope, $rootScope, $http, $cookies, $state) {

    console.log($rootScope);
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

    $scope.api_domain = $cookies.get('api_domain');




    $scope.investorClicked = function() {
        $scope.investor = true;
        $scope.company = false;
    }

    $scope.companyClicked = function() {
        console.log($scope.company);
        $scope.investor = false;
        console.log($scope.company);
        $scope.company = true;

    }


    $scope.register_investor = function() {

        $scope.url_prefix =   $scope.api_domain;
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
                $cookies.put('user_type', 'investor');
                $cookies.put('email', $scope.email);
                $cookies.put('firstname', $scope.firstname);
                $cookies.put('lastname', $scope.lastname);
                $cookies.put('token', response['data']['token']);
                $cookies.put('city', $scope.city);
                $cookies.put('state', $scope.state);
                $cookies.put('primary_role', $scope.primary_role);
                $cookies.put('website', $scope.website);
                $cookies.put('headline', $scope.headline);
                $cookies.put('num_jobs', 0);
                $cookies.put('num_boards', 0);
                $cookies.put('num_investments', 0);

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

        $scope.url_prefix =   $scope.api_domain;
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
                $cookies.put('user_type', 'company');
                $cookies.put('email', $scope.email);
                $cookies.put('headline', $scope.headline);
                $cookies.put('token', response['data']['token']);
                $cookies.put('city', $scope.city);
                $cookies.put('state', $scope.state);
                $cookies.put('website', $scope.website);
                
                $cookies.put('company_name', $scope.company_name);
                $cookies.put('industry', $scope.industry);
                $cookies.put('founders', $scope.founders);
                $cookies.put('employess', '[]');
                $cookies.put('investors', '[]');
                $cookies.put('funding_rounds', '[]');


                $rootScope.token = response['data']['token'];
                $rootScope.user = response['data']['user'];
                console.log(response['data']['user'])
                $cookies.put('deals', '{}');

                $rootScope.user_type = data['user']['user_type'];
                $state.go('profile.company');
            }
        }, 
        function(response) {
            // failure
            console.log(response);
            
        });
    }


}