export default class openingHourController {

  static get UID() {
    return "openingHourController"
  }

  isDaySelected (day) {

    return this.openingHour.days.filter((hoursDay) => {

      return hoursDay === day.value;
    }).length > 0;
  }

  toggleDay (day) {

    let index = this.openingHour.days.indexOf(day.value);

    if (index !== -1) {
      this.openingHour.days.splice(index, 1);
    } else {
      this.openingHour.days.push(day.value);
    }

    this.update();
  }

  update () {

    console.log('debounceUpdate here');

    this.onUpdate && this.onUpdate();
  }

  delete () {

    this.onDelete && this.onDelete({
      openingHour: this.openingHour
    });
  }

  constructor($scope) {
    "ngInject";

    this.$scope = $scope;

    this.days = [];

    let startOfWeek = moment().startOf('isoweek').subtract(1, 'days');

    for (var i = 0, len = 7; i < len; i++) {

    	this.days.push({
    		name: startOfWeek.add(1, 'days').format('ddd'),
    		value: ( i === 6 ? 1 : i + 2 )
    	});
    }

    if (this.openingHour.open) {
      let openTime = this.openingHour.open.slice(0,5).split(':');
      let closeTime = this.openingHour.close.slice(0,5).split(':');
      this.openingHour.$open = moment().hours(openTime[0]).minutes(openTime[1]);
      this.openingHour.$close = moment().hours(closeTime[0]).minutes(closeTime[1]);
    }

    $scope.$watch(() => {

      return this.openingHour.$open;
    }, (newValue, oldValue) => {
// console.log('watch open here', oldValue, newValue);

      if ((!oldValue && newValue) || (moment(oldValue).format('HH:mm') !== moment(newValue).format('HH:mm'))) {
        this.debounceUpdate();
      }
    });

    $scope.$watch(() => {

      return this.openingHour.$close;
    }, (newValue, oldValue) => {
// console.log('watch $close here', oldValue, newValue);

      if ((!oldValue && newValue) || (moment(oldValue).format('HH:mm') !== moment(newValue).format('HH:mm'))) {
        this.debounceUpdate();
      }
    });
  }
}
