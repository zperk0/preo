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
    link: (scope, el, attr, ctrl) => {

    }
  }
}
