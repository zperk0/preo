
export default function venueCurrency(VenueService){
  "ngInject";

  return {
    restrict: 'E',
    template: '{{ getCurrency() }}',
    link: (scope, element, attrs) => {

      scope.getCurrency = _getCurrency;

      function _getCurrency() {

        if (VenueService.hasVenueSet()) {
          return VenueService.currentVenue.ccy;
        }

        return '';
      }
    }
  };
}
