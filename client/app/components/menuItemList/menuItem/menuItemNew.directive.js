import controller from './menuItem.controller';

export default function menuItem(){
  "ngInject";
  return {
    restrict: 'E',
    scope: {
      onClick:"&",
      section:"=?",
    },
    template: require("./menuItemNew.tpl.html"),
    replace:true,
    link: (scope, el, attr, ctrls) => {

      scope.handleClick = ($event,$mdOpenMenu) => {
        if (scope.section && scope.section.id){
          $mdOpenMenu()
        } else{
          scope.onClick({$event:$event, isImport:false});
        }
      }
    }
  };
}
