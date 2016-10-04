export default class eventScheduleController {
  static get UID(){
    return "eventScheduleController"
  }

  restoreOriginalValues(){
    if (this.originalSchedule){
      angular.extend(this.schedule, this.originalSchedule)
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

    return date.format('YYYY-MM-DDThh:mm:00.000');
  }

  buildEntityToSchedule (entity) {

    this.schedule = entity;
    this.schedule.startDate = this.formatDate(entity.$startDate);
    this.schedule.endDate = this.formatDate(entity.$endDate);
  }

  contextualMenuSuccess(entity){
    if (this.schedule && entity) {
      this.buildEntityToSchedule(entity);

      if (!this.schedule.id){
        this.Spinner.show("event-schedule-create");
        this.eventScheduleListCtrl.createSchedule(this.schedule)
          .then((_schedule)=>{

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
          resolve(_schedule);
      },()=>{
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
    
    this.DialogService.delete(this.LabelService.TITLE_DELETE_SCHEDULE, this.LabelService.CONTENT_DELETE_SCHEDULE)
      .then(()=>{
        this.contextual.hide();
        this.eventScheduleListCtrl.deleteSchedule(this.schedule);
      })
  }  

  getScheduleTitle () {

    switch (this.schedule.freq) {
      case this.EventScheduleFrequency.ONCE:
        return moment(this.schedule.startDate).format('DD/MM/YYYY');

      default:
        return [
            moment(this.schedule.startDate).format('DD/MM/YYYY'), 
            moment(this.schedule.endDate).format('DD/MM/YYYY')
        ].join(' - ');
    }
  }

  getScheduleTime () {

    return moment(this.schedule.startDate).format('hh:mm');
  }

  constructor($q, $timeout, Spinner, Snack, contextualMenu, contextual, MenuService, DialogService, LabelService, gettextCatalog, EventScheduleFrequency) {
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

  	this.type = 'eventSchedule';

    if (this.schedule && !this.schedule.id) {
        this.contextual.showMenu(this.type, this.schedule, this.contextualMenuSuccess.bind(this), this.contextualMenuCancel.bind(this));
    }    
  }
}
