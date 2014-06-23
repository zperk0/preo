angular.module('kyc.charts')
.factory('ItemsOrdered',['ChartType', function(ChartType) {

		var type = ChartType.NUMBER;
		var itemsOrdered =0;
		var title = "Items Ordered"

		function setData(order){
			angular.forEach(order.items,function(item){
				itemsOrdered+=item.qty;
			})
			
		}

		function getData(){
    	return itemsOrdered;
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