import controller from './taxGroup.controller'

export default function taxGroup(){
  return {
    restrict: 'E',
    scope: {
        taxGroup:"="
    },
    template: require("./taxGroup.tpl.html"),
    controller: controller.UID,
    controllerAs: "taxGroupCtrl",
    bindToController: true,
    link: (scope, el, attr, ctrl) => {

    }
  }
}
