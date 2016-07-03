angular
    .module('so.profile')
    .controller('InvestorController', InvestorController);

function InvestorController($scope, $cookies, $http, $state, Upload) {

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

    $scope.myImage='';
    $scope.myCroppedImage='';
    $scope.editing_profile_photo = false;
    $scope.editing_photo = false;


    //listen for the file selected event
    $scope.$on("fileSelected", function (event, args) {
        $scope.$apply(function () {            
            //add the file object to the scope's files collection
            $scope.files.push(args.file);
        });
    });

   
    $scope.clickFileInput = function() {
        if ($scope.myCroppedImage != "") {
            $scope.editing_profile_photo = true;
        document.getElementById('fileInput').click();
        }
        

    }

    //  FUNCTIONS FOR COMPANY CONTROLLER //
    $scope.uploadProfilePic = function(dataUrl) {
        // URL Construction with auth token
        var url = $scope.url_prefix + "/users/set_profile_pic";
        var auth_string = String($scope.token) + ':' + String('unused');
        var auth_cred = btoa(auth_string);
        
        // Debug prints
        //console.log(dataUrl);
        var file_type_prefix = dataUrl.substring(0, dataUrl.indexOf(','))
        console.log(typeof(dataUrl));
        console.log("here");

        Upload.upload({
            url: url,
            headers: {'Authorization': 'Basic ' + auth_cred },
            data: {file: Upload.dataUrltoBlob(dataUrl), 'file_type': file_type_prefix }
        }).success(function(data, status, headers, config){
            console.log("in here now ")
            console.log(status);
            console.log(data);
            console.log(data['url']);

            $scope.user = data['user'];
            sessionStorage.setItem('profile_pic', dataUrl);
            sessionStorage.setItem('user', JSON.stringify($scope.user));
            
        });        
    }


    var handleFileSelect=function(evt) {
        console.log("handleFileSelect called");
        var file=evt.currentTarget.files[0];
        var reader = new FileReader();
        reader.onload = function (evt) {
            $scope.$apply(function($scope){
              $scope.myImage=evt.target.result;
            });
        };
        reader.readAsDataURL(file);
    };
    angular.element(document.querySelector('#fileInput')).on('change',handleFileSelect);

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