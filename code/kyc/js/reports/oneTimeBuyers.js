angular.module('kyc.reports')
.factory('OneTimeBuyers',[function(){

	var title = _tr("One Time Buyers");
	var Report = {}
	var data = {}
	var titles = [];

	Report.setData = function(order){
		var user = order.user;
		var created = moment(user.created);				
		if (data[user.id] === undefined){
			data[user.id] = {
				dateJoined:user.created,
				dateOfOrder:order.created,
				name:user.firstName + " " + user.lastName,
				email:user.username,
				marketing:(user.optinLoyalty || user.optinOffers || user.optinOther)
			} 			
		} else {
			data[user.id] = false;		
		}			
	}

	Report.onSetDataComplete = function(){		
		angular.forEach(data,function(value,key){
			if (value === false){
				delete data.key;
			}
		});
	}

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