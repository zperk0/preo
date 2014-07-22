angular.module('kyc.reports')
.factory('CustomersDecreasingSpend',[function(){

	var title = _tr("Customers Increasing Spend");
	var Report = {}
	var data = {}
	var titles = [];

	Report.setData = function(reportsData){		
		console.log(reportsData);
		angular.forEach(reportsData.customerOrders,
			function(customerOrder){											
				if (data[customerOrder.id] === undefined && !isNaN(customerOrder.totalPercentage) && customerOrder.totalPercentage < 0){
					data[customerOrder.id] = {
						percentDecrease: customerOrder.totalPercentage.toFixed(0),
						name:customerOrder.firstName + " " + customerOrder.lastName,
						email:customerOrder.username,
						marketing:(customerOrder.optinLoyalty || customerOrder.optinOffers || customerOrder.optinOther)
					}				
			  }
		});
		console.log('set data',data);			
	}

	Report.orderby = "percentIncrease";

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