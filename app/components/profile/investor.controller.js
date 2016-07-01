angular
    .module('so.profile')
    .controller('InvestorController', InvestorController);

function InvestorController($scope, $cookies, $http, $state) {

    // $scope.api_domain = "http://104.197.111.36";
    // $scope.url_prefix = "http://104.197.111.36:8040";
    $scope.url_prefix = "http://localhost:8040";

    $scope.token = sessionStorage.getItem('token');
    
    // Set user struct info
    $scope.user = JSON.parse(sessionStorage['user']);
    $scope.investor_struct = JSON.parse(sessionStorage['investor_struct']);
    $scope.user_type = sessionStorage.getItem('user_type');


    $scope.jobs = [{'company_name': 'Tesla', 'role': "CEO"}, {'company_name': 'SpaceX', 'role': "CEO & CTO"}];
    $scope.boards = [{'company_name': 'Medialets', 'role': "Investor"}];
    $scope.investments = [{'date': 'Jan. 2016', 'invested_in': "Memebox Corportation", 'round': '$100M/Series D', 
        'details': 'Personal Investment'}];
    // $scope.prof_pic_url = $cookies.get('prof_pic_url');

    
    $scope.editing_profile_photo = false;
    $scope.editing_photo = false;

   
    $scope.setChanges = function() {
        $scope.editing = false;

        
        var url = $scope.url_prefix + "/users/investor_edit";
        var auth_string = String($scope.token) + ':' + String('unused');
        var auth_cred = btoa(auth_string);

        console.log($scope.user);

        $http({
            url: url,
            method: "POST",
            headers: {'Authorization': 'Basic ' + auth_cred },
            data: { 'user_data': $scope.user} 
        })
        .then(function(response) {
            console.log(response);

            if(response['data']['status'] == "success"){
                console.log(response);
                $scope.user = response['data']['user'];
                sessionStorage.setItem('user', JSON.stringify(response['data']['user']));
                $state.go('profile.investor');
            }
        }, 
        function(response) {
            // failure
            console.log(response);
            
        });
    }

}