import controller from './taxGroupSelect.controller'

export default function taxGroupSelect(){
  "ngInject";
  return {
    restrict: 'E',
    scope: {
      ngModel: '=',
      ngChange: '&?'
    },
    template: require("./taxGroupSelect.tpl.html"),
    replace: true,
    controller: controller.UID,
    controllerAs: "taxGroupSelectCtrl",
    bindToController: true,
    link: (scope, el, attr, ctrl) => {

    }
  }
}
