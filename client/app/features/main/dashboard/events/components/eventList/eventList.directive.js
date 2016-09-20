import controller from './eventList.controller'

export default function eventList(){
  return {
    restrict: 'EA',
    scope: {

    },
    template: require("./eventList.tpl.html"),
    controller: controller.UID,
    controllerAs: "eventListCtrl",
    bindToController: true,
    link: (scope, el, attr, ctrl) => {

    }
  }
}
