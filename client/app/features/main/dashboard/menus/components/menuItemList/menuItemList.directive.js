import controller from './menuItemList.controller'

//refactor to not need section
export default function menuItemList($animate, $timeout, $document, $rootScope){
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
      types:"=?",
      tags:"="
    },
    template: require("./menuItemList.tpl.html"),
    controller: controller.UID,
    controllerAs: "menuItemListCtrl",
    bindToController: true,
    replace:true,
    link: (scope, element, attrs, ctrl) => {

      scope.hasActions = attrs.hasActions !== 'false';

      scope.scrollToBottom = () => {

        $rootScope.$broadcast('$scrollMainToBottom');
      };
    }
  }
}
