angular
    .module('so.profile')
    .controller('SignDealController', SignDealController);




function SignDealController($scope, $http, $timeout, $location, $state, $stateParams) {

    $scope.url_prefix = "http://104.198.195.243/api";
    //$scope.url_prefix = "http://localhost:8040";

    $scope.token = sessionStorage.getItem('token');
    
    // Set user struct info
    $scope.user = JSON.parse(sessionStorage['user']);
    $scope.user_type = sessionStorage.getItem('user_type');

    // Set company struct 
    $scope.company_struct = JSON.parse(sessionStorage['company_struct']);

    $scope.clicked_deal_name = sessionStorage['clicked_deal_name'];
    $scope.clicked_deal_struct = $scope.company_struct['deal_flow_management'][$scope.clicked_deal_name];
    $scope.deal = $scope.clicked_deal_struct;

    $scope.document_names = Object.keys($scope.clicked_deal_struct.document_structs);

    // Create a lookup to see if a document has been 'clicked signed'
    $scope.signedLookup = {};
    for (var i = 0; i < $scope.document_names.length; i++) {
        $scope.signedLookup[$scope.document_names[i]] = false;
    };

    $scope.investmentAcknowlLookup = {"one": false, "two": false, "three": false, "four": false};
    $scope.one = "one"; $scope.two = "two"; $scope.three = "three"; $scope.four = "four";

    $scope.uncheckedImg= "images/CheckInactive.png";
    $scope.checkedImg= "images/checkActive.png";
    $scope.switchPoint = false;

    $scope.docCheckClicked = function(doc_name) {
        $scope.signedLookup.doc_name = !$scope.signedLookup.doc_name;
    }

    $scope.investAckClicked = function(doc_num) {
        console.log("in here");
        console.log(doc_num);
        console.log($scope.investmentAcknowlLookup.doc_num);
        $scope.investmentAcknowlLookup[doc_num] = !$scope.investmentAcknowlLookup[doc_num];
        console.log($scope.investmentAcknowlLookup.doc_num);
    }



    $scope.getDocument = function(deal_name, file_name){
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

}



