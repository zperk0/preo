export default function inlineCalendar() {
    "ngInject";

    return {
        restrict: 'E',
        scope: {
            schedule: '=ngModel'
        },
        template: require("./inlineCalendar.tpl.html"),
        link: (scope) => {
            scope.today = moment();
            scope.schedule.$occurrences = [];
            scope.daysName = _getWeekDays();

            var firstDayOfMonth = scope.today.clone().startOf('month');
            _buildMonth(scope, firstDayOfMonth);

            scope.select = (day) => {
                _storeOccurrence(scope, day);
                if (day.isCurrentMonth) {
                    day.isSelected = !day.isSelected;
                } else {
                    day.date > scope.today ? scope.next() : scope.previous();
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

    function _storeOccurrence(scope, day) {
        _isDayStored(scope, day) ? _deleteOccurrence(scope, day) : scope.schedule.$occurrences.push(day);
        _orderOccurrences(scope);
    }

    function _deleteOccurrence(scope, day) {
        scope.schedule.$occurrences.filter((occurrence, index) => {
            if (occurrence.date.isSame(day.date, 'day')) {
                scope.schedule.$occurrences.splice(index, 1);
            }
        })
    }

    function _orderOccurrences(scope) {
        scope.schedule.$occurrences.sort((a, b) => a.date > b.date);
    }

    function _isDayStored(scope, day) {
        return scope.schedule.$occurrences.filter(occurrence => occurrence.date.isSame(day.date, 'day')).length > 0;
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

    function _getWeekDays() {
        var days = [],
            initialDay = moment().clone().startOf('isoweek');

        for (var i = 0; i < 7; i++) {
            var day = initialDay.format('dd');
            days.push(day);
            initialDay.add(1, 'd');
        }
        return days;
    }

    function _getWeek(scope, weekDay) {
        var days = [];
        for (var i = 0; i < 7; i++) {
            var day = {
                name: weekDay.format('ddd DD MMM'),
                number: weekDay.date(),
                isCurrentMonth: weekDay.month() === scope.today.month(),
                isToday: weekDay.isSame(new Date(), 'day'),
                date: weekDay
            };
            day.isSelected = _isDayStored(scope, day);
            days.push(day);
            weekDay = weekDay.clone();
            weekDay.add(1, 'd');
        }
        return days;
    }
}
