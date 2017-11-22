import controller from './entitySelect.controller'

export default function entitySelectDirective(){
  return {
    restrict: 'E',
    template: require("./entitySelect.tpl.html"),
    controller: controller.UID,
    scope:{
      entities: '=',
      entity: '='
    },
    controllerAs: "$entity",
    bindToController: true,
    link: (scope, el, attr, ctrls) => {

    }
  }
}
