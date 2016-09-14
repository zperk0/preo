import controller from './outletLocation.controller';

export default function outletLocation(){
  "ngInject";
  return {
    restrict: 'E',
    scope: {
      outletLocation:"=?",
    },
    template: require("./outletLocation.tpl.html"),
    controller: controller.UID,
    controllerAs: "outletLocationCtrl",
    bindToController: true,
    replace:true,
    require:["^cardItemList", "^outletLocationList", "^outletLocationGroup", "outletLocation"],
    link: (scope, el, attr, ctrls) => {
      ctrls[3].cardItemList = ctrls[0];
      ctrls[3].outletLocationListCtrl = ctrls[1];
      ctrls[3].outletLocationGroupCtrl = ctrls[2];

    }
  };
}
