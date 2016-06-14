import controller from './cardActions.controller';

export default function cardActions(){
  return {
    restrict: 'E',
    scope: {
      vm:"=",
      entity:"=",
    },
    template: require("./cardActions.tpl.html"),
    replace:true,
    link: (scope, el, attr) => {
      // scope.isVisible = scope.entity.visible;
      // scope.$watch("entity.visible",(newValue)=>{
      //   scope.isVisible = newValue;
      // });
    }
  };
}
