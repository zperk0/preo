
import controller from './signup.controller';

/**
 * Routing function for signup
 * @param  $stateProvider
 */

export default function routes($stateProvider) {
  "ngInject";
  $stateProvider.state("auth.signup", {
    url: "/signup/:inviteKey",
    template: require("./signup.tpl.html"),
    controller: controller.UID,
    controllerAs: "signupCtrl",
    params: {
    	invitedUser: null,
      isUserAuthChecked: null
    },
    resolve: {
      hasKey: function($q, $stateParams, $timeout, $state, UserService) {

        $state.current.name = 'auth.signup';

        if (!$stateParams.inviteKey) {
          $timeout(() => {

            $state.go('main.dashboard');
          });

          return $q.reject();
        }

        if ($stateParams.isUserAuthChecked  || UserService.isAuth()) {
          return $q.when();
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
