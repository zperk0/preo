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

  contextualMenuSuccess(entity){
    if (this.schedule && entity && entity.name){
      this.schedule = entity;

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
        this.Snack.showError(this.gettextCatalog.getString('Error saving schedule'));
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

  constructor($q, $timeout, Spinner, Snack, contextualMenu, contextual, MenuService, DialogService, LabelService, gettextCatalog) {
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

  	this.type = 'eventSchedule';

    if (this.schedule && !this.schedule.id) {
        this.contextual.showMenu(this.type, this.schedule, this.contextualMenuSuccess.bind(this), this.contextualMenuCancel.bind(this));
    }    
  }
}
