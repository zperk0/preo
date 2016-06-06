export default function pathSelected($state, $rootScope){
  'ngInject';
  return {
    restrict: 'A',
    link: (scope, el, attr) => {
      const setSelected = (state) => {
        let isSelected = state.name.indexOf(attr.pathSelected) !== -1;
        if (isSelected) {
          el.addClass("selected");
        }
        else{
          el.removeClass("selected");
        }
      };
      $rootScope.$on( "$stateChangeStart", function(event, next, current) {
        setSelected(next);
      });
      setSelected($state.current);
    }
  };
}
