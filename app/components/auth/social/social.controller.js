angular
    .module('so.auth.social')
    .controller('SoAuthSocialController', SoAuthSocialController);

function SoAuthSocialController($scope, $firebaseArray, $firebaseObject) {

	$scope.ref = new Firebase("https://socialocean.firebaseio.com/");

	$scope.facebook_signin = function() {
		
		$scope.ref.authWithOAuthPopup("facebook", function(error, authData) {
		  if (error) {
		    console.log("Login Failed!", error);
		  } else {
		    // the access token will allow us to make Open Graph API calls
		    console.log(authData.facebook.accessToken);

		    var newUserRef = new Firebase("https://socialocean.firebaseio.com/users/" +  authData.uid);
		    var user = $firebaseObject(newUserRef);
		    
		    user.uid = authData.uid;
			user.provider = authData.provider;
			user.token = authData.token;
			user.facebook_id = authData.facebook.id;
			user.facebook_access_token = authData.facebook.accessToken;
			user.full_name = authData.facebook.displayName;
			user.email = authData.facebook.email;
			user.facebook_image_url = authData.facebook.profileImageURL;
	

			user.$save().then(function(data) {
				console.log(data);
				$scope.success = "User was created with id " + authData.uid;
			}).catch(function(error) {
				$scope.err = "Error creating user details";
				$scope.errObject = error;
				console.log("Error saving user");
			});

		  }
		}, {
		  scope: "email,user_likes" // the permissions requested
		});
	}


	$scope.twitter_signin = function() {

		$scope.ref.authWithOAuthPopup("twitter", function(error, authData) {
		  if (error) {
		    console.log("Login Failed!", error);
		  } else {
		    console.log("Authenticated successfully with payload:", authData);

		    var newUserRef = new Firebase("https://socialocean.firebaseio.com/users/" +  authData.uid);
		    var user = $firebaseObject(newUserRef);

		    user.uid = authData.uid;
			user.provider = authData.provider;
			user.token = authData.token;
			user.twitter_id = authData.twitter.id;
			user.twitter_access_token = authData.twitter.accessToken;
			user.twitter_access_token_secret = authData.twitter.accessTokenSecret;
			user.twitter_display_name = authData.twitter.displayName;
			user.twitter_username = authData.twitter.username;
			user.twitter_image_url = authData.twitter.profileImageURL;


			user.$save().then(function(data) {
				console.log(data);
				$scope.success = "User was created with id " + authData.uid;
			}).catch(function(error) {
				$scope.err = "Error creating user details";
				$scope.errObject = error;
				console.log("Error saving user");
			});

		  }
		});

	}

   
}

