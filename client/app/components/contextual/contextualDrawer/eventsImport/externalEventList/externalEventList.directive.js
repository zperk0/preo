import controller from './externalEventList.controller'

export default function externalEventList(){
  "ngInject";
  return {
    restrict: 'E',
    scope: {
      events: '=',
      onItemClicked: '&?',
      onItemDelete: '&?',    
      hasActions: '=',

    },
    template: require("./externalEventList.tpl.html"),
    controller: controller.UID,
    controllerAs: "externalEventListCtrl",
    bindToController: true,
    replace:true,
    require:["^cardItemList", "externalEventList"],
    link: (scope, el, attr, ctrl) => {

      ctrl[1].cardItemList = ctrl[0];

    }
  }
}
