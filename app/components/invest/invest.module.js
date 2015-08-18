angular
    .module('so.invest', [
        'ui.router',
    ])
    .config(function($stateProvider) {
        $stateProvider
            .state('soInvest', {
                url: '/invest',
                templateUrl: 'components/invest/invest.html'
            });
    });

