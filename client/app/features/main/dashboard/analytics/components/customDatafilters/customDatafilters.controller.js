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

  debounceUpdate(typeFilter, debounce){

    this.typeChanged = typeFilter;

    if(debounce)
      this.debounce(this.updateFiltersToController.bind(this) ,200)();
    else
      this.updateFiltersToController();
  }

  // Venues and Events are multiselect. So they call update on Close event.
  // But dont want call update if venues inside didnt change.
  checkIfVenueChanged(){

    if(this.onOpenVenueArray.length != this.selectedVenues.length)
      return true;

    let arrayCombined = this.onOpenVenueArray.concat(this.selectedVenues);
    arrayCombined.sort((a, b) => {
      if(a.uniqueId > b.uniqueId) return 1;
      if(a.uniqueId < b.uniqueId) return -1;

      return 0;
    });

    let changed = false;
    if(arrayCombined.length <= 1 || arrayCombined.length % 2 > 0)
      return true;

    for(var i=0; i < arrayCombined.length - 1; i+=2){
      if(arrayCombined[i].uniqueId != arrayCombined[i+1].uniqueId){
        changed = true;
        break;
      }
    }

    return changed;
  }

  // Venues and Events are multiselect. So they call update on Close event.
  // But dont want call update if venues inside didnt change.
  checkIfEventChanged(){

    if(this.onOpenEventArray.length != this.filters.events.length)
      return true;

    let arrayCombined = this.onOpenEventArray.concat(this.filters.events);
    arrayCombined.sort((a, b) => {
      if(a.occurId > b.occurId) return 1;
      if(a.occurId < b.occurId) return -1;
      return 0;
    });

    let changed = false;
    if(arrayCombined.length <= 1 || arrayCombined.length % 2 > 0)
      return true;

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
    var venueNames = [];

    var venues = angular.copy(this.selectedVenues);
    venues.sort(this.compareObjectVenue);

    for(var i = 0; i < venues.length; i++){
      if(venues[i].display){
        venueNames.push(venues[i].name);
      }
    }

    if(venueNames.length > 0)
      return venueNames.join(", ");
    else
      return this.gettextCatalog.getString("All Venues"); // if there is NO venue selected, get ALL venues
  }

  getSelectedEventsNames(){

    var eventsCount = this.filters.events.length;

    if(eventsCount > 0 && eventsCount <= 1)
      return this.filters.events[0].showName;
    if(eventsCount > 1)
      return this.gettextCatalog.getString( eventsCount + " events selected");
    else
      return this.gettextCatalog.getString("Event"); // Fix for an bug with md-selected-text in Angular material < 1.1.1
  }

  // Format Venue array to be returned to the Controller as an Object
  // venue: { id: ...., outlets:[]}
  formatVenuesValues(){
    var venues = [];
    var outlets = [];
    if(this.selectedVenues.length > 0){
      venues = this.selectedVenues.filter((v) => {
        if(v.type == 'venue')
          return v;
      });

      outlets = this.selectedVenues.filter((v) => {
        if(v.type == 'outlet')
          return v;
      });
    }
    else{
      venues = this.venues.filter((v) => {
        if(v.type == 'venue')
          return v;
      });

      outlets = this.venues.filter((v) => {
        if(v.type == 'outlet')
          return v;
      });
    }

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

  findElementById(value, arrayV){
    var contains = false;

    for(var i =0; i < arrayV.length; i++ ) {
      if(arrayV[i].uniqueId == value){
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

    if(!this.checkIfVenueChanged())
      return;

    if(this.filters.report && this.filters.report.hasItemFilter){
      this.getItemsFilter()
      .then(() => {
        if(this.hasReport){
          this.getReports();
        }

        if(this.hasDaterange){
          this.getDateRange();
        }

        this.debounceUpdate('Venue', true);
      });
    }
    else{
      this.reportItems = null;
      if(this.hasReport){
        this.getReports();
      }

      if(this.hasDaterange){
        this.getDateRange();
      }

      this.debounceUpdate('Venue', true);
    }

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

    this.debounceUpdate('Event', true);
  }

  eventSearchUp(){

    if(this.eventSearchTerm.length < 3){

      //if search is empty, shows initial values
      if(this.eventSearchTerm.length == 0){
        this.events = angular.copy(this.allEvents);
        this.noEventsFound = false;
        //clean any event that was searched and Selected by the user, and is not visible anymore.
        let selectedEvents = null;
        if(this.filters.events){
          selectedEvents = this.filters.events;
          this.checktoSetEvents(selectedEvents);
        }

        this.ReportsService.setEventSearched(null);
      }

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
      if(!this.findElementById(v.uniqueId, this.selectedVenues)){

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
      if(v.type == 'venue' && this.findElementById(v.uniqueId, this.selectedVenuesOld)){
          if(totalChilds !== totalCheckedChilds){
            this.selectedVenues = filteredVenues.filter((x) => {
              if(x.id != v.id)
                return x;
            });
          }
      }

      //if checked now AND was not checked before. Means need check ALL his childs.
      if(v.type == 'venue' && !this.findElementById(v.uniqueId, this.selectedVenuesOld)){
          this.venues.forEach((x) => {

            if(x.group === v.group && x.type ==='outlet'){

              if(!x.selected){
                this.selectedVenues.push(x);
              }
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
      if(!this.findElementById(v.uniqueId, this.selectedVenues)){
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

    this.debounceUpdate('CustomerMarketing');
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

      if(!this.reportItems){
        this.getItemsFilter()
        .then(() => {

          this.shouldShowItemFilter = true;
        });
      }
      else
        this.shouldShowItemFilter = true;

    } else {
      this.shouldShowItemFilter = false;
      this.filters.item = null;
    }

    //check if filter promotion should be visible: if report has this option
    if(this.filters.report.hasPromotionsFilter){
      this.getPromotionsFilter(this.filters.report.deletedOnly)
      .then(() => {

        this.shouldShowPromotionsFilter = true;
      });
    } else {
      this.shouldShowPromotionsFilter = false;
      this.filters.promotion = null;
    }

    this.debounceUpdate('Report');
  }

  onDaterangeChange(){
    if (!this.init && !this.kyc) {
      this.selectedDaterange = this.getDefaultDateRange();
      return this.showFullClientError();
    }

    //save last option selected to use with Custom type
    if(this.selectedDaterange.start && this.selectedDaterange.end){

      this.lastDataSelected.start = this.selectedDaterange.start;
      this.lastDataSelected.end = this.selectedDaterange.end;
    }

    if(this.selectedDaterange.type == 'event'){
      this.shouldShowEventfilter = true;
      this.dateRangeChanged = false;

      if(this.events.length <= 0)
        this.getEvents(true);
    }
    else{
      this.shouldShowEventfilter = false;

      // if old is value = event , set = null now, to do not send filters with inconsistent event value.
      this.filters.events = [];

      //only trigger watch if daterange is not Event
      this.dateRangeChanged = true;

      this.filters.datesRange.startDate = this.lastDataSelected.start;
      this.filters.datesRange.endDate = this.lastDataSelected.end;
      this.datesRange.startDate = moment(this.lastDataSelected.start, 'L') ;
      this.datesRange.endDate = moment( this.lastDataSelected.end, 'L') ;
    }

    //Will show From/Until fields displaying datesRange equals to the last option selected before Custom
    if(this.selectedDaterange.type == 'custom'){
      this.shouldShowCustomDate = true;
    }
    else
      this.shouldShowCustomDate = false;
  }

  onItemChange(){

    this.debounceUpdate('Item');
  }

  onPromotionChange(){
    
    this.debounceUpdate('Promotion');
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

        //init venues after hasApplication
        this.initVenues();

        resolve();
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

    var hasEventVenue = this.filters.venues.forEach((venue) => {
      if(venue.isEventVenue)
        event = true;
      else
        takeaway = true;
    });

    return {hasTakeaway: takeaway, hasEvent: event};
  }

  getItemsFilter(){
    return this.$q((resolve, reject) => {
      this.showSpinner();

      var params = { venues: this.filters.venues}

      let oldItem = null;
      if(this.filters.item)
        oldItem = angular.copy(this.filters.item);

      this.ReportsService.getMenuItemsByVenues(params)
      .then((data) => {

        this.reportItems = data;

        let matchItem = false;
        if(oldItem){
          data.forEach((x) => {
            if(x.menuItemId == oldItem.menuItemId){
              matchItem = true;
            }
          });
        }

        if(matchItem)
          this.filters.item = oldItem;
        else if(oldItem)
          this.filters.item = null;

        this.hideSpinner();
        resolve(this.filters.item);
      }, (err) => {
        console.log('Error fetching items from venues ', err);
        reject();
        this.hideSpinner();
      });
    });
  }

  getPromotionsFilter(deletedOnly){
    return this.$q((resolve, reject) => {
      if (deletedOnly && this.deletedPromotions) {
        this.filters.promotion = null;
        this.reportPromotions = this.deletedPromotions;
        resolve(this.filters.promotion);
      }

      if (!deletedOnly && this.activePromotions) {
        this.filters.promotion = null;
        this.reportPromotions = this.activePromotions;
        resolve(this.filters.promotion);
      }

      this.showSpinner();

      let venues = this.filters.venues || [],
          params = {
            venueIds: venues.map(v => v.id).join(','), 
            deleted: deletedOnly 
          },
          oldPromotion = null;

      if(this.filters.promotion) {
        oldPromotion = angular.copy(this.filters.promotion);
      }

      Preoday.Report.getPromotionsByVenues(params)
      .then((data) => {

        this.reportPromotions = data;

        if (deletedOnly) {
          this.deletedPromotions = data;
        } else {
          this.activePromotions = data;
        }

        if (oldPromotion) {
          if (data && (data.id == oldPromotion.id)) {
            this.filters.promotion = oldPromotion;
          } else {
            this.filters.promotion = null;
          }
        }

        this.hideSpinner();
        resolve(this.filters.promotion);
      }, (err) => {
        console.log('Error fetching promotions from venues ', err);
        reject();
        this.hideSpinner();
      });
    });
  }

  setVenues(venues){
    this.selectedVenues = venues;
    this.onVenueChange();
  }

  checkPermissions(){
    return this.$q((resolve,reject) => {
      var venueIds = this.VenueService.venues.map((x) => { return x.id});
      var permissions = [this.Permissions.ANALYTICS];
          this.PermissionService.checkVenuesPermissions( permissions ,venueIds)
          .then((data) => {

            var venues = this.VenueService.venues.filter((x) => {
              if(data.hasOwnProperty(x.id) && data[x.id][this.Permissions.ANALYTICS] === true)
                return x;
            });

            resolve(venues);
          }, (err) => {
            console.log("Error fetching venue permissions", err);
            reject();
          });
    });
  }

// To make Venues and Outlets selectable on the same MD-SELECT, the same array will contain venues + outlets
// Fields: group -> to keep venues and it owns outlets grouped
//         type -> to know which object in array is an outlet / venue
//         selected -> default always come all selected. used to control Parent <-> child relation on VenueChange event
  getVenues(venues){

    var localVenue = {};
    var localOutlet = {};
    var venuesIds = [];
    var isCurrentVenue = false;

    // SUPER ADMIN can see current venue selected too.
    if(this.UserService.isAdmin()){

      let isVenuePresent = this.VenueService.venues.filter((x) => {
        if(x.id == this.VenueService.currentVenue.id)
          return x;
      });

      if(isVenuePresent.length <= 0){
        venues.push(this.VenueService.currentVenue);
      }
    }

    venues.forEach((venue) => {
      isCurrentVenue = (this.VenueService.currentVenue.id == venue.id) ? true : false;

      venuesIds.push(venue.id);
      localVenue = {
        id: venue.id,
        name: venue.name,
        isEventVenue: venue.eventFlag == 1 ? true : false,
        hasApplication: false,
        type: 'venue',
        group: venue.name.substring(0,4).toUpperCase()+ venue.id,
        selected: isCurrentVenue,
        display: true,
        uniqueId: venue.name.substring(0,4).toUpperCase()+ venue.id
      };
      this.venues.push(localVenue);

      let shouldDisplay = true;
      // Venues with only 1 outlet, should not display it.
      if(venue.outlets.length <= 1){
        shouldDisplay = false;
      }

      venue.outlets.forEach((outlet) => {
        localOutlet = {
          id: outlet.id,
          name: outlet.name,
          type: 'outlet',
          group: venue.name.substring(0,4).toUpperCase()+ venue.id,
          selected: isCurrentVenue,
          display: true,
          uniqueId: outlet.id + venue.name.substring(0,4).toUpperCase()+ venue.id
        };

        if(!shouldDisplay)
          localOutlet.display = false;

        this.venues.push(localOutlet);
      });

    });

    this.venues.sort(this.compareObjectVenue);
    return this.getVenuesApplications(venuesIds);
  }

  setDateRange(defaultOpt){
    var venueTypes = this.getVenueSelectedTypes();
    var setDefault = false;
    // if event is selected, update Events (called when VenueClose has event venue)
    if(this.selectedDaterange.type == 'event'){
      if(venueTypes.hasEvent)
        this.getEvents(true);
      else{
        this.events = [];
        this.allEvents = [];
        this.eventSearchTerm = "";
        setDefault = true;
      }
    }
    else if(!this.selectedDaterange.type ){
      setDefault = true;
    }

    // set default option only at init page OR if Event was selected and now Event option its not available aynmore.
    if(setDefault){
      this.selectedDaterange = defaultOpt;
      this.onDaterangeChange();
    }
  }

  getDefaultDateRange() {
    let defaultOpt = {id: 4, type: 'minus30days',name: this.gettextCatalog.getString('Last 30 days'),
                        start: moment().subtract(30, 'days').format('L'), end: moment().format('L')};
    return defaultOpt;
  }

  getDateRange(){
    return this.$q((resolve,reject) => {
      var venueTypes = this.getVenueSelectedTypes();

      var today = moment().format('L');

      var ranges =[
        {id: 1, type: 'today',      name: this.gettextCatalog.getString('Today'),
         start: today, end: today},
        {id: 2, type: 'minus1day',  name: this.gettextCatalog.getString('Yesterday'),
         start: moment().subtract(1, 'days').format('L'), end: today},
        {id: 3, type: 'minus7days', name: this.gettextCatalog.getString("Last 7 days"),
         start: moment().subtract(7, 'days').format('L'), end: today},
        {id: 5, type: 'minus1year', name: this.gettextCatalog.getString('1 year'),
         start: moment().subtract(1, 'year').format('L'), end: today},
        {id: 7, type: 'custom',     name: this.gettextCatalog.getString('Custom')}
      ];

      var defaultOpt = this.getDefaultDateRange();

      ranges.push(defaultOpt);

      //do not allow this option if has no Event venue selected
      if(venueTypes.hasEvent){
        ranges.push({id: 6, type:'event', name: this.gettextCatalog.getString('By event')});
      }

      this.dateRangeOptions = ranges;
      this.lastDataSelected.start = defaultOpt.start;
      this.lastDataSelected.end = defaultOpt.end;

      this.initDatesAndEvents();
      //this.setDateRange(defaultOpt);

      resolve();
    });
  }

  setEvents(occurIds){

    let eventsSelected = [];
    occurIds.forEach((id) => {

      let event = this.events.filter((e) => {
        if(e.occurId === id){
          return e;
        }
      });

      if(event && event.length > 0)
        eventsSelected.push(event[0]);

    });

    this.filters.events = eventsSelected;

    this.onEventChange();
  }

  checktoSetEvents(oldEvents){
    let eventsSelected = [];
    if(oldEvents){
      oldEvents.forEach( (x) => {
        let event = this.events.filter((e) => {
          if(e.occurId == x.occurId)
            return e;
        });

        if(event.length > 0){
         eventsSelected = eventsSelected.concat(event);
        }
      });

      this.filters.events = eventsSelected;
    }
  }

  getEvents(firstTimeLoad){

    return this.$q((resolve,reject) => {

      this.showSpinner();

      var eventsFetched = [];

      var paramNameSearch = null;

      if(this.eventSearchTerm && this.eventSearchTerm.length > 0 ){
        paramNameSearch = this.eventSearchTerm;
        this.ReportsService.setEventSearched(paramNameSearch);
      }
      else
        this.ReportsService.setEventSearched(null);

      var venueIds=[];
      for(var i=0;i<this.filters.venues.length;i++){

        if(this.filters.venues[i].isEventVenue)
          venueIds.push(this.filters.venues[i].id);
      }

      var oldEvents = null;
      if(this.filters.events && this.filters.events.length > 0)
        oldEvents = this.filters.events;

      var offset = 0;
      var limit = 100;

      var events = this.EventService.getByVenuesIdsAndName(venueIds, paramNameSearch, offset, limit)
      .then((data) => {

        if(data.length <= 0)
          this.noEventsFound = true;
        else
          this.noEventsFound = false;

        data.forEach((event, i)=> {
          let objEvent = {};
          objEvent.id = event.id;
          objEvent.name = event.name;


          let schedules = event.schedules;
          schedules.forEach((sched) => {
            let occurrences = sched.occurrences;

            occurrences.forEach((occur) => {
              let objTime = {};

              objTime.id = objEvent.id;
              objTime.name = objEvent.name;
              objTime.startDate = occur.date;
              objTime.occurId = occur.id;
              objTime.showName = moment(occur.date).format('L') +" "+moment(occur.date).format('LT') +' - ' + objEvent.name;

              eventsFetched.push(objTime);
            });
          });

        });

        // lets keep a copy of all events. So its not necessary search everytime that user clean search
        if(firstTimeLoad === true){
          this.allEvents = eventsFetched;
        }

        this.events = eventsFetched;

        this.checktoSetEvents(oldEvents);
        this.hideSpinner();
      }, (err) => {
        console.log('Error fetching Events', err);
        this.hideSpinner();
      });

      resolve(events);
    }, (err) => { reject(); });
  }

  setReport(report){
    this.filters.report = report;
  }

  getReports(){
  return this.$q((resolve,reject) => {

    this.showSpinner();
    var venueTypes = this.getVenueSelectedTypes();

    var venueWithAppId = false;
    for(var i=0; i < this.filters.venues.length; i++ ){
      if(this.filters.venues[i].hasApplication){
        venueWithAppId = true;
        break;
      }
    }

    var options = {
      hasEventVenue: venueTypes.hasEvent,
      hasTakeawayVenue: venueTypes.hasTakeaway,
      hasApplicationId: venueWithAppId
    };

    let oldReport = null;
    if(this.filters.report)
      oldReport = angular.copy(this.filters.report);

     var reports = this.ReportsService.getReports(this.reportTypes, options)
      .then((newReports) => {
        this.reports = newReports;

        let matchReport = false;
        if(oldReport){
          newReports.forEach((x) => {
            if(x.id == oldReport.id){
              matchReport = true;
            }
          });
        }

        if(matchReport)
          this.setReport(oldReport);
        else if(oldReport)
          this.setReport(this.reports[0]); // set the first option IF old report selected is not available anymore.

      });
      this.hideSpinner();
      resolve(reports);
   });
  }

  initReports(){
    if(this.hasReport && this.reports && this.reports.length > 0){
      if(this.init && this.init.report){
        let reportName = this.init.report;
        let reportSelected = this.reports.filter((x) => {
          if(x.name == reportName)
            return x;
        });

        if(reportSelected && reportSelected.length > 0)
          this.setReport(reportSelected[0]);
        else
          this.setReport(this.reports[0]);
      }
      else
        this.setReport(this.reports[0]);

     // this.$timeout(() => {
        this.onReportChange();//, 200});
    }
  }

  initDatesAndEvents(){

    if(this.init){

      if(this.init.datesRange && this.init.datesRange.startDate && this.init.datesRange.endDate){
        let minDate = moment(this.init.datesRange.startDate).format('L');
        let maxDate = moment(this.init.datesRange.endDate).format('L');

        let dateRangeSelected = this.dateRangeOptions.filter((x) => {
          if(x.start == minDate && x.end == maxDate)
            return x;
        });

        if(dateRangeSelected && dateRangeSelected.length > 0){
          this.setDateRange(dateRangeSelected[0]);
        }
        else {
          let dateRangeSelected = this.dateRangeOptions.filter((x) => {
            if(x.type == 'custom')
              return x;
          })[0];

          this.lastDataSelected.start = minDate;
          this.lastDataSelected.end = maxDate;
          this.setDateRange(dateRangeSelected);

        }
      }
      else if(this.init.events){
        // if user searched for events on last controller...
        var isEventSearched = this.ReportsService.getEventSearched();

        var initialEvents = this.init.events;
        this.getEvents(true)
        .then(() => {

          if(isEventSearched){
            this.eventSearchTerm = isEventSearched;

            this.getEvents()
            .then(() => {

              let dateRangeSelected = this.dateRangeOptions.filter((x) => {
                if(x.type == 'event')
                  return x;
              })[0];
              this.setDateRange(dateRangeSelected);
              this.setEvents(initialEvents);

            });
          }
          else{
            let dateRangeSelected = this.dateRangeOptions.filter((x) => {
              if(x.type == 'event')
                return x;
            })[0];
            this.setDateRange(dateRangeSelected);
            this.setEvents(initialEvents);

          }
        });

      }
      else{ // default Option if none selected
        let dateRangeSelected = this.dateRangeOptions.filter((x) => {
          if(x.type == 'minus30days')
            return x;
        })[0];

        this.setDateRange(dateRangeSelected);
      }

    }
    else{ // default Option if none selected
      let dateRangeSelected = this.dateRangeOptions.filter((x) => {
        if(x.type == 'minus30days')
          return x;
      })[0];

      this.setDateRange(dateRangeSelected);
    }
  }

  initVenues(){
    let venuesSelected = [];
    if(this.init && this.init.venues){

      this.venues.forEach((v) => {
        if(v.type== 'venue' && v.selected ){
          if(this.init.venues.indexOf(v.id) > -1)
            venuesSelected.push(v);
          else
            v.selected = false;
        }
        else if(v.type == 'outlet' && v.selected && this.init.outlets){
          if(this.init.outlets.indexOf(v.id) > -1)
            venuesSelected.push(v);
          else
            v.selected = false;
        }
      });
    }
    else{
      venuesSelected = this.venues.filter((v) => {
          if(v.selected)
            return v;
        });
    }

    this.setVenues(venuesSelected);

    if(!this.hasReport)
      this.debounceUpdate('Venue', true);
  }

  loadReports(){

    if(this.hasReport){
      this.shouldShowReportfilter = true;
      return this.getReports();
    } else {
      this.shouldShowReportfilter = false;
      return this.$q.resolve();
    }
  }

  loadDateRange(){

    if(this.hasDaterange){
      this.shouldShowDaterange = true;
      return this.getDateRange();
    } else {
      this.shouldShowDaterange = false;
      return this.$q.resolve();
    }
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

    var endCallback = function(){
      console.log('callback datepicker');
    };

    this.datesRange= {
      startDate: null,
      endDate: null,
    };
    this.datesRangeOptions = {
        mode: 'range',
        months: 2,
        callback: endCallback
    };

    this.filters = {
      venues: [],
      report: null,
      datesRange: {
        startDate: null,
        endDate: null,
      },
      events: [],
      customerMarketing: false
    };

    this.eventSearchTerm = '';

    this.shouldShowCustomDate = false;
    this.shouldShowMarketingCheck = false;
    this.shouldShowEventfilter = false;

    this.spinner.show('init-datafilters');

    this.checkPermissions()
    .then(this.getVenues.bind(this))
    .then(this.loadReports.bind(this))
    .then(this.loadDateRange.bind(this))
    .then(() => {
      //last thing loaded
      this.initReports();
      this.init = null;
      this.spinner.hide('init-datafilters');
    })
    .catch((err) => {
      console.log('Error initing DataFilters', err);
      this.spinner.hide('init-datafilters');
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

  showFullClientError() {
    this.DialogService.show(this.ErrorService.FULL_CLIENT.title, this.ErrorService.FULL_CLIENT.message, [{
      name: this.LabelService.CONFIRMATION
    }]);
    return false;
  }

  /* @ngInject */
  constructor($q , $scope, Spinner, Snack, $timeout, VenueService , UserService, PermissionService, Permissions, EventService, ReportsService, gettextCatalog, LabelService, ErrorService, DialogService) {
  	'ngInject';

    this.spinner = Spinner;
    this.Snack = Snack;
    this.$timeout = $timeout;
    this.UserService = UserService;
    this.PermissionService = PermissionService;
    this.Permissions = Permissions;
    this.LabelService = LabelService;
    this.ErrorService = ErrorService;
    this.DialogService = DialogService;

    this.VenueService = VenueService;
    this.Spinner = Spinner;
    this.EventService = EventService;
    this.$q = $q;
    this.scope = $scope;
    this.gettextCatalog = gettextCatalog;
    this.ReportsService = ReportsService;
    this.init = angular.copy(this.initialValues);

    this.initFilters();

    //Watch created -> because customDatePicker modify dateRange too
    $scope.$watch(
      () => { return this.datesRange; },
      function(newValue, oldValue){

        if(this.dateRangeChanged === true && (this.selectedDaterange.type != 'custom' || ( this.selectedDaterange.type == 'custom' && this.datesRange.rangeDone))){
          this.filters.datesRange.startDate = this.datesRange.startDate.format('L');
          this.filters.datesRange.endDate = this.datesRange.endDate.format('L');
          this.debounceUpdate('DateRange', false);
        }
      }.bind(this),
      true
    );

  }

}
