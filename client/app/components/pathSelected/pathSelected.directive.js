export default function pathSelected($state, $rootScope){
  'ngInject';
  return {
    restrict: 'A',
    scope:{
      pathSelected:"="
    },
    link: (scope, el, attr) => {
      const pathName = scope.pathSelected ? scope.pathSelected.id : attr.pathSelected;
      const setSelected = (state) => {
        let isSelected = state.name.indexOf(pathName) !== -1;
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
