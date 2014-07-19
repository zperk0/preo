angular.module('kyc.reports')
.factory('AllReports',['$q','Report','NewCustomers','ZeroOrdersCustomers','OneTimeBuyers','VENUE_ID',
	function($q,Report,NewCustomers,ZeroOrdersCustomers,OneTimeBuyers,VENUE_ID) {

		var AllReports = function(){};

		var reportsList = [
			NewCustomers,
			ZeroOrdersCustomers,
			OneTimeBuyers
		]

		var optionsMap = {
			dateJoined: _tr("Date Joined"),
			name: _tr("Name"),
			email: _tr("Email Address"),
			marketing: _tr("Marketing"),
			dateOfOrder:_tr("Date of Order"),
			numberOfOrders: _tr("Number of Orders")
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

      fetchData()
      .then(initReports)
      .then(function(){
      	console.log('all reports inited')	
      })
			// initReports().then(function(){
			// 	console.log('all reports inited')
			// 	angular.forEach(allOrders,function(order){
			// 		angular.forEach(reportsList,function(report){

			// 				report.setData(order)				
			// 		});
			// 	});				
			// 	angular.forEach(reportsList,function(report){
			// 		if (report.onSetDataComplete){
			// 				report.onSetDataComplete()
			// 		}
			// 		setTitles(report);
			// 		report.title = report.getTitle();
			// 	});

				// deferred.resolve();
			// })
			return deferred.promise;
		}

		function fetchData(){
			console.log("fetching data")
			return $q.all([
					Report.items({venueId:VENUE_ID}).$promise,
					Report.orders({venueId:VENUE_ID}).$promise,
					Report.customerOrders({venueId:VENUE_ID}).$promise
				])
				
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