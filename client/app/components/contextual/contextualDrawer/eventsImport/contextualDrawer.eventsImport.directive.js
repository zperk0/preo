import controller from './contextualDrawer.eventsImport.controller'

export default function contextualEventsImport($compile, $timeout, $animate){
  "ngInject";
  return {
    restrict: 'E',
    template: require("./contextualDrawer.eventsImport.tpl.html"),
    controller: controller.UID,
    controllerAs: "drawerEventsImportCtrl",
    bindToController: true,
    replace:true,
    link: (scope, el, attr, ctrl) => {

      scope. getElement = _getElement;
      
      function _getElement(){
        return el;
      }
    }
  }
}
