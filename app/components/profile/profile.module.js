angular
    .module('so.profile', [
        'ui.router',
        'AuthService',
        'FireRefService'
    ])
    .config(function($stateProvider) {
        var profile = {
            name: 'profile',
            url: '/profile',
            templateUrl: 'components/profile/profile.html',
            controller: 'ProfileController',
        }

        var devices = {
            name: 'profile.devices',
            url: '/devices',
            parent: profile,  //mandatory
            templateUrl: 'components/profile/devices.html'
            // controller: 'DevicesController'
        }

        var device = { 
            name: 'profile.device', //mandatory. This counter-intuitive requirement addressed in issue #368
            url: '/device',
            parent: profile,  //mandatory
            templateUrl: 'components/profile/device.html',
            controller: 'DeviceController'
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
            .state(devices)
            .state(device)  

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

