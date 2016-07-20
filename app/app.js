// app.js

var so = angular.module('so', [
    'ui.router',
    'ui.bootstrap',
    'so.home',
    'so.auth',
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

so.directive('rsSetHeight', function($window){
  return{
    link: function(scope, element, attrs){
        element.css('min-height', $window.innerHeight + 'px');
        //element.height($window.innerHeight/3);
    }
  }
});

so.controller("soCtrl", ["$scope", "$rootScope", "$cookies", "$state",
	function($scope, $rootScope, $cookies, $state) {

        

        $scope.user = sessionStorage.getItem('user');
        if ($scope.user) {
            $scope.user = JSON.parse($scope.user);
            if ($scope.user.profile_pic == '') {
                $scope.no_profile_pic = true;
            };
        } else {
            $scope.no_profile_pic = true;
        };




        $state.go('home');

        $scope.tokenExists = function() {
            if (sessionStorage.getItem('token')){
                return true;
            }
            else {
                return false;
            }
        }

        $scope.logout = function() {
           
            sessionStorage.clear()
            $state.go('home');

        }

        $scope.stateProfile = function() {

            var user_type = sessionStorage.getItem('user_type');
            if (user_type == "company") {
                $state.go('profile.company')
            };

            if (user_type == "investor") {
                $state.go('profile.investor')
            };

        }


        $scope.viewNotifications = function() {

            $state.go('profile.notifications', {notify: false})
            
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
        $scope.token = sessionStorage.getItem('token');
        
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