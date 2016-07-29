import controller from './outletLocationList.controller'

export default function outletLocationList(){
  "ngInject";
  return {
    restrict: 'E',
    scope: {
      outletLocations:"="
    },
    template: require("./outletLocationList.tpl.html"),
    controller: controller.UID,
    controllerAs: "vm",
    bindToController: true,
    replace:true,
    link: (scope, el, attr, ctrls) => {

    }
  }
}
