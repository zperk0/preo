
export default class dashboardController {
  static get UID(){
    return "dashboardController";
  }


  constructor(VenueService, $state) {
    "ngInject";
    if (!VenueService.currentVenue){
      console.log("User has no venue - redirecting to signin")
      $state.go("auth.signin");
    }
  }
}
