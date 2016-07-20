angular
    .module('so.profile')
    .controller('InvestorController', InvestorController);

function InvestorController($scope, $cookies, $http, $state, Upload) {

    $scope.url_prefix = "http://104.197.71.151";
    //$scope.url_prefix = "http://localhost:8040";

    $scope.token = sessionStorage.getItem('token');
    
    // Set user struct info
    $scope.user = JSON.parse(sessionStorage['user']);
    $scope.investor_struct = JSON.parse(sessionStorage['investor_struct']);
    $scope.user_type = sessionStorage.getItem('user_type');
    $scope.jobs_count = $scope.investor_struct.jobs.length;
    $scope.boards_count = $scope.investor_struct.boards.length;
    $scope.investments_count = $scope.investor_struct.investments.length;

    // variables for add job
    $scope.clicked_add_job = false;
    $scope.alerts_addJob = [];
    $scope.new_job_company = "";
    $scope.new_job_role = "";
    $scope.new_job_company_pic_image = "";

    // variables for add board
    $scope.clicked_add_board = false;
    $scope.alerts_addBoard = [];
    $scope.new_board_company = "";
    $scope.new_board_role = "";

    // variables for add investment
    $scope.clicked_add_investment = false;
    $scope.alerts_addInvestment = [];
    $scope.new_investment_date = "";
    $scope.new_investment_company = "";
    $scope.new_investment_round = "";
    $scope.new_investment_details = "";

    $scope.myImage='';
    $scope.myCroppedImage='';
    $scope.editing_profile_photo = false;
    $scope.editing_photo = false;

    $scope.alerts = [];

    $scope.closeAlertJobs = function(index) {
        console.log("in here");
        $scope.alerts_addJob.splice(index, 1);
    };
    
    $scope.closeAlertBoards = function(index) {
        $scope.alerts_addBoard.splice(index, 1);
    };
    $scope.closeAlertInvestments = function(index) {
        $scope.alerts_addInvestment.splice(index, 1);
    };

    //listen for the file selected event
    $scope.$on("fileSelected", function (event, args) {
        $scope.$apply(function () {            
            //add the file object to the scope's files collection
            $scope.files.push(args.file);
        });
    });


    $scope.addJob = function() {
        if ($scope.new_job_company == "" || $scope.new_job_role == "") {
            $scope.alerts_addJob.push({type: 'danger', msg: 'Opps, make sure you fill all fields.'});
            $scope.clicked_add_job = false;
            return;
        };

        if ($scope.new_job_company_pic_image == "") {
            $scope.alerts_addJob.push({type: 'danger', msg: 'Opps, please click add company photo.'});
            $scope.clicked_add_job = false;
            return;
        };


        var url = $scope.url_prefix + "/users/investor_add_job";
        var auth_string = String($scope.token) + ':' + String('unused');
        var auth_cred = btoa(auth_string);

        console.log($scope.user);

        // $http({
        //     url: url,
        //     method: "POST",
        //     headers: {'Authorization': 'Basic ' + auth_cred },
        //     data: { 'new_job_company': $scope.new_job_company, 'new_job_role': $scope.new_job_role, 
        //             'new_job_company_pic_url': $scope.new_job_company_pic_url} 
        // })
        // .then(function(response) {
        //     console.log(response);

        //     if(response['data']['status'] == "success"){
        //         console.log(response);
        //         $scope.clicked_add_job = false;
        //         $scope.new_job_company = ""; $scope.new_job_role = ""; $scope.new_job_company_pic_url = ""; 

        //         $scope.investor_struct.jobs = response['data']['jobs'];
        //         sessionStorage.setItem('user', JSON.stringify(response['data']['user']));
        //         $state.go('profile.investor');
        //     }
        // }, 
        // function(response) {
        //     // failure
        //     $scope.clicked_add_job = false;

        //     console.log(response);
            
        // });

        // Debug prints
        //console.log(dataUrl);
        // var file_type_prefix = $scope.new_job_company_pic_image.substring(0, $scope.new_job_company_pic_image.indexOf(','))
        console.log("here");

        Upload.upload({
            url: url,
            headers: {'Authorization': 'Basic ' + auth_cred },
            file: Upload.dataUrltoBlob($scope.new_job_company_pic_image),
            data: {
                'new_job_company': $scope.new_job_company, 
                'new_job_role': $scope.new_job_role
            }
        }).success(function(data, status, headers, config){
            console.log("in here now ")
            console.log(status);
            console.log(data);

            if (data['status'] == "success") {
                console.log("success")
                $scope.clicked_add_job = false;
                $scope.investor_struct.jobs = data['jobs'];
                sessionStorage.setItem('investor_struct', JSON.stringify($scope.investor_struct));
            }
            else{
                console.log("failure");
                $scope.clicked_add_job = false;
                $scope.alerts_addJob.push({type: 'danger', msg: 'Opps, there was a problem uploading your job.'});

            };
            
            
        });
    }

    $scope.addBoard = function() {
        if ($scope.new_board_company == "" || $scope.new_board_role == "") {
            $scope.alerts_addBoard.push({type: 'danger', msg: 'Opps, make sure you fill all fields.'});
            $scope.clicked_add_board = false;
            return;
        };

        var url = $scope.url_prefix + "/users/investor_add_board";
        var auth_string = String($scope.token) + ':' + String('unused');
        var auth_cred = btoa(auth_string);

        console.log($scope.user);

        $http({
            url: url,
            method: "POST",
            headers: {'Authorization': 'Basic ' + auth_cred },
            data: { 'new_board_role': $scope.new_board_role, 'new_board_company': $scope.new_board_company} 
        })
        .then(function(response) {
            console.log(response);

            if(response['data']['status'] == "success"){
                console.log(response);
                $scope.clicked_add_board = false;
                $scope.new_board_company = ""; $scope.new_board_role = "";

                $scope.investor_struct.boards = response['data']['boards'];
                sessionStorage.setItem('investor_struct', JSON.stringify($scope.investor_struct));
            }
        }, 
        function(response) {
            // failure
            $scope.clicked_add_board = false;
            console.log(response);
            
        });
    }


    $scope.addInvestment = function() {
        if ($scope.new_investment_date == "" || $scope.new_investment_company == "" || 
                $scope.new_investment_round == "" || $scope.new_investment_details == "") {
            $scope.alerts_addInvestment.push({type: 'danger', msg: 'Opps, make sure you fill all fields.'});
            $scope.clicked_add_investment = false;
            return;
        };

        var url = $scope.url_prefix + "/users/investor_add_investment";
        var auth_string = String($scope.token) + ':' + String('unused');
        var auth_cred = btoa(auth_string);

        console.log($scope.user);

        $http({
            url: url,
            method: "POST",
            headers: {'Authorization': 'Basic ' + auth_cred },
            data: { 'new_investment_date': $scope.new_investment_date, 'new_investment_company': $scope.new_investment_company,
                    'new_investment_round': $scope.new_investment_round, 'new_investment_details': $scope.new_investment_details} 
        })
        .then(function(response) {
            console.log(response);

            if(response['data']['status'] == "success"){
                console.log(response);
                $scope.clicked_add_investment = false;
                $scope.new_investment_date = ""; $scope.new_investment_company = ""; $scope.new_investment_round = ""; $scope.new_investment_details = "";

                $scope.investor_struct.investments = response['data']['investments'];
                sessionStorage.setItem('investor_struct', JSON.stringify($scope.investor_struct));
            }
        }, 
        function(response) {
            // failure
            $scope.clicked_add_investment = false;
            console.log(response);
            
        });
    }



   
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

    $scope.clickFileInputCompanyPic = function() {
        console.log("jdkfj");
        
            $scope.editing_profile_photo = true;
            document.getElementById('companyImageInput').click();
        
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

    var handleCompanyPicFileSelect=function(evt) {
        console.log("handleFileSelect called");
        var file=evt.currentTarget.files[0];
        var reader = new FileReader();
        reader.onload = function (evt) {
            $scope.$apply(function($scope){
              $scope.new_job_company_pic_image = evt.target.result;
            });
        };
        reader.readAsDataURL(file);
    };


    angular.element(document.querySelector('#fileInput')).on('change',handleFileSelect);
    angular.element(document.querySelector('#companyImageInput')).on('change',handleCompanyPicFileSelect);

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