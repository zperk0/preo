
angular.module('kyc.controllers').controller('MenuCtrl', ['$scope','$http','Outlets','Orders','AllCharts',
	function($scope,$http,Outlets,Orders,AllCharts) {	
	
			$scope.outlets = Outlets.getOutlets();


			//TODO move this to orders service,
			//$scope.allData = Orders.getOrders(startDate,endDate);
			$scope.fetchData = function(){
					//orders&venueId=1 //milliseconds //completed status only 
					$http.get('/code/kyc/data/data.json').success(function (result){					
						 		$scope.allData = result;						 								 		
						 		prepareCharts(result);
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