import controller from './menuSectionList.controller'

export default function menuSectionList(){
  return {
    restrict: 'E',
    scope: {
      sections:"="
    },
    template: require("./menuSectionList.tpl.html"),
    controller: controller.UID,
    controllerAs: "vm",
    bindToController: true,
    replace:true,
    require:["^menuEditor", "menuSectionList"],
    link: (scope, el, attr, ctrls) => {

    }
  }
}
