angular
    .module('so.profile')
    .controller('CompanyController', CompanyController);



function CompanyController($scope, Upload, $rootScope, $cookies, $http, $timeout, $location, $anchorScroll, $state, $stateParams, $uibModal, $log) {

    $scope.url_prefix = "http://104.197.71.151";
    //$scope.url_prefix = "http://localhost:8040";

    $scope.token = sessionStorage.getItem('token');
    
    // Set user struct info
    $scope.user = JSON.parse(sessionStorage['user']);
    $scope.user_type = sessionStorage.getItem('user_type');

    // Set company struct 
    $scope.company_struct = JSON.parse(sessionStorage['company_struct']);
    var i = 0;
    var keys = Object.keys($scope.company_struct['presentation_items']['photos']);
    $scope.carousel_photos_count = keys.length;
    for (var i = 0; i < Object.keys($scope.company_struct['presentation_items']['photos']).length; i++) {
        $scope.company_struct['presentation_items']['photos'][keys[i]]['index'] = i;
    };

    if ($scope.company_struct.members.board_members.accepted) {
        $scope.board_member_count = Object.keys($scope.company_struct.members.board_members.accepted).length;
    } else {
         $scope.board_member_count = 0;
    };
    if ($scope.company_struct.members.investors.accepted) {
        $scope.investor_count = Object.keys($scope.company_struct.members.board_members.accepted).length;
    } else {
         $scope.investor_count = 0;
    };
    if ($scope.company_struct.members.employees.accepted) {
        $scope.employees_count = Object.keys($scope.company_struct.members.board_members.accepted).length;
    } else {
         $scope.employees_count = 0;
    };



    // Used for editing and new items
    $scope.editing_profile_photo = false;
    $scope.editing = false;
    $scope.myImage=false;
    $scope.myCroppedImage=false;

    $scope.editing_carousel_photo = false;
    $scope.myCarouselImage=false;
    $scope.myCarouselCroppedImage=false;
    
    // For adding a new funding round
    $scope.clicked_add_funding_round = false;
    $scope.alerts_addFundingRound = [];
    $scope.new_fd_date = "";
    $scope.new_fd_amount = "";
    $scope.new_fd_valuation = "";
    $scope.new_fd_lead_investor = "";
    $scope.new_fd_investors_count = 0;

    // Carousel section
    $scope.presentation_title = "";
    $scope.myInterval = 5000;
    $scope.noWrapSlides = false;
    var currIndex = 0;
    //an array of files selected
    $scope.files = [];
    // New deal 
    $scope.new_deal_name = '';
    $scope.new_deal_date = '';
    $scope.new_deal_description = '';


    $scope.items = ['item1', 'item2', 'item3'];
    $scope.animationsEnabled = true;



    $scope.closeAlertFundingRound = function(index) {
        console.log("in here");
        $scope.alerts_addFundingRound.splice(index, 1);
    };


    $scope.clickFileInputProfPic = function() {
        console.log("jdkfj");
        if ($scope.myCroppedImage != "") {
            $scope.editing_profile_photo = true;
            document.getElementById('fileInput').click();
        }
    }

    $scope.clickFileInputCarouselPic = function() {
        console.log("jdkfj");

        $scope.editing_carousel_photo = true;
        document.getElementById('carouselInput').click();
   
        

    }


    $scope.open = function (size) {

        var modalInstance = $uibModal.open({
              animation: $scope.animationsEnabled,
              templateUrl: 'components/profile/addMemberModalContent.html',
              controller: 'ModalInstanceCtrl',
              size: size,
              resolve: {
                items: function () {
                  return $scope.items;
                },
                user: function () {
                    return $scope.user;
                },
                company_struct: function () {
                    return $scope.company_struct;
                }
              }
        });

        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };


    $scope.scrollTo = function(id) {
      $location.hash(id);
      $anchorScroll();
   }

    //listen for the file selected event
    $scope.$on("fileSelected", function (event, args) {
        $scope.$apply(function () {            
            //add the file object to the scope's files collection
            $scope.files.push(args.file);
        });
    });
    


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
            $scope.editing_profile_photo = false;
            console.log("in here now ")
            console.log(status);
            console.log(data);
            console.log(data['url']);

            $scope.user = data['user'];
            sessionStorage.setItem('profile_pic', dataUrl);
            sessionStorage.setItem('user', JSON.stringify($scope.user));
            
        });        
    }

    $scope.setChanges = function() {

        var url = $scope.url_prefix + "/users/edit";
        var auth_string = String($scope.token) + ':' + String('unused');
        var auth_cred = btoa(auth_string);

        console.log($scope.user);

        $http({
            url: url,
            method: "POST",
            headers: {'Authorization': 'Basic ' + auth_cred },
            data: { 'user': JSON.stringify($scope.user), 
            'presentation_title': $scope.company_struct.presentation_items.presentation_title,
            'member_permissions': JSON.stringify($scope.company_struct.member_permissions)} 
        })
        .then(function(response) {
            console.log(response);

            if(response['data']['status'] == "success"){
                sessionStorage.setItem('user', JSON.stringify($scope.user));
                sessionStorage.setItem('company_struct', JSON.stringify($scope.company_struct));
                console.log(response);
                $state.go('profile.company');
            }
        }, 
        function(response) {
            // failure
            console.log(response);
            
        });
    }


    $scope.editing_prof_pic = function() {
        $scope.editing_profile_photo = true;
    }


    $scope.signDeal = function(deal_name) {
        console.log(deal_name);
        sessionStorage.setItem('clicked_deal_name', deal_name);
        $state.go('profile.company.sign_deal', deal_name);
    }


    $scope.addDeal = function(){

        if ($scope.new_deal_name in $scope.company_struct['deal_flow_management']) {
            console.log("deal name already exists");
            return "Deal name " + $scope.new_deal_name + " already exists";
        };

        var url = $scope.url_prefix + "/deals/initialize";

        var auth_string = String($scope.token) + ':' + String('unused');
        var auth_cred = btoa(auth_string);


        console.log($scope.new_deal_name);
        console.log($scope.new_deal_date);
        console.log($scope.new_deal_description);

        $http({
            url: url,
            method: "POST",
            headers: {'Authorization': 'Basic ' + auth_cred},
            data: {'deal_name': $scope.new_deal_name, 'date': $scope.new_deal_date, 
                'description': $scope.new_deal_description
            } 

        })
        .then(function(response) {
            console.log(response);

            if(response['data']['status'] == "success"){
                console.log(response['data']['status']);

                $scope.new_deal_name = "";
                $scope.new_deal_date = "";
                $scope.new_deal_description = "";

                $scope.company_struct['deal_flow_management'] = response['data']['company_struct']['deal_flow_management'];
                sessionStorage.setItem('company_struct', JSON.stringify($scope.company_struct));
                
            }
        }, 
        function(response) {
            // failure
            console.log(response);
            
        });

    }



    $scope.deleteDeal = function(deal){


        var url = $scope.url_prefix + "/deals/delete";

        var auth_string = String($scope.token) + ':' + String('unused');
        var auth_cred = btoa(auth_string);

        var deal = {}
        deal.name = "Seed Round Funding";

        $http({
            url: url,
            method: "POST",
            headers: {'Authorization': 'Basic ' + auth_cred},
            data: {'deal_name': deal.name } 

        })
        .then(function(response) {
            console.log(response);

            if(response['data']['status'] == "success"){
                console.log(response['data']['status']);

                $scope.company_struct['deal_flow_management'] = response['data']['company_struct']['deal_flow_management'];
                sessionStorage.setItem('company_struct', JSON.stringify($scope.company_struct));
                
            }
        }, 
        function(response) {
            // failure
            console.log(response);
            
        });

    }

    //the save method
    $scope.uploadDealFile = function(deal) {
        console.log(deal);
        var url = $scope.url_prefix + "/deals/upload_file";

        var auth_string = String($scope.token) + ':' + String('unused');
        var auth_cred = btoa(auth_string);

        console.log(deal['name']);
        console.log("just before the $http");
        Upload.upload({
                url: url,
                headers: {'Authorization': 'Basic ' + auth_cred },
                data: {file: $scope.files[0], deal_name: deal['name'], 
                    file_type: $scope.files[0].type
                }
            }).success(function(data, status, headers, config){
                console.log(data);
                $scope.files = [];

                $scope.company_struct['deal_flow_management'] = data['company_struct']['deal_flow_management'];
            });
    };


    $scope.getDocument = function(deal_name, file_name){
        $scope.url_prefix =   $scope.api_domain;
        var url = $scope.url_prefix + "/deals/get_document";

        var auth_string = String($scope.token) + ':' + String('unused');
        var auth_cred = btoa(auth_string);

        console.log(deal_name);
        console.log(file_name);
        $http({
            url: url,
            method: "POST",
            headers: {'Authorization': 'Basic ' + auth_cred},
            data: {'deal_name': deal_name, 'file_name': file_name},
            config: {'responseType':'arraybuffer'} 
        })
        .then(function(response) {
            console.log(response);

            if(response['status'] == 200){
                console.log("hello");

                // Convert the Base64 string back to text.
                var byteString = atob(response['data']['doc_base64']);

                // Convert that text into a byte array.
                var ab = new ArrayBuffer(byteString.length);
                var ia = new Uint8Array(ab);
                for (var i = 0; i < byteString.length; i++) {
                    ia[i] = byteString.charCodeAt(i);
                }

                // Blob for saving.
                var blob = new Blob([ia], { type: response['data']['file_type'] });

                // Tell the browser to save as report.txt.
                saveAs(blob, file_name);
            
            }
        }, 
        function(response) {
            // failure
            console.log(response);
            
        });
    }



    $scope.addSlide = function() {
        var newWidth = 600 + slides.length + 1;
        slides.push({
            image: 'images/ImgTestimonia1.jpg',
            text: 'Nice image',
            id: currIndex++
        });
    };


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
    angular.element(document.querySelector('#carouselInput')).on('change',handleFileSelect);

    

    $scope.upload = function (dataUrl) {
        Upload.upload({
            url: 'https://angular-file-upload-cors-srv.appspot.com/upload',
            data: {
                file: Upload.dataUrltoBlob(dataUrl)
            },
        }).then(function (response) {
            $timeout(function () {
                $scope.result = response.data;
            });
        }, function (response) {
            if (response.status > 0) $scope.errorMsg = response.status 
                + ': ' + response.data;
        }, function (evt) {
            $scope.progress = parseInt(100.0 * evt.loaded / evt.total);
        });
    }



    


    $scope.uploadCarouselImage = function(dataUrl) {
        // URL Construction with auth token
        var url = $scope.url_prefix + "/users/set_carousel_image";
        var auth_string = String($scope.token) + ':' + String('unused');
        var auth_cred = btoa(auth_string);
        
        // Debug prints
        //console.log(dataUrl);

        Upload.upload({
            url: url,
            headers: {'Authorization': 'Basic ' + auth_cred },
            data: {file: Upload.dataUrltoBlob(dataUrl) }
        }).success(function(data, status, headers, config){
            console.log("in here now ")
            console.log(status);
            console.log(data);

            $scope.company_struct = data['company_struct'];
            sessionStorage.setItem('company_struct', JSON.stringify(data['company_struct']));
       
        });       
    }

    $scope.deleteCarouselImage = function(unique_id) {
        var url = $scope.url_prefix + "/users/delete_carousel_image";

        var auth_string = String($scope.token) + ':' + String('unused');
        var auth_cred = btoa(auth_string);

        console.log(unique_id);

        $http({
            url: url,
            method: "POST",
            headers: {'Authorization': 'Basic ' + auth_cred},
            data: {'unique_id': unique_id},
            config: {'responseType':'arraybuffer'} 
        })
        .then(function(response) {
            console.log(response);

            if(response['status'] == 200){
                console.log("hello");

                $scope.company_struct['presentation_items'] = response['data']['company_struct_presentation_items'];
                sessionStorage.setItem('company_struct', JSON.stringify($scope.company_struct));
            
            }
        }, 
        function(response) {
            // failure
            console.log(response);
            
        });
    }


    function convertDataURLToImageData(dataURL, callback) {
        if (dataURL !== undefined && dataURL !== null) {
            var canvas, context, image;
            canvas = document.createElement('canvas');
            canvas.width = 470;
            canvas.height = 470;
            context = canvas.getContext('2d');
            image = new Image();
            image.addEventListener('load', function(){
                context.drawImage(image, 0, 0, canvas.width, canvas.height);
                callback(context.getImageData(0, 0, canvas.width, canvas.height));
            }, false);
            image.src = dataURL;
            return image;
        } else {
            return null;
        }
    }


    


    $scope.getProfilePic = function() {
        var url = $scope.url_prefix + "/users/get_profile_pic";
        var auth_string = String($scope.token) + ':' + String('unused');
        var auth_cred = btoa(auth_string);

        $http({
            url: url,
            method: "GET",
            headers: {'Authorization': 'Basic ' + auth_cred }
        })
        .then(function(response) {
            console.log(response);

            if(response['data']['status'] == "success"){
                blob_string = atob(response['data']['data']);
                console.log(typeof(blob_string));
                // objectURL = URL.createObjectURL(blob_string);
                // $scope.user.prof_pic_data = ;
            }
        }, 
        function(response) {
            // failure
            console.log(response);
            
        }); 
    }


    $scope.addFundingRound = function() {
        if ($scope.new_fd_date == "" || $scope.new_fd_amount == "" || $scope.new_fd_valuation == "" ||
            $scope.new_fd_lead_investor == "" || $scope.new_fd_investors_count == "") {

            $scope.alerts_addFundingRound.push({type: 'danger', msg: 'Opps, please fill out all fields above to add.'});
            $scope.clicked_add_funding_round = false;
            return;
        };

        var url = $scope.url_prefix + "/users/company_add_funding_round";

        var auth_string = String($scope.token) + ':' + String('unused');
        var auth_cred = btoa(auth_string);


        $http({
            url: url,
            method: "POST",
            headers: {'Authorization': 'Basic ' + auth_cred},
            data: {'new_fd_date': $scope.new_fd_date, 'new_fd_amount': $scope.new_fd_amount, 
                'new_fd_valuation': $scope.new_fd_valuation, 'new_fd_lead_investor': $scope.new_fd_lead_investor,
                'new_fd_investors_count': $scope.new_fd_investors_count
            } 

        })
        .then(function(response) {
            console.log(response);

            if(response['data']['status'] == "success"){
                console.log(response['data']['status']);
                $scope.clicked_add_funding_round = false;

                $scope.new_fd_date = "";
                $scope.new_fd_amount = "";
                $scope.new_fd_valuation = "";
                $scope.new_fd_lead_investor = "";
                $scope.new_fd_investors_count = "";

                $scope.company_struct['funding_rounds'] = response['data']['funding_rounds'];
                sessionStorage.setItem('company_struct', JSON.stringify($scope.company_struct));
                
            }
        }, 
        function(response) {
            // failure
            console.log(response);
            $scope.alerts_addFundingRound.push({type: 'danger', msg: 'Opps, there was a problem adding the round.'});
            $scope.clicked_add_funding_round = false;
            
        });
    }

}


