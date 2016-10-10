'use strict';

import collectionSlotsView from './';

describe('CollectionSlots View Controller', function () {

    let
      CollectionSlotsCtrl,
      $rootScope,
      $scope,
      $stateParams,
      $controller,
      CollectionSlotsService,
      VenueService,
      Spinner,
      Snack,
      $timeout,
      $q,
      server,
      currentVenue;

    beforeEach(angular.mock.module('webapp'));
    beforeEach(angular.mock.module(collectionSlotsView));

    beforeEach(angular.mock.inject(function ($injector) {

      $controller = $injector.get('$controller');
      $rootScope = $injector.get('$rootScope');
      $stateParams = $injector.get('$stateParams');
      CollectionSlotsService = $injector.get('CollectionSlotsService');
      VenueService = $injector.get('VenueService');
      Spinner = $injector.get('Spinner');
      Snack = $injector.get('Snack');
      $timeout = $injector.get('$timeout');
      $q = $injector.get('$q');
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
    });

    function _startController() {

      CollectionSlotsCtrl = $controller('collectionSlotsController as collectionSlotsViewCtrl', {
        '$scope': $scope,
      });

      $scope.collectionSlotsViewCtrl = CollectionSlotsCtrl;
    }

    it("Should initialize the controller", function() {

      spyOn(CollectionSlotsService, 'getCollectionSlots').and.callThrough();
      spyOn(Spinner, 'show').and.callThrough();

      _startController();

      expect($scope.collectionSlotsViewCtrl.loaded).toBe(false);
      expect(Spinner.show).toHaveBeenCalledWith('collectionSlots');
      expect(CollectionSlotsService.getCollectionSlots).toHaveBeenCalled();
    });

    it("Should initialize the controller and fetch collection slots", function(done) {

      spyOn(CollectionSlotsService, 'getCollectionSlots').and.callThrough();
      spyOn(Spinner, 'show').and.callThrough();

      var venueId = 5;

      $stateParams.venueId = venueId;

      var slots = [{
        id: 1,
        name: 'test'
      }];

      server.respondWith('GET', '/api/slots/slotConfig?venueId=' + venueId, [200, {"Content-Type": "application/json"}, JSON.stringify(slots)]);

      _startController();

      spyOn($scope.collectionSlotsViewCtrl, 'hideSpinner').and.callThrough();

      setTimeout(function () {
        
        server.respond();
        $rootScope.$digest();

        setTimeout(function() {

          $rootScope.$digest();

          expect($scope.collectionSlotsViewCtrl.loaded).toBe(true);
          expect(Spinner.show).toHaveBeenCalledWith('collectionSlots');
          expect(CollectionSlotsService.getCollectionSlots).toHaveBeenCalledWith(jasmine.objectContaining({
            venueId: venueId
          }));
          expect($scope.collectionSlotsViewCtrl.hideSpinner).toHaveBeenCalled();
          expect($scope.collectionSlotsViewCtrl.data.collectionSlots.length).toBe(slots.length);

          done();          
        });
      });
    });

    it("Should initialize the controller and failt on fetch collection slots", function(done) {

      spyOn(CollectionSlotsService, 'getCollectionSlots').and.callThrough();
      spyOn(Spinner, 'show').and.callThrough();

      var venueId = 5;

      $stateParams.venueId = venueId;

      var slots = [{
        id: 1,
        name: 'test'
      }];

      server.respondWith('GET', '/api/slots/slotConfig?venueId=' + venueId, [400, {"Content-Type": "application/json"}, JSON.stringify(slots)]);

      _startController();

      spyOn($scope.collectionSlotsViewCtrl, 'hideSpinner').and.callThrough();

      setTimeout(function () {
        
        server.respond();
        $rootScope.$digest();

        setTimeout(function() {

          $rootScope.$digest();

          expect($scope.collectionSlotsViewCtrl.loaded).toBe(true);
          expect(Spinner.show).toHaveBeenCalledWith('collectionSlots');
          expect(CollectionSlotsService.getCollectionSlots).toHaveBeenCalledWith(jasmine.objectContaining({
            venueId: venueId
          }));
          expect($scope.collectionSlotsViewCtrl.hideSpinner).toHaveBeenCalled();
          expect($scope.collectionSlotsViewCtrl.data.collectionSlots.length).toBe(0);

          done();          
        });
      });
    });
});
