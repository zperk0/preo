
import controller from './home.controller';

/**
 * Routing function for home
 * @param  $stateProvider
 */

export default function routes($stateProvider, StateConfigProvider) {
  "ngInject";
  $stateProvider.state("main.dashboard.home", {
    url: "/home",
    template: StateConfigProvider.isChannel ? require("./home.channel.tpl.html") : require("./home.tpl.html"),
    controller: controller.UID,
    controllerAs: "homeCtrl"
  });
}
