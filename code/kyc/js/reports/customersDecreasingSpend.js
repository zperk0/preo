angular.module('kyc.reports')
.factory('CustomersDecreasingSpend',[function(){

	var title = _tr("Customers Decreasing Spend");
	var Report = {}
	var data = {}
	var titles = [];

	Report.setData = function(reportsData){
		data = {};
		angular.forEach(reportsData.customerOrders,
			function(customerOrder){
				if (data[customerOrder.id] === undefined && !isNaN(customerOrder.totalPercentage) && customerOrder.totalPercentage < 0){
					data[customerOrder.id] = {
						percentDecrease: Math.abs(customerOrder.totalPercentage),
						name:customerOrder.firstName + " " + customerOrder.lastName,
						email:customerOrder.email,
						loyalty: customerOrder.optinLoyalty,
						offers: customerOrder.optinOffers,
						other: customerOrder.optinOther
					}
			  }
		});
	}

	Report.orderby = "percentDecrease";
	Report.direction = false;
	Report.description = _tr("Displays all customers who spent less this month than the previous month.")

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