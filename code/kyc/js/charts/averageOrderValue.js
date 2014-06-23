angular.module('kyc.charts')
.factory('AverageOrderValue',['ChartType', function(ChartType) {

	var type = ChartType.NUMBER;
	var ordersTotal = 0;
	var numOfOrders =0;
    var title = "Average Order Value"
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
        getHighChart:getHighChart
    };
}]);