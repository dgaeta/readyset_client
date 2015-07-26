// app.js

var so = angular.module('so', [
    'ui.router',
    'ui.bootstrap',
    'so.home',
    'so.auth',
]);

so.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
});