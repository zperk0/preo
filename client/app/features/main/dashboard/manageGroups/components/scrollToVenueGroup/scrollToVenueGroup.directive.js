
export default function scrollToVenueGroup($rootScope, $stateParams, $timeout) {
  'ngInject';

  return {
    restrict: 'A',
    link: (scope, element, attrs) => {
      if ($rootScope.previousState) {
        // prevent scrolling if user is NOT
        // accessing the page by url or refreshing it
        return;
      }

      // GET `venue group` id path param
      const venueGroupId = $stateParams.venueGroupId || 'new';

      $timeout(() => {
        scope['manageGroupsCtrl'].$scope
          .$broadcast('$scrollToChildElement', '.venue-group-list .venue-group[data-id="'+ venueGroupId +'"]');
      });
    }
  };
}
