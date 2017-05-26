
import controller from './customTagList.controller'

/**
 * Routing function for eventList
 * @param  $stateProvider
 */
/* @ngInject */
export default function routes($stateProvider) {
  $stateProvider.state("main.dashboard.customTags.customTagList", {
    url: "/list",
    requiresPermission:Permissions.MENUS,
    views: {
    	customTagContent: {
		    template: require("./customTagList.tpl.html"),
		    controller: controller.UID,
		    controllerAs: "customTagListViewCtrl"
    	}
    }
  });
}
