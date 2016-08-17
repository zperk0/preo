
export default function($parse) {
  'ngInject';
  return {
    restrict: 'A',
    link: (scope, element, attrs) => {
      var onChangeHandler = $parse(attrs.customOnChange);
      element.bind('click', function(){
        this.value = '';
      })
      element.bind('change', (event) => {
        console.log("on change", element.value, event);
        onChangeHandler(scope,{$event:event});
      });
    }
  };
}
