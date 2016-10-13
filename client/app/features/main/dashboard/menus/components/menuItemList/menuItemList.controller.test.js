'use strict';

import menuItemList from './';

describe('itemList Controller', function () {

    let
      MenuItemListCtrl,
      $rootScope,
      $scope,
      $stateParams,
      ItemService,
      $controller;

    beforeEach(angular.mock.module('webapp'));
    beforeEach(angular.mock.module(menuItemList));

    beforeEach(angular.mock.inject(function ($injector) {

      $rootScope = $injector.get('$rootScope');
      $controller = $injector.get('$controller');
      $stateParams = $injector.get('$stateParams');
      ItemService = $injector.get('ItemService');

      $scope = $rootScope.$new();
    }));

    afterEach(function() {

    });

    function _startController() {

      MenuItemListCtrl = $controller('menuItemListController', {
        '$scope': $scope
      }, true);
    }

    it("Should initialize the controller", function() {

      let venueId = 5;

      $stateParams.venueId = venueId;

      _startController();

      MenuItemListCtrl = MenuItemListCtrl();

      expect(MenuItemListCtrl.deleteItem).toEqual(jasmine.any(Function));
      expect(MenuItemListCtrl.showCreateItem).toEqual(jasmine.any(Function));      
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
});
