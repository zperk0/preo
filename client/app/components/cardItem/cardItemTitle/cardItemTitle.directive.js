
export default function cardItemTitle(){
  return {
    restrict: 'E',
    template: require("./cardItemTitle.tpl.html"),
    scope:{
      showVisible:"&?",
      hasVisible:"=?",
      showDropdown:"=?"
    },
    replace:true,
    transclude:true,
    require:'^cardItem',
    link: (scope, el, attr, ctrl) => {
      scope.vm = ctrl;
    }
  }
}
