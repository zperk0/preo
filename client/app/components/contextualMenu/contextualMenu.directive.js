import controller from './contextualMenu.controller'

export default function contextualMenu(){
  "ngInject";
  return {
    restrict: 'E',
    template: require("./contextualMenu.tpl.html"),
    scope:{
      entity:"=",
      type:"=",
      onSubmit:"=",
    },
    controller: controller.UID,
    controllerAs: "vm",
    bindToController: true,
    replace:true,
    link: (scope, el, attr, ctrl) => {
    }
  }
}
