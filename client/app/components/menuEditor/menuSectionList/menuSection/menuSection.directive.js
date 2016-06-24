import controller from './menuSection.controller';

export default function menuSection(){
  "ngInject";
  return {
    restrict: 'E',
    scope: {
      section:"=?",
      menuId:"=?"
    },
    template: require("./menuSection.tpl.html"),
    controller: controller.UID,
    controllerAs: "vm",
    bindToController: true,
    replace:true,
    require:["^menuEditor","^menuSectionList", "menuSection"],
    link: (scope, el, attr, ctrls) => {
      ctrls[2].menuCtrl = ctrls[0];
      ctrls[2].menuSectionListCtrl = ctrls[1];

    }
  };
}
