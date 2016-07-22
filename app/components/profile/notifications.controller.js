angular
    .module('so.profile')
    .controller('NotificationsController', NotificationsController);




function NotificationsController($scope, $http, $timeout, $location, $state, $stateParams) {

    $scope.url_prefix = "http://104.154.30.209";
    //$scope.url_prefix = "http://localhost:8040";

    $scope.token = sessionStorage.getItem('token');
    $scope.accept = "accept";
    $scope.decline = "decline";
    
    // Set user struct info
    $scope.user = JSON.parse(sessionStorage['user']);
    $scope.user_type = sessionStorage.getItem('user_type');
    $scope.notifications = sessionStorage.getItem('notifications');
    if ($scope.notifications) {
        $scope.notif_count = $scope.notifications.length;
    } else {
        $scope.notif_count = 0;
    };

    if ($scope.notifications) {$scope.notifications = JSON.parse($scope.notifications)};

    
    $scope.stringToDate = function(string) {
        var array = string.split("-");

        var numToMonthLookup = {"01": "January", "02": "February", "03": "March", 
            "04": "April", "05": "May", "06": "June", "07": "July",
            "08": "August", "09": "September", "10": "October", "11": "November",
            "12": "December",};

        var newDateString = array[2] + "  " + numToMonthLookup[array[1]];

        return newDateString;
    }

    $scope.emailToProfilePicUrl = function(email) {
        var url_prefix = "https://storage.googleapis.com/readyset-files/profile_pic%20";
        var email_split = email.split("@");
        var url_suffix = email_split[0] + "%40" + email_split[1];

        return url_prefix + url_suffix;
    }


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
