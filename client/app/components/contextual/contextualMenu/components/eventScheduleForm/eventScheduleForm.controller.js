export default class eventScheduleFormController {
  static get UID() {
    return "eventScheduleFormController"
  }

  resetDateTime(date) {
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
  }

  /* @ngInject */
  constructor($scope, gettextCatalog) {
    'ngInject';

  }
}
