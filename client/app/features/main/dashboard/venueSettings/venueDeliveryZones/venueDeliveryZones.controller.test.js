'use strict';

import venueDeliveryZones from './';

describe('venueDeliveryZones Controller', function () {

    let
      $rootScope,
      venueDeliveryZonesCtrl,
      Spinner,
      $stateParams,
      $scope,
      $timeout,
      ErrorService,
      VenueService,
      DialogService,
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
      address1:"street 123",
      settings:{
        venueId:1
      }
    });


    beforeEach(angular.mock.module('webapp'));
    beforeEach(angular.mock.module(venueDeliveryZones));

    beforeEach(angular.mock.inject(function ($injector) {
      server = sinon.fakeServer.create();
      $rootScope = $injector.get('$rootScope');
      $controller = $injector.get('$controller');
      $timeout = $injector.get('$timeout');
      $stateParams = $injector.get('$stateParams');
      LabelService = $injector.get('LabelService');
      ErrorService = $injector.get('ErrorService');
      VenueService = $injector.get('VenueService');
      DialogService = $injector.get('DialogService');
      Spinner = $injector.get('Spinner');
      $q = $injector.get('$q');
      $scope = $rootScope.$new();
    }));

    afterEach(function() {

      server.restore();
    });

    function _startController(ngModel = []) {
      VenueService.currentVenue = venue;
      venueDeliveryZonesCtrl = $controller('venueDeliveryZonesController', {
        '$scope': $scope
      });
    }


    it("Init should set venue", function() {
      _startController();
      $rootScope.$digest();
      expect(venueDeliveryZonesCtrl.venue).toEqual(venue);
    });



});