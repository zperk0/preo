angular.module('kyc.reports')
.factory('ZeroOrdersCustomers',['VenueCustomers','VENUE_ID',
	function(VenueCustomers,VENUE_ID){

	var title = _tr("Customers with zero orders");

	var titles = [];
	var data = {};
	var Report = {}


	Report.setData = function(reportsData){
		data = {};
		angular.forEach(reportsData.customerOrders,function(customerOrder){
			if (customerOrder.orders === 0)
				data[customerOrder.id] = {
						dateJoined:customerOrder.created,
						name:customerOrder.firstName + " " + customerOrder.lastName,
						email:customerOrder.email,
						loyalty: customerOrder.optinLoyalty,
						offers: customerOrder.optinOffers,
						other: customerOrder.optinOther
					}
		})
	}

	Report.orderBy = "dateJoined";
	Report.direction = false;
	Report.description = _tr("Displays all customers who have signed up but have not yet placed any orders.")

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