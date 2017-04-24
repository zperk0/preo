export default class customDatePickerController {
  static get UID(){
    return "customDatePickerController";
  }

  onEnterinputs(event){    

    var divRoot = this.scope.getDirectiveElement()[0];

  	var elemId = event.srcElement.id;
  	var elementFocused = divRoot.querySelector('#' + elemId);

  	elementFocused.setSelectionRange(0, elementFocused.value.length);
  	this.shouldShowCalendar = true;	
  }

  onBlurinputs(event){

    var divRoot = this.scope.getDirectiveElement()[0];
  	
  	var elemId = event.srcElement.id;
    var elem = divRoot.querySelector('#' + elemId);

  	var dateInputed = moment(elem.value, 'DD/MM/YYYY', true);

  	if(dateInputed == null || !dateInputed.isValid()){
  		if(elemId === 'fromDate'){
  			elem.value = this.calendarDateFrom.format('DD/MM/YYYY');
  		}else if(elemId === 'endDate'){
  			elem.value = this.calendarDateEnd.format('DD/MM/YYYY');
  		}
  	}

 }

  // Trap Div will hide calendar, and automatically fire events: focus & click from element at position X,Y where user clicked
  // This is a workaround to prevent user to click 2 times ( 1 to close trapDiv and 1 to open wanted element)
  clickTrapDiv(e){

    var divRoot = this.scope.getDirectiveElement()[0];
  
  	this.shouldShowCalendar = false;

  	var trapDiv = divRoot.querySelector('#trapDiv');
  	trapDiv.style.display = 'none';

  	var elemClicked = document.elementFromPoint(e.clientX, e.clientY);
  	trapDiv.style.display = 'block'; 
  	elemClicked.focus();
  	elemClicked.click();
  }

  onKeyDown(e){
    	// Allow DEL and Backspace and Arrows
  	if(isNaN(e.key) && (e.keyCode !== 8 && e.keyCode !== 46 && e.keyCode !== 37 && e.keyCode !== 39)){
  	    e.preventDefault();	    
  	}
  }

  onKeyUp(e){

    var divRoot = this.scope.getDirectiveElement()[0];

  	var elementId = e.target.id;
  	var elem = divRoot.querySelector('#' + elementId);
  	var val = elem.value;
  	
  	// Allow DEL and Backspace and Arrows
  	if(e.keyCode == 8 || e.keyCode == 46 || e.keyCode == 37 || e.keyCode == 39){
  		return;
  	}	
  	
    if (val.match(/^\d{2}$/) !== null) {
	    elem.value = val + '/';
  	} else if (val.match(/^\d{2}\/\d{2}$/) !== null) {
  	    elem.value = val + '/';
  	}   
  
  	// Only set datesRange back to parent when data is completed and validated
    if(elem.value.length ==10 && moment(elem.value , 'DD/MM/YYYY', true).isValid()){

    	var newDate = moment(elem.value, 'DD/MM/YYYY', true).format();

    	if(elementId === 'fromDate'){
	    	this.calendarDateFrom = moment(newDate);
	   		this.datesRange.startDate = elem.value;

	    	if(this.calendarDateFrom.isAfter(this.calendarDateEnd)){
	    		this.inputDateEnd = elem.value ;
	    		this.datesRange.endDate = elem.value;
	    		this.calendarDateEnd = moment(newDate);
	    	}
    	}else if(elementId === 'endDate'){
	    	this.calendarDateEnd = moment(newDate);
	   		this.datesRange.endDate = elem.value;

	    	if(this.calendarDateEnd.isBefore(this.calendarDateFrom)){
	    		this.inputDateFrom = elem.value ;
	    		this.datesRange.startDate = elem.value;
	    		this.calendarDateFrom = moment(newDate);
	    	}
    	}    	

    } 
	    
  }  

  initCalendar(){
    
  	var startDate, endDate = moment();  	

  	// input texts are only texts formatted as dd/mm/yyyy
  	// calendarDate its a moment() ...dont mix
  	if(this.datesRange.startDate){
  		startDate = moment(this.datesRange.startDate, 'DD/MM/YYYY', true).format();  
  		this.inputDateFrom = this.datesRange.startDate;
  		this.calendarDateFrom = moment(startDate);
  	}
  	else{
  		this.inputDateFrom = startDate.format('DD/MM/YYYY');
  		this.calendarDateFrom = startDate;
  	}

    	if(this.datesRange.endDate){
  	    endDate = moment(this.datesRange.endDate, 'DD/MM/YYYY', true).format();		
  	    this.inputDateEnd = this.datesRange.endDate;
  	    this.calendarDateEnd = moment(endDate);
  	}
  	else{
  		this.calendarDateEnd = endDate;
  		this.inputDateEnd = endDate.format('DD/MM/YYYY');
  	}    

  	var startCallback = function(day){
  		this.inputDateFrom= day.format('DD/MM/YYYY');
  		this.datesRange.startDate = day.format('DD/MM/YYYY');		
  	}.bind(this);

  	this.optionsStartDate = {
  	    start: this.calendarDateFrom.add('month'),
  	    months: 1,	
  	    template: require('./calendarPicker.tpl.html'),	   
  	    callback: startCallback
  	}

  	var endCallback = function(day){
  		this.inputDateEnd= day.format('DD/MM/YYYY');
  		this.datesRange.endDate = day.format('DD/MM/YYYY');	
  	}.bind(this);

  	this.optionsEndDate = {
  	    start: this.calendarDateEnd.add('month'),	   
  	    months: 1,
  	    template: require('./calendarPicker.tpl.html'),	   
  	    callback: endCallback
  	}
  }

  constructor($scope, $timeout, Spinner, Snack) {
    "ngInject";
    
    this.shouldShowCalendar =false; 
    this.scope = $scope;

	  this.initCalendar();
  }

}