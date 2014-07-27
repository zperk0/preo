angular.module('kyc.charts')
.factory('AllCharts',['$q','OrderService','PayingCustomers','OrdersPerCustomer','AverageOrderValue','ItemsOrdered','OrdersByOutlet','MostPopularItems','TimeOfOrdersPlaced',
												'CustomersPie','CustomersBar','Revenue','NumberOfOrders','MenuItemPopularity',
	function($q,OrderService,PayingCustomers,OrdersPerCustomer,AverageOrderValue,ItemsOrdered,OrdersByOutlet,MostPopularItems,TimeOfOrdersPlaced,
			CustomersPie,CustomersBar,Revenue,NumberOfOrders,MenuItemPopularity) {
    var defer = $q.defer();
    
    var currency;
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
            revenue:Revenue,
            numberOfOrders:NumberOfOrders,
            menuItemPopularity:MenuItemPopularity
  	}





    function init(minDate,maxDate,currencySymbol,selectedOutlets){        
        currency = currencySymbol;        
        OrderService.load(minDate,maxDate)
        .then(function(orders){
            prepareCharts(orders,minDate,maxDate,selectedOutlets)
        });
    }
        
    function reloadCharts(minDate,maxDate,currencySymbol,selectedOutlets){
        var chartDefer = $q.defer();
        currency = currencySymbol;        
        OrderService.load(minDate,maxDate)
        .then(function(orders){
            console.log('on orderservice then')
            prepareCharts(orders,minDate,maxDate,selectedOutlets);            
            chartDefer.resolve(charts);
            console.log('resolved defer charts')
        });
        return chartDefer.promise;
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
        
        if (!selectedOutlets)
            selectedOutlets = [];   
            // console.log('preparing charts',orders.length,angular.toJson(orders));
            angular.forEach(charts,function(chart,key){
                chart.clearData();
            });                           
            angular.forEach(orders,function(order){
                if ( selectedOutlets.length === 0 || findOutlet(selectedOutlets,order.outletId) ){                    
                    
                    // if (order.paid === null)
                    //     return;

                    angular.forEach(charts,function(chart){
                        chart.setData(order,minDate,maxDate);
                    })  
                }
                
            });
            angular.forEach(charts,function(chart,key){
                if (chart.onSetDataComplete){
                    chart.onSetDataComplete(minDate,maxDate,currency)
                }            
            });  

            // console.log('chart0 data --',charts['payingCustomers'].getData())
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
        prepareCharts:prepareCharts,
        reloadCharts:reloadCharts
    };
}]);