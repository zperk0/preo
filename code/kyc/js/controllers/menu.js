
angular.module('kyc.controllers').controller('MenuCtrl', ['$scope','OutletService','OrderService','AllCharts','$route','VenueService','$AjaxInterceptor','$location',
	function($scope,OutletService,OrderService,AllCharts,$route,VenueService,$AjaxInterceptor,$location) {	
			

			$scope.currencySymbol = "%C2%A3";
			$scope.outlets = [];
			$scope.search = {};

			$scope.search.start_date =  new Date(new Date().getTime() - (120 * 24 * 3600 * 1000));
			$scope.search.end_date = new Date();

	 	$scope.getCurrency = function(){
			return decodeURI($scope.currencySymbol);
		}
			
		VenueService.init().then(
			function(venue){			
				$scope.venue = venue;
				console.log('got venue',$scope.venue);
				$scope.currencySymbol = VenueService.getCurrency().symbol;							
				OutletService.init(function(){
					$scope.outlets = OutletService.getOutlets();					
					AllCharts.init(moment($scope.search.start_date),moment($scope.search.end_date),$scope.currencySymbol);
				})			
			});
			

		$scope.update = function(){						
			$AjaxInterceptor.start();
			setTimeout(function(){
				AllCharts.prepareCharts(OrderService.getOrders(),moment($scope.search.start_date),moment($scope.search.end_date),$scope.getSelectedOutlets());
				$route.reload();
				$AjaxInterceptor.complete();
			},500);
		}
			
		$scope.setLocation = function(newLocation){
				$scope.currentLocation = newLocation;				
				if ($location.path() !== ("/"+newLocation))
        	$location.path(newLocation);
		}				 

		$scope.getSelectedOutlets = function(){
			return $scope.outlets.filter(function(data){
				return data.selected === true;
			});
		}
		
}])