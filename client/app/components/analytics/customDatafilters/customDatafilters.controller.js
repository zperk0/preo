export default class customDatafiltersController {
  static get UID(){
    return "customDatafiltersController"
  }    

  getSelectedVenuesNames(){   
    var venueNames = "";

    var venues = angular.copy(this.filters.venues);
    
    for(var i = 0; i < venues.length; i++){ 
      venueNames = venueNames + venues[i].name;

      if(venues[i+1]){       
        venueNames += '; ';
      }
    }  
    
    if(venueNames.length > 0)
      return venueNames;
    else
      return "Venue"; // Fix for an bug with md-selected-text in Angular material < 1.1.1
  } 

  onCustomermarketingChange(){

    this.onCustomermarketing({filters: this.filters});
  }

  onEventChange(){
// maybe get Events dates ??? Check with caio
    this.filters.datesRange.startDate = null;
    this.filters.datesRange.endDate = null;   
   
    this.onEvent({filters: this.filters});
  }

  onVenueChange(){

    this.onVenue({filters: this.filters});
  }

  onReportChange(){

    //check if checkbox marketing should be visible: if report has this options AND if view want to treat this value
    if(this.filters.report.hasCustomerMarketing && this.onCustomermarketing){
      this.shouldShowMarketingCheck = true
    } else{
      this.shouldShowMarketingCheck = false;
    }

    //call directive callback to Parent Controller
    this.onReport({filters: this.filters});
  }

  onDaterangeChange(){
   
    var today = moment().format('DD/MM/YYYY');
    
    if(this.selectedDaterange.name == 'By event'){
      this.shouldShowEventfilter = true;
      this.dateRangeChanged = false;      
      
      this.events = this.getEvents();    
    }
    else{
      this.shouldShowEventfilter = false;

      // if old is value = event , set = null now, to do not send filters with inconsistent event value.
      this.filters.event = null;

      //only trigger watch if daterange is not Event
      this.dateRangeChanged = true;
    }

    //Will show From/Until fields displaying datesRange equals to the last option selected before Custom
    if(this.selectedDaterange.name == 'Custom'){
      this.shouldShowCustomDate = true;
    }
    else
      this.shouldShowCustomDate = false;

    if(this.selectedDaterange.name == '1 year'){
      var oneyear = moment().subtract(1, 'year').format('DD/MM/YYYY');
      
      this.filters.datesRange.startDate = oneyear;
      this.filters.datesRange.endDate = today;
    }

    if(this.selectedDaterange.name == 'Last 30 days'){
      var onemonth = moment().subtract(1, 'month').format('DD/MM/YYYY');
      
      this.filters.datesRange.startDate = onemonth;
      this.filters.datesRange.endDate = today;
    }

    if(this.selectedDaterange.name == 'Last 7 days'){
      var oneweek = moment().subtract(7, 'days').format('DD/MM/YYYY');
      
      this.filters.datesRange.startDate = oneweek;
      this.filters.datesRange.endDate = today;
    }

    if(this.selectedDaterange.name == 'Yesterday'){
      var oneday = moment().subtract(1, 'days').format('DD/MM/YYYY');
      
      this.filters.datesRange.startDate = oneday;
      this.filters.datesRange.endDate = today;
      
    }

    if(this.selectedDaterange.name == 'Today'){      
      
      this.filters.datesRange.startDate = today;
      this.filters.datesRange.endDate = today;        
    } 

    //call directive callback to Parent Controller
    //this.onDaterange({item: this.datesRange});
  }

  getVenues(){
    console.log('venue -> ', this.VenueService.venues); 

    // this.OutletService.getOutlets({
    //   venueId: this.VenueService.venues[0].id
    // }).then((data)=>{

    //   this.outlets = data;     
    //   console.log('outlets _> ', this.outlets);

    //   this.hideSpinner();
    // }, () => {

    //   this.hideSpinner();
    // });

    return [{id:1 , name: 'Victory Park'}, 
    {id: 2, name: 'Jasons cafe Long name'}, 
    {id:3 , name: 'General task name name name'}, 
    {id:4, name: 'random'},
    {id:5, name: 'random1'},
    {id:6, name: 'random2'},
    {id:7, name: 'random3'},
    {id:8, name: 'random4'},
    {id:9, name: 'random5'}];
  }

  getDateRange(){
    
    var ranges =[
      {id: 1, name: 'Today'},
      {id: 2, name: 'Yesterday'},
      {id: 3, name: 'Last 7 days'},
      {id: 4, name: 'Last 30 days', default: true},
      {id: 5, name: '1 year'},
      {id: 6, name: 'Custom'}
    ];

    //do not allow this option if directive has no onEvent attr
    if(this.onEvent){     
      ranges.push({id: 7, name: 'By event'});
    }

    return ranges;
  }

  getEvents(){

    // this.$q.all([   
    //   ]).then((results) => {
    //     this.hideSpinner();
    //   }, (err) => {
    //     this.hideSpinner();
    //   });

    this.EventService.getEvents(this.VenueService.currentVenue.id)
    .then((data) => {
      this.eventstest = data;
      console.log(' event foi -> ', data);
    }, (err) => {
      console.log('erro _event ->', err);
    });    

    return [{id: 1, name: 'Event 1'},
    {id: 2, name: 'Opera' },
    {id: 3, name: 'The Beauty and the Beast'},
    {id: 4, name: 'Wolverine'},
    {id: 5, name: 'Random'},
    {id: 6, name: 'No idea'}];
  }

  getReports(){
    return this.reportTypes;    
  }

  initFilters(){

    this.venues = this.getVenues();
    
    //Events will be load only if when user select this option
    this.shouldShowEventfilter = false;   

    if(this.onReport){
      this.shouldShowReportfilter = true;
      this.reports = this.getReports();
    } else {
      this.shouldShowReportfilter = false;
    }

    if(this.onDaterange){
      this.shouldShowDaterange = true;    
      this.dateRangeOptions = this.getDateRange();    
    } else {
      this.shouldShowDaterange = false;
    }

    this.shouldShowCustomDate = false;
    this.shouldShowMarketingCheck = false;

    this.filters = {
      venues: [],
      report: null,
      datesRange: {
        startDate: null,
        endDate: null
      },
      event: null,
      customerMarketing: false
    };
  
   this.dateRangeChanged = false;
   this.selectedDaterange = {};
    
  }

  hideSpinner(){
    this.Spinner.hide('data-filters');
  }

  /* @ngInject */
  constructor($q , $scope, Spinner, Snack, $timeout, CardActionsCodes, VenueService , OutletService, EventService) {
  	'ngInject';
   
    this.Spinner = Spinner;
    this.Snack = Snack; 
    this.$timeout = $timeout;  
    this.cardActionsCodes = CardActionsCodes;
    this.VenueService = VenueService;
    this.Spinner = Spinner;
    this.OutletService = OutletService;
    this.EventService = EventService;
    this.$q = $q;
  
    this.Spinner.show('data-filters');   

    //this.$scope = $scope;
    this.initFilters(); 
   
    $scope.$watch(
      () => { return this.filters.datesRange; }, 
      function(newValue, oldValue){
        
        if(this.dateRangeChanged === true){          
          
          this.onDaterange({filters: this.filters});        
        }
      }.bind(this),
      true
    );

  }

}
