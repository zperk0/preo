
angular.module('kyc.controllers').controller('MenuCtrl', ['$scope','OutletService','OrderService','AllCharts','$route','VenueService','$AjaxInterceptor','$location',
	function($scope,OutletService,OrderService,AllCharts,$route,VenueService,$AjaxInterceptor,$location) {	
			

			$scope.currencySymbol = "%C2%A3";
			$scope.outlets = [];

			$scope.start_date =  moment().subtract('month',3);
			$scope.end_date = moment();

	 	$scope.getCurrency = function(){
			return decodeURI($scope.currencySymbol);
		}
			
		VenueService.init().then(
			function(venue){			
				$scope.venue = venue;
				$scope.currencySymbol = VenueService.getCurrency().symbol;							
				OutletService.init(function(){
					$scope.outlets = OutletService.getOutlets();					
					AllCharts.init(moment($scope.start_date),moment($scope.end_date),$scope.currencySymbol);
				})			
			});
			

		$scope.update = function(){						
			$AjaxInterceptor.start();
			console.log("updating",$scope.start_date,$scope.end_date)
			setTimeout(function(){
				updateDate();
				AllCharts.init(moment($scope.start_date),moment($scope.end_date),$scope.currencySymbol,$scope.getSelectedOutlets());				
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

		$scope.findOutlet = function(id){
			return $scope.outlets.filter(function(data){
				return data.selected === true && data.id === id;
			});
		}

		$scope.getExportDate = function(){
			updateDate();
			return moment($scope.start_date).format("DD-MMM-YYYY") + " - " + moment($scope.end_date).format("DD-MMM-YYYY");
		}

	  var updateDate = function(){
		   $scope.start_date = $scope.form.start_date;
		   $scope.end_date = $scope.form.end_date;   
	  }
		
}])