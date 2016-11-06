'use strict';

describe('Delivery zone Service', function () {

    let
      VenueService,
      DeliveryZoneService,
      $rootScope,
      server,
      $timeout,
      $q;

    const currentVenue = {
      id:5
    }

    beforeEach(angular.mock.module('webapp'));

    beforeEach(angular.mock.inject(function ($injector) {

      VenueService = $injector.get('VenueService');
      DeliveryZoneService = $injector.get('DeliveryZoneService');
      $rootScope = $injector.get('$rootScope');
      $timeout = $injector.get('$timeout');
      $q = $injector.get('$q');

      VenueService.currentVenue = currentVenue;

      server = sinon.fakeServer.create();
    }));

    afterEach(function() {
      server.restore();
    });


});
