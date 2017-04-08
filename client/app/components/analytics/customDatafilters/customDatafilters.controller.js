export default class customDatafiltersController {
  static get UID(){
    return "customDatafiltersController"
  }    

  getSelectedVenuesNames(){   
    var venueNames = "";

    var venues = angular.copy(this.selectedVenues);
    
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

  onOpenSelect(select){

    var tooltipEl = document.getElementsByClassName('md-select-menu-container md-default-theme md-active md-clickable')[0];
    var selectVen = document.getElementById('selectVenue');
    var wid = window.getComputedStyle(selectVen,null).getPropertyValue("width");
    console.log('selectbox -> ', tooltipEl);

//console.log('width -> ', tooltipEl.style.minWidth );
    //console.log('left -> ', tooltipEl.style.left );
  //  tooltipEl.style.minWidth = wid;
   // console.log(' element atuz -> ', tooltipEl.style.minWidth);
   // console.log(' element atuz aa-> ', tooltipEl);
   // tooltipEl.style.left = tooltipEl.style.left - 25 + 'px';
  }

  onDaterangeChange(){   

    if(this.selectedDaterange.id == 7)
      this.shouldShowEventfilter = true;
    else
      this.shouldShowEventfilter = false;

    this.onDaterange({item: this.selectedDaterange});
  }

  onReportChange(){

    //check if checkbox marketing should be visible: if report has this options AND if view want to treat this value
    if(this.selectedReport.customerMarketing && this.onCustomermarketing){
      this.shouldShowMarketingCheck = true
    } else{
      this.shouldShowMarketingCheck = false;
    }

    this.onReport({item: this.selectedReport});
  }

  getVenues(){
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

  getDateRangeOptions(){
    return [{id: 1, name: 'Today'},
    {id: 2, name: 'Yesterday'},
    {id: 3, name: 'Last 7 days'},
    {id: 4, name: 'Last 30 days'},
    {id: 5, name: '1 year'},
    {id: 6, name: 'Custom'},
    {id: 7, name: 'By event'}];
  }

  getEvents(){
    return [{id: 1, name: 'Event 1'},
    {id: 2, name: 'Opera' },
    {id: 3, name: 'The Beauty and the Beast'},
    {id: 4, name: 'Wolverine'},
    {id: 5, name: 'Random'},
    {id: 6, name: 'No idea'}];
  }

  getReports(){ // Falar com caio....trazer tudo isso do BD...inclusive os actions q ele permite ja
    return[{id: 1, name:'All items sold' , actions: [this.cardActionsCodes.EXPORT_CSV, this.cardActionsCodes.EXPORT_PDF], customerMarketing: false},
    {id: 2, name:'Items increasing in popularity' , actions: [this.cardActionsCodes.EXPORT_CSV, this.cardActionsCodes.EXPORT_PDF], customerMarketing: false},
    {id: 3, name:'All paying Customers' , actions: [this.cardActionsCodes.EXPORT_CSV, this.cardActionsCodes.EXPORT_PDF , this.cardActionsCodes.PUSH_NOTIFICATION], customerMarketing: true},
    {id: 4, name:'1Report 4' , actions: [this.cardActionsCodes.EXPORT_CSV, this.cardActionsCodes.EXPORT_PDF], customerMarketing: true},
    {id: 5, name:'Report 5' , actions: [this.cardActionsCodes.EXPORT_CSV, this.cardActionsCodes.EXPORT_PDF], customerMarketing: true},
    {id: 6, name:'Report 6' , actions: [this.cardActionsCodes.EXPORT_CSV, this.cardActionsCodes.EXPORT_PDF], customerMarketing: true}];
  }

  initFilters(){

    if(this.onEvent){
      this.shouldShowEventfilter = true;
      this.events = this.getEvents();
    } else {
      this.shouldShowEventfilter = false;
    }

    if(this.onReport){
      this.shouldShowReportfilter = true;
      this.reports = this.getReports();
    } else {
      this.shouldShowReportfilter = false;
    }

    if(this.onDaterange){
      this.shouldShowDaterange = true;
      this.dateRangeOptions = this.getDateRangeOptions();
      this.defaultDaterange = 'Last 30 days';
    } else {
      this.shouldShowDaterange = false;
    }

    //if(this.onCustomermarketing){
    //  this.shouldShowMarketingCheck = true;
   // } else {
      this.shouldShowMarketingCheck = false;
   // }

    this.customersMarketing = false;
    this.venues = this.getVenues();  

    this.selectedVenues = [];
    this.selectedDaterange = {};
    this.selectedEvent = {};  
    
  }

  /* @ngInject */
  constructor(Spinner, Snack, $timeout, CardActionsCodes ) {
  	'ngInject';
   
    this.Spinner = Spinner;
    this.Snack = Snack; 
    this.$timeout = $timeout;  
    this.cardActionsCodes = CardActionsCodes; 

    this.initFilters();   

  }
}
