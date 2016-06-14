  import controller from './menus.controller';

/**
 * Routing function for menus
 * @param  $stateProvider
 */
/* @ngInject */
export default function routes($stateProvider) {
  'ngInject';
  $stateProvider.state("main.dashboard.menus", {
    url: "/menus",
    abstract:true,
    template: require("./menus.tpl.html"),
    controller: controller.UID,
    controllerAs: "menus"
  });
}
