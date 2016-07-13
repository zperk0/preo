import controller from './cardItemList.controller'

export default function cardItemList(){
  "ngInject";
  return {
    restrict: 'E',
    scope: {
      collection:"=",
      // svDisabled:"=",
      // svKeepInList:"=?",
      // svIsDropzone:"=?",
      // svMultiSelect:"=?",
      onClickNew:"&?",
      searchLabel:"=?"
    },
    template: require("./cardItemList.tpl.html"),
    controller: controller.UID,
    controllerAs: "vm",
    bindToController: true,
    transclude:true,
    require:['?^^menuSectionList','cardItemList'],
    link: (scope, el, attr, ctrl) => {
      if (ctrl[0]){
        ctrl[0].cardItemList = ctrl[1];
      }
    }
  }
}
