angular.module('kyc.charts')
.factory('ChartHelper',['$filter',function($filter) {

	
    function formatDate(timestamp){
    	var date = new Date(timestamp);
    	return  $filter('date')(date, "dd-MMM-yyyy")    	
    }

    function getPercentage(data,oldData){
        var totalData = getPeriodTotal(data);
        var totalOldData = getPeriodTotal(oldData)        
        return (totalData * 100 / totalOldData).toFixed(0)
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