angular.module('kyc.reports')
.factory('HighestOrderHours',[function(){

	var title = _tr("Highest Order Hours");
	var Report = {}
	var data = []		
	var titles = [];	
	var itemsToShow = 10;

	Report.setData = function(reportsData){					
		angular.forEach(reportsData.orders,function(order){
				var hour =  moment.utc(order.paid).hour();
				if (data[hour] === undefined) 
					data[hour] = { 
						timeSlot: moment.utc(order.paid).format("HH:00") + ' - ' + moment.utc(order.paid).format("HH:59"),
						numberOfOrders:0
				 } 
				 data[hour].numberOfOrders++;
		})
		data =  _.sortBy(data,function(row){ return -row.numberOfOrders})
						.slice(0,itemsToShow);				
					
		
	}

	Report.orderBy = "numberOfOrders";
	Report.direction = true;
	Report.description = _tr("Displays the accumulative number of orders, broken down by 24 x 1 hour time slots.");

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