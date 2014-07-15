angular.module('kyc.reports')
.factory('ZeroOrdersCustomers',['VenueCustomers','VENUE_ID',
	function(VenueCustomers,VENUE_ID){

	var title = _tr("Customers with zero orders");
	var titles = [];
	var data = {};
	var Report = {}
	var customers;	
	var customersWithOrders = [];

	Report.init = function($q){
		data = {};
		customersWithOrders = [];
		customers = VenueCustomers.query({id:VENUE_ID})
		return customers.$promise;
	}

	Report.setData = function(order){
			if (customersWithOrders.indexOf(order.user.id) == -1)
				customersWithOrders.push(order.user.id);
	}

	Report.onSetDataComplete = function(){		
		angular.forEach(customers,function(customer){
			if (customersWithOrders.indexOf(customer.id) === -1){
					data[customer.id] = {
						dateJoined:customer.created,
						name:customer.firstName + " " + customer.lastName,
						email:customer.username,
						marketing:(customer.optinLoyalty || customer.optinOffers || customer.optinOther)	
					}
			}
		})
	}

	
	Report.getData = function(){
		return data;
	}

	Report.setTitles = function(newTitles){
		console.log('set zero titles',newTitles);
		titles = newTitles;
	}

	Report.getTitles = function(){
		return titles;
	}

	Report.getTitle = function(){
		return title;
	}
	

	return Report;


}]);