import controller from './cardItemList.controller'

export default function cardItemList(){
  "ngInject";
  return {
    restrict: 'E',
    scope: {
      collection:"=",
      svDisabled:"=",
      svKeepInList:"=?",
      svIsDropzone:"=?",
      svMultiSelect:"=?",
      onClickNew:"&?",
      hasSearch:"=?"
    },
    template: require("./cardItemList.tpl.html"),
    controller: controller.UID,
    controllerAs: "vm",
    bindToController: true,
    link: (scope, el, attr, ctrl) => {

    }
  }
}
