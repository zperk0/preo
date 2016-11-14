'use strict';

import collectionSlotsItem from './';

describe('CollectionSlots item Controller', function () {

    let
      CollectionSlotsItemCtrl,
      CollectionSlotsListCtrl,
      CardItemListCtrl,
      $rootScope,
      $scope,
      $controller,
      contextual,
      CollectionSlotsService,
      VenueService,
      Spinner,
      Snack,
      $timeout,
      $q,
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

      collectionSlots = [new Preoday.PickupSlot({
        id: 1,
      })];

    }));

    afterEach(function() {

      server.restore();
      collectionSlotMock = null;
      CardItemListCtrl = null;
    });

    function _mockCollectionSlot (data) {

      if (!data) {
        data = {};
      }

      collectionSlotMock = new Preoday.PickupSlot(angular.extend({
        id: 1,
        name: "Test"
      }, data));
    }

    function _mockCollectionSlots() {

    }

    function _startController() {

      CollectionSlotsItemCtrl = $controller('collectionSlotsItemController', {
        '$scope': $scope,
      }, true);
    }

    function _startCardItemListController() {

      CardItemListCtrl = $controller('cardItemListController', {
        '$scope': $scope,
      }, true);
    }

    function _startCollectionSlotsListController() {

      CollectionSlotsListCtrl = $controller('collectionSlotsListController', {
        '$scope': $scope,
      }, true);
    }

    it("Should initialize the controller", function() {

      spyOn(contextual, 'showMenu').and.callThrough();

      _mockCollectionSlot();
      _startController();


      CollectionSlotsItemCtrl.instance.collectionSlot = collectionSlotMock;
      CollectionSlotsItemCtrl = CollectionSlotsItemCtrl();

      expect(CollectionSlotsItemCtrl.type).toBe('collectionSlot');
      expect(CollectionSlotsItemCtrl.onDelete).toEqual(jasmine.any(Function));
      expect(CollectionSlotsItemCtrl.showSlotUsedDialog).toEqual(jasmine.any(Function));
      expect(CollectionSlotsItemCtrl.onEdit).toEqual(jasmine.any(Function));
      expect(CollectionSlotsItemCtrl.updateCollectionSlot).toEqual(jasmine.any(Function));
      expect(CollectionSlotsItemCtrl.contextualMenuSuccess).toEqual(jasmine.any(Function));
      expect(CollectionSlotsItemCtrl.contextualMenuCancel).toEqual(jasmine.any(Function));
      expect(CollectionSlotsItemCtrl.buildEntityToCollectionSlot).toEqual(jasmine.any(Function));
      expect(CollectionSlotsItemCtrl.isValidEntity).toEqual(jasmine.any(Function));
      expect(CollectionSlotsItemCtrl.restoreOriginalValues).toEqual(jasmine.any(Function));
      expect(contextual.showMenu).not.toHaveBeenCalled();
    });

    it("Should open drawer because doenst have an id", function() {

      spyOn(contextual, 'showMenu').and.callThrough();

      _mockCollectionSlot();
      _startController();

      collectionSlotMock.id = null;

      CollectionSlotsItemCtrl.instance.collectionSlot = collectionSlotMock;
      CollectionSlotsItemCtrl = CollectionSlotsItemCtrl();

      expect(contextual.showMenu).toHaveBeenCalledWith(CollectionSlotsItemCtrl.type, CollectionSlotsItemCtrl.collectionSlot, jasmine.any(Function), jasmine.any(Function));
    });

    it("Should delete a collection slot without show schedule dialog", function(done) {

      _mockCollectionSlot();
      _startCardItemListController();
      _startController();

      CollectionSlotsItemCtrl.instance.collectionSlot = collectionSlotMock;
      CollectionSlotsItemCtrl.instance.cardItemList = CardItemListCtrl();
      CollectionSlotsItemCtrl = CollectionSlotsItemCtrl();

      spyOn(CollectionSlotsItemCtrl.Spinner, 'show').and.callThrough();
      spyOn(CollectionSlotsItemCtrl.Spinner, 'hide').and.callThrough();
      spyOn(CollectionSlotsItemCtrl.Snack, 'show').and.callThrough();
      spyOn(CollectionSlotsItemCtrl.Snack, 'showError').and.callThrough();
      spyOn(CollectionSlotsItemCtrl.cardItemList, 'onItemDeleted').and.callThrough();
      spyOn(CollectionSlotsItemCtrl, 'showSlotUsedDialog').and.callThrough();
      spyOn(CollectionSlotsItemCtrl, 'delete').and.callThrough();
      spyOn(CollectionSlotsItemCtrl.DialogService, 'delete').and.callFake(function () {

        return $q.resolve();
      });

      let schedules = [];

      server.respondWith('GET', '/api/slots/' + collectionSlotMock.id + '/schedules', [200, {"Content-Type": "application/json"}, JSON.stringify(schedules)]);

      CollectionSlotsItemCtrl.onDelete();
      $rootScope.$digest();

      setTimeout(function () {

        server.respond();
        server.respondWith('DELETE', '/api/slots/' + collectionSlotMock.id, [200, {"Content-Type": "application/json"}, JSON.stringify({})]);

        setTimeout(function () {

          server.respond();
          $rootScope.$digest();

          setTimeout(() => {
            $rootScope.$digest();

            expect(CollectionSlotsItemCtrl.Spinner.show).toHaveBeenCalled();
            expect(CollectionSlotsItemCtrl.Spinner.show).toHaveBeenCalled();
            expect(CollectionSlotsItemCtrl.Snack.show).toHaveBeenCalled();
            expect(CollectionSlotsItemCtrl.showSlotUsedDialog).not.toHaveBeenCalled();
            expect(CollectionSlotsItemCtrl.delete).toHaveBeenCalled();
            expect(CollectionSlotsItemCtrl.Snack.showError).not.toHaveBeenCalled();
            expect(CollectionSlotsItemCtrl.cardItemList.onItemDeleted).toHaveBeenCalledWith(CollectionSlotsItemCtrl.collectionSlot);

            done();
          });
        });
      });
    });

    it("Should delete a collection slot showing schedule dialog", function(done) {

      _mockCollectionSlot();
      _startCardItemListController();
      _startController();

      CollectionSlotsItemCtrl.instance.collectionSlot = collectionSlotMock;
      CollectionSlotsItemCtrl.instance.cardItemList = CardItemListCtrl();
      CollectionSlotsItemCtrl = CollectionSlotsItemCtrl();

      spyOn(CollectionSlotsItemCtrl.Spinner, 'show').and.callThrough();
      spyOn(CollectionSlotsItemCtrl.Spinner, 'hide').and.callThrough();
      spyOn(CollectionSlotsItemCtrl.Snack, 'show').and.callThrough();
      spyOn(CollectionSlotsItemCtrl.Snack, 'showError').and.callThrough();
      spyOn(CollectionSlotsItemCtrl.cardItemList, 'onItemDeleted').and.callThrough();
      spyOn(CollectionSlotsItemCtrl, 'showSlotUsedDialog').and.callThrough();
      spyOn(CollectionSlotsItemCtrl, 'delete').and.callThrough();
      spyOn(CollectionSlotsItemCtrl.DialogService, 'delete').and.callFake(function () {

        return $q.resolve();
      });

      let schedules = [new Preoday.EventSchedule({
        id: 1
      })];

      server.respondWith('GET', '/api/slots/' + collectionSlotMock.id + '/schedules', [200, {"Content-Type": "application/json"}, JSON.stringify(schedules)]);

      CollectionSlotsItemCtrl.onDelete();
      $rootScope.$digest();

      setTimeout(function () {

        server.respond();
        server.respondWith('DELETE', '/api/slots/' + collectionSlotMock.id, [200, {"Content-Type": "application/json"}, JSON.stringify({})]);

        setTimeout(function () {

          server.respond();
          $rootScope.$digest();

          setTimeout(() => {

            $rootScope.$digest();

            expect(CollectionSlotsItemCtrl.Spinner.show).toHaveBeenCalled();
            expect(CollectionSlotsItemCtrl.Spinner.show).toHaveBeenCalled();
            expect(CollectionSlotsItemCtrl.Snack.show).not.toHaveBeenCalled();
            expect(CollectionSlotsItemCtrl.showSlotUsedDialog).toHaveBeenCalled();
            expect(CollectionSlotsItemCtrl.delete).toHaveBeenCalled();
            expect(CollectionSlotsItemCtrl.Snack.showError).not.toHaveBeenCalled();
            expect(CollectionSlotsItemCtrl.cardItemList.onItemDeleted).not.toHaveBeenCalled();

            done();
          });
        });
      });
    });

    it("Should show default error message on delete collection slot", function(done) {

      _mockCollectionSlot();
      _startCardItemListController();
      _startController();

      CollectionSlotsItemCtrl.instance.collectionSlot = collectionSlotMock;
      CollectionSlotsItemCtrl.instance.cardItemList = CardItemListCtrl();
      CollectionSlotsItemCtrl = CollectionSlotsItemCtrl();

      spyOn(CollectionSlotsItemCtrl.Spinner, 'show').and.callThrough();
      spyOn(CollectionSlotsItemCtrl.Spinner, 'hide').and.callThrough();
      spyOn(CollectionSlotsItemCtrl.Snack, 'show').and.callThrough();
      spyOn(CollectionSlotsItemCtrl.Snack, 'showError').and.callThrough();
      spyOn(CollectionSlotsItemCtrl.cardItemList, 'onItemDeleted').and.callThrough();
      spyOn(CollectionSlotsItemCtrl, 'showSlotUsedDialog').and.callThrough();
      spyOn(CollectionSlotsItemCtrl.DialogService, 'delete').and.callFake(function () {

        return $q.resolve();
      });

      server.respondWith('DELETE', '/api/slots/' + collectionSlotMock.id, [400, {"Content-Type": "application/json"}, JSON.stringify({
        message: ''
      })]);

      CollectionSlotsItemCtrl.onDelete();
      $rootScope.$digest();

      setTimeout(function () {

        server.respond();

        setTimeout(function () {

          $rootScope.$digest();

          expect(CollectionSlotsItemCtrl.Spinner.show).toHaveBeenCalled();
          expect(CollectionSlotsItemCtrl.Spinner.show).toHaveBeenCalled();
          expect(CollectionSlotsItemCtrl.Snack.show).not.toHaveBeenCalled();
          expect(CollectionSlotsItemCtrl.showSlotUsedDialog).not.toHaveBeenCalled();
          expect(CollectionSlotsItemCtrl.Snack.showError).toHaveBeenCalled();
          expect(CollectionSlotsItemCtrl.cardItemList.onItemDeleted).not.toHaveBeenCalled();

          done();
        });
      });
    });

});
