angular.module('kyc.charts')
.factory('AllCharts',['$q','OrderService','PayingCustomers','OrdersPerCustomer','AverageOrderValue','ItemsOrdered','OrdersByOutlet','MostPopularItems','TimeOfOrdersPlaced',
												'CustomersPie','CustomersBar','Revenue','NumberOfOrders','MenuItemPopularity',
	function($q,OrderService,PayingCustomers,OrdersPerCustomer,AverageOrderValue,ItemsOrdered,OrdersByOutlet,MostPopularItems,TimeOfOrdersPlaced,
			CustomersPie,CustomersBar,Revenue,NumberOfOrders,MenuItemPopularity) {
    var defer = $q.defer();
    var initialMinDate;
    var initialMaxDate;
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
            // revenue:Revenue,
            numberOfOrders:NumberOfOrders,
            // menuItemPopularity:MenuItemPopularity
  	}



    function init(minDate,maxDate){
        initialMinDate = minDate;
        initialMaxDate = maxDate;
        OrderService.load(prepareCharts);
    }
        

    function findOutlet(selectedOutlets,outletId){
        var found = false;
        angular.forEach(selectedOutlets,function(outlet){
            if (!found && outlet.id == outletId)
                found = outlet;
        })
        return found;
    }

    function prepareCharts(orders,minDate,maxDate,selectedOutlets){        
        if (!minDate)
            minDate = initialMinDate;
        if (!maxDate)
            maxDate = initialMaxDate;
        if (!selectedOutlets)
            selectedOutlets = [];

            angular.forEach(charts,function(chart,key){
                chart.clearData();
            });               
            console.log('cleared data',orders,minDate,maxDate,selectedOutlets)
            angular.forEach(orders,function(order){
                if ( selectedOutlets.length === 0 || findOutlet(selectedOutlets,order.outletId) ){                    
                    var created = new Date(order.created).getTime();                
                        angular.forEach(charts,function(chart){
                            chart.setData(order,minDate,maxDate);
                        })  
                }
                
            });
            angular.forEach(charts,function(chart,key){
                if (chart.onSetDataComplete){
                    chart.onSetDataComplete(minDate,maxDate)
                }            
            });  
        defer.resolve(charts); 
    }

    function getPreparedCharts(){
        var retCharts = [];
        angular.forEach(charts,function(chart){
            if (chart.getHighChart){
                retCharts.push(chart.getHighChart())
            }
            else{
                retCharts.push(chart)
            }
        })
        return retCharts;
    }


    return {
        init:init,
        promise:defer.promise,
        getPreparedCharts:getPreparedCharts,
        prepareCharts:prepareCharts
    };
}]);