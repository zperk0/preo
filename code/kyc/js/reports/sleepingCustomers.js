angular.module('kyc.reports')
.factory('SleepingCustomers',[function(){

	var title = _tr("Sleeping Customers");
	var Report = {}
	var data = {}
	var titles = [];
	var dateRange = moment.utc().subtract('month',3);
	
	Report.setData = function(reportsData){			
		angular.forEach(reportsData.customerOrders,
			function(customerOrder){											
				if (data[customerOrder.id] === undefined && moment.utc(customerOrder.lastOrder).valueOf() <  dateRange.valueOf()){
					
					data[customerOrder.id] = {
						lastOrder: customerOrder.lastOrder,
						name:customerOrder.firstName + " " + customerOrder.lastName,
						email:customerOrder.username,
						marketing:(customerOrder.optinLoyalty || customerOrder.optinOffers || customerOrder.optinOther)
					}				
					
			  }
		});
		console.log('set data',data);			
	}

	Report.orderby = "lastOrder";
	

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