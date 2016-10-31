import controller from './collectionSlotsList.controller'

export default function collectionSlotsList(){
  return {
    restrict: 'E',
    replace: true,
    scope: {
        collectionSlots: '=',
        hasActions: '=?',
        hasNew:"=",
        hasSearch:"=?",
    },
    template: require("./collectionSlotsList.tpl.html"),
    controller: controller.UID,
    controllerAs: "collectionSlotsCtrl",
    bindToController: true,
    link: (scope, el, attr, ctrl) => {

    }
  }
}
