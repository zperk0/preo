angular.module('kyc.reports')
.factory('CustomersDecreasingOrders',[function(){

	var title = _tr("Customers Decreasing Orders");
	var Report = {}
	var data = {}
	var titles = [];

	Report.setData = function(reportsData){		
		data = {};
		angular.forEach(reportsData.customerOrders,
			function(customerOrder){											
				if (data[customerOrder.id] === undefined && !isNaN(customerOrder.orderPercentage) && customerOrder.orderPercentage < 0 ){					
					data[customerOrder.id] = {
						percentDecrease: customerOrder.orderPercentage,
						name:customerOrder.firstName + " " + customerOrder.lastName,
						email:customerOrder.username,
						loyalty: customerOrder.optinLoyalty,
						offers: customerOrder.optinOffers,
						other: customerOrder.optinOther
					}				
			  }
		});
		
	}

	Report.orderby = "percentDecrease";
	Report.description = _tr("Displays all customers who placed less orders this month than the previous month.")

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