angular.module('kyc.charts')
.factory('OrdersByOutlet',['ChartType','Colors','Outlets', function(ChartType,Colors,Outlets) {

	var type = ChartType.PIE;
	var ordersByOutlet = {};	
    var colorIndex = 0;

	function setData(order){
        var outletId = order.outletId;
		if (ordersByOutlet[outletId] === undefined)
            ordersByOutlet[outletId] = {                
                y:0,
                
            }
		ordersByOutlet[outletId].y+=1;
	}

	function getData(){
        var ordersByOutletArray = [];
        angular.forEach(ordersByOutlet,function(item,outletId){
            ordersByOutletArray.push({
                name: Outlets.getOutletName(outletId),  
                colors: Colors[colorIndex],
                y:item.y
            });
            colorIndex++;
        })
    	return ordersByOutletArray;
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