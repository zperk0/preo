angular.module('kyc.reports')
.factory('HighestSpendingCustomers',[function(){

	var title = _tr("Highest Spending Customers");
	var Report = {}
	var data = {}
	var titles = [];

	Report.setData = function(reportsData){

		angular.forEach(reportsData.customerOrders,function(customerOrder){				
			var created = moment(customerOrder.paid);		
			if (data[customerOrder.id] === undefined){
					data[customerOrder.id] = {
						totalSpent: customerOrder.total === null ? 0 : customerOrder.total,
						name:customerOrder.firstName + " " + customerOrder.lastName,
						email:customerOrder.username,
						marketing:(customerOrder.optinLoyalty || customerOrder.optinOffers || customerOrder.optinOther)
					}				
			}
		});			
	}

	Report.orderBy = "totalSpent";

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