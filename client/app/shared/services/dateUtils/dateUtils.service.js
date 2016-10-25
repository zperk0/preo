export default class DateUtils {

  static get UID() {

    return "DateUtils";
  }


  daysBetween ( date1, date2 ) {

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

	addDays (theDate, days) {

	    return new Date(theDate.getTime() + days *24*60*60*1000);
	}

	getDateObj (dateString) {

    let date = moment(dateString).hours(12);
    return date.toDate();
	}

  // Format date to show on table (DD/MM/YYYY)
  getStrDate (str_date) {

    var date = new Date(str_date),
        formatted = str_date ? pad(String(date.getUTCDate()), 2) + '/' + pad(String(date.getUTCMonth() + 1), 2) + '/' + date.getUTCFullYear() : '';

    return formatted;
  }
}
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