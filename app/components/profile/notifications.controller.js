angular
    .module('so.profile')
    .controller('NotificationsController', NotificationsController);




function NotificationsController($scope, $http, $timeout, $location, $state, $stateParams) {

    // $scope.api_domain = "http://104.197.111.36";
    // $scope.url_prefix = "http://104.197.111.36:8040";
    $scope.url_prefix = "http://localhost:8040";

    $scope.token = sessionStorage.getItem('token');
    $scope.accept = "accept";
    $scope.decline = "decline";
    
    // Set user struct info
    $scope.user = JSON.parse(sessionStorage['user']);
    $scope.user_type = sessionStorage.getItem('user_type');
    $scope.notifications = sessionStorage.getItem('notifications');

    if ($scope.notifications) {$scope.notifications = JSON.parse($scope.notifications)};

    
    $scope.getNotifications = function() {

        var url = $scope.url_prefix + "/users/get_notifications";
        var auth_string = String($scope.token) + ':' + String('unused');
        var auth_cred = btoa(auth_string);

        console.log($scope.user);

        $http({
            url: url,
            method: "GET",
            headers: {'Authorization': 'Basic ' + auth_cred }
        })
        .then(function(response) {
            console.log(response);

            if(response['data']['status'] == "success"){
                sessionStorage.setItem('notifications', JSON.stringify(response['data']['notifications']));
                $scope.notifications = response['data']['notifications'];
            }
        }, 
        function(response) {
            // failure
            console.log(response);
            
        });
    }

    $scope.updateNotification = function (note, action_taken) {
        var url = $scope.url_prefix + "/users/update_member_invite";
        var auth_string = String($scope.token) + ':' + String('unused');
        var auth_cred = btoa(auth_string);

        console.log(note);
        console.log(action_taken);


        $http({
            url: url,
            method: "POST",
            headers: {'Authorization': 'Basic ' + auth_cred },
            data: {'notification': note, 'action_taken': action_taken }
        })
        .then(function(response) {
            console.log(response);

            if(response['data']['status'] == "success"){
                note.seen = 1;
            }
        }, 
        function(response) {
            // failure
            console.log(response);
            
        });
    }

    

    $scope.getNotifications();
}
