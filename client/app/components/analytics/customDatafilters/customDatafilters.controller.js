export default class customDatafiltersController {
  static get UID(){
    return "customDatafiltersController"
  }    

  getSelectedVenuesNames(){   
    var venueNames = "";
    
    var venues = angular.copy(this.selectedVenues);
    venues.sort(this.compareObject);
    
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
   
    this.onFilter({filters: this.filters, typeChanged: 'CustomerMarketing'});
  }

  onEventChange(){
    this.filters.datesRange.startDate = null;
    this.filters.datesRange.endDate = null;     
   
    this.onFilter({filters: this.filters, typeChanged: 'Event'});
  } 

  findElement(v, arrayV){
    var contains = false;

    for(var i =0; i < arrayV.length; i++ ) {      
      if(arrayV[i].id == v.id){
        contains = true;
        break;
      }
    }

    return contains;
  }

  // Format Venue array to be returned to the Controller
  formatVenuesValues(){
    var venues = this.selectedVenues.filter((v) => {
      if(v.type == 'venue')
        return v;
    });

    var outlets = this.selectedVenues.filter((v) => {
      if(v.type == 'outlet')
        return v;
    });

    //first verify if Venue was selected. IF NOT...add venue info to array to be returned to the Controller
    outlets.forEach((o) => {
      var v = venues.filter((i) => {
        if(i.type == 'venue' && i.group === o.group){
          return i;
        }
      });
     
      if(v.length <= 0){
        var topVenue = this.venues.filter((i) => {
          if(i.type == 'venue' && i.group === o.group){
            return i;
          }
        })[0];
       
        v = {
          id: topVenue.id,
          name: topVenue.name,
          type: 'venue',
          group: topVenue.group,
        };
      
        venues.push(v);
      }
    });

    this.filters.venues = [];

    var venue = {};

    venues.forEach((v) => {      
        venue = {
          id: v.id,
          name: v.name,
          outlets: []
        };

        outlets.forEach((o) => {
          if(o.group === v.group)
            venue.outlets.push(o);
        });

      this.filters.venues.push(venue);
    });
  }

  onVenueChange(){    

    var filteredVenues = angular.copy(this.selectedVenues);
  
    // get venues Checked on last onChange callback TO compare with new values coming
    var venuesRootOld = this.selectedVenuesOld.filter((x) => { 
      if(x.type === 'venue')
        return x;
    });

    venuesRootOld.forEach((v) => {
      //if not checked now AND was checked before. Means need uncheck ALL his childs
      if(!this.findElement(v, this.selectedVenues)){     

        this.selectedVenues = filteredVenues.filter((x) => { 
                if(x.group != v.group)
                  return x;
        });       
      }

    });
   
    filteredVenues = angular.copy(this.selectedVenues);   

    this.selectedVenues.forEach((v) => {

      v.selected = true;

     
      var totalChilds = this.venues.filter((x) => {
          if(x.group === v.group && x.type === 'outlet'){
              return x;
            }
        }).length;

      var totalCheckedChilds = filteredVenues.filter((x) => {
          if(x.group === v.group && x.type === 'outlet'){
              return x;
            }
        }).length;

        // if checked now AND was already checked before. AND childsSelected != total group Childs. Means some child was unchecked
      if(v.type == 'venue' && this.findElement(v, this.selectedVenuesOld)){ 
          if(totalChilds !== totalCheckedChilds){
            this.selectedVenues = filteredVenues.filter((x) => { 
              if(x.id != v.id)
                return x;
            });
           
          }
      }

        //if checked now AND was not checked before. Means need check ALL his childs.
      if(v.type == 'venue' && !this.findElement(v, this.selectedVenuesOld)){   
          this.venues.forEach((x) => {            

            if(x.group === v.group && x.type ==='outlet'){

              if(!x.selected)
                this.selectedVenues.push(x);
            }           
            
           
          });
      }     
       
        //if ALL childs checked. Means need check root venue
      if(totalChilds === totalCheckedChilds){    
          
          this.venues.forEach((x) => {            

            if(x.group === v.group && x.type ==='venue'){

              if(!x.selected)
                this.selectedVenues.push(x);             
            }
          });
      }    

    });

    this.venues.forEach((v) => {
      if(!this.findElement(v, this.selectedVenues)){
        v.selected = false;
      }
    });
 
    // aux array containing values selected TO compare on next onChange callback
    this.selectedVenuesOld = angular.copy(this.selectedVenues);

    //format this.filters.values to send venues as a clean object
    this.formatVenuesValues();
    
    this.onFilter({filters: this.filters, typeChanged: 'Venue'});
  }

  onReportChange(){

    //check if checkbox marketing should be visible: if report has this options AND if view want to treat this value
    if(this.filters.report.hasCustomerMarketing){
      this.shouldShowMarketingCheck = true
    } else{
      this.shouldShowMarketingCheck = false;
    }

    //call directive callback to Parent Controller
    //this.onReport({filters: this.filters});
    this.onFilter({filters: this.filters, typeChanged: 'Report'});
  }

  onDaterangeChange(){
   
    var today = moment().format('DD/MM/YYYY');
    
    if(this.selectedDaterange.name == 'By event'){
      this.shouldShowEventfilter = true;
      this.dateRangeChanged = false;      
      
      this.getEvents();    
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
  }

  compareObject(obj1, obj2){

    if(obj1.group > obj2.group)
        return 1;
    if(obj2.group > obj1.group)
        return - 1; 

    if(obj1.type == 'venue' && obj2.type != 'venue')
        return -1;
    if(obj2.type == 'venue' && obj1.type != 'venue')
        return 1;

    if(obj1.name > obj2.name)
        return 1;
    if(obj2.name > obj1.name)
        return -1;

    return 0;
  }

// To make Venues and Outlets selectable on the same MD-SELECT, the same array will contain venues + outlets
// Fields: group -> to keep venues and it owns outlets grouped
//         type -> to know which object in array is an outlet / venue
//         selected -> default always come all selected
  getVenues(){   

    var localVenue = {};
    var localOutlet = {};
    this.VenueService.venues.forEach((venue) => {
      
      localVenue = {
        id: venue.id,
        name: venue.name,
        type: 'venue',
        group: venue.name.substring(0,4).toUpperCase()+ venue.id,        
        selected: true      
      };      
      this.venues.push(localVenue);

      venue.outlets.forEach((outlet) => {
        localOutlet = {
          id: outlet.id,
          name: outlet.name,
          type: 'outlet',
          group: venue.name.substring(0,4).toUpperCase()+ venue.id,         
          selected: true
        };

        this.venues.push(localOutlet);
      });
    });

    this.venues.sort(this.compareObject);
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

    //do not allow this option if venue is not Event
    if(this.isEventVenue){     
      ranges.push({id: 7, name: 'By event'});
    }

    return ranges;
  }

  getEvents(){

    this.Spinner.show('data-filters');

    this.EventService.getEvents(this.VenueService.currentVenue.id)
    .then((data) => {
      this.events = data.events;      
      this.hideSpinner();
    }, (err) => {  
      this.hideSpinner();
    });    
  }

  getReports(){
    return this.reportTypes;    
  }

  initFilters(){

    this.isEventVenue = this.VenueService.currentVenue.eventFlag == 1 ? true : false;

    this.venues = [];
    this.events = [];

    this.getVenues();
    
    //Events will be load only if when user select this option
    this.shouldShowEventfilter = false;   

    if(this.hasReport){
      this.shouldShowReportfilter = true;
      this.reports = this.getReports();
    } else {
      this.shouldShowReportfilter = false;
    }

    if(this.hasDaterange){
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
   this.selectedVenues = [];
   this.selectedVenuesOld= [];
    
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
    this.scope = $scope;    

    console.log('report type -> ', this.reportTypes);
    //this.$scope = $scope;
    this.initFilters(); 
   
    $scope.$watch(
      () => { return this.filters.datesRange; }, 
      function(newValue, oldValue){
        
        if(this.dateRangeChanged === true){        
        
          this.onFilter({filters: this.filters, typeChanged: 'DateRange'});       
        }
      }.bind(this),
      true
    );

  }

}
