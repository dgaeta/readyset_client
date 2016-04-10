angular
    .module('so.profile')
    .controller('CompanyController', CompanyController);




function CompanyController($scope, Upload, $rootScope, $cookies, $http, $timeout) {

    $scope.api_domain = $cookies.get('api_domain');

    $scope.user_type = $cookies.get('user_type');
	$scope.token = $cookies.get('token');
    $scope.user = JSON.parse($cookies.get('user'));


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

    console.log($rootScope);
    $scope.deals = $cookies.get('deals');
    console.log($cookies.get('deals'));
    if ($scope.deals == ""){
        $scope.deals = {};
    } else {
        $scope.deals = JSON.parse($scope.deals);
    }

    $scope.company_photo = $cookies.get('company_photo');
    $scope.additional_photos = $cookies.get('additional_photos');


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

    //a simple model to bind to and send to the server
    $scope.model = {
        name: "",
        comments: ""
    };
    //an array of files selected
    $scope.files = [];

    //listen for the file selected event
    $scope.$on("fileSelected", function (event, args) {
        $scope.$apply(function () {            
            //add the file object to the scope's files collection
            $scope.files.push(args.file);
        });
    });
    

    $scope.new_deal_name = '';
    $scope.new_deal_date = '';
    $scope.new_deal_description = '';

    $scope.editing_photo = false;

    $scope.editing_prof_pic = function() {
        $scope.editing_photo = true;
    }

    $scope.addDeal = function(){

        $scope.url_prefix =   $scope.api_domain + ":8080";
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
                'description': $scope.new_deal_description, 'documents': {}
            } 

        })
        .then(function(response) {
            console.log(response);

            if(response['data']['status'] == "success"){
                console.log(response['data']['status']);
                $scope.deals[$scope.new_deal_name] = {'deal_name': $scope.new_deal_name, 'date': $scope.new_deal_date, 
                'description': $scope.new_deal_description, 'documents': []};
                $scope.new_deal_name = '';
                $scope.new_deal_date = '';
                $scope.new_deal_description = '';
                $cookies.put('deals', JSON.stringify($scope.deals));
            }
        }, 
        function(response) {
            // failure
            console.log(response);
            
        });

    }



    $scope.getDocument = function(deal_name, file_name){
        $scope.url_prefix =   $scope.api_domain + ":8080";
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



    //the save method
    $scope.save = function(deal) {
        console.log(deal);
        $scope.url_prefix =   $scope.api_domain + ":8080";
        var url = $scope.url_prefix + "/deals/upload_file";

        var auth_string = String($scope.token) + ':' + String('unused');
        var auth_cred = btoa(auth_string);

        console.log(deal['deal_name']);
        console.log("just before the $http");
        Upload.upload({
                url: url,
                headers: {'Authorization': 'Basic ' + auth_cred },
                data: {file: $scope.files[0], 'deal_name': deal['deal_name'], 
                    'file_type': $scope.files[0].type
                }
            }).success(function(data, status, headers, config){
                console.log(data);
                $scope.deals[deal['deal_name']]['documents'] = data['documents'];
                $scope.user = data['user'];
                $cookies.put('deals', JSON.stringify($scope.deals));
                $cookies.put('user', JSON.stringify($scope.user));
                $scope.files = [];
            });
    };

    $scope.getProfilePic = function() {
        $scope.url_prefix =   $scope.api_domain + ":8080";
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
    $scope.getProfilePic();
    if ($scope.user['profile_pic']) {
        $scope.getProfilePic();
    };

    $scope.uploadProfilePic = function(dataUrl) {
        // URL Construction with auth token
        $scope.url_prefix =   $scope.api_domain + ":8080";
        var url = $scope.url_prefix + "/users/set_profile_pic";
        var auth_string = String($scope.token) + ':' + String('unused');
        var auth_cred = btoa(auth_string);
        
        // Debug prints
        console.log(dataUrl);
        var file_type_prefix = dataUrl.substring(0, dataUrl.indexOf(','))
        console.log(typeof(dataUrl));
        console.log("here");

        Upload.upload({
                url: url,
                headers: {'Authorization': 'Basic ' + auth_cred },
                data: {file: Upload.dataUrltoBlob(dataUrl)
                }
            }).success(function(data, status, headers, config){
                $scope.user.prof_pic_data = dataUrl;
                $cookies.put('prof_pic_data', btoa(dataUrl));
                
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
        }
    }



    $scope.setChanges = function() {
        $scope.editing = false;

        $scope.url_prefix =   $scope.api_domain + ":8080";
        var url = $scope.url_prefix + "/users/edit";
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



