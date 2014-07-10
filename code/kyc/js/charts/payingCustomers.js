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
        var orderData = moment(order.created);        
        if (orderData >= minDate && orderData <= maxDate){                    
    		var customerId  = order.userId;
    		if (newCustomers.indexOf(customerId) === -1){
    			newCustomers.push(customerId);
    		}
    		else{
    			if (repeatedCustomers.indexOf(customerId) === -1)
    				repeatedCustomers.push(customerId);
    		}
            console.log("settingData",newCustomers.length,repeatedCustomers.length)
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