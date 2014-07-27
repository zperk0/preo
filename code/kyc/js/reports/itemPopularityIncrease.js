angular.module('kyc.reports')
.factory('ItemPopularityIncrease',[function(){

	var title = _tr("Item Popularity Increase");
	var Report = {}
	var data = {}
	var tempData = {};
	var titles = [];
	
	Report.setData = function(reportsData){			
		var thisMonth = moment().subtract('month',1).valueOf();
		var lastMonth = moment().subtract('month',2).valueOf();
		angular.forEach(reportsData.items,
			function(item){						
				if (tempData[item.menuItemId] === undefined){					
					tempData[item.menuItemId] = {						
						name:item.name,
						$thisMonthQuantitySold:0,
						$lastMonthQuantitySold:0,
					}
				}									
				var created = moment(item.paid).valueOf();				
				if (created >= thisMonth){
			  	tempData[item.menuItemId].$thisMonthQuantitySold+=item.qty;
				}
			  else if (created > lastMonth){
			  	tempData[item.menuItemId].$lastMonthQuantitySold+=item.qty;
			  }
		});		
		console.log(tempData,'tempData');
	}

	Report.onSetDataComplete = function(){
		angular.forEach(tempData,function(item,key){
			
			if (item.$thisMonthQuantitySold > item.$lastMonthQuantitySold ){
				var popularity = ( 100 * item.$thisMonthQuantitySold )/item.$lastMonthQuantitySold ;
				if (popularity === Infinity)
					popularity = 100;
				data[key] = {
					itemName: item.name,
					quantitySold : item.$thisMonthQuantitySold,
					percentIncrease: popularity.toFixed(0)
				}			
			}
		})
		console.log('data',data);
	}

	Report.orderBy = "percentIncrease";

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