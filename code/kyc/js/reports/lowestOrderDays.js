angular.module('kyc.reports')
.factory('LowestOrderDays',[function(){

	var title = _tr("Lowest Order Days");
	var Report = {}
	var data = []		
	var titles = [];
	var dateRange = moment.utc().subtract('month',1);
	var itemsToShow = 10;
	Report.setData = function(reportsData){					
		var tempData = {}	
		data = [];
		var grouped = _.groupBy(reportsData.orders,'day');
		angular.forEach(grouped,function(day,key){
			if (key > dateRange.valueOf()){
				angular.forEach(day,function(order){					
					if (tempData [key] === undefined){
						tempData [key] = {
							day:order.paid,
							date:order.paid,
							numberOfOrders:1
						}
					} else {
						tempData[key].numberOfOrders++;
					}
				})				
			}
		})
		
		data =  _.sortBy(tempData,function(row){ return row.numberOfOrders})
						.slice(0,itemsToShow);
					
		
	}

	Report.orderBy = "numberOfOrders";
	Report.direction = true;

	Report.description = _tr("Display top 10 lowest order days.");

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