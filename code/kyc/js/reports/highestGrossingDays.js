angular.module('kyc.reports')
.factory('HighestGrossingDays',[function(){

	var title = _tr("Highest Grossing Days");
	var Report = {}
	var data = []		
	var titles = [];
	var dateRange = moment.utc().subtract('month',1);
	var itemsToShow = 10;
	Report.setData = function(reportsData){					
		var tempData = {}	
		var grouped = _.groupBy(reportsData.orders,'day');
		angular.forEach(grouped,function(day,key){
			if (key > dateRange.valueOf()){
				angular.forEach(day,function(order){					
					if (tempData [key] === undefined){
						tempData [key] = {
							day:order.paid,
							date:order.paid,
							valueSold:order.total
						}
					} else {
						tempData [key].valueSold += order.total;
					}
				})				
			}
		})
		
		data =  _.sortBy(tempData,function(row){ return -row.valueSold})
						.slice(0,itemsToShow);
					
		
	}

	Report.orderBy = "valueSold";
	Report.description = _tr("Display top 10 highest grossing days.");

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