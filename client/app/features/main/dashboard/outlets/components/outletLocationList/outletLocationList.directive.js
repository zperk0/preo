import controller from './outletLocationList.controller'

export default function outletLocationList(){
  "ngInject";
  return {
    restrict: 'E',
    scope: {
      outletLocations:"=",
      outletLocationGroup: '=group'
    },
    template: require("./outletLocationList.tpl.html"),
    controller: controller.UID,
    controllerAs: "vm",
    bindToController: true,
    replace:true,
    require:["^outletLocationGroup", 'outletLocationList'],
    link: (scope, el, attr, ctrls) => {
      ctrls[1].outletLocationGroup = ctrls[0];
    }
  }
}
