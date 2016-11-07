
import controller from './weborders.controller';

/**
 * Routing function for weborders
 * @param  $stateProvider
 */

export default function routes($stateProvider) {
  "ngInject";
  $stateProvider.state("main.dashboard.styling.weborders", {
    url: "/weborders",
    views:{
     stylingContent:{
       template: require("./weborders.tpl.html"),
       controller: controller.UID,
       controllerAs: "vm"
      }
    }
  });
}
