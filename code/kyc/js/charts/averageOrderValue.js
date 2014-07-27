angular.module('kyc.charts')
.factory('AverageOrderValue',['ChartType', function(ChartType) {

	var type = ChartType.NUMBER;
	var ordersTotal = 0;
	var numOfOrders =0;
    var title = _tr("Average Order Value");

	function setData(order,minDate,maxDate){        
        var orderData = moment.utc(order.paid);
        if (orderData >= minDate && orderData <= maxDate){
    		numOfOrders++;
    		ordersTotal+=order.total;
        }
	}

    function clearData(){
        ordersTotal = 0;
        numOfOrders = 0;
    }

	function getData(){
    	return (ordersTotal/numOfOrders).toFixed(2);
    }
    function getType(){
    	return type; 
    }
    
    function getHighChart(){
        return {
            type:type,
            title:title,
            data:getData(),
            currency:"£"
        }
    }

    return {
        getData:getData,
        getType:getType,
        setData:setData,
        getHighChart:getHighChart,
        clearData:clearData,
    };
}]);