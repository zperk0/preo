angular.module('kyc.charts')
.factory('ItemsOrdered',['ChartType', 'PaymentType', function(ChartType, PaymentType) {

	var type = ChartType.NUMBER;
	var itemsOrdered =0;
	var title = _tr("Items Ordered");

	function setData(order,minDate,maxDate){
        var orderData = order.paymentType == PaymentType.CASH ? order.created : order.paid;
        orderData = moment.utc(orderData);
        if (orderData >= minDate && orderData <= maxDate){
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