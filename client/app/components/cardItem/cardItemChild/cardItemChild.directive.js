import controller from './cardItemChild.controller'

export default function cardItemChild(){
  return {
    restrict: 'E',
    scope: {
      option:"=",
      modifier:"=",
    },
    template: require("./cardItemChild.tpl.html"),
    controller: controller.UID,
    controllerAs: "cardItemChildCtrl",
    bindToController: true,
    replace:true,
    link: (scope, el, attr, ctrl) => {

    }
  }
}
