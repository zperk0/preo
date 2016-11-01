'use strict';

import menuItem from './';

describe('menuItem Controller', function () {

    let
      MenuItemCtrl,
      CardItemListCtrl,
      MenuSectionItemListCtrl,
      VenueService,
      $rootScope,
      $scope,
      $stateParams,
      ItemService,
      Snack,
      Spinner,
      server,
      $controller,
      $timeout,
      $q,
      contextual,
      contextualMenu,
      mockItem;

    beforeEach(angular.mock.module('webapp'));
    beforeEach(angular.mock.module(menuItem));

    beforeEach(angular.mock.inject(function ($injector) {

      $rootScope = $injector.get('$rootScope');
      $controller = $injector.get('$controller');
      $stateParams = $injector.get('$stateParams');
      ItemService = $injector.get('ItemService');
      VenueService = $injector.get('VenueService');
      Snack = $injector.get('Snack');
      Spinner = $injector.get('Spinner');
      $timeout = $injector.get('$timeout');
      $q = $injector.get('$q');
      contextual = $injector.get('contextual');
      contextualMenu = $injector.get('contextualMenu');

      $scope = $rootScope.$new();
      $scope.scrollToBottom = () => {};
      VenueService.currentVenue = {id:5};
    }));

    afterEach(function() {

      server.restore();
      CardItemListCtrl = null;
      MenuSectionItemListCtrl = null;
    });

    function _startController() {

      MenuItemCtrl = $controller('menuItemController', {
        '$scope': $scope
      }, true);

      server = sinon.fakeServer.create();
    }

    function _startCardItemListController() {

      CardItemListCtrl = $controller('cardItemListController', {
        '$scope': $scope,
      }, true);
    }

    function _startMenuSectionItemListController() {

      MenuSectionItemListCtrl = $controller('menuSectionItemListController', {
        '$scope': $scope,
      }, true);
    }

    function _mockItem() {

      mockItem = new Preoday.Item({
        id: 1,
        name: 'Test item',
        modifiers: [],
        tags: []
      });
    }

    it("Should initialize the controller and call the contextual menu", function() {

      spyOn(contextual, 'showMenu').and.callThrough();

      let venueId = 5;

      $stateParams.venueId = venueId;

      _mockItem();
      _startController();

      mockItem.id = null;

      MenuItemCtrl.instance.item = mockItem;
      MenuItemCtrl = MenuItemCtrl();

      $timeout.flush();

      expect(MenuItemCtrl.checkMultipleOccurrences).toEqual(jasmine.any(Function));
      expect(MenuItemCtrl.deleteItem).toEqual(jasmine.any(Function));
      expect(MenuItemCtrl.contextualMenuCancel).toEqual(jasmine.any(Function));
      expect(MenuItemCtrl.contextualMenuSuccess).toEqual(jasmine.any(Function));
      expect(MenuItemCtrl.updateItem).toEqual(jasmine.any(Function));
      expect(MenuItemCtrl.createItem).toEqual(jasmine.any(Function));
      expect(MenuItemCtrl.cloneItem).toEqual(jasmine.any(Function));
      expect(MenuItemCtrl.toggleVisibility).toEqual(jasmine.any(Function));
      expect(MenuItemCtrl.onVisibility).toEqual(jasmine.any(Function));
      expect(MenuItemCtrl.onDeleteImage).toEqual(jasmine.any(Function));
      expect(MenuItemCtrl.onEdit).toEqual(jasmine.any(Function));
      expect(MenuItemCtrl.onClone).toEqual(jasmine.any(Function));
      expect(MenuItemCtrl.onNewModifierMoved).toEqual(jasmine.any(Function));
      expect(MenuItemCtrl.type).toEqual('menuItem');

      expect(contextual.showMenu).toHaveBeenCalledWith(MenuItemCtrl.type, mockItem, jasmine.any(Function), jasmine.any(Function), {
        onDeleteImage: jasmine.any(Function)
      });
      expect(MenuItemCtrl.sectionId).toBeUndefined();
    });

    it("Should create an item", function(done) {

      spyOn(ItemService, 'createItem').and.callThrough();
      spyOn(contextualMenu, 'hide').and.callThrough();
      spyOn(Spinner, 'hide').and.callThrough();
      spyOn(Snack, 'show').and.callThrough();

      let venueId = 5;

      $stateParams.venueId = venueId;

      _mockItem();
      _startCardItemListController();
      _startController();

      mockItem.venueId = venueId;

      CardItemListCtrl.instance.collection = [];

      CardItemListCtrl = CardItemListCtrl();

      MenuItemCtrl.instance.item = mockItem;
      MenuItemCtrl.instance.cardItemList = CardItemListCtrl;
      MenuItemCtrl = MenuItemCtrl();

      spyOn(CardItemListCtrl, 'onUpdateItem').and.callThrough();

      expect(CardItemListCtrl.collection.length).toBe(0);

      server.respondWith('POST', '/api/items', [200, {"Content-Type": "application/json"}, JSON.stringify(mockItem)]);

      MenuItemCtrl.createItem();

      setTimeout(() => {

        $rootScope.$digest();
        server.respond();

        setTimeout(() => {

          $rootScope.$digest();

          expect(ItemService.createItem).toHaveBeenCalledWith(MenuItemCtrl.item, MenuItemCtrl.sectionId);
          expect(CardItemListCtrl.onUpdateItem).toHaveBeenCalledWith(mockItem, jasmine.any(Preoday.Item));
          expect(contextualMenu.hide).toHaveBeenCalled();
          expect(Spinner.hide).toHaveBeenCalled();
          expect(Snack.show).toHaveBeenCalled();
          expect(CardItemListCtrl.collection.length).toBe(1);

          done();
        });
      });
    });

    it("Should update an item for all menus", function(done) {

      spyOn(ItemService, 'updateItem').and.callThrough();
      spyOn(contextualMenu, 'hide').and.callThrough();
      spyOn(Spinner, 'show').and.callThrough();
      spyOn(Spinner, 'hide').and.callThrough();
      spyOn(Snack, 'show').and.callThrough();

      let venueId = 5;

      $stateParams.venueId = venueId;

      _mockItem();
      _startCardItemListController();
      _startController();

      mockItem.venueId = venueId;
      mockItem.images = [];

      ItemService.data.items = [mockItem];

      CardItemListCtrl.instance.collection = [mockItem];

      CardItemListCtrl = CardItemListCtrl();

      MenuItemCtrl.instance.item = mockItem;
      MenuItemCtrl.instance.cardItemList = CardItemListCtrl;
      MenuItemCtrl = MenuItemCtrl();

      spyOn(CardItemListCtrl, 'onItemUpdated').and.callThrough();

      expect(CardItemListCtrl.collection.length).toBe(1);

      server.respondWith('PUT', '/api/items/' + mockItem.id, [200, {"Content-Type": "application/json"}, JSON.stringify(mockItem)]);

      MenuItemCtrl.updateItem(mockItem);

      setTimeout(() => {

        $rootScope.$digest();

        expect(Spinner.show).toHaveBeenCalled();
        expect(ItemService.updateItem).toHaveBeenCalledWith(jasmine.any(Preoday.Item), false);

        server.respond();

        setTimeout(() => {

          $rootScope.$digest();

          expect(CardItemListCtrl.onItemUpdated).toHaveBeenCalledWith(mockItem);
          expect(contextualMenu.hide).toHaveBeenCalled();
          expect(Spinner.hide).toHaveBeenCalled();
          expect(Snack.show).toHaveBeenCalled();
          expect(CardItemListCtrl.collection.length).toBe(1);

          done();
        });
      });
    });

    it("Should update an item for a single menu", function(done) {

      spyOn(ItemService, 'checkMultipleOccurrences').and.returnValue($q.resolve('single'));
      spyOn(ItemService, 'doSingleEdit').and.callThrough();
      spyOn(ItemService, 'cloneItem').and.callThrough();
      spyOn(ItemService, 'removeFromSection').and.callThrough();
      spyOn(contextualMenu, 'hide').and.callThrough();
      spyOn(Spinner, 'show').and.callThrough();
      spyOn(Spinner, 'hide').and.callThrough();
      spyOn(Snack, 'show').and.callThrough();
      spyOn(Preoday.Section, 'removeItems').and.callThrough();

      let venueId = 5;
      let sectionId = 1;

      $stateParams.venueId = venueId;

      _mockItem();
      _startCardItemListController();
      _startMenuSectionItemListController();
      _startController();

      mockItem.sectionId = sectionId;
      mockItem.venueId = venueId;
      mockItem.images = [];
      mockItem.position = 0;

      let mockSection = new Preoday.Section();

      ItemService.data.items = [mockItem];

      CardItemListCtrl.instance.collection = [mockItem];
      MenuSectionItemListCtrl.instance.items = [mockItem];
      MenuSectionItemListCtrl.instance.section = [mockSection];

      CardItemListCtrl = CardItemListCtrl();
      MenuSectionItemListCtrl = MenuSectionItemListCtrl();

      MenuItemCtrl.instance.sectionId = sectionId;
      MenuItemCtrl.instance.item = mockItem;
      MenuItemCtrl.instance.cardItemList = CardItemListCtrl;
      MenuItemCtrl.instance.menuSectionItemList = MenuSectionItemListCtrl;
      MenuItemCtrl = MenuItemCtrl();

      spyOn(CardItemListCtrl, 'onUpdateItem').and.callThrough();
      spyOn(MenuSectionItemListCtrl, 'getPosition').and.callThrough();

      expect(CardItemListCtrl.collection.length).toBe(1);

      server.respondWith('POST', '/api/sections/' + sectionId + '/items', [200, {"Content-Type": "application/json"}, JSON.stringify(mockItem)]);

      MenuItemCtrl.updateItem(mockItem);

      setTimeout(() => {

        $rootScope.$digest();

        expect(MenuSectionItemListCtrl.getPosition).toHaveBeenCalledWith(mockItem);
        expect(Spinner.show).toHaveBeenCalled();
        expect(ItemService.doSingleEdit).toHaveBeenCalledWith(jasmine.any(Preoday.Item), sectionId, mockItem.position);
        expect(ItemService.cloneItem).toHaveBeenCalledWith(jasmine.any(Preoday.Item), sectionId, mockItem.position);

        server.respond();

        setTimeout(() => {

          $rootScope.$digest();

          expect(CardItemListCtrl.onUpdateItem).toHaveBeenCalledWith(mockItem, jasmine.any(Preoday.Item));
          expect(contextualMenu.hide).toHaveBeenCalled();
          expect(Spinner.hide).toHaveBeenCalled();
          expect(Snack.show).toHaveBeenCalled();
          expect(Preoday.Section.removeItems).toHaveBeenCalled();
          expect(CardItemListCtrl.collection.length).toBe(1);

          done();
        });
      });
    });
});