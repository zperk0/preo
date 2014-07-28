angular.module('kyc.reports')
.factory('CustomersIncreasingSpend',[function(){

	var title = _tr("Customers Increasing Spend");
	var Report = {}
	var data = {}
	var titles = [];

	Report.setData = function(reportsData){		
		data = {};
		angular.forEach(reportsData.customerOrders,
			function(customerOrder){											
				if (data[customerOrder.id] === undefined && !isNaN(customerOrder.totalPercentage) && customerOrder.totalPercentage > 0){
					data[customerOrder.id] = {
						percentIncrease: customerOrder.totalPercentage,
						name:customerOrder.firstName + " " + customerOrder.lastName,
						email:customerOrder.username,
						loyalty: customerOrder.optinLoyalty,
						offers: customerOrder.optinOffers,
						other: customerOrder.optinOther
					}				
			  }
		});
		console.log('set data',data);			
	}

	Report.orderby = "percentIncrease";
	Report.direction = true;
	Report.description = _tr("Displays all customers who spent more this month than the previous month.")

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