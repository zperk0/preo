
angular.module('kyc.controllers').controller('MenuCtrl', ['$scope','OutletService','OrderService','AllCharts','$route','VenueService','$AjaxInterceptor','$location','INITIAL_DATES', 'UtilsService', 'Venue', 'VENUE_ID',
	function($scope,OutletService,OrderService,AllCharts,$route,VenueService,$AjaxInterceptor,$location,INITIAL_DATES, UtilsService, Venue, VENUE_ID) {	

		$scope.currencySymbol = "%C2%A3";
		$scope.outlets = [];

		$scope.form = {
			start_date: moment.utc(INITIAL_DATES.start).startOf('day'),
			end_date: moment.utc(INITIAL_DATES.end).endOf('day')
		}



	 	$scope.getCurrency = function(){
			return decodeURI($scope.currencySymbol);
		}

	    Venue.getItems({id: VENUE_ID}).$promise.then(function( data ){
	        UtilsService.setItems(data);
	    });
			
		VenueService.init().then(
			function(venue){			
				$scope.venue = venue;
				$scope.currencySymbol = VenueService.getCurrency().symbol;							
				OutletService.init(function(){
					$scope.outlets = OutletService.getOutlets();
					AllCharts.init($scope.form.start_date,$scope.form.end_date,$scope.currencySymbol);
				})			
			});
			

		$scope.update = function(){						
			$AjaxInterceptor.start();			
			setTimeout(function(){
				
				AllCharts.reloadCharts($scope.form.start_date,$scope.form.end_date,$scope.currencySymbol,$scope.getSelectedOutlets())
				.then(function(){
					
					 $scope.$broadcast('KYC_RELOAD');					 
				});				
				
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

		$scope.findOutlet = function(id){
			return $scope.outlets.filter(function(data){
				return data.selected === true && data.id === id;
			});
		}

		$scope.getExportDate = function(){			
			return $scope.form.start_date.format("DD-MMM-YYYY") + " - " + $scope.form.end_date.format("DD-MMM-YYYY");
		}

	 
		
}])