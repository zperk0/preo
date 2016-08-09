import controller from './contextualDrawer.outlets.controller'

export default function contextualOutlets($compile, $timeout, $animate){
  "ngInject";
  return {
    restrict: 'E',
    template: require("./contextualDrawer.outlets.tpl.html"),
    controller: controller.UID,
    controllerAs: "drawerOutletsCtrl",
    bindToController: true,
    replace:true,
    link: (scope, el, attr, ctrl) => {
    }
  }
}
