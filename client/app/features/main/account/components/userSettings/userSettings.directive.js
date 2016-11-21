import controller from './userSettings.controller'

export default function userSettings(){
  return {
    restrict: 'EA',
    scope: {

    },
    template: require("./userSettings.tpl.html"),
    replace: true,
    controller: controller.UID,
    controllerAs: "userSettingsCtrl",
    bindToController: true,
    link: (scope, el, attr, ctrl) => {

    }
  }
}
