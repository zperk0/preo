
export default function config(UserService, $rootScope, BroadcastEvents, VenueService, $state, ErrorService, UtilsService, $stateParams, Spinner){
  "ngInject";
  function setupChangeEvent(){
    $rootScope.$on("$stateChangeStart", (event, toState, toParams, fromState, fromParams) => {
      const notRequiresUser= ['auth.signin','error'];
      if (notRequiresUser.indexOf(toState.name) === -1 && !UserService.user){
        $state.go("auth.signin");
        event.preventDefault();
        return false;
      }
      return true;
    });
  }

  function redirectSignin(){
    $state.go("auth.signin");
    setupChangeEvent();
    Spinner.empty();
  }

  $rootScope.$on(BroadcastEvents._ON_USER_AUTH,(event,user)=>{
    console.log("User is auth, fetch venues", user);
    VenueService.fetchUserVenues(user)
      .then((venues)=>{
        if (venues.length === 0 ){
          //TODO GET VENUES THAT I'M STAFF, if there's at least one show staff errro
          // if (venuesStaff.length){
            //ErrorService.showError("STAFF");
          // }
          return $state.go("notFound");
        }

        if ($stateParams.venueId){
          $rootScope.$broadcast(BroadcastEvents._PREO_DO_VENUE_SELECT,$stateParams.venueId)
        } else {
          let venueId = venues[0].id;
          $state.go("main.dashboard", {venueId});
        }
      }, ()=>{
        ErrorService.showError('FAILED_LOADING_VENUES');
      });
  });

  Preoday.Api.headers({
    'X-Session-Token': UtilsService.getCookie('PHPSESSID'),
    'preo-appid': 'weborders'
  });

  //Set up the stateChange event only after this first call to prevent multiple redirects to /auth/signup
  UserService.auth()
   .then(setupChangeEvent,redirectSignin);

}