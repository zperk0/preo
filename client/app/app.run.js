
export default function run(UserService, $rootScope, $state, gettextCatalog) {
  "ngInject";

  const notRequiresUser= ['auth.signin', 'auth.signup', 'auth.invite', 'error', 'emailSuccess'];

  function redirectSignin(){
    if (notRequiresUser.indexOf($state.current.name) === -1) {
      UserService.goToSignin();
    }
  }

  let language = window.localStorage.getItem('preo-webapp-language');

  if (language) {
    gettextCatalog.setCurrentLanguage(language);
  }

  Preoday.Api.headers({
    'preo-appid': window._release
  });

  $rootScope.previousState = false;
  $rootScope.currentState = false;
  // //Set up the stateChange event only after this first call to prevent multiple redirects to /auth/signup
  UserService.auth()
   .then(()=>{},redirectSignin);
}
