
angular.module('kyc.controllers').controller('MenuCtrl', ['$scope','OutletService','OrderService','AllCharts','$route',
	function($scope,OutletService,OrderService,AllCharts,$route) {	
angular.module('kyc.controllers').controller('MenuCtrl', ['$scope','$http','Outlet','Orders','ACCOUNT_ID', '$AjaxInterceptor',
	function($scope,$http,Outlet,Orders,ACCOUNT_ID, $AjaxInterceptor) {	
		
			$scope.outlets = [];

			$scope.search = {};

			$scope.search.start_date =  new Date(new Date().getTime() - (7 * 24 * 3600 * 1000));
			$scope.search.end_date = new Date();

			Outlet.query({accountId:ACCOUNT_ID},function(result){
					$scope.outlets = result;

		$scope.minData = new Date(new Date().getTime() - (7 * 24 * 3600 * 1000));
		$scope.maxData = new Date();

		$scope.outlets = OutletService.getOutlets();


		$scope.update = function(){			
			AllCharts.prepareCharts(OrderService.getOrders(),$scope.minData,$scope.maxData);
			$route.reload();
		}
			

						 $scope.allData = result;

						 $scope.$broadcast('preoday.allData', { allData: result });

						 $AjaxInterceptor.complete();

					 });
			};

			$scope.fetchDataByDate = function() {
				console.log($scope.search);
			}

			var getSelectedOutlets = function(){
				return $scope.outlets.filter(function(data){
					return data.selected === true;
				});
			}

			$scope.fetchData();
}])