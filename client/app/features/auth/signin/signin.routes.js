
import controller from './signin.controller';

/**
 * Routing function for signin
 * @param  $stateProvider
 */

export default function routes($stateProvider) {
  "ngInject";
  $stateProvider.state("auth.signin", {
    url: "/signin?inviteKey",
    template: require("./signin.tpl.html"),
    controller: controller.UID,
    controllerAs: "signinCtrl",
    params: {
      invitedUser: null,
      inviteKey: null,
      isUserAuthChecked: null
    },
    resolve: {
      isUserLogged: function($q, $stateParams, $timeout, $state, UserService) {

        $state.current.name = 'auth.signin';

        if ($stateParams.isUserAuthChecked || !$stateParams.inviteKey || UserService.isAuth()) {
          return $q.resolve();
        }

        var deferred = $q.defer();
        UserService.auth(null, true)
          .then((user) => {

            UserService.user = user;
            deferred.resolve();
          }, deferred.resolve);

        return deferred.promise;
      }
    }
  });
}
