import controller from './itemChips.controller'

export default function itemChips(){
  "ngInject";
  return {
    restrict: 'E',
    scope: {
      items:"=",
      onRemove: '&?'
    },
    template: require("./itemChips.tpl.html"),
    controller: controller.UID,
    controllerAs: "vm",
    bindToController: true,
    replace:true,
    link: (scope, el, attr, ctrl) => {
    }
  }
}
