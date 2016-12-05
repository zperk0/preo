'use strict';

import menuItemList from './';

describe('itemList Controller', function () {

    let
      MenuItemListCtrl,
      $rootScope,
      $scope,
      $stateParams,
      ItemService,
      Snack,
      server,
      $controller;

    beforeEach(angular.mock.module('webapp'));
    beforeEach(angular.mock.module(menuItemList));

    beforeEach(angular.mock.inject(function ($injector) {

      $rootScope = $injector.get('$rootScope');
      $controller = $injector.get('$controller');
      $stateParams = $injector.get('$stateParams');
      ItemService = $injector.get('ItemService');
      Snack = $injector.get('Snack');

      $scope = $rootScope.$new();

      $scope.scrollToBottom = () => {};
    }));

    afterEach(function() {

      server.restore();
    });

    function _startController() {

      MenuItemListCtrl = $controller('menuItemListController', {
        '$scope': $scope
      }, true);

      server = sinon.fakeServer.create();
    }

    it("Should initialize the controller", function() {

      let venueId = 5;

      $stateParams.venueId = venueId;

      _startController();

      MenuItemListCtrl = MenuItemListCtrl();

      expect(MenuItemListCtrl.deleteItem).toEqual(jasmine.any(Function));
      expect(MenuItemListCtrl.showCreateItem).toEqual(jasmine.any(Function));
      expect(MenuItemListCtrl.onClone).toEqual(jasmine.any(Function));
      expect(MenuItemListCtrl.items.length).toBe(0);
    });

    it("Should create an item", function() {

      let venueId = 5;

      $stateParams.venueId = venueId;

      _startController();

      MenuItemListCtrl = MenuItemListCtrl();

      MenuItemListCtrl.showCreateItem();

      expect(MenuItemListCtrl.items.length).toBe(1);
    });

    it("Shouldn't create duplicated item", function() {

      let venueId = 5;

      $stateParams.venueId = venueId;

      _startController();

      MenuItemListCtrl = MenuItemListCtrl();

      MenuItemListCtrl.showCreateItem();
      MenuItemListCtrl.showCreateItem();

      expect(MenuItemListCtrl.items.length).toBe(1);
    });

    it("Should clone an item", function(done) {

      spyOn(ItemService, 'cloneItem').and.callThrough();
      spyOn(ItemService, 'createItem').and.callThrough();
      spyOn($scope, 'scrollToBottom').and.callThrough();

      let venueId = 5;

      let modifier = new Preoday.Modifier({
        id: 1,
        name: 'Modifier test',
        variant: 0,
        items: []
      });

      let mockItem = new Preoday.Item({
        id: 1,
        name: 'Test',
        venueId: venueId,
        modifiers: [modifier],
        voucherType: 'NONE'
      });

      $stateParams.venueId = venueId;

      _startController();

      MenuItemListCtrl.instance.items = [mockItem];
      MenuItemListCtrl = MenuItemListCtrl();

      expect(MenuItemListCtrl.items.length).toBe(1);

      server.respondWith('POST', '/api/items', [200, {"Content-Type": "application/json"}, JSON.stringify(mockItem)]);

      MenuItemListCtrl.onClone(MenuItemListCtrl.items[0]);

      setTimeout(() => {

        $rootScope.$digest();
        server.respond();

        setTimeout( () => {

          $rootScope.$digest();

          expect(ItemService.cloneItem).toHaveBeenCalledWith(mockItem, null, null);
          expect(ItemService.createItem).toHaveBeenCalled();
          expect($scope.scrollToBottom).toHaveBeenCalled();
          expect(MenuItemListCtrl.items.length).toBe(2);
          expect(MenuItemListCtrl.items[1].name).toEqual(MenuItemListCtrl.items[0].name);
          expect(MenuItemListCtrl.items[1].modifiers.length).toBe(MenuItemListCtrl.items[0].modifiers.length);

          done();
        });
      });
    });

    it("Shouldn't clone an item", function(done) {

      spyOn(ItemService, 'cloneItem').and.callThrough();
      spyOn(ItemService, 'createItem').and.callThrough();
      spyOn(Snack, 'showError').and.callThrough();

      let venueId = 5;

      let mockItem = new Preoday.Item({
        id: 1,
        name: 'Test',
        venueId: venueId,
        modifiers: [],
        voucherType: 'NONE'
      });

      $stateParams.venueId = venueId;

      _startController();

      MenuItemListCtrl.instance.items = [mockItem];
      MenuItemListCtrl = MenuItemListCtrl();

      expect(MenuItemListCtrl.items.length).toBe(1);

      server.respondWith('POST', '/api/items', [400, {"Content-Type": "application/json"}, JSON.stringify(mockItem)]);

      MenuItemListCtrl.onClone(MenuItemListCtrl.items[0]);

      setTimeout(() => {

        $rootScope.$digest();
        server.respond();

        setTimeout( () => {

          $rootScope.$digest();

          expect(ItemService.cloneItem).toHaveBeenCalledWith(mockItem, null, null);
          expect(ItemService.createItem).toHaveBeenCalled();
          expect(Snack.showError).toHaveBeenCalled();
          expect(MenuItemListCtrl.items.length).toBe(1);

          done();
        });
      });
    });
});
