
export default function scrollToCustomer($stateParams, $timeout) {
  "ngInject";

  return {
    restrict: 'A',
    link: (ng, element, attrs) => {

      $timeout(() => {
        ng['$customers'].$scope.$broadcast('$scrollToChildElement', ".customer-item[data-id='" + $stateParams.customerId + "']");
      });
    }
  };
}