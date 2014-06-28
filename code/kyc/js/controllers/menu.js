
angular.module('kyc.controllers').controller('MenuCtrl', ['$scope','OutletService','OrderService','AllCharts','$route',
	function($scope,OutletService,OrderService,AllCharts,$route) {	
		
			$scope.outlets = [];

			$scope.search = {};

			$scope.search.start_date =  new Date(new Date().getTime() - (7 * 24 * 3600 * 1000));
			$scope.search.end_date = new Date();


			$scope.outlets = OutletService.getOutlets();


		$scope.update = function(){			
			console.log('selectedOutlets',getSelectedOutlets());
			AllCharts.prepareCharts(OrderService.getOrders(),$scope.search.start_date,$scope.search.end_date,getSelectedOutlets());
			$route.reload();
		}
			
						 
		var getSelectedOutlets = function(){
			return $scope.outlets.filter(function(data){
				return data.selected === true;
			});
		}

}])