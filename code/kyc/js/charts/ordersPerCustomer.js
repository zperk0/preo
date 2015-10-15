angular.module('kyc.charts')
.factory('OrdersPerCustomer',['ChartType', function(ChartType) {

	var type = ChartType.NUMBER;
	var newCustomers = [];
	var repeatedCustomers = [];
	var orders = 0;
	var title = _tr("Orders per Customer");


    function clearData(){
        newCustomers = [];
        repeatedCustomers = [];
        orders = 0;
    }

	function setData(order,minDate,maxDate){
        var orderData = moment.utc(order.pickupTime);
        if (orderData >= minDate && orderData <= maxDate){
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
    }

	function getData(){
    	return (orders/newCustomers.length).toFixed(2);
    }
    function getType(){
    	return type;
    }

    function getHighChart(){
    	return {
    		type:type,
    		title:title,
    		data:getData()
    	}
    }

    return {
        getData:getData,
        getType:getType,
        setData:setData,
        getHighChart:getHighChart,
        clearData:clearData
    };
}]);