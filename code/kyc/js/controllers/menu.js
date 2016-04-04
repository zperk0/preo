
angular.module('kyc.controllers').controller('MenuCtrl', ['$scope','OutletService','OrderService','AllCharts','$route','VenueService','$AjaxInterceptor','$location','INITIAL_DATES', 'UtilsService', 'Venue', 'VENUE_ID', '$filter',
	function($scope,OutletService,OrderService,AllCharts,$route,VenueService,$AjaxInterceptor,$location,INITIAL_DATES, UtilsService, Venue, VENUE_ID, $filter) {

		$scope.currencySymbol = ""; //default for pound %C2%A3
		$scope.outlets = [];

		$scope.defaultLabelEvents = _tr('Select Events...');

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
			return "";
		}

	 	$scope.getCurrencyByAscii = function(){
			return "";
		}

	    Venue.getItems({id: VENUE_ID}).$promise.then(function( data ){
	        UtilsService.setItems(data);
	    });

		VenueService.init().then(
			function(venue){
				$scope.venue = venue;
				$scope.currencySymbol = "";
				OutletService.init(function(){
					OutletService.getOutlets().then(function (outlets) {
						$scope.outlets = outlets;
						$scope.$broadcast('OUTLETS_LOADED');
					});
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

		$scope.eventsSelected = [];

		$scope.getEventsSelected = function () {
			var eventsSelected = [];

			for (var i = 0, len = $scope.events.length; i < len; i++) {
				var currentEvent = $scope.events[i];
				if (currentEvent.selected) {
					eventsSelected.push(currentEvent);
				}
			};

			if (eventsSelected.length) {
				return eventsSelected;
			}

			return [];
		}

		$scope.getEventsSelectedIds = function () {
			var eventsSelected = $scope.eventsSelected;
			var arr = [];

			for (var i = 0, len = eventsSelected.length; i < len; i++) {
				arr.push(eventsSelected[i].id);
			};

			return arr;
		}

		$scope.getEventByOrder = function (order) {
			var eventsSearch = $scope.events;

			var events = eventsSearch.filter(function (e) {
				return (e.id === order.eventId && (!order.eventTime || e.time === order.eventTime));
			});

			return events.length ? events[0] : {};
		}

		$scope.loadEvents = function () {
			VenueService.getEvents($scope.form.start_date, $scope.form.end_date).then(function (events) {
				var allEvents= [];
				if (events.length) {
					$scope.defaultLabelEvents = _tr('Select Events...');
					for (var i = events.length - 1; i >= 0; i--) {
						var current = events[i];
						for (var j=0; j<current.times.length; j++){
							var ev = angular.copy(current, {});
							var time  = current.times[j];
							var startDate = moment(time);
							ev.time = time;
							ev.startDateTimeStamp = startDate.valueOf();
							ev.fullName = startDate.format('DD/MM/YYYY HH:mm') + ' - ' + current.name;
							allEvents.push(ev);
						}

					};
				} else {
					$scope.defaultLabelEvents = _tr('No events in this period');
				}

				$scope.eventsSelected = [];
				$scope.events = $filter('orderBy')(allEvents, 'startDateTimeStamp', true);
				loadOrdersEvents(getAllEventsIds());
			})
		}



		var loadOrdersEvents = function (events) {
			if (events.length) {
				OrderService.getOrdersByEvents($scope.form.start_date, $scope.form.end_date, events).then(function (orders) {
					var allOrders = [];
					for (var i = orders.length - 1; i >= 0; i--) {
						  var order = orders[i];
						  var event = $scope.getEventByOrder(order);
						  if (!event.id){
						  	continue;
						  }
	            order.eventName = event.fullName;
	            order.startDateTimeStampEvent = event.startDateTimeStamp;
	            allOrders.push(order);
					};
					allOrders = $filter('orderBy')(allOrders, 'startDateTimeStampEvent', true);

					$scope.$broadcast('ORDERS_EVENTS_LOADED', { orders: allOrders });
					$AjaxInterceptor.complete();
				}, function () {
					// body...
				})
			} else {
				$scope.$broadcast('ORDERS_EVENTS_LOADED', { orders: [] });
				$AjaxInterceptor.complete();
			}
		};

		$scope.updateDataWithEvents = function () {
			$AjaxInterceptor.start();

			$scope.eventsSelected = $scope.getEventsSelected();

			$scope.$broadcast('SELECT_EVENT');
		};

		$scope.setLocation = function(newLocation){
				$scope.currentLocation = newLocation;
				if ($location.path() !== ("/"+newLocation))
        	$location.path(newLocation);
		};

		$scope.getSelectedOutlets = function(){
			return $scope.outlets.filter(function(data){
				return data.selected === true;
			});
		};

		$scope.getOutletById = function(id){
			var outlets = $scope.outlets.filter(function(o){
				return o.id === id;
			});

			return outlets.length ? outlets[0] : {};
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