
export default function run(UserService, $rootScope, BroadcastEvents, VenueService, $state, $stateParams, Spinner, contextualMenu, contextualDrawer, PermissionService, FeatureService, $timeout){
  "ngInject";

  const notRequiresUser= ['auth.signin', 'auth.signup', 'auth.invite', 'error', 'emailSuccess'];
  const $body = angular.element(document.querySelector('body'));

  function setupChangeEvent() {
    $rootScope.$on("$stateChangeStart", (event, toState, toParams, fromState, fromParams) => {

      contextualDrawer.close();
      contextualMenu.close();

      if (notRequiresUser.indexOf(toState.name) === -1 && !UserService.user){
        $state.go("auth.signin");
        event.preventDefault();
        return false;
      }

      if (toState.requiresPermission){
        if (!PermissionService.hasPermission(toState.requiresPermission)){
          $state.go("main.dashboard", {
            entityId: $stateParams.entityId
          });
          event.preventDefault();
          return false;
        }
      }

      if (toState.requiresFeature){
        if (!FeatureService.hasFeature(toState.requiresFeature)){
          $state.go("main.dashboard", {
            entityId: $stateParams.entityId
          });
          event.preventDefault();
          return false;
        }
      }
      return true;
    });

    $rootScope.$on('$stateChangeSuccess', function(ev, to, toParams, from, fromParams) {
      $rootScope.previousState = from.name;
      $rootScope.currentState = to.name;

      $body.removeClass(from.name.replace(/\./g, '-'));
      $body.addClass(to.name.replace(/\./g, '-'));

      if (toParams.entityId && fromParams.entityId && +toParams.entityId !== +fromParams.entityId) {
        window.location.reload();
      }
    });
  }

  function redirectSignin(){

    if (notRequiresUser.indexOf($state.current.name) === -1){
      UserService.goToSignin();
      Spinner.empty();
    }

    setupChangeEvent();
  }

  // $rootScope.$on(BroadcastEvents._ON_USER_AUTH,(event,user)=>{

  //   if ($state.includes('main')) {
  //     VenueService.selectVenue();
  //   }
  // });

  $rootScope.previousState = false;
  $rootScope.currentState = false;
  // //Set up the stateChange event only after this first call to prevent multiple redirects to /auth/signup
  UserService.auth()
   .then(setupChangeEvent,redirectSignin);
}
