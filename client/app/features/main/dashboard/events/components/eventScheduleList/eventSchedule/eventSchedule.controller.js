export default class eventScheduleController {
  static get UID() {
    return "eventScheduleController"
  }

  restoreOriginalValues() {
    if (this.originalSchedule) {
      angular.extend(this.schedule, this.originalSchedule)
      this.schedule.selectedDays = [];
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

  buildEntityToSchedule(entity) {
    this.schedule = entity;
  }

  contextualMenuSuccess(entity) {
    if (this.schedule && entity && entity.pickupSlots && entity.pickupSlots.length) {
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

  getScheduleTime() {
    return moment(this.schedule.$startTime).format('HH:mm');
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

    this.type = 'eventSchedule';

    if (this.schedule && !this.schedule.id) {
      this.contextual.showMenu(this.type, this.schedule, this.contextualMenuSuccess.bind(this), this.contextualMenuCancel.bind(this));
    }
  }
}
