import controller from './tagActionAdvanced.controller'

export default function tagActionAdvanced(){
  "ngInject";
  return {
    restrict: 'E',
    template: require("./tagActionAdvanced.tpl.html"),
    controller: controller.UID,
    scope:{
      tagAction: "=ngModel",
    },
    controllerAs: "tagActionAdvancedCtrl",
    bindToController: true,
    require:['^form', 'tagActionAdvanced', '^contextualMenu'],
    link: (scope, el, attr, ctrls) => {
      ctrls[1].contextualMenuCtrl = ctrls[2];
      ctrls[1].contextualForm = ctrls[0];

    }
  }
}
