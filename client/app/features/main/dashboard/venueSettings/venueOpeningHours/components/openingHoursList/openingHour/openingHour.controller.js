export default class openingHourController {

  static get UID() {
    return "openingHourController"
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
  }
}
