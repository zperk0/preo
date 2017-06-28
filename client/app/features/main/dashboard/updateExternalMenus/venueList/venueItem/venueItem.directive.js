import controller from './venueItem.controller'

export default function venueItem(){
  return {
    restrict: 'E',
    scope: {
      venue:"="
    },
    template: require("./venueItem.tpl.html"),
    controller: controller.UID,
    controllerAs: "venueItemCtrl",
    bindToController: true,
    require:["^cardItemList", "^venueList", "venueItem"],
    link: (scope, el, attr, ctrls) => {
        ctrls[2].cardItemList = ctrls[0];
        ctrls[2].venueListCtrl = ctrls[1];
    }
  }
}
