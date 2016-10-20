import controller from './contextualMenu.controller'

export default function contextualMenu($compile, $timeout, $animate){
  "ngInject";
  return {
    restrict: 'E',
    template: require("./contextualMenu.tpl.html"),
    scope:{
      entity:"=",
      template:"=",
      params: '='
    },
    controller: controller.UID,
    controllerAs: "contextualMenuCtrl",
    bindToController: true,
    replace:true,
    link: (scope, el, attr, ctrl) => {

      let wrapper = angular.element(el[0].querySelector(".form-content"));
      $animate.addClass(el, 'rendered');

      wrapper.prepend(ctrl.template);

      $compile(wrapper.contents())(scope);

      $timeout(() => {
        $timeout(()=>{
          scope.rendered = true;
        },500)
      });
    }
  }
}
