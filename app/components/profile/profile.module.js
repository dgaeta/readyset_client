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

        var investorEdit = {
            name: 'profile.investor_edit',
            url: '/investor_edit',
            parent: profile,  //mandatory
            templateUrl: 'components/profile/investor_edit.html',
            controller: 'InvestorController'
        }

        var company = { 
            name: 'profile.company', //mandatory. This counter-intuitive requirement addressed in issue #368
            url: '/company',
            parent: profile,  //mandatory
            templateUrl: 'components/profile/company.html',
            controller: 'CompanyController'
        }

        var companyEdit = { 
            name: 'profile.company_edit', //mandatory. This counter-intuitive requirement addressed in issue #368
            url: '/company_edit',
            parent: profile,  //mandatory
            templateUrl: 'components/profile/company_edit.html',
            controller: 'CompanyController'
        }

        var dealSign = { 
            name: 'profile.company.sign_deal', //mandatory. This counter-intuitive requirement addressed in issue #368
            url: '/company/:deal_id',
            parent: profile,  //mandatory
            templateUrl: 'components/profile/sign_deal.html',
            controller: 'CompanyController'
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
            .state(investorEdit)
            .state(company)  
            .state(companyEdit) 
            .state(dealSign)

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

