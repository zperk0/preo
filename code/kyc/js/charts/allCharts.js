angular.module('kyc.charts')
.factory('AllCharts',['PayingCustomers','OrdersPerCustomer','AverageOrderValue','ItemsOrdered','OrdersByOutlet','MostPopularItems','TimeOfOrdersPlaced',
												'CustomersPie','CustomersBar','Revenue',
	function(PayingCustomers,OrdersPerCustomer,AverageOrderValue,ItemsOrdered,OrdersByOutlet,MostPopularItems,TimeOfOrdersPlaced,
			CustomersPie,CustomersBar,Revenue) {

		var charts = {
    		payingCustomers:PayingCustomers,
    		ordersPerCustomer:OrdersPerCustomer,
    		averageOrderValue:AverageOrderValue,
    		ItemsOrdered:ItemsOrdered,
    		ordersByOutlet:OrdersByOutlet,
    		mostPopularItems:MostPopularItems,
    		timeOfOrdersPlaced:TimeOfOrdersPlaced,
    		customersPie:CustomersPie,
    		customersBar:CustomersBar,
    		revenue:Revenue
  	}

    return charts;
}]);