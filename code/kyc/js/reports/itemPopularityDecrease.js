angular.module('kyc.reports')
.factory('ItemPopularityDecrease',[function(){

	var title = _tr("Item Popularity Decrease");
	var Report = {}
	var data = {}
	var tempData = {};
	var titles = [];
	
	Report.setData = function(reportsData){			
		var thisMonth = moment.utc().subtract('month',1).valueOf();
		var lastMonth = moment.utc().subtract('month',2).valueOf();
		angular.forEach(reportsData.items,
			function(item){						
				if (tempData[item.menuItemId] === undefined){					
					tempData[item.menuItemId] = {						
						name:item.name,
						$thisMonthQuantitySold:0,
						$lastMonthQuantitySold:0,
					}
				}									
				var created = moment.utc(item.paid).valueOf();				
				if (created >= thisMonth){
			  	tempData[item.menuItemId].$thisMonthQuantitySold+=item.qty;
				}
			  else if (created > lastMonth){
			  	tempData[item.menuItemId].$lastMonthQuantitySold+=item.qty;
			  }
		});		
		
	}

	Report.onSetDataComplete = function(){
		angular.forEach(tempData,function(item,key){			
			
			if (item.$thisMonthQuantitySold < item.$lastMonthQuantitySold ){
				var popularity = ( 100 * item.$thisMonthQuantitySold )/item.$lastMonthQuantitySold ;
				data[key] = {
					itemName: item.name,
					quantitySold : item.$thisMonthQuantitySold,
					percentDecrease: 100 - popularity.toFixed(0)
				}			
			}
		})
		
	}

	Report.orderBy = "percentDecrease";
	Report.description = _tr("Displays all items that sold less this month than last month");
	
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