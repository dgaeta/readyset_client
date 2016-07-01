angular
    .module('so.profile')
    .controller('SignDealController', SignDealController);




function SignDealController($scope, $http, $timeout, $location, $state, $stateParams) {

    // $scope.api_domain = "http://104.197.111.36";
    // $scope.url_prefix = "http://104.197.111.36:8040";
    $scope.url_prefix = "http://localhost:8040";

    $scope.token = sessionStorage.getItem('token');
    
    // Set user struct info
    $scope.user = JSON.parse(sessionStorage['user']);
    $scope.user_type = sessionStorage.getItem('user_type');

    // Set company struct 
    $scope.company_struct = JSON.parse(sessionStorage['company_struct']);
    var i = 0;
    var keys = Object.keys($scope.company_struct['presentation_items']['photos']);
    for (var i = 0; i < Object.keys($scope.company_struct['presentation_items']['photos']).length; i++) {
        $scope.company_struct['presentation_items']['photos'][keys[i]]['index'] = i;
    };

    $scope.clicked_deal_name = sessionStorage['clicked_deal_name'];
    $scope.clicked_deal_struct = $scope.company_struct['deal_flow_management'][$scope.clicked_deal_name];

}



