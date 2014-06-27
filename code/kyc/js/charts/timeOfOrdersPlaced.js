angular.module('kyc.charts')
.factory('TimeOfOrdersPlaced',['ChartType','Colors', function(ChartType,Colors) {

	var type = ChartType.PIE;
    var colorIndex = 0;    
    var title = 'Time of Orders Placed';
    var data = [
        {name:_tr("Day of collection"),y:0,color:Colors[0]},
        {name:_tr("Before day of collection"),y:0,color:Colors[1]}
        
    ]

    function clearData(){
        data = [
        {name:_tr("Day of collection"),y:0,color:Colors[0]},
        {name:_tr("Before day of collection"),y:0,color:Colors[1]}
        ]
        colorIndex=0;
    }
    
	function setData(order,minDate,maxDate){
        var minTimestamp = minDate.getTime();
        var maxTimestamp = maxDate.getTime();
        var orderData = new Date(order.created);
        if (orderData >= minTimestamp && orderData <= maxTimestamp){
            if (order.created !== undefined && order.pickupTime !== undefined){
                var placed = new Date(order.created).setHours(0, 0, 0, 0);
                var pickup = new Date(order.pickupTime).setHours(0, 0, 0, 0);    
                if(placed === pickup){
                    data[0].y++;
                } else {
                    data[1].y++;
                }
            }
        }
                                    
	}

    function onSetDataComplete(){
    
    }

	function getData(){
    	return data;
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
        onSetDataComplete:onSetDataComplete,
        getHighChart:getHighChart,
        clearData:clearData
    };
}]);