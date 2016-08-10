import controller from './contextualDrawer.style.controller'

export default function contextualMenu(){
  "ngInject";
  return {
    restrict: 'E',
    template: require("./contextualDrawer.style.tpl.html"),
    controller: controller.UID,
    controllerAs: "drawerStyleCtrl",
    bindToController: true,
    replace:true,
    link: (scope, el, attr, ctrl) => {
    }
  }
}
