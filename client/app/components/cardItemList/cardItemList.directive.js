import controller from './cardItemList.controller'

export default function cardItemList(){
  "ngInject";
  return {
    restrict: 'E',
    scope: {
      collection:"=",
      searchFilter:"=",
      hasNew:"=?",
      onClickNew:"&?",
      searchLabel:"@"
    },
    template: require("./cardItemList.tpl.html"),
    controller: controller.UID,
    controllerAs: "vm",
    bindToController: true,
    transclude:true,
    require:['cardItemList', '?^^menuItemList', '?^^menuSectionList', '?^^modifierList'],
    link: (scope, el, attr, ctrl) => {
      if (ctrl[1]){
        ctrl[1].cardItemList = ctrl[0];
      } else if (ctrl[2]){
        ctrl[2].cardItemList = ctrl[0];
      } else if (ctrl[3]){
        ctrl[3].cardItemList = ctrl[0];
      }
    }
  }
}
