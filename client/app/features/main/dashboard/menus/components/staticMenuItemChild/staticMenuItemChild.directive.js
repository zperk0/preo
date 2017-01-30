import controller from './staticMenuItemChild.controller'

export default function staticMenuItemChild(){
  return {
    restrict: 'E',
    scope: {
      option:"=",
      modifier:"=",
    },
    template: require("./staticMenuItemChild.tpl.html"),
    controller: controller.UID,
    controllerAs: "staticMenuItemChildCtrl",
    bindToController: true,
    replace:true,
    link: (scope, el, attr, ctrl) => {

    }
  }
}
