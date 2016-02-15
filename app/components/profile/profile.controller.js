angular
    .module('so.profile')
    .controller('ProfileController', ProfileController);

function ProfileController($scope, $cookies, AuthService, UserService, $state, $http) {

	// if (FireRefService.getAuth()) {
	// 	$scope.uid = FireRefService.getAuth().uid;
	// 	$scope.user = UserService($scope.uid);
	// 	console.log("current user is:")
	// 	console.log($scope.user);
	// };
	$scope.token = $cookies.get('token');
    $scope.devices = JSON.parse($cookies.get('devices'));
    $scope.deviceCount = $cookies.get('device_count');
    $scope.email = $cookies.get('email');

    //getDevices();

    console.log($scope.token);
    console.log($scope.devices);
    console.log($scope.deviceCount);
    console.log($scope.email);

    $scope.ClickedDevice = function(device_id) {
    	$scope.clicked_id = device_id;
     	console.log(device_id);
     	$cookies.put('curr_device_id', device_id);
        console.log("curr_device_id token set.");
		$state.go('profile.device');
        // getDevice(device_id)
     	
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