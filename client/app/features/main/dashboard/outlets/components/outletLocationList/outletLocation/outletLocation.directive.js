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
    controllerAs: "vm",
    bindToController: true,
    replace:true,
    require:["^cardItemList", "^outletLocationList", "outletLocation"],
    link: (scope, el, attr, ctrls) => {
      ctrls[2].cardItemList = ctrls[0];
      ctrls[2].outletLocationListCtrl = ctrls[1];

    }
  };
}
