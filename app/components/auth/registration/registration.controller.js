angular
    .module('so.auth.registration')
    .controller('SoAuthRegistrationController', SoAuthRegistrationController);

function SoAuthRegistrationController($scope, $state, AuthService, InvestorService, UserService) {

    // $scope.firstname = '';
    // $scope.lastname = '';
    // $scope.email = '';
    // $scope.password = '';
    // $scope.city = '';
    // $scope.state = '';


    // $scope.err = null;
    // $scope.errObject = null;

    // $scope.succes = '';

    // AuthService.$onAuth(function(authData) {
    //   $scope.authData = authData;
    //   console.log(authData);
    // });

    $scope.login = function() {
        // // Log the user in 
        // console.log("im here now");
        // AuthService.$authWithPassword({
        //     email: $scope.email,
        //     password: $scope.password
        // }).then(function(authData) {
        //     console.log("Logged in as:", authData.uid);
        //     $scope.success = 'logged in as ' + authData.uid;
        //     $state.go('soProfile');
        // }).catch(function(error) {
        //     $scope.err = "Error creating user";
        //     $scope.errObject = error;
        // })
    }

    $scope.register = function() {

        // console.log("Registering");
        // var ref = new Firebase("https://escape-app.firebaseio.com/");


        // var userType = localStorage.getItem('userType');
        // console.log(userType);

        // AuthService.$createUser({
        //     first: $scope.firstname,
        //     last: $scope.lastname,
        //     city: $scope.city,
        //     state: $scope.state,
        //     email: $scope.email,
        //     password: $scope.password,
        //     stays: [],
        //     invests: []
        // }).then(function(userData) {

        //     console.log('creation successfull');

        //     if (userType == "Investor") {
        //         var investor = InvestorService(userData.uid);

        //         investor.first = $scope.firstname;
        //         investor.last = $scope.lastname;
        //         investor.email = $scope.email;
        //         investor.city = $scope.city;
        //         investor.state = $scope.state;

        //         investor.$save().then(function(ref) {
        //             $scope.succes = "User created with id " + userData.uid;
        //             var authData = ref.getAuth();
        //             $scope.login();
        //         }).catch(function(error) {
        //             $scope.err = "Error creating user details";
        //             $scope.errObject = error;
        //         });
        //     } else{
        //         var user = UserService(userData.uid);

        //         console.log(user);

        //         user.first = $scope.firstname;
        //         user.last = $scope.lastname;
        //         user.email = $scope.email;
        //         user.city = $scope.city;
        //         user.state = $scope.state;

        //         user.$save().then(function(ref) {
        //             $scope.succes = "User created with id " + userData.uid;
        //             $scope.login();
        //         }).catch(function(error) {
        //             $scope.err = "Error creating user details";
        //             $scope.errObject = error;
        //         });
        //     };

            

        // }).catch(function(error) {
        //     $scope.err = "Error creating user";
        //     $scope.errObject = error;
        // })
    }


}