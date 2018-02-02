
export default function scrollToTax($rootScope, $stateParams, $timeout) {
  'ngInject';

  return {
    restrict: 'A',
    link: (scope, element, attrs) => {
      if ($rootScope.previousState) {
        // prevent scrolling if user is NOT
        // accessing the page by url or refreshing it
        return;
      }

      // GET current `parent` controller
      const $ctrl = element.parent().controller();
      const taxId = $stateParams.taxGroupId || $stateParams.taxRateId || 'new';
      console.log('[ScrollTo] tax id = ', taxId);

      $timeout(() => {
        $ctrl.$scope.$broadcast('$scrollToChildElement', '.tax-list .tax-list-item[data-id="'+ taxId +'"]');
      });
    }
  };
}
