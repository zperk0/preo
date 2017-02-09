
import controller from './venueOpeningHours.controller';

/**
 * Routing function for venueSettings
 * @param  $stateProvider
 */

export default function routes($stateProvider) {
  "ngInject";
  $stateProvider.state("main.dashboard.venueSettings.venueOpeningHours", {
    url: "/openingHours",
    views:{
      venueSettingsContent:{
        template: require("./venueOpeningHours.tpl.html"),
        controller: controller.UID,
        controllerAs: "venueOpeningHoursCtrl"
      }
    },
    isTakeAway: function ($q, $state, $stateParams, $timeout, authenticated, VenueService) {

      if (VenueService.hasVenueSet() && !VenueService.currentVenue.isEvent()) {

        return $q.when();
      } else {

        $timeout(() => {

          $state.go('main.dashboard.analytics');
        });

        return $q.reject();
      }
    }
  });
}