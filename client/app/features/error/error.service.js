export default class ErrorsService {

  static get UID(){
    return "ErrorService";
  }

  showError(error){
    this.$state.go('error',{code:error});
  }

  /* @ngInject */
  constructor($translate, $state) {
    'ngInject';
    this.$state = $state;

    //VENUE
    this.VENUE_NOT_FOUND = {code:'VENUE_NOT_FOUND', message:$translate.instant("Venue not found")};
    this.FAILED_LOADING_VENUES = {code:'FAILED_LOADING_VENUES', message:$translate.instant("An unexpected error occurred while loading your venues")};
    this.STAFF = {code:'STAFF', message:$translate.instant("You do not have the necessary permissions to view this dashboard, please contact your administrator")};

    //MENUS
    this.FAILED_LOADING_MENUS = {code:'FAILED_LOADING_MENUS', message:$translate.instant("An unexpected error occurred while loading menus")};


    //DEFAULT
    this.DEFAULT = {code:'DEFAULT', message:$translate.instant("An unexpected error occurred")};

  }
}
