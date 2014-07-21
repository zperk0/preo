angular.module('kyc.reports')
.factory('HighestGrossingHours',[function(){

	var title = _tr("Highest Grossing Hours");
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
							timeSlot:moment(order.created).format("HH:00"),
							valueSold:order.total
						}
					} else {
						tempData[key].valueSold+=order.total
					}
				})						
		})
		
		console.log('tempData',tempData);
		data =  _.sortBy(tempData,function(row){ return row.valueSold})
						.slice(0,itemsToShow);
					
		
	}

	Report.orderBy = "valueSold";

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