angular
    .module('so.private', ['ui.router', 'AuthService'])
    .config(function($stateProvider) {
        $stateProvider
            .state('soPrivate', {
                url: '/private/',
                controller: 'SoPrivateController',
                templateUrl: 'components/private/private.html',
                resolve: {
                    // controller will not be loaded until $requireAuth resolves
                    // Auth refers to our $firebaseAuth wrapper in the example above
                    'currentAuth': ['AuthService', function(AuthService) {
                        // $requireAuth returns a promise so the resolve waits for it to complete
                        // If the promise is rejected, it will throw a $stateChangeError (see above)
                        return AuthService.$requireAuth();
                    }]
                }
            });
    })

    .controller('SoPrivateController', ['currentAuth', function(currentAuth) {
        console.log(currentAuth);
    }]);

    
    
