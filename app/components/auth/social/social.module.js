angular
    .module('so.auth.social', ['ui.router', 'firebase'])
    .config(function($stateProvider) {
        $stateProvider
            .state('soAuthSocial', {
                url: '/auth/social/',
                controller: 'SoAuthSocialController',
                templateUrl: 'components/auth/social/social.html'
            });
    });

