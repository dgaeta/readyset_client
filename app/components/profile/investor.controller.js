angular
    .module('so.profile')
    .controller('InvestorController', InvestorController);

function InvestorController($scope, $cookies, UserService, $http) {

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

        $scope.api_domain =  "http://127.0.0.1:8040"
        var url = $scope.api_domain + "/users/edit";
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



    function getDevices() {
        $scope.api_domain =  "http://127.0.0.1:8040"
        var url = $scope.api_domain + "/devices/list_devices";
        var auth_string = String($scope.token) + ':' + String('unused');
        var auth_cred = btoa(auth_string);

        $http({
            url: url,
            method: "GET",
            headers: {'Authorization': 'Basic ' + auth_cred }
        })
        .then(function(response) {
            console.log(response);

            if(response['data']['status'] == "success"){
                console.log(response);
                $cookies.put('devices', JSON.stringify(response['data']['devices']));
                $cookies.put('device_count', response['data']['device_count']);
            }
        }, 
        function(response) {
            // failure
            console.log(response);
            
        });
        
    }

    function getDevice(device_id) {
        $scope.api_domain =  "http://127.0.0.1:8040"
        var url = $scope.api_domain + "/devices/get_root";
        var auth_string = String($scope.token) + ':' + String('unused');
        var auth_cred = btoa(auth_string);

        $http({
            url: url,
            method: "POST",
            headers: {'Authorization': 'Basic ' + auth_cred },
            data: { 'device_id' : $scope.clicked_id }
        })
        .then(function(response) {
            console.log(response);

            if(response['data']['status'] == "success"){
                console.log(response);
                $state.go('profile.device');
            }
        }, 
        function(response) {
            // failure
            console.log(response);
            
        });
        
    }

}