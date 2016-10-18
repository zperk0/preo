import controller from './taxGroupList.controller'

export default function taxGroupList(){
  return {
    restrict: 'E',
    scope: {
      taxGroups:"="
    },
    template: require("./taxGroupList.tpl.html"),
    controller: controller.UID,
    controllerAs: "taxGroupListCtrl",
    bindToController: true,
    link: (scope, el, attr, ctrl) => {

    }
  }
}
