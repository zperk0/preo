
export default function cardItemTitle(){
  "ngInject";
  return {
    restrict: 'E',
    template: require("./cardItemTitle.tpl.html"),
    scope:{
      showVisible:"&?",
      hasVisible:"=?",
      showPaused:"&?",
      hasPause:"=?"
    },
    replace:true,
    transclude:true,
    require:'^cardItem',
    link: (scope, el, attr, ctrl) => {
      scope.vm = ctrl;
    }
  }
}
