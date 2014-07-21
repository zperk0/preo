angular.module('kyc.reports')
.factory('MostPopularItemsReport',[function(){

	var title = _tr("Most Popular Items");
	var Report = {}
	var data = {}
	var titles = [];
	
	Report.setData = function(reportsData){			
		angular.forEach(reportsData.items,
			function(item){											
				if (data[item.menuItemId] === undefined){					
					data[item.menuItemId] = {
						itemName: item.name,
						quantitySold: item.qty						
					}									
			  } else{
			  		data[item.menuItemId].quantitySold += item.qty;
			  }
		});
	}

	Report.orderBy = "quantitySold";

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