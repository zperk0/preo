angular.module('kyc.reports')
.factory('MostFrequentBuyers',[function(){

	var title = _tr("Most Frequent Buyers");
	var Report = {}
	var data = {}
	var titles = [];

	Report.setData = function(reportsData){
		reportsData.customerOrders.sort(function(a,b){
			return a.orders - b.orders;
		})

		angular.forEach(reportsData.customerOrders,function(customerOrder){				
			var created = moment(customerOrder.created);		
			if (data[customerOrder.id] === undefined){
					data[customerOrder.id] = {
						numberOfOrders:customerOrder.orders,
						name:customerOrder.firstName + " " + customerOrder.lastName,
						email:customerOrder.username,
						marketing:(customerOrder.optinLoyalty || customerOrder.optinOffers || customerOrder.optinOther)
					}				
			}
		});			
	}

	Report.orderBy = "numberOfOrders";

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