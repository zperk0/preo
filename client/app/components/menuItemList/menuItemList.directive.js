import controller from './menuItemList.controller'

export default function menuItemList(){
  return {
    restrict: 'E',
    scope: {
      items:"=",
      section:"=?"
    },
    template: require("./menuItemList.tpl.html"),
    controller: controller.UID,
    controllerAs: "vm",
    bindToController: true,
    link: (scope, el, attr, ctrl) => {

    }
  }
}
