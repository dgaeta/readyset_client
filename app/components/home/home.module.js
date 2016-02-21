angular
    .module('so.home', [
        'ui.router',
    ])
    .config(function($stateProvider) {
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'components/home/home.html'
            });
    });

