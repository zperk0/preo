export default function inlineCalendar() {
    "ngInject";

    return {
        restrict: 'E',
        scope: {
            selectedDays: '=ngModel'
        },
        template: require("./inlineCalendar.tpl.html"),
        link: (scope) => {
            scope.today = moment();

            scope.selectedDays = [];
            var firstDayOfMonth = scope.today.clone().startOf('month');
            _buildMonth(scope, firstDayOfMonth);

            scope.select = (day) => {
                _storeSelectedDay(scope, day);
                if (day.isCurrentMonth) {
                    day.isSelected = !day.isSelected;
                } else {
                    day.moment > scope.today ? scope.next() : scope.previous();
                }
            };

            scope.previous = () => {
                scope.today.subtract(1, 'months');
                _buildMonth(scope, scope.today.clone().startOf('month'));
            };

            scope.next = () => {
                scope.today.add(1, 'months');
                _buildMonth(scope, scope.today.clone().startOf('month'));
            };
        }
    };

    function _storeSelectedDay(scope, day) {
        _isDayStored(scope, day) ? _deleteSelectedDay(scope, day) : scope.selectedDays.push(day);
        _orderSelectedDays(scope);
    }

    function _deleteSelectedDay(scope, day) {
        scope.selectedDays.filter((selectedDay, index) => {
            if (selectedDay.moment.isSame(day.moment, 'day')) {
                scope.selectedDays.splice(index, 1);
            }
        })
    }

    function _orderSelectedDays(scope) {
        scope.selectedDays.sort((a, b) => a.moment > b.moment);
    }

    function _isDayStored(scope, day) {
        return scope.selectedDays.filter(selectedDay => selectedDay.moment.isSame(day.moment, 'day')).length > 0;
    }

    function _buildMonth(scope, firstDayOfMonth) {
        scope.currentMonth = _getMonth(scope, firstDayOfMonth);
    }

    function _getMonth(scope, initialDay) {
        var weeks = [],
            currentWeekDay = initialDay.clone().startOf('isoweek'),
            currentMonthIndex = scope.today.clone().month(),
            nextMonth = false,
            loopCount = 0;

        while (!nextMonth) {
            weeks.push(_getWeek(scope, currentWeekDay.clone()));
            currentWeekDay.add(1, 'w');
            nextMonth = loopCount++ > 2 && currentMonthIndex !== currentWeekDay.month();
            currentMonthIndex = currentWeekDay.month();
        }
        return weeks;
    }

    function _getWeek(scope, weekDay) {
        var days = [];
        for (var i = 0; i < 7; i++) {
            var day = {
                name: weekDay.format('ddd DD MMM'),
                number: weekDay.date(),
                isCurrentMonth: weekDay.month() === scope.today.month(),
                isToday: weekDay.isSame(new Date(), 'day'),
                moment: weekDay
            };
            day.isSelected = _isDayStored(scope, day);
            days.push(day);
            weekDay = weekDay.clone();
            weekDay.add(1, 'd');
        }
        return days;
    }
}
