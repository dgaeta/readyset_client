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
    'ngCookies',
    'ngFileUpload',
    'ngImgCrop',
    'ngAnimate',
    'ui.bootstrap'

]);

so.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
    $urlRouterProvider.otherwise('/');
    //Enable cross domain calls
    $httpProvider.defaults.useXDomain = true;
    
});

so.controller("soCtrl", ["$scope", "$rootScope", "$cookies", "$state",
	function($scope, $rootScope, $cookies, $state) {
        $state.go('home');

        $scope.tokenExists = function() {
            if ($cookies.get('token')){
                return true;
            }
            else {
                return false;
            }
        }

        $scope.logout = function() {
            console.log($rootScope.token);
            $rootScope.token = "";
            console.log($rootScope.token);
            $cookies.put('token', '');
            $scope.token = "";
            $state.go('home');

        }

        $scope.stateProfile = function() {

            var user_type = $cookies.get('user_type');
            if (user_type == "company") {
                $state.go('profile.company')
            };

            if (user_type == "investor") {
                $state.go('profile.investor')
            };

        }

	}
]);


so.directive('fileUpload', function () {
    return {
        scope: true,        //create a new scope
        link: function (scope, el, attrs) {
            el.bind('change', function (event) {
                var files = event.target.files;
                //iterate files since 'multiple' may be specified on the element
                for (var i = 0;i<files.length;i++) {
                    //emit event upward
                    scope.$emit("fileSelected", { file: files[i] });
                }                                       
            });
        }
    };
});

so.run(function($rootScope, $state) {


    $rootScope.$on('$routeChange', function(event, next, previous) {
        $scope.token = $cookies.get('token');
        
    });

    // $rootScope.$on('$stateChangeStart', 
    // function(event, toState, toParams, fromState, fromParams){ 
    //     console.log("in here");
    // })

    $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
        if (error === 'AUTH_REQUIRED') {
            $state.go('soAuthLogin');
        }
    });
});