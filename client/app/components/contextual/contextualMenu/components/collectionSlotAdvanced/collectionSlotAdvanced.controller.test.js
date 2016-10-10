'use strict';

import collectionSlotsAdvanced from './';

describe('CollectionSlotsSelect component Controller', function () {

    let
      CollectionSlotsAdvancedCtrl,
      $rootScope,
      $scope,
      $controller,
      VenueService,
      CollectionSlotsService,
      server,
      currentVenue,
      slotMock;

    beforeEach(angular.mock.module('webapp'));
    beforeEach(angular.mock.module(collectionSlotsAdvanced));

    beforeEach(angular.mock.inject(function ($injector) {

      $controller = $injector.get('$controller');
      $rootScope = $injector.get('$rootScope');
      VenueService = $injector.get('VenueService');
      CollectionSlotsService = $injector.get('CollectionSlotsService');
      $scope = $rootScope.$new();

      server = sinon.fakeServer.create();

      currentVenue = new Preoday.Venue.constructor({
        id: 9,
      });
      currentVenue.setAsCurrent();

      VenueService.currentVenue = currentVenue;

    }));

    afterEach(function() {

      server.restore();
      slotMock = null;
      CollectionSlotsAdvancedCtrl = null;
    });

    function _mockSlot (data) {

      if (!data) {
        data = {};
      }

      slotMock = new Preoday.PickupSlot(angular.extend({
        id: 1,
        step: 1,
        start: 1,
        end: 1
      }, data));
    }

    function _startController() {

      CollectionSlotsAdvancedCtrl = $controller('collectionSlotAdvancedController', {
        '$scope': $scope,
      }, true);
    }

    it("Should initialize the controller", function() {

      _mockSlot();
      _startController();
      
      CollectionSlotsAdvancedCtrl.instance.collectionSlot = slotMock;
      CollectionSlotsAdvancedCtrl = CollectionSlotsAdvancedCtrl();

      expect(CollectionSlotsAdvancedCtrl.getStartFactor).toEqual(jasmine.any(Function));
      expect(CollectionSlotsAdvancedCtrl.hasObjectError).toEqual(jasmine.any(Function));

      expect(CollectionSlotsAdvancedCtrl.collectionSlot.$startFactor).toBe(1);
      expect(CollectionSlotsAdvancedCtrl.collectionSlot.$start).toBe(slotMock.start);
      expect(CollectionSlotsAdvancedCtrl.collectionSlot.$hasSteps).toBe(true);
    });

    it("Should initialize with negative start and without step", function() {

      _mockSlot();
      _startController();

      slotMock.start = -1;
      slotMock.step = null;
      
      CollectionSlotsAdvancedCtrl.instance.collectionSlot = slotMock;
      CollectionSlotsAdvancedCtrl = CollectionSlotsAdvancedCtrl();

      expect(CollectionSlotsAdvancedCtrl.getStartFactor).toEqual(jasmine.any(Function));
      expect(CollectionSlotsAdvancedCtrl.hasObjectError).toEqual(jasmine.any(Function));

      expect(CollectionSlotsAdvancedCtrl.collectionSlot.$startFactor).toBe(-1);
      expect(CollectionSlotsAdvancedCtrl.collectionSlot.$start).toBe(1);
      expect(CollectionSlotsAdvancedCtrl.collectionSlot.$hasSteps).toBe(false);
    });
});
