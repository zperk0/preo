angular.module('kyc.reports')
.factory('AllReports',['$q','Report','NewCustomers','ZeroOrdersCustomers','OneTimeBuyers','MostFrequentBuyers','HighestSpendingCustomers','CustomersIncreasingOrders',
	'CustomersIncreasingSpend','CustomersDecreasingOrders','CustomersDecreasingSpend','SleepingCustomers','MostPopularItemsReport','ItemPopularityIncrease','ItemPopularityDecrease',
	'HighestGrossingDays','LowestGrossingDays','HighestOrderDays','LowestOrderDays','HighestOrderHours','HighestGrossingHours','VENUE_ID',
	function($q,Report,NewCustomers,ZeroOrdersCustomers,OneTimeBuyers,MostFrequentBuyers,HighestSpendingCustomers,CustomersIncreasingOrders,CustomersIncreasingSpend,
		CustomersDecreasingOrders,CustomersDecreasingSpend,SleepingCustomers,MostPopularItems,ItemPopularityIncrease,ItemPopularityDecrease,HighestGrossingDays,
		LowestGrossingDays,HighestOrderDays,LowestOrderDays,HighestOrderHours,HighestGrossingHours,VENUE_ID) {

		var AllReports = function(){};
		

		var reportsList = [
			NewCustomers,
			ZeroOrdersCustomers,
			OneTimeBuyers,
			MostFrequentBuyers,
			HighestSpendingCustomers,
			CustomersIncreasingOrders,
			CustomersIncreasingSpend,
			CustomersDecreasingOrders,
			CustomersDecreasingSpend,
			SleepingCustomers,
			MostPopularItems,
			ItemPopularityIncrease,
			ItemPopularityDecrease,
			HighestGrossingDays,
			LowestGrossingDays,
			HighestOrderDays,
			LowestOrderDays,
			HighestOrderHours,
			HighestGrossingHours
		]

		var optionsMap = {
			dateJoined: _tr("Date Joined"),
			name: _tr("Name"),
			email: _tr("Email Address"),
			marketing: _tr("Marketing"),
			dateOfOrder:_tr("Date of Order"),
			numberOfOrders: _tr("Number of Orders"),
			totalSpent: _tr("Total Spent"),
			percentIncrease: _tr("% Increase"),
			percentDecrease: _tr("% Decrease"),
			lastOrder: _tr("Last Order"),
			itemName : _tr("Item Name"),
			quantitySold: _tr("Quantity Sold"),
			day: _tr("Day"),
			date: _tr("Date"),
			valueSold: _tr("Value Sold")
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
      var deferred  = $q.defer();

      fetchData()
      .then(initReports)
      .then(function(){				
					
				angular.forEach(reportsList,function(report){
						report.setData(AllReports.data)				
				});				

				angular.forEach(reportsList,function(report){
					if (report.onSetDataComplete){
							report.onSetDataComplete()
					}
					setTitles(report);
					report.title = report.getTitle();
			});

				deferred.resolve();
			})
      
			return deferred.promise;
		}

		function fetchData(){			
			var now = moment().valueOf();
			var lastMonthEnd = moment().subtract('month',1).valueOf();
			var lastMonthBegin = moment().subtract('month',2).valueOf();			

			return $q.all([
					Report.items({venueId:VENUE_ID}).$promise,
					Report.orders({venueId:VENUE_ID}).$promise,
					Report.customerOrders({venueId:VENUE_ID}).$promise,
					Report.customerOrders({venueId:VENUE_ID,maxDate:now,minDate:lastMonthEnd}).$promise,
					Report.customerOrders({venueId:VENUE_ID,maxDate:lastMonthEnd,minDate:lastMonthBegin}).$promise
				])
				
		}

		function initReports(data){
			console.log('data',data);
				AllReports.data = {
					items:data[0],
					orders:prepareOrders(data[1]),
					customerOrders:prepareCustomerOrders(data[2],data[3],data[4])					
				}

				var promises=[]
				angular.forEach(reportsList , function(report) { 
					 if (report.init)
					 	promises.push(report.init())
				});
				return $q.all(promises);
		}

		function prepareOrders(orders){
			angular.forEach(orders,function(order){
				
				//get the start of each day to group by
				order.day = moment(order.paid).startOf('day').valueOf();
				//get the hour of the order only				
				order.hour = moment(order.paid).hour();
			})
			return orders;
		}

		function prepareCustomerOrders(customerOrders,thisMonthCustomerOrders,lastMonthCustomerOrders){				
			console.log(customerOrders.length,thisMonthCustomerOrders.length,lastMonthCustomerOrders.length)
				angular.forEach(customerOrders,function(customerOrder){
					var thisMonth;
					var lastMonth;
					for (var index in thisMonthCustomerOrders){
						if (thisMonthCustomerOrders[index].id === customerOrder.id){
							thisMonth = thisMonthCustomerOrders[index];
							break;
						}
					}
					for (var index in lastMonthCustomerOrders){
						if (lastMonthCustomerOrders[index].id === customerOrder.id){
							lastMonth = lastMonthCustomerOrders[index];
							break;
						}
					}

					if (thisMonth && thisMonth.orders && lastMonth && lastMonth.orders){
						customerOrder.orderPercentage = (100 * thisMonth.orders) / lastMonth.orders;
						customerOrder.orderPercentage = thisMonth.orders > lastMonth.orders ? customerOrder.orderPercentage : -customerOrder.orderPercentage;

						customerOrder.totalPercentage = (100 * thisMonth.total) / lastMonth.total;						
						customerOrder.totalPercentage = thisMonth.total > lastMonth.total ? customerOrder.totalPercentage : -customerOrder.totalPercentage;
						
					}

				});
				return customerOrders;
		}

		AllReports.getTitle = function(prop){			
			return optionsMap[prop] ? optionsMap[prop] : prop;
		}

		AllReports.getReportsList = function(){
			return reportsList;
		}

		return AllReports;

}]);