import controller from './itemChip.controller'

export default function itemChip(){
  "ngInject";
  return {
    restrict: 'E',
    scope: {
      item:"=",
      onRemove: '&?'
    },
    template: require("./itemChip.tpl.html"),
    controller: controller.UID,
    controllerAs: "vm",
    bindToController: true,
    require:["^^itemChips","itemChip"],
    link: (scope, el, attr, ctrl) => {
    }
  }
}
