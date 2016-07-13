import controller from './cardItemList.controller'

export default function cardItemList(){
  "ngInject";
  return {
    restrict: 'E',
    scope: {
      collection:"=",
      searchFilter:"=",
      onClickNew:"&?",
      searchLabel:"@"
    },
    template: require("./cardItemList.tpl.html"),
    controller: controller.UID,
    controllerAs: "vm",
    bindToController: true,
    transclude:true,
    require:['?^^menuItemList', '?^^menuSectionList','cardItemList'],
    link: (scope, el, attr, ctrl) => {
      if (ctrl[0]){
        ctrl[0].cardItemList = ctrl[2];
      } else if (ctrl[1]){
        ctrl[1].cardItemList = ctrl[2];
      }
    }
  }
}
