angular.module('kyc.charts')
.factory('PayingCustomers',['ChartType', function(ChartType) {

		var type = ChartType.NUMBER;
		var newCustomers = [];
		var repeatedCustomers = [];
		var title = _tr("Total Customers");

    function clearData(){
        newCustomers = [];
        repeatedCustomers = [];
    }

	function setData(order,minDate,maxDate){
        var orderData = moment.utc(order.pickupTime).valueOf();

        if (orderData >= minDate.valueOf() && orderData <= maxDate.valueOf()){

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