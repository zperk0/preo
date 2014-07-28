angular.module('kyc.reports')
.factory('HighestSpendingCustomers',[function(){

	var title = _tr("Highest Spending Customers");
	var Report = {}
	var data = {}
	var titles = [];

	Report.setData = function(reportsData){

		angular.forEach(reportsData.customerOrders,function(customerOrder){				
			var created = moment.utc(customerOrder.paid);		
			if (data[customerOrder.id] === undefined){
					data[customerOrder.id] = {
						totalSpent: customerOrder.total === null ? 0 : customerOrder.total,
						name:customerOrder.firstName + " " + customerOrder.lastName,
						email:customerOrder.username,
						loyalty: customerOrder.optinLoyalty,
						offers: customerOrder.optinOffers,
						other: customerOrder.optinOther
					}				
			}
		});			
	}

	Report.orderBy = "totalSpent";
	Report.direction = false;
	Report.description = _tr("Displays top 50 customers who have the highest transactional spend.")

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