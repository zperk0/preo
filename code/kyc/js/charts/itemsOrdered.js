angular.module('kyc.charts')
.factory('ItemsOrdered',['ChartType', function(ChartType) {

		var type = ChartType.NUMBER;
		var itemsOrdered =0;
		

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

    return {
        getData:getData,
        getType:getType,
        setData:setData
    };
}]);