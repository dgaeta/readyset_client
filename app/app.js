// app.js

var so = angular.module('so', [
    'ui.router',
    'ui.bootstrap',
    'so.home',
    'so.auth',
    'AuthService',
    'so.private'
]);

so.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
});

so.controller("soCtrl", ["$scope", "AuthService",
	function($scope, AuthService) {
		$scope.authData = AuthService.$getAuth();


		if ($scope.authData) {
		  console.log("Logged in as:", $scope.authData.uid);
		} else {
		  console.log("Logged out");
		}

	}
]);

so.run(function($rootScope, $state) {

    $rootScope.$on('$routeChange', function(event, next, previous) {
        console.log('Route Change');
    });

    $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
        if (error === 'AUTH_REQUIRED') {
            $state.go('soAuthLogin');
        }
    });
});