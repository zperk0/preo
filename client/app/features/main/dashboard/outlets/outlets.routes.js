
import controller from './outlets.controller';

/**
 * Routing function for outlets
 * @param  $stateProvider
 */

export default function routes($stateProvider) {
  "ngInject";
  $stateProvider.state("main.dashboard.outlets", {
    url: "/outlets",
    template: require("./outlets.tpl.html"),
    controller: controller.UID,
    controllerAs: "outlets",
    resolve: {

    	// authenticated -> this is from main.routes.js
    	hasFeature: function ($q, $state, $stateParams, $timeout, authenticated, FeatureService) {

    		if (FeatureService.hasOutletFeature()) {

    			return $q.when()
    		} else {

    			$timeout(() => {

    				$state.go('main.dashboard.analytics');
    			});

    			return $q.reject();
    		}
    	}
    }
  });
}
