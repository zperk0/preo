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

  recalculateHeight() {

    this.event.$expanding = true;
    let maxHeight = 0;
    this.schedules.forEach((i) => {
      maxHeight += 50 + 16;
    });

    // (button + height + margin-top + margin-bottom)
    maxHeight = maxHeight + (50 + 8 + 32) + "px";
    if (this.el[0].style.maxHeight !== maxHeight) {
      // this.el[0].style.maxHeight = maxHeight;
      this.el[0].style.maxHeight = '100%';
    } else {
      this.event.$expanding = false;
    }
  }

  buildSchedules(shouldShow) {

    this.schedules.forEach((schedule) => {

      schedule.$show = !!shouldShow;
    });
  }

  /* @ngInject */
  constructor($scope, $timeout, $q, Spinner, Snack, gettextCatalog, EventScheduleService) {
    "ngInject";

    this.Spinner = Spinner;
    this.Snack = Snack;
    this.$q = $q;
    this.$timeout = $timeout;
    this.gettextCatalog = gettextCatalog;
    this.EventScheduleService = EventScheduleService;

    this.event.$expanding = false;

    this.buildSchedules();

    //watch for animation only if we're in a section
    $scope.$watch(() => {

      return this.event.$expanded;
    }, (newVal, oldVal) => {

      if (newVal) { // if expanded = true;
        this.schedules.forEach((i) => i.$show = true)
        if (this.schedules.length === 0) {
          this.recalculateHeight();
        }
      } else if (oldVal) { //if expanded = false and it was true
        this.el[0].style.maxHeight = 0;
        this.event.$expanding = true;
        $timeout(() => {
          this.schedules.forEach((i) => i.$show = false)
          this.event.$expanding = false;
        }, 1000)

      }
    }, true);
  }
}
