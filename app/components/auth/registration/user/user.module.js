angular
    .module('so.auth.registration.user', ['ui.router', "firebase", "Auth"])
    .config(function($stateProvider) {
        $stateProvider
            .state('user', {
                url: '/registration/user',
                controller: 'UserController',
                templateUrl: 'components/auth/registration/user/user.html'
            });
    });

