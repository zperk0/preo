import controller from './contextualDrawer.styleMobile.controller'

export default function contextualMenu(){
  "ngInject";
  return {
    restrict: 'E',
    template: require("./contextualDrawer.styleMobile.tpl.html"),
    controller: controller.UID,
    controllerAs: "drawerStyleMobileCtrl",
    bindToController: true,
    replace:true,
    link: (scope, el, attr, ctrl) => {
    }
  }
}
