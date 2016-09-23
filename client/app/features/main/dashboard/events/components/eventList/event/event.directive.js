import controller from './event.controller'

export default function event(){
  return {
    restrict: 'E',
    replace: true,
    scope: {
        event: '=',
        hasActions: '=?'
    },
    template: require("./event.tpl.html"),
    controller: controller.UID,
    controllerAs: "eventCtrl",
    bindToController: true,
    require:["^cardItemList", "^eventList", "event"],
    link: (scope, el, attr, ctrls) => {

        ctrls[2].cardItemList = ctrls[0];
        ctrls[2].collectionSlotsListCtrl = ctrls[1];
    }
  }
}
