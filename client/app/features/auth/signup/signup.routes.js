
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
    	invitedUser: null
    },
    resolve: {
      hasKey: function($q, $stateParams, $timeout, $state) {

        if ($stateParams.inviteKey) {
          return $q.resolve();
        }

        $timeout(() => {

          $state.go('main.dashboard');
        });

        return $q.reject();
      }
    }
  });
}
