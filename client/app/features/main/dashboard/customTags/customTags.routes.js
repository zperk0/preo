
import controller from './customTags.controller'

/**
 * Routing function for tags
 * @param  $stateProvider
 */
/* @ngInject */
export default function routes($stateProvider, Permissions) {
  "ngInject";
  $stateProvider.state("main.dashboard.customTags", {
    url: "/tags",
    template: require("./customTags.tpl.html"),
    controller: controller.UID,
    controllerAs: "customTagsCtrl",
    abstract: true,
    requiresPermission:Permissions.MENUS,
    requiresFeature:Preoday.constants.Feature.ITEM_TAGS,
  });
}
