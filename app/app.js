// app.js

var so = angular.module('so', ['ui.router', 'ui.bootstrap', 'so.auth.registration.user', 'so.auth.registration.brand',
    'so.auth.login.brand']);

so.config(function($stateProvider, $urlRouterProvider) {

    
    $urlRouterProvider.otherwise('/home');
    
    $stateProvider
        
        // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
            url: '/home',
            templateUrl: 'partial-home.html'
        })


      

        
}); // closes $routerApp.config()