// Please note that $uibModalInstance represents a modal window (instance) dependency.
// It is not the same as the $uibModal service used above.

angular.module('so.profile').controller('ModalInstanceCtrl', function ($scope, $http, $uibModalInstance, items, user, company_struct) {


    $scope.url_prefix = "http://localhost:8040";
    $scope.token = sessionStorage.getItem('token');

    $scope.items = items;
    $scope.selected = {
        item: $scope.items[0]
    };

    $scope.user = user;
    $scope.company_struct = company_struct;

    $scope.invite_email = '';

    $scope.alerts = [];

    $scope.radioModel = '';
    $scope.inviter_name = '';


    $scope.checkResults = [];

    $scope.$watchCollection('checkModel', function () {
        $scope.checkResults = [];
        angular.forEach($scope.checkModel, function (value, key) {
            if (value) {
                $scope.checkResults.push(key);
            }
        });
    });

    $scope.ok = function () {

        if ($scope.invite_email == '') {
            $scope.alerts.push({type: 'danger', msg: 'Opps, can you enter an email?'});
        } 
        else if ($scope.radioModel == ''){
            $scope.alerts.push({type: 'danger', msg: 'Opps, can you pick a member type?'});
        }
        else {

            if ($scope.invite_email in $scope.company_struct.members[$scope.radioModel]['invited']) {
                $scope.alerts.push({type: 'danger', msg: 'Opps, you already invited this email?'});
            } else {

                var url = $scope.url_prefix + "/users/invite_member";
                var auth_string = String($scope.token) + ':' + String('unused');
                var auth_cred = btoa(auth_string);

                $http({
                    url: url,
                    method: "POST",
                    headers: {'Authorization': 'Basic ' + auth_cred },
                    data: {'company_name': $scope.user.company_name, 'invite_email': $scope.invite_email,
                            'member_type': $scope.radioModel, 'inviter_name': $scope.inviter_name,
                            }
                })
                .then(function(response) {
                    console.log(response);

                    if(response['data']['status'] == "success"){
                        sessionStorage.setItem('company_struct', JSON.stringify(response['data']['company_struct']));
                        $uibModalInstance.close($scope.selected.item);
                       
                    }
                }, 
                function(response) {
                    // failure
                    console.log(response);
                    
                }); 

                
            };

        };
    
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };

  $scope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1);
    };
});


