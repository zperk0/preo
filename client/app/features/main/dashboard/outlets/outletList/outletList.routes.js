
import controller from './outletList.controller'

/**
 * Routing function for outletList
 * @param  $stateProvider
 */

export default function routes($stateProvider) {
	"ngInject";

  $stateProvider.state("main.dashboard.outlets.list", {
    url: "/list",
    views:{
      outletContent:{
        template: require("./outletList.tpl.html"),
        controller: controller.UID,
        controllerAs: "outletListCtrl",
      }
    }    
  });
}