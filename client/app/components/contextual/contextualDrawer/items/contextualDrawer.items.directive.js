import controller from './contextualDrawer.items.controller'

export default function contextualMenu($compile, $timeout, $animate){
  "ngInject";
  return {
    restrict: 'E',
    scope: true,
    template: require("./contextualDrawer.items.tpl.html"),
    controller: controller.UID,
    controllerAs: "drawerItemsCtrl",
    bindToController: true,
    link: (scope, el, attr, ctrl) => {
    }
  }
}
