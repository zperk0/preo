angular.module('kyc.charts')
.factory('ItemsOrdered',['ChartType', function(ChartType) {

		var type = ChartType.NUMBER;
		var itemsOrdered =0;
		var title = "Items Ordered"

		function setData(order,minDate,maxDate){
            var minTimestamp = minDate.getTime();
            var maxTimestamp = maxDate.getTime();
            var orderData = new Date(order.created);
            if (orderData >= minTimestamp && orderData <= maxTimestamp){
    			angular.forEach(order.items,function(item){
    				itemsOrdered+=item.qty;
    			})
    		}
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

     function clearData(){        
        itemsOrdered = 0;
    }

    return {
        getData:getData,
        getType:getType,
        setData:setData,
        getHighChart:getHighChart,
        clearData:clearData
    };
}]);