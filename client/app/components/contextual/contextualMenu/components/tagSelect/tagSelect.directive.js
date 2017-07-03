import controller from './tagSelect.controller'

export default function tagSelect(){
  "ngInject";
  return {
    restrict: 'E',
    scope: {
      ngModel: "=",
      collection: "="
    },
    template: require("./tagSelect.tpl.html"),
    replace: true,
    controller: controller.UID,
    controllerAs: "tagSelectCtrl",
    bindToController: true,
    link: (scope, el, attr, ctrl) => {
      
    }
  }
}
