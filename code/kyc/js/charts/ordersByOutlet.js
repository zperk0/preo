angular.module('kyc.charts')
.factory('OrdersByOutlet',['ChartType','Colors','OutletService', function(ChartType,Colors,OutletService) {

	var type = ChartType.PIE;
	var ordersByOutlet = {};	
    var colorIndex = 0;
    var title = 'Orders By Outlet';


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
                name: OutletService.getOutletName(outletId),  
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