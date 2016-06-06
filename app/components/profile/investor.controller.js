angular
    .module('so.profile')
    .controller('InvestorController', InvestorController);

function InvestorController($scope, $cookies, $http) {

    $scope.api_domain = sessionStorage.getItem('api_domain');

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
    $scope.jobs = [{'company_name': 'Tesla', 'role': "CEO"}, {'company_name': 'SpaceX', 'role': "CEO & CTO"}];
    $scope.boards = [{'company_name': 'Medialets', 'role': "Investor"}];
    $scope.investments = [{'date': 'Jan. 2016', 'invested_in': "Memebox Corportation", 'round': '$100M/Series D', 
        'details': 'Personal Investment'}];
    // $scope.prof_pic_url = $cookies.get('prof_pic_url');

    

    console.log($scope.token);
    console.log($scope.email);
    console.log($scope.firstname);
    console.log($scope.lastname);

    $scope.ClickedDevice = function(device_id) {
        $scope.clicked_id = device_id;
        console.log(device_id);
        $cookies.put('curr_device_id', device_id);
        console.log("curr_device_id token set.");
        $state.go('profile.device');
        // getDevice(device_id)
        
    }


    $scope.setChanges = function() {
        $scope.editing = false;

        $scope.url_prefix =   $scope.api_domain + ":8080";
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