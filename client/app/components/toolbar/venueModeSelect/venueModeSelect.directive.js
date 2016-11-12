import controller from './venueModeSelect.controller';

export default function venueModeSelect(){
  "ngInject";
  return {
    restrict: 'E',
    scope: {
    },
    template: require("./venueModeSelect.tpl.html"),
    controller: controller.UID,
    controllerAs: "venueModeSelectCtrl",
    bindToController: true,
    replace:true,
    link: (scope, el, attr, ctrl) => {
    }
  };
}
