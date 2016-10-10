export default class eventScheduleFormController {
  static get UID(){
    return "eventScheduleFormController"
  }

  isOnceFrequency () {

  	return this.schedule.freq === this.EventScheduleFrequency.ONCE;
  }

  /* @ngInject */
  constructor($scope, EventScheduleFrequency, gettextCatalog) {
    'ngInject';

    console.log('schedule here', this.schedule);

    this.EventScheduleFrequency = EventScheduleFrequency;

    this.schedule.$startDate = this.schedule.startDate ? moment(this.schedule.startDate).toDate() : new Date();
    this.schedule.$endDate = this.schedule.endDate ? moment(this.schedule.endDate).toDate() : new Date();

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
