angular.module('kyc.charts')
.factory('Revenue',['ChartType', function(ChartType) {

	var type = ChartType.AREA;	
    var dailyRevenue = {};
    var data = [];
    var title = 'Revenue'
    var totalRevenue =0;

	function setData(order){
        console.log(order.paid);
        var timestamp = new Date(order.paid).setHours(0, 0, 0, 0);
        console.log(timestamp,order);
	    if (dailyRevenue[timestamp])
            dailyRevenue[timestamp]+=order.total
        else
            dailyRevenue[timestamp]=order.total;        
        totalRevenue +=order.total;
	}

    function onSetDataComplete(){
        console.log(dailyRevenue);
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

    function getNumberRight(){

    }

    function getHighChart(){
        return {
            type:type,
            title:title,
            data:getData(),
            numberLeft:totalRevenue,
            numberRight:"0%", //FIXME calculate this number
            modal: getModal()
        }
    }

    function getModal(){
            return {
                    highcharts: {
                        type: ChartType.AREA_MODAL // type of highcharts in modal
                    }                  
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