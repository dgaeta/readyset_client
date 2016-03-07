angular
    .module('so.profile', [
        'ui.router'
    ])
    .config(function($stateProvider) {
        var profile = {
            name: 'profile',
            url: '/profile',
            templateUrl: 'components/profile/profile.html',
            controller: 'ProfileController',
        }

        var investor = {
            name: 'profile.investor',
            url: '/investor',
            parent: profile,  //mandatory
            templateUrl: 'components/profile/investor.html',
            controller: 'InvestorController'
        }

        var company = { 
            name: 'profile.company', //mandatory. This counter-intuitive requirement addressed in issue #368
            url: '/company',
            parent: profile,  //mandatory
            templateUrl: 'components/profile/company.html',
            controller: 'CompanyController'
        }

        var signPage = { 
            name: 'profile.sign', //mandatory. This counter-intuitive requirement addressed in issue #368
            url: '/:deal_id',
            parent: profile,  //mandatory
            templateUrl: 'components/profile/sign.html',
            controller: 'SignController'
        }

        // var item = { 
        //     name: 'profile.device', //mandatory. This counter-intuitive requirement addressed in issue #368
        //     url: '/device',
        //     parent: profile,  //mandatory
        //     templateUrl: 'components/profile/device.html',
        //     controller: 'DeviceController'
        // }

        $stateProvider
            .state(profile)
            .state(investor)
            .state(company)  

        // $stateProvider
        //     .state('soProfile', {
        //         url: '/profile',
        //         controller: 'SoProfileController',
        //         templateUrl: 'components/profile/profile.html'
        //     })
        //     .state( 'soProfile.device', {
        //         url: '/device',
        //         controller: 'SoDeviceController',
        //         templateUrl: 'components/profile/profile.device.html'
        //     });
    });

