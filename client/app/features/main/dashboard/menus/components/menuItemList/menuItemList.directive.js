import controller from './menuItemList.controller'

//refactor to not need section
export default function menuItemList($animate, $timeout){
  "ngInject";
  return {
    restrict: 'E',
    scope: {
      items:"=",
      hasNew:"=",
      hasSearch:"=?",
      hasActions:"@?",
      searchText:"=?",
      svDisabled:"=",
      svMultiSelect:"=?",
      svKeepInList:"=?",
      svIsDropzone:"=?",
    },
    template: require("./menuItemList.tpl.html"),
    controller: controller.UID,
    controllerAs: "menuItemListCtrl",
    bindToController: true,
    replace:true,
    link: (scope, el, attrs, ctrl) => {

      scope.hasActions = attrs.hasActions !== 'false'
    }
  }
}
