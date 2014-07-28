angular.module('kyc.reports')
.factory('NewCustomers',[function(){

	var title = _tr("New Customers");	
	var Report = {}
	var data = {}
	var titles = [];
	var dateRange = moment.utc().subtract('week',2);

	Report.setData = function(reportsData){
		angular.forEach(reportsData.customerOrders,function(customerOrder){				
			var created = moment.utc(customerOrder.created);		
			if (created > dateRange || customerOrder.firstOrder > dateRange){
				if (data[customerOrder.id] === undefined){
					data[customerOrder.id] = {
						dateJoined:customerOrder.created,
						name:customerOrder.firstName + " " + customerOrder.lastName,
						email:customerOrder.username,
						loyalty: customerOrder.optinLoyalty,
						offers: customerOrder.optinOffers,
						other: customerOrder.optinOther
					}				
				}
			}
		});		
	}

	Report.orderBy = "dateJoined";
	Report.direction = false;
	Report.description = _tr("Displays all new customers who have signed up, or had their first order, in the past two weeks.")

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