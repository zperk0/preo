import controller from './collectionSlotsList.controller'

export default function collectionSlotsList(){
  return {
    restrict: 'EA',
    scope: {

    },
    template: require("./collectionSlotsList.tpl.html"),
    controller: controller.UID,
    controllerAs: "collectionSlotsCtrl",
    bindToController: true,
    link: (scope, el, attr, ctrl) => {

    }
  }
}
