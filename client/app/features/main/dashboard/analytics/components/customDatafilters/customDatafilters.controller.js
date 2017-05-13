export default class customDatafiltersController {
  static get UID(){
    return "customDatafiltersController"
  }

  debounce(func, wait, immediate) {
    console.log("debouncing");
    return () => {
      var context = this, args = arguments;
      var later = function() {
        context.debounceTimeout = null;
        console.log("in later", immediate)
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !context.debounceTimeout;
      clearTimeout(context.debounceTimeout);
      context.debounceTimeout = setTimeout(later, wait);
      console.log("if call now", callNow);
      if (callNow) func.apply(context, args);
    };
  }

  debounceSearchEvent(){
    this.debounce(this.getEvents.bind(this), 400)();
  }

  debounceUpdate(debounce, typeFilter){

    this.typeChanged = typeFilter;

    // Debounce only for Venues and Events (multiselects)
    if(debounce)
      this.debounce(
        this.updateFiltersToController.bind(this)
      , 800)();
    else
      this.updateFiltersToController();
  }

  // Venues and Events are multiselect. So they call update on Close event.
  // But dont want call update if venues inside didnt change.
  checkIfVenueChanged(){
    let arrayCombined = this.onOpenVenueArray.concat(this.selectedVenues);
    arrayCombined.sort((a, b) => {
      if(a.id > b.id) return 1;
      if(a.id < b.id) return -1;
      return 0;
    });

    let changed = arrayCombined.length > 1 ? false : true;
    for(var i=0; i < arrayCombined.length - 1; i+=2){
      if(arrayCombined[i].id != arrayCombined[i+1].id){

        changed = true;
        break;
      }
    }

    return changed;
  }

  // Venues and Events are multiselect. So they call update on Close event.
  // But dont want call update if venues inside didnt change.
  checkIfEventChanged(){
    let arrayCombined = this.onOpenEventArray.concat(this.filters.events);
    arrayCombined.sort((a, b) => {
      if(a.occurId > b.occurId) return 1;
      if(a.occurId < b.occurId) return -1;
      return 0;
    });

    let changed = arrayCombined.length > 1 ? false : true;
    for(var i=0; i < arrayCombined.length - 1; i+=2){

      if(arrayCombined[i].occurId != arrayCombined[i+1].occurId){

        changed = true;
        break;
      }
    }

    return changed;
  }

  //Send filters to Controller
  updateFiltersToController(){
    this.onFilter({filters: this.filters, typeChanged: this.typeChanged})
  }

  getSelectedVenuesNames(){
    var venueNames = "";

    var venues = angular.copy(this.selectedVenues);
    venues.sort(this.compareObjectVenue);

    for(var i = 0; i < venues.length; i++){
      venueNames = venueNames + venues[i].name;

      if(venues[i+1]){
        venueNames += ', ';
      }
    }

    if(venueNames.length > 0)
      return venueNames;
    else
      return "Venue"; // Fix for an bug with md-selected-text in Angular material < 1.1.1
  }

  getSelectedEventsNames(){
    var eventsNames = "";

    var events = angular.copy(this.filters.events);
    events.sort(this.compareObjectEvent);

    for(var i = 0; i < events.length; i++){
      eventsNames = eventsNames + events[i].showName;

      if(events[i+1]){
        eventsNames += ', ';
      }
    }

    if(eventsNames.length > 0)
      return eventsNames;
    else
      return "Event"; // Fix for an bug with md-selected-text in Angular material < 1.1.1
  }

  // Format Venue array to be returned to the Controller as an Object 
  // venue: { id: ...., outlets:[]}
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
          isEventVenue: topVenue.isEventVenue,
          hasApplication: topVenue.hasApplication
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
          isEventVenue: v.isEventVenue,
          hasApplication: v.hasApplication,
          outlets: []
        };

        outlets.forEach((o) => {
          if(o.group === v.group)
            venue.outlets.push(o);
        });

      this.filters.venues.push(venue);
    });
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

  onOpenVenue(){
    // array used only to compare on Close event
    this.onOpenVenueArray = angular.copy(this.selectedVenues);
    this.scope.onOpenVenue();
  }

  onVenueClose(){

    if(this.selectedVenues.length <= 0)
      return;

    if(!this.checkIfVenueChanged())
      return;

    if(this.filters.report && this.filters.report.hasItemFilter){
      this.filters.item = null;
      this.getItemsFilter();
    }
    else{
      this.reportItems = null;
    }

    this.getReports();
    this.getDateRange();
    this.debounceUpdate(false, 'Venue');
  }

  onOpenEvent(){
    // array used only to compare on Close event
    this.onOpenEventArray = angular.copy(this.filters.events);
    this.scope.onOpenEvent();
  }

  onEventClose(){

    if(this.filters.events.length <= 0)
      return;

    if(!this.checkIfEventChanged())
      return;

    this.debounceUpdate(false, 'Event');   
  }

  eventSearchUp(){

    if(this.eventSearchTerm.length < 4){

      //if search is empty, shows initial values
      if(this.eventSearchTerm.length == 0)
        this.filteredEvents = angular.copy(this.events);

      return;
    }

    this.debounceSearchEvent();    
  }

  // fix bug with event keyDown of md-header input
  eventSearchDown(event){
    event.stopPropagation();
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

    // aux array containing values selected TO compare on NEXT onChange callback
    this.selectedVenuesOld = angular.copy(this.selectedVenues);

    // multivalue select, will debounce at close event
    //format this.filters.values to send venues as a clean object
    this.formatVenuesValues();
    this.isVenueChanged = true;
  }

  onCustomermarketingChange(){

    this.debounceUpdate(false,'CustomerMarketing');
  }

  onEventChange(){
    this.filters.datesRange.startDate = null;
    this.filters.datesRange.endDate = null;

    // multivalue select, will debounce at close event
  }

  onReportChange(){

    if(!this.filters.report)
      return;
    //check if checkbox marketing should be visible: if report has this option
    if(this.filters.report.hasCustomerMarketing){
      this.shouldShowMarketingCheck = true
    } else{
      this.shouldShowMarketingCheck = false;
    }

    //check if filter item should be visible: if report has this option
    if(this.filters.report.hasItemFilter){
      this.shouldShowItemFilter = true;

      if(!this.reportItems)
        this.getItemsFilter();

    } else {
      this.shouldShowItemFilter = false;
      this.filters.item = null;
    }

    this.debounceUpdate(false,'Report');
  }

  onDaterangeChange(){

    //save last option selected to use with Custom type
    if(this.selectedDaterange.start && this.selectedDaterange.end){

      this.lastDataSelected.start = this.selectedDaterange.start;
      this.lastDataSelected.end = this.selectedDaterange.end;
    }

    if(this.selectedDaterange.type == 'event'){
      this.shouldShowEventfilter = true;
      this.dateRangeChanged = false;

      if(this.events.length <= 0)
        this.getEvents();
    }
    else{
      this.shouldShowEventfilter = false;

      // if old is value = event , set = null now, to do not send filters with inconsistent event value.
      this.filters.events = [];

      //only trigger watch if daterange is not Event
      this.dateRangeChanged = true;
    }

    //Will show From/Until fields displaying datesRange equals to the last option selected before Custom
    if(this.selectedDaterange.type == 'custom'){
      this.shouldShowCustomDate = true;
    }
    else
      this.shouldShowCustomDate = false;

    this.filters.datesRange.startDate = this.lastDataSelected.start;
    this.filters.datesRange.endDate = this.lastDataSelected.end;

  }

  onItemChange(){

    this.debounceUpdate(false, 'Item');
  }

  compareObjectVenue(obj1, obj2){

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

  compareObjectEvent(obj1, obj2){

    if(obj1.startDate > obj2.startDate)
        return 1;
    if(obj2.startDate > obj1.startDate)
        return -1;

    return 0;
  }

  // necessary to know when to show Push Notification Action in reports.
  getVenuesApplications(venueIds){
    return this.$q((resolve, reject) => {
      this.ReportsService.getVenuesApplications(venueIds)
      .then((data) => {

        this.venues.forEach((venue) => {
          data.forEach((app) => {
            if(app.venueId == venue.id)
              venue.hasApplication = true;
          });

        });
        resolve();
        this.selectedVenues = angular.copy(this.venues);
      }, (err) => {
        console.log('Error fetching venue application', err);
        reject();
      });
    });
  }

  // Everytime venue select changes, i need to know if it has an Event or Takeaway venues selected
  // to show correct options in Reports and Date range filters.
  getVenueSelectedTypes(){
    var takeaway = false;
    var event = false;

    var hasEventVenue = this.selectedVenues.forEach((venue) => {
      if(venue.type=='venue' && venue.isEventVenue)
        event = true;
      else if(venue.type=='venue' && !venue.isEventVenue)
        takeaway = true;
    });

    return {hasTakeaway: takeaway, hasEvent: event};
  }

  getItemsFilter(){
    //this.reportItems = [{menuItemId:8972, name:'Item1'}, {menuItemId:922201, name:'Item7'}, {menuItemId:922229, name:'Item2'}, {menuItemId:922228, name:'Item3'}, {menuItemId:922235, name:'Item4'}, {menuItemId:980758, name:'Item5'}];
    if(!this.spinnerRunning())
      this.showSpinner();

    var params = { venues: this.filters.venues}

    this.ReportsService.getMenuItemsByVenues(params)
    .then((data) => {

      this.reportItems = data;

      this.hideSpinner();

    }, (err) => {
      console.log('Error fetching items from venues ', err);
      this.hideSpinner();
    });
  }

// To make Venues and Outlets selectable on the same MD-SELECT, the same array will contain venues + outlets
// Fields: group -> to keep venues and it owns outlets grouped
//         type -> to know which object in array is an outlet / venue
//         selected -> default always come all selected
  getVenues(){

    var localVenue = {};
    var localOutlet = {};
    var venuesIds = [];
    this.VenueService.venues.forEach((venue) => {

      venuesIds.push(venue.id);
      localVenue = {
        id: venue.id,
        name: venue.name,
        isEventVenue: venue.eventFlag == 1 ? true : false,
        hasApplication: false,
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

    this.venues.sort(this.compareObjectVenue);
    return this.getVenuesApplications(venuesIds);
  }

  getDateRange(){

    var venueTypes = this.getVenueSelectedTypes();

    var today = moment().format('L');

    var ranges =[
      {id: 1, type: 'today',      name: this.getTextCatalog.getString('Today'),
       start: today, end: today},
      {id: 2, type: 'minus1day',  name: this.getTextCatalog.getString('Yesterday'),
       start: moment().subtract(1, 'year').format('L'), end: today},
      {id: 3, type: 'minus7days', name: this.getTextCatalog.getString('Last 7 days'),
       start: moment().subtract(7, 'days').format('L'), end: today},
      {id: 4, type: 'minus30days',name: this.getTextCatalog.getString('Last 30 days'),  default: true,
       start: moment().subtract(30, 'days').format('L'), end: today},
      {id: 5, type: 'minus1year', name: this.getTextCatalog.getString('1 year'),
       start: moment().subtract(1, 'year').format('L'), end: today},
      {id: 6, type: 'custom',     name: this.getTextCatalog.getString('Custom')}
    ];

    //do not allow this option if has no Event venue selected
    if(venueTypes.hasEvent){
      ranges.push({id: 7, type:'event', name: this.getTextCatalog.getString('By event')});
    }

    //will only update dateOptions array, if it had event selected before, and now has no more this options available
    // OR its init page
    if( !this.dateRangeOptions || (this.selectedDaterange.type == 'event' && !venueTypes.hasEvent))
      this.dateRangeOptions = ranges;
    // if event is selected, update Events
    else if(this.selectedDaterange.type == 'event' && venueTypes.hasEvent)
      this.getEvents();
  }

  getEvents(){

    this.showSpinner();

    var eventsFetched = [];

    var paramNameSearch = null;

    if(this.eventSearchTerm && this.eventSearchTerm.length > 0 )
      paramNameSearch = this.eventSearchTerm;

    var venueIds=[];
    for(var i=0;i<this.filters.venues.length;i++){  
   
      if(this.filters.venues[i].isEventVenue)   
        venueIds.push(this.filters.venues[i].id);
    }

    this.EventService.getByVenuesIdsAndName(venueIds, paramNameSearch)
    //this.EventService.getEvents(this.VenueService.currentVenue.id)
    .then((data) => {

      data.forEach((event, i)=> {
        let objEvent = {};
        objEvent.id = event.id;
        objEvent.name = event.name;

        let currentSchedules = event.schedules;
        currentSchedules.forEach((schedule, j) => {
          let currentOccur = schedule.occurrences;
          currentOccur.forEach((occur) => {

            let objOccur = {};
            objOccur.id = objEvent.id;
            objOccur.name = objEvent.name;
            objOccur.startDate = occur.date;
            objOccur.occurId = occur.id;
            objOccur.showName = moment(occur.date).format('L') +" "+moment(occur.date).format('LT') +' - ' + objEvent.name;

            eventsFetched.push(objOccur);
          });

        });

      });
      
      // lets keep a copy of all events. So its not necessary search everytime that user clean search
      if(!paramNameSearch){
        this.events = eventsFetched;
      }

      this.filteredEvents = eventsFetched;

      this.hideSpinner();
    }, (err) => {
      this.hideSpinner();
    });
  }

  getReports(){

    var venueTypes = this.getVenueSelectedTypes();

    var venueWithAppId = false;
    for(var i=0; i < this.selectedVenues.length; i++ ){
      if(this.selectedVenues[i].hasApplication){
        venueWithAppId = true;
        break;
      }
    }

    var options = {
      hasEventVenue: venueTypes.hasEvent,
      hasTakeawayVenue: venueTypes.hasTakeaway,
      hasApplicationId: venueWithAppId
    };

    // let oldReport = null;
    // if(this.filters.report)
    //   oldReport = angular.copy(this.filters.report);
    // else // clean service data when init page.
    //   this.ReportsService.clearData();

    //clean data at first time 
    if(!this.fitlers.report)
      this.ReportsService.clearData();

    this.ReportsService.getReports(this.reportTypes, options)
    .then((newReports) => {
      this.reports = newReports;

      // let matchReport = false;
      // if(oldReport){
      //   newReports.forEach((x) => {
      //     if(x.id == oldReport.id){
      //       matchReport = true;
      //     }
      //   });
      // }

      // if(matchReport)
      //   this.filters.report = oldReport;

    });
  }

  initFilters(){

    this.venues = [];
    this.events = [];
    this.dateRangeChanged = false;
    this.selectedDaterange = {};
    this.selectedVenues = [];
    this.selectedVenuesOld= [];

    this.lastDataSelected = {
      start: {},
      end: {}
    };

    this.filters = {
      venues: [],
      report: null,
      datesRange: {
        startDate: null,
        endDate: null
      },
      events: [],
      customerMarketing: false
    };

    this.eventSearchTerm = '';

    this.shouldShowCustomDate = false;
    this.shouldShowMarketingCheck = false;
    this.shouldShowEventfilter = false;

    this.getVenues()
    .then(() => {

      if(this.hasDaterange){
        this.shouldShowDaterange = true;
        this.getDateRange();
      } else {
        this.shouldShowDaterange = false;
      }

      if(this.hasReport){
        this.shouldShowReportfilter = true;
        this.getReports();
      } else {
        this.shouldShowReportfilter = false;
      }

    }, () => {

    });

  }

  hideSpinner(){
    this.spinner.hide('data-filters');
  }

  spinnerRunning(){
    return this.spinner.isCodeVisible('data-filters');
  }

  showSpinner(){
    this.spinner.show('data-filters');
  }

  /* @ngInject */
  constructor($q , $scope, Spinner, Snack, $timeout, VenueService , EventService, ReportsService, gettextCatalog) {
  	'ngInject';

    this.spinner = Spinner;
    this.Snack = Snack;
    this.$timeout = $timeout;

    this.VenueService = VenueService;
    this.Spinner = Spinner;
    this.EventService = EventService;
    this.$q = $q;
    this.scope = $scope;
    this.getTextCatalog = gettextCatalog;
    this.ReportsService = ReportsService;

    this.initFilters();

    //Watch created -> because customDatePicker modify dateRange too
    $scope.$watch(
      () => { return this.filters.datesRange; },
      function(newValue, oldValue){

        if(this.dateRangeChanged === true){

          this.debounceUpdate(false,'DateRange');
        }
      }.bind(this),
      true
    );

  }

}
