export default class eventScheduleController {
  static get UID() {
    return "eventScheduleController"
  }

  restoreOriginalValues() {
    if (this.originalSchedule) {
      angular.extend(this.schedule, this.originalSchedule)
      this.schedule.$startDate = null;
      this.schedule.$endDate = null;
      this.schedule.occurrences = [];
      this.originalSchedule = false;
    }
  }

  contextualMenuCancel() {
    this.restoreOriginalValues();
    this.schedule.$selected = false;

    if (this.schedule && !this.schedule.id) {
      this.cardItemList.deleteItem(this.schedule);
      this.eventScheduleListCtrl.cancelSchedule();
    }
  }

  formatDate(date) {

    var date = moment(date.getTime());

    return date.format('YYYY-MM-DDTHH:mm:00.000');
  }

  concatStartDateWithTime(entity) {

    var dateTimer = moment(entity.$startTime.getTime());

    for (var day of entity.occurrences) {
      day.date = day.$moment.clone();
      day.date.hours(dateTimer.hours());
      day.date.minutes(dateTimer.minutes());
      day.date = day.date.toDate();
      day.date = this.formatDate(day.date);
    }

    return entity.occurrences;
  }

  buildEntityToSchedule(entity) {

    this.schedule = entity;
    this.schedule.occurrences = this.concatStartDateWithTime(entity);
  }

  buildScheduleOccurrences(schedule) {
    for (var occurrence of schedule.occurrences) {
      if (occurrence.date) {
        occurrence.$moment = moment(occurrence.date);
      }
    }
  }

  contextualMenuSuccess(entity) {
    if (this.schedule && entity && entity.pickupSlots && entity.pickupSlots.length && entity.occurrences && entity.occurrences.length) {
      this.buildEntityToSchedule(entity);

      if (!this.schedule.id) {
        this.eventScheduleListCtrl.createSchedule(this.schedule)
          .then((_schedule) => {

            this.cardItemList.onUpdateItem(this.schedule, _schedule);
            this.contextualMenu.hide();
            this.Spinner.hide("event-schedule-create");
          }, (err) => {
            console.log('error on save schedule', err);
            this.Spinner.hide("event-schedule-create");
            this.Snack.showError(this.gettextCatalog.getString('Error saving schedule'));
          })

      } else {
        this.updateSchedule().then(() => {
          this.contextualMenu.hide();
          this.schedule.$selected = false;
        })
      }
    }
  }

  updateSchedule() {

    this.Spinner.show("event-schedule-update");
    return this.$q((resolve, reject) => {
      this.schedule.update()
        .then((_schedule) => {
          this.Snack.show(this.gettextCatalog.getString('Schedule updated'));

          this.eventScheduleListCtrl.buildScheduleTimestamp(this.schedule);
          resolve(_schedule);
        }, (err) => {
          reject();
          this.Snack.showError(this.gettextCatalog.getString('Error updating schedule'));
        }).then(() => {
          this.Spinner.hide("event-schedule-update");
        })
    });
  }

  onEdit($event) {

    this.originalSchedule = angular.copy(this.schedule);
    this.cardItemList.selectItem(this.schedule);
    this.contextual.showMenu(this.type, this.schedule, this.contextualMenuSuccess.bind(this), this.contextualMenuCancel.bind(this));
    $event.stopPropagation();
  }

  onDelete() {

    if (this.eventScheduleListCtrl.getSchedulesCount() === 1) {
      return this.showCannotDeleteScheduleDialog();
    }

    this.DialogService.delete(this.LabelService.TITLE_DELETE_SCHEDULE, this.LabelService.CONTENT_DELETE_SCHEDULE)
      .then(() => {

        this.Spinner.show("event-schedule-delete");

        this.schedule.visible = 0;

        let promise = this.schedule.update();
        promise.then(() => {
          this.cardItemList.onItemDeleted(this.schedule);
          if (this.onItemDeleted) {
            this.onItemDeleted({ item: this.schedule });
          }
          this.Snack.show('Schedule deleted');
          this.Spinner.hide("event-schedule-delete");
        })
          .catch((err) => {
            console.log('catch here', err);
            this.Spinner.hide("event-schedule-delete")

            if (err && err instanceof Object && err.message && err.message.indexOf('event') !== -1) {
              this.showCannotDeleteScheduleDialog(err);
            } else {
              this.Snack.showError(this.gettextCatalog.getString('Schedule not deleted'));
            }
          });
      });
  }

  showCannotDeleteScheduleDialog() {

    this.DialogService.show(this.ErrorService.SCHEDULE_EVENT.title, this.ErrorService.SCHEDULE_EVENT.message, [{
      name: this.gettextCatalog.getString('GOT IT')
    }]);
  }

  getScheduleTitle() {

    if (!this.schedule.$startDate && !this.schedule.startDate && !this.schedule.$endDate && !this.schedule.endDate) {
      return '&nbsp;';
    }

    let hasStartDate = this.schedule.$startDate || this.schedule.startDate;
    let hasEndDate = this.schedule.$endDate || this.schedule.endDate;

    switch (this.schedule.freq) {
      case this.EventScheduleFrequency.ONCE:
        return moment(this.schedule.$startDate || this.schedule.startDate).format('DD/MM/YYYY');

      default:
        return [
          hasStartDate ? moment(this.schedule.$startDate || this.schedule.startDate).format('DD/MM/YYYY') : '',
          hasEndDate ? moment(this.schedule.$endDate || this.schedule.endDate).format('DD/MM/YYYY') : ''
        ].join(' - ');
    }
  }

  getScheduleTime() {

    if (!this.schedule.occurrences || !this.schedule.occurrences.length) {
      return '&nbsp;';
    }

    return moment(this.schedule.$startTime || this.schedule.occurrences[0].date).format('HH:mm');
  }

  shouldShowWarningSlots() {

    return this.schedule.id && !this.schedule.hasSlots();
  }

  constructor($q, $timeout, Spinner, Snack, contextualMenu, contextual, MenuService, DialogService, LabelService, gettextCatalog, EventScheduleFrequency, ErrorService) {
    "ngInject";

    this.$q = $q;
    this.$timeout = $timeout;
    this.Spinner = Spinner;
    this.Snack = Snack;
    this.contextualMenu = contextualMenu;
    this.contextual = contextual;
    this.DialogService = DialogService;
    this.LabelService = LabelService;
    this.gettextCatalog = gettextCatalog;
    this.EventScheduleFrequency = EventScheduleFrequency;
    this.ErrorService = ErrorService;

    if (this.schedule.occurrences) {
      for (var occurrence of this.schedule.occurrences) {
        if (occurrence.date) {
          occurrence.$moment = moment(occurrence.date);
        }
      }
    }

    this.type = 'eventSchedule';

    if (this.schedule && !this.schedule.id) {
      this.contextual.showMenu(this.type, this.schedule, this.contextualMenuSuccess.bind(this), this.contextualMenuCancel.bind(this));
    }
  }
}
