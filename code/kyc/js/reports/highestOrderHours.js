angular.module('kyc.reports')
.factory('HighestOrderHours',[function(){

	var title = _tr("Highest Order Hours");
	var Report = {}
	var data = []		
	var titles = [];	
	var itemsToShow = 10;

	Report.setData = function(reportsData){					
		var tempData = {}	
		var grouped = _.groupBy(reportsData.orders,'hour');
		console.log('grouped',grouped);
		angular.forEach(grouped,function(day,key){			
				angular.forEach(day,function(order){					
					if (tempData [key] === undefined){
						tempData [key] = {
							timeSlot:moment(order.paid).format("HH:00"),
							numberOfOrders:1
						}
					} else {
						tempData[key].numberOfOrders++;
					}
				})						
		})
		
		console.log('tempData',tempData);
		data =  _.sortBy(tempData,function(row){ return -row.numberOfOrders})
						.slice(0,itemsToShow);
					
		
	}

	Report.orderBy = "timeSlot";
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