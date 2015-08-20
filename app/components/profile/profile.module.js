angular
    .module('so.profile', [
        'ui.router',
        'AuthService',
        'FireRefService'
    ])
    .config(function($stateProvider) {
        $stateProvider
            .state('soProfile', {
                url: '/profile',
                controller: 'SoProfileController',
                templateUrl: 'components/profile/profile.html'
            });
    });

