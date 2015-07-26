angular
    .module('so.auth.login', ['ui.router', 'Auth'])
    .config(function($stateProvider) {
        $stateProvider
            .state('soAuthLogin', {
                url: '/auth/login/',
                controller: 'SoAuthLoginController',
                templateUrl: 'components/auth/login/login.html'
            });
    });

    
    
