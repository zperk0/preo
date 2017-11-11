
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
    	authenticated: function ($q, $state, $stateParams, $timeout, UserService, StateService) {

    		// this is needed because the $stateParams is empty in a service inside of a resolve function
    		StateService.entityId = +$stateParams.entityId;

        if (StateService.isChannel && StateService.entityId) {
          Preoday.Api.headers({
            'preo-channelid': StateService.entityId
          });
        }

    		if (UserService.isAuth()) {
          if (StateService.isLoaded()){
            return $q.when();
          } else {
            return StateService.start();
          }
    		}

        var deferred = $q.defer();
    		UserService.auth()
    			.then(() => {
    				StateService.start()
    					.then(deferred.resolve, deferred.reject);
    			}, () => {
	    			$timeout(() => {
	    				UserService.goToSignin();
	    			});

    				deferred.reject();
    			});

    		return deferred.promise;
    	}
    }
  });
}
