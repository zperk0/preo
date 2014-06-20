angular.module('kyc.charts')
.factory('AverageOrderValue',['ChartType', function(ChartType) {

		var type = ChartType.NUMBER;
		var ordersTotal = 0;
		var numOfOrders =0;

		function setData(order){
			numOfOrders++;
			ordersTotal+=order.total;
		}

		function getData(){
    	return (ordersTotal/numOfOrders).toFixed(2);
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