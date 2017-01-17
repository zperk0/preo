
export default function run(UserService, $rootScope, BroadcastEvents, VenueService, $state, ErrorService, UtilsService, $stateParams, Spinner, contextualMenu, contextualDrawer, gettextCatalog){
  "ngInject";

  const notRequiresUser= ['auth.signin','error', 'emailSuccess'];

  function redirectSignin(){
    if (notRequiresUser.indexOf($state.current.name) === -1){
      $state.go("auth.signin");
    }
  }

  let language = window.localStorage.getItem('preo-webapp-language');

  if (language) {
    gettextCatalog.setCurrentLanguage(language);
  }

  Preoday.Api.headers({
    'preo-appid': 'webapp-v2 1.0.8'
  });

  $rootScope.previousState = false;
  $rootScope.currentState = false;
  // //Set up the stateChange event only after this first call to prevent multiple redirects to /auth/signup
  UserService.auth()
   .then(()=>{},redirectSignin);
}
