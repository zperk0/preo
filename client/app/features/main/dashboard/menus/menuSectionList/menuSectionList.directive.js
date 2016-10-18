import controller from './menuSectionList.controller'

export default function menuSectionList(){
  "ngInject";
  return {
    restrict: 'E',
    scope: {
      sections:"=",
      menu:"="
    },
    template: require("./menuSectionList.tpl.html"),
    controller: controller.UID,
    controllerAs: "menuSectionListCtrl",
    bindToController: true,
    replace:true,
    link: (scope, el, attr, ctrls) => {

    }
  }
}
