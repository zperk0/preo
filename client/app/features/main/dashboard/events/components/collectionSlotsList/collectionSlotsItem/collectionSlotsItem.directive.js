import controller from './collectionSlotsItem.controller'

export default function collectionSlotsItem(){
  return {
    restrict: 'E',
    replace: true,
    scope: {
        collectionSlot: '=',
        hasActions: '=?'
    },
    template: require("./collectionSlotsItem.tpl.html"),
    controller: controller.UID,
    controllerAs: "collectionSlotsItemCtrl",
    bindToController: true,
    require:["^cardItemList", "^collectionSlotsList", "collectionSlotsItem"],
    link: (scope, el, attr, ctrls) => {

      ctrls[2].cardItemList = ctrls[0];
      ctrls[2].collectionSlotsListCtrl = ctrls[1];
    }
  }
}
