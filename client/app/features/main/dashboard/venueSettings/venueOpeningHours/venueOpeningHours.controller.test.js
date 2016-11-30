'use strict';

import venueOpeningHours from './';

describe('VenueOpeningHours Controller', function () {

    let
      VenueOpeningHoursCtrl,
      $rootScope,
      $scope,
      $controller,
      HoursService,
      VenueService,
      Spinner,
      Snack,
      $timeout,
      $q,
      server,
      mockHour,
      currentVenue;

    beforeEach(angular.mock.module('webapp'));
    beforeEach(angular.mock.module(venueOpeningHours));

    beforeEach(angular.mock.inject(function ($injector) {

      $controller = $injector.get('$controller');
      $rootScope = $injector.get('$rootScope');
      HoursService = $injector.get('HoursService');
      VenueService = $injector.get('VenueService');
      Spinner = $injector.get('Spinner');
      Snack = $injector.get('Snack');
      $timeout = $injector.get('$timeout');
      $q = $injector.get('$q');
      $scope = $rootScope.$new();

      server = sinon.fakeServer.create();

      currentVenue = new Preoday.Venue.constructor({
        id: 9,
        pickupFlag: 1,
        deliverFlag: 1
      });
      currentVenue.setAsCurrent();

      VenueService.currentVenue = currentVenue;

    }));

    afterEach(function() {

      server.restore();
      VenueOpeningHoursCtrl = null;
    });

    function _mockHour (data) {

      if (!data) {
        data = {};
      }

      mockHour = new Preoday.Hour(angular.extend({
        id: 1,
      }, data));
    }

    function _startController() {

      VenueOpeningHoursCtrl = $controller('venueOpeningHoursController', {
        '$scope': $scope,
      }, true);
    }

    function _getVenueOpeningHours () {

      return [new Preoday.Hour.constructor({
        open: '10:00:00.000',
        close: '23:00:00.000',
        day: 2, // Monday
        opening: 1,
        pickup: 1,
        delivery: 1
      }), new Preoday.Hour.constructor({
        open: '10:00:00.000',
        close: '23:00:00.000',
        day: 3,
        opening: 1,
        pickup: 1,
        delivery: 1
      }), new Preoday.Hour.constructor({
        open: '10:00:00.000',
        close: '23:00:00.000',
        day: 4,
        opening: 1,
        pickup: 1,
        delivery: 1
      })];
    }

    it("Should initialize the controller", function() {

      _startController();

      VenueOpeningHoursCtrl = VenueOpeningHoursCtrl();

      expect(VenueOpeningHoursCtrl.loaded).toBe(false);
      expect(VenueOpeningHoursCtrl.buildHours).toEqual(jasmine.any(Function));
      expect(VenueOpeningHoursCtrl.buildHoursFormat).toEqual(jasmine.any(Function));
      expect(VenueOpeningHoursCtrl.toggleServiceHours).toEqual(jasmine.any(Function));
      expect(VenueOpeningHoursCtrl.doUpdate).toEqual(jasmine.any(Function));
      expect(VenueOpeningHoursCtrl.updateHours).toEqual(jasmine.any(Function));
      expect(VenueOpeningHoursCtrl.hasAnHourWithoutDay).toEqual(jasmine.any(Function));
      expect(VenueOpeningHoursCtrl.debounce).toEqual(jasmine.any(Function));
      expect(VenueOpeningHoursCtrl.groupHoursByTime).toEqual(jasmine.any(Function));
      expect(VenueOpeningHoursCtrl.filterCollectionHours).toEqual(jasmine.any(Function));
      expect(VenueOpeningHoursCtrl.filterDeliveryHours).toEqual(jasmine.any(Function));
      expect(VenueOpeningHoursCtrl.hasDeliveryService).toEqual(jasmine.any(Function));
      expect(VenueOpeningHoursCtrl.hasCollectionService).toEqual(jasmine.any(Function));
      expect(VenueOpeningHoursCtrl.hasServiceMethods).toEqual(jasmine.any(Function));
      expect(VenueOpeningHoursCtrl.hasOpeningHours).toEqual(jasmine.any(Function));
    });

    it("Should expand hours and set just openingHours because collection and delivery are the same", function(done) {

      _startController();

      let openingHours = _getVenueOpeningHours();

      spyOn(currentVenue, 'getHours').and.returnValue($q.when(openingHours));

      VenueOpeningHoursCtrl = VenueOpeningHoursCtrl();

      expect(VenueOpeningHoursCtrl.collectionSameAsOpening).toBe(true);
      expect(VenueOpeningHoursCtrl.deliverySameAsOpening).toBe(true);
      expect(VenueOpeningHoursCtrl.allHours.length).toBe(0);
      expect(VenueOpeningHoursCtrl.openingHours.length).toBe(0);
      expect(VenueOpeningHoursCtrl.deliveryHours.length).toBe(0);
      expect(VenueOpeningHoursCtrl.collectionHours.length).toBe(0);
      expect(VenueOpeningHoursCtrl.loaded).toBe(false);

      setTimeout(() => {

        $rootScope.$digest();

        expect(VenueOpeningHoursCtrl.loaded).toBe(true);
        expect(VenueOpeningHoursCtrl.allHours.length).toBe(openingHours.length);
        expect(VenueOpeningHoursCtrl.openingHours.length).toBe(1);
        expect(VenueOpeningHoursCtrl.openingHours[0].days.length).toBe(openingHours.length); // This is because all days open and close in the same time
        expect(VenueOpeningHoursCtrl.deliveryHours.length).toBe(0);
        expect(VenueOpeningHoursCtrl.collectionHours.length).toBe(0);
        expect(VenueOpeningHoursCtrl.collectionSameAsOpening).toBe(true);
        expect(VenueOpeningHoursCtrl.deliverySameAsOpening).toBe(true);

        done();
      });
    });

    it("Should expand hours and set collection hours separate", function(done) {

      _startController();

      let openingHours = _getVenueOpeningHours();

      openingHours.push(new Preoday.Hour.constructor({
        open: '10:00:00.000',
        close: '22:00:00.000',
        opening: 0,
        pickup: 1,
        delivery: 0
      }))

      spyOn(currentVenue, 'getHours').and.returnValue($q.when(openingHours));

      VenueOpeningHoursCtrl = VenueOpeningHoursCtrl();

      expect(VenueOpeningHoursCtrl.collectionSameAsOpening).toBe(true);
      expect(VenueOpeningHoursCtrl.deliverySameAsOpening).toBe(true);
      expect(VenueOpeningHoursCtrl.allHours.length).toBe(0);
      expect(VenueOpeningHoursCtrl.openingHours.length).toBe(0);
      expect(VenueOpeningHoursCtrl.deliveryHours.length).toBe(0);
      expect(VenueOpeningHoursCtrl.collectionHours.length).toBe(0);
      expect(VenueOpeningHoursCtrl.loaded).toBe(false);

      setTimeout(() => {

        $rootScope.$digest();

        expect(VenueOpeningHoursCtrl.loaded).toBe(true);
        expect(VenueOpeningHoursCtrl.allHours.length).toBe(openingHours.length);
        expect(VenueOpeningHoursCtrl.openingHours.length).toBe(1);
        expect(VenueOpeningHoursCtrl.openingHours[0].days.length).toBe(3); // This is because all days open and close in the same time
        expect(VenueOpeningHoursCtrl.deliveryHours.length).toBe(0);
        expect(VenueOpeningHoursCtrl.collectionHours.length).toBe(1);
        expect(VenueOpeningHoursCtrl.collectionSameAsOpening).toBe(false);
        expect(VenueOpeningHoursCtrl.deliverySameAsOpening).toBe(true);

        done();
      });
    });

    it("Should expand hours and set delivery hours separate", function(done) {

      _startController();

      let openingHours = _getVenueOpeningHours();

      openingHours.push(new Preoday.Hour.constructor({
        open: '10:00:00.000',
        close: '22:00:00.000',
        opening: 0,
        pickup: 0,
        delivery: 1
      }))

      spyOn(currentVenue, 'getHours').and.returnValue($q.when(openingHours));

      VenueOpeningHoursCtrl = VenueOpeningHoursCtrl();

      expect(VenueOpeningHoursCtrl.collectionSameAsOpening).toBe(true);
      expect(VenueOpeningHoursCtrl.deliverySameAsOpening).toBe(true);
      expect(VenueOpeningHoursCtrl.allHours.length).toBe(0);
      expect(VenueOpeningHoursCtrl.openingHours.length).toBe(0);
      expect(VenueOpeningHoursCtrl.deliveryHours.length).toBe(0);
      expect(VenueOpeningHoursCtrl.collectionHours.length).toBe(0);
      expect(VenueOpeningHoursCtrl.loaded).toBe(false);

      setTimeout(() => {

        $rootScope.$digest();

        expect(VenueOpeningHoursCtrl.loaded).toBe(true);
        expect(VenueOpeningHoursCtrl.allHours.length).toBe(openingHours.length);
        expect(VenueOpeningHoursCtrl.openingHours.length).toBe(1);
        expect(VenueOpeningHoursCtrl.openingHours[0].days.length).toBe(3); // This is because all days open and close in the same time
        expect(VenueOpeningHoursCtrl.deliveryHours.length).toBe(1);
        expect(VenueOpeningHoursCtrl.collectionHours.length).toBe(0);
        expect(VenueOpeningHoursCtrl.collectionSameAsOpening).toBe(true);
        expect(VenueOpeningHoursCtrl.deliverySameAsOpening).toBe(false);

        done();
      });
    });

    it("Should check if hasAnHourWithoutDay works correctly", function() {

      _startController();

      VenueOpeningHoursCtrl = VenueOpeningHoursCtrl();

      let openingHours = [{
        open: '10:00:00.000',
        close: '23:00:00.000',
        days: []
      }];

      expect(VenueOpeningHoursCtrl.hasAnHourWithoutDay(openingHours)).toBe(true);

      openingHours[0].days.push(2);

      expect(VenueOpeningHoursCtrl.hasAnHourWithoutDay(openingHours)).toBe(false);
    });

    it("Should check if groupHoursByTime works correctly", function() {

      _startController();

      let openingHours = _getVenueOpeningHours();

      openingHours.push(new Preoday.Hour.constructor({
        open: '10:00:00.000',
        close: '22:00:00.000',
        day: 4,
        opening: 0,
        pickup: 1,
        delivery: 0
      }));

      openingHours.push(new Preoday.Hour.constructor({
        open: '10:00:00.000',
        close: '22:00:00.000',
        day: 5,
        opening: 0,
        pickup: 1,
        delivery: 0
      }));

      openingHours.push(new Preoday.Hour.constructor({
        open: '10:00:00.000',
        close: '20:00:00.000',
        day: 6,
        opening: 0,
        pickup: 1,
        delivery: 0
      }));

      VenueOpeningHoursCtrl = VenueOpeningHoursCtrl();

      let groupedHours = VenueOpeningHoursCtrl.groupHoursByTime(openingHours);

      expect(groupedHours.length).toBe(3);
      expect(groupedHours[0].days.length).toBe(3);  // 10:00 -> 23:00
      expect(groupedHours[1].days.length).toBe(2);  // 10:00 -> 22:00
      expect(groupedHours[2].days.length).toBe(1);  // 10:00 -> 20:00
    });

    it("Should check if buildHours works correctly", function() {

      _startController();

      let openingHours = _getVenueOpeningHours();

      openingHours.push(new Preoday.Hour.constructor({
        open: '10:00:00.000',
        close: '22:00:00.000',
        day: 4,
        opening: 0,
        pickup: 1,
        delivery: 0
      }));

      openingHours.push(new Preoday.Hour.constructor({
        open: '10:00:00.000',
        close: '22:00:00.000',
        day: 5,
        opening: 0,
        pickup: 1,
        delivery: 0
      }));

      openingHours.push(new Preoday.Hour.constructor({
        open: '10:00:00.000',
        close: '20:00:00.000',
        day: 6,
        opening: 0,
        pickup: 1,
        delivery: 0
      }));

      VenueOpeningHoursCtrl = VenueOpeningHoursCtrl();

      let groupedHours = VenueOpeningHoursCtrl.groupHoursByTime(openingHours);

      let buildedHours = VenueOpeningHoursCtrl.buildHours(groupedHours);

      expect(buildedHours.length).toBe(6);
    });
});
