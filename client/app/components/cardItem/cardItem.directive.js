import controller from './cardItem.controller'

export default function cardItem(){
  return {
    restrict: 'E',
    template: require("./cardItem.tpl.html"),
    controller: controller.UID,
    scope:{
      cardItemActions:"=?",
      selected:"=?"
    },
    controllerAs: "vm",
    bindToController: true,
    transclude:true,
    replace:true,
    link: (scope, el, attr, ctrl) => {

    }
  }
}
