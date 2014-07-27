angular.module('kyc.charts')
.factory('OrdersByOutlet',['ChartType','Colors','OutletService','ChartHelper', function(ChartType,Colors,OutletService,ChartHelper) {

	var type = ChartType.PIE;
	var ordersByOutlet = {};	
    var colorIndex = 0;
    var title = _tr('Orders By Outlet');
    var minTimestamp = 0;
    var maxTimestamp = 0;

    function clearData(){
        colorIndex=0;
        ordersByOutlet={};
    }

	function setData(order,minDate,maxDate){        
        minTimestamp = minDate.valueOf();
        maxTimestamp = maxDate.valueOf();
        var orderData = moment.utc(order.paid);
        if (orderData >= minDate && orderData <= maxDate){
            var outletId = order.outletId;
    		if (ordersByOutlet[outletId] === undefined)
                ordersByOutlet[outletId] = {                
                    y:0                    
                }
            ordersByOutlet[outletId].y+=1;
        }		
	}

	function getData(){
        colorIndex =0;
        var ordersByOutletArray = [];
        angular.forEach(ordersByOutlet,function(item,outletId){
            ordersByOutletArray.push({
                name: OutletService.getOutletName(outletId),  
                color: Colors[colorIndex],
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
            getPdf:getPdf,
            getCsv:getCsv
        }
    }

    function getCsv(){
        var data = getData();
        var csvData =[[moment.utc(minTimestamp).format("DD-MMM-YYYY") + " - " + moment.utc(maxTimestamp).format("DD-MMM-YYYY")],[title]]
        angular.forEach(data,function(d){
            csvData.push([d.name,d.y]) 
        })
        return {
            data:csvData
        }
    }
       
     function getPdf(){
        return  {
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