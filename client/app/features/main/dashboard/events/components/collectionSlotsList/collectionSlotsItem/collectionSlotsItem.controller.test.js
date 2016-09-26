'use strict';

import collectionSlotsItem from './';

describe('CollectionSlots item Controller', function () {

    let
      CollectionSlotsItemCtrl,
      CollectionSlotsListCtrl,
      $rootScope,
      $scope,
      $controller,
      contextual,
      CollectionSlotsService,
      VenueService,
      Spinner,
      $timeout,
      server,
      currentVenue,
      collectionSlots,
      collectionSlotMock;

    beforeEach(angular.mock.module('webapp'));
    beforeEach(angular.mock.module(collectionSlotsItem));

    beforeEach(angular.mock.inject(function ($injector) {

      $controller = $injector.get('$controller');
      $rootScope = $injector.get('$rootScope');
      contextual = $injector.get('contextual');
      CollectionSlotsService = $injector.get('CollectionSlotsService');
      VenueService = $injector.get('VenueService');
      Spinner = $injector.get('Spinner');
      $timeout = $injector.get('$timeout');
      $scope = $rootScope.$new();

      server = sinon.fakeServer.create();

      currentVenue = new Preoday.Venue.constructor({
        id: 9,
      });
      currentVenue.setAsCurrent();

      VenueService.currentVenue = currentVenue;

      collectionSlots = [new Preoday.PickupSlot({
        id: 1,
      })];

    }));

    afterEach(function() {

      server.restore();
      collectionSlotMock = null;
    });

    function _mockCollectionSlot (data) {

      if (!data) {
        data = {};
      }

      collectionSlotMock = new Preoday.PickupSlot(angular.extend({
        id: 1
      }, data));
    }

    function _mockCollectionSlots() {

    }

    function _startController() {

      CollectionSlotsItemCtrl = $controller('collectionSlotsItemController', {
        '$scope': $scope,
      }, true);
    }

    function _startCollectionSlotsListController() {

      CollectionSlotsListCtrl = $controller('collectionSlotsListController', {
        '$scope': $scope,
      }, true);
    }

    it("Should initialize the controller", function() {

      _mockCollectionSlot();
      _startController();
      

      CollectionSlotsItemCtrl.instance.collectionSlot = collectionSlotMock;
      CollectionSlotsItemCtrl = CollectionSlotsItemCtrl();

      expect(CollectionSlotsItemCtrl.type).toBe('collectionSlot');
      expect(CollectionSlotsItemCtrl.onDelete).toEqual(jasmine.any(Function));
      expect(CollectionSlotsItemCtrl.showCannotDeleteSlotDialog).toEqual(jasmine.any(Function));
      expect(CollectionSlotsItemCtrl.onEdit).toEqual(jasmine.any(Function));
      expect(CollectionSlotsItemCtrl.updateCollectionSlot).toEqual(jasmine.any(Function));
      expect(CollectionSlotsItemCtrl.contextualMenuSuccess).toEqual(jasmine.any(Function));
      expect(CollectionSlotsItemCtrl.contextualMenuCancel).toEqual(jasmine.any(Function));
      expect(CollectionSlotsItemCtrl.buildEntityToCollectionSlot).toEqual(jasmine.any(Function));
      expect(CollectionSlotsItemCtrl.isValidEntity).toEqual(jasmine.any(Function));
      expect(CollectionSlotsItemCtrl.restoreOriginalValues).toEqual(jasmine.any(Function));
    });

});
