angular
    .module('so.auth.login.brand', ['ui.router', 'Auth'])
    .config(function($stateProvider) {
        $stateProvider
            .state('soBrandLogin', {
                url: '/login/brand',
                controller: 'LoginBrandController',
                templateUrl: 'components/auth/login/brand/brand.html'
            });
    });

    
    
