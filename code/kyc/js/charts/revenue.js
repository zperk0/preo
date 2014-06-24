angular.module('kyc.charts')
.factory('Revenue',['ChartType', function(ChartType) {

	var type = ChartType.AREA;	
    var dailyRevenue = {};
    var data = [];
    var title = 'Revenue'
	function setData(order){
        console.log(order.paid);
        var timestamp = new Date(order.paid).setHours(0, 0, 0, 0);
	    if (dailyRevenue[timestamp])
            dailyRevenue[timestamp]+=order.total
        else
            dailyRevenue[timestamp]=order.total;        
	}

    function onSetDataComplete(){
        angular.forEach(dailyRevenue,function(dR){
            data.push(dR);            
        })
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
        getHighChart:getHighChart
    };
}]);