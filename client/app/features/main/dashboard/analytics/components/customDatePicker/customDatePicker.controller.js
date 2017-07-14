export default class customDatePickerController {
  static get UID(){
  return "customDatePickerController";
  }

  onEnterinputs(event){

    var divRoot = this.scope.getDirectiveElement()[0];

    var dateInput = event.target || event.srcElement;

    var elementFocused = divRoot.querySelector('#' + dateInput.id);

    elementFocused.setSelectionRange(0, elementFocused.value.length);
    this.shouldShowCalendar = true;
  }

  onBlurinputs(event){

    var divRoot = this.scope.getDirectiveElement()[0];

    var dateInput = event.target || event.srcElement;

    var elem = divRoot.querySelector('#' + dateInput.id);

    var dateInputed = moment(elem.value, 'L', true);

    if(dateInputed == null || !dateInputed.isValid()){
      if(dateInput.id === 'fromDate'){
        elem.value = this.calendarDateFrom.startDate.format('L');
      }else if(dateInput.id === 'endDate'){
        elem.value = this.calendarDateFrom.endDate.format('L');
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
    if(elem.value.length ==10 && moment(elem.value , 'L', true).isValid()){

      var newDate = moment(elem.value, 'L', true).format();

      if(elementId === 'fromDate'){
       // this.calendarDateFrom = moment(newDate);
        this.calendarDateFrom.startDate = moment(newDate);
        this.datesRange.startDate = elem.value;

        if(this.calendarDateFrom.isAfter(this.calendarDateEnd)){
         this.inputDateEnd = elem.value ;
         this.datesRange.endDate = elem.value;
         //this.calendarDateEnd = moment(newDate);
         this.calendarDateFrom.endDate = moment(newDate);
        }
      }else if(elementId === 'endDate'){
       // this.calendarDateEnd = moment(newDate);
        this.calendarDateFrom.endDate = moment(newDate);
        this.datesRange.endDate = elem.value;

        if(this.calendarDateEnd.isBefore(this.calendarDateFrom)){
          this.inputDateFrom = elem.value ;
          this.datesRange.startDate = elem.value;
          //this.calendarDateFrom = moment(newDate);
          this.calendarDateFrom.startDate = moment(newDate);
        }
      }

    }

  }

  initCalendar(){

    var startDate = moment();
    var endDate = moment();

    // input texts are only texts formatted as dd/mm/yyyy
    // calendarDate its a moment() ...dont mix
    if(this.datesRange.startDate){
      startDate = moment(this.datesRange.startDate, 'L', true);
      this.inputDateFrom = this.datesRange.startDate;
      this.calendarDateFrom.startDate = (startDate);
    }
    else{
      this.inputDateFrom = startDate.format('L');
      this.calendarDateFrom.startDate = startDate;
    }

    if(this.datesRange.endDate){
      endDate = moment(this.datesRange.endDate, 'L', true);
      this.inputDateEnd = this.datesRange.endDate;
     // this.calendarDateEnd = (endDate);
      this.calendarDateFrom.endDate = (endDate);
    }
    else{
     // this.calendarDateEnd = endDate;
      this.calendarDateFrom.endDate = (endDate);
      this.inputDateEnd = endDate.format('L');
    }

    var startCallback = function(day){
      this.inputDateFrom= day.format('L');
      this.datesRange.startDate = day.format('L');     
      // A fix to when user select a day AFTER 'endDate input', move endDate to the same date
      // This will not work now, because angular-mighty-datepicker is not ready for it.
      if(day.isAfter(this.calendarDateEnd)){
       this.inputDateEnd = day.format('L') ;
       this.datesRange.endDate = day.format('L');
       //this.calendarDateEnd = day;
       this.calendarDateFrom.endDate = day;
      }
      
    }.bind(this);

    this.optionsStartDate = {
     // start: this.calendarDateFrom,
      mode: 'range',
      months: 1,     
      template: require('./calendarPicker.tpl.html'),
      callback: startCallback
    }

    var endCallback = function(day){
      this.inputDateEnd= day.format('L'); 
      this.datesRange.endDate = day.format('L');
      // A fix to when user select a day BEFORE 'fromDate input', move fromDate to the same date
      // This will not work now, because angular-mighty-datepicker is not ready for it.
      if(day.isBefore(this.calendarDateFrom)){
        this.inputDateFrom = day.format('L') ;
        this.datesRange.startDate = day.format('L');
        //this.calendarDateFrom = day;
        this.calendarDateFrom.startDate = day;
      }
      
    }.bind(this);

    this.optionsEndDate = {
     // start: this.calendarDateEnd,
      months: 1,      
      template: require('./calendarPicker.tpl.html'),
      callback: endCallback
    }
    
  }

  constructor($scope, $timeout, Spinner, Snack) {
    "ngInject";

    this.shouldShowCalendar =false;
    this.calendarDateFrom = {
      startDate: null,
      endDate: null
    };
    this.scope = $scope;

    this.initCalendar();
  }

}