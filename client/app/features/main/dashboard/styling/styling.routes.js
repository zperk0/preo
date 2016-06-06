
import controller from './styling.controller';

/**
 * Routing function for styling
 * @param  $stateProvider
 */
/* @ngInject */
export default function routes($stateProvider) {
  'ngInject';
  $stateProvider.state("main.dashboard.styling", {
    url: "/styling",
    abstract:true,
    template: require("./styling.tpl.html"),
    controller: controller.UID,
    controllerAs: "vm"
  });
}
