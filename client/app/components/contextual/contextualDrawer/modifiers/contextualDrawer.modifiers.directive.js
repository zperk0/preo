import controller from './contextualDrawer.modifiers.controller'

export default function contextualMenu($compile, $timeout, $animate){
  "ngInject";
  return {
    restrict: 'E',
    scope: true,
    template: require("./contextualDrawer.modifiers.tpl.html"),
    controller: controller.UID,
    controllerAs: "drawerModifiersCtrl",
    bindToController: true,
    link: (scope, el, attr, ctrl) => {
    }
  }
}
