import controller from './customDatePicker.controller';

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
   // controller: controller.UID,
    //controllerAs: "vm",
    //bindToController: true,
    replace:true,
    link: ($scope, elem, attr, ctrl) => {

      var rangeMouseOver, _startSelected, _endSelected, _trapIsActive;
            
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
                 // let isRangeModel = moment.range($scope.model, $scope.before).contains(day) || day.isSame($scope.before, 'day')
                 //                 || moment.range($scope.after, $scope.model).contains(day) || day.isSame($scope.after, 'day');
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
            function _buildWeek(time, month) {
              var days, filter, start;
              days = [];
              filter = true;
              start = time.startOf('week');
              days = [0, 1, 2, 3, 4, 5, 6].map(function(d) {
                var day, withinLimits, withinMonth;
                day = moment(start).add(d, 'days');
                withinMonth = day.month() === month;
                //withinLimits = _withinLimits(day, month);
                if ($scope.options.filter) {
                  filter = $scope.options.filter(day);
                }
                return {
                  date: day,
                  selected: _isSelected(day) && withinMonth,
                  inRange: _isInRange(day),
                  disabled: !(withinMonth && filter), //withinLimits commented
                };
              });
              return days;
            };
           function _buildMonth(time) {
              var calendarEnd, calendarStart, start, w, weeks, weeksInMonth;
              weeks = [];
              calendarStart = moment(time).startOf('month');
              calendarEnd = moment(time).endOf('month');
              weeksInMonth = 5;
              start = time.startOf('month');
              weeks = (function() {
                var _i, _results;
                _results = [];
                for (w = _i = 0; 0 <= weeksInMonth ? _i <= weeksInMonth : _i >= weeksInMonth; w = 0 <= weeksInMonth ? ++_i : --_i) {
                  _results.push(_buildWeek(moment(start).add(w, 'weeks'), moment(start).month()));
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
                default: //simple / range
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

              var monthNumber = parseInt(moment($scope.options.start).format('M'));
              var yearNumber = parseInt(moment($scope.options.start).format('YYYY'));
              var month = $scope.months.filter((x) => {
                if(x.weeks[3][0].date.format('M') == monthNumber )
                  return x;
              })[0];

              if(monthNumber == 12){
                monthNumber = 1;
                yearNumber = yearNumber + 1;
              }
              else
                monthNumber = monthNumber + 1;

              var nextMonth = $scope.months.filter((x) => {
                if(x.weeks[3][0].date.format('M') == monthNumber &&  x.weeks[3][0].date.format('YYYY') == yearNumber)
                  return x;
              })[0];

              $scope.currentMonth = month;
              $scope.nextMonth = nextMonth;

            };

            function _prepare() { console.log('prepare method called ---');
              var m;
              var currentM = parseInt( moment($scope.options.start).format('M'));
              $scope.months = [];
             // return $scope.months = (function() {
                var _i, _ref, _results;
                _results = [];

                  _results.push(_buildMonth(moment($scope.options.start)));
                  _results.push(_buildMonth(moment($scope.options.start).add(1, 'months')));

                $scope.months = (_results);

                _setMonthsToShow();
            };

            function _build() {
              _prepare();
              return _injectPicker();
            };

            $scope.mouseLeaveMonth = function() {
              _prepareDayLayout();
            };

          function _prepareDayLayout(day) {
            if(day)
              rangeMouseOver = day.date;
            else
              rangeMouseOver = null;

            $scope.currentMonth.weeks.forEach((w) => {
              w.forEach((d) => {
                d.inRange = _isInRange(d.date);
                d.selected = _isSelected(d.date);
              });
            });

            $scope.nextMonth.weeks.forEach((w) => {
              w.forEach((d) => {
                d.inRange = _isInRange(d.date);
                d.selected = _isSelected(d.date);
              });
            });

          };

          function _fillModel(day) {

            if(_startSelected){

              $scope.inputDateFrom = day.format('L') ;
              $scope.model.startDate = day;

              if(day.isAfter($scope.model.endDate)){
                $scope.inputDateEnd = day.format('L') ;
                $scope.model.endDate = day;
              }

              var obj = {target: { id: 'endDate'}, ignorePrepare: true}
              _onEnterinputs(obj);
            }
            else if(_endSelected){
              $scope.inputDateEnd = day.format('L') ;
              $scope.model.endDate = day;

              if(day.isBefore($scope.model.startDate)){
                $scope.inputDateFrom = day.format('L') ;
                $scope.model.startDate = day;
              }

              var obj = {target: { id: 'fromDate'}, ignorePrepare: true}
              _onEnterinputs(obj);
            }
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
                return _prepareDayLayout(day);
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

            function  _onEnterinputs(event){
              var dateInput = event.target || event.srcElement;

              if(dateInput.id == 'fromDate'){
                _startSelected = true;
                _endSelected = false;
                let start = angular.copy($scope.model.startDate);
                $scope.options.start = start;
              }
              else{
                _startSelected = false;
                _endSelected = true;
                let start = angular.copy($scope.model.endDate);
                $scope.options.start = start.add(-1, 'months');
              }

              if(!event.ignorePrepare){
                _prepare();
              }

              var elementFocused = elem[0].querySelector('#' + dateInput.id);
             elementFocused.focus();
            $timeout(() => { //Safari workaround to selecttextrange
              elementFocused.setSelectionRange(0, 999);
            }, 1);


            // elementFocused.select();
              $scope.shouldShowCalendar = true;
            }

            $scope.onBlurinputs = function(event){

              var dateInput = event.target || event.srcElement;

              var element = elem[0].querySelector('#' + dateInput.id);

              var dateInputed = moment(element.value, 'L', true);

              if(dateInputed == null || !dateInputed.isValid()){
                if(dateInput.id === 'fromDate'){
                  // elem.value = this.calendarDateFrom.startDate.format('L');
                  elem.value = $scope.model.startDate.format('L');
                }else if(dateInput.id === 'endDate'){
                  // elem.value = this.calendarDateFrom.endDate.format('L');
                  elem.value = $scope.model.endDate.format('L');
                }
              }

            }

             // Trap Div will hide calendar, and automatically fire events: focus & click from element at position X,Y where user clicked
             // This is a workaround to prevent user to click 2 times ( 1 to close trapDiv and 1 to open wanted element)
             $scope.clickTrapDiv = function(e){

              // var divRoot = this.scope.getDirectiveElement()[0];

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

              // var divRoot = this.scope.getDirectiveElement()[0];

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

      $scope.onEnterinputs = _onEnterinputs;
      $scope.checkDayRange = _prepareDayLayout;
      _initCalendar();
      _setup();
      _build();
   
    }
  };
}
