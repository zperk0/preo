import controller from './userSelect.controller';

export default function userSelect(){
  'ngInject';
  return {
    restrict: 'E',
    template: require("./userSelect.tpl.html"),
    controller: controller.UID,
    controllerAs: "vm",
    bindToController: true,
    replace:true,
    link: (scope, el, attr, ctrl) => {

    }
  };
}
