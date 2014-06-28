angular.module('kyc.charts')
.factory('OrdersByOutlet',['ChartType','Colors','OutletService', function(ChartType,Colors,OutletService) {

	var type = ChartType.PIE;
	var ordersByOutlet = {};	
    var colorIndex = 0;
    var title = 'Orders By Outlet';
    var minTimestamp = 0;
    var maxTimestamp = 0;

    function clearData(){
        colorIndex=0;
        ordersByOutlet={};
    }

	function setData(order,minDate,maxDate){
        var minTimestamp = minDate.getTime();
        var maxTimestamp = maxDate.getTime();
        var orderData = new Date(order.created);
        if (orderData >= minTimestamp && orderData <= maxTimestamp){
            var outletId = order.outletId;
    		if (ordersByOutlet[outletId] === undefined)
                ordersByOutlet[outletId] = {                
                    y:0                    
                }
            ordersByOutlet[outletId].y+=1;
        }		
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
            data:getData(),
            getPdf:getPdf
        }
    }

     function getPdf(){
        return chartInfo = {
            type:type,
            title:title,
            startDate: minTimestamp,
            endDate: maxTimestamp,            
            dataJson: JSON.stringify(getData()),
            categories: getCategories()
        }
    }

    function getCategories(){
        var arr = []        
        angular.forEach(ordersByOutlet,function(item,outletId){
            arr.push(OutletService.getOutletName(outletId))            
        })
        return arr;
    }

    return {
        getData:getData,
        getType:getType,
        setData:setData,
        getHighChart:getHighChart,
        clearData:clearData
    };
}]);