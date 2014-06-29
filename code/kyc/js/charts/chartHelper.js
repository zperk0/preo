angular.module('kyc.charts')
.factory('ChartHelper',['$filter',function($filter) {

	
    function formatDate(timestamp){
    	var date = new Date(timestamp);
    	return  $filter('date')(date, "dd-MMM-yyyy")    	
    }


    return {
        formatDate:formatDate
    };
}]);