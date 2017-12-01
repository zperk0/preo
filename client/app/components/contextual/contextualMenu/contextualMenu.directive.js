import controller from './contextualMenu.controller'

export default function contextualMenu($compile, $timeout, $animate){
  "ngInject";
  return {
    restrict: 'E',
    template: require("./contextualMenu.tpl.html"),
    scope:{
      entity:"=",
      template: "=",
      params: '=',
      onSuccess: '&?',
      onCancel: '&?',
    },
    controller: controller.UID,
    controllerAs: "contextualMenuCtrl",
    bindToController: true,
    replace:true,
    link: (scope, el, attr, ctrl) => {

      const _templateName = ctrl.template || attr.template;
      const _templateClass = _templateName.replace(/\./g, '-');
      const template = require("./templates/"+ _templateName +".tpl.html")

      let wrapper = angular.element(el[0].querySelector(".form-content"));
      $animate.addClass(el, 'rendered');

      wrapper.prepend(template);

      $compile(wrapper.contents())(scope);

      scope.templateClass = _templateClass;

      $timeout(() => {
        $timeout(()=>{
          scope.rendered = true;
        },500)
      });
    }
  }
}
