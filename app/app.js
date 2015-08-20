// app.js

var so = angular.module('so', [
    'ui.router',
    'ui.bootstrap',
    'so.home',
    'so.auth',
    'so.stay',
    'so.invest',
    'so.about',
    'so.works',
    'so.signup',
    'so.profile',
    'AuthService',
    'FireRefService',
    'UserService',
    'so.private'
]);

so.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
});

so.controller("soCtrl", ["$scope", "AuthService", "FireRefService", "UserService",
	function($scope, AuthService, FireRefService, UserService) {
		$scope.authData = AuthService.$getAuth();

        $scope.logout = function() {

            AuthService.$unauth(function(authData) {
                if (!authData) {
                    console.log("logged out");
                    $scope.authData = null;
                };
            })
        }

        FireRefService.onAuth( function(authData) {
            $scope.authData = authData;

            if (FireRefService.getAuth()) {
                $scope.uid = FireRefService.getAuth().uid;
                $scope.user = UserService($scope.uid);
            };
        })

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