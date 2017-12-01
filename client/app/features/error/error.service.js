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

  setStrings(){
    this.errorTitle = this.gettextCatalog.getString("ERROR");

    //VENUE
    this.VENUE_NOT_FOUND = {code:'VENUE_NOT_FOUND', message:this.gettextCatalog.getString("Venue not found")};
    this.FAILED_LOADING_VENUES = {code:'FAILED_LOADING_VENUES', message:this.gettextCatalog.getString("An unexpected error occurred while loading your venues")};
    this.STAFF = {code:'STAFF', message:this.gettextCatalog.getString("You do not have the necessary permissions to view this dashboard, please contact your administrator")};

    //MENUS
    this.FAILED_LOADING_MENUS = {code:'FAILED_LOADING_MENUS', message:this.gettextCatalog.getString("An unexpected error occurred while loading menus")};


    //DEFAULT
    this.DEFAULT = {code:'DEFAULT', message:this.gettextCatalog.getString("An unexpected error occurred")};

    // OUTLET LOCATION
    this.OUTLET_LOCATION_SUB_GROUP_OUTLET = {code:'OUTLET_LOCATION_SUB_GROUP_OUTLET', message:this.gettextCatalog.getString("You cannot add a sub group because this outlet location has an outlet")};
    this.OUTLET_LOCATION_SUB_GROUP_CHILDREN = {code:'OUTLET_LOCATION_SUB_GROUP_CHILDREN', message:this.gettextCatalog.getString("You cannot add a sub group because this outlet location already has one")};
    this.OUTLET_LOCATION_SUB_GROUP_SEAT = {code:'OUTLET_LOCATION_SUB_GROUP_SEAT', message:this.gettextCatalog.getString("You cannot add a sub group because this outlet location is for seat")};
    this.OUTLET_LOCATION_ALREADY_OUTLET = {code:'OUTLET_LOCATION_ALREADY_OUTLET', message:this.gettextCatalog.getString("This outlet location already has an outlet")};
    this.OUTLET_LOCATION_LAST_CHILD = {code:'OUTLET_LOCATION_LAST_CHILD', message:this.gettextCatalog.getString("You only can add an outlet for the last child")};
    this.OUTLET_LOCATION_CUSTOM_FIELD_CHILDREN = {code:'OUTLET_LOCATION_CUSTOM_FIELD_CHILDREN', message:this.gettextCatalog.getString("You cannot add a custom field because this outlet location already has one")};

    //TAXES
    this.TAXES_ERROR = {code:'FAILED_LOADING_TAXES', message:this.gettextCatalog.getString("Error loading tax settings")}
    this.TAX_GROUP_ASSIGNED_TO_ITEM = {code:'TAX_GROUP_ASSIGNED_TO_ITEM', message:this.gettextCatalog.getString("Can’t delete this tax code while there are menu items using it."), title: this.gettextCatalog.getString('Sorry')};
    this.TAX_RATE_ASSIGNED_TO_GROUP = {code:'TAX_RATE_ASSIGNED_TO_GROUP', message:this.gettextCatalog.getString("Can’t delete this tax rate while there are groups using it."), title: this.gettextCatalog.getString('Sorry')};


    this.UNEXPECTED_ERROR = {code:'UNEXPECTED_ERROR', message:this.gettextCatalog.getString("An unexpected error occurred loading this page, please try again")};

    // COLLECTION SLOT
    this.COLLECTION_SLOT_SCHEDULE = {code:'COLLECTION_SLOT_SCHEDULE', message:this.gettextCatalog.getString("If you delete this slot, it will be removed from all your events. <br /> Are you sure?"), title: this.gettextCatalog.getString('This slot is being used')};

    // SCHEDULE
    this.SCHEDULE_EVENT = {code:'SCHEDULE_EVENT', message:this.gettextCatalog.getString("An event must have at least one schedule."), title: this.gettextCatalog.getString('Cannot delete schedule')};

    // EVENT OUTLET LOCATION
    this.EVENT_OUTLET_LOCATION = {code:'EVENT_OUTLET_LOCATION', message:this.gettextCatalog.getString("It is not possible to select a single location as your outlet configuration."), title: ''};
    this.EVENT_OUTLET_LOCATION_NO_CHILDREN = {code:'EVENT_OUTLET_LOCATION_NO_CHILDREN', message:this.gettextCatalog.getString("It is not possible to select a single location as your outlet configuration."), title: ''};

    this.EVENT_NO_SLOTS = {code:'EVENT_NO_SLOTS', message:this.gettextCatalog.getString("You must create at least one collection before you can add events"), title: 'No collection slots'};

    // EVENT OUTLET LOCATION
    this.VENUE_WITHOUT_ADDRESS = {code:'VENUE_WITHOUT_ADDRESS', message:this.gettextCatalog.getString("You need to set up your address before selecting your location.  You'll be redirected to your Details page to configure your address."), title: this.gettextCatalog.getString('Address not found')};
    this.VENUE_WITHOUT_LOCATION = {code:'VENUE_WITHOUT_LOCATION', message:this.gettextCatalog.getString("You need to set up your location before creating delivery zones.  You'll be redirected to your Details page to configure your location."), title: this.gettextCatalog.getString('Location not found')};

    this.STRIPE_ERROR = {code:'STRIPE_ERROR', message:this.gettextCatalog.getString("We could not connect to your Stripe account. Please try again."), title: this.gettextCatalog.getString('Connection failed')};
    this.ONE_PAYMENT_METHOD = {code:'ONE_PAYMENT_METHOD', message:this.gettextCatalog.getString("You must have at least one active payment method."), title: this.gettextCatalog.getString('Invalid configuration')};

    this.VENUE_MODE_PAYMENT = {code:'VENUE_MODE_PAYMENT', message:this.gettextCatalog.getString("You must accept at least one payment method before going live."), title: this.gettextCatalog.getString('Sorry')};
    this.VENUE_MODE_FAILED = {code:'VENUE_MODE_FAILED', message:this.gettextCatalog.getString("Venue mode not changed")};

    this.INVALID_OPENING_HOURS_CONFIGURATION = {code:'INVALID_OPENING_HOURS_CONFIGURATION', message:this.gettextCatalog.getString("You must have opening hours set for at least one day"), title: this.gettextCatalog.getString("Invalid configuration")};

    this.SECTION_HAS_MODIFIER = {code:'SECTION_HAS_MODIFIER', message:this.gettextCatalog.getString("Some modifiers are already applied at the section level. Duplicate modifiers will only appear once to the user. Do you still want to add?"), title: this.gettextCatalog.getString("Duplicate modifier")};
    this.SECTION_HAS_MODIFIER_ON_MOVE = {code:'SECTION_HAS_MODIFIER_ON_MOVE', message:this.gettextCatalog.getString("Some modifiers on this item are already applied at section level. Duplicate modifiers will only appear once to the user."), title: this.gettextCatalog.getString("Duplicate modifier")};
    this.SECTION_ITEM_HAS_MODIFIER = {code:'SECTION_ITEM_HAS_MODIFIER', message:this.gettextCatalog.getString("Some modifiers are already applied in some items in this section. Duplicate modifiers will only appear once to the user. Do you still want to add?"), title: this.gettextCatalog.getString("Duplicate modifier")};

    this.INVITE_EXPIRED = {code:'INVITE_EXPIRED', message:this.gettextCatalog.getString("That link appears to have expired. Please ask your administrator to send you a new one."), title: this.gettextCatalog.getString("Sorry")};

    // MANAGE USERS
    this.DELETE_CURRENT_USER = {code:'DELETE_CURRENT_USER', message:this.gettextCatalog.getString("It is not possible to delete your own user."), title: ''};
    this.DELETE_ACCOUNT_ERROR = {code:'DELETE_ACCOUNT_ERROR', message:this.gettextCatalog.getString("There was a problem deleting your account. Please contact support."), title: this.gettextCatalog.getString("Sorry")};

    // EXPIRED SESSION
    this.EXPIRED_SESSION = {code:'EXPIRED_SESSION', message:this.gettextCatalog.getString("Your session has expired. Please login again."), title:this.gettextCatalog.getString('Timeout')};

    this.FULL_CLIENT = {code:'FULL_CLIENT', message:this.gettextCatalog.getString("This feature is only available for full clients. Please contact our sales team using the chat widget at the bottom of the page to activate it."), title:this.gettextCatalog.getString("Full client")}

    // CUSTOM TAGS
    this.FAILED_LOADING_TAGS = {code: 'FAILED_LOADING_TAGS', message:this.gettextCatalog.getString('An unexpected error occurred loading tags, please try again.')};

    // USER NOTES
    this.FAILED_LOADING_NOTES = {code: 'FAILED_LOADING_NOTES', message:this.gettextCatalog.getString('An unexpected error occurred loading the customer notes, please try again.')};

    // USER ORDERS
    this.FAILED_LOADING_ORDER = {code: 'FAILED_LOADING_ORDER', message:this.gettextCatalog.getString('An unexpected error occurred loading the order, please try again.'), title:this.gettextCatalog.getString("Sorry")};
    this.FAILED_LOADING_ORDERS = {code: 'FAILED_LOADING_ORDERS', message:this.gettextCatalog.getString('An unexpected error occurred loading the customer orders, please try again.')};

    // CUSTOMERS
    this.FAILED_LOADING_CUSTOMERS = {code: 'FAILED_LOADING_CUSTOMERS', message:this.gettextCatalog.getString('An unexpected error occurred loading the customers, please try again.')};

    // PROMOTIONS
    this.EMPTY_ADD_USER_PROMO = {code: 'EMPTY_ADD_USER_PROMO', message:this.gettextCatalog.getString('You must select one or more users to apply the promotion.'), title:this.gettextCatalog.getString('No users selected')};

    // CHANNEL ENTITIES
    this.CHANNEL_ENTITIES_REQUIRED = {code: 'CHANNEL_ENTITIES_REQUIRED', message:this.gettextCatalog.getString('You must select at least one venue, group or channel to continue.'), title:this.gettextCatalog.getString('No venues, groups or channels selected')};

    // OPERATOR
    this.REQUIRED_CHANNEL_OPERATOR_URL = {code: 'REQUIRED_CHANNEL_OPERATOR_URL', message: this.gettextCatalog.getString('This app is not configured to place an order. Please contact the support team.')};
  }

  constructor(gettextCatalog, $state, DialogService) {
    "ngInject";
    this.$state = $state;
    this.DialogService = DialogService;
    this.gettextCatalog=gettextCatalog;
    this.setStrings();
  }
}
