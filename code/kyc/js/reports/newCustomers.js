angular.module('kyc.reports')
.factory('NewCustomers',[function(){

	var title = _tr("New Customers");
	var Report = {}
	var data = {}
	var titles = [];
	var dateRange = moment().subtract('year',2);

	Report.setData = function(order){
		var user = order.user;
		var created = moment(user.created);		
		if (created > dateRange){
			if (data[user.id] === undefined){
				data[user.id] = {
					dateJoined:user.created,
					name:user.firstName + " " + user.lastName,
					email:user.username,
					marketing:(user.optinLoyalty || user.optinOffers || user.optinOther)
				}				
			}
		}
	}

	Report.onSetDataComplete = function(){		
	}

	Report.getData = function(){
		console.log('getting data',data);
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