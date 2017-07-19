//import controller from './customDatePicker.controller';

export default function customDatePicker($compile, $timeout){
  "ngInject";

  var options = {
    mode: "simple",
    months: 1,
    start: null,
    filter: void 0,
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

      var rangeMouseOver, _startSelected, _endSelected, _ignorePrepare, _isSelecting;
            
      function _injectPicker() {
        var domEl;
        domEl = $compile(angular.element(options.template))($scope);
        elem[0].querySelector('#wrapperCalendar').append(domEl[0]);
      };

            function _indexOfMoment (array, element, match) {
              var key, value;
              for (key in array) {
                value = array[key];
                if (element.isSame(value, match)) {
                  return key;
                }
              }
              return -1;
            };
           function _withinLimits (day, month) {
              var withinLimits;
              withinLimits = true;
              if ($scope.before) {
                withinLimits && (withinLimits = day.isSameOrBefore($scope.before, 'day'));
              }
              if ($scope.after) {
                withinLimits && (withinLimits = day.isSameOrAfter($scope.after, 'day'));
              }
              return withinLimits;
            };
            function _isSelected (day) {
              switch ($scope.options.mode) {
                case "multiple":
                  return _indexOfMoment($scope.model, day, 'day') > -1;
                case "range":
                  return $scope.model.startDate && day.isSame($scope.model.startDate, 'day') || $scope.model.endDate && day.isSame($scope.model.endDate, 'day')
                default:
                  return $scope.model && day.isSame($scope.model, 'day');
              }
            };
            function _isInRange(day) {
              if ($scope.options.mode == 'range') {

                  let isRangeModel = moment.range($scope.model.startDate, $scope.model.endDate).contains(day) || day.isSame($scope.model.startDate, 'day')
                                   || day.isSame($scope.model.endDate, 'day');
                  
                  if(!rangeMouseOver)
                    return isRangeModel;

                  let isRangeMouse = moment.range($scope.model.startDate, rangeMouseOver).contains(day) || day.isSame(rangeMouseOver, 'day')
                                  || moment.range($scope.model.endDate, rangeMouseOver).contains(day) || day.isSame(rangeMouseOver, 'day')
                                  || moment.range( rangeMouseOver, $scope.model.endDate).contains(day) 
                                  || moment.range( rangeMouseOver, $scope.model.startDate).contains(day) ;

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
              weeksInMonth = 4;
              start = time.startOf('month');
              weeks = (function() {
                var _results = [];
                for(var i = 0; i <= weeksInMonth; i++){
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
                  if ($scope.model && Array.isArray($scope.model) && $scope.model.length > 0) {
                    if ($scope.model.length === 1) {
                      start = moment($scope.model[0]);
                    } else {
                      dates = $scope.model.slice(0);
                      start = moment(dates.sort().slice(-1)[0]);
                    }
                  } else {
                    $scope.model = [];
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

           function _setMonthsToShow(){

              var monthNumber = moment($scope.options.start).month();
              var yearNumber =  moment($scope.options.start). year();
              var month = $scope.months.filter((x) => {
                if(x.weeks[3][0].date.month() == monthNumber )
                  return x;
              })[0];
console.log('mont hh ->>> ', monthNumber, yearNumber);
              if(monthNumber == 11){
                monthNumber = 0;
                yearNumber = yearNumber + 1;
              }
              else
                monthNumber = monthNumber + 1;

              var nextMonth = $scope.months.filter((x) => {
                if(x.weeks[3][0].date.month() == monthNumber &&  x.weeks[3][0].date.year() == yearNumber)
                  return x;
              })[0];

              $scope.currentMonth = month;
              $scope.nextMonth = nextMonth;

            };

            function _prepare() { console.log('prepare method called ---');

              $scope.months = [];

              var _results = [];

              var monthsToLoad = 2;

              for(var i=0; i < monthsToLoad; i++){
                _results.push(_buildMonth(moment($scope.options.start).add(i, 'months')));
              }

              $scope.months = (_results);

              _setMonthsToShow();
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
              _prepareDayLayout(day);
            }

          function _prepareDayLayout(day, isSelecting) {
            if(day)
              rangeMouseOver = day.date;
            else
              rangeMouseOver = null;

            let month = $scope.currentMonth.weeks[3][0].date.month();
            $scope.currentMonth.weeks.forEach((w) => {
              w.forEach((d) => {
                _setDayProperties(d, month);
              });
            });

            month = $scope.nextMonth.weeks[3][0].date.month();
            $scope.nextMonth.weeks.forEach((w) => {
              w.forEach((d) => {
                _setDayProperties(d, month);
              });
            });

            //does not execute placeholder part if is selecting day
            if(isSelecting){
              $scope.dayOnMouseOver = "";
              return;
            }

            if(day){
              if(_startSelected)
                $scope.inputDateFrom = "";
              if(_endSelected)
                $scope.inputDateEnd = "";

              $scope.dayOnMouseOver = day.date.format('L');
            }
            else{ 
              //if(_startSelected)
                $scope.inputDateFrom = $scope.model.startDate.format('L');
             // if(_endSelected)
                $scope.inputDateEnd = $scope.model.endDate.format('L') ;

              $scope.dayOnMouseOver = "";
            }
          };

          function _fillModel(day) {

            if(_startSelected){

              $scope.inputDateFrom = day.format('L') ;
              $scope.model.startDate = day;

              if(day.isAfter($scope.model.endDate)){
                $scope.inputDateEnd = day.format('L') ;
                $scope.model.endDate = day;
              }

              var obj = 'endDate';
            }
            else if(_endSelected){
              $scope.inputDateEnd = day.format('L') ;
              $scope.model.endDate = day;

              if(day.isBefore($scope.model.startDate)){
                $scope.inputDateFrom = day.format('L') ;
                $scope.model.startDate = day;
              }

              var obj = 'fromDate';
            }

            var elementFocused = elem[0].querySelector('#' + obj);
            _ignorePrepare = true;
            elementFocused.focus();
          };

            $scope.moveMonth = function(step) {
              $scope.options.start.add(step, 'month');
              _prepare();
            };

            $scope.select = function(day) {
              var ix;
              if (!day.disabled) {
                switch ($scope.options.mode) {
                  case "multiple":
                    if (day.selected) {
                      ix = _indexOfMoment($scope.model, day.date, 'day');
                      $scope.model.splice(ix, 1);
                    } else {
                      $scope.model.push(moment(day.date));
                    }
                    break;
                  case 'range':
                    _fillModel(day.date);
                    break;
                  default:
                    $scope.model = day.date;
                }
                if ($scope.options.callback) {
                  $scope.options.callback(day.date);
                }

                _prepareDayLayout(day, _isSelecting);
              }
            };

            switch ($scope.options.mode) {
              case "multiple":
                // $scope.$watchCollection('model', function(newVals, oldVals) {
                //   _prepare();
                // });
                break;
              case "range":
                // $scope.$watch('model.startDate', function(newVal, oldVal) {
                //   if (!moment.isMoment(newVal)) {
                //     newVal = moment(newVal);
                //   }
                //   if (!oldVal || oldVal && !newVal.isSame(oldVal, 'day')) { console.log('watcher start date ------');
                //     $scope.model.startDate = newVal;
                //     if (oldVal) {
                //       $scope.options.start = moment(newVal);
                //     }
                //      _prepare();
                //   }
                // });
                // $scope.$watch('model.endDate', function(newVal, oldVal) { console.log('watcher end date ----------');
                //   if (!moment.isMoment(newVal)) {
                //     newVal = moment(newVal);
                //   }
                //   if (!oldVal || oldVal && !newVal.isSame(oldVal, 'day')) {
                //     $scope.model.endDate = newVal;
                //      _prepare();
                //   }
                // });
                break;
              case "simple":
                // $scope.$watch('model', function(newVal, oldVal) {
                //   if (!moment.isMoment(newVal)) {
                //     newVal = moment(newVal);
                //   }
                //   if (!oldVal || oldVal && !newVal.isSame(oldVal, 'day')) {
                //     $scope.model = newVal;
                //     if (oldVal) {
                //       $scope.options.start = moment(newVal);
                //     }
                //      _prepare();
                //   }
                // });
                break;
            }

            function _checkMonthsLoaded(){

              let currentMonth = $scope.currentMonth.weeks[3][0].date.format('M');
              let monthStart = $scope.options.start.format('M');

              if(currentMonth == monthStart)
                return true;

              return false;
            }

            function _defineStartDate(elemId){
              var isSameMonth = $scope.model.startDate.month() == $scope.model.endDate.month() ? true : false;
              var currentMonth = moment().month();
              var nextMonth = currentMonth + 1;

              if(elemId == 'fromDate'){
                _startSelected = true;
                _endSelected = false;
              }
              else{
                _startSelected = false;
                _endSelected = true;
              }

              if(elemId == 'fromDate'){
                let start = angular.copy($scope.model.startDate);
                
                //if startDate month is == nexMonth does not move calendar 
                var step = 0;
                if(($scope.model.startDate.month() == nextMonth) && isSameMonth)
                  step = -1;

                $scope.options.start = start.add(step, 'months');
              }
              else{
                let start = angular.copy($scope.model.endDate);

                // if endDate month is < nextMonth.....start at selected month
                var step = -1;
                if($scope.model.endDate.month() < nextMonth && isSameMonth)
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

            $scope.onBlurinputs = function(event){ console.log('blurrrrr');

              //if user is selecting day on calendar, doesnt need verify anything
              if(_isSelecting)
                return;

              var dateInput = event.target || event.srcElement;

              var element = elem[0].querySelector('#' + dateInput.id);

              var dateInputed = moment(element.value, 'L', true);

              if(dateInputed == null || !dateInputed.isValid()){
                if(dateInput.id === 'fromDate'){
                  element.value = $scope.model.startDate.format('L');
                }else if(dateInput.id === 'endDate'){
                  element.value = $scope.model.endDate.format('L');
                }
              }

            }

             // Trap Div will hide calendar, and automatically fire events: focus & click from element at position X,Y where user clicked
             // This is a workaround to prevent user to click 2 times ( 1 to close trapDiv and 1 to open wanted element)
             $scope.clickTrapDiv = function(e){

               $scope.shouldShowCalendar = false;

               var trapDiv = elem[0].querySelector('#trapDiv');
               trapDiv.style.display = 'none';
               
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

                 var newDate = moment(element.value, 'L', true).format();

                 if(elementId === 'fromDate'){
                   $scope.model.startDate = moment(newDate);

                   if($scope.model.startDate.isAfter($scope.model.endDate)){
                    $scope.inputDateEnd = element.value ;
                    $scope.model.endDate = moment(newDate);
                   }
                 }else if(elementId === 'endDate'){
                   $scope.model.endDate = moment(newDate);

                   if($scope.model.endDate.isBefore($scope.model.startDate)){
                     $scope.inputDateFrom = element.value ;
                     $scope.model.startDate = moment(newDate);
                   }
                 }

                 _defineStartDate(elementId);
                 if(!_checkMonthsLoaded())
                  _prepare();
               }

             }

            function _initCalendar(){

              var startDate = moment();
              var endDate = moment();

              if(!$scope.model.startDate)
                $scope.model.startDate = startDate;

              if($scope.options.mode == 'range' && !$scope.model.endDate)
                $scope.model.endDate = endDate;

              $scope.inputDateFrom = $scope.model.startDate.format('L');

              if($scope.options.mode == 'range')
              $scope.inputDateEnd = $scope.model.endDate.format('L');
            }

      //$scope.onMouseOverDay = _prepareDayLayout;
      _initCalendar();
      _setup();
      _build();
   
    }
  };
}
