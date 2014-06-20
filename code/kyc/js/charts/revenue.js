angular.module('kyc.charts')
.factory('Revenue',['ChartType', function(ChartType) {

	var type = ChartType.AREA;
	

	function setData(order){
	
	}

	function getData(){
	   return {}
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