import controller from './menuItem.controller';

export default function menuItem(){
  "ngInject";
  return {
    restrict: 'E',
    scope: {
      item:"=?",
    },
    template: require("./menuItemNew.tpl.html"),
    replace:true,
    link: (scope, el, attr, ctrls) => {
    }
  };
}
