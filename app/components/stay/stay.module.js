angular
    .module('so.stay', [
        'ui.router',
    ])
    .config(function($stateProvider) {
        $stateProvider
            .state('soStay', {
                url: '/stay',
                templateUrl: 'components/stay/stay.html'
            });
    });

