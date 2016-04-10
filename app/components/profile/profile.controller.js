angular
    .module('so.profile')
    .controller('ProfileController', ProfileController);

function ProfileController($scope, $cookies, $state, $http) {

    $scope.api_domain = $cookies.get('api_domain');

    $scope.user_type = $cookies.get('user_type');
	$scope.token = $cookies.get('token');
    $scope.email = $cookies.get('email');
    $scope.firstname = $cookies.get('firstname');
    $scope.lastname = $cookies.get('lastname');
    $scope.city = $cookies.get('city');
    $scope.state = $cookies.get('state');
    $scope.website = $cookies.get('website');
    $scope.primary_role = $cookies.get('primary_role');
    $scope.headline = $cookies.get('primary_role');
    $scope.num_jobs = $cookies.get('num_jobs');
    $scope.num_investments = $cookies.get('num_investments');
    $scope.num_boards = $cookies.get('num_boards');

    $scope.editing = false;
    $scope.jobs = [{'company_name': 'Tesla', 'role': "CEO"}];
    $scope.boards = [{'company_name': 'Medialets', 'role': "Investor"}];
    $scope.investments = [{'date': 'Jan. 2016', 'invested_in': "Memebox Corportation", 'round': '$100M/Series D', 
        'details': 'Personal Investment'}];
    // $scope.prof_pic_url = $cookies.get('prof_pic_url');

    
    setProfile();

    function setProfile() {
        if ($scope.user_type == "investor" || $scope.user_type == "Investor") {
            $state.go('profile.investor');
        }
        else {
            $state.go('profile.company');
        }
    }


    $scope.setChanges = function() {
        $scope.editing = false;

        $scope.url_prefix =   $scope.api_domain;
        var url = $scope.url_prefix + "/users/edit";
        var auth_string = String($scope.token) + ':' + String('unused');
        var auth_cred = btoa(auth_string);

        $http({
            url: url,
            method: "POST",
            headers: {'Authorization': 'Basic ' + auth_cred },
            data: { 'firstname': $scope.firstname, 'lastname': $scope.lastname, 'headline' : $scope.headline} 
        })
        .then(function(response) {
            console.log(response);

            if(response['data']['status'] == "success"){
                console.log(response);
            }
        }, 
        function(response) {
            // failure
            console.log(response);
            
        });
    }

}