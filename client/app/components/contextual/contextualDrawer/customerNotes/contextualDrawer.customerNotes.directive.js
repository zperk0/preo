import controller from './contextualDrawer.customerNotes.controller'

export default function contextualMenu(){
  "ngInject";
  return {
    restrict: 'E',
    scope: true,
    template: require("./contextualDrawer.customerNotes.tpl.html"),
    controller: controller.UID,
    controllerAs: "drawerCustomerNotesCtrl",
    bindToController: true,
    link: (scope, el, attr, ctrl) => {
    }
  }
}
