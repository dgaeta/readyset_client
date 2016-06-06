angular
    .module('so.profile')
    .controller('ProfileController', ProfileController);

function ProfileController($scope, $cookies, $state, $http) {

    $scope.api_domain = $cookies.get('api_domain');

    $scope.user_type = sessionStorage.getItem('user_type');
	$scope.token = sessionStorage.getItem('token');
    $scope.email = sessionStorage.getItem('email');
    $scope.firstname = sessionStorage.getItem('firstname');
    $scope.lastname = sessionStorage.getItem('lastname');
    $scope.city = sessionStorage.getItem('city');
    $scope.state = sessionStorage.getItem('state');
    $scope.website = sessionStorage.getItem('website');
    $scope.primary_role = sessionStorage.getItem('primary_role');
    $scope.headline = sessionStorage.getItem('primary_role');
    $scope.num_jobs = sessionStorage.getItem('num_jobs');
    $scope.num_investments = sessionStorage.getItem('num_investments');
    $scope.num_boards = sessionStorage.getItem('num_boards');

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