import controller from './modifierList.controller'

export default function modifierList(){
  return {
    restrict: 'E',
    scope: {
      modifiers:"=",
      hasNew:"=",
      hasSearch:"=?",
      svDisabled:"=",
      svMultiSelect:"=?",
      svKeepInList:"=?",
      svIsDropzone:"=?"
    },
    template: require("./modifierList.tpl.html"),
    controller: controller.UID,
    controllerAs: "modifierListCtrl",
    bindToController: true,
    link: (scope, el, attr, ctrl) => {

    }
  }
}
