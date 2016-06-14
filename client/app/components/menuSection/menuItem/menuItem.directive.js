import controller from './menuItem.controller';

export default function menuItem(){
  'ngInject';
  return {
    restrict: 'E',
    scope: {
      item:"=",
    },
    template: require("./menuItem.tpl.html"),
    controller: controller.UID,
    controllerAs: "vm",
    bindToController: true,
    replace:true,
    link: (scope, el, attr, ctrl) => {

    }
  };
}
