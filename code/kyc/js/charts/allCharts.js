angular.module('kyc.charts')
.factory('AllCharts',['$q','OrderService','PayingCustomers','OrdersPerCustomer','AverageOrderValue','ItemsOrdered','OrdersByOutlet','MostPopularItems','TimeOfOrdersPlaced',
												'CustomersPie','CustomersBar','Revenue',
	function($q,OrderService,PayingCustomers,OrdersPerCustomer,AverageOrderValue,ItemsOrdered,OrdersByOutlet,MostPopularItems,TimeOfOrdersPlaced,
			CustomersPie,CustomersBar,Revenue) {
    var defer = $q.defer();
	var charts = {
    		payingCustomers:PayingCustomers,
    		ordersPerCustomer:OrdersPerCustomer,
    		averageOrderValue:AverageOrderValue,
    		itemsOrdered:ItemsOrdered,
    		ordersByOutlet:OrdersByOutlet,
    		mostPopularItems:MostPopularItems,
    		timeOfOrdersPlaced:TimeOfOrdersPlaced,
    		customersPie:CustomersPie,
    		customersBar:CustomersBar,
    		revenue:Revenue
  	}

    OrderService.load(prepareCharts)

    function prepareCharts(orders){
            angular.forEach(orders,function(order){
                angular.forEach(charts,function(chart){
                    chart.setData(order,[]);
                })  
            });
            angular.forEach(charts,function(chart,key){
                if (chart.onSetDataComplete){
                    chart.onSetDataComplete()
                }            
            });  
           defer.resolve(charts); 
    }

    function getPreparedCharts(){
        var retCharts = [];
        angular.forEach(charts,function(chart){
            if (chart.getHighChart)
                retCharts.push(chart.getHighChart())
        })
        return retCharts;
    }

    return {
        promise:defer.promise,
        getPreparedCharts:getPreparedCharts
    };
}]);