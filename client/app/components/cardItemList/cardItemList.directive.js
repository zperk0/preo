import controller from './cardItemList.controller'

export default function cardItemList(){
  "ngInject";
  return {
    restrict: 'E',
    scope: {
      collection:"="
    },
    template: require("./cardItemList.tpl.html"),
    controller: controller.UID,
    controllerAs: "vm",
    bindToController: true,
    link: (scope, el, attr, ctrl) => {

    }
  }
}
