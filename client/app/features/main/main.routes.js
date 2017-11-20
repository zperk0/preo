
import controller from './main.controller';

/**
 * Routing function for main
 * @param  $stateProvider
 */

export default function routes($stateProvider) {
  "ngInject";
  $stateProvider.state("main", {
    url: "/:entityId/main",
    abstract: true,
    template: require("./main.tpl.html"),
    controller: controller.UID,
    controllerAs: "vm",
    resolve: {
      // authenticated -> this makes sure there is an USER and a VENUE set in userService and venueService if you inject "authenticate" in any resolve routes
    	authenticated: function ($q, $state, $stateParams, $timeout, UserService, StateService, Spinner) {

        // this is needed because the $stateParams is empty in a service inside of a resolve function
    		StateService.entityId = +$stateParams.entityId;

        if (StateService.isChannel && StateService.entityId) {
          Preoday.Api.headers({
            'preo-channelid': StateService.entityId
          });
        }

        const deferred = $q.defer();
        const LOADER_KEY = 'authenticating';
        Spinner.show(LOADER_KEY);

    		if (UserService.isAuth()) {
          if (StateService.isLoaded()){
            return $q.when().finally(() => {
              Spinner.hide(LOADER_KEY);
            });
          } else {
            return StateService.start()
              .then(deferred.resolve, deferred.reject)
              .finally(() => {
                Spinner.hide(LOADER_KEY);
              });
          }
    		}

    		UserService.auth()
    			.then(() => {
    				StateService.start()
    					.then(deferred.resolve, deferred.reject)
              .finally(() => {
                Spinner.hide(LOADER_KEY);
              });
    			}, () => {
	    			$timeout(() => {
	    				UserService.goToSignin();
	    			});

            Spinner.hide(LOADER_KEY);
    				deferred.reject();
    			});

    		return deferred.promise;
    	}
    }
  });
}
