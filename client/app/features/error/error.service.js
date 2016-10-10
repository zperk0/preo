export default class ErrorService {

  static get UID(){
    return "ErrorService";
  }

  showError(error){
    this.$state.go('error',{code:error});
  }

  showRetry(error){
    console.log("show retry");
    if (!error){
      error = this.UNEXPECTED_ERROR;
    }
    console.log("showing retry");
    this.DialogService.retry(this.errorTitle, error.message)
      .then(()=>{
        window.location.reload();
      })
  }


  constructor(gettextCatalog, $state, DialogService) {
    "ngInject";
    this.$state = $state;
    this.DialogService = DialogService;

    this.errorTitle = gettextCatalog.getString("ERROR");

    //VENUE
    this.VENUE_NOT_FOUND = {code:'VENUE_NOT_FOUND', message:gettextCatalog.getString("Venue not found")};
    this.FAILED_LOADING_VENUES = {code:'FAILED_LOADING_VENUES', message:gettextCatalog.getString("An unexpected error occurred while loading your venues")};
    this.STAFF = {code:'STAFF', message:gettextCatalog.getString("You do not have the necessary permissions to view this dashboard, please contact your administrator")};

    //MENUS
    this.FAILED_LOADING_MENUS = {code:'FAILED_LOADING_MENUS', message:gettextCatalog.getString("An unexpected error occurred while loading menus")};


    //DEFAULT
    this.DEFAULT = {code:'DEFAULT', message:gettextCatalog.getString("An unexpected error occurred")};

    // OUTLET LOCATION
    this.OUTLET_LOCATION_SUB_GROUP_OUTLET = {code:'OUTLET_LOCATION_SUB_GROUP_OUTLET', message:gettextCatalog.getString("You can not add a sub group because this outlet location have an outlet")};
    this.OUTLET_LOCATION_SUB_GROUP_CHILDREN = {code:'OUTLET_LOCATION_SUB_GROUP_CHILDREN', message:gettextCatalog.getString("You can not add a sub group because this outlet location already have one")};
    this.OUTLET_LOCATION_SUB_GROUP_SEAT = {code:'OUTLET_LOCATION_SUB_GROUP_SEAT', message:gettextCatalog.getString("You can not add a sub group because this outlet location is for seat")};
    this.OUTLET_LOCATION_ALREADY_OUTLET = {code:'OUTLET_LOCATION_ALREADY_OUTLET', message:gettextCatalog.getString("This outlet location already have an outlet")};
    this.OUTLET_LOCATION_LAST_CHILD = {code:'OUTLET_LOCATION_LAST_CHILD', message:gettextCatalog.getString("You only can add an outlet for the last child")};

    //TAXES
    this.TAXES_ERROR = {code:'FAILED_LOADING_TAXES', message:gettextCatalog.getString("Error loading tax settings")}


    this.UNEXPECTED_ERROR = {code:'UNEXPECTED_ERROR', message:gettextCatalog.getString("An unexpected error occurred loading this page, please try again")};

    // COLLECTION SLOT
    this.COLLECTION_SLOT_SCHEDULE = {code:'COLLECTION_SLOT_SCHEDULE', message:gettextCatalog.getString("This slot is still assigned to some schedules. You must remove all instances before deleting."), title: gettextCatalog.getString('Cannot delete slot')};

    // SCHEDULE
    this.SCHEDULE_EVENT = {code:'SCHEDULE_EVENT', message:gettextCatalog.getString("An event need to have at least 1 schedule."), title: gettextCatalog.getString('Cannot delete schedule')};

    // EVENT OUTLET LOCATION
    this.EVENT_OUTLET_LOCATION = {code:'EVENT_OUTLET_LOCATION', message:gettextCatalog.getString("It is not possible to select a single location as your outlet configuration."), title: ''};

  }
}
