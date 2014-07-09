angular.module('kyc.charts')
.factory('ChartHelper',['$filter',function($filter) {

	
    function formatDate(timestamp){
    	var date = new Date(timestamp);
    	return  $filter('date')(date, "dd-MMM-yyyy")    	
    }

    function getPercentage(data,oldData){
        var totalData = getPeriodTotal(data);
        var totalOldData = getPeriodTotal(oldData)        
        var percentage = (totalData * 100 / totalOldData)        
        return percentage === Infinity ? '&infin;' : percentage.toFixed(2);
    }

    function getPeriodTotal(data){
        var total = 0;
        angular.forEach(data,function(d){
            total+=d[1]
        })
        return total.toFixed(0);
    }

    return {
        formatDate:formatDate,
        getPercentage:getPercentage,
        getPeriodTotal:getPeriodTotal
    };
}]);