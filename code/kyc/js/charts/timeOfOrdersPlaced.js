angular.module('kyc.charts')
.factory('TimeOfOrdersPlaced',['ChartType','Colors','Outlets', function(ChartType,Colors,Outlets) {

	var type = ChartType.PIE;
    var colorIndex = 0;    
    var data = [
        {name:_tr("Day of collection"),y:0,color:Colors[0]},
        {name:_tr("Before day of collection"),y:0,color:Colors[1]}
        
    ]
    
	function setData(order){
        console.log 
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

    function onSetDataComplete(){
    
    }

	function getData(){
    	return data;
    }
    function getType(){
    	return type; 
    }

    return {
        getData:getData,
        getType:getType,
        setData:setData,
        onSetDataComplete:onSetDataComplete
    };
}]);