
angular.module('accountSettings.controllers')
 .controller('PasswordCtrl', ['$scope','$q','$http','USER_ID','User','$location',
  function ($scope,$q,$http,USER_ID,User,$location) {
  	$scope.isPosting = false;		
  	$scope.oldIncorrect = false;
  	$scope.newPasswordConfirm ="";
  	$scope.errorMessage = "";
  	$scope.triedSubmit = false;
  	$scope.password = {
  		oldPassword:"",
  		password:""
  	}
 User.get({id:USER_ID},function(result){
 	//extend the password obj with the username
    	$scope.password.username=result.username;    	    	
      $scope.finishLoading();
    });


    $scope.$watch("password.oldPassword",function(newVal,oldVal){
    	//set incorrect to false to hide the error after a failed request
    	$scope.oldIncorrect = false;
    })

    $scope.$watch("user.lastName",showError)
    $scope.$watch("newPasswordConfirm",showError)


    $scope.cancel = function(){
      $location.path("/profile");
    }

	$scope.saveChanges = function(){
		$scope.triedSubmit = true;		
		if (!$scope.passwordForm.$valid) {
			showError();
            return false;
        } else {
        	$scope.isPosting = true;
        	console.log('posting',$scope.password)        	
        	$http.post('/api/users/auth/change', $scope.password)
        	.success(function(result){
            console.log('hey');
        		$scope.isPosting = false;
				    noty({ type: 'success', text: _tr('Settings and Password has been saved!<br/>You will need to log in again with your new password to continue.') });
		        setTimeout(function(){window.location.replace("/logout");}, 2500);
    	    }).error(function(error){
            console.log('hoo');
        		$scope.isPosting = false;        	
        		if (error.status == 401){        			
        			$scope.oldIncorrect = true;
    				$scope.errorMessage ="Sorry, the old password you entered was incorrect. Please try again!";
        		}
        	}) 
        	
        }
	};

	function showError(){		
		if ($scope.triedSubmit){
			if ($scope.password.password != $scope.newPasswordConfirm){
	      		$scope.errorMessage = _tr("Sorry, these password do not match. Please try again.");
			} else if ($scope.password.password === "" || $scope.newPasswordConfirm === "" || $scope.oldPassword === "" ){
				$scope.errorMessage = _tr("All the fields are required.");
			} else {
				$scope.errorMessage ="";
			}
		}
	}
		

  }]);	
	
