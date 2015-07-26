angular
    .module('so.auth.registration.brand', ['ui.router', 'firebase', 'Auth'])
    .config(function($stateProvider) {
        $stateProvider
            .state('soBrand', {
                url: '/registration/brand',
                controller: 'BrandController',
                templateUrl: 'components/auth/registration/brand/brand.html'
            });
    });

    
    
