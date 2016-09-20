import controller from './event.controller'

export default function event(){
  return {
    restrict: 'EA',
    scope: {

    },
    template: require("./event.tpl.html"),
    controller: controller.UID,
    controllerAs: "eventCtrl",
    bindToController: true,
    link: (scope, el, attr, ctrl) => {

    }
  }
}
