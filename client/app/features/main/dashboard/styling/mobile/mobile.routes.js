
import controller from './mobile.controller';

/**
 * Routing function for mobile
 * @param  $stateProvider
 */

export default function routes($stateProvider) {
  "ngInject";
  $stateProvider.state("main.dashboard.styling.mobile", {
    url: "/mobile",
    views:{
      stylingContent:{
        template: require("./mobile.tpl.html"),
        controller: controller.UID,
        controllerAs: "vm"
      }
    }
  });
}
