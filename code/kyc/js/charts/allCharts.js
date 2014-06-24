angular.module('kyc.charts')
.factory('AllCharts',['$q','OrderService','PayingCustomers','OrdersPerCustomer','AverageOrderValue','ItemsOrdered','OrdersByOutlet','MostPopularItems','TimeOfOrdersPlaced',
												'CustomersPie','CustomersBar','Revenue',
	function($q,OrderService,PayingCustomers,OrdersPerCustomer,AverageOrderValue,ItemsOrdered,OrdersByOutlet,MostPopularItems,TimeOfOrdersPlaced,
			CustomersPie,CustomersBar,Revenue) {
    var defer = $q.defer();

	var charts = {
    		// payingCustomers:PayingCustomers,
    		// ordersPerCustomer:OrdersPerCustomer,
    		// averageOrderValue:AverageOrderValue,
    		// itemsOrdered:ItemsOrdered,
    		// ordersByOutlet:OrdersByOutlet,
    		// mostPopularItems:MostPopularItems,
    		// timeOfOrdersPlaced:TimeOfOrdersPlaced,
    		// customersPie:CustomersPie,
    		// customersBar:CustomersBar,
            revenue2:Revenue,
    		revenue: {
                type: 3,
                data: [369, 640,                    
                    27387, 29459, 31056, 31982, 32040, 31233, 29224, 27342, 26662,
                    26956, 27912, 28999, 28965, 27826, 25579, 25722, 24826, 24605,
                    24304, 23464, 23708, 24099, 24357, 24237, 24401, 24344, 23586,
                    22380, 21004, 17287, 14747, 13076, 12555, 12144, 11009, 10950,
                    10871, 10824, 10577, 10527, 10475, 10421, 10358, 10295, 10104 ],
                title: 'Revenue',
                numberLeft: '£5,652.40',
                numberRight: '+14%'                

            }
  	}

    OrderService.load(prepareCharts)

    function prepareCharts(orders){
            angular.forEach(orders,function(order){
                angular.forEach(charts,function(chart){
                    if (chart.setData)
                        chart.setData(order,[]);
                })  
            });
            angular.forEach(charts,function(chart,key){
                if (chart.onSetDataComplete){
                    chart.onSetDataComplete()
                }            
            });  
           defer.resolve(charts); 
           console.log(Revenue.getHighChart());
    }

    function getPreparedCharts(){
        var retCharts = [];
        angular.forEach(charts,function(chart){
            if (chart.getHighChart)
                retCharts.push(chart.getHighChart())
            else
                retCharts.push(chart)
        })
        return retCharts;
    }

    return {
        promise:defer.promise,
        getPreparedCharts:getPreparedCharts
    };
}]);