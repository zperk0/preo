//shop
angular.module('accountSettings.controllers')
 .controller('MenuCtrl', ['$scope',  '$AjaxInterceptor',
  function ($scope,$AjaxInterceptor) {
      
      $AjaxInterceptor.start();
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

      $scope.finishLoading = function(){
        $AjaxInterceptor.complete();
      }

  }]);    
