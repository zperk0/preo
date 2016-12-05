'use strict';

import menuItemAdvanced from './';

describe('menuItem Advanced Controller', function () {

    let
      MenuItemAdvancedCtrl,
      VenueService,
      $rootScope,
      $scope,
      $stateParams,
      ItemService,
      server,
      $controller,
      $timeout,
      $q,
      currentVenue,
      mockItem;

    beforeEach(angular.mock.module('webapp'));
    beforeEach(angular.mock.module(menuItemAdvanced));

    beforeEach(angular.mock.inject(function ($injector) {

      $rootScope = $injector.get('$rootScope');
      $controller = $injector.get('$controller');
      $stateParams = $injector.get('$stateParams');
      ItemService = $injector.get('ItemService');
      VenueService = $injector.get('VenueService');
      $timeout = $injector.get('$timeout');
      $q = $injector.get('$q');

      $scope = $rootScope.$new();

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

      MenuItemAdvancedCtrl = $controller('menuItemAdvancedController', {
        '$scope': $scope
      }, true);

      server = sinon.fakeServer.create();
    }

    function _mockItem() {

      mockItem = new Preoday.Item({
        id: 1,
        name: 'Test item',
        modifiers: [],
        tags: [],
        voucherType: 'ALL'
      });
    }

    it("Should initialize the controller", function() {

      _mockItem();
      _startController();

      MenuItemAdvancedCtrl.instance.item = mockItem;
      MenuItemAdvancedCtrl = MenuItemAdvancedCtrl();

      expect(MenuItemAdvancedCtrl.changeAnyVoucherMessage).toEqual(jasmine.any(Function));
      expect(MenuItemAdvancedCtrl.changeOnlyEmailMessage).toEqual(jasmine.any(Function));
      expect(MenuItemAdvancedCtrl.changeVoucherPostType).toEqual(jasmine.any(Function));
    });

    it("Should set $hasMessageAnyVoucher to true and $hasMessageOnlyEmail to false", function() {

      _mockItem();

      mockItem.hasMessage = 1;

      _startController();

      MenuItemAdvancedCtrl.instance.item = mockItem;
      MenuItemAdvancedCtrl = MenuItemAdvancedCtrl();

      expect(MenuItemAdvancedCtrl.item.$hasMessageAnyVoucher).toBe(true);
      expect(MenuItemAdvancedCtrl.item.$hasMessageOnlyEmail).toBe(false);
    });

    it("Should set $hasMessageAnyVoucher to false and $hasMessageOnlyEmail to true", function() {

      _mockItem();

      mockItem.hasMessage = -1;

      _startController();

      MenuItemAdvancedCtrl.instance.item = mockItem;
      MenuItemAdvancedCtrl = MenuItemAdvancedCtrl();

      expect(MenuItemAdvancedCtrl.item.$hasMessageAnyVoucher).toBe(false);
      expect(MenuItemAdvancedCtrl.item.$hasMessageOnlyEmail).toBe(true);
    });

    it("Should set $hasMessageAnyVoucher to false and $hasMessageOnlyEmail to false", function() {

      _mockItem();

      mockItem.hasMessage = 0;

      _startController();

      MenuItemAdvancedCtrl.instance.item = mockItem;
      MenuItemAdvancedCtrl = MenuItemAdvancedCtrl();

      expect(MenuItemAdvancedCtrl.item.$hasMessageAnyVoucher).toBe(false);
      expect(MenuItemAdvancedCtrl.item.$hasMessageOnlyEmail).toBe(false);
    });

    it("Should set $voucherTypeEmail and $voucherTypePost to true", function() {

      _mockItem();

      mockItem.voucherType = Preoday.constants.VoucherType.ALL;

      _startController();

      MenuItemAdvancedCtrl.instance.item = mockItem;
      MenuItemAdvancedCtrl = MenuItemAdvancedCtrl();

      expect(MenuItemAdvancedCtrl.item.$voucherTypePost).toBe(true);
      expect(MenuItemAdvancedCtrl.item.$voucherTypeEmail).toBe(true);
    });

    it("Should set $voucherTypePost to false and $voucherTypeEmail to true", function() {

      _mockItem();

      mockItem.voucherType = Preoday.constants.VoucherType.EMAIL;

      _startController();

      MenuItemAdvancedCtrl.instance.item = mockItem;
      MenuItemAdvancedCtrl = MenuItemAdvancedCtrl();

      expect(MenuItemAdvancedCtrl.item.$voucherTypePost).toBe(false);
      expect(MenuItemAdvancedCtrl.item.$voucherTypeEmail).toBe(true);
    });

    it("Should set $voucherTypePost to true and $voucherTypeEmail to false", function() {

      _mockItem();

      mockItem.voucherType = Preoday.constants.VoucherType.POST;

      _startController();

      MenuItemAdvancedCtrl.instance.item = mockItem;
      MenuItemAdvancedCtrl = MenuItemAdvancedCtrl();

      expect(MenuItemAdvancedCtrl.item.$voucherTypePost).toBe(true);
      expect(MenuItemAdvancedCtrl.item.$voucherTypeEmail).toBe(false);
    });


});
