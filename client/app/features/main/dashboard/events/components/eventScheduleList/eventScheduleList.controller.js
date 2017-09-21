export default class eventScheduleListController {
  static get UID() {
    return "eventScheduleListController"
  }

  showCreateSchedule() {

    let isCreating = this.schedules.filter(function (item) {

      return item.id === undefined;
    }).length;

    if (isCreating) {
      console.log("Not showing schedule new, already showing")
      return;
    }

    this.schedules.push(this.EventScheduleService.getNewScheduleModel(this.event.id));
  }

   buildScheduleTimestamp(schedule) {
    if(schedule.occurrences && schedule.occurrences.length){
      schedule.$startTimestamp = moment(schedule.occurrences[0].date).valueOf();
    }
  }

  createSchedule(newData) {

    let deferred = this.$q.defer();

    // newData.position = 0;

    if (!this.event.id) {
      this.eventCtrl.createEvent()
        .then((event) => {

          this.buildSchedules(true);
          deferred.resolve(event.schedules[0]);
        }, deferred.reject);
    } else {
      this.Spinner.show("event-schedule-create");
      this.EventScheduleService.save(newData)
        .then((schedule) => {
          this.buildScheduleTimestamp(schedule)
          this.Snack.show(this.gettextCatalog.getString('Schedule created'));

          deferred.resolve(schedule);
        }, (err) => {

          deferred.reject(err);
        });
    }

    return deferred.promise;
  }

  cancelSchedule() {

    if (!this.event.id) {
      this.eventCtrl.removeEventItem();
    }
  }

  getSchedulesCount() {

    return this.schedules.length;
  }

  buildSchedules(shouldShow) {

    this.schedules.forEach((schedule) => {

      schedule.$show = !!shouldShow;
      this.buildScheduleTimestamp(schedule)
    });
  }

  setMaxHeight(maxHeight) {
    angular.element(this.$element[0]).css('max-height', maxHeight);
  }

  getHeight() {
    const container = angular.element(this.$element[0].querySelector('.container'));
    return container && container.length ? container[0].offsetHeight : 0;
  }

  expand(status) {
    this.event.$expanded = status;

    if (status) {
      this.schedules.forEach((s)=>s.$show = true);
    } else {
      this.runAnimation();
    }
  }

  runAnimation() {
    if (this.event.$expanded === this.lastVal) {
      return;
    }
    this.lastVal = this.event.$expanded;
    this.event.$expanding = true;
    
    if (!this.event.$expanded) {
      this.setMaxHeight(this.getHeight() + 'px');
    }

    this.$timeout(() => this.setMaxHeight((this.event.$expanded ? this.getHeight() : 0) + 'px'));
    this.$timeout(() => this.afterAnimation(), 500);
  }

  afterAnimation() {
    if (this.event.$expanded) {
      this.setMaxHeight('max-content');
    } else {
      this.schedules.forEach((s)=>s.$show = false);
    }
    this.event.$expanding = false;
  }

  setAnimation() {
    this.$scope.$watch('eventScheduleListCtrl.event.$expanded', newVal => {
      this.expand(Boolean(newVal));
    });
  }

  /* @ngInject */
  constructor($scope, $element, $timeout, $q, Spinner, Snack, gettextCatalog, EventScheduleService) {
    "ngInject";

    this.$scope = $scope;
    this.$element = $element;
    this.Spinner = Spinner;
    this.Snack = Snack;
    this.$q = $q;
    this.$timeout = $timeout;
    this.gettextCatalog = gettextCatalog;
    this.EventScheduleService = EventScheduleService;

    this.event.$expanding = false;

    this.buildSchedules();
    this.setAnimation();
  }
}
