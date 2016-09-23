export default class eventScheduleListController {
  static get UID(){
    return "eventScheduleListController"
  }

  showCreateSchedule(){

    let isCreating = this.schedules.filter(function (item) {

      return item.id === undefined;
    }).length;
    
    if (isCreating){
      console.log("Not showing schedule new, already showing")
      return;
    }

    let schedule = new Preoday.EventSchedule({
      eventId: this.eventCtrl.event.id,
      $selected: true,
    });

    this.schedules.push(schedule);
  }  

  /* @ngInject */
  constructor($timeout, $q, Spinner, Snack, gettextCatalog) {
    "ngInject";

    console.log('schedules here');

    this.Spinner = Spinner;
    this.Snack = Snack;
    this.$q = $q;
    this.$timeout = $timeout;
    this.gettextCatalog = gettextCatalog;
  }
}
