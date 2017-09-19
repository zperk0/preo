import controller from './menuSectionItemList.controller'

//refactor to not need section
export default function menuSectionItemList($animate, $timeout){
  "ngInject";
  return {
    restrict: 'E',
    scope: {
      items:"=",
      hasNew:"=",
      animate:"=?",
      section:"=?",
      hasSearch:"=?",
      searchText:"=?",
      svDisabled:"=",
      svMultiSelect:"=?",
      svKeepInList:"=?",
      svIsDropzone:"=?",
      svIsDropzoneDisabled:"=?",
      orderBy: '=?',
      orderByReverse: '=?',
      tags: "="
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
