angular
    .module('so.auth.registration.brand', ['ui.router'])
    .config(function($stateProvider) {
        $stateProvider
            .state('brand', {
                url: '/registration/brand',
                controller: 'BrandController',
                templateUrl: 'components/auth/registration/brand/brand.html'
            });
    });