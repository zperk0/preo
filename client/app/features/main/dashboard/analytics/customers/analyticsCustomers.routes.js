
import controller from './analyticsCustomers.controller'

/**
 * Routing function for analyticsCustomers
 * @param  $stateProvider
 */
/* @ngInject */
export default function routes($stateProvider, Permissions) {
  "ngInject;"
  $stateProvider.state("main.dashboard.analytics.analyticsCustomers", {
    url: "/analyticsCustomers/:reportName?",
    requiresPermission:Permissions.ANALYTICS,
     views:{
      analyticsContent:{
        template: require("./analyticsCustomers.tpl.html"),
        controller: controller.UID,
        controllerAs: "analyticsCustomersCtrl"
      }
    },
    resolve: {

      // authenticated -> this is from main.routes.js and makes sure there is an USER and a VENUE set in userService and venueService
      hasFeature: function($q, $state, $timeout, authenticated, FeatureService, ErrorService, LabelService, DialogService) {

        if (FeatureService.hasKnowYourCustomersFeature()) {

    			return $q.when();
    		} else {

    			$timeout(() => {

            DialogService.show(ErrorService.FULL_CLIENT.title, ErrorService.FULL_CLIENT.message, [{
              name: LabelService.CONFIRMATION
            }]);
            $state.go('main.dashboard.home');
    			});

    			return $q.reject();
    		}
      }
    }
  });
}
