
angular.module('kyc.controllers').controller('MenuCtrl', ['$scope','OutletService','OrderService','AllCharts','$route',
	function($scope,OutletService,OrderService,AllCharts,$route) {	
		
			$scope.outlets = [];

			$scope.search = {};

			$scope.search.start_date =  new Date(new Date().getTime() - (7 * 24 * 3600 * 1000));
			$scope.search.end_date = new Date();


			$scope.outlets = OutletService.getOutlets();

			 $scope.$watch(
	          "search.start_date",
	          function( newValue, oldValue ) {
	              console.log("changed start_date", newValue,oldValue); 
	          }
	      );
 


		$scope.update = function(){						
			AllCharts.prepareCharts(OrderService.getOrders(),$scope.search.start_date,$scope.search.end_date,$scope.getSelectedOutlets());
			$route.reload();
		}
			
						 
		$scope.getSelectedOutlets = function(){
			return $scope.outlets.filter(function(data){
				return data.selected === true;
			});
		}

}])