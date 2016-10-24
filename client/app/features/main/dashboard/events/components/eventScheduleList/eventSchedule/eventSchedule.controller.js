export default class eventScheduleController {
  static get UID(){
    return "eventScheduleController"
  }

  restoreOriginalValues(){
    if (this.originalSchedule){
      angular.extend(this.schedule, this.originalSchedule)
      this.schedule.$startDate = null;
      this.schedule.$endDate = null;
      this.originalSchedule = false;
    }
  }

  contextualMenuCancel(){
    this.restoreOriginalValues();
    this.schedule.$selected = false;

    if (this.schedule && !this.schedule.id) {
      this.cardItemList.deleteItem(this.schedule);
    }
  }

  formatDate (date) {

    var date = moment(date.getTime());

    return date.format('YYYY-MM-DDTHH:mm:00.000');
  }

  concatStartDateWithTime (entity) {

    var date = moment(entity.$startDate.getTime());
    var dateTimer = moment(entity.$startTime.getTime());

    date.hours(dateTimer.hours());
    date.minutes(dateTimer.minutes());

    entity.$startDate = date.toDate();

    return this.formatDate(entity.$startDate);
  }

  buildEntityToSchedule (entity) {

    this.schedule = entity;

    this.schedule.startDate = this.concatStartDateWithTime(entity);

    if (this.schedule.isOnceFrequency()) {
      this.schedule.endDate = this.schedule.startDate;
    } else {
      this.schedule.endDate = this.formatDate(entity.$endDate);
    }
  }

  contextualMenuSuccess(entity){
    if (this.schedule && entity) {
      this.buildEntityToSchedule(entity);

      if (!this.schedule.id){
        this.Spinner.show("event-schedule-create");
        this.eventScheduleListCtrl.createSchedule(this.schedule)
          .then((_schedule)=>{

            _schedule.$show = true;

            this.schedule.$deleted = false;
            this.schedule.$selected = false;

            this.$timeout(() => {

              this.cardItemList.onItemCreated(_schedule);
              this.contextualMenu.hide();
              this.Spinner.hide("event-schedule-create");
              this.Snack.show(this.gettextCatalog.getString('Schedule created'));
            });
          }, (err)=>{
            console.log('error on save schedule', err);
            this.Spinner.hide("event-schedule-create");
            this.Snack.showError(this.gettextCatalog.getString('Error saving schedule'));
          })

      } else {
        this.updateSchedule().then(()=>{
          this.contextualMenu.hide();
          this.schedule.$selected = false;
        })
      }
    }
  }

  updateSchedule(){

    this.Spinner.show("event-schedule-update");
    return this.$q((resolve, reject)=>{
      this.schedule.update()
        .then((_schedule)=>{
          this.Snack.show(this.gettextCatalog.getString('Schedule updated'));

          this.eventScheduleListCtrl.buildScheduleTimestamp(this.schedule);
          resolve(_schedule);
        },(err) => {
          reject();
          this.Snack.showError(this.gettextCatalog.getString('Error updating schedule'));
        }).then(()=>{
          this.Spinner.hide("event-schedule-update");
        })
    });
  }

  onEdit ($event) {

    this.originalSchedule  = angular.copy(this.schedule);
    this.cardItemList.selectItem(this.schedule);
    this.contextual.showMenu(this.type, this.schedule, this.contextualMenuSuccess.bind(this), this.contextualMenuCancel.bind(this));
    $event.stopPropagation();
  }

  onDelete(){

    if (this.eventScheduleListCtrl.getSchedulesCount() === 1) {
      return this.showCannotDeleteScheduleDialog();
    }

    this.DialogService.delete(this.LabelService.TITLE_DELETE_SCHEDULE, this.LabelService.CONTENT_DELETE_SCHEDULE)
      .then(()=>{

        this.Spinner.show("event-schedule-delete");

        this.schedule.visible = 0;

        let promise = this.schedule.update();
        promise.then(()=>{
            this.cardItemList.onItemDeleted(this.schedule);
            if (this.onItemDeleted){
              this.onItemDeleted({item:this.schedule});
            }
            this.Snack.show('Schedule deleted');
            this.Spinner.hide("event-schedule-delete");
        })
        .catch((err)=>{
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

  showCannotDeleteScheduleDialog () {

    this.DialogService.show(this.ErrorService.SCHEDULE_EVENT.title, this.ErrorService.SCHEDULE_EVENT.message, [{
        name: this.gettextCatalog.getString('OK')
      }]);
  }

  getScheduleTitle () {

    switch (this.schedule.freq) {
      case this.EventScheduleFrequency.ONCE:
        return moment(this.schedule.$startDate || this.schedule.startDate).format('DD/MM/YYYY');

      default:
        return [
            moment(this.schedule.$startDate || this.schedule.startDate).format('DD/MM/YYYY'),
            moment(this.schedule.$endDate || this.schedule.endDate).format('DD/MM/YYYY')
        ].join(' - ');
    }
  }

  getScheduleTime () {

    return moment(this.schedule.$startTime || this.schedule.startDate).format('HH:mm');
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
