import controller from './contextualMenu.controller'

export default function contextualMenu($compile, $timeout, $animate){
  "ngInject";
  return {
    restrict: 'E',
    template: require("./contextualMenu.tpl.html"),
    scope:{
      entity:"=",
      template:"="
    },
    controller: controller.UID,
    controllerAs: "vm",
    bindToController: true,
    replace:true,
    link: (scope, el, attr, ctrl) => {
      let $templateEl = $compile(ctrl.template)(scope);
      let wrapper = angular.element(el[0].querySelector(".form-content"));
      wrapper.prepend($templateEl);
      $timeout(()=>{
        $animate.addClass(el, 'rendered');
      })
    }
  }
}
