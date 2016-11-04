'use strict';

describe('Style Service', function () {

    let
      VenueService,
      StyleService,
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
      StyleService = $injector.get('StyleService');
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
