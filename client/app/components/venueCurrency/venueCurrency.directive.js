
export default function venueCurrency(StateService){
  "ngInject";

  return {
    restrict: 'E',
    template: '{{ getCurrency() }}',
    link: (scope, element, attrs) => {

      scope.getCurrency = _getCurrency;

      function _getCurrency() {

        if (StateService.venue) {
          return StateService.venue.ccy;
        }

        return '';
      }
    }
  };
}
