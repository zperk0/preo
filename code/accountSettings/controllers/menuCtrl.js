//shop
angular.module('accountSettings.controllers')
 .controller('MenuCtrl', ['$scope',  
  function ($scope) {
  		$scope.Views = {
  			profile:0,
  			subscriptions:1,
  			paymentMethods:2,
  			billingHistory:3
  		}

    	$scope.currentView = $scope.Views.profile;
    

  }]);    
