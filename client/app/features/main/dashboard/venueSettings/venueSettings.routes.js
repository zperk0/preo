
import controller from './venueSettings.controller';

/**
 * Routing function for venueSettings
 * @param  $stateProvider
 */

export default function routes($stateProvider) {
  "ngInject";
  $stateProvider.state("main.dashboard.venueSettings", {
    url: "/venueSettings",
    template: require("./venueSettings.tpl.html"),
    controller: controller.UID,
    controllerAs: "venueSettingsCtrl",
    abstract:true,
    resolve:{
      // authenticated -> this is from main.routes.js and makes sure there is an USER and a VENUE set in userService and venueService
      maps:function(authenticated, MapsService){
        "ngInject";
        return MapsService.load();
      }
    }
  });
}