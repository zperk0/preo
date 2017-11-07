import controller from './taxGroupForm.controller'

export default function taxGroupForm(){
  "ngInject";
  return {
    restrict: 'E',
    scope: {
      taxGroup: '=ngModel'
    },
    template: require("./taxGroupForm.tpl.html"),
    replace: true,
    controller: controller.UID,
    controllerAs: "taxGroupFormCtrl",
    bindToController: true,
    require: ['^form', '^contextualMenu', 'taxGroupForm'],
    link: (scope, el, attr, ctrls) => {

      ctrls[2].contextualForm = ctrls[0];
      ctrls[2].contextualMenuCtrl = ctrls[1];
    }
  }
}
