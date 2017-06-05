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
      return;
    }

    var events = this.selectedEvents;

    this.cleanData();

    this.data = null;
    this.contextualDrawer.success(events);
   // this.ExternalService.importTicketMasterEventToPreoday(this.venueId, this.inputName, events)
   // .then((data) => {

   //   this.contextualDrawer.success(data);
   // }, (err) => {
   //   this.cleanData();
   //   this.contextualDrawer.cancel(err);
   // });   
  }

  cleanData(){
    this.selectedEvents = [];
    this.inputname = "";

    this.data.forEach((x) => {x.$selected = false;});
  }

  showSpinner(){
    this.Spinner.show('drawer-eventsImport');
  }

  hideSpinner(){
    this.Spinner.hide('drawer-eventsImport');
  }

  constructor($scope, $timeout, OutletService, Spinner, ExternalService, $stateParams,$mdSidenav, contextualDrawer, Snack) {
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

    $scope.$on('mdSideNavisOpen', (event, args) => {
   
      if(args.id === 'eventsImport' && !this.data){
        this.init();
      }
    });       
  }

  init(){
    this.showSpinner();
    //this.ExternalService.getTicketMasterEvents(new Array(this.venueId))
     this.OutletService.getOutlets({
       venueId: this.venueId
     }).then((data)=>{

       console.log('Event service impot data READY', data);

       this.data = data.outlets;
       this.data.forEach((x) => {x.$selected = false;});
       
       this.hideSpinner();      
    }, () => {
       console.log('Error eventImport service');
     })
  }
}
