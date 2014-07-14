angular.module('kyc.reports')
.factory('AllReports',['$q','NewCustomers',
	function($q,newCustomers) {

		var AllReports = function(){};

		var reportsList = [
			newCustomers
		]

		var optionsMap = {
			dateJoined: _tr("Date Joined"),
			name: _tr("Name"),
			email: _tr("Email Address"),
			marketing: _tr("Marketing")
		}

		function setTitles(report){
			var titles = [];
			var data = report.getData();
			for (var key in data){				
				angular.forEach(data[key],function(val,prop){					
						if (String(prop[0])!='$')
							titles.push(prop)
				})
				report.setTitles(titles);
				break;
			}
		}

		
		AllReports.init = function(allOrders){
			angular.forEach(allOrders,function(order){
				angular.forEach(reportsList,function(report){
						report.setData(order)
				});
			});

			angular.forEach(reportsList,function(report){
				setTitles(report);
				if (report.onSetDataComplete){
						report.onSetDataComplete()
				}
			});
			
		}


		AllReports.getTitle = function(prop){
			return optionsMap[prop] ? optionsMap[prop] : prop;
		}

		AllReports.getReportsList = function(){
			return reportsList;
		}

		return AllReports;

}]);