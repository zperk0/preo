export default class eventScheduleFormController {
  static get UID() {
    return "eventScheduleFormController"
  }

  isOnceFrequency() {
    return this.schedule.isOnceFrequency();
  }

  resetDateTime(date) {
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
  }

  /* @ngInject */
  constructor($scope, gettextCatalog) {
    'ngInject';

    this.schedule.startDate = null;
    this.schedule.endDate = null;
  }
}
