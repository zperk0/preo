
export default function run(UserService, $rootScope, BroadcastEvents, VenueService, $state, ErrorService, UtilsService, $stateParams, Spinner, contextualMenu, contextualDrawer, gettextCatalog){
  "ngInject";

  const notRequiresUser= ['auth.signin', 'auth.signup', 'auth.invite', 'error', 'emailSuccess'];

  function redirectSignin(){
    if (notRequiresUser.indexOf($state.current.name) === -1){
      $state.go("auth.signin");
    }
  }

  let language = window.localStorage.getItem('preo-webapp-language');

  if (language) {
    gettextCatalog.setCurrentLanguage(language);
  }
console.log('APPP UNNNNNN --', window._release);
  Preoday.Api.headers({
    'preo-appid': window._release
  });

  $rootScope.previousState = false;
  $rootScope.currentState = false;
  // //Set up the stateChange event only after this first call to prevent multiple redirects to /auth/signup
  UserService.auth()
   .then(()=>{},redirectSignin);
}
