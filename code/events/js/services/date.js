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
        return new Date(arrDate[2], arrDate[1] - 1, arrDate[0], 12);
	}

    return service;

}]);

}(window, angular));

// sort date array
(function(){
  if (typeof Object.defineProperty === 'function'){
    try{Object.defineProperty(Array.prototype,'sortBy',{value:sb}); }catch(e){}
  }
  if (!Array.prototype.sortBy) Array.prototype.sortBy = sb;

  function sb(f){
    for (var i=this.length;i;){
      var o = this[--i];
      this[i] = [].concat(f.call(o,o,i),o);
    }
    this.sort(function(a,b){
      for (var i=0,len=a.length;i<len;++i){
        if (a[i]!=b[i]) return a[i]<b[i]?-1:1;
      }
      return 0;
    });
    for (var i=this.length;i;){
      this[--i]=this[i][this[i].length-1];
    }
    return this;
  }
})();