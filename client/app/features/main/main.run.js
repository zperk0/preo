
export default function run(UserService, $rootScope, BroadcastEvents, VenueService, $state, ErrorService, UtilsService, $stateParams, Spinner, contextualMenu, contextualDrawer, gettextCatalog){
  "ngInject";

  const notRequiresUser= ['auth.signin','error', 'emailSuccess'];

  function setupChangeEvent(){
    $rootScope.$on("$stateChangeStart", (event, toState, toParams, fromState, fromParams) => {
      console.log("state change started", event, toState, toParams, fromState, fromParams);
      contextualDrawer.close();
      contextualMenu.close();
      if (notRequiresUser.indexOf(toState.name) === -1 && !UserService.user){
        $state.go("auth.signin");
        event.preventDefault();
        return false;
      }
      return true;
    });
    $rootScope.$on('$stateChangeSuccess', function(ev, to, toParams, from, fromParams) {
        $rootScope.previousState = from.name;
        $rootScope.currentState = to.name;
    });
  }

  function redirectSignin(){

    if (notRequiresUser.indexOf($state.current.name) === -1){
      $state.go("auth.signin");
    }

    setupChangeEvent();
    Spinner.empty();
  }

  $rootScope.$on(BroadcastEvents._ON_USER_AUTH,(event,user)=>{

    if ($state.includes('main')) {
      VenueService.selectVenue();
    }
  });

  $rootScope.previousState = false;
  $rootScope.currentState = false;
  // //Set up the stateChange event only after this first call to prevent multiple redirects to /auth/signup
  UserService.auth()
   .then(setupChangeEvent,redirectSignin);
}
