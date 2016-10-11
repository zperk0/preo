import controller from './menuSectionItemList.controller'

//refactor to not need section
export default function menuSectionItemList($animate, $timeout){
  "ngInject";
  return {
    restrict: 'E',
    scope: {
      items:"=",
    },
    template: require("./menuSectionItemList.tpl.html"),
    controller: controller.UID,
    controllerAs: "menuSectionItemListCtrl",
    bindToController: true,
    replace:true,
    link: (scope, el, attr, ctrl) => {

    }
  }
}
