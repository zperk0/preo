//shop
angular.module('accountSettings.controllers')
 .controller('ProfileCtrl', ['$scope','$q', '$location','ACCOUNT_ID', 'USER_ID','User','Account', 
  function ($scope,$q,$location,ACCOUNT_ID,USER_ID,User,Account) {
    //inherited from menu control
    $scope.setSelected($scope.Views.profile);
  	$scope.isPosting = false;  	 
  	$scope.isEditing = false;  	

    var beforeCancel;

    Account.get({id:ACCOUNT_ID},function(result){
    	$scope.account=result;    	
    });

    User.get({id:USER_ID},function(result){
    	$scope.user=result;    	
        beforeCancel = {
            firstName:$scope.user.firstName,
            lastName:$scope.user.lastName, 
            email:$scope.user.email,
            name:$scope.user.name    
        }
    	
    	$scope.$watch("user.firstName",function(newVal,oldVal){
    		$scope.user.name = newVal + " " + $scope.user.lastName;
		})

		$scope.$watch("user.lastName",function(newVal,oldVal){			
    		$scope.user.name = $scope.user.firstName + " " + newVal;

		})
        $scope.finishLoading();
    });
    
    $scope.changePassword = function(){
    	 $location.path("/changePassword");
    }


    $scope.toggleEditUserDetails = function(isCancel){    	
        if (!$scope.isEditing && !isCancel) {
            beforeCancel = {
                firstName:$scope.user.firstName,
                lastName:$scope.user.lastName, 
                email:$scope.user.email,
                name:$scope.user.name    
            }
        }
        if (isCancel){
            $scope.user.firstName  = beforeCancel.firstName;
            $scope.user.lastName  = beforeCancel.lastName;
            $scope.user.email  = beforeCancel.email;
            $scope.user.name  = beforeCancel.name;
            $scope.user.firstName  = beforeCancel.firstName;                
        }
        
    	$scope.isEditing = !$scope.isEditing;    	
    }	

    
    $scope.saveChanges = function(){    	    
        $scope.isPosting = true;
        $scope.triedSubmit = true;
        if (!$scope.profileForm.$valid) {            
            $scope.isPosting =false;
            return false;
        };

    	$q.all([
    		$scope.user.$put(),
    		$scope.account.$put()
		]).then(function(results){					
			$scope.isPosting = false;		
			$scope.isEditing = false;	
			noty({ type: 'success', text: _tr('Settings have been saved!') });

		},function(){
			$scope.isPosting = false;
			noty({
			  type: 'error',  layout: 'topCenter',
			  text: _tr("Sorry, but there's been an error processing your request.") //text: 'Connection Error! Check API endpoint.'
			});    					
		});    	
    }

}]);    
