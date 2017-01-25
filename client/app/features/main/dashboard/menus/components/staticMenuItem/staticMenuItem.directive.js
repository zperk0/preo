import controller from './staticMenuItem.controller';

export default function staticMenuItem($timeout){
  "ngInject";
  return {
    restrict: 'E',
    scope: {
      item:"=",
    },
    template: require("./staticMenuItem.tpl.html"),
    controller: controller.UID,
    controllerAs: "staticMenuItemCtrl",
    bindToController: true,
    replace:true,
    link: (scope, el, attr, ctrls) => {
    }
  };
}
