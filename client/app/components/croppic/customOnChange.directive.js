
export default function($parse) {
  'ngInject';
  return {
    restrict: 'A',
    link: (scope, element, attrs) => {
      var onChangeHandler = $parse(attrs.customOnChange);
      console.log("bound", onChangeHandler, onChangeHandler());
      element.bind('change', (event) => {
        onChangeHandler(scope,{$event:event});
      });
    }
  };
}
