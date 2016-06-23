import controller from './menuItem.controller';

export default function menuItem(){
  "ngInject";
  return {
    restrict: 'E',
    scope: {
      item:"=?",
      sectionController:"=?"
    },
    template: require("./menuItemNew.tpl.html"),
    replace:true,
    require:["^menuSection"],
    link: (scope, el, attr, ctrls) => {
      scope.menuSectionCtrl = ctrls[0]
    }
  };
}
