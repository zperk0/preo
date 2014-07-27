angular.module('kyc.reports')
.factory('OneTimeBuyers',[function(){

	var title = _tr("One Time Buyers");
	var Report = {}
	var data = {}
	var titles = [];

	Report.setData = function(reportsData){
	
		angular.forEach(reportsData.customerOrders,function(customerOrder){
			if (data[customerOrder.id] === undefined && customerOrder.orders === 1){
				data[customerOrder.id] = {
					dateJoined:customerOrder.created,
					dateOfOrder:customerOrder.firstOrder,
					name:customerOrder.firstName + " " + customerOrder.lastName,
					email:customerOrder.username,
					marketing:(customerOrder.optinLoyalty || customerOrder.optinOffers || customerOrder.optinOther)
				} 			
			}
		})
	}

	Report.orderBy = "dateOfOrder";
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