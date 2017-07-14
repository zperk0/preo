export default function datePicker($timeout, $window, $compile){
  "ngInject";

  var options, pickerTemplate;
  //pickerTemplate = "<div class=\"mighty-picker__wrapper\">\n  <button type=\"button\" class=\"mighty-picker__prev-month\"\n    ng-click=\"moveMonth(-1)\">\n    <<\n  </button>\n  <div class=\"mighty-picker__month\"\n    bindonce ng-repeat=\"month in months track by $index\">\n    <div class=\"mighty-picker__month-name\" ng-bind=\"month.name\"></div>\n    <table class=\"mighty-picker-calendar\">\n      <tr class=\"mighty-picker-calendar__days\">\n        <th bindonce ng-repeat=\"day in month.weeks[1]\"\n          class=\"mighty-picker-calendar__weekday\"\n          bo-text=\"day.date.format('dd')\">\n        </th>\n      </tr>\n      <tr bindonce ng-repeat=\"week in month.weeks\">\n        <td\n            bo-class='{\n              \"mighty-picker-calendar__day\": day,\n              \"mighty-picker-calendar__day--selected\": day.selected,\n              \"mighty-picker-calendar__day--disabled\": day.disabled,\n              \"mighty-picker-calendar__day--in-range\": day.inRange,\n              \"mighty-picker-calendar__day--marked\": day.marker\n            }'\n            ng-repeat=\"day in week track by $index\" ng-click=\"select(day)\">\n            <div class=\"mighty-picker-calendar__day-wrapper\"\n              bo-text=\"day.date.date()\"></div>\n            <div class=\"mighty-picker-calendar__day-marker-wrapper\">\n              <div class=\"mighty-picker-calendar__day-marker\"\n                ng-if=\"day.marker\"\n                ng-bind-template=\"\">\n              </div>\n            </div>\n        </td>\n      </tr>\n    </table>\n  </div>\n  <button type=\"button\" class=\"mighty-picker__next-month\"\n    ng-click=\"moveMonth(1)\">\n    >>\n  </button>\n</div>";
  options = {
    mode: "simple",
    months: 1,
    start: null,
    filter: void 0,
    callback: void 0,
    markerTemplate: "{{ day.marker }}",
   // template: pickerTemplate
  };
  return {
    restrict: 'AE',
    scope: {
      model: '=ngModel',
      options: '=',
      markers: '=',
     // after: '=',
     // before: '=',
    //  rangeFrom: '=',
    //  rangeTo: '='
    },
    template: require("./datePicker.tpl.html"),
    replace:true,
    link: ($scope, $element, $attrs) => {

      var _bake, _build, _buildMonth, _buildWeek, _getMarker, _fillModel, _prepareDayLayout, _indexMarkers, _indexOfMoment, _isInRange, _checkDayRange, _isSelected, _prepare, _setMonthsToShow, _setup, _withinLimits;
      var rangeMouseOver;
      //_bake = function() {
       // var domEl;
       // domEl = $compile(angular.element($scope.options.template))($scope);
       // return $element.append(domEl);
      //};

      _indexOfMoment = function(array, element, match) {
        var key, value;
        for (key in array) {
          value = array[key];
          if (element.isSame(value, match)) {
            return key;
          }
        }
        return -1;
      };
      _indexMarkers = function() {
        var marker;
        if ($scope.markers) {
          return $scope.markerIndex = (function() {
            var _i, _len, _ref, _results;
            _ref = $scope.markers;
            _results = [];
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              marker = _ref[_i];
              _results.push(marker.day);
            }
            return _results;
          })();
        }
      };
      _withinLimits = function(day, month) {
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
      _getMarker = function(day) {
        var ix;
        ix = _indexOfMoment($scope.markerIndex, day, 'day');
        if (ix > -1) {
          return $scope.markers[ix].marker;
        } else {
          return void 0;
        }
      };
      _isSelected = function(day) {
        switch ($scope.options.mode) {
          case "multiple":
            return _indexOfMoment($scope.model, day, 'day') > -1;
          case "range":
            return $scope.model.startDate && day.isSame($scope.model.startDate, 'day') || $scope.model.endDate && day.isSame($scope.model.endDate, 'day')
          default:
            return $scope.model && day.isSame($scope.model, 'day');
        }
      };
      _isInRange = function(day) {
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
      _buildWeek = function(time, month) {
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
            marker: withinMonth ? _getMarker(day) : void 0
          };
        });
        return days;
      };
      _buildMonth = function(time) {
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
      _setup = function() {
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

        _indexMarkers();
        return $scope.options.template = $scope.options.template.replace('ng-bind-template=""', 'ng-bind-template="' + $scope.options.markerTemplate + '"');
      };

      _setMonthsToShow = function(){

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

      _prepare = function() {
        var m;
        var currentM = parseInt( moment($scope.options.start).format('M'));
        $scope.months = [];
       // return $scope.months = (function() {
          var _i, _ref, _results;
          _results = [];

         // for(m = 1; m <= 11; m++){

          //  if(m + currentM > 12)
          //    break;
            _results.push(_buildMonth(moment($scope.options.start)));
            _results.push(_buildMonth(moment($scope.options.start).add(1, 'months')));
        //  }
        //  for(m = 1; m <= 11; m++){

          //  if(currentM - m < 1)
          //    break;
//_results.push(_buildMonth(moment($scope.options.start).subtract(1, 'months')));
        //  }

          $scope.months = (_results);

          _setMonthsToShow();
         // return _results;
       // })();
      };
      //_build = function() {
      //  _prepare();
      //  return _bake();
     // };

      $scope.mouseLeaveMonth = function() {
        _prepareDayLayout();
      };

      _prepareDayLayout = function(day) {
        console.log('day ---', day);
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

      _fillModel = function(day) {
        if(day.date.isSameOrBefore($scope.model.startDate))
          $scope.model.startDate = day.date;
        else if(day.date.isAfter($scope.model.startDate))
          $scope.model.endDate = day.date;
      };

      $scope.moveMonth = function(step) {
        $scope.options.start.add(step, 'month');
        //_setMonthsToShow();
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
              _fillModel(day);
            //  _checkDayRange(day);
              break;
            default:
              $scope.model = day.date;
          }
          if ($scope.options.callback) {
            $scope.options.callback(day.date);
          }
          return _prepareDayLayout(day); //_prepare();
        }
      };
      $scope.$watchCollection('markers', function(newMarkers, oldMarkers) {
        _indexMarkers();
        _prepare();
      });

      switch ($scope.options.mode) {
        case "multiple":
          $scope.$watchCollection('model', function(newVals, oldVals) {
            _prepare();
          });
          break;
        case "range":
          $scope.$watch('model.startDate', function(newVal, oldVal) {
            if (!moment.isMoment(newVal)) {
              newVal = moment(newVal);
            }
            if (!oldVal || oldVal && !newVal.isSame(oldVal, 'day')) { console.log('watcher start date ------');
              $scope.model.startDate = newVal;
              if (oldVal) {
                $scope.options.start = moment(newVal);
              }
               _prepare();
            }
          });
          $scope.$watch('model.endDate', function(newVal, oldVal) {
            if (!moment.isMoment(newVal)) {
              newVal = moment(newVal);
            }
            if (!oldVal || oldVal && !newVal.isSame(oldVal, 'day')) {
              $scope.model.endDate = newVal;
               _prepare();
            }
          });
          break;
        case "simple":
          $scope.$watch('model', function(newVal, oldVal) {
            if (!moment.isMoment(newVal)) {
              newVal = moment(newVal);
            }
            if (!oldVal || oldVal && !newVal.isSame(oldVal, 'day')) {
              $scope.model = newVal;
              if (oldVal) {
                $scope.options.start = moment(newVal);
              }
               _prepare();
            }
          });
      }
      // $scope.$watch('before', function(newVal, oldVal) {
      //   if (newVal) {
      //     if (!moment.isMoment(newVal)) {
      //       newVal = moment(newVal);
      //     }
      //     if (!newVal.isSame(oldVal, 'day')) {
      //        _prepare();
      //     }
      //   }
      // });
      
      // $scope.$watch('after', function(newVal, oldVal) {
      //   if (newVal) {
      //     if (!moment.isMoment(newVal)) {
      //       newVal = moment(newVal);
      //     }
      //     if (!newVal.isSame(oldVal, 'day')) {
      //        _prepare();
      //     }
      //   }
      // });
      $scope.checkDayRange = _prepareDayLayout;
       _setup();
      // _build();
       _prepare();

    }
  };
}