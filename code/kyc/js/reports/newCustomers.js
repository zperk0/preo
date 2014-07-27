angular.module('kyc.reports')
.factory('NewCustomers',[function(){

	var title = _tr("New Customers");
	var Report = {}
	var data = {}
	var titles = [];
	var dateRange = moment().subtract('week',2);

	Report.setData = function(reportsData){
		angular.forEach(reportsData.customerOrders,function(customerOrder){				
			var created = moment(customerOrder.created);		
			if (created > dateRange || customerOrder.firstOrder > dateRange){
				if (data[customerOrder.id] === undefined){
					data[customerOrder.id] = {
						dateJoined:customerOrder.created,
						name:customerOrder.firstName + " " + customerOrder.lastName,
						email:customerOrder.username,
						marketing:(customerOrder.optinLoyalty || customerOrder.optinOffers || customerOrder.optinOther)
					}				
				}
			}
		});		
	}

	Report.orderBy = "dateJoined";
	Report.direction = false;

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