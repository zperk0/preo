import controller from './event.controller'

export default function event(){
  return {
    restrict: 'E',
    replace: true,
    scope: {
        event: '=',
        hasActions: '=?'
    },
    template: require("./event.tpl.html"),
    controller: controller.UID,
    controllerAs: "eventCtrl",
    bindToController: true,
    link: (scope, el, attr, ctrl) => {

    }
  }
}
