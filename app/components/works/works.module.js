angular
    .module('so.works', [
        'ui.router',
    ])
    .config(function($stateProvider) {
        $stateProvider
            .state('soWorks', {
                url: '/how',
                templateUrl: 'components/works/works.html'
            });
    });

