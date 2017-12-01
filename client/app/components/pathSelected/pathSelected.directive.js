export default function pathSelected($state, $rootScope){
  "ngInject";
  return {
    restrict: 'A',
    scope:{
      pathSelected:"="
    },
    link: (scope, el, attr) => {
      const pathName = scope.pathSelected ? (scope.pathSelected.path || scope.pathSelected.id) : attr.pathSelected;
      const exclusions = scope.pathSelected ? scope.pathSelected.exclusions : false;
      const setSelected = (state) => {
        var re = new RegExp("\\."+pathName+"(\\.|$)");
        var matches = state.name.match(re)
        let isSelected = matches && matches.length>0;
        if (isSelected && exclusions){
          var re = new RegExp("\\.("+exclusions.join("|")+")(\\.|$)");
          var matches = state.name.match(re)
          let isExcluded = matches && matches.length>0;
          if (isExcluded){
            isSelected = false;
          }
        }
        if (isSelected) {
          el.addClass("selected");
          if (scope.pathSelected){
            scope.pathSelected.$selected = true;
          }
        }
        else{
          el.removeClass("selected");
          if (scope.pathSelected){
            scope.pathSelected.$selected = false;
          }
        }
      };
      $rootScope.$on( "$stateChangeStart", function(event, next, current) {
        setSelected(next);
      });
      setSelected($state.current);
    }
  };
}
