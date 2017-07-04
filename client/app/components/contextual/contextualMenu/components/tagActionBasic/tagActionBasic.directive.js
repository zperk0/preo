import controller from './tagActionBasic.controller'

export default function tagActionBasic(){
  "ngInject";
  return {
    restrict: 'E',
    template: require("./tagActionBasic.tpl.html"),
    controller: controller.UID,
    scope:{
      tagAction: "=ngModel",
    },
    controllerAs: "tagActionBasicCtrl",
    bindToController: true,
    require:['^form', 'tagActionBasic', '^contextualMenu'],
    link: (scope, el, attr, ctrls) => {
      ctrls[1].contextualMenuCtrl = ctrls[2];
      ctrls[1].contextualForm = ctrls[0];

    }
  }
}
