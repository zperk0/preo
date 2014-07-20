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

	Report.setData = function(reportsData){
		angular.forEach(reportsData.customerOrders,function(customerOrder){			
			if (customerOrder.total)
				data[customerOrder.id] = {
						dateJoined:customerOrder.created,
						name:customerOrder.firstName + " " + customerOrder.lastName,
						email:customerOrder.username,
						marketing:(customerOrder.optinLoyalty || customerOrder.optinOffers || customerOrder.optinOther)	
					}
		})
	}

	Report.onSetDataComplete = function(){		
	}

	
	Report.getData = function(){
		return data;
	}

	Report.setTitles = function(newTitles){
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