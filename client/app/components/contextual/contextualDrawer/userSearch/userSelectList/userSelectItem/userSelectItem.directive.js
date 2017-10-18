import controller from './userSelectItem.controller';

export default function userSelectItem($timeout){
  "ngInject";
  return {
    restrict: 'E',
    scope: {
      user:"=",
      selected:"="
    },
    template: require("./userSelectItem.tpl.html"),
    controller: controller.UID,
    controllerAs: "userSelectItemCtrl",
    bindToController: true,
    replace:true,
    require:["?^userSelectList", "userSelectItem"],
    link: (scope, el, attr, ctrls) => {

    }
  };
}
