angular
    .module('so.profile')
    .controller('SoProfileController', SoProfileController);

function SoProfileController($scope, AuthService, FireRefService, UserService) {

	if (FireRefService.getAuth()) {
		$scope.uid = FireRefService.getAuth().uid;
		$scope.user = UserService($scope.uid);
		console.log("current user is:")
		console.log($scope.user);
	};
	

}