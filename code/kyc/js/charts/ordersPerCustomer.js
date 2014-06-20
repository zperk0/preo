angular.module('kyc.charts')
.factory('OrdersPerCustomer',['ChartType', function(ChartType) {

		var type = ChartType.NUMBER;
		var newCustomers = [];
		var repeatedCustomers = [];
		var orders = 0;
		function setData(order){
			orders++;
			var customerId  = order.userId;
			if (newCustomers.indexOf(customerId) === -1){
				newCustomers.push(customerId);
			}
			else{
				if (repeatedCustomers.indexOf(customerId) === -1)
					repeatedCustomers.push(customerId);
			}
		}

		function getData(){
    	return (orders/newCustomers.length).toFixed(2);
    }
    function getType(){
    	return type; 
    }

    return {
        getData:getData,
        getType:getType,
        setData:setData
    };
}]);