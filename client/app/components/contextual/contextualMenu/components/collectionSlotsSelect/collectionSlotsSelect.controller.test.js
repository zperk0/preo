'use strict';

import collectionSlotsSelect from './';

describe('CollectionSlotsSelect component Controller', function () {

    let
      CollectionSlotsSelectCtrl,
      $rootScope,
      $scope,
      $controller,
      VenueService,
      CollectionSlotsService,
      server,
      currentVenue,
      scheduleMock;

    beforeEach(angular.mock.module('webapp'));
    beforeEach(angular.mock.module(collectionSlotsSelect));

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
      scheduleMock = null;
      CollectionSlotsSelectCtrl = null;
    });

    function _mockSchedule (data) {

      if (!data) {
        data = {};
      }

      scheduleMock = new Preoday.EventSchedule(angular.extend({
        id: 1,
        startDate: moment().subtract(2, 'day').format('YYYY-MM-DDThh:mm:ss.000'),
        endDate: moment().add(2, 'day').format('YYYY-MM-DDThh:mm:ss.000'),
        pickupSlots: []
      }, data));
    }

    function _startController() {

      CollectionSlotsSelectCtrl = $controller('collectionSlotsSelectController', {
        '$scope': $scope,
      }, true);
    }

    function getPickupSlotsMocked() {

      return [{
        id: 1,
        name: 'Test'
      }, {
        id: 2,
        name: 'Test 2'
      }]
    }

    it("Should initialize the controller", function() {

      _mockSchedule();
      _startController();
      
      CollectionSlotsSelectCtrl.instance.schedule = scheduleMock;
      CollectionSlotsSelectCtrl = CollectionSlotsSelectCtrl();

      expect(CollectionSlotsSelectCtrl.loading).toBe(true);
      expect(CollectionSlotsSelectCtrl.buildData).toEqual(jasmine.any(Function));
      expect(CollectionSlotsSelectCtrl.toggleCheckbox).toEqual(jasmine.any(Function));
      expect(CollectionSlotsSelectCtrl.isSelected).toEqual(jasmine.any(Function));
      expect(CollectionSlotsSelectCtrl.getCollectionSlots).toEqual(jasmine.any(Function));
    });

    it("Should fetch the collection slots", function(done) {

      spyOn(CollectionSlotsService, 'getCollectionSlots').and.callThrough();

      _mockSchedule();

      var slots = getPickupSlotsMocked();

      scheduleMock.pickupSlots.push(slots[0]);

      server.respondWith('GET', '/api/slots/slotConfig?venueId=' + currentVenue.id, [200, {"Content-Type": "application/json"}, JSON.stringify(slots)]);

      _startController();      

      CollectionSlotsSelectCtrl.instance.schedule = scheduleMock;
      CollectionSlotsSelectCtrl = CollectionSlotsSelectCtrl();

      spyOn(CollectionSlotsSelectCtrl, 'buildData').and.callThrough();

      server.respond();

      setTimeout(() => {
        
        $rootScope.$digest();

        let collectionSlotsFetched = CollectionSlotsSelectCtrl.data.collectionSlots;

        expect(CollectionSlotsService.getCollectionSlots).toHaveBeenCalledWith({
          venueId: currentVenue.id
        });
        expect(CollectionSlotsSelectCtrl.buildData).toHaveBeenCalled();
        expect(CollectionSlotsSelectCtrl.loading).toBe(false);
        expect(collectionSlotsFetched.length).toBe(slots.length);
        expect(CollectionSlotsSelectCtrl.isSelected(collectionSlotsFetched[0])).toBe(true);
        expect(CollectionSlotsSelectCtrl.isSelected(collectionSlotsFetched[1])).toBe(false);

        done();
      });
    });

    it("Should select the second pickup slot", function(done) {

      spyOn(CollectionSlotsService, 'getCollectionSlots').and.callThrough();

      _mockSchedule();

      var slots = getPickupSlotsMocked();

      scheduleMock.pickupSlots.push(slots[0]);

      server.respondWith('GET', '/api/slots/slotConfig?venueId=' + currentVenue.id, [200, {"Content-Type": "application/json"}, JSON.stringify(slots)]);

      _startController();      

      CollectionSlotsSelectCtrl.instance.schedule = scheduleMock;
      CollectionSlotsSelectCtrl = CollectionSlotsSelectCtrl();

      spyOn(CollectionSlotsSelectCtrl, 'buildData').and.callThrough();

      server.respond();

      setTimeout(() => {
        
        $rootScope.$digest();

        let collectionSlotsFetched = CollectionSlotsSelectCtrl.data.collectionSlots;

        CollectionSlotsSelectCtrl.toggleCheckbox(collectionSlotsFetched[1]);

        expect(CollectionSlotsService.getCollectionSlots).toHaveBeenCalledWith({
          venueId: currentVenue.id
        });
        expect(CollectionSlotsSelectCtrl.buildData).toHaveBeenCalled();
        expect(CollectionSlotsSelectCtrl.loading).toBe(false);
        expect(collectionSlotsFetched.length).toBe(slots.length);
        expect(CollectionSlotsSelectCtrl.isSelected(collectionSlotsFetched[0])).toBe(true);
        expect(CollectionSlotsSelectCtrl.isSelected(collectionSlotsFetched[1])).toBe(true);

        done();
      });
    });

    it("Should remove the first pickup slot", function(done) {

      spyOn(CollectionSlotsService, 'getCollectionSlots').and.callThrough();

      _mockSchedule();

      var slots = getPickupSlotsMocked();

      scheduleMock.pickupSlots.push(slots[0]);

      server.respondWith('GET', '/api/slots/slotConfig?venueId=' + currentVenue.id, [200, {"Content-Type": "application/json"}, JSON.stringify(slots)]);

      _startController();      

      CollectionSlotsSelectCtrl.instance.schedule = scheduleMock;
      CollectionSlotsSelectCtrl = CollectionSlotsSelectCtrl();

      spyOn(CollectionSlotsSelectCtrl, 'buildData').and.callThrough();

      server.respond();

      setTimeout(() => {
        
        $rootScope.$digest();

        let collectionSlotsFetched = CollectionSlotsSelectCtrl.data.collectionSlots;

        CollectionSlotsSelectCtrl.toggleCheckbox(collectionSlotsFetched[0]);

        expect(CollectionSlotsService.getCollectionSlots).toHaveBeenCalledWith({
          venueId: currentVenue.id
        });
        expect(CollectionSlotsSelectCtrl.buildData).toHaveBeenCalled();
        expect(CollectionSlotsSelectCtrl.loading).toBe(false);
        expect(collectionSlotsFetched.length).toBe(slots.length);
        expect(CollectionSlotsSelectCtrl.isSelected(collectionSlotsFetched[0])).toBe(false);
        expect(CollectionSlotsSelectCtrl.isSelected(collectionSlotsFetched[1])).toBe(false);

        done();
      });
    });

});
