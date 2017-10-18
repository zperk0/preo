import controller from './userSelectList.controller'

//refactor to not need section
export default function userSelectList($animate, $timeout, $document, $rootScope){
  "ngInject";
  return {
    restrict: 'E',
    scope: {
      selectedList:"=",
      onToogle:"&"
    },
    template: require("./userSelectList.tpl.html"),
    controller: controller.UID,
    controllerAs: "userSelectListCtrl",
    bindToController: true,
    replace:true,
    link: (scope, element, attrs, ctrl) => {

    }
  }
}
