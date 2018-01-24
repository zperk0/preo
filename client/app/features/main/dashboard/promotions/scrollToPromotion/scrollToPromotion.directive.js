
export default function scrollToPromotion($rootScope, $stateParams, $state, $timeout) {
  "ngInject";

  return {
    restrict: 'A',
    link: (ng, element, attrs) => {

      // make sure that is the first load
      if (!$rootScope.previousState) {
        $timeout(() => {

          if ($stateParams.promotionId || $state.current.name === 'main.dashboard.promotions.new') {
            ng['promotionsCtrl'].$scope.$broadcast('$scrollToChildElement', ".promotions-list .promotion[data-id='" + ($stateParams.promotionId || 'new') + "']");
          }
        });
      }
    }
  };
}