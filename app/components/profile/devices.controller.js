angular
    .module('so.profile')
    .controller('DevicesController', DevicesController);

function DevicesController($scope, $cookies, AuthService, UserService) {

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

    console.log($scope.token);
    console.log($scope.devices);
    console.log($scope.deviceCount);
    console.log($scope.email);

    $scope.ClickedDevice = function(device_id) {
     	console.log(device_id);
     	$state.transitionTo(states.profile.device);
    }

}