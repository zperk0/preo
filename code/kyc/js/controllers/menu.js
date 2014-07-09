
angular.module('kyc.controllers').controller('MenuCtrl', ['$scope','OutletService','OrderService','AllCharts','$route','CurrencyService','$AjaxInterceptor',
	function($scope,OutletService,OrderService,AllCharts,$route,CurrencyService,$AjaxInterceptor) {	
			$scope.currencySymbol = "£";
			$scope.outlets = [];
			$scope.search = {};

			$scope.search.start_date =  new Date(new Date().getTime() - (120 * 24 * 3600 * 1000));
			$scope.search.end_date = new Date();


			OutletService.init(function(){
				$scope.outlets = OutletService.getOutlets();					
				AllCharts.init($scope.search.start_date,$scope.search.end_date);
			})
			

			 $scope.$watch(
          "search.start_date",
          function( newValue, oldValue ) {
          }
      );
 

		CurrencyService.getCurrency(function(currency){	
				$scope.currency = currency.symbol;							
		});

		$scope.update = function(){						
			$AjaxInterceptor.start();
			setTimeout(function(){
				AllCharts.prepareCharts(OrderService.getOrders(),$scope.search.start_date,$scope.search.end_date,$scope.getSelectedOutlets());
				$route.reload();
				$AjaxInterceptor.complete();
			},500);
		}
			
						 
		$scope.getSelectedOutlets = function(){
			return $scope.outlets.filter(function(data){
				return data.selected === true;
			});
		}
		
}])