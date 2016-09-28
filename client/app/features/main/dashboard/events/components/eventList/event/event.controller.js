export default class eventController {
  static get UID(){
    return "eventController"
  }

  restoreOriginalValues() {

    if (this.originalEvent){
      angular.extend(this.event, this.originalEvent)
      this.originalEvent = false;
    }
  }  

  toggleExpanded($event){
    if (this.event.$expanding){
      return;
    }
    if ($event){
      var el = angular.element($event.target);
      while (el[0]) {
        el = angular.element(el);
        if (el.hasClass('sv-long-pressing')){
          return;
        }
        el = el.parent();
      }
    }
    this.cardItemList.expandItem(this.event);
    this.contextualMenu.close();
  }  

  contextualMenuCancel() {

    this.restoreOriginalValues();
    this.event.$selected = false;

    if (this.event && !this.event.id) {
      this.cardItemList.deleteItem(this.event);
    }    
  }

  contextualMenuSuccess(entity){
    if (this.event && entity && entity.name){
      this.event = entity;

      if (!this.event.id){
        this.Spinner.show("event-create");
        this.eventListCtrl.createEvent(this.event)
          .then((_event)=>{

            this.event.$deleted = false;
            this.event.$selected = false;
            
            this.$timeout(() => {

              this.cardItemList.onItemCreated(_event);
              this.contextualMenu.hide();
              this.Spinner.hide("event-create");
              this.Snack.show(this.gettextCatalog.getString('Event created'));              
            });
          }, (err)=>{
            console.log('error on save event', err);
            this.Spinner.hide("event-create");
            this.Snack.showError(this.gettextCatalog.getString('Error saving event'));
          })

      } else {
        this.updateEvent().then(()=>{
          this.contextualMenu.hide();
          this.event.$selected = false;
        })
      }
    }
  }  

  updateEvent(){

    this.Spinner.show("event-update");
    return this.$q((resolve, reject)=>{
      this.EventService.update(this.event)
        .then((_event)=>{
          this.Snack.show(this.gettextCatalog.getString('Event updated'));
          resolve(_event);
      },()=>{
        reject();
        this.Snack.showError(this.gettextCatalog.getString('Error updating event'));
      }).then(()=>{
        this.Spinner.hide("event-update");
      })
    });
  }

  onEdit ($event) {

    this.event.$images = [];

    if (this.event.image) {
      this.event.$images.push({
        image: this.event.image
      });
    }

    this.originalEvent  = angular.copy(this.event);
    this.cardItemList.selectItem(this.event);
    this.contextual.showMenu(this.type, this.event, this.contextualMenuSuccess.bind(this), this.contextualMenuCancel.bind(this));
    $event.stopPropagation();
  } 

  onDelete(){

    this.DialogService.delete(this.LabelService.TITLE_DELETE_EVENT, this.LabelService.CONTENT_DELETE_EVENT)
      .then(()=>{
          this.Spinner.show("event-delete");
          return this.event.delete();
      })
      .then(()=>{
          this.cardItemList.onItemDeleted(this.event);
          if (this.onItemDeleted){
            this.onItemDeleted({item:this.event});
          }
          this.Snack.show('Event deleted');
          this.Spinner.hide("event-delete");
      })
      .catch((err)=>{
        this.Spinner.hide("event-delete")
        
        this.Snack.showError('Event not deleted');
      });
  }  

  constructor($q, $timeout, Spinner, Snack, contextualMenu, contextual, DialogService, LabelService, ErrorService, EventService, gettextCatalog) {
  	"ngInject";

    this.$q = $q;
  	this.$timeout = $timeout;
  	this.Spinner = Spinner;
  	this.Snack = Snack;
  	this.contextualMenu = contextualMenu;
  	this.contextual = contextual;
  	this.DialogService = DialogService;
    this.LabelService = LabelService;
  	this.ErrorService = ErrorService;
    this.EventService = EventService;
  	this.gettextCatalog = gettextCatalog;

  	this.type = 'event';

    if (this.event && !this.event.id) {
      this.contextual.showMenu(this.type, this.event, this.contextualMenuSuccess.bind(this), this.contextualMenuCancel.bind(this));
    } 
  }
}
