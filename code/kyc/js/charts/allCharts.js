angular.module('kyc.charts')
.factory('AllCharts',['$q','OrderService','PayingCustomers','OrdersPerCustomer','AverageOrderValue','ItemsOrdered','OrdersByOutlet','MostPopularItems','TimeOfOrdersPlaced',
												'CustomersPie','CustomersBar','Revenue','NumberOfOrders','MenuItemPopularity', 'AverageOrderValueArea',
	function($q,OrderService,PayingCustomers,OrdersPerCustomer,AverageOrderValue,ItemsOrdered,OrdersByOutlet,MostPopularItems,TimeOfOrdersPlaced,
			CustomersPie,CustomersBar,Revenue,NumberOfOrders,MenuItemPopularity, AverageOrderValueArea) {
    var defer = $q.defer();
    
    var currency;
	var charts = {
    		payingCustomers:PayingCustomers,
    		ordersPerCustomer:OrdersPerCustomer,
    		averageOrderValue:AverageOrderValue,
    		itemsOrdered:ItemsOrdered,
            revenue:Revenue,
            numberOfOrders:NumberOfOrders,
            mostPopularItems:MostPopularItems,
            menuItemPopularity:MenuItemPopularity,
            //customersPie:CustomersPie,
            averageOrderValueArea: AverageOrderValueArea,
            customersBar:CustomersBar,
            timeOfOrdersPlaced:TimeOfOrdersPlaced,
            ordersByOutlet:OrdersByOutlet
  	};


    function init(minDate,maxDate,currencySymbol, selectedOutlets){        
        currency = currencySymbol;        
        OrderService.load(minDate,maxDate)
        .then(function(orders){
            prepareCharts(orders,minDate,maxDate,selectedOutlets)
        });
    }
        
    function reloadCharts(minDate,maxDate,currencySymbol, selectedOutlets){
        var chartDefer = $q.defer();
        currency = currencySymbol;

        if ( selectedOutlets.length ) {
            selectedOutlets = selectedOutlets.map(function(x){
                return x.id;
            })
        }

        OrderService.load(minDate,maxDate, selectedOutlets)
        .then(function(orders){
            prepareCharts(orders,minDate,maxDate,selectedOutlets);            
            chartDefer.resolve(charts);
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
        minDate = moment.utc(minDate);
        maxDate = moment.utc(maxDate);
        if (!selectedOutlets)
            selectedOutlets = [];   
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