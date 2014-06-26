
angular.module('kyc.controllers').controller('MenuCtrl', ['$scope','OutletService','OrderService','AllCharts','$route',
	function($scope,OutletService,OrderService,AllCharts,$route) {	

		$scope.minData = new Date(new Date().getTime() - (7 * 24 * 3600 * 1000));
		$scope.maxData = new Date();

		$scope.outlets = OutletService.getOutlets();


		$scope.update = function(){			
			AllCharts.prepareCharts(OrderService.getOrders(),$scope.minData,$scope.maxData);
			$route.reload();
		}
			

}])