import controller from './outletLocationGroup.controller'

export default function outletLocationGroup(){
  return {
    restrict: 'E',
    scope: {
        outletLocationGroup: '='
    },
    template: require("./outletLocationGroup.tpl.html"),
    controller: controller.UID,
    controllerAs: "vm",
    bindToController: true,
    link: (scope, el, attr, ctrl) => {

    }
  }
}
