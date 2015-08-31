angular.module('events')
  .constant('preoCalendarConfig', {
    formatDay: 'EEE d',
    formatMonth: 'MMMM',
    formatYear: 'yyyy',
    formatDayHeader: 'EEE',
    formatDayTitle: 'MMMM',
    formatMonthTitle: 'yyyy',
    datepickerMode: 'day',
    minMode: 'day',
    maxMode: 'year',
    showWeeks: false,
    showDays: false,
    startingDay: 1,
    yearRange: 20,
    minDate: null,
    maxDate: null
  })
  .controller('PreoCalendarController', ['$scope', '$attrs', '$parse', '$interpolate', '$timeout', '$log', 'dateFilter', 'preoCalendarConfig', 'DateUtils', function($scope, $attrs, $parse, $interpolate, $timeout, $log, dateFilter, preoCalendarConfig, DateUtils) {
    var self = this;
    self.dateObjectModel = {};

    // Modes chain
    this.modes = ['day', 'month', 'year'];
    this.selectedDays = [];
    this.frequency = '';

    // Configuration attributes
    angular.forEach(['formatDay', 'formatMonth', 'formatYear', 'formatDayHeader', 'formatDayTitle', 'formatMonthTitle',
      'minMode', 'maxMode', 'showDays', 'showWeeks', 'startingDay', 'yearRange'], function( key, index ) {
      self[key] = angular.isDefined($attrs[key]) ? (index < 8 ? $interpolate($attrs[key])($scope.$parent) : $scope.$parent.$eval($attrs[key])) : preoCalendarConfig[key];
    });

    // Watchable date attributes
    angular.forEach(['minDate', 'maxDate'], function( key ) {
      if ( $attrs[key] ) {
        $scope.$parent.$watch($parse($attrs[key]), function(value) {
          self[key] = value ? new Date(value) : null;
          self.refreshView();
        });
      } else {
        self[key] = preoCalendarConfig[key] ? new Date(preoCalendarConfig[key]) : null;
      }
    });

    $scope.datepickerMode = $scope.datepickerMode || preoCalendarConfig.datepickerMode;
    $scope.uniqueId = 'datepicker-' + $scope.$id + '-' + Math.floor(Math.random() * 10000);
    this.activeDate = angular.isDefined($attrs.initDate) ? $scope.$parent.$eval($attrs.initDate) : new Date();
    this.isFirstRun = true;

    $scope.$watch('schedules.startDate', function(newValue, oldValue) {

      // first time with endDate defined (edit mode)
      if(!oldValue)
        $scope.schedules.endDate = '';
      else
        $scope.selectedDays = [];

      if(newValue != '' && newValue)
        $scope.select(newValue, oldValue);

      self.updateFrequency($scope.schedules.freq);
    });

    $scope.$watch('schedules.endDate', function(newValue, oldValue) {

      if(newValue != '' && newValue) {

        self.updateFrequency($scope.schedules.freq);
      }
    });

    $scope.$watch('schedules.freq', function(newValue, oldValue) {

      if(oldValue == 'CUSTOM' && newValue != oldValue) {

        $scope.selectedDays = [];
        $scope.schedules.startDate = '';
        $scope.schedules.endDate = '';
      }

      self.frequency = newValue;

      self.updateFrequency($scope.schedules.freq);
    });

    // change active date (controls current month)
    $scope.$watch('ngModel', function(newValue, oldValue) {

      // console.log('Changed ng model.');

      if((newValue != '' && newValue) && (newValue != self.activeDate)) {
        console.log('select day from changing model')
        $scope.select({
          activeDate: newValue
        });
      }
    });

    this.updateFrequency = function(freq) {

      // console.log('update frequency...', freq);
      // console.log('start date...', $scope.schedules.startDate);

      if($scope.schedules.startDate && $scope.schedules.startDate != '') {

        var start = DateUtils.getDateObj($scope.schedules.startDate),
            end = DateUtils.getDateObj($scope.schedules.endDate),
            totalDays = DateUtils.daysBetween(start, end);

        // keep the first occurency
        if($scope.selectedDays.length > 0)
          $scope.selectedDays = [$scope.selectedDays[0]];

        switch(freq) {
          case 'ONCE':

            var date = DateUtils.getDateObj($scope.schedules.startDate);
            date.setDate(date.getDate() + 1);
            $scope.schedules.endDate = DateUtils.getStrDate(date);
          break;
          case 'DAILY':

            for(var i = 1; i <= totalDays; i++) {

              var date = DateUtils.addDays(start, i);
              $scope.selectedDays.push(date);
            }
          break;
          case 'WEEKLY':

            var lastDate = start,
                oneWeek = 1000 * 60 * 60 * 24 * 7,
                summertimeDiff = 1000 * 60 * 60;

            while((lastDate.getTime() + oneWeek) <= end.getTime() +  summertimeDiff) {

              lastDate = DateUtils.addDays(lastDate, 7);
              $scope.selectedDays.push(lastDate);
            }

          break;
          case 'MONTHLY':

            var lastDate = start,
                summertimeDiff = 1000 * 60 * 60;

            do {

              lastDate.setMonth(lastDate.getMonth() + 1);
              if(lastDate.getTime() <= end.getTime())
                $scope.selectedDays.push(new Date(lastDate));

            } while(lastDate.getTime() <= end.getTime() + summertimeDiff);

          break;
          case 'YEARLY':

            var lastDate = start;

            while((lastDate.getFullYear() + 1) <= end.getFullYear()) {

              lastDate.setFullYear(lastDate.getFullYear() + 1);
              if(lastDate.getTime() <= end.getTime())
                $scope.selectedDays.push(new Date(lastDate));
            }

          break;
          case 'CUSTOM':
            $scope.schedules.startDate = '';
            $scope.schedules.endDate = '';

            $scope.selectedDays = [];
          break;
        }

      }
      else {
        // first run
        if($scope.schedules.freq != 'CUSTOM') {

          if($scope.selectedDays.length > 0)
            $scope.selectedDays = [$scope.selectedDays[0]];
          else
            $scope.selectedDays = [];
        }
      }

      // refresh view
      self.refreshView();
    }

    $scope.isActive = function(dateObject) {
      if (self.compare(dateObject.date, self.activeDate) === 0) {
        $scope.activeDateId = dateObject.uid;
        return true;
      }
      return false;
    };

    this.refreshView = function() {
      if ( this.element ) {
        this._refreshView();
      }
    };

    this.createDateObject = function(date, format) {
      var selected = this.isSelected(date);

      date.setHours(0);
      date.setMinutes(0);
      date.setSeconds(0);

      return {
        date: date,
        label: dateFilter(date, format),
        isCurrentMonth: this.isCurrentMonth(date),
        selected: selected,
        disabled: this.isDisabled(date),
        current: this.compare(date, new Date()) === 0
      };
    };

    this.isDisabled = function( date ) {
      return ((this.minDate && this.compare(date, this.minDate) < 0) || (this.maxDate && this.compare(date, this.maxDate) > 0) || ($attrs.dateDisabled && $scope.dateDisabled({date: date, mode: $scope.datepickerMode})));
    };

    // Split array into smaller arrays
    this.split = function(arr, size) {
      var arrays = [];
      while (arr.length > 0) {
        arrays.push(arr.splice(0, size));
      }
      return arrays;
    };

    $scope.select = function( dateObject, oldDate ) {

      // console.trace('select date...', dateObject, oldDate)

      var date, dt = new Date(0, 0, 0, 0, 0, 0, 0), removing = false;

      if ( $scope.datepickerMode === self.minMode ) {

        if(typeof dateObject == 'object') {

          date = dateObject.activeDate ? dateObject.activeDate : dateObject.date ? dateObject.date : dateObject;
          // date = dateObject.date ? dateObject.date : dateObject;
          dt.setFullYear(date.getFullYear(), date.getMonth(), date.getDate());
          self.activeDate = date;
          $scope.ngModel = self.activeDate;

          // don't push dates from active date control
          if($scope.schedules.freq == 'CUSTOM' && !dateObject.hasOwnProperty('activeDate')) {

            $scope.selectedDays.some(function(elem, index) {

              if(dt.getTime() == elem.getTime()) {

                $scope.selectedDays.splice(index, 1);
                removing = true;
              }

              return removing;
            });

            if(!removing)
              $scope.selectedDays.push(dt);
          }

        }

        // input from user (start and end)
        else if(typeof dateObject == 'string') {

          date = DateUtils.getDateObj(dateObject);
          dt.setFullYear(date.getFullYear(), date.getMonth(), date.getDate());

          // remove old date
          if(oldDate) {

            var strOldDt = oldDate.split('/');
            var oldDtObj = new Date(strOldDt[2], strOldDt[1] - 1, strOldDt[0]);

            $scope.selectedDays.some(function(elem, index) {
              if(elem.getTime() == oldDtObj.getTime()) {
                $scope.selectedDays.splice(index, 1);
                return true;
              }
            });
          }

          $scope.selectedDays.push(dt);
        }

        // refresh view
        self.refreshView();
      } else {

        self.activeDate = date;
        $scope.datepickerMode = self.modes[ self.modes.indexOf( $scope.datepickerMode ) - 1 ];
      }

      // console.log('result from selecting: selected days',$scope.selectedDays);
    };

    $scope.move = function( direction ) {
      var year = self.activeDate.getFullYear() + direction * (self.step.years || 0),
        month = self.activeDate.getMonth() + direction * (self.step.months || 0);
      self.activeDate.setFullYear(year, month, 1);
      $scope.ngModel = self.activeDate;
      self.refreshView();
    };

    $scope.$on('$move', function (event, data) {
      $scope.move(data.direction);
    })

    $scope.toggleMode = function( direction ) {
      direction = direction || 1;

      if (($scope.datepickerMode === self.maxMode && direction === 1) || ($scope.datepickerMode === self.minMode && direction === -1)) {
        return;
      }

      $scope.datepickerMode = self.modes[ self.modes.indexOf( $scope.datepickerMode ) + direction ];
    };

    // Key event mapper
    $scope.keys = { 13:'enter', 32:'space', 33:'pageup', 34:'pagedown', 35:'end', 36:'home', 37:'left', 38:'up', 39:'right', 40:'down' };

    var focusElement = function() {
      $timeout(function() {
        self.element[0].focus();
      }, 0 , false);
    };

    // Listen for focus requests from popup directive
    $scope.$on('datepicker.focus', focusElement);

    $scope.keydown = function( evt ) {
      var key = $scope.keys[evt.which];

      if ( !key || evt.shiftKey || evt.altKey ) {
        return;
      }

      evt.preventDefault();
      evt.stopPropagation();

      if (key === 'enter' || key === 'space') {
        if ( self.isDisabled(self.activeDate)) {
          return; // do nothing
        }
        $scope.select(self.activeDate);
        focusElement();
      } else if (evt.ctrlKey && (key === 'up' || key === 'down')) {
        $scope.toggleMode(key === 'up' ? 1 : -1);
        focusElement();
      } else {
        self.handleKeyDown(key, evt);
        self.refreshView();
      }
    };
  }])

  .directive('preoCalendarBind', ['dateFilter', function (dateFilter) {
    return {
      restrict: 'A',
      replace: true,
      require: '^preoCalendar',
      link: function(scope, element, attrs, ctrl) {
        scope.showWeeks = ctrl.showWeeks;
        scope.showDays = ctrl.showDays;

        ctrl.step = { months: 1 };
        ctrl.element = element;

        var DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        function getDaysInMonth( year, month ) {
          return ((month === 1) && (year % 4 === 0) && ((year % 100 !== 0) || (year % 400 === 0))) ? 29 : DAYS_IN_MONTH[month];
        }

        function getDates(startDate, n) {
          var dates = new Array(n), current = new Date(startDate), i = 0;
          current.setHours(12); // Prevent repeated dates because of timezone bug
          while ( i < n ) {
            dates[i++] = new Date(current);
            current.setDate( current.getDate() + 1 );
          }
          return dates;
        }

        ctrl._refreshView = function() {
          var year = ctrl.activeDate.getFullYear(),
            month = ctrl.activeDate.getMonth(),
            firstDayOfMonth = new Date(year, month, 1),
            difference = ctrl.startingDay - firstDayOfMonth.getDay(),
            numDisplayedFromPreviousMonth = (difference > 0) ? 7 - difference : - difference,
            firstDate = new Date(firstDayOfMonth);

          if ( numDisplayedFromPreviousMonth > 0 ) {
            firstDate.setDate( - numDisplayedFromPreviousMonth + 1 );
          }

          var numbersOfDays = 42;
          if (scope.attrRows) {
            numbersOfDays = +scope.attrRows * 7;
          }
          // 42 is the number of days on a six-month calendar
          var days = getDates(firstDate, numbersOfDays);
          for (var i = 0; i < numbersOfDays; i ++) {
            days[i] = angular.extend(ctrl.createDateObject(days[i], ctrl.formatDay), {
              secondary: days[i].getMonth() !== month,
              uid: scope.uniqueId + '-' + i
            });
          }

          scope.labels = new Array(7);
          for (var j = 0; j < 7; j++) {
            scope.labels[j] = {
              abbr: dateFilter(days[j].date, ctrl.formatDayHeader),
              full: dateFilter(days[j].date, 'EEEE')
            };
          }

          scope.rows = ctrl.split(days, 7);

          if ( scope.showWeeks ) {
            scope.weekNumbers = [];
            var weekNumber = getISO8601WeekNumber( scope.rows[0][0].date ),
              numWeeks = scope.rows.length;
            while( scope.weekNumbers.push(weekNumber++) < numWeeks ) {}
          }
        };

        ctrl.compare = function(date1, date2) {
          return (new Date( date1.getFullYear(), date1.getMonth(), date1.getDate() ) - new Date( date2.getFullYear(), date2.getMonth(), date2.getDate() ) );
        };

        ctrl.isSelected = function(date1) {

          var dateOne = new Date( date1.getFullYear(), date1.getMonth(), date1.getDate() );
          var isSelected = false;

          scope.selectedDays.forEach(function(elem, index) {

            var dateTwo = new Date( elem.getFullYear(), elem.getMonth(), elem.getDate() );
            if(dateOne.getTime() === dateTwo.getTime()) {

              isSelected = true;
              return true;
            }
          });

          return isSelected;
        };

        ctrl.isCurrentMonth = function(date1) {
          var newDateOne = (new Date( date1.getFullYear(), date1.getMonth(), date1.getDate() )).getTime();
          var yearDate = date1.getFullYear();
          var monthDate = date1.getMonth();

          var yearCurrentDate = ctrl.activeDate.getFullYear();
          var monthCurrentDate = ctrl.activeDate.getMonth();

          return yearDate === yearCurrentDate && monthDate === monthCurrentDate;
        };

        function getISO8601WeekNumber(date) {
          var checkDate = new Date(date);
          checkDate.setDate(checkDate.getDate() + 4 - (checkDate.getDay() || 7)); // Thursday
          var time = checkDate.getTime();
          checkDate.setMonth(0); // Compare with Jan 1
          checkDate.setDate(1);
          return Math.floor(Math.round((time - checkDate) / 86400000) / 7) + 1;
        }

        ctrl.handleKeyDown = function( key, evt ) {
          var date = ctrl.activeDate.getDate();

          if (key === 'left') {
            date = date - 1;   // up
          } else if (key === 'up') {
            date = date - 7;   // down
          } else if (key === 'right') {
            date = date + 1;   // down
          } else if (key === 'down') {
            date = date + 7;
          } else if (key === 'pageup' || key === 'pagedown') {
            var month = ctrl.activeDate.getMonth() + (key === 'pageup' ? - 1 : 1);
            ctrl.activeDate.setMonth(month, 1);
            date = Math.min(getDaysInMonth(ctrl.activeDate.getFullYear(), ctrl.activeDate.getMonth()), date);
          } else if (key === 'home') {
            date = 1;
          } else if (key === 'end') {
            date = getDaysInMonth(ctrl.activeDate.getFullYear(), ctrl.activeDate.getMonth());
          }
          ctrl.activeDate.setDate(date);
        };

        ctrl.refreshView();
      }
    };
  }])

  .directive('preoCalendar', function () {
    return {
      restrict: 'EA',
      replace: true,
      templateUrl: '/code/events/js/directives/preo-calendar/preo-calendar.htm',
      scope: {
        datepickerMode: '=?',
        dateDisabled: '&',
        attrRows: '@rows',
        selectedDays: '=',
        ngModel: '=',
        schedules: '='
      },
      require: ['preoCalendar'],
      controller: 'PreoCalendarController',
      link: function(scope, element, attrs, ctrls) {
        var preoCalendarCtrl = ctrls[0], ngModelCtrl = ctrls[1];
      }
    };
  })
