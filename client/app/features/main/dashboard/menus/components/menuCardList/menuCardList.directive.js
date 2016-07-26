import controller from './menuCardList.controller'

export default function menuCardList(){
  return {
    restrict: 'E',
    scope: {
      menus:"="
    },
    template: require("./menuCardList.tpl.html"),
    controller: controller.UID,
    controllerAs: "vm",
    bindToController: true,
    link: (scope, el, attr, ctrl) => {

    }
  }
}
