angular.module('kyc.charts')
.factory('PayingCustomers',['ChartType', function(ChartType) {

		var type = ChartType.NUMBER;
		var newCustomers = [];
		var repeatedCustomers = [];
		var title = "Paying Customers"
    
    function clearData(){
        var newCustomers = [];
        var repeatedCustomers = [];
    }

	function setData(order,minDate,maxDate){   
        var minTimestamp = minDate.getTime();
        var maxTimestamp = maxDate.getTime();
        var orderData = new Date(order.created);
        if (orderData >= minTimestamp && orderData <= maxTimestamp){
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
    	return newCustomers.length;
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