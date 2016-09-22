import controller from './collectionSlotBasic.controller'

export default function collectionSlotBasic(){
  return {
    restrict: 'E',
    template: require("./collectionSlotBasic.tpl.html"),
    controller: controller.UID,
    scope:{
      collectionSlot: "=ngModel",
    },
    controllerAs: "collectionSlotBasicCtrl",
    bindToController: true,
    require: ['^form', 'collectionSlotBasic'],
    link: (scope, el, attr, ctrls) => {

      ctrls[1].contextualForm = ctrls[0];
    }
  }
}
