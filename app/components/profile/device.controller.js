angular
    .module('so.profile')
    .controller('DeviceController', DeviceController);

function DeviceController($scope, $cookies, AuthService, UserService, $http) {

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
    $scope.curr_device_id = $cookies.get('curr_device_id');
    $scope.curr_folder = JSON.parse($cookies.get('curr_folder'));

    $scope.event_array = [];
    //$scope.root_folder = JSON.parse($cookies.get('root_folder'));
    $scope.path = "";

    console.log($scope.token);
    console.log($scope.devices);
    console.log($scope.deviceCount);
    console.log($scope.email);
    console.log($scope.curr_device_id);

    var url = $scope.api_domain + "/devices/get_root";
    var auth_string = String($scope.email) + ':' + String($scope.password)
    console.log(auth_string)
    var auth_cred = btoa(auth_string)
    console.log(auth_cred)
    getDevice($scope.curr_device_id);

    function getDevice(device_id) {
        $scope.api_domain =  "http://127.0.0.1:8040"
        var url = $scope.api_domain + "/devices/get_root";
        var auth_string = String($scope.token) + ':' + String('unused');
        var auth_cred = btoa(auth_string);

        $http({
            url: url,
            method: "POST",
            headers: {'Authorization': 'Basic ' + auth_cred },
            data: { 'device_id' : $scope.curr_device_id }
        })
        .then(function(response) {
            console.log(response);

            if(response['data']['status'] == "success"){
                $cookies.put('root_folder', JSON.stringify(response['data']['device_root']));
                $cookies.put('curr_folder', JSON.stringify(response['data']['device_root']));
                $cookies.put('last_sync', response['data']['last_sync']);


                
            }
        }, 
        function(response) {
            // failure
            console.log(response);
            
        });
        
    }

    $scope.clickedItem = function(name){
        console.log(name);
        if ($scope.path.length > 1) {
            $scope.path += "/" + name;
        } else {
            $scope.path += name;
        };
        
        try {
            $scope.curr_folder = JSON.parse($scope.curr_folder[name]['children']);
        }
        catch(err) {
            $scope.curr_folder = $scope.curr_folder[name]['children'];
        }

        $scope.event_array.push(name);
    }

    $scope.forward = function() {
        console.log("forward clicked");

        if ($scope.path.length < 1) {
            console.log("At root.");
            return;
        };

        var path = $scope.path;
        path_array = path.split("/");

        var curr_folder = $scope.root_folder;
        for (var name = 0; name < path_array.length - 2; i++) {
            curr_folder = curr_folder[name];
        };
        $scope.curr_folder = curr_folder;
    }

    $scope.backward = function() {
        console.log("forward clicked");

        if ($scope.path.length < 1) {
            console.log("At root.");
            return;
        };

        var path = $scope.path;
        path_array = path.split("/");

        var curr_folder = $scope.root_folder;
        for (var name = 0; name < path_array.length - 2; i++) {
            curr_folder = curr_folder[name];
        };
        $scope.curr_folder = curr_folder;
    }

}