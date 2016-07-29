
import controller from './outletLocations.controller';

/**
 * Routing function for outlets
 * @param  $stateProvider
 */

export default function routes($stateProvider) {
  "ngInject";
  $stateProvider.state("main.dashboard.outlets.location", {
    url: "/outletlocations",
    views:{
      outletContent:{
        template: require("./outletLocations.tpl.html"),
        controller: controller.UID,
        controllerAs: "outletLocationsCtrl",
      }
    }    
  });
}
