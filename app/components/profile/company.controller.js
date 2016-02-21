angular
    .module('so.profile')
    .controller('CompanyController', CompanyController);




function CompanyController($scope, $rootScope, $cookies, AuthService, UserService, $http, Upload, $timeout) {

    $scope.user_type = $cookies.get('user_type');
	$scope.token = $cookies.get('token');
    $scope.email = $cookies.get('email');
    $scope.city = $cookies.get('city');
    $scope.state = $cookies.get('state');
    $scope.website = $cookies.get('website');
    $scope.headline = $cookies.get('headline');

    $scope.company_name = $cookies.get('company_name');
    $scope.founders = $cookies.get('founders');
    $scope.industry = $cookies.get('industry');
    $scope.board_members = [{'pic_url': 'images/InvestorSample.jpg', 'name': 'Marissa Meyer'},{'pic_url': 'images/InvestorSample.jpg', 'name': 'Marissa Meyer'}];
    $scope.investors = $cookies.get('investors');
    $scope.employees = $cookies.get('employees');
    $scope.documents = $cookies.get('documents');
    $scope.funding_rounds =[{'date': 'Jan. 2016', 'amount': '$100M / Series D', 'valuation': '', 
        'lead_investor': 'OrbiMed Advisors', 'investors_count': 8}, 
        {'date': 'Jan. 2016', 'amount': '$100M / Series D', 'Valuation': '', 
        'lead_investor': 'OrbiMed Advisors', 'investors_count': 8},
        {'date': 'Jan. 2016', 'amount': '$100M / Series D', 'Valuation': '', 
        'lead_investor': 'OrbiMed Advisors', 'investors_count': 8},
        {'date': 'Jan. 2016', 'amount': '$100M / Series D', 'Valuation': '', 
        'lead_investor': 'OrbiMed Advisors', 'investors_count': 8}];


    $scope.deals = [{'deal_name': 'Seed Round Funding', 'date': '12 Nov. 2015', 'description': 'Lorem blah', 
        'documents': [
            {'name': 'Employment Agreement - CEO'}, 
            {'name': 'Employment Agreement - President'}, 
            {'name': 'Operating Agreement'},
            {'name': 'Disclosures'},
            {'name': 'PPM'}
        ]
    }];

    $scope.company_photo = $cookies.get('company_photo');
    $scope.additional_photos = $cookies.get('additional_photos');

    $scope.user = $rootScope.user;

    $scope.editing = false;

    $scope.picFile = '';

    $scope.myImage='';
    $scope.myCroppedImage='';

    $scope.new_date = "";
    $scope.new_amount = "";
    $scope.new_valuation = "";
    $scope.new_lead_investor = "";
    $scope.new_investors_count = 0;

    $scope.myInterval = 5000;
    $scope.noWrapSlides = false;
    var currIndex = 0;
    var slides = $scope.slides = [
            {'image': 'images/ImgTestimonia1.jpg',
            'text': 'Nice image',
            'id': currIndex++
            },
            {'image': 'images/ImgTestimonia1.jpg',
            'text': 'Nice image',
            'id': currIndex++
            }
        ];



    $scope.addSlide = function() {
        var newWidth = 600 + slides.length + 1;
        slides.push({
            image: 'images/ImgTestimonia1.jpg',
            text: 'Nice image',
            id: currIndex++
        });
    };


    var handleFileSelect=function(evt) {
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

    
    // $scope.prof_pic_url = $cookies.get('prof_pic_url');

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

    $scope.uploadProfilePic = function(dataUrl) {
        $scope.api_domain =  "http://127.0.0.1:8040"
        var url = $scope.api_domain + "/users/set_profile_pic";
        var auth_string = String($scope.token) + ':' + String('unused');
        var auth_cred = btoa(auth_string);
        console.log(typeof(dataUrl));
        //console.log(dataUrl);
        console.log("here");

        convertDataURLToImageData(dataUrl, 
            function(imageData){
                console.log(typeof(imageData));
                console.log(imageData);
            
                // var fd = new FormData();
                // fd.append('image', imageData);
                // $http.post(url, fd, {
                //     transformRequest: angular.identity,
                //     headers: {'Authorization': 'Basic ' + auth_cred }
                // })
                // .success(function(response){
                //     console.log(response);

                //     if(response['data']['status'] == "success"){
                //         $rootScope.user = response['data']['user'];
                //         $scope.user = response['data']['user'];
                //     }
                // })
                // .error(function(response){
                //     console.log(response);
                // });
                $http({
                    url: url,
                    method: "POST",
                    headers: {'Authorization': 'Basic ' + auth_cred, 'Content-Type': 'multipart/form-data' },
                    data: {'image': imageData} 

                })
                .then(function(response) {
                    console.log(response);

                    if(response['data']['status'] == "success"){
                        $rootScope.user = response['data']['user'];
                        $scope.user = response['data']['user'];
                    }
                }, 
                function(response) {
                    // failure
                    console.log(response);
                    
                });
            }
        )

        
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
    }
}


    $scope.ClickedDevice = function(device_id) {
        $scope.clicked_id = device_id;
        console.log(device_id);
        $cookies.put('curr_device_id', device_id);
        console.log("curr_device_id token set.");
        $state.go('profile.device');
        // getDevice(device_id)        
    }



    $scope.setChanges = function() {
        $scope.editing = false;

        $scope.api_domain =  "http://127.0.0.1:8040"
        var url = $scope.api_domain + "/users/edit";
        var auth_string = String($scope.token) + ':' + String('unused');
        var auth_cred = btoa(auth_string);

        $http({
            url: url,
            method: "POST",
            headers: {'Authorization': 'Basic ' + auth_cred },
            data: { 'firstname': $scope.firstname, 'lastname': $scope.lastname, 'headline' : $scope.headline} 
        })
        .then(function(response) {
            console.log(response);

            if(response['data']['status'] == "success"){
                console.log(response);
            }
        }, 
        function(response) {
            // failure
            console.log(response);
            
        });
    }



    function getDevices() {
        $scope.api_domain =  "http://127.0.0.1:8040"
        var url = $scope.api_domain + "/devices/list_devices";
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
                console.log(response);
                $cookies.put('devices', JSON.stringify(response['data']['devices']));
                $cookies.put('device_count', response['data']['device_count']);
            }
        }, 
        function(response) {
            // failure
            console.log(response);
            
        });      
    }

    $scope.addFundingRound = function() 
    {
        $scope.funding_rounds.push({'date': $scope.new_date, 'amount': $scope.new_amount, 'valuation': $scope.new_valuation, 
        'lead_investor': $scope.new_lead_investor, 'investors_count': $scope.new_investors_count});
        $scope.new_date = '';
        $scope.new_amount = '';
        $scope.new_valuation = '';
        $scope.new_lead_investor = '';
        $scope.new_investora_count = '';
    }

}



