import controller from './collectionSlotsSelect.controller'

export default function collectionSlotsSelect(){
  return {
    restrict: 'E',
    scope: {
      ngModel: '='
    },
    template: require("./collectionSlotsSelect.tpl.html"),
    replace: true,
    controller: controller.UID,
    controllerAs: "collectionSlotsSelectCtrl",
    bindToController: true,
    link: (scope, el, attr, ctrl) => {

    }
  }
}
