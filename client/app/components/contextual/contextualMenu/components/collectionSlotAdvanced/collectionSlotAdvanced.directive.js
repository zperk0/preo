import controller from './collectionSlotAdvanced.controller'

export default function collectionSlotAdvanced(){
  return {
    restrict: 'E',
    template: require("./collectionSlotAdvanced.tpl.html"),
    controller: controller.UID,
    scope:{
      collectionSlot: "=ngModel",
    },
    controllerAs: "collectionSlotAdvancedCtrl",
    bindToController: true,
    require: ['^form', 'collectionSlotAdvanced'],
    link: (scope, el, attr, ctrls) => {

      ctrls[1].contextualForm = ctrls[0];
    }
  }
}
