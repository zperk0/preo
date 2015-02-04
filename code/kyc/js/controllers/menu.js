
angular.module('kyc.controllers').controller('MenuCtrl', ['$scope','OutletService','OrderService','AllCharts','$route','VenueService','$AjaxInterceptor','$location','INITIAL_DATES', 'UtilsService', 'Venue', 'VENUE_ID',
	function($scope,OutletService,OrderService,AllCharts,$route,VenueService,$AjaxInterceptor,$location,INITIAL_DATES, UtilsService, Venue, VENUE_ID) {	

		$scope.currencySymbol = "%C2%A3";
		$scope.outlets = [];

		$scope.form = {
			start_date: moment.utc(INITIAL_DATES.start).startOf('day'),
			end_date: moment.utc(INITIAL_DATES.end).endOf('day')
		}

		$scope.enableEventFilter = function () {
			$scope.showEventsFilter = true;
		}

		$scope.disableEventFilter = function () {
			$scope.showEventsFilter = false;
		}

		$scope.isEventFilter = function () {
			return $scope.showEventsFilter;
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
				console.log(venue);
				$scope.currencySymbol = VenueService.getCurrency().symbol;							
				OutletService.init(function(){
					$scope.outlets = OutletService.getOutlets();
					AllCharts.init($scope.form.start_date,$scope.form.end_date,$scope.currencySymbol);
				})			
			});
			

		$scope.update = function(){						
			$AjaxInterceptor.start();			
			setTimeout(function(){
				
				if ($scope.isEventFilter()) {
					$scope.loadEvents();
				} else {
					AllCharts.reloadCharts($scope.form.start_date,$scope.form.end_date,$scope.currencySymbol,$scope.getSelectedOutlets())
					.then(function(){
						
						 $scope.$broadcast('KYC_RELOAD');					 
					});	
				}			
				
			},500);
		}

		var allEventsIds = [];
		var getAllEventsIds = function () {
			allEventsIds = [];

			for (var i = 0, len = $scope.events.length; i < len; i++) {
				allEventsIds.push($scope.events[i].id);
			};

			return allEventsIds;
		}

		var getEventsSelected = function () {
			var eventsSelected = [];

			for (var i = 0, len = $scope.events.length; i < len; i++) {
				var currentEvent = $scope.events[i];
				if (currentEvent.selected) {
					eventsSelected.push(currentEvent.id);
				}				
			};

			if (eventsSelected.length) {
				return eventsSelected;
			}

			return allEventsIds;			
		}

		$scope.loadEvents = function () {
			VenueService.getEvents($scope.form.start_date).then(function (events) {
				$scope.events = events;
				loadOrdersEvents(getAllEventsIds());
			})
		}

		var loadOrdersEvents = function (events) {
			OrderService.getOrdersByEvents($scope.form.start_date, $scope.form.end_date, events).then(function (orders) {
				$scope.$broadcast('ORDERS_EVENTS_LOADED', { orders: orders });
				$AjaxInterceptor.complete();
			}, function () {
				// body...
			})
		}

		$scope.updateDataWithEvents = function () {
			$AjaxInterceptor.start();
			loadOrdersEvents(getEventsSelected());
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