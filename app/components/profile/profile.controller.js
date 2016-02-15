angular
    .module('so.profile')
    .controller('SoProfileController', SoProfileController);

function SoProfileController($scope, $cookies, AuthService, UserService) {

	// if (FireRefService.getAuth()) {
	// 	$scope.uid = FireRefService.getAuth().uid;
	// 	$scope.user = UserService($scope.uid);
	// 	console.log("current user is:")
	// 	console.log($scope.user);
	// };
	var token = $cookies.get('token');
    var devices = $cookies.get('devices');
    var deviceCount = $cookies.get('device_count');
    var email = $cookies.get('email');

    console.log(token);
    console.log(devices);
    console.log(deviceCount);
    console.log(email);

}