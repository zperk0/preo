import controller from './outlet.controller'

export default function outlet(){
  return {
    restrict: 'E',
    scope: {
        outlet: '='
    },
    template: require("./outlet.tpl.html"),
    controller: controller.UID,
    controllerAs: "vm",
    replace: true,
    bindToController: true,
    link: (scope, el, attr, ctrl) => {

    }
  }
}
