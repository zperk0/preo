(function(window, angular){

angular.module('events')
.service('DateUtils',['$timeout', function ($timeout) {
    
    var service = {};

    service.daysBetween = function( date1, date2 ) {
	 
		// Get 1 day in milliseconds
		var one_day = 1000*60*60*24;
		var one_week = one_day * 7;
		var one_month = one_day * 30;

		// Convert both dates to milliseconds
		var date1_ms = date1.getTime();
		var date2_ms = date2.getTime();

		// Calculate the difference in milliseconds
		var difference_ms = date2_ms - date1_ms;

		// Convert back to days and return
		return Math.round(difference_ms/one_day); 
	}

	service.addDays = function(theDate, days) {
	
	    return new Date(theDate.getTime() + days *24*60*60*1000);
	}

	service.formatDate = function(dateString) {
		
		var arrDate = dateString.split('/');
        return new Date(arrDate[2], arrDate[1] - 1, arrDate[0]);
	}

    return service;

}]);

}(window, angular));