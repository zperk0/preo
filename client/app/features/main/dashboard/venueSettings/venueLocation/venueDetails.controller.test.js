'use strict';

import venueLocation from './';

describe('venueLocation Controller', function () {

    let
      $rootScope,
      venueLocationCtrl,
      Spinner,
      $stateParams,
      $scope,
      $timeout,
      ErrorService,
      VenueService,
      $controller,
      LabelService,
      server,
      $q,
      Snack;

    var venue = new Preoday.Venue.constructor({
      id:1,
      name:"test venue",
      latitude:111,
      longitude:112,
      settings:{
        venueId:1
      }
    });

    var venueResponse  = new Preoday.Venue.constructor({
      id:1,
      name:"test venue",
      latitude:123,
      longitude:124,
      settings:{
        venueId:1
      }
    });

    beforeEach(angular.mock.module('webapp'));
    beforeEach(angular.mock.module(venueLocation));

    beforeEach(angular.mock.inject(function ($injector) {
      server = sinon.fakeServer.create();
      $rootScope = $injector.get('$rootScope');
      $controller = $injector.get('$controller');
      $timeout = $injector.get('$timeout');
      $stateParams = $injector.get('$stateParams');
      LabelService = $injector.get('LabelService');
      ErrorService = $injector.get('ErrorService');
      VenueService = $injector.get('VenueService');
      Spinner = $injector.get('Spinner');
      $q = $injector.get('$q');
      $scope = $rootScope.$new();
    }));

    afterEach(function() {

      server.restore();
    });

    function _startController(ngModel = []) {
      VenueService.currentVenue = venue;
      venueLocationCtrl = $controller('venueLocationController', {
        '$scope': $scope
      });
    }


    it("Init should set venue and show map", function() {
      _startController();
      $rootScope.$digest();
      expect(venueLocationCtrl.venue).toEqual(venue);
      $timeout.flush();
      expect(venueLocationCtrl.showMap).toEqual(true);
    });

    it("Drop should set lat lng and submit venue", function() {
      _startController();
      server.respondWith('PUT', '/venues/' + venue.id, [200, {"Content-Type": "application/json"}, JSON.stringify(venueResponse)]);
      spyOn(angular,'extend').and.callThrough();
      $rootScope.$digest();
      $timeout.flush();
      venueLocationCtrl.onMarkerDrop(123,124);
      expect(venueLocationCtrl.venue.latitude).toBe(123)
      expect(venueLocationCtrl.venue.longitude).toBe(124)

      server.respond();
      $rootScope.$digest();

      expect(venueLocationCtrl.venue.latitude).toBe(123)
      expect(venueLocationCtrl.venue.longitude).toBe(124)
      $rootScope.$digest();

    });

});