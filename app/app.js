// app.js

var so = angular.module('so', [
    'ui.router',
    'ui.bootstrap',
    'so.home',
    'so.auth',
    'so.private'
]);

so.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
});

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