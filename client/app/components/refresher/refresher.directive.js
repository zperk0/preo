
export default function refresher(){
  "ngInject";

  return {
    transclude: true,
    controller: ($scope, $transclude, $attrs, $element) => {
      let childScope;

      $scope.$watch($attrs.condition, (value) => {
        $element.empty();
        if (childScope) {
          childScope.$destroy();
          childScope = null;
        }

        $transclude((clone, newScope) => {
          childScope = newScope;
          $element.append(clone);
        });
      });
    }
  };
}