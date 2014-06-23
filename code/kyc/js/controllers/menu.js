
angular.module('kyc.controllers').controller('MenuCtrl', ['$scope','$http','Outlet','Order','ACCOUNT_ID',
	function($scope,$http,Outlet,Order,ACCOUNT_ID) {	
		
			Outlet.query({accountId:ACCOUNT_ID},function(result){
					$scope.outlets = result;

					$scope.$broadcast('preoday.outlets', { outlets: result });
			});


			//TODO move this to orders service,
			//$scope.allData = Orders.getOrders(startDate,endDate);
			$scope.fetchData = function(){
					//orders&venueId=1 //milliseconds //completed status only 
					$http.get('/code/kyc/data/data.json').success(function (result){					

						 $scope.allData = result;

						 $scope.$broadcast('preoday.allData', { allData: result });

					 });
			};

			function prepareCharts(orders){
					angular.forEach(orders,function(order){
						angular.forEach(AllCharts,function(chart){
								chart.setData(order,$scope.outlets);
						})	
					});
					angular.forEach(AllCharts,function(chart,key){
						if (chart.onSetDataComplete){
							chart.onSetDataComplete()
						}
						console.log(key,chart.getData());
					});						
			}

			$scope.fetchData();
}])