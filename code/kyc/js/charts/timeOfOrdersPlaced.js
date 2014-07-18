angular.module('kyc.charts')
.factory('TimeOfOrdersPlaced',['ChartType','Colors','ChartHelper', function(ChartType,Colors,ChartHelper) {

	var type = ChartType.PIE;
    var colorIndex = 0;    
    var title = _tr('Time of Orders Placed');
    var data = [
        {name:_tr("On the day"),y:0,color:Colors[0]},
        {name:_tr("In advance"),y:0,color:Colors[1]}
        
    ]
    var minTimestamp = 0;
    var maxTimestamp = 0;

    function clearData(){
        data = [
        {name:_tr("On the day"),y:0,color:Colors[0]},
        {name:_tr("In advance"),y:0,color:Colors[1]}
        ]
        colorIndex=0;
    }
    
	function setData(order,minDate,maxDate){
        minTimestamp = minDate.valueOf();
        maxTimestamp = maxDate.valueOf();
        var orderData = moment(order.created);
        if (orderData >= minDate && orderData <= maxDate){
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
            data:getData(),
            getPdf:getPdf,
              getCsv:getCsv
        }
    }

    function getCsv(){
        var data = getData();
        var csvData =[[moment(minTimestamp).format("DD-MMM-YYYY") + " - " + moment(maxTimestamp).format("DD-MMM-YYYY")],[title]]
        angular.forEach(data,function(d){
            csvData.push([d.name,d.y]) 
        })
        return {
            data:csvData
        };
    }

    function getPdf(){
        return chartInfo = {
            type:type,
            title:title,
            startDate: minTimestamp,
            endDate: maxTimestamp,            
            dataJson: JSON.stringify(data),
            categories: [_tr('Day of collection'),_tr('Before day of collection')]
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