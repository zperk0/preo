//import controller from './customDatePicker.controller';

export default function customDatePicker($compile, $timeout, Rollbar){
  "ngInject";

  var options = {
    mode: "simple",
    months: 1,
    start: null,
    callback: void 0,
    template: require("./calendarPicker.tpl.html")
  };
  return {
    restrict: 'E',
    scope: {      
       model: '=datesRange',
       options: '=?',
    },
    template: require("./customDatePicker.tpl.html"),
    replace:true,
    link: ($scope, elem, attr, ctrl) => {

      var rangeMouseOver, _startSelected, _endSelected, _ignorePrepare, _isSelecting, _isTyping;
      $scope.inputs = {};

      function _injectPicker() {
        var domEl;
        domEl = $compile(angular.element(options.template))($scope);  
        let wrapper = angular.element(elem[0].querySelector('#wrapperCalendar'));
        wrapper.append(domEl[0]);
      };

            function _indexOfMoment (array, element) {
              var key, value;
              for (key in array) {

                value = array[key];
                if (value.isSame(element, 'day') && value.isSame(element, 'month') && value.isSame(element, 'year')) {
                  return key;
                }
              }
              return -1;
            };

            function _isSelected (day) {
              switch ($scope.options.mode) {
                case "multiple":
                  return _indexOfMoment($scope.model, day) > -1;
                case "range":
                  return $scope.model.startDate && day.isSame($scope.model.startDate, 'day') && day.isSame($scope.model.startDate, 'month') && day.isSame($scope.model.startDate, 'year')
                  || $scope.model.endDate && day.isSame($scope.model.endDate, 'day') && day.isSame($scope.model.endDate, 'month') && day.isSame($scope.model.endDate, 'year')
                default:
                  return $scope.model && day.isSame($scope.model, 'day') && day.isSame($scope.model, 'month') && day.isSame($scope.model, 'year');
              }
            };

            function _isInRange(day) {
              if ($scope.options.mode == 'range') {

                  let isRangeModel = moment.range($scope.model.startDate, $scope.model.endDate).contains(day) || day.isSame($scope.model.startDate, 'day')
                                   || day.isSame($scope.model.endDate, 'day');
                  
                  if(!rangeMouseOver)
                    return isRangeModel;

                  let isRangeMouse ;
                  if(_startSelected)
                    isRangeMouse = day.isSame(rangeMouseOver, 'day') || moment.range( rangeMouseOver, $scope.model.startDate).contains(day);
                  if(_endSelected)
                    isRangeMouse = day.isSame(rangeMouseOver, 'day') || moment.range( rangeMouseOver, $scope.model.startDate).contains(day)
                                  || moment.range($scope.model.endDate, rangeMouseOver).contains(day) ;
                  
                  return isRangeModel || isRangeMouse;
              } else {
                return false;
              }
            };

            function _setDayProperties(day, month){
              var isInMonth = day.date.month() === month;

              day.disabled = !isInMonth; //withInLimits commented for now
              day.inRange = isInMonth && _isInRange(day.date);
              day.selected = isInMonth && _isSelected(day.date);
            }

            function _numberWeeksInMonth(day){

              let firstDay = day.clone().startOf('month');
              let lastDay = day.clone().endOf('month');
              let keepGoing = true;
              let weeks = 0;

              let testedDate = firstDay.clone().startOf('week');
              while (keepGoing) {
                if (testedDate.isSameOrBefore(lastDay)) {
                  testedDate = testedDate.add(1, 'weeks');
                } else if (testedDate.isAfter(lastDay)) {
                  keepGoing = false;
                }

                if (keepGoing) {
                  weeks++;
                }
              }

              return weeks;
            }

            function _buildWeek(time, month) {
              var days, start;
              days = [];
              start = time.startOf('week');
              days = [0, 1, 2, 3, 4, 5, 6].map(function(d) {
                var day, withinLimits;
                day = moment(start).add(d, 'days');
                //withinLimits = _withinLimits(day, month);

                var obj = {
                  date: day,
                  selected : false,
                  inRange: false,
                  disabled: false
                };

                _setDayProperties(obj, month);
                return obj;
              });
              return days;
            };

           function _buildMonth(time) {
              var start, weeks, weeksInMonth;
              weeks = [];
              weeksInMonth = _numberWeeksInMonth(time);
              start = time.startOf('month');
              weeks = (function() {
                var _results = [];
                for(var i = 0; i < weeksInMonth; i++){
                  _results.push(_buildWeek(moment(start).add(i, 'weeks'), moment(start).month()));
                }
                return _results;
              })();
              return {
                weeks: weeks,
                name: time.format("MMMM YYYY")
              };
            };

           function _setup() {
              var attr, dates, start, tempOptions, v, _ref;
              tempOptions = {};
              for (attr in options) {
                v = options[attr];
                tempOptions[attr] = v;
              }
              if ($scope.options) {
                _ref = $scope.options;
                for (attr in _ref) {
                  v = _ref[attr];
                  tempOptions[attr] = $scope.options[attr];
                }
              }
              $scope.options = tempOptions;
              switch ($scope.options.mode) {
                case "multiple":
                  if ($scope.model && Array.isArray($scope.model) && $scope.model.length) {
                    if ($scope.model.length === 1) {
                      start = moment($scope.model[0]);
                    } else {
                      dates = $scope.model.slice(0);
                      start = moment(dates.sort().slice(-1)[0]);
                    }
                  }
                  break;
                case "range":
                  if($scope.model.startDate){
                    start = moment($scope.model.startDate);
                  }
                  break;
                default:
                  if ($scope.model) {
                    start = moment($scope.model);
                  }
              }

              $scope.options.start = $scope.options.start || start || moment().startOf('day');
              if ($scope.options.mode == 'range') {
                $scope.isRangeMode = true;
              } 

            };

            function _prepare() {

              $scope.months = [];

              var _results = [];

              var monthsToLoad = $scope.options.months;

              for(var i=0; i < monthsToLoad; i++){
                _results.push(_buildMonth(moment($scope.options.start).add(i, 'months')));
              }

              $scope.months = (_results);
            };

            function _build() {
              _prepare();
              return _injectPicker();
            };

            $scope.mouseLeaveMonth = function() {
              _isSelecting = false;
              _prepareDayLayout();
            };

            $scope.onMouseOverDay = function(day) {
              _isSelecting = true;
              _prepareDayLayout(day.date);
            }

          function _prepareDayLayout(day, isSelecting) {
            if(day)
              rangeMouseOver = day;
            else
              rangeMouseOver = null;

            let month;
            $scope.months.forEach((m) => {
              month = m.weeks[3][0].date.month();
              m.weeks.forEach((w) => {
                w.forEach((d) => {
                  _setDayProperties(d, month);
                });
              });

            });

            //does not execute placeholder part if is selecting day
            if(isSelecting){
              $scope.inputs.placeholder = "";

              if($scope.options.mode === 'simple')
                $scope.shouldShowCalendar = false;
              return;
            }

            if(day){

              if(_startSelected || (_endSelected && day.isBefore($scope.model.startDate)))
                $scope.inputs.start = "";
              if(_endSelected && day.isAfter($scope.model.startDate))
                $scope.inputs.end = "";

              $scope.inputs.placeholder = day.format('L');
            }
            else{ 
              switch ($scope.options.mode) {
                case 'multiple':
                  $scope.inputs.start = _fillMultipleDatesInput();
                  break;
                case 'range':
                  $scope.inputs.start = $scope.model.startDate.format('L');
                  $scope.inputs.end = $scope.model.endDate.format('L') ;
                  break;
                default:
                  $scope.inputs.start = $scope.model.format('L');
                  break;
              }

              $scope.inputs.placeholder = "";
            }
          };

          function _setInputFocus(input){
            var elementFocused = elem[0].querySelector('#' + input);
            _ignorePrepare = true;
            elementFocused.focus();
           
          }

          //range mode -> randeDone obj controls if both date has been updated or only the first one.
          function _fillRangeModel(day) {
            if(_startSelected){

              $scope.inputs.start = day.format('L') ;
              $scope.model.startDate = day;
              $scope.model.rangeDone = false;

              if(day.isAfter($scope.model.endDate)){
                  $scope.inputs.end = day.format('L') ;
                  $scope.model.endDate = day;      
              }

              _setInputFocus('endDate');
            }
            else if(_endSelected){

              if(day.isBefore($scope.model.startDate)){
                  $scope.inputs.start = day.format('L') ;
                  $scope.model.startDate = day;
                  $scope.model.rangeDone = false;

                  _setInputFocus('endDate');
              }
              else{
                $scope.inputs.end = day.format('L') ;
                $scope.model.endDate = day;
                $scope.shouldShowCalendar = false;

                $scope.model.rangeDone = true;
              }
            }

          };

            $scope.moveMonth = function(step) {
              let start = angular.copy($scope.options.start);
              $scope.options.start = start.add(step, 'month');
              _prepare();
            };

            function _pushIntoModelSorted(day){

              $scope.model.push(day);

              $scope.model.sort((a ,b) => {
                if(a.isBefore(b))
                  return -1;

                if(a.isAfter(b))
                  return 1

                return 0;
              });
            };

            function _select(day) {
              var ix;
              if (!day.disabled) {
                switch ($scope.options.mode) {
                  case "multiple":
                    if (day.selected) {
                      ix = _indexOfMoment($scope.model, day.date);
                      $scope.model.splice(ix, 1);
                    } else {
                      _pushIntoModelSorted(day.date);
                    }
                    $scope.inputs.start = _fillMultipleDatesInput();
                    break;
                  case 'range':
                    _fillRangeModel(day.date);
                    break;
                  default:
                    $scope.model = day.date;
                    $scope.inputs.start = day.date.format('L');
                    break;
                }
                if ($scope.options.callback) {
                  $scope.options.callback(day.date);
                }

                _prepareDayLayout(day.date, _isSelecting);
              }
            };

            function _checkMonthsLoaded(){

              let currentMonth = $scope.months[0].weeks[3][0].date.month();
              let currentYear = $scope.months[0].weeks[3][0].date.year();
              let monthStart = $scope.options.start.month();
              let yearStart = $scope.options.start.year();

              if(currentMonth == monthStart && currentYear == yearStart)
                return true;

              return false;
            }

            function _checkEarliestDateMultiple(){
              let earlier = moment();
              $scope.model.forEach((d) => {
                if(d.isSameOrBefore(earlier))
                  earlier = d;
              });

              return earlier;
            }

            function _defineStartDate(elemId){
              var isSameMonth;
              var currentMonth = moment().month();
              var currentYear = moment().year();
              var nextMonth = currentMonth + 1;

              if($scope.options.mode === 'range')
                isSameMonth = $scope.model.startDate.month() == $scope.model.endDate.month() && $scope.model.startDate.year() == $scope.model.endDate.year() ? true : false;
              else
                isSameMonth = false;

              if(elemId == 'fromDate'){
                _startSelected = true;
                _endSelected = false;
              }
              else{
                _startSelected = false;
                _endSelected = true;
              }

              if(elemId == 'fromDate'){
                let start;
                let step = 0;

                switch ($scope.options.mode) {
                  case 'multiple':
                    start = _checkEarliestDateMultiple();
                    break;
                  case 'range':
                    start = angular.copy($scope.model.startDate);
                    
                    //if startDate month is == nexMonth does not move calendar 
                    if(((start.month() > currentMonth && start.year() >= currentYear) || (start.year() > currentYear)) && isSameMonth)
                      step = -1;
                    break;
                  default:
                    start = angular.copy($scope.model);
                    break;
                }

                $scope.options.start = start.add(step, 'months');
              }
              else{
                let start = angular.copy($scope.model.endDate);

                // if endDate month is < nextMonth.....start at selected month
                var step = -1;
                if(((start.month() < nextMonth && start.year() <= currentYear) || (start.year() < currentYear)) && isSameMonth)
                  step = 0;
                
                $scope.options.start = start.add(step, 'months');
              }

            }

            $scope.onEnterinputs = function(event){
              var dateInput = event.target || event.srcElement;
              _defineStartDate(dateInput.id);
              if(!_ignorePrepare && !_checkMonthsLoaded()){
                  _prepare();
              }

              var elementFocused = elem[0].querySelector('#' + dateInput.id);

              $timeout(() => { //Safari workaround to selectionRange
                elementFocused.setSelectionRange(0, 999);
              }, 1);

              $scope.shouldShowCalendar = true;
              _ignorePrepare = false;
            }

            function _fillMultipleDatesInput(){
              let dates = [];
              $scope.model.forEach( (d) => {
                dates.push(d.format('L'));
              });

              return dates.join(',');
            }

            $scope.onBlurinputs = function(event){

              //if user is selecting day on calendar, doesnt need verify anything
              if(_isSelecting)
                return;

              var dateInput = event.target || event.srcElement;

              var element = elem[0].querySelector('#' + dateInput.id);

              var dateInputed = moment(element.value, 'L', true);

              if(dateInputed == null || !dateInputed.isValid()){
                if(dateInput.id === 'fromDate'){
                  switch($scope.options.mode) {
                    case 'multiple':
                      $scope.inputs.start= _fillMultipleDatesInput();
                      break;
                    case 'range':
                      $scope.inputs.start = $scope.model.startDate.format('L');
                      break;
                    default:
                      $scope.inputs.start = $scope.model.format('L');
                      break;
                  }
                  
                }else if(dateInput.id === 'endDate'){
                  $scope.inputs.end = $scope.model.endDate.format('L');
                }
              }

            }

             // Trap Div will hide calendar, and automatically fire events: focus & click from element at position X,Y where user clicked
             // This is a workaround to prevent user to click 2 times ( 1 to close trapDiv and 1 to open wanted element)
             $scope.clickTrapDiv = function(e){

               $scope.shouldShowCalendar = false;

               var trapDiv = elem[0].querySelector('#trapDiv');
               trapDiv.style.display = 'none';

              if($scope.options.mode == 'range' && !$scope.model.rangeDone)
                $scope.model.rangeDone = true;
               
               var elemClicked = document.elementFromPoint(e.clientX, e.clientY);
               
               trapDiv.style.display = 'block';
               elemClicked.focus();
               elemClicked.click();
             }

             $scope.onKeyDown = function(e){
               // Allow DEL and Backspace and Arrows
               if(isNaN(e.key) && (e.keyCode !== 8 && e.keyCode !== 46 && e.keyCode !== 37 && e.keyCode !== 39)){
                 e.preventDefault();
               }
             }

             $scope.onKeyUp = function(e){

               var elementId = e.target.id;
               var element = elem[0].querySelector('#' + elementId);
               var val = element.value;

               // Allow DEL and Backspace and Arrows
               if(e.keyCode == 8 || e.keyCode == 46 || e.keyCode == 37 || e.keyCode == 39){
                 return;
               }

               if (val.match(/^\d{2}$/) !== null) {
                 element.value = val + '/';
               } else if (val.match(/^\d{2}\/\d{2}$/) !== null) {
                 element.value = val + '/';
               }

               // Only set datesRange back to parent when data is completed and validated
              if(element.value.length ==10 && moment(element.value , 'L', true).isValid()){

                 var newDate = moment(element.value, 'L', true);
                 var obj = { date: newDate};
                 _isSelecting = true;
                
                _select(obj);
                _defineStartDate(elementId);

                if(!_checkMonthsLoaded()){
                  _prepare();
                }
                else{
                  _prepareDayLayout();
                }

                _isSelecting = false;

              }
              
             }

            function _initCalendar(){

              var startDate = moment();
              var endDate = moment();

              switch ($scope.options.mode) {
                case 'multiple':
                  if(!$scope.model || !$scope.model.length){
                    $scope.model = [];
                    $scope.model.push(startDate);
                  }

                  $scope.inputs.start = _fillMultipleDatesInput();
                  break;
                case 'range':
                  
                  if(!$scope.model.startDate)
                    $scope.model.startDate = startDate;

                  if(!$scope.model.endDate)
                    $scope.model.endDate = endDate;

                  $scope.inputs.start = $scope.model.startDate.format('L');
                  $scope.inputs.end = $scope.model.endDate.format('L');
                  break;
                default:
                  if(!$scope.model)
                    $scope.model = startDate;

                  $scope.inputs.start = $scope.model.format('L');
                  break;
              }
            }

      $scope.select = _select;
      _initCalendar();
      _setup();
      _build();
   
    }
  };
}
