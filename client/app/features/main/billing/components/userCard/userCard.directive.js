import controller from './userCard.controller'

export default function userCard(){
  return {
    restrict: 'E',
    scope: {
      card:"="
    },
    template: require("./userCard.tpl.html"),
    replace: true,
    controller: controller.UID,
    controllerAs: "userCardCtrl",
    bindToController: true,
    link: (scope, el, attr, ctrl) => {

    }
  }
}
