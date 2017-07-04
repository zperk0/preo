export default class externalEventListController {
  static get UID(){
    return "externalEventListController";
  }

  onDelete(externalEvent){

    var event = this.ExternalService.getEntityEvent();

    this.DialogService.delete(this.LabelService.TITLE_DELETE_EXTERNAL_EVENT, this.LabelService.CONTENT_DELETE_EXTERNAL_EVENT)
      .then(()=>{      

        this.showSpinner();
        this.ExternalService.deleteTMEventOfPreodayEvent(event.id,externalEvent.system, externalEvent.externalId)
        .then((data) => {

          this.cardItemList.onItemDeleted(externalEvent);
          this.Snack.show(this.gettextCatalog.getString("Event deleted successfully."));          
          
          if(this.onItemDelete)
            this.onItemDelete();
          this.hideSpinner();
        }, (err) => {
            
          this.hideSpinner();
          this.Snack.showError(this.gettextCatalog.getString("There was an error deleting the event. Please try again."));      
        });      
    });   
  }

  selectEvent (event) {

    if(event.$selected){
      event.$selected = false;
      
    }
    else{
      event.$selected = true;      
    }

    if(this.onItemClicked)
      this.onItemClicked({event: event}); 
     
  }

  showSpinner(){
    this.Spinner.show('external-event-list');
  }

  hideSpinner(){
    this.Spinner.hide('external-event-list');
  }

  constructor($scope, $timeout, Spinner, ExternalService, DialogService, gettextCatalog, LabelService, Snack) {
    "ngInject";
    
    this.Snack = Snack;  
    
    this.gettextCatalog = gettextCatalog;
    this.DialogService = DialogService;
    this.$timeout = $timeout;
    this.$scope = $scope;
 
    this.Spinner = Spinner;
    this.ExternalService = ExternalService;

    this.LabelService = LabelService;         
  }
 
}
