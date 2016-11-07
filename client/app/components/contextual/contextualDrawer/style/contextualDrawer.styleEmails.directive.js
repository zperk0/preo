import controller from './contextualDrawer.styleEmails.controller'

export default function contextualMenu(){
  "ngInject";
  return {
    restrict: 'E',
    template: require("./contextualDrawer.styleEmails.tpl.html"),
    controller: controller.UID,
    controllerAs: "drawerStyleEmailsCtrl",
    bindToController: true,
    replace:true,
    link: (scope, el, attr, ctrl) => {
    }
  }
}
