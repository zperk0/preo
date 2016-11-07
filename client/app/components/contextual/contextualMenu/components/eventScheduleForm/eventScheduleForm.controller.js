export default class eventScheduleFormController {
  static get UID(){
    return "eventScheduleFormController"
  }

  isOnceFrequency () {

  	return this.schedule.isOnceFrequency();
  }

  resetDateTime (date) {

    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
  }

  /* @ngInject */
  constructor($scope, EventScheduleFrequency, gettextCatalog) {
    'ngInject';

    this.EventScheduleFrequency = EventScheduleFrequency;

    this.schedule.$startDate = this.schedule.startDate ? moment(this.schedule.startDate).toDate() : null;
    this.schedule.$endDate = this.schedule.endDate ? moment(this.schedule.endDate).toDate() : null;

    if (this.schedule.isOnceFrequency()) {
      this.schedule.$endDate = null;
    }

    if (this.schedule.$startDate) {
      this.schedule.$startTime = moment(this.schedule.$startDate).toDate();
      this.resetDateTime(this.schedule.$startDate);
    }

    if (this.schedule.$endDate) {
      this.resetDateTime(this.schedule.$endDate);
    }

    this.schedules = [{
    	value: EventScheduleFrequency.ONCE,
    	title: gettextCatalog.getString('One off')
    },{
    	value: EventScheduleFrequency.DAILY,
    	title: gettextCatalog.getString('Repeat daily')
    },{
    	value: EventScheduleFrequency.WEEKLY,
    	title: gettextCatalog.getString('Repeat weekly')
    }];
  }
}
