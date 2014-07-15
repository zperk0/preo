angular.module('kyc.reports')
.factory('AllReports',['$q','NewCustomers','ZeroOrdersCustomers',
	function($q,NewCustomers,ZeroOrdersCustomers) {

		var AllReports = function(){};

		var reportsList = [
			NewCustomers,
			ZeroOrdersCustomers
		]

		var optionsMap = {
			dateJoined: _tr("Date Joined"),
			name: _tr("Name"),
			email: _tr("Email Address"),
			marketing: _tr("Marketing")
		}

		function setTitles(report){
			console.log('setting titles for report',report.getTitle());
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
      var deferred  = $q.defer();
			initReports().then(function(){
				angular.forEach(allOrders,function(order){
					angular.forEach(reportsList,function(report){

							report.setData(order)				
					});
				});				
				angular.forEach(reportsList,function(report){													
					if (report.onSetDataComplete){
							report.onSetDataComplete()
					}
					setTitles(report);
				});

				deferred.resolve();
			})
			return deferred.promise;
		}

		function initReports(){
				var promises=[]
				angular.forEach(reportsList , function(report) { 
					 if (report.init)
					 	promises.push(report.init())
				});
				return $q.all(promises);
		}


		AllReports.getTitle = function(prop){			
			return optionsMap[prop] ? optionsMap[prop] : prop;
		}

		AllReports.getReportsList = function(){
			return reportsList;
		}

		return AllReports;

}]);