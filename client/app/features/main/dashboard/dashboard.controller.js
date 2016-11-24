
export default class dashboardController {
  static get UID(){
    return "dashboardController";
  }

  init(){
    this.Spinner.show("loading-dashboard");
    this.VenueService.getPermissions()
      .then((permissions)=>{
        console.log("got permissions", permissions);
        if (!permissions[Permissions.DASHBOARD]){
          this.$state.go("main.account");
        }
        this.$timeout(()=>{
          this.Spinner.hide("loading-dashboard");
        })
      }, ()=>{
        console.log("Error fetching permissions, redirecting to signin");
        this.Spinner.hide("loading-dashboard");
        this.$state.go("auth.signin");
      })
  }


  constructor(Spinner, $timeout, VenueService, Permissions, $state) {
    "ngInject";
    if (!VenueService.currentVenue){
      console.log("User has no venue - redirecting to signin")
      $state.go("auth.signin");
    }
    this.$state = $state;
    this.VenueService = VenueService;
    this.$timeout = $timeout;
    this.Spinner = Spinner;
    this.Permissions = Permissions;
    this.init();
  }
}
