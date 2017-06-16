export default class contextualDrawerEventsImportController {
  static get UID(){
    return "contextualDrawerEventsImport";
  }

  showAddNew(){    
    this.isEditMode = false;
    this.linkToExistentEvent = true;
    this.init();
  }

  close(){

    if(this.linkToExistentEvent){
      this.isImportMode = false;
      this.linkToExistentEvent = false;
      this.init();
    }
    else{
      this.cleanData();
      this.contextualDrawer.cancel();
    }
  }

  done(){
  
    this.cleanData();
    this.contextualDrawer.success({ hasChanges: this.entityChanged, event: this.entity});
  }

  onItemClicked(event) {

    if(!event.$selected){      
      let index = this.selectedEvents.indexOf(event);
      this.selectedEvents.splice(index, 1);
    }
    else{     
      this.selectedEvents.push(event);
    }    
     
  }

  onItemDelete(){
   // this.entityChanged = true;
    this.data = null;
  }

  import () {

    if(!this.entity && !this.slots.pickupSlots.length){
      if(this.selectedTab !== 1)
        this.selectedTab = 1;

      return;
    }

    this.showSpinner();
    if(this.entity){
      this.ExternalService.addTMEventToExistentEvent(this.entity.id,this.venueId, this.selectedEvents)
      .then((data) => {

        this.Snack.show(this.gettextCatalog.getString("Events imported successfully."));

        this.cleanData(true);
        
        this.init(data); // reset tabs
        this.entityChanged = true;
        this.hideSpinner();
      }, (err) => {
        this.cleanData();
        this.hideSpinner();
        this.contextualDrawer.cancel(err);
      }); 
    }
    else{
      
      this.ExternalService.importTicketMasterEventToPreoday(this.venueId, this.selectedEvents, this.slots.pickupSlots)
      .then((data) => {

        this.cleanData(true);
        this.hideSpinner();
        this.contextualDrawer.success(data);
      }, (err) => {
        this.cleanData();
        this.hideSpinner();
        this.contextualDrawer.cancel(err);
      }); 
    }   
  }  

  cleanData(cleanLocalData){
    this.selectedEvents = [];
    this.slots.pickupSlots = [];
    
    this.loaded = false;
    this.isEditMode = false;
    this.isImportMode = false;
    this.doneButton = null;
    this.linkToExistentEvent = false;

    if(cleanLocalData)
      this.data= null;
    else if(this.data)   
      this.data.forEach((x) => {x.$selected = false;});
  }

  fetchExternalEvents(){
    this.showSpinner();
    this.ExternalService.getTicketMasterEvents(new Array(this.venueId))
    .then((data) => {  

      this.data = data;

      this.data.forEach((x) => {  
        x.showName = moment(x.eventDate).format('L')+ " - " +x.name,           
        x.$selected = false           
      });

      if(!data || data.length <= 0)
        this.emptyData = true;
      else
        this.emptyData = false;

      this.setContextualProperties();

      this.ExternalService.setHasChanges(false); //reset          
      this.hideSpinner();
    }, () => {
       console.log('Error eventImport service');
    })
  }

  setContextualProperties(){
    if(this.isEditMode){
      this.doneButton = true; 
    }
    else if(this.isImportMode){
      this.doneButton = false;

      if(this.linkToExistentEvent){
        this.cancelBtn = this.gettextCatalog.getString('Back');
        this.importBtn = this.gettextCatalog.getString('Add to event');
      }
      else{
        this.cancelBtn = this.gettextCatalog.getString('Cancel');
        this.importBtn = this.gettextCatalog.getString('Import');
      }
    }

    this.loaded = true;
  }

  showSpinner(){
    this.Spinner.show('drawer-eventsImport');
  }

  hideSpinner(){
    this.Spinner.hide('drawer-eventsImport');
  }

  constructor($scope, $timeout, BroadcastEvents, Spinner, ExternalService, DialogService,$mdSidenav, $stateParams, gettextCatalog, LabelService, contextualDrawer, Snack) {
    "ngInject";
    this.$mdSidenav = $mdSidenav; 
    this.contextualDrawer = contextualDrawer;  
    this.Snack = Snack;
    this.gettextCatalog = gettextCatalog;
    this.DialogService = DialogService;
    this.$timeout = $timeout;
    this.$scope = $scope;   
    this.Spinner = Spinner;
    this.ExternalService = ExternalService;
    this.LabelService = LabelService;

    this.venueId = $stateParams.venueId;
    this.slots = {pickupSlots: []};
    this.selectedEvents = [];

    $scope.$on(BroadcastEvents.ON_CONTEXTUAL_DRAWER_OPEN, (event, args) => {
      if(args.id === 'eventsImport'){
        this.entityChanged = false; 
        this.init();
      }
    });       
  }

  init(paramEvent){
    this.loaded = false; 
    this.entity = paramEvent ? paramEvent : this.ExternalService.getEntityEvent();

    if(!this.entity || this.linkToExistentEvent){

      this.isImportMode = true; 

      if(!this.data || this.ExternalService.getHasChanges()){
        this.fetchExternalEvents();
      }
      else
        this.setContextualProperties();
           
    }
    else{      
      this.isEditMode = true;

      var uniqueId = 0;
      this.entity.externalEvents.forEach((x) => {
        x.id = uniqueId; // cardItemList uses id
        x.showName = moment(x.eventDate).format('L')+ " - " +this.entity.name;
        x.$deleted = false;
        x.$selected = false; 
        uniqueId++;      
      });      
      
      this.setContextualProperties(); 
    }
  }
}
