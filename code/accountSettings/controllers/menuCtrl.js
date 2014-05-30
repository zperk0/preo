//shop
angular.module('accountSettings.controllers')
 .controller('MenuCtrl', ['$scope',  
  function ($scope) {
  		$scope.Views = {
  			profile:0,
  			subscription:1,
  			paymentMethod:2,
  			billingHistory:3
  		}

    	$scope.currentView = $scope.Views.profile;
    	
    	$scope.setSelected = function(which){
    		$scope.currentView=which;		
    	}

  }]);    
