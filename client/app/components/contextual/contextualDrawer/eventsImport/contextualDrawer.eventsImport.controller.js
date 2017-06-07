export default class contextualDrawerEventsImportController {
  static get UID(){
    return "contextualDrawerEventsImport";
  }

  close(){

    this.cleanData();
    this.contextualDrawer.cancel();
  }

  selectEvent (event) {

    if(event.$selected){
      event.$selected = false;
      let index = this.selectedEvents.indexOf(event);
      this.selectedEvents.splice(index, 1);
    }
    else{
      event.$selected = true;
      this.selectedEvents.push(event);
    }    
     
  }

  done () {

    if(this.nameForm.$invalid){
      if(this.selectedTab !== 0)
        this.selectedTab = 0;
      return;
    }

    if(!this.slots.pickupSlots.length){
      if(this.selectedTab !== 1)
        this.selectedTab = 1;

      return;
    }

    this.showSpinner();
    this.ExternalService.importTicketMasterEventToPreoday(this.venueId, this.inputName, this.selectedEvents, this.slots.pickupSlots)
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

  formatResponse(data){
    var response = [];

    data.forEach((x) => {
      let obj = {
        id: x.id,
        domain_id: x.domain_id,
        name: x.name,
        showName: moment(x.eventTime).format('L')+ " - " +x.name,
        eventTime: x.eventTime,
        $selected: false
      };

      response.push(obj);
    });

    this.data = response;

    if(!data || data.length <= 0)
      this.emptyData = true;
    else
      this.emptyData = false;

    this.loaded = true;
  }

  cleanData(emptyData){
    this.selectedEvents = [];
    this.inputname = "";
    this.slots.pickupSlots = [];

    if(emptyData)
      this.data= null;
    else
      this.data.forEach((x) => {x.$selected = false;});
  }

  showSpinner(){
    this.Spinner.show('drawer-eventsImport');
  }

  hideSpinner(){
    this.Spinner.hide('drawer-eventsImport');
  }

  constructor($scope, $timeout, OutletService, BroadcastEvents, Spinner, ExternalService, $stateParams,$mdSidenav, contextualDrawer, Snack) {
    "ngInject";
    this.$mdSidenav = $mdSidenav;
    this.cancelledOutlets = [];
    this.contextualDrawer = contextualDrawer;  
    this.Snack = Snack;  
    this.selectedEvents = [];
    this.$timeout = $timeout;
    this.$scope = $scope;
    this.OutletService = OutletService;
    this.Spinner = Spinner;
    this.ExternalService = ExternalService;

    this.venueId = $stateParams.venueId;
    this.slots = {pickupSlots: []};

    $scope.$on(BroadcastEvents.ON_CONTEXTUAL_DRAWER_OPEN, (event, args) => {
      if(args.id === 'eventsImport' && !this.data){
        this.loaded = false;
        this.init();
      }
    });       
  }

  init(){
    this.showSpinner();
    this.ExternalService.getTicketMasterEvents(new Array(this.venueId))
    .then((data) => {  

      this.formatResponse(data);

      this.hideSpinner();      
    }, () => {
       console.log('Error eventImport service');
     })
  }
}
